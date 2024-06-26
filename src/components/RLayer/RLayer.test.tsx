import { cleanup, render, waitFor } from "@testing-library/react";
import { CircleLayerSpecification, Map, Source } from "maplibre-gl";
import { RefObject } from "react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { RMap } from "../RMap";
import { Point } from "geojson";
import { RSource } from "../RSource";
import { RLayer, StyleLayer } from "./RLayer";

import { beforeMapTest } from "~/tests/util";
import { emptyStyle } from "~/lib/util";

beforeEach(() => {
  beforeMapTest();
});
afterEach(() => {
  cleanup();
});

describe("RLayer", () => {
  test("RLayer forward layer ref", async ({ expect }) => {
    const layerRef: RefObject<StyleLayer> = { current: null };
    const sourceRef: RefObject<Source> = { current: null };
    const mapRef: RefObject<Map> = { current: null };

    const data: Point = {
      coordinates: [0, 0],
      type: "Point",
    };

    const paintStyle: CircleLayerSpecification["paint"] = { "circle-color": "red" };

    const { rerender } = render(
      <RMap ref={mapRef} mapStyle={emptyStyle}>
        <RSource ref={sourceRef} id="source" type="geojson" data={data} />
        <RLayer ref={layerRef} id="layer" source="source" type="circle" paint={paintStyle} />
      </RMap>,
    );

    const map = mapRef.current!;

    await waitFor(() => {
      expect(sourceRef.current).not.toBe(null);
      expect(layerRef.current).not.toBe(null);
    });

    expect(map.getLayer("layer")).toBe(layerRef.current);

    rerender(<RMap ref={mapRef} mapStyle={emptyStyle} />);

    await waitFor(() => {
      expect(sourceRef.current).toBe(null);
      expect(layerRef.current).toBe(null);
    });

    expect(map.getLayer("layer")).toBeUndefined();
  });

  test("RLayer unmount correctly if source is removed even if component still exist", async ({
    expect,
  }) => {
    const layerRef: RefObject<StyleLayer> = { current: null };
    const sourceRef: RefObject<Source> = { current: null };
    const mapRef: RefObject<Map> = { current: null };

    const data: Point = {
      coordinates: [0, 0],
      type: "Point",
    };

    const paintStyle: CircleLayerSpecification["paint"] = { "circle-color": "red" };

    const { rerender } = render(
      <RMap ref={mapRef} mapStyle={emptyStyle}>
        <RSource ref={sourceRef} id="source" type="geojson" data={data} />
        <RLayer ref={layerRef} id="layer" source="source" type="circle" paint={paintStyle} />
      </RMap>,
    );

    const map = mapRef.current!;

    await waitFor(() => {
      expect(sourceRef.current).not.toBe(null);
      expect(layerRef.current).not.toBe(null);
    });

    expect(map.getLayer("layer")).toBe(layerRef.current);

    rerender(
      <RMap ref={mapRef} mapStyle={emptyStyle}>
        <RLayer ref={layerRef} id="layer" source="source" type="circle" paint={paintStyle} />
      </RMap>,
    );

    await waitFor(() => {
      expect(sourceRef.current).toBe(null);
      expect(layerRef.current).toBe(null);
    });
    expect(map.getLayer("layer")).toBeUndefined();

    rerender(<RMap ref={mapRef} mapStyle={emptyStyle} />);

    await waitFor(() => {
      expect(layerRef.current).toBe(null);
    });

    expect(map.getLayer("layer")).toBeUndefined();
  });

  test("RLayer mount correctly if RSource is added after RLayer", async ({ expect }) => {
    const layerRef: RefObject<StyleLayer> = { current: null };
    const sourceRef: RefObject<Source> = { current: null };
    const mapRef: RefObject<Map> = { current: null };

    const data: Point = {
      coordinates: [0, 0],
      type: "Point",
    };

    const paintStyle: CircleLayerSpecification["paint"] = { "circle-color": "red" };

    const { rerender } = render(
      <RMap ref={mapRef} mapStyle={emptyStyle}>
        <RLayer ref={layerRef} id="layer" source="source" type="circle" paint={paintStyle} />
      </RMap>,
    );

    const map = mapRef.current!;

    await waitFor(() => {
      expect(layerRef.current).toBe(null);
    });

    expect(map.getLayer("layer")).toBeUndefined();

    rerender(
      <RMap ref={mapRef} mapStyle={emptyStyle}>
        <RSource ref={sourceRef} id="source" type="geojson" data={data} />
        <RLayer ref={layerRef} id="layer" source="source" type="circle" paint={paintStyle} />
      </RMap>,
    );

    await waitFor(() => {
      expect(sourceRef.current).not.toBe(null);
      expect(layerRef.current).not.toBe(null);
    });
    expect(map.getLayer("layer")).toBe(layerRef.current);
  });
});
