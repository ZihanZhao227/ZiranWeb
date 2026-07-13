import Link from "next/link";

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
          关于我
        </Link>
        <Link href="/work" className="hover:text-moss transition-colors">
          作品
        </Link>
        <Link href="/shelf" className="hover:text-moss transition-colors">
          书架
        </Link>
      </nav>
    </header>
  );
}
