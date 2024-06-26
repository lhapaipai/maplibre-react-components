import Footer from "~/components/Footer";
import HeaderBar from "~/components/HeaderBar";
import NavBar from "~/components/NavBar";

export default function WithMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:pl-64">
      <NavBar />
      <div className="relative overflow-x-hidden">
        <HeaderBar />
        <div className="mx-auto p-4 md:max-w-6xl">
          <div className="prose prose-neutral dark:prose-invert">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
