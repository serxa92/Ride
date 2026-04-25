import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IMG, STATS } from "../../lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function Counter({ value }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const last = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = value;
    const fromVal = last.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(fromVal + (target - fromVal) * eased));
            if (p < 1) requestAnimationFrame(tick);
            else last.current = target;
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
  return <span ref={ref}>{n}</span>;
}

function LiveDot() {
  return (
    <span className="relative inline-flex w-2 h-2 ml-1" aria-hidden>
      <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-70" />
      <span className="relative inline-block w-2 h-2 rounded-full bg-white" />
    </span>
  );
}

export default function About() {
  const [liveMembers, setLiveMembers] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    let alive = true;
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/community/stats`);
        if (!alive) return;
        if (typeof res.data?.members === "number") setLiveMembers(res.data.members);
        if (res.data?.updated_at) setUpdatedAt(res.data.updated_at);
      } catch (e) {
        // keep fallback STATS values
      }
    };
    fetchStats();
    const id = setInterval(fetchStats, 60000); // refresh every minute
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const fmtUpdated = updatedAt
    ? new Date(updatedAt).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

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
          className="grid grid-cols-2 md:grid-cols-4 border border-ink-700 divide-x divide-y md:divide-y-0 divide-ink-700"
        >
          {STATS.map((s, idx) => {
            const isNumber = typeof s.value === "number";
            const isMembersCard = idx === 0;
            const liveValue =
              isMembersCard && typeof liveMembers === "number"
                ? liveMembers
                : null;
            const displayValue = isNumber
              ? liveValue !== null
                ? liveValue
                : s.value
              : s.value;
            return (
              <div
                key={s.label}
                data-testid={`about-stat-${s.label.toLowerCase()}`}
                className="bg-ink-950 p-5 md:p-10 flex flex-col gap-2 md:gap-3 relative"
              >
                <span className="font-display text-[42px] sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight flex items-start gap-1.5">
                  {isNumber ? <Counter value={displayValue} /> : displayValue}
                  {isMembersCard && liveValue !== null && (
                    <span className="mt-3 md:mt-5">
                      <LiveDot />
                    </span>
                  )}
                </span>
                <span className="font-mono text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase text-ink-300 flex items-center gap-2">
                  {s.label}
                  {isMembersCard && liveValue !== null && (
                    <span
                      data-testid="about-stat-live-badge"
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-white/40 text-white text-[8px] md:text-[9px]"
                    >
                      LIVE
                    </span>
                  )}
                </span>
                {s.sub && (
                  <span className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-ink-500">
                    {s.sub}
                  </span>
                )}
                {isMembersCard && fmtUpdated && (
                  <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-ink-500">
                    Actualizado · {fmtUpdated}
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
