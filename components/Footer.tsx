import Link from "next/link";
import { nav, footer, contactPage } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-display text-lg">{footer.line1}</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--color-muted)]" aria-label="ניווט תחתון">
            {nav.items.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--color-paper)] transition-colors">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="hover:text-[var(--color-paper)] transition-colors">
              יצירת קשר
            </Link>
            <a
              href={`mailto:${contactPage.email}`}
              className="hover:text-[var(--color-paper)] transition-colors"
              dir="ltr"
            >
              {contactPage.email}
            </a>
          </nav>
        </div>
        <div className="hairline" />
        <p className="text-sm text-[var(--color-muted)]">{footer.truth}</p>
      </div>
    </footer>
  );
}
