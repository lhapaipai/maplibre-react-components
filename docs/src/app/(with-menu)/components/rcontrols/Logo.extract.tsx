import { MrcLogoControl, RLogoControl, RMap } from "maplibre-react-components";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap
      initialCenter={center}
      initialZoom={2}
      initialAttributionControl={false}
    >
      <MrcLogoControl position="top-right" />
      <RLogoControl position="bottom-right" />
    </RMap>
  );
}
