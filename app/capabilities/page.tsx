import type { Metadata } from "next";
import { capabilitiesPage } from "@/content/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: capabilitiesPage.metaTitle,
  description: capabilitiesPage.metaDescription,
};

export default function CapabilitiesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-36 pb-10 flex flex-col gap-10">
      <Reveal>
        <header className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl font-black">{capabilitiesPage.title}</h1>
        </header>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {capabilitiesPage.groups.map((group, i) => (
          <Reveal key={group.name} delay={i * 80} className="h-full">
            <section className="glass glass-card h-full rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
              <h2 className="font-display text-2xl font-bold text-[var(--color-gold)]" dir="ltr">
                {group.name}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="leading-relaxed flex gap-3">
                    <span className="text-[var(--color-gold)]" aria-hidden="true">
                      ●
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="text-[var(--color-muted)] text-sm">
          כלים: <span dir="ltr">{capabilitiesPage.tools.join(" · ")}</span>
        </p>
      </Reveal>
    </div>
  );
}
