import { LOGO_URL, WHATSAPP_URL } from "../../lib/data";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-black text-ink-200 border-t border-ink-700"
    >
      <div className="checker h-2 opacity-80" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-14 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <img src={LOGO_URL} alt="Ride N' Nice" className="h-16 md:h-20 w-auto self-start" />
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-300 max-w-sm">
            Ride N' Nice · Familia · Desde 2020. Carretera, coches
            y gente buena.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3">
          <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-300 mb-4">
            Explora
          </h4>
          <ul className="flex flex-col gap-2 font-display text-xl uppercase tracking-tight">
            <li><a href="#sobre-nosotros" className="hover:text-white">Sobre nosotros</a></li>
            <li><a href="#galeria" className="hover:text-white">Galería</a></li>
            <li><a href="#merch" className="hover:text-white">Merch</a></li>
            <li><a href="#redes" className="hover:text-white">Redes</a></li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-4">
          <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-300 mb-4">
            Ride HQ
          </h4>
          <p className="text-ink-100">Galicia · España</p>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-ink-300 mt-2">
            @ridennicegz · IG / TikTok
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            data-testid="footer-wa-cta"
            className="inline-block mt-6 border border-white px-5 py-3 font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors"
          >
            Únete al WhatsApp →
          </a>
        </div>
      </div>

      <div className="border-t border-ink-700">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-500">
          <span>© {new Date().getFullYear()} Ride N' Nice · All rides reserved</span>
          <span>No ego · All love · Ride N´ nice</span>
        </div>
      </div>
    </footer>
  );
}
