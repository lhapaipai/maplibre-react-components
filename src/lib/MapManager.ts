import type {
  Map,
  PaddingOptions,
  StyleSpecification,
  MapOptions,
  MapContextEvent,
  MapDataEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapLibreEvent,
  MapLibreZoomEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapStyleImageMissingEvent,
  MapTerrainEvent,
  MapWheelEvent,
  TransformStyleFunction,
  StyleSwapOptions,
} from "maplibre-gl";
import maplibregl from "maplibre-gl";

import {
  deepEqual,
  filterMapProps,
  prepareEventDep,
  transformPropsToOptions,
  updateListeners,
} from "./util";

import { type RTerrainProps } from "../components/RTerrain";
import { type RLayerProps } from "../components/RLayer";
import { type RSourceProps } from "../components/RSource";

const eventNameToCallbackName = {
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mouseout: "onMouseOut",
  mousemove: "onMouseMove",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  click: "onClick",
  dblclick: "onDblClick",
  contextmenu: "onContextMenu",
  touchstart: "onTouchStart",
  touchend: "onTouchEnd",
  touchcancel: "onTouchCancel",
  touchmove: "onTouchMove",

  movestart: "onMoveStart",
  move: "onMove",
  moveend: "onMoveEnd",
  dragstart: "onDragStart",
  drag: "onDrag",
  dragend: "onDragEnd",
  zoomstart: "onZoomStart",
  zoom: "onZoom",
  zoomend: "onZoomEnd",
  rotatestart: "onRotateStart",
  rotate: "onRotate",
  rotateend: "onRotateEnd",
  pitchstart: "onPitchStart",
  pitch: "onPitch",
  pitchend: "onPitchEnd",

  wheel: "onWheel",
  resize: "onResize",
  remove: "onRemove",
  boxzoomstart: "onBoxZoomStart",
  boxzoomend: "onBoxZoomEnd",
  boxzoomcancel: "onBoxZoomCancel",
  webglcontextlost: "onWebglContextLost",
  webglcontextrestored: "onWebglContextRestored",
  load: "onLoad",
  render: "onRender",
  idle: "onIdle",
  error: "onError",
  data: "onData",
  styledata: "onStyleData",
  sourcedata: "onSourceData",
  dataloading: "onDataLoading",
  styledataloading: "onStyleDataLoading",
  sourcedataloading: "onSourceDataLoading",
  tiledataloading: "onTileDataLoading",
  styleimagemissing: "onStyleImageMissing",
  dataabort: "onDataAbort",
  sourcedataabort: "onSourceDataAbort",
  terrain: "onTerrain",
} as const;

type MapEvent =
  | MapLayerMouseEvent
  | MapLayerTouchEvent
  | MapWheelEvent
  | MapLibreEvent
  | MapLibreZoomEvent
  | MapContextEvent
  | ErrorEvent
  | MapDataEvent
  | MapStyleDataEvent
  | MapSourceDataEvent
  | MapStyleImageMissingEvent
  | MapTerrainEvent;

export type MapCallbacks = {
  /** Compatible with `layerId` */
  onMouseDown?: (e: MapLayerMouseEvent) => void;
  onMouseUp?: (e: MapLayerMouseEvent) => void;
  onMouseOver?: (e: MapLayerMouseEvent) => void;
  onMouseOut?: (e: MapLayerMouseEvent) => void;
  onMouseMove?: (e: MapLayerMouseEvent) => void;
  onMouseEnter?: (e: MapLayerMouseEvent) => void;
  onMouseLeave?: (e: MapLayerMouseEvent) => void;
  onClick?: (e: MapLayerMouseEvent) => void;
  onDblClick?: (e: MapLayerMouseEvent) => void;
  onContextMenu?: (e: MapLayerMouseEvent) => void;
  onTouchStart?: (e: MapLayerTouchEvent) => void;
  onTouchEnd?: (e: MapLayerTouchEvent) => void;
  onTouchCancel?: (e: MapLayerTouchEvent) => void;
  onTouchMove?: (e: MapLayerTouchEvent) => void;

  /** Not compatible with `layerId` */
  onWheel?: (e: MapWheelEvent) => void;
  onResize?: (e: MapLibreEvent) => void;
  onRemove?: (e: MapLibreEvent) => void;

  onMoveStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onMove?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onMoveEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onDragStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onDrag?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onDragEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onZoomStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onZoom?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onZoomEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onRotateStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onRotate?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onRotateEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onPitchStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onPitch?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onPitchEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;

  onBoxZoomStart?: (e: MapLibreZoomEvent) => void;
  onBoxZoomEnd?: (e: MapLibreZoomEvent) => void;
  onBoxZoomCancel?: (e: MapLibreZoomEvent) => void;
  onWebglContextLost?: (e: MapContextEvent) => void;
  onWebglContextRestored?: (e: MapContextEvent) => void;
  onLoad?: (e: MapLibreEvent) => void;
  onRender?: (e: MapLibreEvent) => void;
  onIdle?: (e: MapLibreEvent) => void;
  onError?: (e: ErrorEvent) => void;
  onData?: (e: MapDataEvent) => void;
  onStyleData?: (e: MapStyleDataEvent) => void;
  onSourceData?: (e: MapSourceDataEvent) => void;
  onDataLoading?: (e: MapDataEvent) => void;
  onStyleDataLoading?: (e: MapStyleDataEvent) => void;
  onSourceDataLoading?: (e: MapSourceDataEvent) => void;
  onTileDataLoading?: (e: MapDataEvent) => void;
  onStyleImageMissing?: (e: MapStyleImageMissingEvent) => void;
  onDataAbort?: (e: MapDataEvent) => void;
  onSourceDataAbort?: (e: MapSourceDataEvent) => void;
  onTerrain?: (e: MapTerrainEvent) => void;
};

export const mapReactiveOptionNames = [
  "maxBounds",
  "minZoom",
  "maxZoom",
  "minPitch",
  "maxPitch",
  "renderWorldCopies",
  "pixelRatio",
] as const;
export type MapReactiveOptionName = (typeof mapReactiveOptionNames)[number];
export type MapReactiveOptions = {
  [key in MapReactiveOptionName]?: MapOptions[key];
};

export const mapNonReactiveOptionNames = [
  "hash",
  "interactive",
  "bearingSnap",
  "attributionControl",
  "maplibreLogo",
  "logoPosition",
  "failIfMajorPerformanceCaveat",
  "preserveDrawingBuffer",
  "antialias",
  "refreshExpiredTiles",
  "trackResize",
  "maxTileCacheSize",
  "maxTileCacheZoomLevels",
  "transformRequest",
  "transformCameraUpdate",
  "locale",
  "fadeDuration",
  "crossSourceCollisions",
  "collectResourceTiming",
  "clickTolerance",
  "validateStyle",
  "maxCanvasSize",

  "center",
  "zoom",
  "bearing",
  "pitch",
  "bounds", // overrides center and zoom
  "fitBoundsOptions", // only if bounds set and only for initial state

  "localIdeographFontFamily",
  "pitchWithRotate", // option for dragRotate handler (activate or not MousePitchHandler)

  "cancelPendingTileRequestsWhileZooming",
] as const;
export type MapNonReactiveOptionName = (typeof mapNonReactiveOptionNames)[number];
export type MapInitialOptionName = `initial${Capitalize<MapNonReactiveOptionName>}`;
export type MapInitialOptions = {
  [key in MapNonReactiveOptionName as `initial${Capitalize<key>}`]?: MapOptions[key];
};

export const mapHandlerNames = [
  "scrollZoom",
  "boxZoom",

  /**
   * DragRotateHandler is a composition of multiple handlers
   * MouseRotateHandler
   * MousePitchHandler (can be disabled with "pitchWithRotate" option)
   */
  "dragRotate", // right click rotate the map (right click can optionnaly pitch the map)
  "dragPan", // left click pan the map

  "keyboard",
  "doubleClickZoom", // shift + dbl-click dezoom

  /**
   * TwoFingersTouchZoomRotateHandler is a composition of multiple handlers
   * touchZoom   : TwoFingersTouchZoomHandler
   * touchRotate : TwoFingersTouchRotateHandler (can be disabled)
   * tapDragZoom : TapDragZoomHandler
   */
  "touchZoomRotate",
  "touchPitch",

  /**
   * desktop: ctrl + click to zoom
   * touch screen: two fingers to move the map
   */
  "cooperativeGestures",
] as const;
export type MapHandlerOptionName = (typeof mapHandlerNames)[number];
export type MapHandlerOptions = {
  [key in MapHandlerOptionName]?: MapOptions[key];
};

export type ManagerOptions = {
  mapStyle?: StyleSpecification | string;
  padding?: PaddingOptions;

  styleDiffing?: boolean;
  styleTransformStyle?: TransformStyleFunction;
  // terrain?: StyleSpecification["terrain"];
  // interactiveLayerIds?: string[];
};

export type MapProps = MapReactiveOptions & MapHandlerOptions & MapInitialOptions & MapCallbacks;

const DEFAULT_STYLE = "https://demotiles.maplibre.org/style.json";

export class MapManager {
  reactiveOptions: MapReactiveOptions = {};
  handlerOptions: MapHandlerOptions = {};
  eventNames: string[] = [];
  callbacks: MapCallbacks;

  private _map: Map;

  padding?: PaddingOptions;
  mapStyle: string | StyleSpecification;

  controlledSources: {
    [key: string]: RSourceProps;
  } = {};
  controlledLayers: {
    [key: string]: RLayerProps;
  } = {};
  controlledTerrain: RTerrainProps | null = null;

  constructor(
    { mapStyle = DEFAULT_STYLE, padding }: ManagerOptions,
    mapProps: MapProps,
    container: HTMLDivElement,
  ) {
    this.mapStyle = mapStyle;
    this.padding = padding;

    const [mapBaseOptions, callbacks] = transformPropsToOptions(mapProps) as [
      Omit<MapOptions, "style" | "container">,
      MapCallbacks,
    ];

    this.callbacks = callbacks;

    const mapOptions = {
      ...mapBaseOptions,
      container,
      style: mapStyle,
    };

    const map = new maplibregl.Map(mapOptions);

    map.style.on("error", this._onStyleError);

    if (padding) {
      map.setPadding(padding);
    }

    this._map = map;

    this._updateCallbacks(callbacks);
  }

  setProps(
    { mapStyle = DEFAULT_STYLE, styleDiffing = true, styleTransformStyle, padding }: ManagerOptions,
    mapProps: MapProps,
  ) {
    const [reactiveOptions, callbacks, handlerOptions] = filterMapProps(mapProps);

    this._updateCallbacks(callbacks);
    this._updateStyle(mapStyle, {
      diff: styleDiffing,
      transformStyle: styleTransformStyle,
    });
    this._updateReactiveOptions(reactiveOptions, { padding });
    this._updateHandlers(handlerOptions);
  }

  getControlledTerrain(): RTerrainProps | null {
    return this.controlledTerrain;
  }
  setControlledTerrain(terrainProps: RTerrainProps | null): void {
    this.controlledTerrain = terrainProps;
  }

  getControlledLayer(id: string): RLayerProps | null {
    return this.controlledLayers[id] ?? null;
  }
  setControlledLayer(id: string, layerProps: RLayerProps | null) {
    if (!layerProps) {
      delete this.controlledLayers[id];
    } else {
      this.controlledLayers[id] = layerProps;
    }
  }

  getControlledSource(id: string): RSourceProps | null {
    return this.controlledSources[id] ?? null;
  }
  setControlledSource(id: string, layerProps: RSourceProps | null) {
    if (!layerProps) {
      delete this.controlledSources[id];
    } else {
      this.controlledSources[id] = layerProps;
    }
  }

  _updateStyle(nextStyle: StyleSpecification | string, options: StyleSwapOptions) {
    const curStyle = this.mapStyle;

    if (nextStyle !== curStyle) {
      this.mapStyle = nextStyle;
      this._map.setStyle(nextStyle, {
        diff: options.diff,
        transformStyle: (prevStyle, nextStyle) => {
          const prevControlledSources = prevStyle
            ? Object.fromEntries(
                Object.entries(prevStyle?.sources).filter(
                  ([sourceId]) => sourceId in this.controlledSources,
                ),
              )
            : {};

          const prevControlledLayers = prevStyle
            ? prevStyle.layers.filter((layer) => layer.id in this.controlledLayers)
            : [];

          const result = {
            ...nextStyle,
            sources: {
              ...nextStyle.sources,
              ...prevControlledSources,
            },
            layers: [...nextStyle.layers, ...prevControlledLayers],
            terrain: this.controlledTerrain ? prevStyle?.terrain : nextStyle.terrain,
          };

          return options.transformStyle ? options.transformStyle(prevStyle, result) : result;
        },
      });
    }
  }

  _updateReactiveOptions(
    nextReactiveOptions: MapReactiveOptions,
    { padding }: { padding?: PaddingOptions },
  ) {
    const currReactiveOptions = this.reactiveOptions;
    this.reactiveOptions = nextReactiveOptions;

    for (const optionName of mapReactiveOptionNames) {
      if (
        optionName in nextReactiveOptions &&
        !deepEqual(currReactiveOptions[optionName], nextReactiveOptions[optionName])
      ) {
        const setterName = `set${optionName[0].toUpperCase()}${optionName.substring(1)}`;
        // @ts-ignore
        this._map[setterName](nextReactiveOptions[optionName]);
      }
    }

    if (padding && !deepEqual(this.padding, padding)) {
      this._map.setPadding(padding);
    }
    this.padding = padding;
  }

  _updateCallbacks(callbacks: MapCallbacks = {}) {
    this.callbacks = callbacks;

    const nextEventNames = prepareEventDep(eventNameToCallbackName, callbacks);
    if (this.eventNames.join("-") === nextEventNames.join("-")) {
      return;
    }

    updateListeners(
      this.eventNames,
      nextEventNames,
      (eventName) => this._map.on(eventName, this._onMapEvent),
      (eventName) => this._map.off(eventName, this._onMapEvent),
    );

    this.eventNames = nextEventNames;
  }

  _updateHandlers(nextHandlers: MapHandlerOptions) {
    const currHandlers = this.handlerOptions;
    this.handlerOptions = nextHandlers;

    for (const propName of mapHandlerNames) {
      // handlers are enabled by default.
      const nextValue = nextHandlers[propName] ?? true;
      const currValue = currHandlers[propName] ?? true;
      if (!deepEqual(nextValue, currValue)) {
        if (nextValue) {
          // enable can have options `scrollZoom` / `twoFingersTouch` / `dragPan` / `touchZoomRotate`
          // @ts-ignore
          this._map[propName].enable(nextValue);
        } else {
          this._map[propName].disable();
        }
      }
    }
  }

  _onStyleError = (event: ErrorEvent) => {
    if (event.error.name !== "AbortError") {
      console.error(event.error);
    }
  };

  _onMapEvent = (e: MapEvent) => {
    const eventType = e.type as keyof typeof eventNameToCallbackName;
    const callbackName = eventNameToCallbackName[eventType];
    if (this.callbacks[callbackName]) {
      // @ts-ignore
      this.callbacks[callbackName]?.(e);
    } else {
      console.info("not managed RMap event", eventType, e);
    }
  };

  get map() {
    return this._map;
  }

  destroy() {
    this._updateCallbacks();
    this._map.remove();
  }
}
