import clsx from "clsx";
import type { Metadata } from "next";
import { Alata } from "next/font/google";
import ProgressBar from "~/components/ProgressBar";
import "~/style/index.css";

const alata = Alata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alata",
});

export const metadata: Metadata = {
  title: "Maplibre React Components",
  description: "React components for MaplibreGL maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          alata.variable,
          "dark bg-gray-0 font-sans text-gray-text",
        )}
      >
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
