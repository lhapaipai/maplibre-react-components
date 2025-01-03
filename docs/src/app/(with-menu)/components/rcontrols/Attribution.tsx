"use client";

import { RAttributionControl, RMap } from "maplibre-react-components";
import { mapCSS } from "~/lib/map-util";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      initialZoom={2}
      style={mapCSS}
      initialAttributionControl={false}
    >
      <RAttributionControl customAttribution="MapLibre React Components" />
    </RMap>
  );
}
