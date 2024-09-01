import { assertType, describe, test } from "vitest";
import { MarkerOptions } from "maplibre-gl";

import { MarkerNonReactiveOptionName, MarkerReactiveOptionName } from "./RMarker";

describe("RMarker", () => {
  test("if RMarkerProps cover all MarkerOptions", () => {
    assertType<
      Omit<MarkerOptions, MarkerNonReactiveOptionName | MarkerReactiveOptionName | "element" | "subpixelPositioning">
    >(Object);
  });
});
