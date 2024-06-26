import { RMap, RNavigationControl } from "maplibre-react-components";
import { mapCSS } from "~/lib/map-util";

export default function App() {
  return (
    <RMap
      className="maplibregl-theme-modern"
      mapStyle="https://demotiles.maplibre.org/style.json"
      initialAttributionControl={false}
      style={mapCSS}
    >
      <RNavigationControl position="top-left" />
      <div className="absolute bottom-4 left-4 rounded-2xl bg-gray-0 p-4">
        Inlined Control
      </div>
    </RMap>
  );
}
