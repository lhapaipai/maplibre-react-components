import { RMap } from "../RMap";
import { Event } from "../../types.d";
import { Meta, StoryObj, ReactRenderer } from "@storybook/react";
import { useState } from "react";

import { RGradientMarker } from "./RGradientMarker";
import { type GradientMarker } from "./GradientMarker";
import { PartialStoryFn } from "@storybook/types";

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
      <RMap style={{ height: "100vh" }}>
        <Story />
      </RMap>
    ),
  ] as ((story: PartialStoryFn<ReactRenderer, any>) => JSX.Element)[],
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
