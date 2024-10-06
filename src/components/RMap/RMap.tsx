"use client";

import type { Map } from "maplibre-gl";

import {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { MapManager, type ManagerOptions, type MapProps } from "../../lib/MapManager";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import { uniqueId } from "../../lib";
import { RMapContext } from "../../contexts/RMapContextProvider";
import { CurrentMapIdContext } from "../../contexts/CurrentMapIdContext";
import { MapManagers } from "../../lib/MapManagers";

type RMapComponentProps = {
  children?: ReactNode;
  style?: CSSProperties;
  id?: string;
  className?: string;
  onMounted?: (map: Map) => void;
};

export type RMapProps = MapProps & ManagerOptions & RMapComponentProps;

const childContainerStyle = {
  height: "100%",
};

export const RMap = forwardRef<Map | null, RMapProps>(function RMap(
  {
    /* RMapProps */
    children,
    style,
    id: propsId,
    className,
    onMounted,

    /* ManagerOptions */
    mapStyle,
    styleDiffing,
    styleTransformStyle,
    padding,

    /* MapProps */
    ...mapProps
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null!);

  const needPropsUpdate = useRef(true);

  const idRef = useRef(propsId ?? uniqueId());
  if (propsId && propsId !== idRef.current) {
    throw new Error(
      `RMap id should not change. "${propsId}" "${idRef.current}". If you defined id as const string add a "key" prop to your RMap component`,
    );
  }
  const id = idRef.current;

  const externalMapManagersRef = useContext(RMapContext);
  const localMapManagersRef = useRef<MapManagers>();

  if (!externalMapManagersRef && !localMapManagersRef.current) {
    localMapManagersRef.current = new MapManagers();
  }

  const mapManagers = (
    externalMapManagersRef ? externalMapManagersRef.current : localMapManagersRef.current
  ) as MapManagers;

  const [, reRender] = useState(0);

  /**
   * we need to init mapManager before useImperativeHandle call
   * so necessary inside useLayoutEffect
   * (useLayoutEffect and useImperativeHandle are called in same priority)
   * parent component will have access to reference in useLayoutEffect / useEffect hooks
   */
  useIsomorphicLayoutEffect(() => {
    const mapManager = mapManagers.get(id);
    if (!mapManager) {
      const instance = new MapManager(
        { mapStyle, styleDiffing, padding },
        mapProps,
        containerRef.current,
      );
      mapManagers.add(id, instance);

      onMounted && onMounted(instance.map);
      reRender((v) => v + 1);
      needPropsUpdate.current = false;
    } else {
      if (needPropsUpdate.current) {
        mapManager.setProps({ mapStyle, padding, styleDiffing, styleTransformStyle }, mapProps);
      } else {
        needPropsUpdate.current = true;
      }
    }
  });

  useIsomorphicLayoutEffect(() => {
    return () => {
      const mapManager = mapManagers.get(id);
      if (mapManager) {
        mapManager.destroy();
        mapManagers.remove(id);
      }
    };
  }, []);

  // @ts-ignore
  useImperativeHandle(ref, () => mapManagers.get(id)?.map || null, [id, mapManagers]);

  /**
   * container class attribute must not be controlled by React
   * - maplibre GL add : maplibregl-map
   * - other plugins can add classes dynamically
   */
  useIsomorphicLayoutEffect(() => {
    if (!className) {
      return;
    }
    const container = containerRef.current;
    className.split(" ").map((classItem) => container.classList.add(classItem));

    return () =>
      void className.split(" ").map((classItem) => container.classList.remove(classItem));
  }, [className]);

  const completeStyle: CSSProperties = useMemo(
    () => ({
      position: "relative",
      width: "100%",
      height: "100%",
      ...style,
    }),
    [style],
  );

  return (
    <div ref={containerRef} id={id} style={completeStyle}>
      {mapManagers.get(id) && (
        <CurrentMapIdContext.Provider value={id}>
          {externalMapManagersRef ? (
            <div className="maplibregl-children" style={childContainerStyle}>
              {children}
            </div>
          ) : (
            <RMapContext.Provider value={localMapManagersRef as MutableRefObject<MapManagers>}>
              <div className="maplibregl-children" style={childContainerStyle}>
                {children}
              </div>
            </RMapContext.Provider>
          )}
        </CurrentMapIdContext.Provider>
      )}
    </div>
  );
});
