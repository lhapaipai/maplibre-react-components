import { afterAll, afterEach, beforeAll, beforeEach, describe, test, vi } from "vitest";
import { beforeMapTest } from "~tests/util";
import { cleanup, render, waitFor } from "@testing-library/react";
import { GeoJSONSource, Map, Source } from "maplibre-gl";
import { RefObject } from "react";
import { RMap } from "../RMap";
import { RSource } from "./RSource";
import { Point } from "geojson";
import { emptyStyle } from "~/lib/util";
import { setupServer } from "msw/node";
import { HttpResponse, http, delay } from "msw";

const slowEmptyStyleUrl = "http://domain.com/slow-empty-style.json";

const handlers = [
  http.get(slowEmptyStyleUrl, async () => {
    await delay(200);
    return HttpResponse.json(emptyStyle);
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

beforeEach(() => {
  beforeMapTest();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

describe("RSource", () => {
  test("RSource forward source ref", async ({ expect }) => {
    const sourceRef: RefObject<Source> = { current: null };
    const mapRef: RefObject<Map> = { current: null };

    const data: Point = {
      coordinates: [0, 0],
      type: "Point",
    };

    render(
      <RMap ref={mapRef} mapStyle={emptyStyle}>
        <RSource ref={sourceRef} id="source" type="geojson" data={data} />
      </RMap>,
    );

    const map = mapRef.current!;

    await waitFor(() => {
      expect(sourceRef.current).not.toBe(null);
    });

    expect(sourceRef.current).toBeInstanceOf(GeoJSONSource);
    expect(map.getSource("source")).toBe(sourceRef.current);
  });

  test("RSource mount and unmount correctly", async ({ expect }) => {
    const sourceRef: RefObject<Source> = { current: null };
    const mapRef: RefObject<Map> = { current: null };

    const data: Point = {
      coordinates: [0, 0],
      type: "Point",
    };

    const { rerender } = render(
      <RMap ref={mapRef} mapStyle={emptyStyle}>
        <RSource ref={sourceRef} id="source" type="geojson" data={data} />
      </RMap>,
    );

    const map = mapRef.current!;

    await waitFor(() => {
      expect(sourceRef.current).not.toBe(null);
    });

    rerender(<RMap ref={mapRef} mapStyle={emptyStyle} />);

    await waitFor(() => {
      expect(sourceRef.current).toBe(null);
    });

    expect(map.getSource("source")).toBeUndefined();
  });

  test("RSource mount correctly when map style available after time", async ({ expect }) => {
    const sourceRef: RefObject<Source> = { current: null };
    const mapRef: RefObject<Map> = { current: null };

    const data: Point = {
      coordinates: [0, 0],
      type: "Point",
    };

    const handleLoad = vi.fn();
    const handleMounted = vi.fn();

    render(
      <RMap ref={mapRef} mapStyle={slowEmptyStyleUrl} onMounted={handleMounted} onLoad={handleLoad}>
        <RSource ref={sourceRef} id="source" type="geojson" data={data} />
      </RMap>,
    );

    await waitFor(() => {
      expect(handleMounted).toBeCalledTimes(1);
    });

    expect(sourceRef.current).toBe(null);

    await waitFor(() => {
      expect(handleLoad).toBeCalledTimes(1);
    });
    expect(sourceRef.current).not.toBe(null);
  });
});
