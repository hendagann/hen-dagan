"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

type Press = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  caption: string;
};

export type OriginData = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  method: { lead: string; highlight: string };
  bridge: string;
  recognition: string;
  press: Press;
  stats: { value: string; label: string }[];
};

/* גזיר העיתונות: מסמך ארכיוני עם הטיה עדינה, שנפתח בלחיצה לגודל מלא */
function PressClipping({ press, onOpen }: { press: Press; onOpen: () => void }) {
  return (
    <figure className="flex flex-col gap-3 max-w-md mx-auto">
      <span className="eyebrow">{press.label}</span>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`לפתיחת הכתבה בגודל מלא: ${press.caption}`}
        className="block rotate-[1.4deg] hover:rotate-0 transition-transform duration-500 motion-reduce:rotate-0 motion-reduce:transition-none cursor-zoom-in"
      >
        <span className="block border border-white/25 rounded-md p-1.5 bg-white/5 shadow-[0_18px_50px_rgb(0_0_0/0.45)]">
          <Image
            src={press.src}
            alt={press.alt}
            width={press.width}
            height={press.height}
            className="w-full h-auto rounded-sm"
            sizes="(max-width: 1024px) 90vw, 34vw"
          />
        </span>
      </button>
      <figcaption className="text-sm text-[var(--color-muted)]">{press.caption}</figcaption>
    </figure>
  );
}

export default function OriginStory({ data }: { data: OriginData }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="glass rounded-3xl p-7 sm:p-12 flex flex-col gap-10">
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12 lg:items-start">
        {/* צד הטקסט: פותח בכותרת; במובייל התמונה נכנסת מיד אחריה */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <header className="flex flex-col gap-3">
              <span className="eyebrow">{data.eyebrow}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-balance">{data.title}</h2>
            </header>
          </Reveal>

          {/* מיקום התמונה במובייל: אחרי הכותרת, לפני הטקסט המורחב */}
          <Reveal className="lg:hidden">
            <PressClipping press={data.press} onOpen={() => setOpen(true)} />
          </Reveal>

          <div className="flex flex-col gap-5 max-w-[68ch]">
            {data.paragraphs.map((p, i) => (
              <Reveal key={i} delay={Math.min(i * 80, 160)}>
                <p className="text-[var(--color-muted)] leading-loose">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={200}>
              <p className="leading-loose">
                <span className="text-[var(--color-muted)]">{data.method.lead} </span>
                <em className="not-italic font-semibold text-[var(--color-gold)]">{data.method.highlight}</em>
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-[var(--color-paper)] leading-loose">{data.bridge}</p>
            </Reveal>
            <Reveal delay={280}>
              <p className="text-sm text-[var(--color-muted)] border-s-2 border-[var(--color-gold)] ps-4 leading-relaxed">
                {data.recognition}
              </p>
            </Reveal>
          </div>
        </div>

        {/* התמונה בדסקטופ: טור שמאלי, כ 40 אחוז */}
        <Reveal delay={140} className="hidden lg:block lg:sticky lg:top-32">
          <PressClipping press={data.press} onOpen={() => setOpen(true)} />
        </Reveal>
      </div>

      {/* רצועת מדדים טיפוגרפית: בלי כרטיסים, בלי אייקונים, בלי מונים רצים */}
      <Reveal>
        <div className="flex flex-col gap-6">
          <div className="hairline" />
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {data.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 lg:border-s lg:border-white/10 lg:ps-5 lg:first:border-s-0 lg:first:ps-0">
                <dt className="order-2 text-sm text-[var(--color-muted)]">{s.label}</dt>
                <dd className="order-1 font-display text-2xl sm:text-3xl font-bold text-[var(--color-gold)]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* התמונה בגודל מלא */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={data.press.caption}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="לסגור את התצוגה המלאה"
            className="absolute top-5 end-5 glass-btn !px-4 !py-2 text-lg"
          >
            ✕
          </button>
          <Image
            src={data.press.src}
            alt={data.press.alt}
            width={data.press.width}
            height={data.press.height}
            className="max-h-[88vh] w-auto h-auto rounded-lg shadow-2xl"
            sizes="92vw"
          />
        </div>
      )}
    </section>
  );
}
