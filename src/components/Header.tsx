import Link from "next/link";
import { MobileNav } from "./MobileNav";

const navItems = [
  { label: "Comunidad", href: "/#sumate" },
  { label: "Eventos", href: "/#evento" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Recursos", href: "/#recursos" },
  { label: "Código de conducta", href: "/codigo-de-conducta" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-crema/90 backdrop-blur">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4"
      >
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight"
          aria-label="Formosa.dev, inicio"
        >
          formosa<span className="text-lapacho">.dev</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-lapacho"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#sumate"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-crema transition-colors hover:bg-lapacho"
          >
            Sumate
          </Link>
          <MobileNav items={navItems} />
        </div>
      </nav>
    </header>
  );
}
