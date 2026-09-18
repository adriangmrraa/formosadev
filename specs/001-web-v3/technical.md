# Technical Spec — Formosa.dev Web v3

Fuente: Web v3.0 §12-13, §17-18, §25-27, §32.

## Stack (Web v3.0 §13)

- Next.js App Router + TypeScript (instalado: Next 16.3.5, React 19.2.8, TS 5).
- Tailwind CSS v4 CSS-first (tokens `@theme` en `globals.css`).
- Supabase/PostgreSQL cuando se habilite contenido dinámico/auth (futuro).
- n8n para automatizaciones (formularios, onboarding, sync Luma) — futuro.
- Vercel para web pública.
- Integraciones externas desacopladas vía services/adapters (no acoplar UI a Luma/Forms/Sheets).
- MVP: contenido estático tipado en `src/lib/content.ts` con interfaces compatibles con el modelo futuro.

## Estructura (Web v3.0 §25)

```
src/app/         → page.tsx, codigo-de-conducta/, contacto/, (eventos|proyectos|personas|recursos|localidades|aliados|cafe-meetup en fase 2/3)
src/components/  → Header, Footer, sections/ (extraer secciones de page.tsx)
src/lib/         → types.ts, content.ts, seo/, analytics/, integrations/
src/public/      → assets/ (brand/, territory/, community/)
```

Separar componentes de dominio de UI. No toda la home en `page.tsx`: cada sección testeable y removable.

## Modelo de datos (Web v3.0 §12)

Entidades: `Event`, `Person`, `Project`, `Locality`, `Venue`, `Organization`, `Resource`, `Opportunity`, `SentinelApplication`, `VenueApplication`. Campos exactos en el doc (§12). En `src/lib/types.ts` ya están tipados los que usa el MVP (Channel, FaqItem, Pillar, ConductRuleSet, InstitutionalCopy); extender con las entidades completas cuando llegue el contenido dinámico.

## Boundaries server/client (Web v3.0 §26)

- SSR/SSG para todo contenido público indexable (eventos, proyectos, personas, copy institucional presentes en HTML inicial).
- Client components solo donde hay interacción real (menú móvil, slider, mapa interactivo). Hoy el MVP es 100% server (no hay interacción que lo exija).
- Imágenes con `next/image` optimizadas. Visualizaciones pesadas hidratadas al entrar en viewport.

## Rutas

MVP implementado: `/`, `/codigo-de-conducta`, `/contacto`. Fase 2/3: `/eventos`, `/proyectos`, `/personas`, `/recursos`, `/aliados`, `/localidades`, `/cafe-meetup` (según product.md).

## SEO / Discovery / AIO (Web v3.0 §17)

- Title home: "Formosa.dev — Comunidad tecnológica de Formosa". Description y canonical en layout.
- Open Graph con imagen propia de alto contraste (`/assets/hero-estacion.jpg`).
- Structured data: `Organization`/`Nonprofit` (nunca "Foundation" hasta personería); `Event` por evento; `FAQPage` solo si cumple políticas.
- sitemap.xml y robots.txt. "last updated" en recursos cambiantes. Lenguaje preciso sobre relaciones con terceros.

## Analytics (Web v3.0 §18)

Eventos mínimos (lista en product.md §Métricas). UTM en campañas. Privacidad/consentimiento según herramienta. Proveedor por decidir (GA4/PostHog/Plausible) — out of scope para MVP, gatea instrumentación futura.

## Env vars / integraciones

MVP no requiere env vars. Futuro: Supabase URL/key, Luma, n8n webhooks, analytics id — todos vía `process.env`, nunca hardcode.

## Performance budget (Web v3.0 §27)

LCP < 2.5 s (mobile red media), CLS < 0.1, INP < 200 ms. Imágenes AVIF/WebP con `sizes` correcto. Fuentes self-hosted, preload solo de pesos usados. Lazy-load de galerías/mapas. Hero sin video autoplay pesado. No sacrificar identidad por Lighthouse 100.

## Tests / verificación

Sin test runner instalado (strict TDD no aplica). Verificación = `npm run build` + `npm run lint` + QA visual (Fase 6) + functional QA (Fase 7, Playwright/axe/Lighthouse cuando se agregue tooling).
