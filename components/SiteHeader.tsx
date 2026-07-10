import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-12">
      <Link
        href="/"
        className="font-heading text-lg tracking-tight hover:text-moss transition-colors"
      >
        Ziran / Lab
      </Link>
      <nav className="flex gap-6 font-body text-sm tracking-wide">
        <Link href="/about" className="hover:text-moss transition-colors">
          关于我
        </Link>
        <Link href="/work" className="hover:text-moss transition-colors">
          作品
        </Link>
      </nav>
    </header>
  );
}
