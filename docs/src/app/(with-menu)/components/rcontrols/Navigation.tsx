"use client";

import { RMap, RNavigationControl } from "maplibre-react-components";
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
      <RNavigationControl position="top-left" showCompass={false} />
    </RMap>
  );
}
