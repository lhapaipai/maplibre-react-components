"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FloatingOverlay } from "@floating-ui/react";
import { Button } from "pentatrion-design/button";
import MapLibreReactLogo from "./MapLibreReactLogo";
import LinkButton from "./LinkButton";

interface NavLink {
  title: string;
  url?: string;
  children?: NavLink[];
}

const links: NavLink[] = [
  {
    title: "Guide",
    children: [
      {
        url: "/getting-started",
        title: "Getting Started",
      },
      {
        url: "/tutorial",
        title: "Tutorial",
      },
    ],
  },
  {
    title: "Components",
    children: [
      {
        url: "/components/rcontrols",
        title: "RControls",
      },
      {
        url: "/components/rgradient-marker",
        title: "RGradientMarker",
      },

      {
        url: "/components/rlayer",
        title: "RLayer",
      },
      {
        url: "/components/rmap",
        title: "RMap",
      },
      {
        url: "/components/rmap-contextprovider",
        title: "RMapContextProvider",
      },
      {
        url: "/components/rmarker",
        title: "RMarker",
      },
      {
        url: "/components/rpopup",
        title: "RPopup",
      },
      {
        url: "/components/rsource",
        title: "RSource",
      },
      {
        url: "/components/rterrain",
        title: "RTerrain",
      },
    ],
  },
  {
    title: "Hooks",
    children: [
      {
        url: "/hooks/usercontrol",
        title: "useRControl",
      },
      {
        url: "/hooks/usecontrol",
        title: "useControl",
      },
      {
        url: "/hooks/usemap",
        title: "useMap",
      },
      {
        url: "/hooks/usemapmanager",
        title: "useMapManager",
      },
    ],
  },
  {
    title: "Extra",
    children: [
      {
        url: "/extra/tips",
        title: "Tips",
      },
      {
        url: "/extra/compatibility",
        title: "Compatibility",
      },
    ],
  },
];

export default function NavBar() {
  const [showNavBar, setShowNavBar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowNavBar(false);
  }, [pathname]);

  return (
    <>
      <div className="absolute top-0 left-0 z-10 md:hidden">
        <Button
          icon
          onClick={() => setShowNavBar((s) => !s)}
          color="gray"
          variant="text"
          size="large"
        >
          <i className="fe-menu"></i>
        </Button>
      </div>
      <FloatingOverlay
        className={clsx("z-20 md:hidden", !showNavBar && "hidden")}
        onClick={() => {
          console.log("click floating overlay");
          setShowNavBar(false);
        }}
      />
      <div
        className={clsx(
          "bg-gray-0 dark:shadow-dark fixed top-0 left-0 z-30 h-screen w-64 max-w-full flex-none overflow-x-hidden overflow-y-auto px-4 shadow md:flex md:flex-col md:bg-transparent md:shadow-none md:dark:shadow-none",
          !showNavBar && "hidden",
        )}
      >
        <div className="absolute top-0 right-0 md:hidden">
          <Button
            icon
            onClick={() => setShowNavBar(false)}
            color="gray"
            variant="text"
            size="large"
          >
            <i className="fe-cancel"></i>
          </Button>
        </div>

        <nav className="flex flex-col gap-1">
          <Link
            href="/"
            className="hover:text-gray-7 active:text-gray-6 mb-4 grid min-h-32 place-content-center transition-colors"
          >
            <MapLibreReactLogo height={100} />
          </Link>
          {links.map(({ url, title, children }) =>
            children ? (
              <div key={title}>
                <h3 className="mt-4 px-4 font-bold">{title}</h3>
                <div className="flex flex-col gap-1">
                  {children.map(
                    ({ url, title }) =>
                      url && (
                        <LinkButton
                          key={url}
                          selected={pathname === url}
                          width="full"
                          variant="text"
                          color="gray"
                          href={url}
                        >
                          {title}
                        </LinkButton>
                      ),
                  )}
                </div>
              </div>
            ) : (
              url && (
                <LinkButton
                  key={url}
                  selected={pathname === url}
                  width="full"
                  variant="text"
                  color="gray"
                  href={url}
                >
                  {title}
                </LinkButton>
              )
            ),
          )}
        </nav>
      </div>
    </>
  );
}
