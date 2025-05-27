import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/modern.css";

// we needed this for the RGradientMap component
import "maplibre-react-components/dist/style.css";

import {
  RGradientMarker,
  RMap,
  RMarker,
  RNavigationControl,
} from "maplibre-react-components";

// see below
import { mountainIconFactory } from "./util";

const mountain: [number, number] = [6.4546, 46.1067];

function App() {
  // some code unchanged

  return (
    <RMap
    /* some code unchanged */
    >
      <RNavigationControl position="top-left" visualizePitch={true} />
      <RGradientMarker
        longitude={mountain[0]}
        latitude={mountain[1]}
        icon={mountainIconFactory}
      />
      {markerPosition && (
        <RGradientMarker
          icon="fe-star"
          color="#285daa"
          longitude={markerPosition[0]}
          latitude={markerPosition[1]}
        />
      )}
    </RMap>
  );
}

export default App;
