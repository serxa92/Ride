# Ride N' Nice — Landing Page

## Original Problem Statement
"Quiero hacer una landing de un grupo de gente apasionada por los coches, al final somos una familia, me gustaría que tuviese un apartado de RUTAS con un carrusel de fotos que te iré pasando, y alguna seccion que se te ocurra, temática racing con efectos y animaciones chulas, a ver que puedes hacer."

## User Choices
- **Name**: Ride N' Nice
- **Palette**: strict monochrome — black & white
- **Sections**: Hero, Sobre Nosotros (familia), Rutas (carrusel de 5 fotos), Galería de Coches, Próximos Eventos, Redes Sociales, Únete al Grupo
- **Language**: Spanish
- **Photos**: 5 real user-provided car photos (GTI, Accord, Del Sol, MX-5, Meet)

## Architecture
- **Backend**: FastAPI + MongoDB (`/app/backend/server.py`)
  - `GET /api/` — health
  - `GET /api/events` — curated upcoming events
  - `POST /api/join` — join crew form (persists to `join_requests` collection)
  - `GET /api/join` — list join requests
- **Frontend**: React 19 + Tailwind + shadcn/ui + framer-motion + react-fast-marquee
  - Single-page landing at `/`
  - Components in `/app/frontend/src/components/site/`
  - Data model in `/app/frontend/src/lib/data.js`
  - Custom cursor, grain overlay, glitch text, start lights, speed lines, marquees

## Implemented — 2025-12
- **Hero** (cinematic): massive Anton display type "RIDE N' NICE" with glitch effect on "NICE", start-lights animation, speed lines, B&W hero BG, logo reveal, coords meta, dual CTA (Ver rutas / Únete), scrolling marquee with TICKERS
- **Sobre Nosotros** (La Familia): tacho RPM rule (0→8k redline), massive "LA FAMILIA" vertical text, 4 animated stat counters, editorial copy, feature image with overlay
- **Rutas** (Embla carousel, 5 cards): each card has code (R/01…), grayscale image, difficulty tag, title, region, 3-col specs (Distancia / Duración / Fecha), description, prev/next arrow buttons, dot indicators
- **Galería** (Bento grid, 5 tiles): 1 big + 2 small + 2 wide, hover zoom, checker flag corner, tag + spec overlay
- **Próximos Eventos** (timeline): 4 events from `/api/events` with fallback; hover reveals faint B&W image background, event rows translate on hover
- **Redes Sociales**: massive typographic links (Instagram / TikTok / YouTube / WhatsApp) with floating image cursor preview on desktop; bottom marquee
- **Únete** (join form): Name, Email, Coche, Instagram, Message; underline-only inputs; submit button with loading → "BIENVENIDO A LA CREW" success state; Sonner toast feedback; server-side validation
- **Footer**: checker flag stripe, nav, crew HQ, final join CTA
- **Nav**: fixed top, backdrop-blur on scroll, mobile panel with hamburger
- **Global**: custom cursor (dot + ring), grain overlay, scanlines, selection color, Anton/Manrope/JetBrains Mono fonts

## Testing
- Backend: 6/6 tests pass (root, events shape, join CRUD, validation, no `_id` leak)
- Frontend: All critical `data-testid`s present; carousel cycles; form submits success + toast; mobile nav works

## Backlog (P1/P2)
- P1: Admin view of `/api/join` submissions (simple password-gated page)
- P1: Detail page per route (map, photos, comments)
- P2: Member profiles / hall of cars
- P2: Calendar export (.ics) for events
- P2: Photo upload for members (S3/Cloudflare R2)
- P2: Real IG feed integration

## Next Tasks
- Confirm with user: real social handles, real event dates/locations, real stats
- Optionally swap `/api/events` to dynamic (admin-created) events
