import { ControlPosition, IControl, Map } from "maplibre-gl";

export class CustomControl implements IControl {
  declare _map: Map;
  declare _container: HTMLDivElement;

  getDefaultPosition(): ControlPosition {
    return "top-right";
  }

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.classList.add(
      "maplibregl-ctrl",
      "maplibregl-ctrl-group",
      "bg-gray-0",
      "p-4",
    );
    this._container.innerText = "Custom control";
    this._container.style.display = "block";

    return this._container;
  }

  onRemove() {
    this._container.remove();
  }
}
