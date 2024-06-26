import { ControlPosition, IControl, LogoControl, LogoControlOptions } from "maplibre-gl";
import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";

type RLogoControlProps = LogoControlOptions & {
  position?: ControlPosition;
};

export const RLogoControl = memo(
  forwardRef<IControl, RLogoControlProps>(function RLogoControl(
    { position = "bottom-left", ...controlOptions },
    ref,
  ) {
    const control = useControl({
      position,
      factory: () => new LogoControl(controlOptions),
    });
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
