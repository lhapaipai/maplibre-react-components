import { ControlPosition } from "maplibre-gl";
import { memo, useState } from "react";
import { useRControl } from "../hooks/useRControl";
import { createPortal } from "react-dom";

interface MapLibreReactLogoProps {
  height?: number;
}
export function MapLibreReactLogo({ height = 27 }: MapLibreReactLogoProps) {
  const [duration, setDuration] = useState("25s");
  return (
    <svg
      width={(height * 21) / 27}
      height={height}
      viewBox="-10.5 -10.5 21 27"
      fill="none"
      version="1.1"
      id="svg3"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setDuration("2s")}
      onMouseLeave={() => setDuration("25s")}
    >
      <path
        fill="#82b4fe"
        fillRule="evenodd"
        d="m 0.04378077,-7.0160133 c -3.95934197,-0.025693 -7.19979577,2.9709105 -7.22395607,6.67957072 -0.021351,3.28396108 1.6024867,4.88716988 3.3609363,6.62322508 1.2259466,1.2102943 2.5172339,2.4851233 3.36206037,4.4390285 0.056993,0.04631 0.095121,0.07722 0.1114948,0.09183 a 0.41450831,0.41450831 0 0 0 0.2727553,0.103225 0.41515047,0.41515047 0 0 0 0.2741963,-0.09961 c 0.00438,-0.0039 0.012527,-0.0074 0.022479,-0.01165 0.027304,-0.01171 0.068791,-0.02955 0.090222,-0.0789 C 1.1559887,8.7954149 2.4656545,7.5377628 3.7164045,6.3367792 5.4974902,4.626493 7.158975,3.0309869 7.1802478,-0.24301718 7.2043965,-3.9517594 4.0032063,-6.9901745 0.04378537,-7.016023 Z m -0.06903,10.6235008 C 1.9352357,3.6202595 3.5351559,2.0173639 3.5480768,0.02733852 3.5610008,-1.9626869 1.9821136,-3.5862858 0.02154667,-3.5990486 -1.9390213,-3.6118206 -3.5388592,-2.0089214 -3.5518634,-0.01889648 -3.5647874,1.9711289 -1.9858982,3.5947246 -0.02533123,3.6074875 Z"
      />
      <path
        fill="currentColor"
        d="m -2.4911489,12.068709 c -0.3270955,-0.0022 -0.5946317,0.359604 -0.5975214,0.807906 l -0.014767,2.269118 c -0.00295,0.448302 0.2598305,0.813445 0.587006,0.815611 l 5.0075702,0.03259 c 0.3270965,0.0022 0.5946306,-0.359606 0.5975218,-0.807909 l 0.014775,-2.269117 c 0.00304,-0.44838 -0.259831,-0.813523 -0.5870064,-0.815609 z"
      />
      <g>
        <circle cx="0" cy="0" r="2" fill="currentColor" id="circle1" />
        <g stroke="currentColor" strokeWidth="1" fill="none" id="g3">
          <ellipse rx="10" ry="4.5" id="ellipse1" cx="0" cy="0" />
          <ellipse rx="10" ry="4.5" transform="rotate(60)" id="ellipse2" cx="0" cy="0" />
          <ellipse rx="10" ry="4.5" transform="rotate(120)" id="ellipse3" cx="0" cy="0" />
        </g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur={duration}
          values="0 0 0;360 0 0;"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

interface MrcLogoControlProps {
  position?: ControlPosition;
}

export const MrcLogoControl = memo(function MrcLogoControl({
  position = "bottom-left",
}: MrcLogoControlProps) {
  const { container } = useRControl({
    position,
    className: "maplibregl-ctrl maplibregl-ctrl-mrc-logo",
  });

  return createPortal(
    <a
      target="_blank"
      rel="noopener nofollow"
      href="https://maplibre-react-components.pentatrion.com"
      aria-label="MapLibre React components logo"
    >
      <MapLibreReactLogo height={30} />
    </a>,
    container,
  );
});
