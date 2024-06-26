"use client";

import { RLayer, RMap, RSource, RTerrain } from "maplibre-react-components";
import { Toggle } from "pentatrion-design";
import { useState } from "react";
import { mapCSS } from "~/lib/map-util";
import { Range } from "pentatrion-design/components/input/Range";

const rasterDemTiles = [
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
];
const center = { lng: 6.4, lat: 46.1 };

export default function App() {
  const [showTerrain, setShowTerrain] = useState(false);
  const [exaggeration, setExaggeration] = useState(1.3);
  return (
    <RMap
      className="maplibregl-theme-modern"
      initialZoom={10}
      initialBearing={-10}
      initialPitch={50}
      initialCenter={center}
      doubleClickZoom={false}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      onMounted={(map) => console.log(map)}
      style={mapCSS}
      initialAttributionControl={false}
    >
      <RSource
        type="raster-dem"
        id="terrarium"
        tiles={rasterDemTiles}
        encoding="terrarium"
        tileSize={256}
      />
      {showTerrain && (
        <>
          <RLayer id="hillshade" type="hillshade" source="terrarium" />
          <RTerrain source="terrarium" exaggeration={exaggeration} />
        </>
      )}
      <div className="absolute right-4 top-4 rounded-2xl bg-gray-0 p-4">
        <div className="flex justify-between">
          Terrain
          <Toggle
            checked={showTerrain}
            onChange={(e) => setShowTerrain(e.target.checked)}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          Exaggeration
          <Range
            min={0}
            max={2}
            step={0.1}
            value={exaggeration}
            showValue={false}
            onChange={(e) => setExaggeration(e.target.valueAsNumber)}
          />
          <span className="w-8">{exaggeration}</span>
        </div>
      </div>
    </RMap>
  );
}
