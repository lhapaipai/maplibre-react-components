import { createContext } from "react";
import { MapManager } from "./lib/MapManager";

export type MapLibreContext = {
  mapManager?: MapManager;
};

export const mapLibreContext = createContext<MapLibreContext>({
  mapManager: undefined,
});
