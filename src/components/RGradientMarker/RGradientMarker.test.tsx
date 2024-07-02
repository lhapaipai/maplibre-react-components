import { afterEach, assertType, beforeEach, describe, test } from "vitest";

import {
  GradientMarkerNonReactiveOptionName,
  GradientMarkerReactiveOptionName,
  RGradientMarker,
} from "./RGradientMarker";
import { beforeMapTest } from "~tests/util";
import { cleanup, render } from "@testing-library/react";

import { GradientMarkerOptions } from "./GradientMarker";
import { RMap } from "../RMap/RMap";
import { emptyStyle } from "~/lib";

beforeEach(() => {
  beforeMapTest();
});
afterEach(() => {
  cleanup();
});

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

  test("No duplicate circle when change icon", async ({ expect }) => {
    const { container, rerender } = render(
      <RMap mapStyle={emptyStyle} initialAttributionControl={false}>
        <RGradientMarker longitude={0} latitude={0} icon="fe-star" />
      </RMap>,
    );

    expect(container.querySelector(".maplibregl-gradient-marker")).toMatchInlineSnapshot(`
      <div
        aria-label="Map marker"
        class="maplibregl-gradient-marker maplibregl-marker maplibregl-marker-anchor-bottom"
        style="--marker-size: 50px; --marker-color: #ffe64b; transform: translate(-50%,-100%) translate(200px, 150px) rotateX(0deg) rotateZ(0deg);"
        tabindex="0"
      >
        <div
          class="marker"
        >
          <div
            class="circle"
          />
          <i
            class="fe-star"
          />
        </div>
        <div
          class="target"
        />
      </div>
    `);

    rerender(
      <RMap mapStyle={emptyStyle} initialAttributionControl={false}>
        <RGradientMarker longitude={0} latitude={0} icon="fe-heart" />
      </RMap>,
    );

    expect(container.querySelector(".maplibregl-gradient-marker")).toMatchInlineSnapshot(`
      <div
        aria-label="Map marker"
        class="maplibregl-gradient-marker maplibregl-marker maplibregl-marker-anchor-bottom draggable"
        style="--marker-size: 50px; --marker-color: #ffe64b; transform: translate(-50%,-100%) translate(200px, 150px) rotateX(0deg) rotateZ(0deg); opacity: 1;"
        tabindex="0"
      >
        <div
          class="marker"
        >
          <div
            class="circle"
          />
          <i
            class="fe-heart"
          />
        </div>
        <div
          class="target"
        />
      </div>
    `);
  });
});
