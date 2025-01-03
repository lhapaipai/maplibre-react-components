import { Map, MapStyleDataEvent, StyleSpecification } from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { useLayoutEffect, useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

const emptyStyle: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [],
};

const rasterTiles = {
  default: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
  cycle: [
    "https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    "https://b.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    "https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
  ],
  humanitarian: [
    "https://tile-c.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    "https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    "https://tile-c.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  ],
};

type TileName = keyof typeof rasterTiles;

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  const [tileName, setTileName] = useState<TileName>("default");
  useLayoutEffect(() => {
    console.log(mapRef);
  });

  function handleStyleData(e: MapStyleDataEvent) {
    console.log("styledata", e);
  }

  return (
    <>
      {show && (
        <RMap
          onClick={(e) => console.log(e.lngLat)}
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={14}
          onStyleData={handleStyleData}
          mapStyle={emptyStyle}
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
            key="raster-tile"
            id="raster-tile"
            type="raster"
            tiles={rasterTiles[tileName]}
            tileSize={256}
          />
          <RLayer
            source="raster-tile"
            key="raster-fill"
            id="raster-fill"
            type="raster"
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
          <select onChange={(e) => setTileName(e.target.value as TileName)}>
            <option value="default">OSM default</option>
            <option value="cycle">OSM cycle</option>
            <option value="humanitarian">OSM humanitarian</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
