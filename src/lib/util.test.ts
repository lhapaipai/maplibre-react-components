import { describe, expect, test, vi } from "vitest";
import {
  areCoordsClose,
  areLngLatClose,
  arePointsEqual,
  deepEqual,
  filterMapProps,
  prepareEventDep,
  transformPropsToOptions,
  updateClassNames,
  updateListeners,
} from "./util";
import { type MapProps } from "./MapManager";

describe("util", () => {
  test("filterMapProps", () => {
    const callback = () => {};
    const mapProps: MapProps = {
      onClick: callback,
      onData: callback,
      minZoom: 10,
      maxZoom: 13,
      initialCenter: [0, 0],
      initialBearing: 0,
      dragPan: false,
      dragRotate: true,
    };

    const [reactiveOptions, callbacks, handlerOptions] = filterMapProps(mapProps);

    expect(reactiveOptions).toMatchObject({
      minZoom: 10,
      maxZoom: 13,
    });
    expect(callbacks).toMatchObject({
      onClick: callback,
      onData: callback,
    });
    expect(handlerOptions).toMatchObject({
      dragPan: false,
      dragRotate: true,
    });
  });

  test("filterMapProps#unknown options", () => {
    expect(() =>
      filterMapProps({
        // @ts-ignore
        unknownOption: "hello",
      }),
    ).toThrowError(/unknown map option/);
  });

  test("transformPropsToOptions", () => {
    const callback = () => {};

    const props: {
      [k: string]: unknown;
    } = {
      initialFoo: "Foo",
      initialBar: "Bar",
      hello: "world",
      map: "libre",
      onClick: callback,
      onLoad: callback,
    };

    const [options, callbacks] = transformPropsToOptions(props);

    expect(options).toMatchObject({
      foo: "Foo",
      bar: "Bar",
      hello: "world",
      map: "libre",
    });

    expect(callbacks).toMatchObject({
      onClick: callback,
      onLoad: callback,
    });
  });

  test("transformPropsToOptions#duplicateOptions", () => {
    const props: {
      [k: string]: unknown;
    } = {
      initialFoo: "Foo",
      foo: "Bar",
    };

    expect(() => transformPropsToOptions(props)).toThrowError(/duplicate key foo/);
  });

  test("prepareEventDep : filter and sort", () => {
    const callback = () => {};
    const eventNameToCallbackName = {
      click: "onClick",
      dblclick: "onDblclick",
      open: "onOpen",
      load: "onLoad",
    };
    const callbacks = {
      onLoad: callback,
      onDblclick: callback,
      onUnknown: callback,
    };
    const events = prepareEventDep(eventNameToCallbackName, callbacks);

    expect(events).toMatchObject(["dblclick", "load"]);
  });

  test.each([
    [0, 0, true],
    [0, 1, false],
    [1, 1, true],
    [1, 2, false],
    [false, false, true],
    [false, true, false],
    ["", "", true],
    ["false", "false", true],
    ["hello", "world", false],
    [1.2, 1.2, true],
    [[], [], true],
    [[1], [1], true],
    [[1], [2], false],
    [{}, {}, true],
    [{}, true, false],
    [{ foo: "foo" }, { foo: "foo" }, true],
    [{ foo: "foo" }, { bar: "bar" }, false],
    [{ foo: "foo" }, { foo: "foo", bar: "bar" }, false],
    [{ foo: "foo", bar: "bar" }, { foo: "foo" }, false],
  ])("deepEqual `%s` `%s` -> %s", (a, b, expectedResult) => {
    expect(deepEqual(a, b)).toEqual(expectedResult);
  });

  const coordsProvider = [
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 7, lat: 5 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6.1, lat: 5 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6.01, lat: 5 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6.001, lat: 5 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6.0001, lat: 5 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6.00001, lat: 5 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6.000001, lat: 5 }, expectedResult: true },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6, lat: 4 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6, lat: 4.9 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6, lat: 4.99 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6, lat: 4.999 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6, lat: 4.9999 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6, lat: 4.99999 }, expectedResult: false },
    { lngLat1: { lng: 6, lat: 5 }, lngLat2: { lng: 6, lat: 4.999999 }, expectedResult: true },
  ];

  test.each(coordsProvider)(
    "areLngLatClose `%s` `%s` -> %s",
    ({ lngLat1, lngLat2, expectedResult }) => {
      expect(areLngLatClose(lngLat1, lngLat2)).toBe(expectedResult);
    },
  );

  test.each(coordsProvider)(
    "areCoordsClose `%s` `%s` -> %s",
    ({ lngLat1, lngLat2, expectedResult }) => {
      expect(
        areCoordsClose({ lon: lngLat1.lng, lat: lngLat1.lat }, [lngLat2.lng, lngLat2.lat]),
      ).toBe(expectedResult);
    },
  );

  test.each([
    { point1: [10, 10], point2: [10, 10], expectedResult: true },
    { point1: { x: 10, y: 10 }, point2: [10, 10], expectedResult: true },
    { point1: [10, 10], point2: { x: 10, y: 10 }, expectedResult: true },
    { point1: [10, 10], point2: [10.1, 10], expectedResult: false },
  ])("arePointsEqual(%s, %s) -> %s", ({ point1, point2, expectedResult }) => {
    // @ts-ignore
    expect(arePointsEqual(point1, point2)).toBe(expectedResult);
  });

  test("updateClassNames#basic", () => {
    const div = document.createElement("div");

    updateClassNames(div, [], ["class-1", "class-2"]);
    expect(div.className).toBe("class-1 class-2");

    updateClassNames(div, ["class-1", "class-2"], ["class-1"]);
    expect(div.className).toBe("class-1");
  });

  test("updateClassNames : do not modify a class that is not referenced", () => {
    const div = document.createElement("div");
    div.className = "base";

    updateClassNames(div, [], ["class-1", "class-2"]);
    expect(div.className).toBe("base class-1 class-2");

    updateClassNames(div, ["class-1", "class-2"], ["class-1"]);
    expect(div.className).toBe("base class-1");
  });

  test("updateClassNames : does not throw an error if a class should be referenced but does not exist", () => {
    const div1 = document.createElement("div");
    div1.className = "base";
    updateClassNames(div1, ["class-1"], ["class-2"]);
    expect(div1.className).toBe("base class-2");
  });

  test("updateClassNames : if a class should be referenced but does not exist, add it", () => {
    const div2 = document.createElement("div");
    div2.className = "base";
    // add class-1 if not present
    updateClassNames(div2, ["class-1"], ["class-1", "class-2"]);
    expect(div2.className).toBe("base class-1 class-2");
  });

  test("updateClassNames : don't add a duplicate class", () => {
    const div3 = document.createElement("div");
    div3.className = "base";
    // avoid duplicate classes
    updateClassNames(div3, ["class-1"], ["class-1", "class-1"]);
    expect(div3.className).toBe("base class-1");
  });

  test("updateClassNames : ignores a class that is supposed to exist and should be removed", () => {
    const div4 = document.createElement("div");
    div4.className = "base";
    updateClassNames(div4, ["class-1"], ["class-2"]);
    expect(div4.className).toBe("base class-2");
  });

  test("updateListeners : basic 1", () => {
    const onSubscribe = vi.fn();
    const onUnsubscribe = vi.fn();

    updateListeners([], ["click", "load"], onSubscribe, onUnsubscribe);

    expect(onSubscribe).toBeCalledTimes(2);
    expect(onUnsubscribe).toBeCalledTimes(0);
    expect(onSubscribe).toHaveBeenNthCalledWith(1, "click");
    expect(onSubscribe).toHaveBeenNthCalledWith(2, "load");
  });

  test("updateListeners : basic 2", () => {
    const onSubscribe = vi.fn();
    const onUnsubscribe = vi.fn();

    updateListeners(["click", "hover"], ["click", "load"], onSubscribe, onUnsubscribe);

    expect(onSubscribe).toBeCalledTimes(1);
    expect(onUnsubscribe).toBeCalledTimes(1);
    expect(onSubscribe).toHaveBeenNthCalledWith(1, "load");
    expect(onUnsubscribe).toHaveBeenNthCalledWith(1, "hover");
  });
});
