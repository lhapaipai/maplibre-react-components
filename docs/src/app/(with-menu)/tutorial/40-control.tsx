"use client";

import { MapLayerMouseEvent } from "maplibre-gl";
import { RMap, RMarker, RNavigationControl } from "maplibre-react-components";
import { useState } from "react";
import { mapCSS } from "~/lib/map-util";

const mountain: [number, number] = [6.4546, 46.1067];

function App() {
  const [markerPosition, setMarkerPosition] = useState<null | [number, number]>(
    null,
  );

  function handleClick(e: MapLayerMouseEvent) {
    setMarkerPosition(e.lngLat.toArray());
  }

  return (
    <RMap
      className="maplibregl-theme-classic"
      minZoom={6}
      onClick={handleClick}
      initialCenter={mountain}
      initialZoom={11}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      style={mapCSS}
      initialAttributionControl={false}
    >
      <RNavigationControl position="top-right" visualizePitch={true} />
      <RMarker longitude={mountain[0]} latitude={mountain[1]} />
      {markerPosition && (
        <RMarker longitude={markerPosition[0]} latitude={markerPosition[1]} />
      )}
    </RMap>
  );
}

export default App;
