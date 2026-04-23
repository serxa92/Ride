import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "../../lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FALLBACK = [
  {
    id: "evt-001",
    day: "17",
    month: "ENE",
    title: "Quedada Nocturna — Puerto",
    location: "Paseo Marítimo, Vigo",
    time: "22:00",
    type: "Meet",
  },
  {
    id: "evt-002",
    day: "08",
    month: "FEB",
    title: "Ruta Invernal — Sierra",
    location: "Ancares · Galicia",
    time: "09:30",
    type: "Route",
  },
  {
    id: "evt-003",
    day: "15",
    month: "MAR",
    title: "Track Day · Cabañeros",
    location: "Circuito de Cabañeros",
    time: "08:00",
    type: "Track",
  },
  {
    id: "evt-004",
    day: "26",
    month: "ABR",
    title: "Spring Meet — Rías Baixas",
    location: "Playa de Samil, Vigo",
    time: "17:00",
    type: "Meet",
  },
];

export default function Events() {
  const [events, setEvents] = useState(FALLBACK);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await axios.get(`${API}/events`);
        if (!cancel && res.data && Array.isArray(res.data.events)) {
          setEvents(res.data.events);
        }
      } catch (e) {
        // keep fallback
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const bgMap = [IMG.miata, IMG.gti, IMG.crx, IMG.meet, IMG.honda];

  return (
    <section
      id="eventos"
      data-testid="events-timeline-section"
      className="relative bg-ink-950 py-24 md:py-40 border-t border-ink-700 overflow-hidden"
    >
      {/* Hover background preview */}
      {hovered !== null && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-500"
        >
          <img
            src={bgMap[hovered % bgMap.length]}
            alt=""
            className="w-full h-full object-cover mono-img"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/40 to-ink-950" />
        </div>
      )}

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <div className="flex items-end justify-between mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300">
            § 04 / Calendario
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
            Season · 2026
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display uppercase leading-[0.82] tracking-tighter text-6xl sm:text-7xl md:text-9xl"
        >
          PRÓXIMOS<br />EVENTOS
        </motion.h2>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
        <ul
          data-testid="events-list"
          className="border-t border-ink-700"
        >
          {events.map((e, i) => (
            <li
              key={e.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-testid={`event-row-${e.id}`}
              data-cursor="hover"
              className="group grid grid-cols-12 items-center gap-4 md:gap-8 py-6 md:py-10 border-b border-ink-700 relative"
            >
              <div className="col-span-3 md:col-span-2 flex items-baseline gap-2">
                <span className="font-display text-5xl md:text-7xl leading-none tracking-tight">
                  {e.day}
                </span>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-ink-300">
                  {e.month}
                </span>
              </div>

              <div className="col-span-9 md:col-span-6">
                <h3 className="font-display uppercase tracking-tight text-2xl md:text-4xl leading-tight group-hover:translate-x-2 transition-transform duration-500">
                  {e.title}
                </h3>
                <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-ink-300 mt-2">
                  {e.location}
                </p>
              </div>

              <div className="col-span-6 md:col-span-2 font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-ink-200">
                {e.time}
              </div>

              <div className="col-span-6 md:col-span-2 flex justify-end">
                <span className="inline-flex items-center gap-2 border border-ink-700 px-3 py-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-200 group-hover:border-white group-hover:text-white transition-colors">
                  {e.type}
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
