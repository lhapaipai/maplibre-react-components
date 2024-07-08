"use client";

import { Offset } from "maplibre-gl";
import {
  RGradientMarker,
  RMap,
  RMarker,
  RPopup,
  markerPopupOffset,
} from "maplibre-react-components";
import { useState } from "react";
import { mapCSS } from "~/lib/map-util";

const gradientMarkerHeight = 50;
const markerRadius = 13.5;
const linearOffset = Math.abs(markerRadius) / Math.SQRT2;

export const gradientMarkerPopupOffset = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -gradientMarkerHeight],
  "bottom-left": [
    linearOffset,
    (gradientMarkerHeight - markerRadius + linearOffset) * -1,
  ],
  "bottom-right": [
    -linearOffset,
    (gradientMarkerHeight - markerRadius + linearOffset) * -1,
  ],
  left: [markerRadius, (gradientMarkerHeight - markerRadius) * -1],
  right: [-markerRadius, (gradientMarkerHeight - markerRadius) * -1],
} as Offset;

const center: [number, number] = [-14.7, 37.8];
const lyon: [number, number] = [4.8, 45.7];
const dakar: [number, number] = [-17.43, 14.6866];
export default function App() {
  const [showLyonPopup, setShowLyonPopup] = useState(true);
  const [showDakarPopup, setShowDakarPopup] = useState(true);

  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      initialZoom={2}
      initialAttributionControl={false}
      style={mapCSS}
      onMoveEnd={(e) => console.log(e.target.getCenter())}
    >
      <RMarker
        longitude={lyon[0]}
        latitude={lyon[1]}
        onClick={(e) => {
          e.stopPropagation();
          setShowLyonPopup((s) => !s);
        }}
      />
      {showLyonPopup && (
        <RPopup
          longitude={lyon[0]}
          latitude={lyon[1]}
          offset={markerPopupOffset}
        >
          Hello Lyon !
        </RPopup>
      )}
      <RGradientMarker
        longitude={dakar[0]}
        latitude={dakar[1]}
        onClick={(e) => {
          e.stopPropagation();
          setShowDakarPopup((s) => !s);
        }}
      />
      {showDakarPopup && (
        <RPopup
          longitude={dakar[0]}
          latitude={dakar[1]}
          offset={gradientMarkerPopupOffset}
        >
          Hello Dakar !
        </RPopup>
      )}
    </RMap>
  );
}
