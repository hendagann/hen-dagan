"use client";

import { useState } from "react";
import { contactPage } from "@/content/site";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = new FormData(e.currentTarget);
      const name = String(data.get("name") || "");
      const from = String(data.get("email") || "");
      const company = String(data.get("company") || "");
      const message = String(data.get("message") || "");
      const subject = encodeURIComponent(`פנייה מהאתר: ${name}${company ? ", " + company : ""}`);
      const body = encodeURIComponent(`${message}\n\nממי: ${name}\nאימייל: ${from}${company ? "\nחברה ותפקיד: " + company : ""}`);
      window.location.href = `mailto:${contactPage.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const f = contactPage.form;

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          {f.name}
          <input
            name="name"
            required
            autoComplete="name"
            className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-base outline-none focus:border-[var(--color-gold)] transition-colors"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          {f.email}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-base outline-none focus:border-[var(--color-gold)] transition-colors"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        {f.company}
        <input
          name="company"
          autoComplete="organization"
          className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-base outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        {f.message}
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-base outline-none focus:border-[var(--color-gold)] transition-colors resize-y"
        />
      </label>
      <div className="flex items-center gap-4 pt-1">
        <button type="submit" className="glass-btn glass-btn-gold">
          {f.submit}
        </button>
        <p aria-live="polite" className="text-sm text-[var(--color-muted)]">
          {status === "sent" && f.success}
          {status === "error" && f.error}
        </p>
      </div>
    </form>
  );
}
