import { RGlobeControl, RMap } from "maplibre-react-components";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap initialCenter={center} initialAttributionControl={false}>
      <RGlobeControl position="top-left" />
    </RMap>
  );
}
