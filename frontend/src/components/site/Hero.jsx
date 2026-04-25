import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { ArrowDown, MessageCircle } from "lucide-react";
import { LOGO_URL, HERO_BG, TICKERS, WHATSAPP_URL } from "../../lib/data";

function StartLights() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = [];
    for (let i = 0; i < 5; i++) {
      t.push(setTimeout(() => setActive(i + 1), 300 + i * 350));
    }
    t.push(setTimeout(() => setActive(0), 300 + 5 * 350));
    return () => t.forEach(clearTimeout);
  }, []);
  return (
    <div
      data-testid="hero-start-lights"
      className="flex items-center gap-1.5 md:gap-3"
      aria-hidden
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 md:w-4 md:h-4 rounded-full border border-ink-700 ${
            active > i ? "bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" : "bg-ink-800"
          } transition-colors duration-150`}
        />
      ))}
    </div>
  );
}

function SpeedLines() {
  const lines = Array.from({ length: 7 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((_, i) => (
        <div
          key={i}
          className="speed-line"
          style={{
            top: `${(i + 1) * 10 + Math.random() * 4}%`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${2.6 + Math.random() * 1.5}s`,
            opacity: 0.25 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-950 scanlines"
    >
      {/* BG image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover mono-img opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/30 to-ink-950" />
      </div>

      <SpeedLines />

      {/* Top-left meta */}
      <div className="absolute top-[72px] sm:top-24 md:top-28 left-4 sm:left-6 md:left-10 z-10 flex items-center gap-2 md:gap-4">
        <StartLights />
        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-ink-300 uppercase">
          System · Ready
        </span>
      </div>

      {/* Top-right meta — hide on very small screens */}
      <div className="absolute top-[72px] sm:top-24 md:top-28 right-4 sm:right-6 md:right-10 z-10 text-right hidden sm:block">
        <div className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-ink-300 uppercase">
          42.2406° N · 8.7207° W
        </div>
        <div className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-ink-500 uppercase mt-1">
          Crew · Galicia / España
        </div>
      </div>

      {/* Centerpiece */}
      <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-4 sm:px-6 md:px-10 pt-28 sm:pt-32 md:pt-40 pb-28 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
          className="max-w-[1600px] mx-auto w-full"
        >
          <div className="flex items-center gap-3 mb-5 md:mb-8">
            <span className="w-8 md:w-10 h-px bg-white" />
            <span className="font-mono text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] text-ink-300 uppercase">
              Galicia · Desde 2020
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1
                data-testid="hero-headline"
                className="font-display uppercase tracking-tighter text-[22vw] sm:text-[18vw] lg:text-[11vw] xl:text-[10.5rem]"
              >
                <span className="block leading-[1.05]">RIDE</span>
                <span className="block leading-[1.05] mt-1 md:mt-2 pl-[8%] md:pl-[14%] flex items-center gap-2 md:gap-4">
                  <span className="hidden md:inline-block h-[0.7em] w-[3px] bg-white" />
                  N&rsquo;
                </span>
                <span
                  className="glitch-text block leading-[1.05] mt-1 md:mt-2"
                  data-text="NICE"
                >
                  NICE
                </span>
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 md:gap-6 lg:pb-8 mt-4 lg:mt-0">
              <img
                src={LOGO_URL}
                alt="Ride N' Nice"
                className="w-32 sm:w-36 md:w-44 h-auto opacity-95"
              />
              <p className="text-ink-200 max-w-sm text-sm md:text-base leading-relaxed">
                Somos una familia. Nos gustan los coches, las rutas largas, los
                viernes a las tantas y el ruido de un buen escape. Sin egos,
                sin postureo — solo carretera y gente que se respeta.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#galeria"
                  data-testid="hero-cta-galeria"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-2.5 bg-white text-black px-5 md:px-6 py-3 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase hover:bg-ink-100 transition-colors"
                >
                  Ver galería
                  <ArrowDown
                    size={14}
                    className="group-hover:translate-y-0.5 transition-transform"
                  />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-testid="hero-cta-wa"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 border border-white px-5 md:px-6 py-3 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors"
                >
                  <MessageCircle size={13} />
                  Únete
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-ink-700 bg-ink-950/80 backdrop-blur-md py-3 md:py-4 z-10">
        <div className="marquee-fade">
          <Marquee gradient={false} speed={60}>
            {TICKERS.concat(TICKERS).map((t, i) => (
              <span
                key={i}
                className="font-display uppercase text-lg sm:text-2xl md:text-3xl tracking-tight mx-5 md:mx-8 flex items-center gap-4 md:gap-8"
              >
                {t}
                <span className="inline-block w-2 h-2 md:w-2.5 md:h-2.5 rotate-45 bg-white" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Scroll cue (desktop only) */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-ink-300">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
