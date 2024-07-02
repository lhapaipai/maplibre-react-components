import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RMap, RGradientMarker } from "maplibre-react-components";
import "./App.scss";

const marignier = { lng: 6.498, lat: 46.089 };
const marignierChurch = { lng: 6.5001, lat: 46.091 };

function App() {
  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={14}
        mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
      >
        <RGradientMarker
          longitude={marignierChurch.lng}
          latitude={marignierChurch.lat}
        />
        <RGradientMarker
          longitude={marignier.lng}
          latitude={marignier.lat}
          icon="fe-star"
        />
      </RMap>
      <div className="absolute left-5 top-5">
        <i className="fe-star"></i>
      </div>
    </>
  );
}

export default App;
