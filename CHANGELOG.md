## v0.2.3

- RGradientMarker : add extra shapes

## v0.2.2

- migrate code base to React 19, tailwindcss 4
- RPopup : add initialLocationOccludedOpacity

## v0.2.1

- fix custom layer with false callback as option

## v0.2.0

- update to be compatible with MapLibre v5

## v0.1.10

- add React 19 as PeerDependency

## v0.1.9

- fix maplibre named export when library used with Astro

## v0.1.8

-  fix: check map.style before accessing properties #6 (@andrejilderda)

## v0.1.7

- new RMapContextProvider component
- new useMapManager hook
- update useMap hook
- RMarker/RGradientMarker add subpixelPositioning reactive option.

## v0.1.6

- RLayer fix removing listeners in cleanup function

## v0.1.5

- GradientMarker remove circle hover backgroundcolor with color-mix.
- GradientMarker text font-size enhancement

## v0.1.4

- Rename ContextMenuEventDispatcher to ContextMenuEventAdapter
- add possibility to prevent contextmenu to be fired.

## v0.1.3

- Remove floating-ui peerDependency
- GradientMarker add interactive/shape options.

- Doc : update RLayer MapLayerEvents
- Doc : fix issue with MapLibre theme icons

## v0.1.2

- RLayer MapLayerEvent implementation

## v0.1.1

- add non minified version

## v0.1.0

- Fix "map has not control" when RMap cleanup is called before useControl cleanup.
- add publish script
- Fix RGradientMarker duplicate circle in StrictMode
- Fix RTerrain error when defined before RSource.

## v0.0.7

- Fix RPopup : close button appear by default
