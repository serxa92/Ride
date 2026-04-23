import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { LOGO_URL, WHATSAPP_URL } from "../../lib/data";

const LINKS = [
  { label: "SOBRE NOSOTROS", to: "#sobre-nosotros" },
  { label: "GALERÍA", to: "#galeria" },
  { label: "MERCH", to: "#merch" },
  { label: "REDES", to: "#redes" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink-950/70 border-b border-ink-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-5 gap-3">
        <a
          href="#top"
          data-testid="nav-logo"
          data-cursor="hover"
          className="flex items-center gap-3 group shrink-0"
        >
          <img
            src={LOGO_URL}
            alt="Ride N' Nice"
            className="h-7 md:h-10 w-auto"
          />
          <span className="hidden md:inline font-mono text-[10px] tracking-[0.3em] text-ink-300 uppercase">
            Est. 2020 / Crew
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.to}
              href={l.to}
              data-testid={`nav-link-${l.to.replace("#", "")}`}
              data-cursor="hover"
              className="font-mono text-[11px] tracking-[0.25em] text-ink-100 hover:text-white relative hover-underline pb-1"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            data-testid="nav-cta-wa"
            data-cursor="hover"
            className="group hidden sm:inline-flex items-center gap-2 border border-white px-4 md:px-5 py-2 md:py-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-mobile-toggle"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="nav-mobile-panel"
          className="lg:hidden bg-ink-950 border-t border-ink-700"
        >
          <div className="flex flex-col px-6 py-6 gap-4">
            {LINKS.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl sm:text-3xl uppercase tracking-tight"
                data-testid={`nav-mobile-link-${l.to.replace("#", "")}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 border border-white px-4 py-3 font-mono text-xs tracking-[0.25em] uppercase text-center"
              data-testid="nav-mobile-cta-wa"
            >
              <MessageCircle size={14} />
              Grupo de WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
