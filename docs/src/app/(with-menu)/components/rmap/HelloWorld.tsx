import { RMap } from "maplibre-react-components";

export default function App() {
  return (
    <RMap
      className="maplibregl-theme-modern"
      style={{ minHeight: 200 }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    />
  );
}
