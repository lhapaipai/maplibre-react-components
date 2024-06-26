import { CSSProperties } from "react";
const unitlessNumber =
  /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;

export function applyReactStyle(element: HTMLElement, styles: CSSProperties) {
  if (!element || !styles) {
    return;
  }

  const style = element.style;

  for (const key in styles) {
    // @ts-ignore
    const value = styles[key];
    if (Number.isFinite(value) && !unitlessNumber.test(key)) {
      // @ts-ignore
      style[key] = `${value}px`;
    } else {
      // @ts-ignore
      style[key] = value;
    }
  }
}
