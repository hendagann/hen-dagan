import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "@/content/site";
import VideoPlayer from "@/components/VideoPlayer";
import DeckCarousel from "@/components/DeckCarousel";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) return {};
  return { title: item.metaTitle, description: item.metaDescription };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-36 pb-10 flex flex-col gap-10">
      <Reveal>
        <header className="flex flex-col gap-4">
          <span className="eyebrow">{item.tag}</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black leading-tight text-balance">{item.title}</h1>
        </header>
      </Reveal>

      <div className="flex flex-col gap-8 prose-case">
        {item.sections.map((section, i) => (
          <Reveal key={section.heading} delay={Math.min(i * 60, 240)}>
            <section className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-bold text-[var(--color-gold)]">{section.heading}</h2>
              {"body" in section ? (
                <p className="text-lg">{section.body}</p>
              ) : (
                <ol className="flex flex-col gap-3 list-none">
                  {section.list.map((li, j) => (
                    <li key={j} className="glass rounded-2xl px-5 py-4 text-[var(--color-paper)] leading-relaxed">
                      {li}
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </Reveal>
        ))}
      </div>

      {item.deck && (
        <Reveal>
          <section className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-bold">{item.deck.title}</h2>
            <DeckCarousel slides={item.deck.slides} title={item.deck.title} />
            <div>
              <a href={item.deck.pdf} download className="glass-btn glass-btn-gold">
                {item.deck.pdfLabel}
              </a>
            </div>
          </section>
        </Reveal>
      )}

      {item.videos && item.videos.length > 0 && (
        <Reveal>
          <section className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-bold">התוצר: סרטונים לדוגמה</h2>
            <div className={`grid gap-5 ${item.videos.length > 1 ? "sm:grid-cols-2" : "sm:max-w-sm"}`}>
              {item.videos.map((v) => (
                <VideoPlayer key={v.src} src={v.src} label={v.label} />
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {item.transparency && (
        <Reveal>
          <p className="glass rounded-2xl px-5 py-4 text-sm text-[var(--color-muted)]">
            <span className="text-[var(--color-gold)] font-semibold">הערת שקיפות: </span>
            {item.transparency}
          </p>
        </Reveal>
      )}

      <Reveal>
        <footer className="flex flex-wrap gap-3 pt-4">
          <Link href="/work" className="glass-btn">
            לכל העבודות
          </Link>
          <Link href="/contact" className="glass-btn glass-btn-gold">
            בואו נדבר
          </Link>
        </footer>
      </Reveal>
    </article>
  );
}
