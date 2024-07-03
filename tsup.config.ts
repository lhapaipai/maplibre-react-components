import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts", "src/components/RFloatingPopup/index.ts"],
    dts: true,
    format: ["esm"],
    esbuildOptions(options) {
      options.external = ["react", "react-dom", "maplibre-gl", "@floating-ui/dom", "clsx"];
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
