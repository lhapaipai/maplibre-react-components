import { Map } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RMap, RMarker, RPopup, markerPopupOffset } from "maplibre-react-components";
import { useRef, useState } from "react";
import Pin from "./Pin";

const marignier = { lng: 6.498, lat: 46.089 };
const marignier2 = { lng: 6.2, lat: 46.089 };

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      {showMap && (
        <RMap ref={mapRef} initialCenter={marignier} initialZoom={8}>
          <RMarker longitude={marignier2.lng} latitude={marignier2.lat}>
            <Pin />
          </RMarker>
          <RMarker
            longitude={marignier.lng}
            latitude={marignier.lat}
            onClick={(e) => {
              e.stopPropagation();
              setShowPopup((s) => !s);
            }}
          />
          {showPopup && (
            <RPopup
              onMapMove={() => {
                console.log("onMapMove");
                setShowPopup(false);
              }}
              onMapClick={() => {
                setShowPopup(false);
              }}
              longitude={marignier.lng}
              latitude={marignier.lat}
              offset={markerPopupOffset}
            >
              Hello world !
            </RPopup>
          )}
        </RMap>
      )}
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>info</button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>counter {counter}</button>
        </div>
        <div>
          <button onClick={() => setShowMap((s) => !s)}>{showMap ? "masquer" : "afficher"}</button>
        </div>
        <div>
          <label>
            afficher popup
            <input type="checkbox" onChange={() => setShowPopup((s) => !s)} checked={showPopup} />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
