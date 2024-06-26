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

export function ContextMenuEventDispatcher({
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
     */
    const eventName = window.matchMedia("(pointer: coarse)").matches ? "click" : "contextmenu";

    function handleContextMenu({ originalEvent, point, lngLat }: MapMouseEvent) {
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
    }

    map.on(eventName, handleContextMenu);
    return () => {
      map.off(eventName, handleContextMenu);
    };
  }, [map, enabled, customEventName]);

  return null;
}
