import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

// export type Equal<X, Y> =
//   (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

// export type Expect<T extends true> = T;
