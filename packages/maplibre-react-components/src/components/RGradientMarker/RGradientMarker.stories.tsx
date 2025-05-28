import { RMap } from "../RMap";
import { Event } from "../../types.d";
import { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import { RGradientMarker } from "./RGradientMarker";
import { GradientMarkerOptions, type GradientMarker } from "./GradientMarker";

const mapCenter: [number, number] = [5, 45];

const meta = {
  title: "maplibre-react-components/RGradientMarker",
  component: RGradientMarker,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    rotation: {
      control: {
        type: "range",
        min: 0,
        max: 360,
      },
    },
    shape: {
      control: {
        type: "select",
      },
      options: ["pin", "circle"],
    },
    rotationAlignment: {
      control: {
        type: "select",
      },
      options: ["map", "viewport", "auto"],
    },
    pitchAlignment: {
      control: {
        type: "select",
      },
      options: ["map", "viewport", "auto"],
    },
    clickTolerance: {
      control: {
        type: "number",
        min: 0,
        max: 100,
      },
      description: "nb of pixels to move before drag start",
    },
    opacity: {
      control: {
        type: "select",
      },
      options: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
    },
    opacityWhenCovered: {
      control: {
        type: "select",
      },
      options: ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
    },
    color: {
      control: {
        type: "color",
        presetColors: ["#ffe64b", "#9ed24d", "#5fbcff", "#ffa33d", "#ff4d4d", "#c0c0c0"],
      },
    },
    scale: {
      control: {
        type: "range",
        min: 0.1,
        max: 2,
        step: 0.1,
      },
    },
  },

  decorators: [
    (Story) => (
      <RMap style={{ height: "100vh" }} initialCenter={mapCenter} initialZoom={4}>
        <Story />
      </RMap>
    ),
  ],
} satisfies Meta<typeof RGradientMarker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: "",
    draggable: false,
    clickTolerance: 0,
    rotation: 0,
    rotationAlignment: "auto",
    shape: "pin",
    interactive: true,
    pitchAlignment: "auto",
    opacity: "1", // type string to be compatible with elt.style.opacity
    opacityWhenCovered: "0.2",
    longitude: 5,
    latitude: 45,
    color: "#ffe64b",
    scale: 1,
    icon: "fe-star",
  },
};

const items: {
  id: string;
  shape: GradientMarkerOptions["shape"];
  image: { src: string; width: number; height: number };
  geom: { lng: number; lat: number };
}[] = [
  {
    id: "a",
    shape: "pin",
    image: {
      src: "/lhapaipai.webp",
      width: 56,
      height: 56,
    },
    geom: {
      lng: -1.4161,
      lat: 46.0555,
    },
  },
  {
    id: "b",
    shape: "portrait",
    image: {
      src: "/portrait.webp",
      width: 41,
      height: 59,
    },
    geom: {
      lng: 13.7969,
      lat: 45.6232,
    },
  },
  {
    id: "c",
    shape: "landscape",
    image: {
      src: "/landscape.webp",
      width: 64,
      height: 43,
    },
    geom: {
      lng: 8.3088,
      lat: 41.106,
    },
  },
];

export const ShapeImage = () => {
  // we suppose items can be dynamic in our React App
  const factories = useMemo(() => {
    return items.map(({ image }) => () => {
      const elt = document.createElement("img");
      elt.src = image.src;
      elt.width = image.width;
      elt.height = image.height;
      return elt;
    });
  }, []);

  return (
    <>
      {items.map(({ geom, shape, id }, idx) => (
        <RGradientMarker
          scale={1.5}
          key={id}
          icon={factories[idx]}
          shape={shape}
          longitude={geom.lng}
          latitude={geom.lat}
        />
      ))}
    </>
  );
};

export const Draggable = () => {
  const [coords, setCoords] = useState({ lng: 5, lat: 45 });
  function handleDragEnd(e: Event<GradientMarker>) {
    console.log("on DragEnd");
    setCoords(e.target.getLngLat());
  }
  return (
    <RGradientMarker
      draggable={true}
      longitude={coords.lng}
      latitude={coords.lat}
      onDragEnd={handleDragEnd}
    ></RGradientMarker>
  );
};
