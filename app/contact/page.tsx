import type { Metadata } from "next";
import { contactPage, links } from "@/content/site";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-36 pb-10 flex flex-col gap-10">
      <Reveal>
        <header className="flex flex-col gap-4">
          <h1 className="font-display text-4xl sm:text-5xl font-black">{contactPage.title}</h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">{contactPage.body}</p>
        </header>
      </Reveal>

      <Reveal delay={100}>
        <ContactForm />
      </Reveal>

      <Reveal delay={180}>
        <div className="flex flex-wrap gap-3">
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="glass-btn glass-btn-gold">
            לכתוב לי בוואטסאפ
          </a>
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="glass-btn">
              לפרופיל הלינקדאין
            </a>
          )}
          <a href={`mailto:${contactPage.email}`} className="glass-btn">
            {contactPage.alt.mail}
          </a>
          <a href="/media/hen_dagan_cv.pdf" download className="glass-btn">
            {contactPage.alt.cv}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
