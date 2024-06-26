"use client";

import {
  RMap,
  RNavigationControl,
  useRControl,
} from "maplibre-react-components";
import { createPortal } from "react-dom";
import { mapCSS } from "~/lib/map-util";

function CustomControl() {
  const { container } = useRControl({
    position: "top-right",
  });

  return createPortal(
    <div className="bg-gray-0 p-4">
      <h3>Custom React control</h3>
      <div>add your content Here</div>
    </div>,
    container,
  );
}

export default function App() {
  return (
    <RMap className="maplibregl-theme-modern" style={mapCSS}>
      <RNavigationControl />
      <CustomControl />
    </RMap>
  );
}
