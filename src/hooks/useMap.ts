import { Map } from "maplibre-gl";
import { useMapManager } from "./useMapManager";

export function useMap(): Map;
export function useMap(id: string): Map | null;
export function useMap(optionalId?: string) {
  // @ts-ignore optionalId expected type: string | undefined
  return useMapManager(optionalId)?.map ?? null;
}
