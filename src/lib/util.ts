import { LngLat, LngLatLike, Offset, PointLike, StyleSpecification } from "maplibre-gl";
import {
  type MapCallbacks,
  type MapHandlerOptions,
  type MapReactiveOptions,
  type MapProps,
  mapReactiveOptionNames,
  mapHandlerNames,
} from "./MapManager";

export function filterMapProps(options: MapProps) {
  const callbacks = {};
  const mapHandlerOptions = {};
  const mapReactiveOptions = {};
  for (const key in options) {
    if (key.startsWith("on")) {
      // @ts-ignore
      callbacks[key] = options[key];
    } else if (mapHandlerNames.includes(key as any)) {
      // @ts-ignore
      mapHandlerOptions[key] = options[key];
    } else if (mapReactiveOptionNames.includes(key as any)) {
      // @ts-ignore
      mapReactiveOptions[key] = options[key];
    } else if (!key.startsWith("initial") && key !== "container" && key !== "style") {
      throw Error(`unknown map option key ${key}`);
    }
  }

  return [
    mapReactiveOptions as MapReactiveOptions,
    callbacks as MapCallbacks,
    mapHandlerOptions as MapHandlerOptions,
  ] as const;
}

export function transformPropsToOptions(props: { [k: string]: unknown }) {
  const callbacks: { [k: string]: unknown } = {};
  const options: { [k: string]: unknown } = {};
  for (const key in props) {
    if (key.startsWith("on")) {
      callbacks[key] = props[key];
    } else {
      const definitiveKey = key.startsWith("initial")
        ? key[7].toLowerCase() + key.substring(8)
        : key;

      if (options[definitiveKey]) {
        throw new Error(`duplicate key ${definitiveKey}`);
      } else {
        options[definitiveKey] = props[key];
      }
    }
  }
  return [options, callbacks] as const;
}

export function prepareEventDep(
  eventNameToCallbackName: { [k: string]: string },
  callbacks: { [eventName: string]: unknown },
) {
  const activeEvents = Object.keys(eventNameToCallbackName).filter(
    (eventName) => eventNameToCallbackName[eventName] in callbacks,
  );

  return activeEvents.sort();
}

 
/**
 * from : react-map-gl/src/utils/deep-equal.ts
 * Compare any two objects
 * @param a
 * @param b
 * @returns true if the objects are deep equal
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else if (Array.isArray(b)) {
    return false;
  }
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

interface LngLatObj {
  lng: number;
  lat: number;
}

export function areLngLatClose(lngLat1?: LngLatObj, lngLat2?: LngLatObj): boolean {
  if (!lngLat1 && !lngLat2) {
    return true;
  }
  if (!lngLat1 || !lngLat2) {
    return false;
  }
  return (
    Math.round(lngLat1.lng * 100000) === Math.round(lngLat2.lng * 100000) &&
    Math.round(lngLat1.lat * 100000) === Math.round(lngLat2.lat * 100000)
  );
}

export function areCoordsClose(coords1?: LngLatLike, coords2?: LngLatLike): boolean {
  if (!coords1 && !coords2) {
    return true;
  }
  if (!coords1 || !coords2) {
    return false;
  }
  const lngLat1 = LngLat.convert(coords1);
  const lngLat2 = LngLat.convert(coords2);

  return (
    Math.round(lngLat1.lng * 100000) === Math.round(lngLat2.lng * 100000) &&
    Math.round(lngLat1.lat * 100000) === Math.round(lngLat2.lat * 100000)
  );
}

export function lngLatClassToObj(lngLat: LngLat) {
  return {
    lng: lngLat.lng,
    lat: lngLat.lat,
  };
}

export function arePointsEqual(a?: PointLike, b?: PointLike): boolean {
  const ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
  const ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
  const bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
  const by = Array.isArray(b) ? b[1] : b ? b.y : 0;
  return ax === bx && ay === by;
}

export function updateClassNames(
  elt: HTMLElement,
  prevClassNames: string[],
  nextClassNames: string[],
) {
  prevClassNames.forEach((name) => {
    if (name === "") {
      return;
    }
    if (nextClassNames.indexOf(name) === -1) {
      elt.classList.remove(name);
    }
  });

  nextClassNames.forEach((name) => {
    if (name === "") {
      return;
    }

    if (prevClassNames.indexOf(name) === -1 || !elt.classList.contains(name)) {
      elt.classList.add(name);
    }
  });
}

export function updateListeners(
  prevEventTypes: string[],
  nextEventTypes: string[],
  onSubscribe: (eventName: string) => void,
  onUnsubscribe: (eventName: string) => void,
) {
  prevEventTypes.forEach((eventName) => {
    if (eventName !== "" && nextEventTypes.indexOf(eventName) === -1) {
      // console.log("unregister event listener on", eventName);
      onUnsubscribe(eventName);
    }
  });

  nextEventTypes.forEach((eventName) => {
    if (eventName !== "" && prevEventTypes.indexOf(eventName) === -1) {
      // console.log("register event listener on", eventName);
      onSubscribe(eventName);
    }
  });
}

const markerHeight = 41 - 5.8 / 2;
const markerRadius = 13.5;
const linearOffset = Math.abs(markerRadius) / Math.SQRT2;

export const markerPopupOffset = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -markerHeight],
  "bottom-left": [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
  "bottom-right": [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
  left: [markerRadius, (markerHeight - markerRadius) * -1],
  right: [-markerRadius, (markerHeight - markerRadius) * -1],
} as Offset;

const gradientMarkerHeight = 50;

export const gradientMarkerPopupOffset = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -gradientMarkerHeight],
  "bottom-left": [linearOffset, (gradientMarkerHeight - markerRadius + linearOffset) * -1],
  "bottom-right": [-linearOffset, (gradientMarkerHeight - markerRadius + linearOffset) * -1],
  left: [markerRadius, (gradientMarkerHeight - markerRadius) * -1],
  right: [-markerRadius, (gradientMarkerHeight - markerRadius) * -1],
} as Offset;

export const emptyStyle: StyleSpecification = {
  version: 8,
  name: "Empty",
  sources: {},
  layers: [],
};
