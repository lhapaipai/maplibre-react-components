import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { beforeMapTest } from "~tests/map-util";
import { emptyStyle } from "~/lib/util";
import { RMap } from "~/components";
import { useMap } from "~/hooks";
import { Map } from "maplibre-gl";
import { RMapContextProvider } from "./RMapContextProvider";
import { ReactNode } from "react";

beforeEach(() => {
  beforeMapTest();
});
afterEach(() => {
  cleanup();
});

describe("RMapContextProvider", () => {
  test("map available outside <RMap />", async ({ expect }) => {
    let map: Map | null = null;

    function App() {
      map = useMap("my-map");
      return <RMap id="my-map" mapStyle={emptyStyle}></RMap>;
    }

    render(
      <RMapContextProvider>
        <App />
      </RMapContextProvider>,
    );

    await waitFor(() => {
      expect(map).not.toBe(null);
    });
  });

  test("App rerender when map state change", async ({ expect }) => {
    let map: Map | null = null;

    function App({ children }: { children?: ReactNode }) {
      map = useMap("my-map");
      return children;
    }

    function MyMap() {
      return <RMap id="my-map" mapStyle={emptyStyle}></RMap>;
    }

    const { rerender } = render(
      <RMapContextProvider>
        <App />
      </RMapContextProvider>,
    );

    expect(map).toBe(null);

    rerender(
      <RMapContextProvider>
        <App>
          <MyMap />
        </App>
      </RMapContextProvider>,
    );

    await waitFor(() => {
      expect(map).not.toBe(null);
    });

    rerender(
      <RMapContextProvider>
        <App />
      </RMapContextProvider>,
    );

    await waitFor(() => {
      expect(map).toBe(null);
    });
  });
});
