import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";

import { type Event } from "../../types.d";
import { GradientMarker, type GradientMarkerOptions } from "./GradientMarker";
import { useMap } from "../../hooks/useMap";
import { prepareEventDep, transformPropsToOptions, updateClassNames } from "../../lib/util";

const eventNameToCallbackName = {
  dragstart: "onDragStart",
  drag: "onDrag",
  dragend: "onDragEnd",
  click: "onClick",
} as const;
export type GradientMarkerEventName = keyof typeof eventNameToCallbackName;

type GradientMarkerEvent = Event<GradientMarker> | MouseEvent;

export type GradientMarkerCallbacks = {
  onDragStart?: (e: Event<GradientMarker>) => void;
  onDrag?: (e: Event<GradientMarker>) => void;
  onDragEnd?: (e: Event<GradientMarker>) => void;

  // native DOM event
  onClick?: (e: MouseEvent) => void;
};

export const markerReactiveOptionNames = [
  "className",
  "clickTolerance",
  "color",
  "draggable",
  "icon",
  "opacity",
  "opacityWhenCovered",
  "pitchAlignment",
  "rotation",
  "rotationAlignment",
  "scale",
  "text",
] as const;
export type GradientMarkerReactiveOptionName = (typeof markerReactiveOptionNames)[number];
export type GradientMarkerReactiveOptions = {
  [key in GradientMarkerReactiveOptionName]?: GradientMarkerOptions[key];
};

export const markerNonReactiveOptionNames = [] as const;
export type GradientMarkerNonReactiveOptionName = (typeof markerNonReactiveOptionNames)[number];
export type GradientMarkerInitialOptionName =
  `initial${Capitalize<GradientMarkerNonReactiveOptionName>}`;
export type GradientMarkerInitialOptions = {
  [key in GradientMarkerNonReactiveOptionName as `initial${Capitalize<key>}`]?: GradientMarkerOptions[key];
};

export type GradientMarkerProps = GradientMarkerInitialOptions &
  GradientMarkerReactiveOptions &
  GradientMarkerCallbacks;

export type RGradientMarkerProps = GradientMarkerProps & {
  longitude: number;
  latitude: number;
};

export const RGradientMarker = memo(
  forwardRef<GradientMarker, RGradientMarkerProps>(function RGradientMarker(props, ref) {
    const { longitude, latitude, ...markerProps } = props;
    const map = useMap();

    const [options, markerCallbacks] = transformPropsToOptions(markerProps) as [
      Omit<GradientMarkerOptions, "element" | "bottom" | "offset">,
      GradientMarkerCallbacks,
    ];

    const prevOptionsRef = useRef<Omit<GradientMarkerOptions, "element">>(options);

    const currCallbacksRef = useRef<GradientMarkerCallbacks>();
    currCallbacksRef.current = markerCallbacks;

    const marker = useMemo(() => {
      const mk = new GradientMarker({
        ...options,
        anchor: "bottom",
      });
      mk.setLngLat([longitude, latitude]);

      return mk;
      // marker reactivity is managed below
      // we don't want to destroy/re-instanciate a GradientMarker instance in each render
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eventDepStr = prepareEventDep(eventNameToCallbackName, markerCallbacks).join("-");
    useEffect(() => {
      function onGradientMarkerEvent(e: GradientMarkerEvent) {
        const eventType = e.type as GradientMarkerEventName;
        const callbackName = eventNameToCallbackName[eventType];
        if (currCallbacksRef.current?.[callbackName]) {
          // @ts-ignore
          // the type of event depends on its nature and
          // event subscribers expect specific and not generic events
          currCallbacksRef.current[callbackName]?.(e);
        } else {
          console.info("not managed RGradientMarker event", eventType, e);
        }
      }

      const eventNames = eventDepStr.split("-") as GradientMarkerEventName[];

      eventNames.forEach((eventName) => {
        if (eventName === "click") {
          marker.getElement().addEventListener("click", onGradientMarkerEvent);
        } else {
          marker.on(eventName, onGradientMarkerEvent);
        }
      });

      return () => {
        eventNames.forEach((eventName) => {
          if (eventName === "click") {
            marker.getElement().removeEventListener("click", onGradientMarkerEvent);
          } else {
            marker.off(eventName, onGradientMarkerEvent);
          }
        });
      };
    }, [eventDepStr, marker]);

    useEffect(() => {
      marker.addTo(map);

      return () => void marker.remove();
      // we can add [map, marker] but we know they will not change during the lifecycle
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
      scale,
      color,
      text,
      icon,
      className,
      draggable,
      clickTolerance = 0,
      rotation,
      rotationAlignment,
      pitchAlignment,
      opacity,
      opacityWhenCovered,
    } = options;

    useImperativeHandle(ref, () => marker as GradientMarker, [marker]);

    if (prevOptionsRef.current.className !== className) {
      updateClassNames(
        marker._element,
        prevOptionsRef.current.className?.split(" ") || [],
        className?.split(" ") || [],
      );
    }
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
      marker.setLngLat([longitude, latitude]);
    }
    if (marker.isDraggable() !== draggable) {
      marker.setDraggable(draggable);
    }
    if (marker._clickTolerance !== clickTolerance) {
      marker._clickTolerance = clickTolerance;
    }
    if (marker.getRotation() !== rotation) {
      marker.setRotation(rotation);
    }
    if (marker.getRotationAlignment() !== rotationAlignment) {
      marker.setRotationAlignment(rotationAlignment);
    }
    if (marker.getPitchAlignment() !== pitchAlignment) {
      marker.setPitchAlignment(pitchAlignment);
    }
    if (marker._opacity !== opacity || marker._opacityWhenCovered !== opacityWhenCovered) {
      marker.setOpacity(opacity, opacityWhenCovered);
    }
    if (marker.getColor() !== color) {
      marker.setColor(color);
    }
    if (marker.getScale() !== scale) {
      marker.setScale(scale);
    }
    if (marker.getText() !== text) {
      marker.setText(text);
    }

    /**
     * getIcon return the option (string, HTMLElement, factory) not
     * the HTMLElement created.
     */
    if (marker.getIcon() !== icon) {
      marker.setIcon(icon);
    }

    prevOptionsRef.current = options;

    return null;
  }),
);
