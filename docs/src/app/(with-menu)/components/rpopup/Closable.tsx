"use client";

import { RMap, RPopup } from "maplibre-react-components";
import { useState } from "react";
import { Button } from "pentatrion-design/components/button";
import { mapCSS } from "~/lib/map-util";

const center: [number, number] = [4.8, 45.7];

export default function App() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      initialZoom={2}
      initialAttributionControl={false}
      style={mapCSS}
    >
      {showPopup && (
        <RPopup
          longitude={center[0]}
          latitude={center[1]}
          onMapMove={() => setShowPopup(false)}
          onMapClick={() => setShowPopup(false)}
          initialFocusAfterOpen={false}
        >
          Hello Lyon !
          <button
            className="maplibregl-popup-close-button"
            onClick={() => setShowPopup(false)}
          >
            ×
          </button>
        </RPopup>
      )}
      <div className="absolute left-4 top-4">
        <Button onClick={() => setShowPopup((s) => !s)}>Toggle Popup</Button>
      </div>
      <div className="absolute bottom-4 left-4 rounded-2xl bg-gray-0 p-4">
        <div>popup state : {showPopup ? "visible" : "hidden"}</div>
      </div>
    </RMap>
  );
}
