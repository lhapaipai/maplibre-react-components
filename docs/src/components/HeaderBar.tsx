"use client";

import { Toggle } from "pentatrion-design/input";
import LinkButton from "./LinkButton";
import { useDarkMode } from "~/hooks/useDarkMode";
import MapLibreReactLogo from "./MapLibreReactLogo";
import Link from "next/link";
export default function HeaderBar() {
  const { isDarkMode, setDarkMode } = useDarkMode();
  return (
    <header className="flex h-12 items-center">
      <Link
        href="/"
        className="hover:text-gray-7 active:text-gray-6 [&:hover_.libre]:text-blue-4 ml-12 place-content-center transition-colors md:ml-0"
      >
        <span className="block md:hidden">
          <MapLibreReactLogo height={42} />
        </span>
        <span className="font-title text-body-2xl hidden md:block">
          <span>
            Map
            <span className="libre text-blue-3 transition-colors">Libre</span>
          </span>{" "}
          React <span className="text-body-xl">components</span>
        </span>
      </Link>
      <span className="ml-auto">
        <Toggle
          checked={isDarkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </span>
      <LinkButton
        variant="text"
        color="gray"
        icon
        size="large"
        href="https://github.com/lhapaipai/maplibre-react-components"
      >
        <i className="fe-github text-body-3xl"></i>
      </LinkButton>
    </header>
  );
}
