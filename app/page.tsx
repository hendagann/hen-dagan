import Link from "next/link";
import Image from "next/image";
import { home, cases, links, testimonialsMedia } from "@/content/site";
import ThinkingScene from "@/components/ThinkingScene";
import CaseCard from "@/components/CaseCard";
import DeckCarousel from "@/components/DeckCarousel";
import VideoPlayer from "@/components/VideoPlayer";
import OriginStory from "@/components/OriginStory";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  const briefs = cases.filter((c) => c.kind === "brief");
  const clients = cases.filter((c) => c.kind === "client");

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-10 flex flex-col gap-24 sm:gap-32">
      {/* Hero: התמונה של חן גלויה מהרגע הראשון */}
      <section className="grid md:grid-cols-[3fr_2fr] gap-8 md:gap-12 items-center pt-2 md:pt-6">
        <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-start order-2 md:order-none">
          <Reveal>
            <span className="eyebrow">{home.hero.eyebrow}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-balance">
              {home.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl">{home.hero.sub}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <a href={home.hero.ctaPrimary.href} className="glass-btn glass-btn-gold">
                {home.hero.ctaPrimary.label}
              </a>
              <Link href={home.hero.ctaSecondary.href} className="glass-btn">
                {home.hero.ctaSecondary.label}
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120} className="order-1 md:order-none">
          <figure className="glass glass-refract rounded-3xl p-3 max-w-[240px] sm:max-w-[300px] md:max-w-sm mx-auto">
            <Image
              src={home.hero.photo}
              alt={home.hero.photoAlt}
              width={640}
              height={800}
              priority
              className="rounded-2xl w-full h-auto"
              sizes="(max-width: 768px) 60vw, 30vw"
            />
          </figure>
        </Reveal>
      </section>

      {/* איך אני חושבת */}
      <section id={home.thinking.id} className="flex flex-col gap-8 scroll-mt-28">
        <Reveal>
          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{home.thinking.title}</h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed">{home.thinking.body}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ThinkingScene stages={home.thinking.stages} />
        </Reveal>
      </section>

      {/* פרויקטים אקדמיים: הצצה של חמישה שקפים לכל פרויקט, כבר בעמוד הבית */}
      <section className="flex flex-col gap-8">
        <Reveal>
          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{home.briefs.title}</h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed">{home.briefs.intro}</p>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-6">
          {briefs.map((item, i) => (
            <Reveal key={item.slug} delay={i * 100} className="h-full">
              <article className="glass rounded-3xl p-6 h-full flex flex-col gap-4">
                <span className="eyebrow">{item.tag}</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">{item.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed text-sm sm:text-base">{item.cardText}</p>
                {item.previewSlides && (
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="text-sm font-semibold text-[var(--color-muted)]">הצצה למצגת הפרויקט</span>
                    <DeckCarousel
                      slides={item.previewSlides}
                      title={`הצצה למצגת: ${item.title}`}
                      slideWidthClass="w-[92%]"
                      showCaptions={false}
                    />
                  </div>
                )}
                <div className="mt-auto pt-1">
                  <Link href={`/work/${item.slug}`} className="text-sm text-[var(--color-gold)]">
                    לקריאת הפירוק המלא ←
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* מקרי בוחן */}
      <section className="flex flex-col gap-8">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">{home.cases.title}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {clients.map((item, i) => (
            <Reveal key={item.slug} delay={i * 100} className="h-full">
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* סיפור המקור: השירות הצבאי כמקום שבו נבנתה החשיבה */}
      <OriginStory data={home.origin} />

      {/* המלצות: ההודעות והסרטונים המקוריים, לא ציטוטים */}
      <section className="flex flex-col gap-8">
        <Reveal>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{home.testimonials.title}</h2>
            <p className="text-[var(--color-muted)] text-lg">{home.testimonials.intro}</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <DeckCarousel
            slides={testimonialsMedia.images}
            title={home.testimonials.title}
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

      {/* CTA סופי */}
      <section>
        <Reveal>
          <div className="glass glass-refract rounded-3xl p-10 sm:p-16 text-center flex flex-col items-center gap-5">
            <h2 className="font-display text-3xl sm:text-5xl font-black">{home.finalCta.title}</h2>
            <p className="text-[var(--color-muted)] text-lg max-w-2xl">{home.finalCta.body}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="glass-btn glass-btn-gold">
                {home.finalCta.whatsapp.label}
              </a>
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="glass-btn">
                  {home.finalCta.linkedin.label}
                </a>
              )}
              <a href={home.finalCta.ctaSecondary.href} download className="glass-btn">
                {home.finalCta.ctaSecondary.label}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
