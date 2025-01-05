"use client";

import { RMap } from "maplibre-react-components";
import { useState } from "react";
import clsx from "clsx";

export default function Globe() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "absolute left-0 top-0 z-10 w-full",
          mapLoaded && "hidden",
        )}
      >
        <img src="/landing-globe.png" alt="globe" width={350} height={384} />
      </div>
      <RMap
        onLoad={() => setMapLoaded(true)}
        id="globe"
        className="maplibregl-theme-modern overflow-hidden rounded-xl"
        style={{ minHeight: 384 }}
        mapStyle="/demotiles.json"
        initialAttributionControl={false}
      />
    </>
  );
}
