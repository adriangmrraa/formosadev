# Estructura del Sitio Web — Formosa.dev

> **Version:** 1.0
> **Stack sugerido:** Next.js 14+ (App Router) + Tailwind CSS + Vercel (deploy)
> **Alternativa:** Landing page estatica con Astro o HTML/CSS vanilla + Netlify
> **Dominio:** formosa.dev

---

## Arquitectura General

```
formosa.dev/
├── /                   → Landing page (home)
├── /eventos            → Calendario de eventos (proximo)
├── /blog               → Blog / Novedades (futuro)
├── /recursos           → Links utiles / biblioteca
├── /codigo-conducta    → Codigo de conducta
└── /contacto           → Formulario de contacto / redes
```

**Pagina unica (landing) con navegacion interna:** Para la version inicial, todo en una sola pagina con scroll sections. Las paginas secundarias se agregan cuando el blog y eventos lo requieran.

---

## Seccion 1: Hero

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│  [Logo]                    [WhatsApp] [Instagram] │
│                                                     │
│                                                     │
│     ___ _ __ ___  _ __ ___   ___ _ __               │
│    / __| '_ ` _ \| '_ ` _ \ / _ \ '__|              │
│   | (__| | | | | | | | | | |  __/ |                 │
│    \___|_| |_| |_|_| |_| |_|\___|_|                 │
│                                                     │
│   El punto de encuentro del talento tech             │
│   del norte argentino                                │
│                                                     │
│   [💬 Unite al WhatsApp]  [📅 Proximo evento]        │
│                                                     │
│   ─── o ───                                         │
│   +200 miembros  |  Eventos mensuales  |  Gratis     │
│                                                     │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo:** Formosa.dev
- **Subtitulo:** El punto de encuentro del talento tech del norte argentino
- **Descripcion breve:** Una comunidad abierta de desarrolladores, diseñadores, emprendedores y estudiantes de tecnologia. Con sede en Formosa, conectando al NEA.

### CTA Primario

- **Boton 1:** "Unite al WhatsApp" → Link directo al grupo de WhatsApp
- **Boton 2 (secundario):** "Proximo evento" → Ancla a la seccion de eventos

### Elementos Visuales

- Logo de Formosa.dev en el centro (o en la esquina superior izquierda)
- Fondo: gradiente abstracto con los colores de la paleta (verde chaqueño #2D8A4E, celeste formosa #4CB8C4)
- Animacion sutil de particulas o grid de codigo en background
- Nube de tags de tecnologias flotando (React, Python, Go, TS, Docker, etc.)
- Indicador de scroll hacia abajo (animacion)

### Metricas destacadas (debajo del hero)

- "+200 miembros en WhatsApp"
- "Eventos presenciales mensuales"
- "Gratuito y abierto"

---

## Seccion 2: Que es Formosa.dev?

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│   ┌──────────────┐  ┌──────────────┐           │
│   │  Icono       │  │  Icono       │           │
│   │  Comunidad   │  │  Eventos     │           │
│   │  digital     │  │  presenciales│           │
│   └──────────────┘  └──────────────┘           │
│   ┌──────────────┐  ┌──────────────┐           │
│   │  Icono       │  │  Icono       │           │
│   │  Conocimiento│  │  Gratuito    │           │
│   │  compartido  │  │  y abierto   │           │
│   └──────────────┘  └──────────────┘           │
│                                                 │
│   Texto explicativo de 3 parrafos               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo de seccion:** "Que es Formosa.dev?"
- **Parrafo 1:** "Formosa.dev es una comunidad abierta de tecnologia, desarrollo, innovacion y emprendimiento digital con sede en Formosa Capital, Argentina."
- **Parrafo 2:** "Nacimos para conectar al talento tech del norte argentino que esta disperso, subconectado y sin acceso a las mismas oportunidades que existen en Buenos Aires, Cordoba o Rosario."
- **Parrafo 3:** "No somos una academia, no somos una consultora, no somos un hub de coworking. Somos el punto de encuentro —digital y fisico— de la gente que hace tecnologia en Formosa."

### CTA

- "Conoce nuestros pilares" → Ancla a los 7 pilares (si se muestran) o "Unite a la comunidad" → WhatsApp

### Elementos Visuales

- Grid de 4 tarjetas con iconos y titulos:
  1. **Comunidad digital** — Grupo de WhatsApp activo
  2. **Eventos presenciales** — Meetups, talleres, hackathons
  3. **Conocimiento compartido** — Charlas, mentorias, recursos
  4. **Gratuito y abierto** — Sin costo, sin agenda oculta
- Fondo claro (modo dia) con acentos verdes

---

## Seccion 3: Beneficios de Sumarse

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│   ¿Por que sumarte a Formosa.dev?               │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  🎯                                   │   │
│   │  Para desarrolladores                   │   │
│   │  - Comunidad activa para dudas tecnicas│   │
│   │  - Contenido curado y relevante        │   │
│   │  - Oportunidades laborales exclusivas  │   │
│   │  - Eventos presenciales                │   │
│   └─────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │  🎓                                   │   │
│   │  Para estudiantes                       │   │
│   │  - Acceso a profesionales activos      │   │
│   │  - Charlas y workshops para princip.   │   │
│   │  - Red de contactos para insercion lab.│   │
│   └─────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │  🚀                                   │   │
│   │  Para emprendedores tech                │   │
│   │  - Feedback tecnico real               │   │
│   │  - Co-fundadores y colaboradores       │   │
│   │  - Visibilidad en ecosistema local     │   │
│   └─────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │  🏢                                   │   │
│   │  Para empresas                          │   │
│   │  - Canal directo al talento formoseno  │   │
│   │  - Marca empleadora en la comunidad    │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   [💬 Unite al WhatsApp]                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo de seccion:** "Por que sumarte a Formosa.dev?"

### CTA

- "Unite al WhatsApp" → Link directo

### Elementos Visuales

- Cards expandibles o acordeones con iconos por perfil
- Diseno limpio con color coding por categoria
- Fondo oscuro para contrastar con la seccion anterior

---

## Seccion 4: Proximos Eventos

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│   📅 Proximos eventos                           │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  🗓️  [Fecha] — Meetup: [Titulo]        │   │
│   │  📍  [Lugar]                            │   │
│   │  🎤  [Speaker] — [Tema]                │   │
│   │  [Reservar lugar →]                     │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   "No hay eventos proximos...                   │
│    Seguinos en Instagram para anuncios"          │
│                                                 │
│   📋  [Queres dar una charla? Propuesta aca]    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo de seccion:** "Proximos eventos"
- **Estado vacio:** "Todavia no tenemos eventos agendados. Seguinos en Instagram para enterarte cuando anunciemos el proximo."
- **Call for speakers:** "Queres dar una charla? [Completa este formulario]"

### CTA

- "Reservar lugar" → Link de registro (Google Forms / Ticketless)
- "Proponer charla" → Formulario de Google

### Elementos Visuales

- Timeline vertical con tarjetas de eventos
- Fotos de eventos anteriores (si existen)
- Calendario visual embedido (opcional)
- Badge de "Proximo" o "Confirmado"

---

## Seccion 5: Comunidad (WhatsApp)

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│   💬 Sumate a la conversacion                   │
│                                                 │
│   El corazon de Formosa.dev esta en WhatsApp.   │
│   Ahi pasan las discusiones, las oportunidades, │
│   los anuncios y el dia a dia de la comunidad.  │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  [💬 UNITE AL GRUPO DE WHATSAPP]         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   📱 Escanea el codigo QR o hace click arriba   │
│                                                 │
│   [QR Code del grupo]                           │
│                                                 │
│   📌  [Ver Codigo de Conducta]                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo de seccion:** "Sumate a la conversacion"
- **Texto:** "El corazon de Formosa.dev late en WhatsApp. Ahi es donde pasan las discusiones tecnicas, las oportunidades laborales, los anuncios de eventos y el dia a dia de la comunidad. Sin spam, sin ruido, con respeto y ganas de compartir."

### CTA

- "UNITE AL GRUPO DE WHATSAPP" → Link de invitacion (boton grande, color verde WhatsApp)
- "Ver Codigo de Conducta" → Link a pagina interna de Codigo de Conducta

### Elementos Visuales

- QR Code del grupo de WhatsApp
- Screenshot mockup del grupo en accion (opcional)
- Fondo con diseno tipo chat
- Icono de WhatsApp estilizado

---

## Seccion 6: Recursos

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│   📚 Recursos utiles                            │
│                                                 │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│   │ GitHub   │ │ Instagram│ │ LinkedIn │       │
│   │ Organiz. │ │ Oficial  │ │ Oficial  │       │
│   └──────────┘ └──────────┘ └──────────┘       │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│   │ YouTube  │ │ Blog     │ │ Biblioteca│       │
│   │ Canal    │ │ Novedades│ │ Recursos │       │
│   └──────────┘ └──────────┘ └──────────┘       │
│                                                 │
│   [Ver todos los recursos →]                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo de seccion:** "Recursos utiles"
- **Subtitulo:** "Todos los canales y herramientas de Formosa.dev en un solo lugar."

### CTA

- Links directos a cada recurso (cards clickeables)

### Elementos Visuales

- Grid de 2x3 o 3x2 tarjetas con iconos de cada plataforma
- Colores distintivos por plataforma
- Efecto hover con sombra

### Lista de recursos

1. **GitHub** — github.com/formosa-dev — Codigo abierto y proyectos colaborativos
2. **Instagram** — @formosa.dev — Contenido visual, eventos, comunidad
3. **LinkedIn** — /company/formosa-dev — Contenido profesional, oportunidades
4. **YouTube** — /@formosa.dev — Charlas grabadas y workshops (futuro)
5. **Blog** — blog.formosa.dev — Articulos tecnicos y novedades (futuro)
6. **Biblioteca de recursos** — Links, herramientas y tutoriales recomendados

---

## Seccion 7: Blog / Novedades

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│   📰 Novedades                                  │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  [Thumb] [Titulo del post]              │   │
│   │          Resumen breve del articulo     │   │
│   │          [Fecha] — [Categoria]           │   │
│   │          [Leer mas →]                   │   │
│   └─────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │  [Thumb] [Titulo del post v2]           │   │
│   │          Resumen breve...               │   │
│   │          [Fecha] — [Categoria]           │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   [Ver todas las novedades →]                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo de seccion:** "Novedades"
- **Estado vacio:** "Todavia no hay publicaciones. Seguinos en Instagram para no perderte nada."

### CTA

- "Leer mas" → Pagina del articulo
- "Ver todas las novedades" → /blog

### Elementos Visuales

- Lista de posts con thumbnail, fecha y categoria
- Paginacion o "cargar mas"
- Categorias: Eventos, Tecnico, Comunidad, Oportunidades

---

## Seccion 8: Contacto

### Wireframe Textual

```
┌─────────────────────────────────────────────────┐
│   📬 Contacto                                   │
│                                                 │
│   Queres colaborar, proponer una charla,        │
│   sponsorizar un evento o simplemente            │
│   saludar? Escribinos.                          │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  [Instagram]  [LinkedIn]  [WhatsApp]    │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   O completa el formulario:                      │
│                                                 │
│   Nombre: [________________]                    │
│   Email:  [________________]                    │
│   Mensaje:[________________]                    │
│           [________________]                    │
│                                                 │
│   [Enviar mensaje →]                            │
│                                                 │
│   O escribinos directamente a                   │
│   hola@formosa.dev                              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Copys

- **Titulo de seccion:** "Contacto"
- **Texto:** "Queres colaborar, proponer una charla, sponsorizar un evento o simplemente saludar? Escribinos por cualquiera de estos canales."

### CTA

- Links directos a Instagram, LinkedIn, WhatsApp
- Formulario de contacto (Google Forms o form nativo)
- Email: hola@formosa.dev

### Elementos Visuales

- Iconos de redes sociales en fila
- Formulario simple con campos minimos
- Footer con copyright y creditos

---

## Secciones Adicionales (Landing Completa)

### Footer

```
┌─────────────────────────────────────────────────┐
│  [Logo]                                          │
│  Comunidad tech del norte argentino              │
│                                                 │
│  [IG] [LI] [GH] [YT]                            │
│                                                 │
│  © 2026 Formosa.dev. Hecho con ❤️ desde Formosa │
│  Comunidad hermana de Fusa Labs                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Codigo de Conducta (pagina interna)

- Enlace en el footer
- Version completa del codigo de conducta
- Adaptado de Contributor Covenant

---

## Stack Tecnico

| Componente | Opcion 1 (Recomendada) | Opcion 2 (Minima) |
|------------|----------------------|-------------------|
| Framework | Next.js 14 (App Router) | HTML5 + CSS3 + JS vanilla |
| Estilos | Tailwind CSS | CSS propio |
| Deploy | Vercel (gratuito) | Netlify / GitHub Pages |
| Formulario | Formspree / Google Forms | Netlify Forms |
| Blog | Markdown + MDX (local) | Substack embed |
| Dominio | formosa.dev (ya adquirido) | formosa.dev |
| Analytics | Vercel Analytics / Plausible | Google Analytics |

### Justificacion de Next.js + Tailwind

- **Mismo ecosistema que Fusa Labs** → Jesus puede mantener ambos proyectos con el mismo stack.
- **Rendimiento:** SSG + ISR para landing rapida, SSR para blog.
- **Facilidad:** App Router simplifica rutas, layouts y metadata SEO.
- **Tailwind:** Prototipado rapido, diseno responsive sin escribir CSS personalizado.
- **Vercel:** Deploy automatico desde GitHub, sin configuracion de servidor.

### Plan de Implementacion

1. `npx create-next-app@latest formosa-dev-web --typescript --tailwind --app`
2. Configurar layout global con navbar y footer
3. Crear secciones como componentes
4. Deploy a Vercel desde GitHub
5. Conectar dominio formosa.dev.ar

---

## Mapa de Navegacion (Mobile First)

```
Mobile (<768px):
┌──────────────────────┐
│ [Logo]  [☰ Menu]     │
├──────────────────────┤
│ Hero section         │
│ Que es?              │
│ Beneficios           │
│ Eventos              │
│ WhatsApp             │
│ Recursos             │
│ Novedades            │
│ Contacto             │
│ Footer               │
└──────────────────────┘

Desktop (>768px):
┌─────────────────────────────────────────────┐
│ [Logo]  [WhatsApp] [Eventos] [Blog] [Contacto]│
├─────────────────────────────────────────────┤
│ Hero + metricas                              │
│ Que es? (grid 2x2)                           │
│ Beneficios (grid 2x2)                        │
│ Eventos (tarjetas horizontales)              │
│ WhatsApp + QR                                │
│ Recursos (grid 3x2)                          │
│ Novedades (grid 2-3 columnas)                │
│ Contacto + formulario                        │
│ Footer                                       │
└─────────────────────────────────────────────┘
```
