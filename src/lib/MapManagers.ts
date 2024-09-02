import { Dispatch, SetStateAction } from "react";
import { MapManager } from "./MapManager";

type MountedState = [boolean, Dispatch<SetStateAction<boolean>>];

export class MapManagers {
  private _maps: {
    [key: string]: MapManager;
  } = {};
  private _listeners: {
    [key: string]: MountedState[];
  } = {};

  add(id: string, mapManager: MapManager) {
    // console.log("MapManager add", id, mapManager);

    this._maps[id] = mapManager;
    this._listeners[id]?.forEach(([mounted, setMounted]) => {
      // console.log(mounted);
      if (!mounted) {
        setMounted(true);
      }
    });
  }

  remove(id: string) {
    // console.log("MapManager remove", id);

    delete this._maps[id];
    this._listeners[id]?.forEach(([mounted, setMounted]) => {
      if (mounted) {
        setMounted(false);
      }
    });
  }

  get(id: string | null) {
    if (!id) {
      return null;
    }
    return this._maps[id] ?? null;
  }
  addListener(id: string, mountedState: MountedState) {
    // console.log("MapManager addListener", id);

    if (this._listeners[id]) {
      this._listeners[id].push(mountedState);
    } else {
      this._listeners[id] = [mountedState];
    }

    const isMounted = !!this._maps[id] as boolean;
    if (mountedState[0] !== isMounted) {
      mountedState[1](isMounted);
    }
  }
  removeListener(id: string, [, callback]: MountedState) {
    this._listeners[id] = this._listeners[id].filter(([, cb]) => cb !== callback);
  }
}
