"use client";

import { RLayer, RMap, RSource } from "maplibre-react-components";
import { useMemo, useState } from "react";
import { Button } from "pentatrion-design/button";
import { mapCSS } from "~/lib/map-util";
const center = { lng: 6.53, lat: 46.09 };

export default function App() {
  const [red, setRed] = useState(false);

  const townPaintStyle = useMemo(
    () => ({
      "fill-outline-color": "rgba(0,0,0,0.1)",
      "fill-color": red ? "rgba(255,0,0,0.3)" : "rgba(0,0,0,0.3)",
    }),
    [red],
  );

  return (
    <>
      <RMap
        className="maplibregl-theme-modern"
        minZoom={12}
        initialCenter={center}
        mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
        initialAttributionControl={false}
        style={mapCSS}
      >
        <RSource id="thyez" type="geojson" data="/data/thyez.geojson" />
        <RLayer
          source="thyez"
          id="thyez-fill"
          type="fill"
          paint={townPaintStyle}
        />
      </RMap>
      <div className="absolute top-4 right-4">
        <Button onClick={() => setRed((r) => !r)}>
          {red ? "set Gray" : "set Red"}
        </Button>
      </div>
    </>
  );
}
