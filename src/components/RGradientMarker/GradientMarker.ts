import { Map, MapMouseEvent, MapTouchEvent, Marker, MarkerOptions, Popup } from "maplibre-gl";
import { DOM } from "../../maplibre-core/util/dom";

import { type FloatingPopup } from "../RFloatingPopup/FloatingPopup";
import { arrowHeight } from "../RFloatingPopup/util";
export interface GradientMarkerOptions extends MarkerOptions {
  icon?: string | HTMLElement | SVGSVGElement | (() => HTMLElement | SVGSVGElement);
  text?: string;
  className?: string;
}

const defaultColor = "#ffe64b";
const defaultHeight = 50;

export class GradientMarker extends Marker {
  _icon?: string | HTMLElement | SVGSVGElement | (() => HTMLElement | SVGSVGElement);
  _height = defaultHeight;
  _text?: string;
  // @ts-ignore
  _popup?: FloatingPopup | Popup;

  _circleElement: HTMLElement | null = null;
  _iconElement: HTMLElement | SVGSVGElement | null = null;
  _textElement: HTMLDivElement | null = null;
  _markerElement?: HTMLElement;

  constructor(options?: GradientMarkerOptions) {
    const useDefaultMarker = !options || !options.element;

    if (useDefaultMarker) {
      options ??= {};
      options.element = DOM.create("div", "maplibregl-gradient-marker");
      if (options.className) {
        options.element.classList.add(options.className);
      }
    }

    super(options);

    if (this._draggable) {
      this._element.classList.add("draggable");
    }

    this._anchor = (options && options.anchor) || "bottom";
    this._color = (options && options.color) || defaultColor;
    this._icon = options && options.icon;
    this._text = options && options.text;

    if (useDefaultMarker) {
      this._defaultMarker = true;

      this._element.setAttribute("aria-label", "Map marker");
      this._element.setAttribute("tabindex", "0");

      this.setScale(this._scale);
      this.setColor(this._color);

      this._markerElement = DOM.create("div", "marker");
      if (this._text) {
        this.setText(this._text);
      } else if (this._icon) {
        this.setIcon(this._icon);
      }

      const target = DOM.create("div", "target");

      this._element.appendChild(this._markerElement);
      this._element.appendChild(target);
    }
  }

  _onActive = (e: MapMouseEvent | MapTouchEvent) => {
    if (this._element.contains(e.originalEvent.target as any)) {
      this._map.once("mouseup", this._onInactive);
      this._map.once("touchend", this._onInactive);

      this._element.classList.add("active");
    }
  };

  _onInactive = () => {
    this._element.classList.remove("active");
  };

  addTo(map: Map): this {
    Marker.prototype.addTo.apply(this, [map]);
    this._map.on("mousedown", this._onActive);
    this._map.on("touchstart", this._onActive);

    return this;
  }

  remove(): this {
    if (this._map) {
      this._map.off("mousedown", this._onActive);
      this._map.off("touchstart", this._onActive);
    }

    Marker.prototype.remove.apply(this);

    return this;
  }

  setIcon(icon?: string | HTMLElement | SVGSVGElement | (() => HTMLElement | SVGSVGElement)): this {
    this.resetIconText();
    this._icon = icon;

    if (!icon) {
      return this;
    }

    this._circleElement = DOM.create("div", "circle", this._markerElement);

    if (typeof icon === "string") {
      this._iconElement = DOM.create("i", icon, this._markerElement);
      this._iconElement.className = icon || "";
    } else if (typeof icon === "function") {
      this._iconElement = icon();
      this._markerElement?.append(this._iconElement);
    } else {
      this._iconElement = icon;
      this._markerElement?.append(icon);
    }

    return this;
  }

  getIcon() {
    return this._icon;
  }

  resetIconText() {
    this._circleElement?.remove();
    this._iconElement?.remove();
    this._textElement?.remove();
    this._circleElement = null;
    this._iconElement = null;
    this._textElement = null;
  }

  setText(text?: string): this {
    this.resetIconText();
    this._text = text;

    if (!text) {
      return this;
    }

    this._circleElement = DOM.create("div", "circle", this._markerElement);
    this._textElement = DOM.create("div", "text", this._markerElement);
    this._textElement.innerText = text;

    return this;
  }

  getText() {
    return this._text;
  }

  setColor(color?: string): this {
    this._color = color || defaultColor;
    this._element.style.setProperty("--marker-color", this._color);
    return this;
  }

  getColor() {
    return this._color;
  }

  setScale(scale = 1, markerHeight = defaultHeight): this {
    this._scale = scale;
    this._height = markerHeight * this._scale;
    this._element.style.setProperty("--marker-size", `${this._height}px`);

    return this;
  }

  getScale() {
    return this._scale;
  }

  setPopup(popup?: FloatingPopup | Popup | null): this {
    if (this._popup) {
      this._popup.remove();
      delete this._popup;
      this._element.removeEventListener("keypress", this._onKeyPress);

      if (!this._originalTabIndex) {
        this._element.removeAttribute("tabindex");
      }
    }

    if (popup) {
      if (!("offset" in popup.options)) {
        // offset of FloatingPopup is typed as OffsetOptions
        // not Offset like Popup
        if (popup instanceof Popup) {
          popup.options.offset = this._height + arrowHeight;
        } else {
          popup.options.offset = {
            mainAxis: this._height + arrowHeight,
          };
        }
      }

      this._popup = popup;
      if (this._lngLat) this._popup.setLngLat(this._lngLat);

      this._originalTabIndex = this._element.getAttribute("tabindex") || "";
      if (!this._originalTabIndex) {
        this._element.setAttribute("tabindex", "0");
      }
      this._element.addEventListener("keypress", this._onKeyPress);
    }

    return this;
  }

  setDraggable(shouldBeDraggable?: boolean | undefined): this {
    Marker.prototype.setDraggable.apply(this, [shouldBeDraggable]);
    this._element.classList.toggle("draggable", shouldBeDraggable);
    return this;
  }
}
