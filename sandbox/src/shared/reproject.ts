import proj4 from "proj4";

fetch("/data/utm.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(
      data.geometry.map((point: any) => {
        const lnglat = proj4("EPSG:3857", "EPSG:4326", [point.lon, point.lat]);

        return [...lnglat, point.y];
      }),
    );
  });
