import { ControlPosition } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { updateClassNames } from "../lib/util";
import { useMap } from "./useMap";

type RControlHookOptions<T extends string = ControlPosition> = {
  position: T;
  className?: string;
};

type RControlHookReturn = {
  container: HTMLDivElement;
};

export function useRControl<T extends string = ControlPosition>({
  position,
  className = "maplibregl-ctrl maplibregl-ctrl-group",
}: RControlHookOptions<T>): RControlHookReturn {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement>();

  const prevOptionsRef = useRef<{ className: string }>({
    className,
  });

  if (!containerRef.current) {
    const ctrl = document.createElement("div");
    ctrl.className = className;

    containerRef.current = ctrl;
  }
  useEffect(() => {
    const ctrl = containerRef.current;

    if (ctrl && !ctrl.parentElement) {
      const positionContainer = map._controlPositions[position];
      if (!positionContainer) {
        throw new Error(`Unable to add control, position ${position} doesn't exists`);
      }
      if (position.indexOf("bottom") !== -1) {
        positionContainer.insertBefore(ctrl, positionContainer.firstChild);
      } else {
        positionContainer.appendChild(ctrl);
      }
    }

    return () => {
      containerRef.current && containerRef.current.remove();
    };
  }, [map, position]);

  if (prevOptionsRef.current.className !== className) {
    updateClassNames(
      containerRef.current,
      prevOptionsRef.current.className?.split(" ") || [],
      className?.split(" ") || [],
    );
  }

  prevOptionsRef.current = {
    className,
  };

  return {
    container: containerRef.current,
  };
}
