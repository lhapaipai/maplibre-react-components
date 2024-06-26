export const colors = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"];

export function createDonutChart(props: any) {
  const offsets = [];
  const counts = [props.mag1, props.mag2, props.mag3, props.mag4, props.mag5];
  let total = 0;
  for (let i = 0; i < counts.length; i++) {
    offsets.push(total);
    total += counts[i];
  }
  const fontSize =
    total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
  const r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
  const r0 = Math.round(r * 0.6);
  const w = r * 2;

  let html = `<div><svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif; display: block">`;

  for (let i = 0; i < counts.length; i++) {
    html += donutSegment(
      offsets[i] / total,
      (offsets[i] + counts[i]) / total,
      r,
      r0,
      colors[i],
    );
  }
  html += `<circle cx="${r}" cy="${r}" r="${r0}" fill="white" /><text dominant-baseline="central" transform="translate(${r}, ${r})">${total.toLocaleString()}</text></svg></div>`;

  const el = document.createElement("div");
  el.innerHTML = html;
  return el.firstChild as HTMLElement | undefined;
}

export function donutSegment(
  start: any,
  end: any,
  r: any,
  r0: any,
  color: any,
) {
  if (end - start === 1) end -= 0.00001;
  const a0 = 2 * Math.PI * (start - 0.25);
  const a1 = 2 * Math.PI * (end - 0.25);
  const x0 = Math.cos(a0),
    y0 = Math.sin(a0);
  const x1 = Math.cos(a1),
    y1 = Math.sin(a1);
  const largeArc = end - start > 0.5 ? 1 : 0;

  return [
    '<path d="M',
    r + r0 * x0,
    r + r0 * y0,
    "L",
    r + r * x0,
    r + r * y0,
    "A",
    r,
    r,
    0,
    largeArc,
    1,
    r + r * x1,
    r + r * y1,
    "L",
    r + r0 * x1,
    r + r0 * y1,
    "A",
    r0,
    r0,
    0,
    largeArc,
    0,
    r + r0 * x0,
    r + r0 * y0,
    `" fill="${color}" />`,
  ].join(" ");
}
