import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const navItems = [
  { label: "Comunidad", href: "/#sumate" },
  { label: "Eventos", href: "/#evento" },
  { label: "Colaboradores", href: "/#colaboradores" },
  { label: "Código de conducta", href: "/codigo-de-conducta" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-crema/90 backdrop-blur">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-5"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-extrabold tracking-tight md:text-lg"
          aria-label="Formosa.dev, inicio"
        >
          <Image
            src="/assets/logo-formosadev.png"
            alt="Logo de Formosa.dev"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
            priority
          />
          <span>
            formosa<span className="text-lapacho">.dev</span>
          </span>
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
