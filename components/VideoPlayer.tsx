export default function VideoPlayer({ src, label }: { src: string; label: string }) {
  return (
    <figure className="glass glass-card rounded-3xl p-3">
      <video
        controls
        preload="none"
        playsInline
        className="w-full rounded-2xl bg-black/40 aspect-[9/16] max-h-[480px] object-contain"
        aria-label={label}
      >
        <source src={src} />
        הדפדפן שלך לא תומך בניגון וידאו. אפשר להוריד את הקובץ ולצפות בו ישירות.
      </video>
      <figcaption className="pt-3 pb-1 px-2 text-sm text-[var(--color-muted)]">{label}</figcaption>
    </figure>
  );
}
