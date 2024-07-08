import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts"],
    dts: true,
    format: ["esm"],
    esbuildOptions(options) {
      options.external = ["react", "react-dom", "maplibre-gl", "clsx"];
    },
    outExtension: () => {
      return {
        js: options.minify ? ".min.js" : ".js",
      };
    },
    shims: true,

    // only in the first phase of the build step
    clean: Boolean(options.env?.TSUP_CLEAN_DIST ?? false),
  };
});
