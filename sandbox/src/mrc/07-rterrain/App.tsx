import { Map } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import {
  RMap,
  RMarker,
  RSource,
  RTerrain,
  RTerrainControl,
} from "maplibre-react-components";
import { useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

const rasterDemTiles = [
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
];

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showTerrain, setShowTerrain] = useState(false);
  return (
    <>
      {showMap && (
        <RMap
          ref={mapRef}
          mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
          initialCenter={marignier}
          initialZoom={13}
        >
          <RMarker longitude={marignier.lng} latitude={marignier.lat} />
          <RSource
            type="raster-dem"
            id="terrarium"
            tiles={rasterDemTiles}
            encoding="terrarium"
            tileSize={256}
          />

          <RTerrainControl source="terrarium" />
          {showTerrain && (
            <>
              <RTerrain source="terrarium" exaggeration={1.3} />
            </>
          )}
        </RMap>
      )}
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>info</button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>
            counter {counter}
          </button>
        </div>
        <div>
          <label>
            afficher carte
            <input
              type="checkbox"
              onChange={() => setShowMap((s) => !s)}
              checked={showMap}
            />
          </label>
        </div>
        <div>
          <label>
            afficher terrain
            <input
              type="checkbox"
              onChange={() => setShowTerrain((s) => !s)}
              checked={showTerrain}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
