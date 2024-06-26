"use client";

import { MapLayerMouseEvent } from "maplibre-gl";
import {
  RGradientMarker,
  RLayer,
  RMap,
  RNavigationControl,
  RSource,
} from "maplibre-react-components";
import { useState } from "react";
import { mountainIconFactory, townData } from "./util";
import { mapCSS } from "~/lib/map-util";

const mountain: [number, number] = [6.4546, 46.1067];

const townFillPaint = {
  "fill-outline-color": "rgba(0,0,0,0.1)",
  "fill-color": "rgba(0,0,0,0.3)",
};

function App() {
  const [markerPosition, setMarkerPosition] = useState<null | [number, number]>(
    null,
  );

  function handleClick(e: MapLayerMouseEvent) {
    setMarkerPosition(e.lngLat.toArray());
  }

  return (
    <RMap
      className="maplibregl-theme-modern"
      minZoom={6}
      onClick={handleClick}
      initialCenter={mountain}
      initialZoom={11}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      style={mapCSS}
      initialAttributionControl={false}
    >
      <RNavigationControl position="top-right" visualizePitch={true} />
      <RSource key="town" id="town" type="geojson" data={townData} />
      <RLayer
        key="town-fill"
        id="town-fill"
        source="town"
        type="fill"
        paint={townFillPaint}
      />

      <RGradientMarker
        longitude={mountain[0]}
        latitude={mountain[1]}
        icon={mountainIconFactory}
      />
      {markerPosition && (
        <RGradientMarker
          icon="fe-star"
          color="#285daa"
          longitude={markerPosition[0]}
          latitude={markerPosition[1]}
        />
      )}
    </RMap>
  );
}

export default App;
