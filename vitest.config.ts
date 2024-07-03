import { defineConfig } from "vitest/config";

import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const projectDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(projectDir, "src"),
      "~tests": resolve(projectDir, "tests"),
    },
  },
  test: {
    environment: "jsdom",
    // slow but no canvas getContext error...
    // https://github.com/vitest-dev/vitest/issues/740
    minWorkers: 1,
    maxWorkers: 1,
    setupFiles: ["vitest-webgl-canvas-mock", "./tests/setup/dom.ts", "./tests/setup/web-worker.ts"],
    include: ["src/components/**/*.test.ts?(x)"],
  },
});
