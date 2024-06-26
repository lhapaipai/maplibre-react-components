"use client";

import { RMap, RPopup } from "maplibre-react-components";
import { mapCSS } from "~/lib/map-util";

const center: [number, number] = [4.8, 45.7];

export default function App() {
  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      initialZoom={2}
      style={mapCSS}
    >
      <RPopup longitude={center[0]} latitude={center[1]}>
        Welcome Lyon !
      </RPopup>
    </RMap>
  );
}
