import { FillLayerSpecification, CustomLayerInterface, Map, LayerSpecification } from "maplibre-gl";
import {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { mapLibreContext } from "../../context";

export type LayerOptions = LayerSpecification | CustomLayerInterface;

export type RLayerProps = LayerOptions & {
  beforeId?: string;
};

/**
 * -> TODO failed to build
 * type StyleLayer = Exclude<ReturnType<Map["getLayer"]>, undefined>;
 * The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 */
export type StyleLayer = unknown;

function createLayer(map: Map, layerOptions: LayerOptions, beforeId?: string) {
  // layer can't be added if style is not loaded
  if (map.style?._loaded) {
    if (
      // BackgroundLayerSpecification and CustomLayerInterface has no source
      layerOptions.type === "background" ||
      layerOptions.type === "custom" ||
      // source exists for LayerSpecification who need one
      (layerOptions.source && map.getSource(layerOptions.source))
    ) {
      map.addLayer(layerOptions, beforeId && map.getLayer(beforeId) ? beforeId : undefined);

      return map.getLayer(layerOptions.id);
    }
  }

  return undefined;
}

function updateLayer(
  map: Map,
  { beforeId: nextBeforeId, ...nextOptions }: RLayerProps,
  { beforeId: prevBeforeId, ...prevOptions }: RLayerProps,
) {
  // double check only for TypeScript narrowing
  if (prevOptions.type === "custom" || nextOptions.type === "custom") {
    return;
  }

  if (prevBeforeId !== nextBeforeId) {
    map.moveLayer(nextOptions.id, nextBeforeId);
  }

  /**
   * we take random LayerSpecification to simulate same specification.
   * here FillLayerSpecification
   */

  // type is not "background" nor "custom", he has a filter property
  if (
    nextOptions.type !== "background" &&
    (nextOptions as unknown as CustomLayerInterface).type !== "custom" &&
    (prevOptions as FillLayerSpecification).filter !==
      (nextOptions as FillLayerSpecification).filter
  ) {
    map.setFilter(nextOptions.id, (nextOptions as FillLayerSpecification).filter);
  }

  const prevO = prevOptions as FillLayerSpecification;
  const nextO = nextOptions as FillLayerSpecification;

  if (prevO.layout !== nextO.layout) {
    if (nextO.layout) {
      for (const key of Object.keys(nextO.layout) as (keyof Exclude<
        FillLayerSpecification["layout"],
        undefined
      >)[]) {
        if (nextO.layout[key] !== prevO.layout?.[key]) {
          map.setLayoutProperty(nextOptions.id, key, nextO.layout[key]);
        }
      }
    }

    for (const key in prevO.layout) {
      if (!Object.prototype.hasOwnProperty.call(nextO.layout, key)) {
        map.setLayoutProperty(nextOptions.id, key, undefined);
      }
    }
  }

  if (prevO.paint !== nextO.paint) {
    if (nextO.paint) {
      for (const key of Object.keys(nextO.paint) as (keyof Exclude<
        FillLayerSpecification["paint"],
        undefined
      >)[]) {
        if (nextO.paint[key] !== prevO.paint?.[key]) {
          map.setPaintProperty(nextOptions.id, key, nextO.paint[key]);
        }
      }
    }
    for (const key in prevO.paint) {
      if (!Object.prototype.hasOwnProperty.call(nextO.paint, key)) {
        map.setPaintProperty(nextOptions.id, key, undefined);
      }
    }
  }

  if (prevO.minzoom !== nextO.minzoom || prevO.maxzoom !== nextO.maxzoom) {
    if (nextO.minzoom && nextO.maxzoom) {
      map.setLayerZoomRange(nextOptions.id, nextO.minzoom, nextO.maxzoom);
    }
  }
}

export const RLayer = memo(
  forwardRef<StyleLayer | null, RLayerProps>(function RLayer(props, ref) {
    const { beforeId, ...layerOptions } = props;
    const id = layerOptions.id;

    const context = useContext(mapLibreContext);

    if (!context.mapManager) {
      throw new Error("use <RLayer /> component inside <RMap />");
    }

    const map = context.mapManager.map;

    const initialLayerId = useRef(id);

    if (id !== initialLayerId.current) {
      throw new Error(
        `RLayer id should not change. "${id}" "${initialLayerId.current}". If you defined id as const string add a "key" prop to your RLayer component`,
      );
    }

    const prevProps = context.mapManager.getControlledLayer(id) ?? props;

    const [, setVersion] = useState(0);
    const reRender = useCallback(() => setVersion((v) => v + 1), []);

    if (props.type !== prevProps.type) {
      throw new Error(`RLayer type should not change. "${props.type}" "${prevProps.type}"`);
    }

    useEffect(() => {
      map.on("styledata", reRender);

      if (map.style._loaded) {
        // in case layer is loaded between first render and useEffect call
        // like RSource
        reRender();
      }

      return () => {
        map.off("styledata", reRender);

        if (map.style && map.style._loaded && map.getLayer(id)) {
          map.removeLayer(id);
        }

        context.mapManager?.setControlledLayer(id, null);
      };
    }, [map, id, context, reRender]);

    let layer = map.style?._loaded && map.getLayer(id);

    if (layer) {
      updateLayer(map, props, prevProps);
    } else {
      layer = createLayer(map, layerOptions, beforeId);
      if (layer) {
        map.off("styledata", reRender);
      }
    }

    useImperativeHandle(ref, () => layer || null, [layer]);

    context.mapManager.setControlledLayer(id, props);

    return null;
  }),
);
