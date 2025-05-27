import { defineConfig } from "pentatrion-fontello-cli";

export default defineConfig([
  {
    fontFamily: "fontello-mrc",
    base: "src/style/font",
  },
  {
    fontFamily: "storybook",
    base: ".storybook/icons",
  },
]);
