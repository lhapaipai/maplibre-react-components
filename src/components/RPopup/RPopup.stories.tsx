import { Meta, StoryObj } from "@storybook/react";
import { RMap } from "../RMap";
import { RMarker } from "../RMarker";
import { markerPopupOffset } from "../../lib/util";
import { RPopup } from "./RPopup";
import { useState } from "react";

const meta = {
  title: "maplibre-react-components/RPopup",
  component: RPopup,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <RMap style={{ height: "100vh" }}>
          <Story />
        </RMap>
      );
    },
  ],
} satisfies Meta<typeof RPopup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <p>Hello world</p>,
    longitude: 5,
    latitude: 45,
    className: "",
    offset: 10,
    maxWidth: "240px",
    initialFocusAfterOpen: false,
    initialAnchor: "bottom",
    initialSubpixelPositioning: false,
  },
  argTypes: {
    initialAnchor: {
      control: {
        type: "select",
      },
      options: [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
    },
  },
};

const marignier = { lng: 6.498, lat: 46.089 };

export const PopupWithMarker = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      <RMarker
        longitude={marignier.lng}
        latitude={marignier.lat}
        onClick={(e) => {
          e.stopPropagation();
          setShowPopup((s) => !s);
        }}
      ></RMarker>
      {showPopup && (
        <RPopup
          longitude={marignier.lng}
          latitude={marignier.lat}
          onMapClick={() => setShowPopup(false)}
          onMapMove={() => setShowPopup(false)}
          offset={markerPopupOffset}
        >
          <p>Hello world</p>
        </RPopup>
      )}
    </>
  );
};
