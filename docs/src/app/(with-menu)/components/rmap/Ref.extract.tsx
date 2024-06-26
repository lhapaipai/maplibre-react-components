import { Map } from "maplibre-gl";
import { RMap } from "maplibre-react-components";
import { useRef } from "react";

export default function App() {
  const mapRef = useRef<Map>(null);

  function handleClick() {
    console.log(mapRef.current);
  }

  function handleMounted(map: Map) {
    console.log(map);
  }

  return <RMap ref={mapRef} onClick={handleClick} onMounted={handleMounted} />;
}
