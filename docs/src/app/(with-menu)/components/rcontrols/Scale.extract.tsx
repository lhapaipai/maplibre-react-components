import { RMap, RScaleControl } from "maplibre-react-components";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap
      initialCenter={center}
      initialZoom={2}
      initialAttributionControl={false}
    >
      <RScaleControl position="bottom-right" unit="imperial" />
    </RMap>
  );
}
