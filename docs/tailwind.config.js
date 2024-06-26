import {
  pentatrionTw,
  pentatrionTypographyExtend,
} from "pentatrion-design/tailwind";
import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/pentatrion-design/lib/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/components/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/hooks/**/*.{ts,tsx}",
    "./node_modules/pentatrion-design/redux/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      title: ["var(--font-alata)", "ui-sans-serif", "system-ui", "sans-serif"],
      fontello: ["fontello"],
      serif: defaultTheme.fontFamily.serif,
      mono: defaultTheme.fontFamily.mono,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: [
            pentatrionTypographyExtend.DEFAULT.css,
            {
              /** floating-ui typo source-code
               * https://github.com/floating-ui/floating-ui/blob/master/website/tailwind.config.js
               */
              pre: {
                "@apply rounded-2xl shadow dark:shadow-dark px-0 py-4 text-sm relative":
                  {},
                "[data-line]": {
                  padding: "0 1rem",
                },
                "&::before": {
                  "@apply absolute top-1 right-3 text-gray-3 text-xs": {},
                  content: "attr(data-language)",
                },
              },
              code: {
                color: "rgb(var(--color-gray-text))",
                backgroundColor: "rgb(var(--color-gray-1))",
                borderRadius: "3px",
                padding: "3px 6px 0px",
              },
              "code::before": {
                content: "none",
              },
              "code::after": {
                content: "none",
              },
              ":is(.grid, .columns-2) figure[data-rehype-pretty-code-figure]": {
                marginTop: "0",
                marginBottom: "0",
              },
              ".maplibregl-map": {
                "@apply rounded-2xl shadow": {},
                a: {
                  fontWeight: "400",
                },
              },
              ".mdx-header i": {
                "@apply text-gray-5 transition-colors hover:text-gray-text invisible":
                  {},
              },
              ".mdx-header:hover i": {
                visibility: "visible",
              },
            },
          ],
        },
      },
    },
  },
  plugins: [
    pentatrionTw({
      vars: false,
    }),
    typography,
  ],
};
export default config;
