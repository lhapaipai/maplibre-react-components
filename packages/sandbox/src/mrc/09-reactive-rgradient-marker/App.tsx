import { useState } from "react";
import "./App.css";

import { RMap, RGradientMarker } from "maplibre-react-components";

import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/style.css";
import { getIndexLetter } from "pentatrion-design";

function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function toHex(x: number) {
  const hex = Math.round(x * 255).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const mongolie = { lng: 103.54396016317475, lat: 48.00871071339421 };
const icons = ["fe-heart", "fe-star", "fe-climbing-outdoor"];

function App() {
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  const [coords1, setCoords1] = useState({
    lng: 5,
    lat: 45,
  });

  const [coords2, setCoords2] = useState(mongolie);

  const [colorRange, setColorRange] = useState(180);

  function handleChangeMarkerCoords() {
    setCoords1({
      lng: Math.random() * 300 - 150,
      lat: Math.random() * 150 - 75,
    });
  }

  return (
    <>
      <div className="sidebar">
        <div>
          <button onClick={() => setShow((show) => !show)}>toggle map</button>
        </div>
        <div>
          <button onClick={handleChangeMarkerCoords}>
            change marker cords
          </button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>
            increment counter {getIndexLetter(counter)}
          </button>
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={360}
            value={colorRange}
            onChange={(e) => {
              setColorRange(e.target.valueAsNumber);
            }}
          />
          {hslToRgb(colorRange / 360, 0.5, 0.5)}
        </div>
      </div>
      {show && (
        <RMap onClick={(e) => console.log(e.lngLat)}>
          <RGradientMarker
            longitude={coords1.lng}
            latitude={coords1.lat}
            icon={icons[counter % icons.length]}
          />
          <RGradientMarker
            draggable={true}
            longitude={coords2.lng}
            latitude={coords2.lat}
            color={hslToRgb(colorRange / 360, 0.5, 0.5)}
            text={getIndexLetter(counter)}
            onDragEnd={(e) => setCoords2(e.target.getLngLat())}
          />
        </RMap>
      )}
    </>
  );
}

export default App;
