import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm"],
  esbuildOptions(options) {
    options.external = ["react", "react-dom", "maplibre-gl", "clsx"];
  },
  shims: true,
});
