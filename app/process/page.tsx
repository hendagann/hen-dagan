import type { Metadata } from "next";
import { processPage } from "@/content/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: processPage.metaTitle,
  description: processPage.metaDescription,
};

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-36 pb-10 flex flex-col gap-12">
      <Reveal>
        <header className="max-w-3xl flex flex-col gap-4">
          <h1 className="font-display text-4xl sm:text-5xl font-black">{processPage.title}</h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">{processPage.intro}</p>
        </header>
      </Reveal>

      <ol className="flex flex-col gap-5 list-none">
        {processPage.steps.map((step, i) => (
          <Reveal key={step.title} delay={Math.min(i * 60, 240)}>
            <li className="glass glass-card rounded-3xl p-6 sm:p-8 flex gap-5 sm:gap-7">
              <span
                className="font-display text-4xl sm:text-5xl font-black text-[var(--color-gold)] leading-none pt-1"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-4 max-w-[68ch]">
                <h2 className="font-display text-2xl font-bold">{step.title}</h2>
                {(
                  [
                    { label: processPage.labels.how, block: step.how, tone: "text-[var(--color-paper)]" },
                    { label: processPage.labels.sought, block: step.sought, tone: "text-[var(--color-muted)]" },
                    { label: processPage.labels.led, block: step.led, tone: "text-[var(--color-muted)]" },
                  ] as const
                ).map(({ label, block, tone }) => (
                  <p key={label} className={`leading-relaxed ${tone}`}>
                    <span className="text-[var(--color-gold)] text-sm font-semibold block pb-0.5">{label}</span>
                    {block.text}
                    {"em" in block && block.em && (
                      <>
                        {" "}
                        <em className="not-italic font-semibold text-[var(--color-gold)]">{block.em}</em>
                      </>
                    )}
                  </p>
                ))}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <p className="glass rounded-2xl px-6 py-5 text-[var(--color-muted)] leading-relaxed max-w-3xl">
          {processPage.note}
        </p>
      </Reveal>
    </div>
  );
}
