import {
  ControlPosition,
  IControl,
  AttributionControl,
  AttributionControlOptions,
} from "maplibre-gl";
import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";

type RAttributionControlProps = AttributionControlOptions & {
  position?: ControlPosition;
};

export const RAttributionControl = memo(
  forwardRef<IControl, RAttributionControlProps>(function RAttributionControl(
    { position = "bottom-right", ...controlOptions },
    ref,
  ) {
    const control = useControl({
      position,
      factory: () => new AttributionControl(controlOptions),
    });
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
