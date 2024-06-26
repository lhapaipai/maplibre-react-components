import {
  RGradientMarker,
  RLayer,
  RMap,
  RNavigationControl,
  RSource,
} from "maplibre-react-components";
import { townData } from "./util";

const townFillPaint = {
  "fill-outline-color": "rgba(0,0,0,0.1)",
  "fill-color": "rgba(0,0,0,0.3)",
};

function App() {
  // some code unchanged

  return (
    <RMap
    /* some code unchanged */
    >
      {/* some code unchanged */}
      <RSource key="town" id="town" type="geojson" data={townData} />
      <RLayer
        key="town-fill"
        id="town-fill"
        source="town"
        type="fill"
        paint={townFillPaint}
      />
    </RMap>
  );
}

export default App;
