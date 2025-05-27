import { Map, Marker, Offset } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/style.css";
import { Event, RMap, RMarker, RPopup } from "maplibre-react-components";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Pin from "./Pin";

const marignier = { lng: 6.498, lat: 46.089 };
const geneva = { lng: 6.037, lat: 46.175 };

const markerHeight = 41 - 5.8 / 2;
const markerRadius = 13.5;
const linearOffset = Math.abs(markerRadius) / Math.SQRT2;
const popupOffset = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -markerHeight],
  "bottom-left": [
    linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1,
  ],
  "bottom-right": [
    -linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1,
  ],
  left: [markerRadius, (markerHeight - markerRadius) * -1],
  right: [-markerRadius, (markerHeight - markerRadius) * -1],
} as Offset;

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showMarker, setShowMarker] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [lonOffset, setLonOffset] = useState(0);
  const [subPixelPosition, setSubPixelPosition] = useState(false);

  useLayoutEffect(() => {
    console.log(mapRef);
  });

  const handleDragEnd = useCallback((e: Event<Marker>) => {
    console.log("dragEnd", e);
  }, []);

  return (
    <>
      {showMap && (
        <RMap ref={mapRef} initialCenter={marignier} initialZoom={8}>
          {showMarker && (
            <RMarker longitude={geneva.lng + lonOffset} latitude={geneva.lat}>
              <Pin />
            </RMarker>
          )}

          <RMarker
            longitude={marignier.lng}
            latitude={marignier.lat}
            draggable={true}
            onDragEnd={handleDragEnd}
            subpixelPositioning={subPixelPosition}
            onClick={(e) => {
              console.log("onClick Marker");
              e.stopPropagation();
              setShowPopup(true);
            }}
          />
          {showPopup && (
            <RPopup
              offset={popupOffset}
              longitude={marignier.lng}
              latitude={marignier.lat}
              onMapClick={() => {
                console.log("RPopup onMapMove");
                setShowPopup(false);
              }}
            >
              <p>Hello world</p>
            </RPopup>
          )}
        </RMap>
      )}
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>
            console.log(mapRef)
          </button>
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
            afficher Marignier popup
            <input
              type="checkbox"
              onChange={() => setShowPopup((s) => !s)}
              checked={showPopup}
            />
          </label>
        </div>
        <div>
          <label>
            geneva longitude offset
            <input
              type="range"
              min={-0.1}
              max={0.1}
              step={0.01}
              onChange={(e) => setLonOffset(e.target.valueAsNumber)}
              value={lonOffset}
            />
            {lonOffset}
          </label>
        </div>
        <div>
          <label>
            show Geneva Marker
            <input
              type="checkbox"
              onChange={() => setShowMarker((s) => !s)}
              checked={showMarker}
            />
          </label>
        </div>
        <div>
          <label>
            subpixel position Marignier
            <input
              type="checkbox"
              onChange={() => setSubPixelPosition((s) => !s)}
              checked={subPixelPosition}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
