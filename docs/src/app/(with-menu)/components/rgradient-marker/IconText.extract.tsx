import { RGradientMarker, RMap } from "maplibre-react-components";
import { mountainIconFactory } from "./util";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap initialCenter={center} initialZoom={2}>
      <RGradientMarker longitude={-9.1} latitude={38} text="Lis" />
      <RGradientMarker longitude={-0.5} latitude={48} icon="fe-star" />
      <RGradientMarker
        longitude={6.4546}
        latitude={46.1067}
        icon={mountainIconFactory}
      />
    </RMap>
  );
}
