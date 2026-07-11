import type { Metadata } from "next";
import { workPage, cases, testimonialsMedia } from "@/content/site";
import CaseCard from "@/components/CaseCard";
import VideoPlayer from "@/components/VideoPlayer";
import DeckCarousel from "@/components/DeckCarousel";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: workPage.metaTitle,
  description: workPage.metaDescription,
};

export default function WorkPage() {
  const briefs = cases.filter((c) => c.kind === "brief");
  const clients = cases.filter((c) => c.kind === "client");

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-10 flex flex-col gap-14">
      <Reveal>
        <div className="max-w-3xl flex flex-col gap-4">
          <h1 className="font-display text-4xl sm:text-5xl font-black">{workPage.title}</h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">{workPage.intro}</p>
        </div>
      </Reveal>

      <section className="flex flex-col gap-6">
        <Reveal>
          <span className="eyebrow">פירוקי בריף</span>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {briefs.map((item, i) => (
            <Reveal key={item.slug} delay={i * 100}>
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <Reveal>
          <span className="eyebrow">מקרי בוחן: לקוחות</span>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {clients.map((item, i) => (
            <Reveal key={item.slug} delay={i * 100} className="h-full">
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <Reveal>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{workPage.testimonials.title}</h2>
            <p className="text-[var(--color-muted)] text-lg">{workPage.testimonials.intro}</p>
          </div>
        </Reveal>
        <Reveal>
          <DeckCarousel
            slides={testimonialsMedia.images}
            title={workPage.testimonials.title}
            slideWidthClass="w-[78%] sm:w-[42%] lg:w-[34%]"
            imgWidth={900}
            imgHeight={1000}
            showCaptions={false}
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {testimonialsMedia.videos.map((v, i) => (
            <Reveal key={v.src} delay={i * 80}>
              <VideoPlayer src={v.src} label={v.label} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
