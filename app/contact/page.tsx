import type { Metadata } from "next";
import { contactPage, links } from "@/content/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-40 pb-16 flex flex-col items-center text-center gap-10">
      <Reveal>
        <header className="flex flex-col gap-4">
          <h1 className="font-display text-4xl sm:text-5xl font-black">{contactPage.title}</h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">{contactPage.body}</p>
        </header>
      </Reveal>

      <Reveal delay={120}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn glass-btn-gold !py-4 !px-8 text-base sm:text-lg justify-center"
          >
            {contactPage.actions.whatsapp}
          </a>
          <a
            href={`mailto:${contactPage.email}`}
            className="glass-btn !py-4 !px-8 text-base sm:text-lg justify-center"
          >
            {contactPage.actions.mail}
          </a>
          <a
            href="/media/hen_dagan_cv.pdf"
            download
            className="glass-btn !py-4 !px-8 text-base sm:text-lg justify-center"
          >
            {contactPage.actions.cv}
          </a>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <p className="text-sm text-[var(--color-muted)]" dir="ltr">
          {contactPage.email}
        </p>
      </Reveal>
    </div>
  );
}
