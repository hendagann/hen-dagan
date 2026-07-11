import type { Metadata } from "next";
import Link from "next/link";
import { en } from "@/content/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
};

export default function EnglishPage() {
  return (
    <div dir="ltr" lang="en" className="mx-auto max-w-5xl px-6 pt-36 pb-10 flex flex-col gap-20 text-left">
      <section className="text-center flex flex-col items-center gap-6 pt-6">
        <Reveal>
          <span className="eyebrow">{en.hero.eyebrow}</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display text-4xl sm:text-6xl font-black leading-tight max-w-4xl text-balance">
            {en.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl">{en.hero.sub}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href={en.hero.ctaPrimary.href} className="glass-btn glass-btn-gold">
              {en.hero.ctaPrimary.label}
            </Link>
            <a href={en.hero.ctaSecondary.href} download className="glass-btn">
              {en.hero.ctaSecondary.label}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="grid sm:grid-cols-2 gap-5">
        {en.capabilities.map((c, i) => (
          <Reveal key={c.name} delay={i * 80} className="h-full">
            <div className="glass glass-card h-full rounded-3xl p-6 flex flex-col gap-3">
              <h2 className="font-display text-2xl font-bold text-[var(--color-gold)]">{c.name}</h2>
              <p className="text-[var(--color-muted)] leading-relaxed">{c.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section>
        <Reveal>
          <div className="glass rounded-3xl p-8 sm:p-12 flex flex-col gap-4">
            <span className="eyebrow">{en.caseSummary.title}</span>
            <p className="text-lg leading-loose">{en.caseSummary.text}</p>
            <div className="pt-2">
              <Link href={en.contact.href} className="glass-btn glass-btn-gold">
                {en.contact.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
