import {
  RMap,
  RMarker,
  RPopup,
  markerPopupOffset,
} from "maplibre-react-components";
import { useState } from "react";

const center: [number, number] = [4.8, 45.7];

export default function App() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <RMap initialCenter={center} initialZoom={2}>
      <RMarker
        longitude={center[0]}
        latitude={center[1]}
        onClick={(e) => {
          e.stopPropagation();
          setShowPopup((s) => !s);
        }}
      />
      {showPopup && (
        <RPopup
          longitude={center[0]}
          latitude={center[1]}
          offset={markerPopupOffset}
        >
          Hello Lyon !
        </RPopup>
      )}
    </RMap>
  );
}
