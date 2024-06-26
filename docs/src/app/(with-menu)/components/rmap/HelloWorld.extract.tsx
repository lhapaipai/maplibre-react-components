import { RMap } from "maplibre-react-components";

export default function App() {
  return (
    <RMap
      style={{ minHeight: 200 }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    />
  );
}
