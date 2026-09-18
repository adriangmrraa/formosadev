# Design Spec — Formosa.dev Web v3

Fuente: Web v3.0 §8-11, §14-16, §22-23, §30.

## Dirección general

Sobrio, minimalista, editorial, contemporáneo. Alto contraste, mucho espacio negativo. El diseño no se demuestra llenando la pieza de recursos; se demuestra usando pocos recursos reconocibles.

## Tokens (Web v3.0 §14.1)

```
--color-ink:      #0F172A   /* base oscura, contraste, tecnología */
--color-cream:    #FFF8F5   /* fondo humano principal */
--color-lapacho:  #FF2B8A   /* rosa lapacho, identidad y acento */
--color-sun:      #FFC31A   /* amarillo flor/sol, energía */
--color-lavender: #D9A7F5   /* secundario */
--color-peach:    #FFD6C1   /* secundario */
--color-text-muted: derivado accesible sobre crema/ink
--space-*        escala consistente
--radius-*       3–4 niveles máximo
--shadow-*       2 niveles sutiles máximo
--motion-fast|normal|slow · --ease-standard|editorial
```

Regla: una base neutra dominante + 1 acento principal + 1 secundario eventual. **No** emerald como color de marca principal.

## Fondos

Predominio crema/blanco cálido para comunidad y contenido. Ink para secciones de alto contraste (manifiesto, cierre, misión territorial). Rosa/amarillo como acento, highlight, botón o superficie puntual, nunca fondo continuo de toda la app.

## Tipografía (Web v3.0 §8.3)

- UI/cuerpo: **Manrope** (fallback Inter/system-ui).
- Display: grotesca/condensada fuerte para H1/H2 editoriales, sin abusar.
- El wordmark es un asset: **jamás reconstruirlo tipográficamente**.
- Jerarquía extrema pero limpia: H1 fuerte → párrafo de soporte corto → CTA claro.

## Logo (Web v3.0 §8.4)

Solo **master variante 29** y versiones autorizadas, a escala institucional, como firma (no compite). Isotipo solo para favicon/avatar. Área de seguridad. Mientras el master no esté exportado, marca de texto `formosa.dev`.

## UI (Web v3.0 §8.5)

- No carditis. Evitar grids de 12 tarjetas idénticas para conceptos abstractos.
- Cards solo cuando representan objetos reales (evento, proyecto, persona, recurso, oportunidad).
- Radio moderado (no "rounded-3xl SaaS"). Sombras casi inexistentes; separar con espacio, contraste o borde fino.
- Iconos simples y geométricos. Un bloque = una función. Mobile first.

## Layout (Web v3.0 §14.2)

Container de lectura ~1200–1280 px. Texto largo 60–75 caracteres/línea. Breakpoints por comportamiento, no por dispositivo. Grid de 12 columnas opcional en desktop; colapsa en mobile. Gutters amplios.

## Componentes mínimos (Web v3.0 §14.3)

Button, LinkButton, Header, MobileNav, SectionHeading, HighlightMark, RevealText, EditorialImage, EventCard, ProjectCard, PersonCard, PartnerLogo, Marquee, Slider, LocalityMap, StatusBadge, EmptyState, FAQAccordion, Footer, Modal/Sheet, FormField, Toast/InlineFeedback. Todos con estados hover/focus/disabled/loading/error.

## Motion (Web v3.0 §10)

Carácter humano/editorial/táctil, nunca "demo reel". Primitivas: A) reveal blur→focus H1/H2 (450–900 ms); B) marker/highlight orgánico (700–1200 ms, una vez); C) fade + translateY 12–28 px (350–650 ms); D) foto editorial opacity + scale 0.97→1; E) logo cycle lento (~3 s); F) slider continuo lento con drag y pause; G) hover elevación 2–4 px; H) map pins escalonados, sin pulsos infinitos.
- `prefers-reduced-motion` reduce/elimina blur, auto-rotation, parallax y desplazamientos continuos.
- Nada crítico depende de hover. Slider operable con teclado o con alternativa. No bloquear scroll.
- Animar `transform`/`opacity`. No WebGL/domo above-the-fold. Reservar altura (evitar CLS).

## Imagen y territorio (Web v3.0 §9)

Regla madre: **ESTILIZAR FORMOSA SÍ; INVENTAR FORMOSA NO.** Conservar geografía/hitos/morfología de lugares reales. Priorizar fotos reales, gente, notebooks/pizarras, lapacho/Costanera/río. Evitar stock corporativo, renders sci-fi, paisajes sin relación. No reutilizar imágenes que no encajen con el mensaje.

## Accesibilidad (Web v3.0 §16)

WCAG 2.2 AA: contraste AA, teclado completo, focus visible, landmarks, un H1, jerarquía de headings, alt útil, labels reales + aria-describedby, no color como único indicador, reduced motion, links externos identificables, foco en modales, `lang="es-AR"`.

## Sección territorial (Web v3.0 §22)

Mapa = visualización del sistema, no decoración. Estados internos 0–9; en front simplificar: "Buscando referente", "Comunidad en formación", "Actividad local", "Comunidad activa", "Camino al hackathon". Ficha de localidad: referentes, próximas actividades, proyectos, sedes, CTA. No ranking de localidades. Alternativa lista/accordion para mobile.

## Anti-patterns prohibidos (Web v3.0 §30)

Fondo negro+verde terminal; glassmorphism en exceso; bento grid por defecto; gradientes azul/violeta genéricos; partículas/3D sin relación; hero video pesado; counters no auditables; logos "de prestigio" sin vínculo; 5 CTAs equivalentes en el hero; stock corporativo; paisaje inventado; copy grandilocuente; página centrada en un workshop; founder como protagonista; scroll-jacking; animaciones que ilegibilizan; esconder info operativa de eventos.
