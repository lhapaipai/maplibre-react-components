import { Map, MapStyleDataEvent } from "maplibre-gl";
import "./App.scss";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

const baseStyles = {
  standard: "/assets/styles/ign/PLAN.IGN/standard.json",
  classique: "/assets/styles-original/ign/PLAN.IGN/classique.json",
  accentue: "/assets/styles-original/ign/PLAN.IGN/accentue.json",
};

type BaseStyle = keyof typeof baseStyles;

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  const [showAnotherSource, setShowAnotherSource] = useState(true);
  const [sourceData, setSourceData] = useState("marignier");
  const [red, setRed] = useState(false);

  const [baseStyle, setBaseStyle] = useState<BaseStyle>("standard");

  useLayoutEffect(() => {
    console.log("map", mapRef.current);
  }, []);

  function handleStyleData(e: MapStyleDataEvent) {
    console.log("<App /> map.on -> styledata", e);
  }

  function handleLoad() {
    // console.log("loaded");
  }

  const townPaintStyle = useMemo(
    () => ({
      "fill-outline-color": "rgba(0,0,0,0.1)",
      "fill-color": red ? "rgba(255,0,0,0.3)" : "rgba(0,0,0,0.3)",
    }),
    [red],
  );

  return (
    <>
      {show && (
        <RMap
          onClick={(e) => console.log(e.lngLat)}
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={12}
          onLoad={handleLoad}
          onStyleData={handleStyleData}
          mapStyle={baseStyles[baseStyle]}
        >
          <RMarker
            longitude={marignier.lng}
            latitude={marignier.lat}
            draggable={true}
            onDragEnd={(e) => {
              console.log("dragEnd", e);
            }}
          ></RMarker>
          {showAnotherSource && (
            <>
              <RSource
                key="thyez"
                id="thyez"
                type="geojson"
                data="/data/thyez.geojson"
              />
              <RLayer
                source="thyez"
                key="thyez-fill"
                id="thyez-fill"
                type="fill"
                paint={townPaintStyle}
              />
            </>
          )}
          <RSource
            key="town"
            id="town"
            type="geojson"
            data={`/data/${sourceData}.geojson`}
          />
          <RLayer
            source="town"
            key="town-fill"
            id="town-fill"
            type="fill"
            paint={townPaintStyle}
          />
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
            reRender App {counter}
          </button>
        </div>
        <div>
          <label>
            afficher carte
            <input
              type="checkbox"
              onChange={() => setShow((s) => !s)}
              checked={show}
            />
          </label>
        </div>

        <div>
          <button
            onClick={() =>
              setSourceData((s) => (s === "marignier" ? "cluses" : "marignier"))
            }
          >
            {sourceData === "marignier"
              ? "afficher cluses"
              : "afficher marignier"}
          </button>
        </div>

        <div>
          <label>
            afficher Thyez
            <input
              type="checkbox"
              onChange={() => setShowAnotherSource((s) => !s)}
              checked={showAnotherSource}
            />
          </label>
        </div>
        <div>
          <select onChange={(e) => setBaseStyle(e.target.value as BaseStyle)}>
            <option value="standard">IGN standard</option>
            <option value="classique">IGN classique</option>
            <option value="accentue">IGN accentue</option>
          </select>
        </div>
        <div>
          <button onClick={() => setRed((r) => !r)}>
            {red ? "set gray" : "set red"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
