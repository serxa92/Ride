import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { ArrowDown } from "lucide-react";
import { LOGO_URL, HERO_BG, TICKERS } from "../../lib/data";

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
      className="flex items-center gap-2 md:gap-3"
      aria-hidden
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full border border-ink-700 ${
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
      className="relative min-h-screen w-full overflow-hidden bg-ink-950 scanlines"
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
      <div className="absolute top-24 md:top-28 left-6 md:left-10 z-10 flex items-center gap-4">
        <StartLights />
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-300 uppercase">
          System · Ready
        </span>
      </div>

      {/* Top-right meta */}
      <div className="absolute top-24 md:top-28 right-6 md:right-10 z-10 text-right">
        <div className="font-mono text-[10px] tracking-[0.3em] text-ink-300 uppercase">
          Lat 42.2406° N · Lon 8.7207° W
        </div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-ink-500 uppercase mt-1">
          Crew · Galicia / España
        </div>
      </div>

      {/* Centerpiece */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 md:pt-40 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
          className="max-w-[1600px] mx-auto w-full"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-white" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-ink-200 uppercase">
              Crew / Familia / Desde 2020
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1
                data-testid="hero-headline"
                className="font-display uppercase leading-[0.82] tracking-tighter text-[18vw] sm:text-[16vw] lg:text-[11vw] xl:text-[10.5rem]"
              >
                <span className="block">RIDE</span>
                <span className="block -mt-2 md:-mt-4 pl-[10%] md:pl-[14%] flex items-center gap-4">
                  <span className="hidden md:inline-block h-[0.9em] w-[3px] bg-white" />
                  N&rsquo;
                </span>
                <span className="glitch-text block -mt-2 md:-mt-4" data-text="NICE">
                  NICE
                </span>
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 lg:pb-8">
              <img
                src={LOGO_URL}
                alt="Ride N' Nice"
                className="w-36 md:w-44 h-auto opacity-95"
              />
              <p className="text-ink-200 max-w-sm text-sm md:text-base leading-relaxed">
                Somos una familia. Nos gustan los coches, las rutas largas, los
                viernes a las tantas y el ruido de un buen escape. Sin egos,
                sin postureo — solo carretera y gente que se respeta.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#galeria"
                  data-testid="hero-cta-galeria"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 bg-white text-black px-6 py-3 font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-ink-100 transition-colors"
                >
                  Ver galería
                  <ArrowDown
                    size={14}
                    className="group-hover:translate-y-0.5 transition-transform"
                  />
                </a>
                <a
                  href="#unete"
                  data-testid="hero-cta-join"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 border border-white px-6 py-3 font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors"
                >
                  Únete
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-ink-700 bg-ink-950/80 backdrop-blur-md py-4 z-10" data-testid="hero-marquee">
        <div className="marquee-fade">
          <Marquee
            gradient={false}
            speed={60}
          >
            {TICKERS.concat(TICKERS).map((t, i) => (
              <span
                key={i}
                className="font-display uppercase text-2xl md:text-3xl tracking-tight mx-8 flex items-center gap-8"
              >
                {t}
                <span className="inline-block w-2.5 h-2.5 rotate-45 bg-white" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-ink-300">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
