import { ControlPosition, IControl } from "maplibre-gl";
import maplibregl from "maplibre-gl";

import { forwardRef, memo, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";

type RGlobeControlProps = {
  position?: ControlPosition;
};

export const RGlobeControl = memo(
  forwardRef<IControl, RGlobeControlProps>(function RGlobeControl({ position = "top-right" }, ref) {
    const control = useControl({
      position,
      factory: () => new maplibregl.GlobeControl(),
    });
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
