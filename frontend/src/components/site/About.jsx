import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { IMG, STATS } from "../../lib/data";

function Counter({ value, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="sobre-nosotros"
      data-testid="about-section"
      className="relative bg-ink-950 py-20 md:py-32 overflow-hidden"
    >
      {/* Tacho rule */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <div className="flex items-end justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300">
            § 01 / Sobre nosotros
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
            RPM × ∞
          </span>
        </div>
        <div className="relative h-[2px] w-full">
          <div className="absolute inset-0 bg-ink-700" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.1, 1] }}
            className="absolute inset-y-0 left-0 bg-white origin-left w-full"
          />
          <div className="absolute -bottom-5 left-0 right-0 flex justify-between font-mono text-[9px] tracking-[0.2em] text-ink-500 uppercase">
            <span>0</span>
            <span>2k</span>
            <span>4k</span>
            <span>6k</span>
            <span>8k · redline</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-display uppercase leading-[0.85] tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap">
              LA FAMILIA
            </h2>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300 mt-5">
              Crew · No Ego · All Love
            </p>
          </motion.div>
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-5 flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-ink-100 text-lg md:text-2xl leading-snug"
          >
            Empezamos siendo cuatro. Hoy somos una cuadrilla que se junta
            cada finde para reventar carreteras secundarias y los domingos
            para tomar café viendo coches. <br />
            <span className="text-ink-300">
              Esto no es un club. Es una familia con motor.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-ink-300 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Nos da igual si traes un stance limpio, un GTI de serie o el
            primer coche que te compraste con tus ahorros. Si conduces con
            respeto y te gustan los viajes largos, ya eres uno de los
            nuestros.
          </motion.p>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative group overflow-hidden"
            data-cursor="hover"
          >
            <img
              src={IMG.crx}
              alt="Crew car"
              className="w-full h-[320px] md:h-[440px] lg:h-[520px] object-cover mono-img group-hover:scale-105 transition-transform duration-[1200ms]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-100">
                FILE / 007
                <br />
                <span className="text-ink-300">honda del sol · stance</span>
              </div>
              <span className="w-2.5 h-2.5 bg-white block" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats — full width strip */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-16 md:mt-24">
        <div
          data-testid="about-stats"
          className="grid grid-cols-2 md:grid-cols-4 border border-ink-700"
        >
          {STATS.map((s, i) => {
            const isNumber = typeof s.value === "number";
            return (
              <div
                key={s.label}
                className={`bg-ink-950 p-6 md:p-10 flex flex-col gap-3 border-ink-700 ${
                  i % 2 === 1 ? "border-l" : ""
                } ${i >= 2 ? "border-t md:border-t-0" : ""} ${
                  i > 0 ? "md:border-l" : ""
                }`}
              >
                <span className="font-display text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight">
                  {isNumber ? <Counter value={s.value} /> : s.value}
                </span>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-ink-300">
                  {s.label}
                </span>
                {s.sub && (
                  <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-ink-500">
                    {s.sub}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
