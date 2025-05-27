import type { ControlPosition, IControl, TerrainSpecification } from "maplibre-gl";
import maplibregl from "maplibre-gl";

import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";

type RTerrainControlProps = TerrainSpecification & {
  position?: ControlPosition;
};

export const RTerrainControl = memo(
  forwardRef<IControl, RTerrainControlProps>(function RTerrainControl(
    { position = "top-right", ...controlOptions },
    ref,
  ) {
    const control = useControl({
      position,
      factory: () => new maplibregl.TerrainControl(controlOptions),
    });
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
