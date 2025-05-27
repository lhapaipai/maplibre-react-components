import { forwardRef, memo, useImperativeHandle } from "react";
import type { ControlPosition, IControl, NavigationControlOptions } from "maplibre-gl";
import maplibregl from "maplibre-gl";

import { useControl } from "../hooks/useControl";

type RNavigationControlProps = NavigationControlOptions & {
  position?: ControlPosition;
};

export const RNavigationControl = memo(
  forwardRef<IControl, RNavigationControlProps>(function RNavigationControl(
    { position = "top-right", ...controlOptions },
    ref,
  ) {
    const control = useControl({
      position,
      factory: () => new maplibregl.NavigationControl(controlOptions),
    });

    useImperativeHandle(ref, () => control);

    return null;
  }),
);
