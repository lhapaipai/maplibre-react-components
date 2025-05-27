import { create } from "@storybook/theming/create";

// complete options
// https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart
export default create({
  base: 'light',
  colorPrimary: '#dba726',
  colorSecondary: '#dba726',

  appBorderRadius: 6,
  brandTitle: 'LonLat',
  brandImage: '/logo.svg',
  brandUrl: '/'
})
