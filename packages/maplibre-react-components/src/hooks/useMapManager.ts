import { useContext, useEffect, useState } from "react";
import { RMapContext } from "../contexts/RMapContextProvider";
import { CurrentMapIdContext } from "../contexts/CurrentMapIdContext";
import { MapManager } from "../lib";

export function useMapManager(): MapManager;
export function useMapManager(id: string): MapManager | null;
export function useMapManager(optionalId?: string) {
  const mapManagersRef = useContext(RMapContext);
  const currentMapId = useContext(CurrentMapIdContext);

  const id = optionalId ?? currentMapId;
  const mapManager = mapManagersRef?.current.get(id) ?? null;

  const mountedState = useState(mapManager !== null);

  if (!mapManagersRef?.current) {
    throw new Error(
      "use useMapManager in components inside <RMap /> or inside <RMapContextProvider />",
    );
  }
  if (!id) {
    throw new Error("provide an id to useMap or use inside <RMap />");
  }

  useEffect(() => {
    const mapManagers = mapManagersRef.current;
    if (!mapManagers) {
      throw new Error("mapManagers can't disappear");
    }

    mapManagers.addListener(id, mountedState);

    return () => {
      mapManagers.removeListener(id, mountedState);
    };

    // when mountedState value change,
    // listener with old state value is removed and a new listener is registered.
    // I think it doesn't matter for performance
    // Otherwise it would be necessary to put this in a reference
  }, [id, mapManagersRef, mountedState, mapManager]);

  return mapManager;
}
