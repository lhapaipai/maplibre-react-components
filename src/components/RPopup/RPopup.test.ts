import { assertType, describe, test } from "vitest";
import { PopupOptions } from "maplibre-gl";

import { PopupNonReactiveOptionName, PopupReactiveOptionName } from "./RPopup";

describe("RPopup", () => {
  test("if RPopup cover all PopupOptions", () => {
    assertType<
      Omit<
        PopupOptions,
        | PopupNonReactiveOptionName
        | PopupReactiveOptionName
        | "closeButton"
        | "closeOnClick"
        | "closeOnMove"
      >
    >(Object);
  });
});
