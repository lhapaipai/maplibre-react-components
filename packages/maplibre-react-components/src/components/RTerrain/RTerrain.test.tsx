import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, test, vi } from "vitest";
import { RMap } from "../RMap";
import { emptyStyle } from "~/lib";
import { RSource } from "../RSource";
import { RTerrain } from "./RTerrain";
import { RefObject } from "react";
import { Map, Source } from "maplibre-gl";

import { beforeMapTest } from "~tests/map-util";

const rasterDemTiles = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"];

beforeEach(() => {
  beforeMapTest();
});
afterEach(() => {
  cleanup();
});

describe("RTerrain", () => {
  test("Render correctly", async ({ expect }) => {
    const mapRef: RefObject<Map> = { current: null };
    const sourceRef: RefObject<Source> = { current: null };

    render(
      <RMap ref={mapRef} mapStyle={emptyStyle} initialAttributionControl={false}>
        <RSource
          ref={sourceRef}
          type="raster-dem"
          id="terrarium"
          tiles={rasterDemTiles}
          encoding="terrarium"
          tileSize={256}
        />
        <RTerrain source="terrarium" />
      </RMap>,
    );

    const map = mapRef.current!;

    await waitFor(() => {
      expect(sourceRef.current).not.toBe(null);
      expect(map.getTerrain()).not.toBe(null);
    });

    expect(map.getTerrain()).toMatchInlineSnapshot(`
      {
        "source": "terrarium",
      }
    `);
  });

  test("Not to throw error if Terrain RSource is defined after RTerrain", async ({ expect }) => {
    const mapRef: RefObject<Map> = { current: null };
    const sourceRef: RefObject<Source> = { current: null };

    const loadedCb = vi.fn();

    const { rerender } = render(
      <RMap ref={mapRef} mapStyle={emptyStyle} initialAttributionControl={false} onLoad={loadedCb}>
        <RTerrain source="terrarium" />
      </RMap>,
    );

    const map = mapRef.current!;

    await waitFor(() => {
      expect(loadedCb).toBeCalled();
    });

    expect(map.getTerrain()).toBe(null);

    rerender(
      <RMap ref={mapRef} mapStyle={emptyStyle} initialAttributionControl={false} onLoad={loadedCb}>
        <RSource
          ref={sourceRef}
          type="raster-dem"
          id="terrarium"
          tiles={rasterDemTiles}
          encoding="terrarium"
          tileSize={256}
        />

        <RTerrain source="terrarium" />
      </RMap>,
    );

    await waitFor(() => {
      expect(sourceRef.current).not.toBe(null);
      expect(map.getTerrain()).not.toBe(null);
    });

    expect(map.getTerrain()).toMatchInlineSnapshot(`
      {
        "source": "terrarium",
      }
    `);
  });
});
