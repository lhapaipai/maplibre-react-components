import {
  RLayer,
  RMap,
  RSource,
  RTerrainControl,
} from "maplibre-react-components";

const rasterDemTiles = [
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
];
const center = { lng: 6.4, lat: 46.1 };

export default function App() {
  return (
    <RMap
      initialZoom={10}
      initialBearing={-10}
      initialPitch={50}
      initialCenter={center}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      initialAttributionControl={false}
    >
      <RSource
        type="raster-dem"
        id="terrarium"
        tiles={rasterDemTiles}
        encoding="terrarium"
        tileSize={256}
      />
      <RLayer id="hillshade" type="hillshade" source="terrarium" />
      <RTerrainControl
        source="terrarium"
        position="top-left"
        exaggeration={1.1}
      />
    </RMap>
  );
}
