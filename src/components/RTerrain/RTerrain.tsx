import { useCallback, useEffect, useState } from "react";
import { TerrainSpecification } from "maplibre-gl";
import { useMapManager } from "../../hooks/useMapManager";

export type RTerrainProps = TerrainSpecification;

export const RTerrain = (props: RTerrainProps) => {
  const terrainOptions = props;

  const mapManager = useMapManager();

  const map = mapManager.map;

  const prevOptions = mapManager.getControlledTerrain() ?? props;

  const [, setVersion] = useState(0);
  const reRender = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    map.on("styledata", reRender);

    if (map.style._loaded) {
      // in case layer is loaded between first render and useEffect call
      // like RSource
      reRender();
    }

    return () => {
      map.off("styledata", reRender);

      if (map.style?._loaded && map.getTerrain()) {
        map.setTerrain(null);
      }

      mapManager?.setControlledTerrain(null);
    };
  }, [map, mapManager, reRender]);

  // when map not loaded getTerrain return null event if map style contain terrain
  // specification.
  const terrain =
    map.style?._loaded && (map.getSource(terrainOptions.source) ? map.getTerrain() : false);

  if (terrain) {
    if (
      prevOptions.exaggeration !== terrainOptions.exaggeration ||
      prevOptions.source !== terrainOptions.source
    ) {
      map.setTerrain(terrainOptions);
    }
  } else if (map.style?._loaded) {
    if (map.getSource(terrainOptions.source)) {
      map.setTerrain(terrainOptions);
      map.off("styledata", reRender);
    }
  }

  mapManager.setControlledTerrain(props);

  return null;
};
