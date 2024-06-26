"use client";

import {
  RMap,
  RNavigationControl,
  useControl,
} from "maplibre-react-components";
import { CustomControl } from "./CustomControl";
import { mapCSS } from "~/lib/map-util";

function RCustomControl() {
  useControl({
    position: "top-right",
    factory: () => new CustomControl(),
  });
  return null;
}

export default function App() {
  return (
    <RMap className="maplibregl-theme-modern" style={mapCSS}>
      <RNavigationControl />
      <RCustomControl />
    </RMap>
  );
}
