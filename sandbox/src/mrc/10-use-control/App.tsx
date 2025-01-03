import { Map } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RMap, RMarker, RNavigationControl } from "maplibre-react-components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);

  return (
    <>
      {showMap && (
        <RMap ref={mapRef} initialCenter={marignier} initialZoom={8}>
          <RMarker longitude={marignier.lng} latitude={marignier.lat} />
          <RNavigationControl position="top-left" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-gray-0 p-4">
            Inlined Control
          </div>
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
          <button onClick={() => setShowMap((s) => !s)}>
            {showMap ? "masquer" : "afficher"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
