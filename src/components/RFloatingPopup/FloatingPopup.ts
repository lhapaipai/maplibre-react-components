import { Evented, LngLat, LngLatLike, Map, MapMouseEvent } from "maplibre-gl";
import { extend } from "../../maplibre-core/util/util";
import { smartWrap } from "../../maplibre-core/util/smart_wrap";
import { DOM } from "../../maplibre-core/util/dom";

import type Point from "@mapbox/point-geometry";
import VirtualElement from "./VirtualElement";

import {
  OffsetOptions,
  Placement,
  Side,
  arrow,
  computePosition,
  flip,
  hide,
  limitShift,
  offset,
  shift,
} from "@floating-ui/dom";
import { buttonVariants } from "pentatrion-design/components/button";
import { dialogVariants } from "pentatrion-design/components/dialog";
import { type ThemeColor } from "pentatrion-design/types";

import clsx from "clsx";
import { arrowHeight } from "./util";
// import "pentatrion-design/components/dialog/Dialog.scss";
// import "pentatrion-design/components/button/Button.scss";

/**
 * from ./core/util/evented
 * please do not export this event, it may conflict with
 * maplibre-react-components Event interface
 */
class Event {
  readonly type: string;

  constructor(type: string, data: any = {}) {
    extend(this, data);
    this.type = type;
  }
}

export interface FloatingPopupOptions {
  closeButton?: boolean;
  closeOnClick?: boolean;
  closeOnMove?: boolean;
  placement?: Placement;

  // be careful OffsetOptions type come from Floating UI
  // and is different to Options from maplibre-gl
  offset?: OffsetOptions;

  className?: string;
  maxWidth?: string;
  borderColor?: ThemeColor;
}

const defaultOptions = {
  closeButton: true,
  closeOnClick: true,
  closeOnMove: false,
  placement: "top",
  maxWidth: "240px",
  borderColor: "yellow",
};

export class FloatingPopup extends Evented {
  _map?: Map;
  options: FloatingPopupOptions;
  _content?: HTMLElement;
  _container?: HTMLElement;
  _dialog?: HTMLElement;
  _closeButton?: HTMLButtonElement;
  _tip?: HTMLElement;
  _lngLat?: LngLat;
  _trackPointer = false;
  _prevPos?: Point;
  _pos?: Point;
  _flatPos?: Point;
  _virtualElement: VirtualElement;

  constructor(options?: FloatingPopupOptions) {
    super();
    this.options = extend(Object.create(defaultOptions), options);
    this._virtualElement = new VirtualElement();
  }

  isOpen() {
    return !!this._map;
  }

  getElement() {
    return this._container;
  }

  remove = (): this => {
    if (this._container) {
      DOM.remove(this._container);
      delete this._container;
    }
    if (this._map) {
      this._map.off("move", this._onClose);
      this._map.off("click", this._onClose);
      this._map.off("remove", this.remove);
      this._removePositionListeners();

      delete this._map;
    }

    this.fire(new Event("close"));

    return this;
  };

  getLngLat() {
    return this._lngLat;
  }

  addTo(map: Map): this {
    if (this._map) this.remove();

    this._map = map;
    if (this.options.closeOnClick) {
      this._map.on("click", this._onClose);
    }
    if (this.options.closeOnMove) {
      this._map.on("move", this._onClose);
    }

    this._map.on("remove", this.remove);

    this._update();
    this._refreshPositionListeners();

    this.fire(new Event("open"));

    return this;
  }

  _removePositionListeners() {
    if (!this._map) {
      return;
    }
    this._map.off("move", this._update);
    this._map.off("mousemove", this._onMouseMove);
    this._map.off("mouseup", this._onMouseUp);
    this._map.off("drag", this._onDrag);
  }

  _refreshPositionListeners() {
    if (!this._map) {
      return;
    }
    this._removePositionListeners();

    if (this._trackPointer) {
      this._map.on("mousemove", this._onMouseMove);
      this._map.on("mouseup", this._onMouseUp);
      this._map.on("drag", this._onDrag);
    } else {
      this._map.on("move", this._update);
    }

    this._container?.classList.toggle("maplibregl-track-pointer", this._trackPointer);
    this._map._canvasContainer.classList.toggle("maplibregl-track-pointer", this._trackPointer);
  }

  setLngLat(lnglat: LngLatLike): this {
    this._trackPointer = false;
    this._lngLat = LngLat.convert(lnglat);
    delete this._pos;
    delete this._prevPos;
    delete this._flatPos;

    this._update();
    this._refreshPositionListeners();

    return this;
  }

  trackPointer(): this {
    this._trackPointer = true;
    delete this._pos;
    delete this._prevPos;
    delete this._flatPos;

    this._update();
    this._refreshPositionListeners();

    return this;
  }

  setText(text: string, title?: string): this {
    return this.setDOMContent(document.createTextNode(text), title);
  }

  setHTML(html: string, title?: string): this {
    const description = DOM.create("div", "p-2");
    const temp = document.createElement("body");
    let child;
    temp.innerHTML = html;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      child = temp.firstChild;
      if (!child) break;
      description.appendChild(child);
    }

    return this.setDOMContent(description, title);
  }

  getMaxWidth() {
    return this._container?.style.maxWidth;
  }

  setMaxWidth(maxWidth: string): this {
    this.options.maxWidth = maxWidth;
    this._update();
    return this;
  }

  setDOMContent(htmlNode: Node, title?: string): this {
    if (this._content) {
      // Clear out children first.
      while (this._content.hasChildNodes()) {
        if (this._content.firstChild) {
          this._content.removeChild(this._content.firstChild);
        }
      }
    } else {
      this._content = DOM.create("div");
    }

    this._createActions();
    this._createHeader(title);

    this._content.appendChild(htmlNode);

    this._update();

    return this;
  }

  addClassName(className: string) {
    if (this._container) {
      this._container.classList.add(className);
    }
  }

  removeClassName(className: string) {
    if (this._container) {
      this._container.classList.remove(className);
    }
  }

  setOffset(offset?: OffsetOptions): this {
    this.options.offset = offset;
    this._update();
    return this;
  }

  toggleClassName(className: string): boolean | undefined {
    if (this._container) {
      return this._container.classList.toggle(className);
    }
  }

  _onMouseUp = (event: MapMouseEvent) => {
    this._update(event.point);
  };

  _onMouseMove = (event: MapMouseEvent) => {
    this._update(event.point);
  };

  _onDrag = (event: MapMouseEvent) => {
    this._update(event.point);
  };

  _update = (cursorPosition?: Point) => {
    const hasPosition = this._lngLat || this._trackPointer;

    if (!this._map || !hasPosition || !this._content) {
      return;
    }

    if (!this._container || !this._dialog) {
      this._container = DOM.create(
        "div",
        // we need placement-top because we need initial border to compute the real popup height
        "absolute top-0 left-0 w-max min-w-[150px] [&[data-track-pointer='true']]:select-none [&[data-track-pointer='true']]:pointer-events-none",
        this._map.getContainer(),
      );

      this._dialog = DOM.create(
        "div",
        // we need placement-top because we need initial border to compute the real popup height
        clsx(
          "animate-fade-in rounded-2xl relative shadow dark:shadow-dark",
          dialogVariants.color("yellow"),
        ),
        this._container,
      );
      this._dialog.dataset.placement = "top";
      this._dialog.dataset.color = "yellow";

      if (this.options.className) {
        for (const name of this.options.className.split(" ")) {
          this._container.classList.add(name);
        }
      }
      this._dialog.appendChild(this._content);
      this._tip = DOM.create("div", "p8n-arrow", this._dialog);
    }

    if (this.options.maxWidth && this._dialog.style.maxWidth !== this.options.maxWidth) {
      this._dialog.style.maxWidth = this.options.maxWidth;
    }

    if (this._map.transform.renderWorldCopies && !this._trackPointer) {
      // @ts-ignore
      this._lngLat = smartWrap(this._lngLat, this._flatPos, this._map.transform);
    } else {
      this._lngLat = this._lngLat?.wrap();
    }

    this._container.dataset.trackPointer = this._trackPointer.toString();

    if (this._trackPointer && !cursorPosition) return;

    const pos =
      (this._flatPos =
      this._pos =
        this._trackPointer && cursorPosition ? cursorPosition : this._map.project(this._lngLat!));

    if (this._map.terrain) {
      this._flatPos =
        this._trackPointer && cursorPosition
          ? cursorPosition
          : this._map.transform.locationPoint(this._lngLat!);
    }

    this._virtualElement.setCoords(pos.x, pos.y);

    if (this._prevPos && this._prevPos.x === pos.x && this._prevPos.y === pos.y) {
      return;
    }

    this._prevPos = pos;

    computePosition(this._virtualElement, this._container, {
      placement: this.options.placement,
      middleware: [
        offset(this.options.offset || arrowHeight),
        flip({
          mainAxis: !this.options.offset,
        }),
        shift({
          padding: arrowHeight,
          limiter: limitShift({
            offset: 15,
          }),
        }),
        arrow({
          element: this._tip!,
          padding: 12,
        }),
        hide({
          padding: -400,
        }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      if (!this._container) {
        return;
      }

      this._container.style.visibility = middlewareData.hide?.referenceHidden
        ? "hidden"
        : "visible";
      if (middlewareData.hide?.referenceHidden) {
        return;
      }

      this._container.style.transform = `translate(${x}px, ${y}px)`;

      const { x: arrowX, y: arrowY } = middlewareData.arrow!;

      const currentSide = placement.split("-")[0] as Side;

      if (this._dialog) {
        this._dialog.dataset.placement = currentSide;
      }

      // arrow
      const staticSide: "bottom" | "left" | "top" | "right" = (
        {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        } as const
      )[currentSide];

      const arrowStyle = {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-6px",
      };
      Object.assign(this._tip!.style, arrowStyle);
    });
  };

  _createActions() {
    if (this.options.closeButton) {
      const actions = DOM.create("div", "p-1 float-right", this._content);

      this._closeButton = DOM.create(
        "button",
        clsx(
          "rounded-2xl cursor-pointer relative overflow-clip focus-visible:outline focus-visible:outline-2 no-underline border-0 inline-flex items-center transition-color-shadow duration-300 leading-5",
          "justify-center min-w-8 h-8 [&_i]:w-8 [&_:last-child:not(i)]:pr-4", // icon
          buttonVariants.variant.text("gray"),
        ),
        actions,
      );
      this._closeButton.type = "button";
      this._closeButton.setAttribute("aria-label", "Close popup");
      DOM.create("i", "fe-cancel", this._closeButton);
      this._closeButton.addEventListener("click", this._onClose);
    }
  }

  _createHeader(title?: string) {
    if (title) {
      const header = DOM.create("header", "flex items-center px-2 pt-2", this._content);
      const h4 = DOM.create("h4", undefined, header);
      h4.innerText = title;
    }
  }

  _onClose = () => {
    this.remove();
  };
}
