import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { ROUTES } from "../../lib/data";

export default function RoutesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

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

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section
      id="rutas"
      data-testid="routes-carousel-section"
      className="relative bg-ink-950 py-20 md:py-32 border-t border-ink-700"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <div className="flex items-end justify-between mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300">
            § 02 / Carretera &amp; Fotos
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
            RUTAS
          </motion.h2>
          <p className="text-ink-300 max-w-md text-sm md:text-base">
            Carreteras elegidas a dedo. De puertos húmedos a costas abiertas.
            Cada ruta es una historia, y cada historia empieza con un depósito
            lleno.
          </p>
        </div>
      </div>

      {/* Embla */}
      <div className="relative">
        <div
          className="overflow-hidden pl-6 md:pl-10"
          ref={emblaRef}
          data-testid="routes-embla"
        >
          <div className="flex gap-5 md:gap-7">
            {ROUTES.map((r, idx) => (
              <article
                key={r.id}
                data-testid={`route-card-${r.id}`}
                data-cursor="hover"
                className="relative flex-[0_0_88%] sm:flex-[0_0_60%] md:flex-[0_0_46%] lg:flex-[0_0_36%] group"
              >
                <div className="relative overflow-hidden border border-ink-700 bg-ink-900">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                  </div>

                  {/* Overlay code */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="bg-white text-black font-mono text-[10px] tracking-[0.25em] uppercase px-2.5 py-1.5">
                      {r.code}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/90 bg-black/50 backdrop-blur px-2.5 py-1.5 border border-white/20">
                      {r.date}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="flex items-center gap-2 text-ink-200 mb-2">
                      <MapPin size={12} />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                        {r.region}
                      </span>
                    </div>
                    <h3 className="font-display uppercase tracking-tight text-2xl md:text-3xl leading-none">
                      {r.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-ink-300 text-sm leading-relaxed max-w-md">
                  {r.description}
                </p>

                <span className="absolute -top-6 -left-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-500">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              data-testid="routes-prev"
              data-cursor="hover"
              aria-label="Anterior"
              className="w-14 h-14 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              data-testid="routes-next"
              data-cursor="hover"
              aria-label="Siguiente"
              className="w-14 h-14 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {ROUTES.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                data-testid={`routes-dot-${i}`}
                className={`h-[2px] transition-all duration-500 ${
                  selected === i ? "w-10 bg-white" : "w-4 bg-ink-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
