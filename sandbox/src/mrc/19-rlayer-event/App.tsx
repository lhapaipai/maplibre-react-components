import { Map, MapLayerMouseEvent, MapStyleDataEvent } from "maplibre-gl";
import "./App.scss";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

const baseStyles = {
  standard: "/assets/styles/ign/PLAN.IGN/standard-without-transition.json",
  classique: "/assets/styles-original/ign/PLAN.IGN/classique.json",
  accentue: "/assets/styles-original/ign/PLAN.IGN/accentue.json",
};

type BaseStyle = keyof typeof baseStyles;

const routeHaloPaintStyle = {
  "line-color": "transparent",
  "line-width": 50,
};

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [polyHovered, setPolyHovered] = useState(false);
  const [lineHovered, setLineHovered] = useState(false);
  const [baseStyle, setBaseStyle] = useState<BaseStyle>("standard");

  useLayoutEffect(() => {
    console.log("map", mapRef.current);
  }, []);

  function handleStyleData(e: MapStyleDataEvent) {
    console.log("<App /> map.on -> styledata", e);
  }

  const townPaintStyle = useMemo(
    () => ({
      "fill-outline-color": "rgba(0,0,0,0.1)",
      "fill-color": polyHovered ? "rgba(255,0,0,0.3)" : "rgba(0,0,0,0.3)",
    }),
    [polyHovered],
  );

  const routePaintStyle = useMemo(
    () => ({
      "line-color": lineHovered ? "rgba(255,0,0,0.3)" : "rgba(0,0,0,0.3)",
      "line-width": 5,
    }),
    [lineHovered],
  );

  function handleMouseEnter(e: MapLayerMouseEvent) {
    console.log("handleMouseEnter", e.features);
    setPolyHovered(true);
  }

  function handleMouseLeave(e: MapLayerMouseEvent) {
    console.log("handleMouseEnter", e.features);
    setPolyHovered(false);
  }
  function handleMouseEnterLine(e: MapLayerMouseEvent) {
    console.log("handleMouseEnterLine", e.features);
    setLineHovered(true);
  }

  function handleMouseLeaveLine(e: MapLayerMouseEvent) {
    console.log("handleMouseLeaveLine", e.features);
    setLineHovered(false);
  }
  return (
    <>
      <RMap
        onClick={(e) => console.log(e.lngLat)}
        ref={mapRef}
        initialCenter={marignier}
        initialZoom={12}
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

        <RSource
          key="town-marignier"
          id="town-marignier"
          type="geojson"
          data={`/data/marignier.geojson`}
        />
        <RLayer
          source="town-marignier"
          key="town-marignier-fill"
          id="town-marignier-fill"
          type="fill"
          paint={townPaintStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <RSource
          key="route-thyez"
          id="route-thyez"
          type="geojson"
          data={`/data/route-thyez.geojson`}
        />
        <RLayer
          source="route-thyez"
          key="route-thyez-line"
          id="route-thyez-line"
          type="line"
          paint={routePaintStyle}
        />
        <RLayer
          source="route-thyez"
          key="route-thyez-line-halo"
          id="route-thyez-line-halo"
          type="line"
          paint={routeHaloPaintStyle}
          onMouseEnter={handleMouseEnterLine}
          onMouseLeave={handleMouseLeaveLine}
        />
      </RMap>
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
          <select onChange={(e) => setBaseStyle(e.target.value as BaseStyle)}>
            <option value="standard">IGN standard</option>
            <option value="classique">IGN classique</option>
            <option value="accentue">IGN accentue</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
