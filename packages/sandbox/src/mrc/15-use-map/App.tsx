import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/style.css";
import { RMap, useMap } from "maplibre-react-components";

const marignier = { lng: 6.498, lat: 46.089 };

function NavigateButton() {
  const map = useMap();

  const onClick = () => {
    // ici map est une référence du wrapper de l'instance de Map de maplibre
    map?.flyTo({ center: marignier });
  };

  return (
    <div className="control left-control">
      <div>inside RMap</div>
      <button onClick={onClick}>Center marignier</button>
    </div>
  );
}

function App() {
  const map = useMap("my-map");

  const onClick = () => {
    console.log("map", map);
  };

  return (
    <>
      <RMap
        id="my-map"
        initialCenter={marignier}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
      >
        <NavigateButton />
        <div className="control right-control">
          <div>outside RMap : {map === null ? "unmounted" : "mounted"}</div>
          <button onClick={onClick}>log map</button>
        </div>
      </RMap>
    </>
  );
}

export default App;
