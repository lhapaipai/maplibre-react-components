import type { MapLayerMouseEvent, MapLibreEvent, Popup, PopupOptions } from "maplibre-gl";
import maplibregl from "maplibre-gl";

import {
  ReactNode,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useMap } from "../../hooks/useMap";
import {
  deepEqual,
  prepareEventDep,
  transformPropsToOptions,
  updateClassNames,
} from "../../lib/util";

const eventNameToCallbackName = {
  map_click: "onMapClick",
  map_move: "onMapMove",
} as const;
export type PopupEventName = keyof typeof eventNameToCallbackName;
type PopupCallbackName = (typeof eventNameToCallbackName)[PopupEventName];

type PopupEvent =
  | MapLayerMouseEvent
  | MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;

export type PopupCallbacks = {
  onMapClick?: (e: MapLayerMouseEvent) => void;
  onMapMove?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
};

export const popupReactiveOptionNames = ["className", "offset", "maxWidth"] as const;
export type PopupReactiveOptionName = (typeof popupReactiveOptionNames)[number];
export type PopupReactiveOptions = {
  [key in PopupReactiveOptionName]?: PopupOptions[key];
};

export const popupNonReactiveOptionNames = [
  "focusAfterOpen",
  "anchor",
  "subpixelPositioning",
  "locationOccludedOpacity",
] as const;
export type PopupNonReactiveOptionName = (typeof popupNonReactiveOptionNames)[number];
export type PopupInitialOptionName = `initial${Capitalize<PopupNonReactiveOptionName>}`;
export type PopupInitialOptions = {
  [key in PopupNonReactiveOptionName as `initial${Capitalize<key>}`]?: PopupOptions[key];
};

export type PopupProps = PopupInitialOptions & PopupReactiveOptions & PopupCallbacks;

export type RPopupProps = PopupProps & {
  longitude?: number;
  latitude?: number;
  children?: ReactNode;
};

export const RPopup = memo(
  forwardRef<Popup, RPopupProps>(function RPopup(props, ref) {
    const { longitude, latitude, children, ...popupProps } = props;
    const map = useMap();
    const [options, callbacks] = transformPropsToOptions(popupProps) as [
      PopupProps,
      PopupCallbacks,
    ];

    const popupRef = useRef<Popup>(null!);
    const prevOptionsRef = useRef<PopupOptions>(options);
    const currCallbacksRef = useRef<PopupCallbacks>(null!);
    currCallbacksRef.current = callbacks;

    const container = useMemo(() => {
      return document.createElement("div");
    }, []);

    if (!popupRef.current) {
      popupRef.current = new maplibregl.Popup({
        ...options,
        closeButton: false,
        closeOnClick: false,
        closeOnMove: false,
      });
      if (longitude !== undefined && latitude !== undefined) {
        popupRef.current.setLngLat([longitude, latitude]);
      }
    }

    const nextEventsStr = prepareEventDep(eventNameToCallbackName, callbacks).join("-");
    useEffect(() => {
      function onPopupEvent(e: PopupEvent) {
        const eventType = e.type;
        // @ts-ignore
        const callbackName = (eventNameToCallbackName[eventType] ||
          // @ts-ignore
          eventNameToCallbackName[`map_${eventType}`]) as PopupCallbackName;
        if (currCallbacksRef.current?.[callbackName]) {
          // @ts-ignore
          currCallbacksRef.current[callbackName]?.(e);
        } else {
          console.info("not managed RPopup event", eventType, e);
        }
      }

      if (nextEventsStr === "") {
        return;
      }

      const eventNames = nextEventsStr.split("-") as PopupEventName[];
      const popupStable = popupRef.current;

      eventNames.forEach((eventName) => {
        if (eventName.startsWith("map_")) {
          map.on(eventName.substring(4), onPopupEvent);
        } else {
          popupStable.on(eventName, onPopupEvent);
        }
      });

      return () => {
        eventNames.forEach((eventName) => {
          if (eventName.startsWith("map_")) {
            map.off(eventName.substring(4), onPopupEvent);
          } else {
            popupStable.off(eventName, onPopupEvent);
          }
        });
      };
    }, [nextEventsStr, map]);

    useEffect(() => {
      popupRef.current.setDOMContent(container).addTo(map);

      return () => void popupRef.current.remove();
    }, [container, map]);

    const { offset, maxWidth = "240px", className } = options;

    useImperativeHandle(ref, () => popupRef.current, [popupRef]);

    if (popupRef.current.isOpen()) {
      if (
        longitude !== undefined &&
        latitude !== undefined &&
        (popupRef.current.getLngLat().lng !== longitude ||
          popupRef.current.getLngLat().lat !== latitude)
      ) {
        popupRef.current.setLngLat([longitude, latitude]);
      }

      if (offset && !deepEqual(popupRef.current.options.offset, offset)) {
        popupRef.current.setOffset(offset);
      }

      if (prevOptionsRef.current.className !== className) {
        updateClassNames(
          container,
          prevOptionsRef.current.className?.split(" ") || [],
          className?.split(" ") || [],
        );
      }
      if (popupRef.current.getMaxWidth() !== maxWidth) {
        popupRef.current.setMaxWidth(maxWidth);
      }
    }

    prevOptionsRef.current = options;

    return createPortal(children, container);
  }),
);
