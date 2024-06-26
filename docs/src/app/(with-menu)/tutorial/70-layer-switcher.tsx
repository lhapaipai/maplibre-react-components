"use client";

import { MapLayerMouseEvent } from "maplibre-gl";
import {
  RGradientMarker,
  RLayer,
  RMap,
  RNavigationControl,
  RSource,
  useRControl,
} from "maplibre-react-components";
import { Dispatch, SetStateAction, useState } from "react";
import { mountainIconFactory, townData } from "./util";
import { createPortal } from "react-dom";
import { mapCSS } from "~/lib/map-util";

const mountain: [number, number] = [6.4546, 46.1067];

const townFillPaint = {
  "fill-outline-color": "rgba(0,0,0,0.1)",
  "fill-color": "rgba(0,0,0,0.3)",
};

const styles = {
  "OSM Bright":
    "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
  "Demo Tiles": "https://demotiles.maplibre.org/style.json",
  Streets:
    "https://api.maptiler.com/maps/streets-v2/style.json?key=" +
    process.env.NEXT_PUBLIC_MAPTILER_TOKEN,
};

type StyleID = keyof typeof styles;

interface LayerSwitcherControlProps {
  style: StyleID;
  setStyle: Dispatch<SetStateAction<StyleID>>;
}
function LayerSwitcherControl({ style, setStyle }: LayerSwitcherControlProps) {
  const { container } = useRControl({
    position: "top-left",
  });

  return createPortal(
    <div>
      {Object.entries(styles).map(([key]) => (
        <label key={key}>
          <input
            type="radio"
            name="base-layer"
            checked={style === key}
            onChange={() => setStyle(key as StyleID)}
          />
          {key}
        </label>
      ))}
    </div>,
    container,
  );
}

function App() {
  const [style, setStyle] = useState<StyleID>("OSM Bright");

  const [markerPosition, setMarkerPosition] = useState<null | [number, number]>(
    null,
  );

  function handleClick(e: MapLayerMouseEvent) {
    setMarkerPosition(e.lngLat.toArray());
  }

  return (
    <RMap
      className="maplibregl-theme-modern"
      minZoom={6}
      onClick={handleClick}
      initialCenter={mountain}
      initialZoom={11}
      mapStyle={styles[style]}
      style={mapCSS}
    >
      <LayerSwitcherControl style={style} setStyle={setStyle} />

      <RNavigationControl position="top-right" visualizePitch={true} />
      <RSource key="town" id="town" type="geojson" data={townData} />
      <RLayer
        key="town-fill"
        id="town-fill"
        source="town"
        type="fill"
        paint={townFillPaint}
      />

      <RGradientMarker
        longitude={mountain[0]}
        latitude={mountain[1]}
        icon={mountainIconFactory}
      />
      {markerPosition && (
        <RGradientMarker
          icon="fe-star"
          color="#285daa"
          longitude={markerPosition[0]}
          latitude={markerPosition[1]}
        />
      )}
    </RMap>
  );
}

export default App;
