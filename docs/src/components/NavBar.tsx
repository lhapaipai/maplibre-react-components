"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FloatingOverlay } from "@floating-ui/react";
import { Button } from "pentatrion-design/components/button";
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
    ],
  },
  {
    title: "Extra",
    children: [
      {
        url: "/tips",
        title: "Tips",
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
      <div className="absolute left-0 top-0 z-10 md:hidden">
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
          "fixed left-0 top-0 z-30 h-screen w-64 max-w-full flex-none overflow-y-auto overflow-x-hidden bg-gray-0 px-4 shadow dark:shadow-dark md:flex md:flex-col md:bg-transparent md:shadow-none md:dark:shadow-none",
          !showNavBar && "hidden",
        )}
      >
        <div className="absolute right-0 top-0 md:hidden">
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
            className="mb-4 grid min-h-32 place-content-center transition-colors hover:text-gray-7 active:text-gray-6"
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
                          fullWidth={true}
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
                  fullWidth={true}
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
