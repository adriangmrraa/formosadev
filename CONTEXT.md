# CONTEXT — Formosa.dev Web v3

Fase 0 del SDD (Spec-Driven Development). Registro de ingestión de contexto previo a implementación. La autoridad de producto es `docs/Formosa.dev — Especificación Maestra Web, UX, Motion y SDD v3.0.md` (en adelante **Web v3.0**).

## Fuentes leídas (en orden de autoridad)

1. **Web v3.0** — Especificación Maestra Web, UX, Motion y SDD v3.0 (AUTORITATIVO; supera el bloque V2.0 legacy).
2. **Manual de Marca Maestro Unificado v2.4** — identidad, logo variante 29, paleta, imagen, co-branding.
3. **Fundación Formosa.dev — Arquitectura Institucional, Gobernanza y Plan de Constitución v0.1** — fórmula institucional y estado jurídico.
4. **ADN de comunidades tech regionales** (CuyoConnect / SaltaDev, 2026) — benchmark de experiencia, nunca identidad a copiar.
5. **Formosa.dev × Meta Meetup — Brief maestro del primer evento** — draft de evento, no publicado.
6. **Vault Obsidian `brain/`** — notas destiladas (05 Web y Producto, 02 Marca, 03 Comunidad, 04 Eventos, 01 Fundación).
7. **Estado real del repo** — Next 16.3.5 / React 19.2.8 / Tailwind v4 / TS 5.

## Contradicciones encontradas y resolución

| # | Contradicción | Resolución |
|---|---|---|
| 1 | Paleta legacy dark/emerald (bloque V2.0 + landing vieja) vs ink/crema/lapacho/sun | Gana **V3.0** (supersede explícito, línea 291). |
| 2 | Propuesta de valor "Sin humo, sin venderse…" (nota del vault) vs "Conectamos personas…" (V3.0 §2) | Gana **V3.0** (más nueva y específica). |
| 3 | Email: `hola@formosa.dev` vs `formosadev.arg@gmail.com` vs "a definir" | **Pendiente**; se usa `hola@formosa.dev` como email de sitio, a confirmar. |
| 4 | Dos escalas de consecuencias en el código de conducta | Se publica la **operativa** (nota Reglas de la comunidad). |
| 5 | Atribución al fundador en web pública | Se **omite** (coverage audit pendiente; nota #257). |
| 6 | Logo variante 29: master SVG/PNG sin export confirmado | Marca como **texto** `formosa.dev` hasta que exista el asset. |
| 7 | URL de WhatsApp: único valor es placeholder `chat.whatsapp.com/...` | **No se shipea**; join vía Instagram (canal documentado). |

## Decisiones asumidas

- Landing **basada en evidencia**: nada de métricas, eventos, sponsors, partners ni estado jurídico inventados.
- **Empty states honestos** en cada sección sin contenido real (Web v3.0 §11.8, §29).
- MVP expone solo rutas con contenido real: `/`, `/codigo-de-conducta`, `/contacto`. El resto es fase 2/3.
- Copy institucional **centralizado** en una única fuente (`src/lib/content.ts`), no disperso.
- Idioma: UI/copy `es-AR` con voseo; identificadores técnicos, archivos y artefactos SDD en inglés/español neutro según contexto.
- Microcopy exacta de Web v3.0 §21: "Sumate a la comunidad", "Reservar lugar", "Ver qué están construyendo", "Quiero activar mi localidad", "Quiero recibir un meetup", "Quiero colaborar".

## Estado del repo al inicio

- Scaffold de Next.js 16.3.5 (App Router) sin contenido de producto: metadata en inglés, tipografía Geist, theming zinc/black.
- Sin test runner (`package.json` solo tiene dev/build/start/lint) → strict TDD no aplica; verificación = build + lint + QA visual.
- `public/` solo con SVGs de scaffold → reemplazados por assets territoriales aprobados.
- Implementación V3 en curso: `globals.css` (tokens `@theme`), `layout.tsx` (metadata es-AR + Manrope), `page.tsx` (home), `components/Header|Footer`, `lib/types|content`, rutas `codigo-de-conducta` y `contacto`.

## Assets

- `public/assets/hero-estacion.jpg` (Estación Formosa, 1280×852) — hero.
- `public/assets/banado.jpg` (Bañado La Estrella, 805×601) y `public/assets/cruz-del-norte.jpg` (1280×853) — sección territorial.
- `public/assets/logo-light.jpg` / `logo-dark.jpg` — derivados documentados de la variante 29 (no usar hasta confirmar render; master pendiente).
