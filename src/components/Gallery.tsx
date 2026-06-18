import { useCallback, useEffect, useState } from "react";

export type GalleryItem = {
  src: string;
  title: string;
  description: string;
  type?: "image" | "video";
  poster?: string;
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function GalleryMedia({
  item,
  className,
  inLightbox = false,
}: {
  item: GalleryItem;
  className?: string;
  inLightbox?: boolean;
}) {
  if (item.type === "video") {
    return (
      <video
        className={className}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay={inLightbox}
        controls={inLightbox}
        preload="metadata"
      />
    );
  }
  return <img className={className} src={item.src} alt={item.title} loading="lazy" />;
}

function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const item = items[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20"
      >
        &times;
      </button>

      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous"
          className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:left-6"
        >
          &#8249;
        </button>
      )}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next"
          className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:right-6"
        >
          &#8250;
        </button>
      )}

      <figure
        className="flex max-h-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <GalleryMedia
          item={item}
          inLightbox
          className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
        />
        <figcaption className="mt-5 max-w-2xl text-center">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export function Gallery({
  items,
  className,
}: {
  items: GalleryItem[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div
        className={cx(
          className,
          "rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center",
        )}
      >
        <p className="text-lg font-medium text-white">Screenshots coming soon</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          We&apos;re putting together a fresh set of screenshots and videos from the
          app. Check back shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={cx(className, "gap-5 sm:columns-2 lg:columns-3")}>
        {items.map((item, i) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setActive(i)}
            className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="relative overflow-hidden bg-black/40">
              <GalleryMedia
                item={item}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {item.type === "video" && (
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
                  Video
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <Lightbox
          items={items}
          index={active}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      )}
    </>
  );
}
