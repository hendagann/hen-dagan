import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutPage } from "@/content/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-36 pb-10">
      <div className="grid md:grid-cols-[2fr_1fr] gap-10 items-start">
        <div className="flex flex-col gap-6">
          <Reveal>
            <h1 className="font-display text-4xl sm:text-5xl font-black">{aboutPage.title}</h1>
          </Reveal>
          {aboutPage.paragraphs.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 80, 240)}>
              <p className="text-lg leading-loose text-[#d7dae3]">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <p className="glass rounded-2xl px-6 py-5 text-lg font-semibold">{aboutPage.summary}</p>
          </Reveal>
          <Reveal delay={260}>
            <div className="pt-2">
              <Link href={aboutPage.cta.href} className="glass-btn glass-btn-gold">
                {aboutPage.cta.label}
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={140} className="md:sticky md:top-32">
          <figure className="glass glass-refract rounded-3xl p-3">
            <Image
              src={aboutPage.photo}
              alt={aboutPage.photoAlt}
              width={640}
              height={800}
              className="rounded-2xl w-full h-auto object-cover"
              priority
            />
          </figure>
        </Reveal>
      </div>
    </div>
  );
}
