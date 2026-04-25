import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { MERCH, MERCH_FORM_URL } from "../../lib/data";

export default function Merch() {
  return (
    <section
      id="merch"
      data-testid="merch-section"
      className="relative bg-ink-950 py-20 md:py-32 border-t border-ink-700 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-10 md:mb-14">
        <div className="flex items-end justify-between mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300">
            § 03 / Tienda oficial
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
            Merch Drop · 2026
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display uppercase leading-[0.82] tracking-tighter text-6xl sm:text-7xl md:text-[8rem]"
          >
            MERCH
          </motion.h2>
          <p className="text-ink-300 max-w-md text-sm md:text-base">
            Lleva la familia contigo: llaveros, pegatinas, gorras,la soft-shell, y mucho más. Haz tu pedido rellenando el formulario — lo recibimos
            directamente en el grupo.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {MERCH.map((m, i) => (
          <motion.a
            key={m.id}
            href={MERCH_FORM_URL}
            target="_blank"
            rel="noreferrer noopener"
            data-testid={`merch-card-${m.id}`}
            data-cursor="hover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            className="group relative block border border-ink-700 bg-ink-900 overflow-hidden"
          >
            <div className="aspect-square overflow-hidden bg-white/5">
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
              />
            </div>
            <div className="absolute top-3 left-3">
              <span className="bg-white text-black font-mono text-[10px] tracking-[0.25em] uppercase px-2.5 py-1.5">
                0{i + 1}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex items-end justify-between gap-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <div className="min-w-0">
                <span className="block font-display uppercase tracking-tight text-base sm:text-xl md:text-2xl leading-none truncate">
                  {m.name}
                </span>
                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ink-300 mt-2 block truncate">
                  {m.tagline}
                </span>
              </div>
              <span className="w-9 h-9 md:w-10 md:h-10 border border-white text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-10 md:mt-14">
        <a
          href={MERCH_FORM_URL}
          target="_blank"
          rel="noreferrer noopener"
          data-testid="merch-cta"
          data-cursor="hover"
          className="group w-full md:w-auto inline-flex items-center justify-center gap-3 md:gap-5 border border-white px-4 md:px-10 py-4 md:py-7 font-display uppercase text-xl sm:text-2xl md:text-4xl tracking-tight hover:bg-white hover:text-black transition-colors"
        >
          <ShoppingBag size={20} className="md:hidden" />
          <ShoppingBag size={22} className="hidden md:inline" />
          PEDIR MERCH
          <ArrowUpRight size={20} className="md:hidden" />
          <ArrowUpRight size={22} className="hidden md:inline" />
        </a>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-500 mt-4">
          Formulario Google · respuesta gestionada por los admins
        </p>
      </div>
    </section>
  );
}
