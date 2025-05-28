/**
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: "always",
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  useTabs: false,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
