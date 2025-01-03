import { RMap, RNavigationControl } from "maplibre-react-components";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap
      initialCenter={center}
      initialZoom={2}
      initialAttributionControl={false}
    >
      <RNavigationControl position="top-left" showCompass={false} />
    </RMap>
  );
}
