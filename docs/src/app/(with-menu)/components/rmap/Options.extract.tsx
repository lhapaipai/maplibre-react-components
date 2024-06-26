"use client";

import { MapLayerMouseEvent } from "maplibre-gl";
import { RMap } from "maplibre-react-components";

const center = { lng: 6.6, lat: 46.2 };

export default function App() {
  function handleClick(e: MapLayerMouseEvent) {
    console.log(e.lngLat);
  }

  return (
    <RMap
      minZoom={8}
      initialCenter={center}
      style={{ minHeight: 300 }}
      onClick={handleClick}
      doubleClickZoom={false}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
    />
  );
}
