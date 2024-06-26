import { useState } from "react";
import {
  ContextMenuEventDispatcher,
  MaplibreContextmenuEventDetail,
} from "./ContextMenuEventDispatcher";
import { Meta } from "@storybook/react";
import { ContextMenu, ContextMenuItem, ContextMenuItemMouseEvent } from "pentatrion-design";
import { RMap, RMarker, useMapAndCanvasRefs } from "..";

const meta = {
  title: "maplibre-react-components/ContextMenu",
  component: ContextMenuEventDispatcher,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ContextMenuEventDispatcher>;
export default meta;

export const Basic = () => {
  const { canvasRef, setMapAndCanvasRef } = useMapAndCanvasRefs();

  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(null);

  function handleClickBack(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    setMarkerCoords(mapEvent.detail.lngLat.toArray());
  }

  return (
    <RMap ref={setMapAndCanvasRef}>
      {markerCoords && <RMarker longitude={markerCoords[0]} latitude={markerCoords[1]} />}
      <ContextMenuEventDispatcher />
      <ContextMenu targetRef={canvasRef} eventName="contextmenu-maplibre">
        <ContextMenuItem label="Add marker" onClick={handleClickBack} />
      </ContextMenu>
    </RMap>
  );
};
