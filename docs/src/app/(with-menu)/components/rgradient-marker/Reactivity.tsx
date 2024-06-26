"use client";

import { RGradientMarker, RMap } from "maplibre-react-components";
import { useState } from "react";
import { Button } from "pentatrion-design/components/button";
import { Range } from "pentatrion-design/components/input/Range";
import { hslToRgb } from "./util";
import { mapCSS } from "~/lib/map-util";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  const [counter, setCounter] = useState(0);
  const [colorRange, setColorRange] = useState(180);
  const [scale, setScale] = useState(1);

  const color = hslToRgb(colorRange / 360, 0.5, 0.5);
  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      initialZoom={2}
      initialAttributionControl={false}
      style={mapCSS}
    >
      <RGradientMarker
        longitude={center[0]}
        latitude={center[1]}
        text={counter.toString()}
        color={color}
        scale={scale}
      />
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 rounded-2xl bg-gray-0 p-4">
        <div>
          <Button
            onClick={() => setCounter((c) => c + 1)}
            fullWidth={true}
            className="justify-center"
          >
            increment counter {counter}
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          Color
          <Range
            min={0}
            max={360}
            showMinMax={false}
            value={colorRange}
            showValue={false}
            onChange={(e) => {
              setColorRange(e.target.valueAsNumber);
            }}
          />
          <span className="w-16">{color}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          Scale
          <Range
            min={0.5}
            max={2}
            step={0.1}
            value={scale}
            showValue={false}
            onChange={(e) => {
              setScale(e.target.valueAsNumber);
            }}
          />
          <span className="w-16">{scale}</span>
        </div>
      </div>
    </RMap>
  );
}
