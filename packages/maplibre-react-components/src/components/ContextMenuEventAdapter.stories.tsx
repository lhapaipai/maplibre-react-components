import { useState } from "react";
import { ContextMenuEventAdapter, MaplibreContextmenuEventDetail } from "./ContextMenuEventAdapter";
import { Meta } from "@storybook/react";
import { ContextMenu, ContextMenuItem, ContextMenuItemMouseEvent } from "pentatrion-design/context-menu";
import { RMap, RMarker, useMapAndCanvasRefs } from "..";

const meta = {
  title: "maplibre-react-components/ContextMenu",
  component: ContextMenuEventAdapter,
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
} satisfies Meta<typeof ContextMenuEventAdapter>;
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
      <ContextMenuEventAdapter />
      <ContextMenu targetRef={canvasRef} eventName="contextmenu-maplibre">
        <ContextMenuItem label="Add marker" onClick={handleClickBack} />
      </ContextMenu>
    </RMap>
  );
};
