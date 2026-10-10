# DESIGN.md — Formosa.dev (sitio web)

> Design system oficial de la landing de Formosa.dev. Refleja el estado real del
> código en `src/`. La fuente de verdad de la marca es el
> `Formosa.dev — Manual de Marca Maestro Unificado v2.4` (§6 identidad visual,
> §14 aplicación digital, §18 do/don't, §35 sistema visual y UI editorial).
>
> Este documento describe la disciplina visual del sitio. No cambia la marca:
> mantiene los hex de la paleta, la tipografía Manrope, el logo y el motion
> editorial.

---

## Overview — la regla central

La landing es **editorial y territorial**, no un dashboard. El sistema se apoya en
una sola disciplina:

- **Crema es el lienzo, ink es la voz, lapacho es el acento de conversión.** El
  rosa lapacho aparece poco y siempre para lo importante: el CTA que convierte.
- **Un solo accent por sección.** Como máximo un botón lapacho por sección (el de
  conversión clave). Todo otro CTA es `primary` (ink) o `secondary` (outline).
- **Elevación por tinte + hairline 1px.** Sin sombras en el chrome (header,
  footer, nav, cards, botones). La única excepción es el overlay del diálogo de
  comunidad.
- **Una idea principal por bloque** (manual §35.1). Se evita la "carditis": los
  contenedores existen solo cuando organizan información de verdad.
- **Contraste alto, espacio negativo, jerarquía fuerte** (manual §35.2).

---

## Brand

Fuente de verdad: **Manual de Marca Maestro Unificado v2.4**.

### Paleta (manual §6)

| Token | Nombre | Hex | Uso |
|---|---|---|---|
| `ink` | Norte / Ink | `#0F172A` | Base oscura, texto, superficies `dark`, CTAs `primary` |
| `crema` | Crema tierra | `#FFF8F5` | Fondo principal del sitio |
| `crema-soft` | Crema suave | `#FFFDFB` | Secciones alternas / tinte de elevación |
| `lapacho` | Rosa lapacho | `#FF2B8A` | Acento distintivo: CTA de conversión, marcador `.highlight` |
| `lapacho-deep` | Lapacho profundo | `#D61F74` | Hover del acento |
| `sol` | Amarillo flor / sol | `#FFC31A` | Energía puntual (marcador de texto) |
| `lavanda` | Lavanda horizonte | `#D9A7F5` | Atmósfera (secundario) |
| `durazno` | Durazno atardecer | `#FFD6C1` | Soporte cálido (secundario) |

**Proporción obligatoria:** 60–70% neutros + 20–30% rosa lapacho + 5–10% acentos.
No se usan todos los colores en una misma pieza.

### Tipografía

- **Primaria:** `Manrope`, cargada con `next/font/google` (`--font-manrope`).
- **Fallback:** `Inter`, `system-ui`, `-apple-system`.
- El wordmark `formosa.dev` es un activo gráfico; no se reconstruye con estas
  fuentes. El logo se usa siempre sobre `logo-formosadev.webp` (variante 29).

### Tono

- **es-AR, voseo, registro neutro.** Los textos hablan de comunidad, no de
  tecnología por tecnología.
- Se entiende para no developers (manual §17). Sin emojis decorativos.
- Código, identificadores y comentarios en inglés.

---

## Tokens

Dos capas. Las **primitivas** (`--color-ink`, `--color-lapacho`, …) son los hex de
marca; las **semánticas** nombran la intención y son las que usan los componentes.
Todo vive en `src/app/globals.css` dentro de `@theme`.

### Tokens semánticos de superficie, borde y texto

| Token CSS | Valor | Clase Tailwind | Uso |
|---|---|---|---|
| `--color-canvas` | `#FFF8F5` (crema) | `bg-canvas`, `text-canvas` | Fondo de página |
| `--color-canvas-soft` | `#FFFDFB` (crema-soft) | `bg-canvas-soft` | Sección alterna / tinte de elevación |
| `--color-surface` | `#FFFFFF` (blanco) | `bg-surface` | Cards sobre crema |
| `--color-hairline` | ink @ 10% (`rgba(15,23,42,0.10)`) | `border-hairline` | Separadores y bordes suaves |
| `--color-hairline-strong` | ink @ 20% (`rgba(15,23,42,0.20)`) | `border-hairline-strong` | Bordes de controles y cards |
| `--color-text` | `#0F172A` (ink) | `text-text` | Texto principal |
| `--color-text-muted` | `#1E293B` (ink-soft) | `text-text-muted` | Texto secundario |
| `--color-accent` | `#FF2B8A` (lapacho) | `bg-accent`, `text-accent` | Acento de conversión |
| `--color-accent-deep` | `#D61F74` (lapacho-deep) | `bg-accent-deep` | Hover del acento |
| `--color-focus` | `#FF2B8A` (lapacho) | (ring de foco) | Anillo `focus-visible` |

> Las primitivas `--color-ink`, `--color-ink-soft`, `--color-crema`,
> `--color-crema-soft`, `--color-lapacho`, `--color-lapacho-deep`, `--color-sol`,
> `--color-lavanda` y `--color-durazno` siguen disponibles: los componentes
> existentes y los SVG no se rompen.

### Radius

| Token CSS | Valor | Clase Tailwind | Uso |
|---|---|---|---|
| `--radius-control` | `0.75rem` (12px) | `rounded-control` | Detalles/FAQ, chips |
| `--radius-card` | `1rem` (16px) | `rounded-card` | Cards estándar |
| `--radius-panel` | `1.5rem` (24px) | `rounded-panel` | Paneles y bloques grandes |
| `--radius-dialog` | `2rem` (32px) | `rounded-dialog` | Diálogo de comunidad |
| `--radius-pill` | `9999px` | `rounded-pill` | Botones, badges, pills |

### Motion

| Token CSS | Valor | Uso |
|---|---|---|
| `--motion-ui` | `200ms` | Micro-interacciones de UI (hover/focus/color) |
| `--motion-fast` | `350ms` | Reveal por palabra |
| `--motion-normal` | `550ms` | Reveal de bloques |
| `--motion-slow` | `900ms` | Marcador `.highlight` |
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | Curva de entrada editorial |

---

## CTA rules

Componente: `src/components/ui/Button.tsx`. La clase se expone con `buttonClass()`
para poder pasarla también como `className` a `CommunityJoinTrigger`.

| Variante | Estilo | Cuándo |
|---|---|---|
| `primary` | `bg-ink text-crema`, hover `bg-lapacho` | Acción principal cuando el accent está reservado a otra acción |
| `accent` | `bg-lapacho text-white`, hover `bg-lapacho-deep` | **Máximo uno por sección**: la conversión clave |
| `secondary` | outline `hairline-strong` + `text-text`, hover lapacho | Acción alternativa |
| `onDarkPrimary` | `bg-crema text-ink`, hover `bg-white` | Sobre superficie `dark` |
| `onDarkAccent` | `bg-lapacho text-white`, hover `bg-lapacho-deep` | Acento sobre superficie `dark` |
| `onDarkSecondary` | outline `crema/30` + `text-crema`, hover lapacho | Alternativa sobre superficie `dark` |

Reglas:

- **Hero:** el CTA principal es `primary` (ink). El secundario es `secondary`.
- **Un solo `accent` lapacho por sección.** Si la sección tiene un único CTA, ese
  puede ser el accent; si tiene varios, el accent va al de conversión.
- **`min-h-11` (44px)** en todo botón/link-control. Ver Accessibility.
- **Anillo de foco lapacho** en `:focus-visible` para links, botones y `summary`.

---

## Typography scale

| Rol | Clases | Uso |
|---|---|---|
| Display (h1) | `text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight` | Hero |
| Section (h2) | `text-3xl md:text-4xl font-extrabold tracking-tight` | Títulos de sección (`SectionHeading`) |
| Final CTA (h2) | `text-3xl md:text-5xl font-extrabold tracking-tight` | CTA final |
| Subsection (h3) | `text-2xl md:text-3xl font-bold leading-snug` | Títulos internos (evento) |
| Eyebrow | `text-sm font-semibold uppercase tracking-widest` | Etiqueta de sección (`Eyebrow`), color `accent` o `crema/60` |
| Body L | `text-lg leading-relaxed` | Bajada de sección |
| Body | `text-base leading-relaxed` | Texto estándar |
| Meta | `text-sm` | Notas, detalles |
| Caption | `text-xs` | Epígrafes, fine print |

Pesos 400–800. Sin tracking salvo eyebrows. Line-height 1.05 (display) a 1.6
(body). `RevealText` aplica el reveal por palabra al h1 del Hero.

---

## Layout, spacing y radius

- **Contenedores:** `wide` = `max-w-6xl`, `narrow` = `max-w-3xl`, `cta` =
  `max-w-4xl`, todos con `px-5`.
- **Ritmo vertical:** secciones `py-14 md:py-20`; Hero `py-16 md:py-24`; strip
  compacto `py-8`.
- **Tono de sección:** `plain` (sin fondo), `soft` (`bg-canvas-soft` +
  `border-t`), `surface` (`bg-surface` + `border-t`), `dark` (`bg-ink text-crema`
  + `border-t`), `strip` (`bg-canvas-soft` + `border-y`).
- **Spacing:** escala de 4dp (Material). Gaps de 12–32px entre bloques.
- **Radius:** ver tabla de radius. Cards `rounded-card`, controles
  `rounded-control`, botones `rounded-pill`.
- **Safe areas:** `env(safe-area-inset-*)` en elementos anclados a un borde:
  header sticky (`top`), menú móvil (`right`), footer (`bottom`).
- **Header sticky:** `z-50`, fondo `bg-canvas/90` + `backdrop-blur`.

---

## Motion

Principio: **el movimiento sirve a la comprensión, nunca decora** (manual §35).

- **Reveal editorial** (`.reveal`, `.reveal-word`, `.highlight`): entrada por
  bloque y por palabra con blur-to-focus y marcador orgánico. Gated tras `.js`
  para no romper sin JavaScript.
- **Marquee de colaboradores:** scroll infinito suave, pausa en hover/focus,
  corre solo en viewport.
- **Micro-interacciones de UI:** ≤ `--motion-ui` (200ms), `ease-out`. Hover:
  cambio de color y `-translate-y-0.5` en CTAs y cards.
- **`prefers-reduced-motion`:** desactiva reveals, marquee, el panel de eventos y
  los `translate` de hover. El contenido queda siempre visible.

---

## Accessibility

- **Contraste:** texto `ink` sobre `canvas` (crema) tiene contraste alto (AAA).
  `text-text-muted` se usa para texto secundario. El lapacho es acento, no texto
  de párrafo.
- **El color no es el único canal:** cada estado combina color + texto/etiqueta.
- **Touch targets ≥ 44px:** `min-h-11` en botones, links-control, items de menú,
  `summary` de FAQ y cards accionables.
- **Foco visible:** anillo lapacho (`outline: 2px solid var(--color-focus)`,
  offset 2px) en `:focus-visible` de todo `a`, `button` y `summary`.
- **Navegación:** `aria-label` en `nav` y menú móvil, `aria-current` donde
  aplica, `role="dialog"` + `aria-modal` en el diálogo de comunidad, `Esc` cierra.
- **Reduced motion:** respetado en reveals, marquee y hovers con translate.

---

## Do / Don't

### Do

- Usar **tokens semánticos** (`bg-canvas`, `border-hairline`, `text-text`) en vez
  de hex.
- Mantener **un accent lapacho por sección**.
- Usar `primary` para la acción principal y `secondary` para la alternativa.
- Dar **`min-h-11`** a todo control y **anillo de foco lapacho** visible.
- Respetar **safe areas** en header, menú móvil y footer.
- Dejar respirar: una idea principal por bloque, espacio negativo generoso.

### Don't

- **No usar hex hardcoded** en componentes (solo en `globals.css` y SVG).
- **No usar `shadow-`** en el chrome. La única excepción es el diálogo de
  comunidad (overlay).
- **No poner más de un CTA lapacho por sección.**
- **No agregar dark mode.**
- **No agregar dependencias** (p. ej. librerías de íconos) sin necesidad estricta.
- **No inventar copy.** El copy vive en `src/lib/content.ts`.
- **No redibujar ni recolorear el logo.** Variante 29 o nada.

---

## Coherence checks

Auditorías para verificar que el código cumple este documento:

1. **Sin hex crudo:** `grep -rn "#[0-9a-fA-F]\{6\}" src/components src/app` → solo
   debe devolver `src/app/globals.css` (tokens).
2. **Sin sombras en chrome:** `grep -rn "shadow-" src/components src/app` → solo
   debe devolver el overlay del diálogo de comunidad
   (`src/components/CommunityConversation.tsx`).
3. **Un accent por sección:** `grep -rn "bg-accent\b" src/app/page.tsx` → como
   máximo una ocurrencia por sección.
4. **Touch targets:** todo CTA usa `Button`/`buttonClass` (incluye `min-h-11`).
   `grep -rn "min-h-11" src/components` debe cubrir botones, menú, FAQ y cards.
5. **Foco visible:** regla global `:focus-visible` sobre `a, button, summary` en
   `globals.css` + clases `focus-visible:outline-*` en controles.
6. **Safe areas:** `grep -rn "safe-area-inset" src/components` debe mostrar
   header, menú móvil y footer.

---

## Referencias

- `src/app/globals.css` — tokens (primitivas + semánticas) y motion.
- `src/components/ui/` — primitivas (`Button`, `Section`, `Eyebrow`,
  `SectionHeading`, `EmptyState`, `ChannelCard`).
- `src/lib/content.ts` — única fuente de copy.
- `src/components/motion/` — `Reveal`, `RevealText`, `AutoMarquee`.
- `AGENTS.md` — convenciones del repo.
- Manual de marca v2.4 — identidad, paleta, tipografía, territorios y do/don't.

---

**Mantenedor:** equipo Formosa.dev. **Próxima revisión:** al agregar componentes
o tokens nuevos.
