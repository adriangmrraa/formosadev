# Tasks — Formosa.dev Web v3

Fase 4 del SDD. Orden de implementación incremental (Web v3.0 §28.6). Cada tarea: archivos probables, criterio de done, dependencia. Estado actual marcado.

## A. Tokens / layout / fonts / logo / header / footer

- [x] **A1** Tokens Tailwind v4 (`@theme`) en `globals.css` — ink/cream/lapacho/sun/lavender/peach + motion + reduced-motion. Done: tokens declarados, build OK.
- [x] **A2** `layout.tsx` metadata es-AR + Manrope + OG/twitter. Done.
- [x] **A3** Header + Footer (logo como texto `formosa.dev`, nav de secciones, fórmula institucional centralizada). Done.
- [ ] **A4** Sustituir texto por master variante 29 cuando exista el SVG/PNG. Bloqueado: asset pendiente.

## B. Hero

- [x] **B1** H1 idea madre + subcopy exacta + CTAs "Sumate a la comunidad" / "Ver próximo encuentro" + imagen territorial (Estación Formosa). Done.
- [ ] **B2** Motion: reveal blur→focus por palabra + marker orgánico (RevealText/HighlightMark). Pendiente (motion componentes).

## C. About / identity

- [x] **C1** Sección "Qué es" (H2 exacto + 2-3 párrafos + 7 pilares). Done.

## D. Próximo evento

- [x] **D1** Empty state "Estamos armando el próximo encuentro" + acciones. Done.
- [ ] **D2** EventCard con campos completos + estado (próximo/agotado/finalizado/cancelado) + "Reservar lugar". Pendiente (sin eventos confirmados).

## E. Personas

- [x] **E1** Empty state honesto de comunidad. Done.
- [ ] **E2** Galería/mosaico de perfiles (V1) → perfiles públicos (V2). Pendiente (sin perfiles).

## F. Proyectos (Hecho en Formosa)

- [x] **F1** Empty state + CTA "Ver qué están construyendo". Done.
- [ ] **F2** ProjectCard (3-6 destacados + ruta /proyectos). Pendiente.

## G. Eventos anteriores

- [x] **G1** Empty state honesto. Done.
- [ ] **G2** Slider/marquee de fotos+recaps con auto-scroll lento, drag, pause. Pendiente.

## H. Territorial CTA / mapa

- [x] **H1** Sección misión territorial: copy exacto + estados de localidad + CTAs "Quiero activar mi localidad" / "Ofrecer una sede" + imágenes. Done.
- [ ] **H2** LocalityMap interactivo con pins por estado. Pendiente.

## I. Aliados / sedes

- [x] **I1** Café Meetup/sedes (copy + CTA "Quiero recibir un meetup") + Aliados (separación semántica + CTA "Quiero colaborar"). Done.
- [ ] **I2** PartnerLogo con permiso + tratamiento monocromático. Pendiente (sin aliados).

## J. FAQ / CTA final

- [x] **J1** FAQ (9 preguntas mínimas) + CTA final "Entrar a la comunidad" + `#sumate`. Done.

## K. SEO / analytics / a11y / performance

- [x] **K1** Metadata, OG/twitter image, canonical, `lang="es-AR"`. Done.
- [ ] **K2** sitemap.xml + robots.txt + JSON-LD (Organization/Event). Pendiente.
- [ ] **K3** Analytics (eventos + funnels + UTM). Pendiente (proveedor por decidir).
- [ ] **K4** QA visual (capturas 390×844, 768×1024, 1440×900, ancha) + axe/Lighthouse. Pendiente.

## L. Páginas secundarias prioritarias

- [x] **L1** `/codigo-de-conducta` (reglas, permisos, prohibidos, consecuencias, formato). Done.
- [x] **L2** `/contacto` (canales verificados, email, fórmula institucional). Done.
- [ ] **L3** `/eventos`, `/proyectos`, `/personas`, `/recursos`, `/aliados`, `/localidades`, `/cafe-meetup` (fase 2/3).

## Refactor pendiente

- [ ] **R1** Extraer secciones de `page.tsx` a `src/components/sections/` (Web v3.0 §25: no toda la home en page.tsx; secciones testeables/removibles).

## Notas

- Las tareas marcadas `[x]` están implementadas y verificadas con build+lint.
- Los `[ ]` son fase 2/3 o dependen de contenido/assets reales (no de implementación).
- Verificación por tarea: `npm run build` limpio + revisar la sección en el HTML renderizado.
