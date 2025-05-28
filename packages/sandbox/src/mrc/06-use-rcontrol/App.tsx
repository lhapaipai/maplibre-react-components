import { Map, NavigationControl } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RMap, RMarker, RNavigationControl, useRControl } from "maplibre-react-components";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const marignier = { lng: 6.498, lat: 46.089 };

function LayoutControl() {
  const { container } = useRControl({
    position: "bottom-left",
  });
  return createPortal(
    <>
      <p>Hello world !</p>
    </>,
    container,
  );
}

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showCtrl, setShowCtrl] = useState(true);
  useLayoutEffect(() => {
    console.log(mapRef);
  });

  const handleAfterInstanciation = useCallback((map: Map) => {
    map.addControl(new NavigationControl());
  }, []);

  return (
    <>
      {showMap && (
        <RMap
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={4}
          onMounted={handleAfterInstanciation}
        >
          {showCtrl && <RNavigationControl />}
          <RMarker
            longitude={marignier.lng}
            latitude={marignier.lat}
            draggable={true}
            onDragEnd={(e) => {
              console.log("dragEnd", e);
            }}
          ></RMarker>
          {showCtrl && <LayoutControl />}

          <div className="maplibregl-ctrl sidebar">
            <div>
              <button onClick={() => console.log(mapRef)}>info</button>
            </div>
            <div>
              <button onClick={() => setCounter((c) => c + 1)}>counter {counter}</button>
            </div>

            <div>
              <label>
                afficher carte
                <input type="checkbox" onChange={() => setShowMap((s) => !s)} checked={showMap} />
              </label>
            </div>
            <div>
              <label>
                afficher controle
                <input type="checkbox" onChange={() => setShowCtrl((s) => !s)} checked={showCtrl} />
              </label>
            </div>
          </div>
        </RMap>
      )}
    </>
  );
}

export default App;
