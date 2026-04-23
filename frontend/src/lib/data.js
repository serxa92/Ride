// Media URLs and curated content for Ride N' Nice landing page.

export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_67ad8016-375b-4928-aa2e-95dbbef62645/artifacts/7xwuddjp_image.png";

export const HERO_BG =
  "https://images.unsplash.com/photo-1733136372735-01712acce177?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwcmFjZSUyMHRyYWNrJTIwYXNwaGFsdHxlbnwwfHx8fDE3NzY5Nzc2NTF8MA&ixlib=rb-4.1.0&q=85";

export const IMG = {
  gti:
    "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/3esct8o4_imgi_24_649218687_18066629003658638_285689954559967077_n.jpg",
  honda:
    "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/52gppsd4_imgi_54_656334269_18071284472247230_2427745737114541830_n.jpg",
  crx:
    "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/ri29zmz6_imgi_26_627369271_18040260737729504_3447686699424907670_n.jpg",
  miata:
    "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/rbt3uzrp_imgi_41_584048082_4064844670404692_6848023895902328188_n.jpg",
  meet:
    "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/fli5fap1_imgi_20_648657963_18046550297734064_6525923687999584452_n.jpg",
};

// Carousel — rutas
export const ROUTES = [
  {
    id: "r-01",
    code: "R/01",
    title: "Ruta de los Miradores",
    region: "Rías Baixas · Galicia",
    distance: "142 KM",
    duration: "3H 20M",
    difficulty: "MEDIA",
    date: "17.01.2026",
    image: IMG.miata,
    description:
      "Asfalto mojado, niebla y curvas infinitas junto al Atlántico. La ruta que nació en una noche cualquiera y se volvió tradición.",
  },
  {
    id: "r-02",
    code: "R/02",
    title: "Subida a la Sierra",
    region: "Ancares · Lugo",
    distance: "96 KM",
    duration: "2H 10M",
    difficulty: "ALTA",
    date: "08.02.2026",
    image: IMG.gti,
    description:
      "Rampa técnica, viraje tras viraje. Pocas rectas, mucha concentración. Café caliente arriba, adrenalina abajo.",
  },
  {
    id: "r-03",
    code: "R/03",
    title: "Ruta Costera Nocturna",
    region: "Paseo Atlántico · Vigo",
    distance: "58 KM",
    duration: "1H 30M",
    difficulty: "BAJA",
    date: "24.02.2026",
    image: IMG.crx,
    description:
      "Salida al atardecer, faros encendidos, reflejo del mar. Kilómetros lentos para que las fotos salgan bien.",
  },
  {
    id: "r-04",
    code: "R/04",
    title: "Amanecer en el Puente",
    region: "Puente de Rande",
    distance: "38 KM",
    duration: "1H 00M",
    difficulty: "BAJA",
    date: "15.03.2026",
    image: IMG.honda,
    description:
      "Salir antes que el sol. Ver la ría teñirse de naranja mientras los motores se calientan en formación.",
  },
  {
    id: "r-05",
    code: "R/05",
    title: "Meet Spring Rías",
    region: "Playa de Samil",
    distance: "— KM",
    duration: "4H +",
    difficulty: "MEET",
    date: "26.04.2026",
    image: IMG.meet,
    description:
      "Sin ruta fija. Llegar, aparcar, abrir capós y dejar que el aire salado haga el resto. La familia al completo.",
  },
];

// Galería — coches
export const GALLERY = [
  { id: "g-1", image: IMG.gti, tag: "VW GOLF GTI MK6", spec: "LOW / OEM+" },
  { id: "g-2", image: IMG.honda, tag: "HONDA ACCORD CL7", spec: "JDM / GOLD" },
  { id: "g-3", image: IMG.crx, tag: "HONDA DEL SOL", spec: "STANCE / SLAM" },
  { id: "g-4", image: IMG.miata, tag: "MAZDA MX-5 NB", spec: "WIDEBODY / 1%" },
  { id: "g-5", image: IMG.meet, tag: "CREW LINE-UP", spec: "MEET · FAMILY" },
];

// Marquee tickers
export const TICKERS = [
  "RIDE N' NICE",
  "SINCE 2020",
  "FAMILY FIRST",
  "LOW LIFE",
  "STAY NICE",
  "NO EGO · ALL LOVE",
  "RUN FLAT OUT",
];

// Social links
export const SOCIALS = [
  { id: "ig", label: "INSTAGRAM", handle: "@ride.n.nice", href: "https://instagram.com" },
  { id: "tt", label: "TIKTOK", handle: "@ride.n.nice", href: "https://tiktok.com" },
  { id: "yt", label: "YOUTUBE", handle: "Ride N' Nice", href: "https://youtube.com" },
  { id: "wa", label: "WHATSAPP", handle: "Crew chat", href: "#unete" },
];

// Stats counters
export const STATS = [
  { value: 48, label: "MIEMBROS" },
  { value: 127, label: "RUTAS HECHAS" },
  { value: 22, label: "QUEDADAS / AÑO" },
  { value: 2020, label: "DESDE" },
];
