import { ControlPosition, IControl, GeolocateControl, GeolocateControlOptions } from "maplibre-gl";
import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "../hooks/useControl";

type RGeolocateControlProps = GeolocateControlOptions & {
  position?: ControlPosition;
};

export const RGeolocateControl = memo(
  forwardRef<IControl, RGeolocateControlProps>(function RGeolocateControl(
    { position = "top-right", ...controlOptions },
    ref,
  ) {
    const control = useControl({
      position,
      factory: () => new GeolocateControl(controlOptions),
    });
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
