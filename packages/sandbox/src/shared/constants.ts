export const ignToken = import.meta.env.VITE_IGN_TOKEN as string;
export const ignTokenLegacy = import.meta.env.VITE_IGN_TOKEN_LEGACY as string;
export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN as string;
export const maptilerToken = import.meta.env.VITE_MAPTILER_TOKEN as string;
export const googleMapsApiToken = import.meta.env.VITE_GOOGLE_MAPS_API_TOKEN as string;

export const mapTilerBasicStyleUrl = `https://api.maptiler.com/maps/basic-v2/style.json?key=${maptilerToken}`;
export const mapTilerStreetsStyleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${maptilerToken}`;
export const ignPlanStyleUrl = `/assets/styles/ign/PLAN.IGN/standard.json`;

export const marignier = { lng: 6.498, lat: 46.089 };

// `https://data.geopf.fr/geocodage/search?q=${searchValue}&index=address&limit=10&returntruegeometry=true&lon=6.43&lat=46.08`,
// `http://localhost:8080/ors/geocode/search?text=${searchValue}&size=10&focus.point.lon=6.43&focus.point.lat=46.08&layers=locality,county,venue`,
