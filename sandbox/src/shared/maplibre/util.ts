/**
 * Given a destination object and optionally many source objects,
 * copy all properties from the source objects into the destination.
 * The last source object given overrides properties from previous
 * source objects.
 *
 * @param dest - destination object
 * @param sources - sources from which properties are pulled
 */
export function extend<T extends {}, U>(dest: T, source: U): T & U;
export function extend<T extends {}, U, V>(
  dest: T,
  source1: U,
  source2: V,
): T & U & V;
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

/**
 * Print a warning message to the console and ensure duplicate warning messages
 * are not printed.
 */
const warnOnceHistory: { [key: string]: boolean } = {};

export function warnOnce(message: string): void {
  if (!warnOnceHistory[message]) {
    // console isn't defined in some WebWorkers, see #2558
    if (typeof console !== "undefined") console.warn(message);
    warnOnceHistory[message] = true;
  }
}
