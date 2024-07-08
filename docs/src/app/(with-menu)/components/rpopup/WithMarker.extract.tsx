import {
  RMap,
  RMarker,
  RGradientMarker,
  RPopup,
  markerPopupOffset,
  gradientMarkerPopupOffset,
} from "maplibre-react-components";
import { useState } from "react";

const center: [number, number] = [-14.7, 37.8];
const lyon: [number, number] = [4.8, 45.7];
const dakar: [number, number] = [-17.43, 14.6866];

export default function App() {
  const [showLyonPopup, setShowLyonPopup] = useState(true);
  const [showDakarPopup, setShowDakarPopup] = useState(true);

  return (
    <RMap initialCenter={center} initialZoom={2}>
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
