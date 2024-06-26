import { ControlPosition, IControl, ScaleControl, ScaleControlOptions } from "maplibre-gl";
import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";

type RScaleControlProps = ScaleControlOptions & {
  position?: ControlPosition;
};

export const RScaleControl = memo(
  forwardRef<IControl, RScaleControlProps>(function RScaleControl(
    { position = "bottom-left", ...controlOptions },
    ref,
  ) {
    const control = useControl({
      position,
      factory: () => new ScaleControl(controlOptions),
    });
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
