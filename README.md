# Ride N' Nice
> *Ride together, stay family.*
Sitio web oficial de **Ride N' Nice**, una crew de coches con estética editorial / racing zine en estricto blanco y negro. Este repositorio contiene tanto el **frontend** (React + Tailwind + shadcn/ui) como el **backend** (FastAPI + MongoDB) que dan vida al proyecto.

---

## ✦ Stack
**Frontend**
- React 19 (Create React App + CRACO)
- Tailwind CSS 3 + `tailwindcss-animate`
- shadcn/ui sobre Radix UI
- Framer Motion (animaciones / reveals)
- Embla Carousel (sección *Rutas*)
- React Fast Marquee (texto desplazante)
- React Hook Form + Zod (validación de formularios)
- Axios (cliente HTTP)
- React Router DOM 7

**Backend**
- FastAPI 0.110 + Uvicorn
- MongoDB vía Motor (driver async)
- Pydantic v2 (modelos y validación)
- python-dotenv (configuración)

**Tooling**
- Yarn 1.22 (gestor de paquetes del frontend)
- Pytest, Black, isort, Flake8, Mypy (backend)

---

## ✦ Estructura del repositorio
```
Ride/
├── backend/                # API FastAPI
│   ├── server.py           # Punto de entrada de la API (rutas + modelos)
│   ├── requirements.txt
│   └── tests/
├── frontend/               # SPA React (CRA + CRACO)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── site/       # Hero, About, Gallery, Nav, Footer, Social, Merch, Cursor
│   │   │   └── ui/         # Componentes shadcn/ui
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── craco.config.js
├── tests/                  # Tests end-to-end
├── design_guidelines.json  # Guía de diseño (paleta, tipografía, secciones)
├── test_result.md          # Protocolo y registro de pruebas
└── README.md
```

---

## ✦ Identidad visual
El diseño sigue el archetype **Swiss & High-Contrast**: monocromático puro, tipografía ultra-condensada, *bento layouts* asimétricos y tratamiento `grayscale + contrast-125` sobre todas las imágenes.

| Token              | Valor       |
|--------------------|-------------|
| `primary_black`    | `#050505`   |
| `pure_black`       | `#000000`   |
| `dark_gray`        | `#1A1A1A`   |
| `medium_gray`      | `#666666`   |
| `light_gray`       | `#E5E5E5`   |
| `pure_white`       | `#FFFFFF`   |

**Tipografías**
- Headings: `Anton` (ultra-condensed)
- Body: `Manrope`
- Mono / stats: `JetBrains Mono`

**Reglas clave**
- Solo blanco y negro. Sin acentos de color.
- Bordes gruesos (`border-b-2` / `border-b-4`) y esquinas siempre rectas (`rounded-none`).
- Hover invertido en botones y cards.
- Overlay global de grano + scroll suave (Lenis-style) + reveals con Framer Motion.

Detalles completos en `design_guidelines.json`.

---

## ✦ Secciones del sitio
1. **Hero** — Logo central, video/imagen oscurecida y marquee *RIDE N' NICE • FAMILY • SINCE 20XX*.
2. **Sobre Nosotros / La Familia** — Layout asimétrico con texto vertical y editorial.
3. **Rutas** — Carrusel con tarjetas (distancia, fecha, dificultad).
4. **Galería de Coches** — Bento/masonry con tags brutalist (`Honda CRX / Stance`, etc.).
5. **Próximos Eventos** — Timeline con hover que revela imagen/mapa.
6. **Redes Sociales** — Tipografía masiva con efectos hover.
7. **Únete a la Crew** — Formulario brutalista que envía a `POST /api/join`.

---

## ✦ Puesta en marcha
### Requisitos previos
- Node.js ≥ 18 y Yarn 1.22+
- Python ≥ 3.10
- MongoDB en local (o cualquier instancia accesible vía URI)

### 1. Backend
```bash
cd backend
python -m venv .venv
# Windows
.\.venv\Scripts\Activate.ps1
# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt
```

Crea un fichero `backend/.env`:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=ride_n_nice
CORS_ORIGINS=http://localhost:3000
```

Arranca la API:
```bash
uvicorn server:app --reload --port 8000
```

La API queda servida en `http://localhost:8000` con prefijo `/api`. Documentación interactiva en `http://localhost:8000/docs`.

### 2. Frontend
```bash
cd frontend
yarn install
```

Crea un `frontend/.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

Arranca el dev server:
```bash
yarn start
```

Disponible en `http://localhost:3000`.

### Build de producción
```bash
cd frontend
yarn build
```

El bundle optimizado se genera en `frontend/build/`.

---

## ✦ API
Todas las rutas cuelgan del prefijo `/api`.

| Método | Ruta            | Descripción                                          |
|--------|-----------------|------------------------------------------------------|
| GET    | `/`             | Health check / mensaje de bienvenida.                |
| GET    | `/events`       | Listado curado de próximos eventos de la crew.       |
| POST   | `/status`       | Registra un *status check* (`client_name`).          |
| GET    | `/status`       | Devuelve los últimos status checks.                  |
| POST   | `/join`         | Crea una solicitud para unirse a la crew.            |
| GET    | `/join`         | Lista las solicitudes recibidas (orden descendente). |

### Ejemplo — `POST /api/join`
```json
{
  "name": "Sergio",
  "email": "sergio@example.com",
  "car": "Honda CRX EF8",
  "instagram": "@sergio",
  "message": "Quiero rodar con la familia."
}
```

Respuesta `201`:
```json
{
  "id": "9b6c0b7a-...",
  "name": "Sergio",
  "email": "sergio@example.com",
  "car": "Honda CRX EF8",
  "instagram": "@sergio",
  "message": "Quiero rodar con la familia.",
  "created_at": "2026-04-25T09:15:24+00:00"
}
```

---

## ✦ Variables de entorno
**backend/.env**

| Variable        | Obligatoria | Descripción                                    |
|-----------------|-------------|------------------------------------------------|
| `MONGO_URL`     | Sí          | URI de conexión a MongoDB.                     |
| `DB_NAME`       | Sí          | Nombre de la base de datos.                    |
| `CORS_ORIGINS`  | No          | Orígenes permitidos separados por coma (`*`).  |

**frontend/.env**

| Variable                | Obligatoria | Descripción                              |
|-------------------------|-------------|------------------------------------------|
| `REACT_APP_BACKEND_URL` | Sí          | URL base de la API (sin `/api` final).   |

---

## ✦ Scripts útiles
**Frontend**
```bash
yarn start     # Dev server con HMR
yarn build     # Build de producción
yarn test      # Suite de tests CRA
```

**Backend**
```bash
uvicorn server:app --reload   # Dev server
pytest                         # Tests
black . && isort .             # Formato
flake8 .                       # Lint
mypy .                         # Type-check
```

---

## ✦ Testing
El protocolo y el estado de las pruebas se mantienen en `test_result.md`. Los tests E2E viven en `tests/` y los reportes en `test_reports/`.

---

## ✦ Contribuir
1. Crea una rama desde `main` (`feat/...`, `fix/...`).
2. Sigue las reglas de diseño: monocromo estricto, sin colores, `grayscale contrast-125` en imágenes, esquinas rectas.
3. Añade `data-testid` a los elementos interactivos (ver `design_guidelines.json`).
4. Asegúrate de que el lint/format pasa antes de abrir PR.

---

## ✦ Licencia
Todos los derechos reservados © Ride N' Nice. Uso interno de la crew.
