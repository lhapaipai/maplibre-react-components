"use client";

import { useEffect, useState } from "react";
import style from "./LandingBackground.module.css";
import clsx from "clsx";

function jumpVal(val: number) {
  return Math.random() > 0.5 ? val + (Math.random() - 0.5) / 2 : Math.random();
}

export default function LandingBackground() {
  /**
   * Predictive values (!= random) to be consistent for SSR and hydration
   */
  const [points, setPoints] = useState<[number, number][]>([
    [0.201, 0.978],
    [0.861, 0.931],
    [0.242, 0.394],
    [0.027, 0.717],
    [0.101, 0.845],
    [0.422, 0.621],
    [0.001, 0.211],
    [0.145, 0.722],
    [0.719, 0.135],
    [0.453, 0.378],
    [0.711, 0.652],
    [0.373, 0.345],
    [0.409, 0.577],
    [0.416, 0.144],
    [0.834, 0.612],
    [0.072, 0.472],
  ]);
  const poly = points.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(", ");

  useEffect(() => {
    let timeout: number;
    function jumpPoints() {
      setPoints((pts) => pts.map(([x, y]) => [jumpVal(x), jumpVal(y)]));
      timeout = window.setTimeout(jumpPoints, 2000 + Math.random() * 1000);
    }
    jumpPoints();
    return () => void window.clearTimeout(timeout);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        className={clsx(
          "aspect-[1.7] h-full w-full bg-gradient-to-r from-yellow-4 to-white/10 dark:opacity-50 dark:lg:opacity-30",
          style.cloud,
        )}
        style={{ clipPath: `polygon(${poly})` }}
      />
    </div>
  );
}
