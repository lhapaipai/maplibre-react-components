import { createContext, MutableRefObject, ReactNode, useRef } from "react";
import { MapManagers } from "../lib/MapManagers";

export const RMapContext = createContext<MutableRefObject<MapManagers> | null>(null);

interface RMapContextProviderProps {
  children: ReactNode;
}

export const RMapContextProvider = ({ children }: RMapContextProviderProps) => {
  const mapManagersRef = useRef<MapManagers>(null!);
  if (!mapManagersRef.current) {
    mapManagersRef.current = new MapManagers();
  }

  return <RMapContext.Provider value={mapManagersRef}>{children}</RMapContext.Provider>;
};
