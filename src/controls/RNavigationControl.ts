import { forwardRef, memo, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";
import {
  ControlPosition,
  IControl,
  NavigationControl,
  NavigationControlOptions,
} from "maplibre-gl";

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
      factory: () => new NavigationControl(controlOptions),
    });

    useImperativeHandle(ref, () => control);

    return null;
  }),
);
