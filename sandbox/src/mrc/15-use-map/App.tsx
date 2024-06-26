import "./App.scss";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RMap, useMap } from "maplibre-react-components";

const marignier = { lng: 6.498, lat: 46.089 };

function NavigateButton() {
  const map = useMap();

  const onClick = () => {
    // ici map est une référence du wrapper de l'instance de Map de maplibre
    map?.flyTo({ center: marignier });
  };

  return (
    <div className="sidebar">
      <button onClick={onClick}>Center marignier</button>
    </div>
  );
}

function App() {
  return (
    <>
      <RMap
        initialCenter={marignier}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
      >
        <NavigateButton />
      </RMap>
    </>
  );
}

export default App;
