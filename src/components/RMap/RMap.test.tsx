import { afterEach, assertType, describe, test, vi, expect, beforeEach } from "vitest";
import { Map, StyleSpecification, type MapOptions } from "maplibre-gl";

import { cleanup, render, waitFor } from "@testing-library/react";

import {
  MapReactiveOptionName,
  MapNonReactiveOptionName,
  MapHandlerOptionName,
} from "~/lib/MapManager";
import { RMap } from "./RMap";
import { beforeMapTest } from "~tests/util";
import { emptyStyle } from "~/lib/util";
import { RefObject } from "react";

beforeEach(() => {
  beforeMapTest();
});
afterEach(() => {
  cleanup();
});

describe("RMap", () => {
  test("if RMapProps cover all MapOptions", () => {
    assertType<
      Omit<
        MapOptions,
        | MapNonReactiveOptionName
        | MapHandlerOptionName
        | MapReactiveOptionName
        | "container"
        | "style"
      >
    >(Object);
  });

  test("Render identically than vanilla Maplibre", async ({ expect }) => {
    const { container } = render(
      <RMap mapStyle={emptyStyle} initialAttributionControl={false}></RMap>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="maplibregl-map"
          style="position: relative; width: 100%; height: 100%;"
        >
          <div
            class="maplibregl-canvas-container maplibregl-interactive maplibregl-touch-drag-pan maplibregl-touch-zoom-rotate"
          >
            <canvas
              aria-label="Map"
              class="maplibregl-canvas"
              height="300"
              role="region"
              style="width: 400px; height: 300px;"
              tabindex="0"
              width="400"
            />
          </div>
          <div
            class="maplibregl-control-container"
          >
            <div
              class="maplibregl-ctrl-top-left "
            />
            <div
              class="maplibregl-ctrl-top-right "
            />
            <div
              class="maplibregl-ctrl-bottom-left "
            />
            <div
              class="maplibregl-ctrl-bottom-right "
            />
          </div>
          <div
            class="maplibregl-children"
            style="height: 100%;"
          />
        </div>
      </div>
    `);
  });

  test("call onMounted only at the first render", async ({ expect }) => {
    const onMounted = vi.fn();
    const { rerender, unmount } = render(<RMap mapStyle={emptyStyle} onMounted={onMounted}></RMap>);
    rerender(<RMap mapStyle={emptyStyle} onMounted={onMounted}></RMap>);
    unmount();

    expect(onMounted).toBeCalledTimes(1);
  });

  test("RMap forward map ref", () => {
    const ref = { current: null };

    render(<RMap ref={ref} mapStyle={emptyStyle} />);

    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(Map);
  });

  test("RMap keep same reference between render", () => {
    const ref: RefObject<Map> = { current: null };
    const { rerender } = render(<RMap ref={ref} minZoom={10} />);

    const map1 = ref.current!;

    rerender(
      <RMap
        mapStyle={emptyStyle}
        styleDiffing={false}
        ref={ref}
        minZoom={11}
        maxZoom={13}
        pixelRatio={1}
      />,
    );

    const map2 = ref.current!;

    expect(map1).toBe(map2);
  });

  test("RMap update reactive options", () => {
    const ref: RefObject<Map> = { current: null };
    const { rerender } = render(
      <RMap mapStyle={emptyStyle} ref={ref} minZoom={10} maxZoom={14} pixelRatio={1} />,
    );

    const map = ref.current!;
    expect(map.getMinZoom()).toBe(10);
    expect(map.getMaxZoom()).toBe(14);

    rerender(<RMap ref={ref} minZoom={11} maxZoom={13} pixelRatio={1} />);

    expect(map.getMinZoom()).toBe(11);
    expect(map.getMaxZoom()).toBe(13);
  });

  test("RMap not updating initial options", () => {
    const ref: RefObject<Map> = { current: null };
    const { rerender } = render(<RMap mapStyle={emptyStyle} ref={ref} initialCenter={[1, 2]} />);
    const map = ref.current!;

    expect(map.getCenter()).toMatchObject({ lng: 1, lat: 2 });

    rerender(<RMap mapStyle={emptyStyle} ref={ref} initialCenter={[2, 3]} />);

    expect(map.getCenter()).toMatchObject({ lng: 1, lat: 2 });
  });

  test("RMap handle events", () => {
    const ref: RefObject<Map> = { current: null };
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const { rerender } = render(
      <RMap mapStyle={emptyStyle} ref={ref} initialCenter={[1, 1]} onMoveEnd={handler1} />,
    );
    const map = ref.current!;

    map.panBy([10, 10], {
      animate: false,
    });

    expect(handler1).toBeCalledTimes(1);

    rerender(<RMap mapStyle={emptyStyle} ref={ref} initialCenter={[1, 1]} onMoveEnd={handler2} />);

    map.panBy([10, 10], {
      animate: false,
    });

    /**
     * we expect that the first handler was not called and that it was the new
     * handler that was called
     */
    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(1);
  });

  test("RMap listen to mapStyle updates", async () => {
    const ref: RefObject<Map> = { current: null };
    const styleDataHandler = vi.fn();

    const style1: StyleSpecification = {
      version: 8,
      name: "style1",
      sources: {},
      layers: [],
    };
    const style2: StyleSpecification = {
      version: 8,
      name: "style2",
      sources: {},
      layers: [],
    };
    const style3: StyleSpecification = {
      version: 8,
      name: "style3",
      sources: {
        source: {
          type: "geojson",
          data: {
            type: "Point",
            coordinates: [0, 0],
          },
        },
      },
      layers: [],
    };
    const handler1 = vi.fn();
    handler1.mockReturnValue(style1);

    const handler2 = vi.fn();
    handler2.mockReturnValue(style2);

    const handler3 = vi.fn();
    handler3.mockReturnValue(style3);

    const { rerender } = render(
      <RMap
        mapStyle={style1}
        ref={ref}
        styleDiffing={false}
        styleTransformStyle={handler1}
        onStyleData={styleDataHandler}
      />,
    );
    await waitFor(() => {
      expect(styleDataHandler).toBeCalledTimes(1);
    });

    expect(handler1).toBeCalledTimes(0);

    rerender(
      <RMap
        mapStyle={style2}
        ref={ref}
        minZoom={3}
        styleDiffing={false}
        styleTransformStyle={handler2}
        onStyleData={styleDataHandler}
      />,
    );

    await waitFor(() => {
      expect(styleDataHandler).toBeCalledTimes(2);
    });
    expect(handler2).toBeCalledTimes(1);

    expect(handler2.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "layers": [],
          "name": "style1",
          "sources": {},
          "version": 8,
        },
        {
          "layers": [],
          "name": "style2",
          "sources": {},
          "terrain": undefined,
          "version": 8,
        },
      ]
    `);

    rerender(
      <RMap
        mapStyle={style3}
        ref={ref}
        minZoom={4}
        styleTransformStyle={handler3}
        onStyleData={styleDataHandler}
      />,
    );

    // /**
    //  * we expect that the first handler was not called and that it was the new handler that was called
    //  */
    await waitFor(() => {
      expect(styleDataHandler).toBeCalledTimes(3);
    });

    expect(handler2).toBeCalledTimes(1);
    expect(handler3).toBeCalledTimes(1);
    expect(handler3.mock.calls[0]).toMatchInlineSnapshot(`
      [
        {
          "layers": [],
          "name": "style2",
          "sources": {},
          "version": 8,
        },
        {
          "layers": [],
          "name": "style3",
          "sources": {
            "source": {
              "data": {
                "coordinates": [
                  0,
                  0,
                ],
                "type": "Point",
              },
              "type": "geojson",
            },
          },
          "terrain": undefined,
          "version": 8,
        },
      ]
    `);
  });
});
