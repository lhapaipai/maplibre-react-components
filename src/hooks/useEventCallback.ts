import { useCallback, useRef } from "react";

export function useEventCallback<Args extends unknown[], R>(
  callback: ((...args: Args) => R) | null,
) {
  const ref = useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  ref.current = callback;

  return useCallback((...args: Args) => ref.current?.(...args), [ref]);
}
