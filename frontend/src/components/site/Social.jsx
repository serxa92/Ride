import { useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { ArrowUpRight } from "lucide-react";
import { SOCIALS, IMG, TICKERS } from "../../lib/data";

const PREVIEW = [IMG.gti, IMG.honda, IMG.crx, IMG.miata];

export default function Social() {
  const [hover, setHover] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="redes"
      data-testid="social-links-section"
      className="relative bg-ink-950 py-24 md:py-40 border-t border-ink-700 overflow-hidden"
      ref={ref}
      onMouseMove={onMove}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-12 md:mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300 block mb-6">
            § 05 / Conecta
          </span>
          <h2 className="font-display uppercase leading-[0.82] tracking-tighter text-6xl sm:text-7xl md:text-9xl">
            REDES
          </h2>
        </div>
        <p className="hidden md:block text-ink-300 max-w-xs text-sm">
          Por aquí publicamos las rutas antes que nadie, compartimos fotos y
          anunciamos quedadas. Dale follow.
        </p>
      </div>

      <ul
        data-testid="social-list"
        className="max-w-[1600px] mx-auto px-6 md:px-10 border-t border-ink-700"
      >
        {SOCIALS.map((s, i) => (
          <li
            key={s.id}
            data-testid={`social-${s.id}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            data-cursor="hover"
            className="group border-b border-ink-700 py-6 md:py-10 relative"
          >
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-between gap-6"
            >
              <div className="flex items-baseline gap-4 md:gap-6 overflow-hidden">
                <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-ink-300">
                  / 0{i + 1}
                </span>
                <span className="font-display uppercase leading-[0.85] tracking-tighter text-5xl sm:text-7xl md:text-[8rem] group-hover:[text-shadow:2px_2px_0_#fff,_-2px_-2px_0_#fff] transition-all duration-200 relative">
                  {s.label}
                </span>
              </div>

              <div className="flex items-center gap-4 md:gap-6 shrink-0">
                <span className="hidden md:inline font-mono text-xs tracking-[0.25em] uppercase text-ink-300">
                  {s.handle}
                </span>
                <span className="w-12 h-12 md:w-16 md:h-16 border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Floating image cursor preview (desktop only) */}
      {hover !== null && (
        <div
          className="pointer-events-none absolute hidden md:block transition-transform duration-200 z-30"
          style={{
            top: 0,
            left: 0,
            transform: `translate(${mouse.x - 130}px, ${mouse.y - 90}px)`,
          }}
          aria-hidden
        >
          <img
            src={PREVIEW[hover % PREVIEW.length]}
            alt=""
            className="w-[260px] h-[180px] object-cover mono-img border border-white"
          />
        </div>
      )}

      {/* Bottom marquee */}
      <div className="mt-16 md:mt-24 border-y border-ink-700 py-4">
        <div className="marquee-fade">
          <Marquee gradient={false} speed={50} direction="right">
            {TICKERS.concat(TICKERS).map((t, i) => (
              <span
                key={i}
                className="font-display uppercase text-xl md:text-2xl tracking-tight mx-8 flex items-center gap-6 text-ink-200"
              >
                {t}
                <span className="inline-block w-2 h-2 rotate-45 bg-ink-200" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
