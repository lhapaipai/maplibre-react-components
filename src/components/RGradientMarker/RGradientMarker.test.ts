import { assertType, describe, test } from "vitest";

import {
  GradientMarkerNonReactiveOptionName,
  GradientMarkerReactiveOptionName,
} from "./RGradientMarker";
import { GradientMarkerOptions } from "./GradientMarker";

describe("RGradientMarker", () => {
  test("GradientMarkerOptions exhaustivity", () => {
    // test if we cover all GradientMarkerOptions
    assertType<
      Omit<
        GradientMarkerOptions,
        | GradientMarkerNonReactiveOptionName
        | GradientMarkerReactiveOptionName
        | "element"
        | "anchor"
        | "offset"
      >
    >(Object);
  });
});
