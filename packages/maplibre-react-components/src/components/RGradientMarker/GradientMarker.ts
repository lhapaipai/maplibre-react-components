import type { MarkerOptions, Map } from "maplibre-gl";
import maplibregl from "maplibre-gl";

import { DOM } from "../../maplibre-core/util/dom";

type MarkerShape = "pin" | "circle" | "portrait" | "landscape";

export interface GradientMarkerOptions extends MarkerOptions {
  /**
   * when interactive
   * cursor pointer
   * hover effect
   * we add .active class when clicking
   * @default true
   */
  interactive?: boolean;
  shape?: MarkerShape;
  icon?: string | HTMLElement | SVGSVGElement | (() => HTMLElement | SVGSVGElement);
  text?: string;
  className?: string;
}

const defaultColor = "#ffe64b";
const defaultHeight = 50;

export class GradientMarker extends maplibregl.Marker {
  _interactive: boolean | "pending";
  _shape: MarkerShape;
  _icon?: string | HTMLElement | SVGSVGElement | (() => HTMLElement | SVGSVGElement);
  _height = defaultHeight;
  _text?: string;

  _circleElement: HTMLElement | null = null;
  _iconElement: HTMLElement | SVGSVGElement | null = null;
  _textElement: HTMLDivElement | null = null;
  _markerElement?: HTMLElement;

  constructor(options?: GradientMarkerOptions) {
    options ??= {};
    /* for compatibility with MarkerOptions we keep element option but it is overloaded */
    options.element = DOM.create("div", "maplibregl-gradient-marker");
    if (options.className) {
      options.element.classList.add(options.className);
    }

    super(options);

    if (this._draggable) {
      this._element.classList.add("draggable");
    }

    this._interactive = options && options.interactive === false ? false : "pending";
    this._shape = (options && options.shape) ?? "pin";
    this._color = (options && options.color) ?? defaultColor;
    this._icon = options && options.icon;
    this._text = options && options.text;

    this._defaultMarker = true;

    this._element.setAttribute("aria-label", "Map marker");
    this._element.setAttribute("tabindex", "0");

    this.setScale(this._scale);
    this.setColor(this._color);

    this._markerElement = DOM.create("div", `marker`);
    this.setShape(this._shape);

    if (this._text) {
      this.setText(this._text);
    } else if (this._icon) {
      this.setIcon(this._icon);
    }

    const target = DOM.create("div", "target");

    this._element.appendChild(this._markerElement);
    this._element.appendChild(target);
  }

  _onActive = () => {
    /**
     * draggable marker are pointer-events: none when dragging. we can't listen this._element.
     * when listening this._map.getContainer() we don't have this issue
     */
    this._map.getContainer().addEventListener("mouseup", this._onInactive, { once: true });
    this._map.getContainer().addEventListener("touchend", this._onInactive, { once: true });
    this._element.classList.add("active");
  };

  _onInactive = () => {
    this._element.classList.remove("active");
  };

  addTo(map: Map): this {
    maplibregl.Marker.prototype.addTo.apply(this, [map]);
    if (this._interactive === "pending") {
      this.setInteractive(true);
    }

    return this;
  }

  setInteractive(interactive = true) {
    if (this._interactive === interactive) {
      return;
    }
    this._interactive = interactive;
    if (interactive) {
      this._element.dataset.interactive = "";
    } else {
      delete this._element.dataset.interactive;
    }

    if (interactive) {
      this._element.addEventListener("mousedown", this._onActive);
      this._element.addEventListener("touchstart", this._onActive);
    } else {
      this._element.removeEventListener("mousedown", this._onInactive);
      this._element.removeEventListener("touchstart", this._onInactive);
    }
  }

  getInteractive(): boolean | "pending" {
    return this._interactive;
  }

  remove(): this {
    if (this._map) {
      this.setInteractive(false);
    }

    maplibregl.Marker.prototype.remove.apply(this);

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
    this._element.style.setProperty("--marker-scale", scale.toString());

    return this;
  }

  getScale() {
    return this._scale;
  }

  setShape(shape?: MarkerShape): this {
    this._shape = shape || "pin";
    this._anchor = this._shape === "circle" ? "center" : "bottom";
    this._element.dataset.shape = this._shape;

    this._update();
    return this;
  }

  getShape() {
    return this._shape;
  }

  setDraggable(shouldBeDraggable?: boolean | undefined): this {
    maplibregl.Marker.prototype.setDraggable.apply(this, [shouldBeDraggable]);
    this._element.classList.toggle("draggable", shouldBeDraggable);
    return this;
  }
}
