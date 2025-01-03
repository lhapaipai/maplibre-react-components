"use client";

import { MrcLogoControl, RLogoControl, RMap } from "maplibre-react-components";
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
      <MrcLogoControl position="top-right" />
      <RLogoControl position="bottom-right" />
    </RMap>
  );
}
