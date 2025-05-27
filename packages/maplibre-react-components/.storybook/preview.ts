import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "./base.css";
import "./storybook.css";
import "../src/style/index.css";
import "maplibre-gl/dist/maplibre-gl.css";

// https://storybook.js.org/docs/react/configure/overview#configure-story-rendering
const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
