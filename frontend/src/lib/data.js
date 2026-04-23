// Media URLs and curated content for Ride N' Nice landing page.

export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/c7fnw3j3_Captura%20de%20pantalla%202026-04-23%20231952.png";

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

// Galería — fotos reales del crew
export const GALLERY = [
  {
    id: "g-01",
    code: "F/01",
    image: IMG.miata,
    title: "Yellow Stance",
    caption: "Mazda MX-5 NB saliendo con lluvia.",
  },
  {
    id: "g-02",
    code: "F/02",
    image: IMG.gti,
    title: "GTI MK6",
    caption: "Negro sobre adoquín, clásico OEM+.",
  },
  {
    id: "g-03",
    code: "F/03",
    image: IMG.honda,
    title: "Accord JDM",
    caption: "Ruedas doradas, negro profundo, vista al mar.",
  },
  {
    id: "g-04",
    code: "F/04",
    image: IMG.crx,
    title: "Del Sol Slam",
    caption: "Slammed y elegante en una quedada cualquiera.",
  },
  {
    id: "g-05",
    code: "F/05",
    image: IMG.meet,
    title: "Crew Line-Up",
    caption: "La familia al completo en concentración.",
  },
];

// Merchandising
export const MERCH_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScLt7G-3DQ-7-OnGTeiq7hRPnMfpH_2hjzwQu-5tlHtwvg_Ug/viewform";

export const MERCH = [
  {
    id: "m-patch",
    name: "Parches bordados",
    tagline: "Ride N' Nice · iron-on",
    image:
      "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/lupu62sp_Captura%20de%20pantalla%202026-04-23%20232330.png",
  },
  {
    id: "m-stickers",
    name: "Pegatinas / Stickers",
    tagline: "Varios colores · pack",
    image:
      "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/22fdnkdb_Captura%20de%20pantalla%202026-04-23%20232321.png",
  },
  {
    id: "m-caps",
    name: "Gorras",
    tagline: "Black · White · Trucker",
    image:
      "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/9bqnk776_Captura%20de%20pantalla%202026-04-23%20232312.png",
  },
  {
    id: "m-jacket",
    name: "Softshell Jacket",
    tagline: "Edición oficial crew",
    image:
      "https://customer-assets.emergentagent.com/job_racing-routes/artifacts/b1m8fkj7_Captura%20de%20pantalla%202026-04-23%20232258.png",
  },
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
export const WHATSAPP_URL = "https://chat.whatsapp.com/FliypGmR1S80FGFYvywcQE";

export const SOCIALS = [
  {
    id: "ig",
    label: "INSTAGRAM",
    handle: "@ridennicegz",
    href: "https://instagram.com/ridennicegz",
  },
  {
    id: "tt",
    label: "TIKTOK",
    handle: "@ridennicegz",
    href: "https://www.tiktok.com/@ridennicegz",
  },
  {
    id: "wa",
    label: "WHATSAPP",
    handle: "Únete al grupo",
    href: WHATSAPP_URL,
  },
];

// Stats — values can be numeric (animated counter) or string (shown as-is)
export const STATS = [
  { value: 660, label: "MIEMBROS" },
  { value: 3, label: "CONCENTRACIONES", sub: "+ 4ª EN 2026" },
  { value: "FINDES", label: "QUEDADAS" },
  { value: 2020, label: "DESDE" },
];
