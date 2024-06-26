// LayerSwitcherControl.tsx
import { useRControl } from "maplibre-react-components";
import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

const styles = {
  "OSM Bright":
    "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
  "Demo Tiles": "https://demotiles.maplibre.org/style.json",
  Streets: `https://api.maptiler.com/maps/streets-v2/style.json?key=${YOUR_MAPTILER_API_TOKEN}`,
};

export type StyleID = keyof typeof styles;

interface LayerSwitcherControlProps {
  style: StyleID;
  setStyle: Dispatch<SetStateAction<StyleID>>;
}
export function LayerSwitcherControl({
  style,
  setStyle,
}: LayerSwitcherControlProps) {
  const { container } = useRControl({
    position: "top-left",
  });

  return createPortal(
    <div>
      {Object.entries(styles).map(([key]) => (
        <label key={key}>
          <input
            type="radio"
            name="base-layer"
            checked={style === key}
            onChange={() => setStyle(key as StyleID)}
          />
          {key}
        </label>
      ))}
    </div>,
    container,
  );
}
