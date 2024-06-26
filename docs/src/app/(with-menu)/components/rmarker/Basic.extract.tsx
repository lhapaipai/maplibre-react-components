import { RMap, RMarker } from "maplibre-react-components";
import CustomMarker from "./CustomMarker";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap initialCenter={center}>
      <RMarker longitude={-2.5} latitude={55} />

      {/* with custom Element */}
      <RMarker longitude={19} latitude={53.6} initialAnchor="bottom">
        <CustomMarker />
      </RMarker>
    </RMap>
  );
}
