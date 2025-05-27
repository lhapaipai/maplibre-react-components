import { IControl, Map } from "maplibre-gl";
import { useControl } from "maplibre-react-components";
import { GeolocateControl } from "./GeolocateControl";

// class MyControl implements IControl {
//   declare _container: HTMLDivElement;

//   constructor() {
//     console.log("MyControl instanciation");
//   }

//   onAdd(map: Map): HTMLElement {
//     this._container = document.createElement("div");
//     this._container.innerHTML = "Coucou !" + Math.random().toString();

//     return this._container;
//   }

//   onRemove(map: Map): void {
//     console.log("Remove !!");

//     // this._container.remove();
//   }
// }

export default function RControl() {
  const control = useControl({
    position: "top-right",
    factory: () => new GeolocateControl({}),
  });
  return null;
}
