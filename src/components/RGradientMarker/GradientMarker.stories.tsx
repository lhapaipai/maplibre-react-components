import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import { GradientMarker } from "./GradientMarker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const meta = {
  title: "maplibre-react-components/GradientMarker",
};
export default meta;

const faHouse = {
  prefix: "fas" as const,
  iconName: "house" as const,
  icon: [
    576,
    512,
    [63498, 63500, 127968, "home", "home-alt", "home-lg-alt"],
    "f015",
    "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z",
  ],
};

const mountainSvg = {
  viewBox: "0 0 384 512",
  d: "M192 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm51.3 182.7L224.2 307l49.7 49.7c9 9 14.1 21.2 14.1 33.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V397.3l-73.9-73.9c-15.8-15.8-22.2-38.6-16.9-60.3l20.4-84c8.3-34.1 42.7-54.9 76.7-46.4c19 4.8 35.6 16.4 46.4 32.7L305.1 208H336V184c0-13.3 10.7-24 24-24s24 10.7 24 24v55.8c0 .1 0 .2 0 .2s0 .2 0 .2V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V272H296.6c-16 0-31-8-39.9-21.4l-13.3-20zM81.1 471.9L117.3 334c3 4.2 6.4 8.2 10.1 11.9l41.9 41.9L142.9 488.1c-4.5 17.1-22 27.3-39.1 22.8s-27.3-22-22.8-39.1zm55.5-346L101.4 266.5c-3 12.1-14.9 19.9-27.2 17.9l-47.9-8c-14-2.3-22.9-16.3-19.2-30L31.9 155c9.5-34.8 41.1-59 77.2-59h4.2c15.6 0 27.1 14.7 23.3 29.8z",
};

const Svg = ({
  d,
  viewBox,
  ...rest
}: {
  d: string;
  width?: number;
  height?: number;
  viewBox?: string;
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox={viewBox} {...rest}>
      <path d={d} />
    </svg>
  );
};

export const Graphics = () => (
  <div>
    <div className="sb-icon-grid large">
      <div>
        <div
          className="maplibregl-gradient-marker sample"
          style={{
            background: "var(--marker-color)",
          }}
        ></div>
        <pre>--marker-color</pre>
      </div>
      <div>
        <div
          className="maplibregl-gradient-marker sample"
          style={{
            background: "var(--marker-color-dark)",
          }}
        ></div>
        <pre>--marker-color-dark</pre>
      </div>
      <div className="sb-bg-gray">
        <div
          className="maplibregl-gradient-marker sample"
          style={{
            background: "rgb(var(--color-gray-0) / 100%)",
          }}
        ></div>
        <pre>--circle-color</pre>
      </div>
      <div className="sb-bg-gray">
        <div
          className="maplibregl-gradient-marker sample"
          style={{
            background: "rgb(var(--color-gray-0) / 50%)",
          }}
        ></div>
        <pre>--circle-color-hover</pre>
      </div>
    </div>
    <div className="sb-icon-grid large">
      <div>
        <div
          className="maplibregl-gradient-marker sample"
          style={{
            backgroundImage: "var(--marker-color-gradient)",
            backgroundSize: "calc(var(--marker-width) * 1.5) var(--marker-height)",
            backgroundPosition: "calc(var(--marker-width) * -0.5) 0",
          }}
        ></div>
        <pre>--marker-color-gradient normal</pre>
      </div>
      <div>
        <div
          className="maplibregl-gradient-marker sample"
          style={{
            backgroundImage: "var(--marker-color-gradient)",
            backgroundSize: "calc(var(--marker-width) * 1.5) var(--marker-height)",
            backgroundPosition: 0,
          }}
        ></div>
        <pre>--marker-color-gradient hover</pre>
      </div>
    </div>
    <div className="sb-icon-grid">
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>shape pin</pre>
      </div>
      <div>
        <div data-shape="circle" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>shape circle</pre>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div className="sb-bg-gray">
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          {/* i is wrapped so we can apply transform when active */}
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>default</pre>
      </div>
      <div className="sb-bg-gray">
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>without circle</pre>
      </div>
      <div className="sb-bg-gray">
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <div className="target"></div>
        </div>
        <pre>with svg fontawesome</pre>
      </div>
      <div className="sb-bg-gray">
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <Svg {...mountainSvg} />
          </div>
          <div className="target"></div>
        </div>
        <pre>inline svg</pre>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>default</pre>
      </div>
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker selected">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.selected</pre>
      </div>
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker active">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>:active,.active</pre>
      </div>
    </div>
    <div className="sb-icon-grid">
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker draggable">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.draggable</pre>
      </div>
      <div>
        <div data-shape="circle" data-interactive className="maplibregl-gradient-marker draggable">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.draggable</pre>
      </div>
    </div>
    <div className="sb-icon-grid">
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>data-interactive</pre>
      </div>
      <div>
        <div data-shape="pin" className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>not data-interactive</pre>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div className="sb-bg-gray">
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div className="sb-bg-gray">
        <div
          data-shape="pin"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#9ed24d" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div className="sb-bg-gray">
        <div
          data-shape="pin"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#5fbcff" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div className="sb-bg-gray">
        <div
          data-shape="pin"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#ffa33d" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div className="sb-bg-gray">
        <div
          data-shape="pin"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#ff4d4d" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div className="sb-bg-gray">
        <div
          data-shape="pin"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#c0c0c0" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div>
        <div data-shape="circle" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div
          data-shape="circle"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#9ed24d" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div
          data-shape="circle"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#5fbcff" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div
          data-shape="circle"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#ffa33d" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div
          data-shape="circle"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#ff4d4d" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div
          data-shape="circle"
          data-interactive
          className="maplibregl-gradient-marker"
          style={{ "--marker-color": "#c0c0c0" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <div className="text">A</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <div className="text">5</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <div className="text">15</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <div className="text">105</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker disabled">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.disabled</pre>
      </div>
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
            <div className="inactive"></div>
          </div>
          <div className="target"></div>
        </div>
        <pre>.inactive</pre>
      </div>
      <div>
        <div data-shape="pin" data-interactive className="maplibregl-gradient-marker geolocation">
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.geolocation</pre>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker"
          style={{ "--marker-scale": "0.8" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 0.8</pre>
      </div>
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker"
          style={{ "--marker-scale": "1" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 1</pre>
      </div>
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker"
          style={{ "--marker-scale": "1.2" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 1.2</pre>
      </div>
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker"
          style={{ "--marker-scale": "1.4" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 1.4</pre>
      </div>
    </div>

    <div className="sb-icon-grid">
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker small-text"
          style={{ "--marker-scale": "0.8" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <div className="text">5</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 0.8</pre>
      </div>
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker"
          style={{ "--marker-scale": "1" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <div className="text">12</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 1</pre>
      </div>
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker"
          style={{ "--marker-scale": "1.2" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <div className="text">105</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 1.2</pre>
      </div>
      <div>
        <div
          data-shape="pin"
          className="maplibregl-gradient-marker"
          style={{ "--marker-scale": "1.4" }}
        >
          <div className="marker">
            <div className="circle"></div>
            <div className="text">130</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-scale: 1.4</pre>
      </div>
    </div>
  </div>
);

export const Basic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibre.Map({
      container: containerRef.current!,
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [5, 45],
      zoom: 4,
    });
    map.on("click", (e) => console.log(e.lngLat));

    new GradientMarker().setLngLat({ lng: -4.492187500001222, lat: 48.43306399776475 }).addTo(map);
    new GradientMarker({ color: "green" })
      .setLngLat({ lng: 3.154296874998977, lat: 42.65440425112374 })
      .addTo(map);
    new GradientMarker({ text: "5", interactive: false, color: "#c0c0c0" })
      .setLngLat({ lng: -1.679687500000881, lat: 43.4890366431398 })
      .addTo(map);
    new GradientMarker({ scale: 0.5 })
      .setLngLat({ lng: 6.274414062498977, lat: 43.10523413827215 })
      .addTo(map);
    new GradientMarker({ draggable: true, icon: "fe-braille" })
      .setLngLat({ lng: 8.295898437499488, lat: 49.099264690742416 })
      .addTo(map);
    new GradientMarker({ text: "125", scale: 2 })
      .setLngLat({ lng: 6.325788442409362, lat: 46.242459297071804 })
      .addTo(map);

    const i = document.createElement("i");
    i.classList.add("fe-star");
    new GradientMarker({ icon: i })
      .setLngLat({ lng: 9.82244387969439, lat: 43.03804240806406 })
      .addTo(map);

    function iconFactory() {
      const i = document.createElement("i");
      i.classList.add("fe-heart");
      return i;
    }

    new GradientMarker({ icon: iconFactory })
      .setLngLat({ lng: 2.524954125289554, lat: 51.08652310927343 })
      .addTo(map);
  }, []);
  return <div ref={containerRef} style={{ height: "100vh" }}></div>;
};

Basic.parameters = {
  layout: "fullscreen",
};
