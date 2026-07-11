"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");

  if (isEn) {
    return (
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4" dir="ltr">
        <nav className="glass glass-pill flex items-center gap-4 px-5 py-2.5 text-sm">
          <Link href="/en" className="font-display font-bold text-base">
            Hen Dagan
          </Link>
          <span className="opacity-30">·</span>
          <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">
            עברית
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className="glass glass-pill flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 text-sm max-w-full overflow-x-auto"
        aria-label="ניווט ראשי"
      >
        <Link href="/" className="font-display font-bold text-base whitespace-nowrap ps-1 pe-2">
          {nav.logo}
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors hover:bg-white/10 ${
                pathname === item.href ? "bg-white/10 text-[var(--color-gold)]" : "text-[var(--color-paper)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href={nav.cta.href}
          className="glass-btn glass-btn-gold !py-1.5 !px-4 text-sm whitespace-nowrap ms-1"
        >
          {nav.cta.label}
        </Link>
        <Link
          href={nav.en.href}
          aria-label="English version"
          className="px-2 py-1.5 rounded-full text-xs opacity-70 hover:opacity-100 transition-opacity"
        >
          {nav.en.label}
        </Link>
      </nav>
    </header>
  );
}
