import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import { FloatingPopup } from "./FloatingPopup";

const meta = {
  title: "pentatrion-geo/MapLibre/LLPopup",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

export const Basic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibre.Map({
      container: containerRef.current!,
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [5, 45],
      zoom: 4,
    });

    new FloatingPopup({
      closeButton: true,
      closeOnClick: false,
      closeOnMove: false,
      maxWidth: "300px",
    })
      .setLngLat([-1.1344, 44.698])
      .setHTML("Hello world", "Bassin d'arcachon")
      .addTo(map);

    new FloatingPopup({
      closeButton: false,
      closeOnClick: true,
      closeOnMove: false,
      maxWidth: "300px",
    })
      .setLngLat([15.1344, 39])
      .setHTML(
        "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
      )
      .addTo(map);
  }, []);
  return <div ref={containerRef} style={{ height: "100vh" }}></div>;
};

export const TrackPointer = () => {
  useEffect(() => {
    document.body.classList.remove("sb-main-padded");
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibre.Map({
      container: containerRef.current!,
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [5, 45],
      zoom: 4,
    });

    new FloatingPopup({
      closeButton: false,
      closeOnClick: false,
    })
      .setHTML("<div>Hello world</div>")
      .trackPointer()
      .addTo(map);
  }, []);
  return <div ref={containerRef} style={{ height: "100vh" }}></div>;
};
