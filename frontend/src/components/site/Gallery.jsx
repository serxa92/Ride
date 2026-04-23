import { motion } from "framer-motion";
import { GALLERY } from "../../lib/data";

export default function Gallery() {
  return (
    <section
      id="galeria"
      data-testid="car-gallery-section"
      className="relative bg-ink-950 py-24 md:py-40 border-t border-ink-700"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-12 md:mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300 block mb-6">
            § 03 / Garage
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display uppercase leading-[0.82] tracking-tighter text-6xl sm:text-7xl md:text-9xl"
          >
            GARAGE
          </motion.h2>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
          {String(GALLERY.length).padStart(2, "0")} vehículos
        </span>
      </div>

      {/* Bento grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-6 gap-3 md:gap-4">
        {/* Big left */}
        <GalleryTile
          item={GALLERY[0]}
          className="col-span-6 md:col-span-4 aspect-[16/10] md:row-span-2 md:aspect-auto md:h-[640px]"
          delay={0}
        />
        {/* Small top-right */}
        <GalleryTile
          item={GALLERY[1]}
          className="col-span-3 md:col-span-2 aspect-[4/5] md:h-[310px]"
          delay={0.1}
        />
        {/* Small middle-right */}
        <GalleryTile
          item={GALLERY[2]}
          className="col-span-3 md:col-span-2 aspect-[4/5] md:h-[310px]"
          delay={0.2}
        />
        {/* Wide bottom-left */}
        <GalleryTile
          item={GALLERY[3]}
          className="col-span-6 md:col-span-3 aspect-[16/9] md:h-[360px]"
          delay={0.3}
        />
        {/* Wide bottom-right */}
        <GalleryTile
          item={GALLERY[4]}
          className="col-span-6 md:col-span-3 aspect-[16/9] md:h-[360px]"
          delay={0.4}
        />
      </div>
    </section>
  );
}

function GalleryTile({ item, className = "", delay = 0 }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.1, 1] }}
      data-testid={`gallery-tile-${item.id}`}
      data-cursor="hover"
      className={`relative overflow-hidden border border-ink-700 bg-ink-900 group ${className}`}
    >
      <img
        src={item.image}
        alt={item.tag}
        className="w-full h-full object-cover mono-img group-hover:scale-110 transition-transform duration-[1400ms] ease-out"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between bg-gradient-to-t from-black/85 via-black/30 to-transparent">
        <div>
          <span className="block font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-ink-300">
            {item.spec}
          </span>
          <span className="font-display uppercase tracking-tight text-xl md:text-2xl leading-none mt-1 block">
            {item.tag}
          </span>
        </div>
        <span className="w-2.5 h-2.5 bg-white rounded-full translate-y-[2px] group-hover:scale-150 transition-transform" />
      </figcaption>
      {/* Diagonal stripe */}
      <span className="absolute top-3 right-3 checker w-10 h-5 opacity-60" />
    </motion.figure>
  );
}
