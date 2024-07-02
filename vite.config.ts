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
    setupFiles: [
      "vitest-webgl-canvas-mock",
      "./tests/vitest-setup.ts",
      "./tests/mocks/web-worker.ts",
    ],
    include: ["src/components/**/*.test.ts?(x)"],
  },
});
