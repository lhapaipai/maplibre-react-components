import LandingBackground from "~/components/LandingBackground";
import LinkButton from "~/components/LinkButton";
import HomeLogo from "./HomeLogo";

export default function Home() {
  return (
    <div className="grid min-h-screen place-content-center">
      <LandingBackground />
      <div className="relative">
        <HomeLogo />
        <div className="mt-2 flex justify-end gap-2">
          <LinkButton href="/getting-started">Getting started</LinkButton>
          <LinkButton href="/tutorial">Tutorial</LinkButton>
        </div>
      </div>
    </div>
  );
}
