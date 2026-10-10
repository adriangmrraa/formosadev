import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CommunityJoinTrigger } from "./CommunityConversation";
import { MobileNav, type MobileNavIcon } from "./MobileNav";
import { buttonClass } from "./ui/Button";

const navItems: { label: string; href: string; icon?: MobileNavIcon }[] = [
  { label: "Eventos", href: "/#evento", icon: "calendar" },
  { label: "Redes", href: "/#redes", icon: "share2" },
  { label: "Colaboradores", href: "/#colaboradores", icon: "handshake" },
  { label: "Código de conducta", href: "/codigo-de-conducta", icon: "scrollText" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline-soft bg-canvas/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] md:pl-5 md:pr-5"
      >
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 text-base font-extrabold tracking-tight md:text-lg"
          aria-label="Formosa.dev, inicio"
        >
          <Image
            src="/assets/logo-formosadev.webp"
            alt="Logo de Formosa.dev"
            width={48}
            height={48}
            className="h-12 w-12 rounded-pill object-cover"
            priority
          />
          <span>
            formosa<span className="text-lapacho">.dev</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium text-text-muted transition-colors duration-200 hover:bg-surface-soft hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CommunityJoinTrigger className={buttonClass({ variant: "primary", size: "sm" })}>
            <MessageCircle aria-hidden="true" className="size-4" />
            Sumate
          </CommunityJoinTrigger>
          <MobileNav items={navItems} />
        </div>
      </nav>
    </header>
  );
}
