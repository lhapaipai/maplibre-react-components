import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mb-16 mt-8 text-center">
      Made with 🎻 by{" "}
      <Link className="link" href="https://huguestavernier.com">
        Hugues Tavernier
      </Link>
    </footer>
  );
}
