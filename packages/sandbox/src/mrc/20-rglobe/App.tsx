import { Map } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/style.css";
import { RMap, RMarker, RGlobeControl } from "maplibre-react-components";
import { useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

const rasterDemTiles = [
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
];

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [projection, setProjection] = useState<"globe" | "mercator">("globe");
  return (
    <>
      {showMap && (
        <RMap
          ref={mapRef}
          mapStyle="https://demotiles.maplibre.org/style.json"
          initialCenter={marignier}
          initialZoom={1}
        >
          <RMarker longitude={marignier.lng} latitude={marignier.lat} />
          <RGlobeControl />
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
          projection
          <label>
            <input
              type="radio"
              name="projection"
              value="mercator"
              onChange={(e) => setProjection(e.target.value as "mercator")}
              checked={projection === "mercator"}
            />
            mercator
          </label>
          <label>
            <input
              type="radio"
              name="projection"
              value="globe"
              onChange={(e) => setProjection(e.target.value as "globe")}
              checked={projection === "globe"}
            />
            globe
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
