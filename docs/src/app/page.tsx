import LandingBackground from "~/components/LandingBackground";
import LinkButton from "~/components/LinkButton";
import HomeLogo from "./HomeLogo";
import NpmInput from "./NpmInput";
import SpotCard from "~/components/SpotCard";
import { Metadata } from "next";
import Globe from "./Globe";

export const metadata: Metadata = {
  title: "MapLibre React Components",
  description:
    "A set of React JS components to render a map using MapLibre GL JS v5. Lightweight : only 11kB gzipped, focused on performance.",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="grid min-h-[30vh] place-content-center">
        <LandingBackground />
        <div className="relative">
          <HomeLogo />
          <div className="mt-2 flex justify-end gap-2">
            <LinkButton href="/getting-started">Getting started</LinkButton>
            <LinkButton href="/tutorial">Tutorial</LinkButton>
          </div>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[350px]">
        <Globe />
      </div>
      <div className="m-auto flex w-full max-w-2xl items-center justify-center lg:max-w-[22rem]">
        <NpmInput />
      </div>

      <div className="m-auto max-w-[68rem]">
        <div className="grid mb-4 grid-cols-1 gap-4 lg:grid-cols-3">
          <SpotCard className="text-center">
            Lightweight : only 11kB gzipped
            <br />
            MapLibre GL v5 compatible.
          </SpotCard>
          <SpotCard className="text-center">
            MapLibre only compatible, the library is based as much as possible
            on MapLibre native types. The learning curve is fast.
          </SpotCard>
          <SpotCard className="text-center">
            Focused on performance. The binding between React and MapLibre
            occurs in the most discreet way possible.
          </SpotCard>
        </div>
      </div>
    </div>
  );
}
