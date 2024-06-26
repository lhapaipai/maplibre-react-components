import { Map } from "maplibre-gl";
import { MutableRefObject, useCallback, useRef } from "react";

type useMapAndCanvasRefsReturn = {
  mapRef: MutableRefObject<Map>;
  canvasRef: MutableRefObject<HTMLElement>;
  setMapAndCanvasRef: (map: Map) => void;
};

export const useMapAndCanvasRefs = (): useMapAndCanvasRefsReturn => {
  const mapRef = useRef<Map>(null!);
  const canvasRef = useRef<HTMLElement>(null!);
  const setMapAndCanvasRef = useCallback((map: Map) => {
    mapRef.current = map;
    canvasRef.current = map?.getCanvasContainer();
  }, []);

  return { mapRef, canvasRef, setMapAndCanvasRef };
};
