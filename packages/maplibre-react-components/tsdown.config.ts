import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  format: ["esm", "cjs"],
  external: ["react", "react-dom", "maplibre-gl", "clsx"],
  shims: true,
});
