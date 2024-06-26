import { RMap, RNavigationControl } from "maplibre-react-components";

export default function App() {
  return (
    <RMap>
      <RNavigationControl position="top-left" />
      <div className="absolute bottom-4 left-4 rounded bg-gray-0 p-4">
        Inlined Control
      </div>
    </RMap>
  );
}
