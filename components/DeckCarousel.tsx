"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export type DeckSlide = { src: string; alt: string };

export default function DeckCarousel({
  slides,
  title,
  slideWidthClass = "w-[85%] sm:w-[70%]",
  imgWidth = 1400,
  imgHeight = 787,
  showCaptions = true,
}: {
  slides: DeckSlide[];
  title: string;
  slideWidthClass?: string;
  imgWidth?: number;
  imgHeight?: number;
  showCaptions?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.min(Math.max(index + dir, 0), slides.length - 1);
    const slide = el.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setIndex(next);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    let best = 0;
    let bestDist = Infinity;
    const center = el.scrollLeft + el.clientWidth / 2;
    [...el.children].forEach((c, i) => {
      const child = c as HTMLElement;
      const mid = child.offsetLeft + child.offsetWidth / 2;
      const d = Math.abs(mid - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
  };

  return (
    <div className="flex flex-col gap-3" role="group" aria-label={title}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-3xl pb-2 [scrollbar-width:thin]"
      >
        {slides.map((s, i) => (
          <figure key={s.src} className={`glass rounded-2xl p-2 snap-center shrink-0 ${slideWidthClass}`}>
            <Image
              src={s.src}
              alt={s.alt}
              width={imgWidth}
              height={imgHeight}
              className="rounded-xl w-full h-auto"
              loading={i === 0 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 85vw, 70vw"
            />
            {showCaptions && (
              <figcaption className="px-2 pt-2 pb-1 text-xs text-[var(--color-muted)]">{s.alt}</figcaption>
            )}
          </figure>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === slides.length - 1}
          aria-label="לשקף הבא"
          className="glass-btn !px-4 !py-2 disabled:opacity-30"
        >
          ←
        </button>
        <span className="text-sm text-[var(--color-muted)] tabular-nums" aria-live="polite">
          {index + 1} / {slides.length}
        </span>
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="לשקף הקודם"
          className="glass-btn !px-4 !py-2 disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}
