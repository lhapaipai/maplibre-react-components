"use client";

import { RGlobeControl, RMap } from "maplibre-react-components";
import { mapCSS } from "~/lib/map-util";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      style={mapCSS}
      initialAttributionControl={false}
    >
      <RGlobeControl position="top-left" />
    </RMap>
  );
}
