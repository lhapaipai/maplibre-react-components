"use client";

import { RMap } from "maplibre-react-components";
import { mapCSS } from "~/lib/map-util";

export default function App() {
  return (
    <RMap
      className="maplibregl-theme-modern"
      style={mapCSS}
      mapStyle="https://demotiles.maplibre.org/style.json"
    />
  );
}
