export function extend<T extends {}, U>(dest: T, source: U): T & U;
export function extend<T extends {}, U, V>(dest: T, source1: U, source2: V): T & U & V;
export function extend<T extends {}, U, V, W>(
  dest: T,
  source1: U,
  source2: V,
  source3: W,
): T & U & V & W;
export function extend(dest: object, ...sources: Array<any>): any;
export function extend(dest: object, ...sources: Array<any>): any {
  for (const src of sources) {
    for (const k in src) {
      // @ts-ignore
      dest[k] = src[k];
    }
  }
  return dest;
}
