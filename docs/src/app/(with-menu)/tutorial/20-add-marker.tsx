import { RMap, RMarker } from "maplibre-react-components";
import { mapCSS } from "~/lib/map-util";

const mountain: [number, number] = [6.4546, 46.1067];

function App() {
  return (
    <RMap
      className="maplibregl-theme-classic"
      minZoom={6}
      initialCenter={mountain}
      initialZoom={11}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      style={mapCSS}
      initialAttributionControl={false}
    >
      <RMarker longitude={mountain[0]} latitude={mountain[1]} />
    </RMap>
  );
}

export default App;
