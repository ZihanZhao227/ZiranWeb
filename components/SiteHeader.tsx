import Link from "next/link";
import SupportLink from "@/components/SupportLink";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-12">
      <Link
        href="/"
        className="hover:text-moss transition-colors"
        style={{
          fontFamily: "monospace",
          fontSize: "14px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        ZIRANLAB
      </Link>
      <nav className="flex gap-6 font-body text-base tracking-wide">
        <Link href="/about" className="hover:text-moss transition-colors">
          About
        </Link>
        <Link href="/work" className="hover:text-moss transition-colors">
          Work
        </Link>
        <Link href="/shelf" className="hover:text-moss transition-colors">
          Shelf
        </Link>
        <Link href="/studio" className="hover:text-moss transition-colors">
          Studio
        </Link>
        <SupportLink className="rounded-md bg-moss px-4 py-1.5 text-sm text-moss-dark transition-opacity hover:opacity-80" />
      </nav>
    </header>
  );
}
