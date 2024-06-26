import { useRef } from "react";
import { useMap } from "./useMap";

export const useCanvasRef = () => {
  const map = useMap();
  const canvasRef = useRef(map.getCanvasContainer());
  return canvasRef;
};
