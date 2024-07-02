import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));

function examplePath(dirname: string) {
  return resolve(projectDir, "src", dirname, "index.html");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectDir, "index.html"),
        api01: examplePath("mr-api/01-use-map"),
        api02: examplePath("mr-api/02-highlight"),
        custom01: examplePath("mr-custom/01-my-marker"),
        custom02: examplePath("mr-custom/02-reactive-marker"),
        custom03: examplePath("mr-custom/03-context-handler"),
        custom04: examplePath("mr-custom/04-direction"),
        custom05: examplePath("mr-custom/05-draggable"),
        custom06: examplePath("mr-custom/06-layer-switcher"),
        custom07: examplePath("mr-custom/07-layer-switcher-advanced"),
        custom08: examplePath("mr-custom/08-notifications"),
        own00: examplePath("mr-own/00"),
        own01: examplePath("mr-own/01-map"),
        own02: examplePath("mr-own/02-rmap"),
        own03: examplePath("mr-own/03-rsource-geojson"),
        own04: examplePath("mr-own/04-rsource-image-video"),
        own05: examplePath("mr-own/05-rsource-raster"),
        own06: examplePath("mr-own/06-use-rcontrol"),
        own07: examplePath("mr-own/07-rterrain"),
        own08: examplePath("mr-own/08-pegman-llmarker"),
        own09: examplePath("mr-own/09-delimiter"),
        own10: examplePath("mr-own/10-streetview-only"),
        own11: examplePath("mr-own/11-streetview-vanilla"),
        own12: examplePath("mr-own/12-streetview-gmanager"),
        own13: examplePath("mr-own/13-fps"),

        // "01-cluster": resolve(__dirname, "examples/01-cluster.html"),
        // "02-cluster-div": resolve(__dirname, "examples/02-cluster-div.html"),
        // "03-popup": resolve(__dirname, "examples/03-popup.html"),
        // "04-satellite": resolve(__dirname, "examples/04-satellite.html"),
        // "05-draw": resolve(__dirname, "examples/05-draw.html"),
        // "06-icons": resolve(__dirname, "examples/06-icons.html"),
        // "07-change-layer-color": resolve(__dirname, "examples/07-change-layer-color.html"),
        // "08-inspect": resolve(__dirname, "examples/08-inspect.html"),
        // "09-toggle-style": resolve(__dirname, "examples/09-toggle-style.html"),
        // "10-my-popup": resolve(__dirname, "examples/10-my-popup.html"),
        // "11-update-path": resolve(__dirname, "examples/11-update-path.html"),
      },
    },
  },
  resolve: {
    alias: {
      "~": resolve(projectDir, "src"),
    },
  },
});
