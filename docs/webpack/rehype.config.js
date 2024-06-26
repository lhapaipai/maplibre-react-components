/** @type {import('rehype-pretty-code').Options} */
export const rehypePrettyCodeOptions = {
  // theme is singular (not themes) from shiki default config
  theme: {
    // same as apps/mrc-doc/webpack/shikiLoader.js
    light: "github-light-default",
    dark: "github-dark-default",
  },
};
