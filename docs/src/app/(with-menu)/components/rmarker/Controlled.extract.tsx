import { type Marker } from "maplibre-gl";
import { Event, RMap, RMarker } from "maplibre-react-components";
import { useCallback, useState } from "react";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  const [markerCoords, setMarkerCoords] = useState(center);

  const handleDragEnd = useCallback((e: Event<Marker>) => {
    setMarkerCoords(e.target.getLngLat().toArray());
  }, []);

  return (
    <RMap initialCenter={center} initialZoom={2}>
      {/* controlled marker */}
      <RMarker
        longitude={markerCoords[0]}
        latitude={markerCoords[1]}
        draggable={true}
        onDragEnd={handleDragEnd}
      />
      <div className="absolute bottom-4 left-4 rounded-2xl bg-gray-0 p-4">
        Marker position : {markerCoords.map(Math.round).join(", ")}
      </div>
    </RMap>
  );
}
