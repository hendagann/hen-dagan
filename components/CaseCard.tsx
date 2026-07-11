import Link from "next/link";
import type { CaseStudy } from "@/content/site";

export default function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link href={`/work/${item.slug}`} className="block h-full">
      <article className="glass glass-card h-full rounded-3xl p-6 flex flex-col gap-3">
        <span className="eyebrow">{item.tag}</span>
        <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">{item.title}</h3>
        <p className="text-[var(--color-muted)] leading-relaxed text-sm sm:text-base">{item.cardText}</p>
        <span className="mt-auto pt-2 text-sm text-[var(--color-gold)]">לקריאת הפירוק המלא ←</span>
      </article>
    </Link>
  );
}
