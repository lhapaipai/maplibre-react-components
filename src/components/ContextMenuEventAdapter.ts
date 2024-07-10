import { LngLat, type Map, MapMouseEvent } from "maplibre-gl";
import { useEffect } from "react";
import { useMap } from "../hooks/useMap";

type Point = ReturnType<InstanceType<typeof Map>["project"]>;

export interface MaplibreContextmenuEventDetail {
  originalEvent: MouseEvent;
  point: Point;
  lngLat: LngLat;
  emulated: boolean;
}

interface Props {
  customEventName?: string;
  enabled?: boolean;
}

export function ContextMenuEventAdapter({
  customEventName = "contextmenu-maplibre",
  enabled = true,
}: Props) {
  const map = useMap();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    /**
     * related issue: contextmenu not managed by Touch devices
     * https://github.com/maplibre/maplibre-gl-js/issues/373
     *
     * we use click for touch device because touchend/mouseup can conflict with handlers.
     */
    const eventName = window.matchMedia("(pointer: coarse)").matches ? "click" : "contextmenu";

    function handleContextMenu(evt: MapMouseEvent) {
      /**
       * we put a setTimeout to give time for the event to propagate and possibly cancel it
       */
      setTimeout(() => {
        if (evt.defaultPrevented) {
          return;
        }
        const { originalEvent, point, lngLat } = evt;
        map.getCanvasContainer().dispatchEvent(
          new CustomEvent<MaplibreContextmenuEventDetail>(customEventName, {
            detail: {
              originalEvent,
              point,
              lngLat,
              emulated: eventName !== "contextmenu",
            },
          }),
        );
      });
    }

    map.on(eventName, handleContextMenu);
    return () => {
      map.off(eventName, handleContextMenu);
    };
  }, [map, enabled, customEventName]);

  return null;
}
