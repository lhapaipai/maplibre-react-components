"use client";

import clsx from "clsx";
import { useEventListener } from "pentatrion-design/hooks";
import { CSSProperties, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const style: CSSProperties = {
  "--spotlight-color-stops": "#FFFAC7,#DBA726,transparent",
  "--spotlight-size": "300px",
};

export default function SpotCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null!);

  useEventListener("mousemove", (event) => {
    const { top, left } = ref.current.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-2xl transform-gpu overflow-hidden rounded-2xl bg-white/10 p-4 [--radius:theme(borderRadius.2xl)] before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]"
      style={style}
    >
      <div className="absolute inset-px rounded-2xl bg-gray-0"></div>
      <div
        className={clsx(
          "relative flex h-full items-center justify-center",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
