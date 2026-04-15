import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/methodology", label: "Methodology" },
  { href: "/rumor-check", label: "Rumor Check" },
  { href: "/about", label: "About" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Gulfkeeper Clone
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
