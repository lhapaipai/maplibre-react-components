import { Coordinates, Map, MapStyleDataEvent } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

const orthoCoordinates: Coordinates = [
  [6.4491308, 46.1225333],
  [6.5461889, 46.1225333],
  [6.5461889, 46.0553167],
  [6.4491308, 46.0553167],
];

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  const [opacity, setOpacity] = useState(100);
  useLayoutEffect(() => {
    console.log(mapRef);
  });

  function handleStyleData(e: MapStyleDataEvent) {
    console.log("styledata", e);
  }

  const rasterPaintStyle = useMemo(
    () => ({
      "raster-opacity": opacity / 100,
    }),
    [opacity],
  );

  return (
    <>
      {show && (
        <RMap
          onClick={(e) => console.log(e.lngLat)}
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={11}
          onStyleData={handleStyleData}
          mapStyle={"/assets/styles/ign/PLAN.IGN/standard.json"}
        >
          <RMarker
            longitude={marignier.lng}
            latitude={marignier.lat}
            draggable={true}
            onDragEnd={(e) => {
              console.log("dragEnd", e);
            }}
          ></RMarker>
          <RSource
            key="marignier-ortho-source"
            id="marignier-ortho"
            type="image"
            url="/data/marignier-ortho.jpg"
            coordinates={orthoCoordinates}
          />
          <RLayer
            key="marignier-ortho-layer"
            source="marignier-ortho"
            id="marignier-ortho"
            type="raster"
            paint={rasterPaintStyle}
          />
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
          <button onClick={() => setShow((s) => !s)}>
            {" "}
            {show ? "masquer" : "afficher"}
          </button>
        </div>
        <div>
          opacité
          <input
            type="range"
            value={opacity}
            onChange={(e) => setOpacity(e.target.valueAsNumber)}
            min={0}
            max={100}
            step={5}
          />
          {opacity}%
        </div>
      </div>
    </>
  );
}

export default App;
