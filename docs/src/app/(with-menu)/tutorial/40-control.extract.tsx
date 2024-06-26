import { RMap, RNavigationControl } from "maplibre-react-components";

function App() {
  // some code unchanged

  return (
    <RMap
    /* some code unchanged */
    >
      <RNavigationControl position="top-right" visualizePitch={true} />
      {/* some code unchanged */}
    </RMap>
  );
}

export default App;
