import { RMap } from "maplibre-react-components";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap initialCenter={center} initialAttributionControl={false}>
      <span>TODO : need mrc 0.2.0</span>
    </RMap>
  );
}
