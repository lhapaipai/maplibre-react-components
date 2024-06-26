import { useContext, useEffect, useState } from "react";
import { mapLibreContext } from "../../context";
import { TerrainSpecification } from "maplibre-gl";

export type RTerrainProps = TerrainSpecification;

export const RTerrain = (props: RTerrainProps) => {
  const terrainOptions = props;

  const context = useContext(mapLibreContext);

  if (!context.mapManager) {
    throw new Error("use <RTerrain /> component inside <RMap />");
  }

  const map = context.mapManager.map;

  const prevOptions = context.mapManager.getControlledTerrain() ?? props;

  const [, setVersion] = useState(0);

  useEffect(() => {
    const reRender = () => void setVersion((v) => v + 1);

    if (map.style._loaded) {
      // in case layer is loaded between first render and useEffect call
      // like RSource
      reRender();
    }

    return () => {
      if (map.style?._loaded && map.getTerrain()) {
        map.setTerrain(null);
      }

      context.mapManager?.setControlledTerrain(null);
    };
  }, [map, context]);

  // when map not loaded getTerrain return null event if map style contain terrain
  // specification.
  const terrain = map.style?._loaded && map.getSource(terrainOptions.source) && map.getTerrain();

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
    } else {
      throw new Error(`Unable to find Terrain source ${terrainOptions.source}`);
    }
  }

  context.mapManager.setControlledTerrain(props);

  return null;
};
