"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const [open, setOpen] = useState(false);

  // סגירת התפריט במעבר בין עמודים
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
    <header className="fixed top-4 inset-x-0 z-50 flex flex-col items-center px-4">
      <nav
        className="glass glass-pill flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 text-sm max-w-full"
        aria-label="ניווט ראשי"
      >
        <Link href="/" className="font-display font-bold text-base whitespace-nowrap ps-1 pe-1 sm:pe-2">
          {nav.logo}
        </Link>

        {/* דסקטופ: תפריט מלא פתוח בשורה */}
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

        {/* מובייל / חלון קטן: קיצור ל"עבודות" בלבד */}
        <Link
          href="/work"
          className={`md:hidden px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors hover:bg-white/10 ${
            pathname === "/work" ? "text-[var(--color-gold)]" : "text-[var(--color-paper)]"
          }`}
        >
          עבודות
        </Link>

        {/* CTA: תמיד גלוי */}
        <Link
          href={nav.cta.href}
          className="glass-btn glass-btn-gold !py-1.5 !px-3 sm:!px-4 text-sm whitespace-nowrap"
        >
          {nav.cta.label}
        </Link>

        {/* דסקטופ: מתג שפה */}
        <Link
          href={nav.en.href}
          aria-label="English version"
          className="hidden md:inline-block px-2 py-1.5 rounded-full text-xs opacity-70 hover:opacity-100 transition-opacity"
        >
          {nav.en.label}
        </Link>

        {/* מובייל / חלון קטן: כפתור תפריט */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors ms-0.5"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <>
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </>
            ) : (
              <>
                <line x1="3" y1="5" x2="15" y2="5" />
                <line x1="3" y1="9" x2="15" y2="9" />
                <line x1="3" y1="13" x2="15" y2="13" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* פאנל התפריט (מובייל / חלון קטן). זכוכית מטושטשת עם קריאות מלאה */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden glass menu-panel mt-2 rounded-2xl p-2 w-[min(20rem,92vw)] flex flex-col gap-0.5"
        >
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-xl transition-colors hover:bg-white/10 ${
                pathname === item.href ? "text-[var(--color-gold)]" : "text-[var(--color-paper)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="px-4 py-3 rounded-xl transition-colors hover:bg-white/10">
            יצירת קשר
          </Link>
          <div className="hairline my-1.5" />
          <Link
            href={nav.en.href}
            aria-label="English version"
            className="px-4 py-3 rounded-xl transition-colors hover:bg-white/10 text-[var(--color-muted)]"
          >
            English
          </Link>
        </div>
      )}
    </header>
  );
}
