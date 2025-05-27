import { pentatrionTw } from "pentatrion-design/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,ts,tsx}",

    "./node_modules/pentatrion-design/components/**/*.js",
    "./node_modules/pentatrion-design/hooks/**/*.js",
    "./node_modules/pentatrion-design/redux/**/*.js",

    // "./node_modules/pentatrion-geo/api/**/*.{ts,tsx}",
    // "./node_modules/pentatrion-geo/components/**/*.{ts,tsx}",
    // "./node_modules/pentatrion-geo/geo-options/**/*.{ts,tsx}",
    // "./node_modules/pentatrion-geo/maplibre/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [pentatrionTw()],
};
