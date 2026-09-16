# AGENTS.md — Landing Page Formosa.dev

Este repositorio contiene **únicamente la landing page pública de Formosa.dev** (el sitio web).
Todo lo demás de la comunidad —estrategia, prensa, mailing, redes, documentación formal— vive
**fuera de este repositorio**, en el directorio padre.

**Repo:** https://github.com/adriangmrraa/formosadev
**Dominio de producción:** formosa.dev

---

## Dónde está la información del proyecto

> **IMPORTANTE:** la documentación de origen **NO está versionada en este repositorio**.
> Vive en el disco local, en el directorio padre `E:\Adrian OS\Formosa.dev\`.
> Si clonás este repo desde GitHub, **no vas a tener estos archivos** y vas a necesitar
> que alguien te los pase antes de poder construir nada.

### Documentación de este sitio (local, en el directorio padre)

| Archivo | Qué contiene | Ruta absoluta |
|---|---|---|
| `estructura-sitio.md` | Arquitectura, secciones, wireframes, stack, navegación, plan de implementación | `E:\Adrian OS\Formosa.dev\sitio-web\estructura-sitio.md` |
| `copy-sitio.md` | **Copy canónico** de cada sección: HTML de HEAD/META, navbar, secciones 1-8, footer, página de código de conducta | `E:\Adrian OS\Formosa.dev\sitio-web\copy-sitio.md` |

> Estos dos archivos **sí** están versionados en este repo (están en la raíz).
> Son la fuente de verdad para construir. Leelos antes de tocar código.

### Documentación de contexto (local, fuera del repo)

| Archivo | Qué aporta |
|---|---|
| `AGENTS.md` (padre) | Contexto general de Formosa.dev: jerarquía, canales, convenciones del proyecto |
| `DOCUMENTO-MAESTRO.md` | **Single Source of Truth** de la comunidad. §10.2 paleta de colores, §10.3 tipografía |
| `ESTRATEGIA-LANZAMIENTO.md` | Plan de lanzamiento, narrativa |
| `CRONOGRAMA.md` | Schedule día por día (Jul-Oct). Incluye fecha de publicación de la landing |
| `PLANIFICACION.md` | Checklist maestra con tracking (5.7 formulario, 1.6/1.7 branding) |
| `documentacion-formal/propuesta-valor.md`, `documentacion-formal/FAQ.md` | Propuesta de valor y FAQ |
| `comunidad-whatsapp/REGLAS-COMUNIDAD.md` | Fuente del código de conducta |
| `assets/` | Branding (logo, isotipo, fuentes) — **actualmente vacío, solo `.gitkeep`** |

Ruta base del contexto: `E:\Adrian OS\Formosa.dev\`

---

## Qué es Formosa.dev

Comunidad de tecnología, desarrollo, innovación y emprendimiento digital de Formosa, Argentina.
Fundador: **Jesús Fleitas**. Lanzamiento oficial: **octubre 2026**.
Canal principal: WhatsApp. Idioma: **español (Argentina)**.

---

## Stack técnico

**Decisión documentada** en `estructura-sitio.md` (líneas 4-6 y 435-459):

| Componente | Opción recomendada | Alternativa mínima |
|---|---|---|
| Framework | Next.js (App Router) | HTML5 + CSS3 + JS vanilla |
| Lenguaje | TypeScript | — |
| Estilos | Tailwind CSS | CSS propio |
| Deploy | Vercel (gratuito) | Netlify / GitHub Pages |
| Formulario | Formspree / Google Forms | Netlify Forms |
| Blog | Markdown + MDX | Substack embed |
| Analytics | Vercel Analytics / Plausible | Google Analytics |

**Justificación registrada:** mismo ecosistema que Fusa Labs (Jesús mantiene ambos proyectos),
SSG + ISR para una landing rápida, App Router simplifica rutas y metadata SEO, deploy automático
desde GitHub sin configurar servidor.

**Comando de scaffold documentado:** `npx create-next-app@latest --typescript --tailwind --app`

> Nota: los docs dicen "Next.js 14+". La versión actual del registry es Next.js 16.x.
> Al scaffoldeá, fijá explícitamente la versión mayor que decidas y dejá registro acá.

---

## Estructura de la landing

Página única con scroll sections. Rutas secundarias planificadas: `/eventos`, `/blog`,
`/recursos`, `/codigo-conducta`, `/contacto`.

Orden de secciones (fuente: `estructura-sitio.md`, mapa de navegación):

| # | Sección | Contenido |
|---|---|---|
| 1 | Navbar | Logo, WhatsApp, Eventos, Recursos, Blog, Contacto |
| 2 | Hero | Logo, tagline, 2 CTAs (WhatsApp + Próximo evento), barra de métricas |
| 3 | Qué es Formosa.dev? | 4 pillar cards |
| 4 | Beneficios de sumarse | 4 cards por perfil (devs, estudiantes, emprendedores, empresas) |
| 5 | Próximos eventos | Cards de eventos + empty state + call for speakers |
| 6 | Comunidad (WhatsApp) | QR, CTA grande, link a código de conducta |
| 7 | Recursos | Grid 3x2 (GitHub, Instagram, LinkedIn, YouTube, Blog, Biblioteca) |
| 8 | Blog / Novedades | Cards de posts + empty state |
| 9 | Contacto | Redes, formulario, hola@formosa.dev |
| 10 | Footer | Logo, links, redes, copyright 2026 |

Mobile first. El copy de cada sección está en `copy-sitio.md`.

---

## Sistema de diseño

**Paleta de marca** — `DOCUMENTO-MAESTRO.md` §10.2 (marcada ahí como *provisoria*):

| Token | Hex | Uso |
|---|---|---|
| Verde Chaqueño | `#2D8A4E` | Primario |
| Celeste Formosa | `#4CB8C4` | Secundario |
| Tierra Colorada | `#C55A2D` | Acento / CTA |
| Deep Tech | `#0D1117` | Fondo oscuro |
| Off White | `#F5F5F0` | Fondo claro |
| Text Dark | `#1A1A1A` | Texto |
| Text Light | `#E6E6E6` | Texto |

**Tipografía:** `Inter` para títulos y displays; `Inter` o `Source Sans Pro` para cuerpo.

No hay escala de espaciado, radios ni archivo de tokens definido todavía.

---

## Convenciones

- **Idioma de la UI y del copy:** español (Argentina), registro neutro.
- **Código, identificadores, nombres de archivos y comentarios:** inglés.
- **Commits:** conventional commits. Sin atribución a IA ni `Co-Authored-By`.
- **Sin emojis** en documentación formal (regla heredada del `AGENTS.md` padre).
- El copy sale de `copy-sitio.md`. **No inventar copy nuevo** sin actualizar ese archivo primero.

---

## Estado actual

- [x] Repositorio inicializado y conectado a `origin`
- [x] `estructura-sitio.md` y `copy-sitio.md` versionados en la raíz
- [ ] Scaffold del framework — **pendiente**
- [ ] Layout global (navbar + footer)
- [ ] Secciones
- [ ] Deploy a Vercel + dominio formosa.dev

---

## Decisiones abiertas (requieren definición humana)

Estas contradicciones están en la documentación de origen. **No las resuelvas por tu cuenta:**
preguntá antes de construir.

1. **Dos conceptos de sitio distintos.**
   - `estructura-sitio.md` + `copy-sitio.md` describen una **landing de comunidad**
     (qué es, beneficios, eventos, WhatsApp, recursos, blog, contacto).
   - `E:\Adrian OS\Formosa.dev\Especificación y Código Landing Page Formosa.dev.md` describe
     un **funnel de lead-gen del Workshop de IA** (metodología, workshop, formulario,
     aliados fundadores).
   Son dos páginas diferentes. Hay que elegir una como landing principal.

2. **Dos paletas en conflicto.**
   - Paleta de marca (hex de arriba), en `DOCUMENTO-MAESTRO.md` §10.2.
   - Paleta genérica dark-tech (`zinc-950`, `zinc-900/60`, `emerald-400`) usada en el
     código de ejemplo de la especificación del workshop.
   Elegir una y fijarla como tokens.

3. **Assets inexistentes.** El código de `copy-sitio.md` referencia `/logo-white.svg`,
   `/og-image.png` y `/blog/thumbnail-*.jpg`. No existen en disco; `assets/` está vacío.
   El logo y el isotipo figuran como pendientes en `CRONOGRAMA.md` y `PLANIFICACION.md`.

4. **Placeholders sin verificar.** `https://chat.whatsapp.com/...` y los endpoints de
   Formspree son placeholders. Los links a GitHub, YouTube y LinkedIn no están confirmados.
