import { ControlPosition, IControl, FullscreenControlOptions } from "maplibre-gl";
import maplibregl from "maplibre-gl";

import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";

type RFullscreenControlProps = FullscreenControlOptions & {
  position?: ControlPosition;
};

export const RFullscreenControl = memo(
  forwardRef<IControl, RFullscreenControlProps>(function RFullscreenControl(
    { position = "top-right", ...controlOptions },
    ref,
  ) {
    const control = useControl({
      position,
      factory: () => new maplibregl.FullscreenControl(controlOptions),
    });
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
