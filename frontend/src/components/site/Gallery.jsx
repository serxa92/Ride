import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { GALLERY } from "../../lib/data";

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const prev = () => emblaApi && emblaApi.scrollPrev();
  const next = () => emblaApi && emblaApi.scrollNext();

  const current = GALLERY[selected] || GALLERY[0];

  return (
    <section
      id="galeria"
      data-testid="gallery-section"
      className="relative bg-ink-950 py-20 md:py-32 border-t border-ink-700"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <div className="flex items-end justify-between mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300">
            § 02 / Fotos del crew
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
            {String(selected + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display uppercase leading-[0.82] tracking-tighter text-6xl sm:text-7xl md:text-9xl"
          >
            GALERÍA
          </motion.h2>
          <p className="text-ink-300 max-w-md text-sm md:text-base">
            Un recorrido visual por las quedadas, rutas y concentraciones.
            Cada foto, una historia. Haz click para verla en grande.
          </p>
        </div>
      </div>

      {/* Embla */}
      <div className="relative">
        <div
          className="overflow-hidden px-6 md:px-10"
          ref={emblaRef}
          data-testid="gallery-embla"
        >
          <div className="flex gap-5 md:gap-7">
            {GALLERY.map((g, idx) => (
              <figure
                key={g.id}
                data-testid={`gallery-card-${g.id}`}
                data-cursor="hover"
                onClick={() => setLightbox(g)}
                className="relative flex-[0_0_88%] sm:flex-[0_0_70%] md:flex-[0_0_55%] lg:flex-[0_0_44%] group cursor-pointer"
              >
                <div className="relative overflow-hidden border border-ink-700 bg-ink-900">
                  <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                    <img
                      src={g.image}
                      alt={g.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                  </div>

                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="bg-white text-black font-mono text-[10px] tracking-[0.25em] uppercase px-2.5 py-1.5">
                      {g.code}
                    </span>
                    <span className="w-10 h-10 border border-white/60 bg-black/40 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={14} />
                    </span>
                  </div>

                  <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <h3 className="font-display uppercase tracking-tight text-2xl md:text-3xl leading-none">
                      {g.title}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-200 mt-2">
                      {g.caption}
                    </p>
                  </figcaption>
                </div>

                <span className="absolute -top-6 -left-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-500">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </figure>
            ))}
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              data-testid="gallery-prev"
              data-cursor="hover"
              aria-label="Anterior"
              className="w-14 h-14 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              data-testid="gallery-next"
              data-cursor="hover"
              aria-label="Siguiente"
              className="w-14 h-14 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                data-testid={`gallery-dot-${i}`}
                className={`h-[2px] transition-all duration-500 ${
                  selected === i ? "w-10 bg-white" : "w-4 bg-ink-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-6 md:mt-8">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-500">
            Actual: {current.code} · {current.title}
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          data-testid="gallery-lightbox"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            aria-label="Cerrar"
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 border border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors z-10"
            data-testid="gallery-lightbox-close"
          >
            <X size={20} />
          </button>
          <figure
            className="relative max-w-[1200px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full max-h-[85vh] object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-300">
                  {lightbox.code}
                </span>
                <h4 className="font-display uppercase tracking-tight text-2xl md:text-3xl leading-none mt-1">
                  {lightbox.title}
                </h4>
              </div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-300 hidden md:inline">
                Esc · cerrar
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
