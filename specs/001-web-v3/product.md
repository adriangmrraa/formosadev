# Product Spec — Formosa.dev Web v3

Change: `formosa-web-v3`. Fuente: Web v3.0 §1-7, §12, §15, §17-19, §29.

## Problema

El talento tech del norte argentino está disperso y subconectado. No existe un punto público, serio y profundamente formoseño que explique la comunidad, demuestre que está viva y dé una acción clara para involucrarse.

## Objetivo

Formosa.dev no es una landing promocional estática: arranca como una landing de altísima calidad visual y evoluciona sin reescritura conceptual hacia el **HUB público** de la comunidad tecnológica de Formosa.

Cinco funciones simultáneas:

1. **Identidad** — explicar en segundos qué es, por qué existe y por qué es inequívocamente de Formosa.
2. **Actividad** — demostrar que está viva (eventos, recaps, personas, proyectos, agenda).
3. **Conversión** — transformar visitantes en miembros, asistentes, builders, Centinelas, speakers, aliados, sedes y colaboradores.
4. **Infraestructura** — organizar personas, proyectos, eventos, localidades, oportunidades, recursos y organizaciones.
5. **Prueba** — obra verificable: gente, lugares, repositorios, eventos, resultados; menos abstracción.

**North Star UX** (20 segundos): ¿qué es? ¿ocurre en Formosa? ¿hay gente activa? ¿qué puedo hacer ahora? ¿cuál es el próximo punto de encuentro?

## No-objetivos (MVP)

- Plataforma de miembros, autenticación o CMS.
- Analytics de terceros / formularios de terceros (Formspree/Sheets).
- Invitación de WhatsApp (placeholder) ni RSVP/embed de Luma.
- Wall de partners, detalles de eventos no publicados, o atribución personal institucional.
- Publicación remota, cambio de estado legal, branding nuevo.

## Posicionamiento

- Descriptor: **Comunidad tecnológica de Formosa**.
- Idea madre: **"Gente de acá construyendo también el futuro."**
- Síntesis: **"Aprender. Conectar. Construir."**
- Propuesta de valor: **"Conectamos personas, conocimiento y proyectos para que más talento pueda aprender, construir y acceder a oportunidades desde Formosa."**
- Apertura: **"No tenés que ser developer para entrar."**

No presentarnos como: organismo estatal, academia de cursos, empresa de software, club cerrado, marca turística, comunidad de IA, página personal de un fundador, ni vidriera de sponsors.

## Audiencias

| Audiencia | Valor | CTA |
|---|---|---|
| Desarrollador | Conexión con pares y oportunidades | Unite al grupo |
| Estudiante | Acceso a profesionales y mentoría | Unite y participá |
| Emprendedor | Feedback, networking, visibilidad | Proponete como speaker |
| Empresa | Acceso a talento y marca empleadora | Publicá una búsqueda |
| Institución | Vinculación, visibilidad, impacto | Contactanos |
| Sponsor | Marca, talento, posicionamiento | Kit de sponsorship |
| Ecosistema | Conexión, visibilidad, desarrollo | Sumate y contribuí |

## Journeys / funnels prioritarios

Visita → comunidad · Visita → evento → registro · Visita → localidad → Centinela · Visita → sede → propuesta · Visita → proyecto → colaboración · Visita institucional → aliado/contacto.

## Arquitectura de información (home, orden V1)

Header → Hero → prueba de vida → qué es → próximo evento → personas → Hecho en Formosa/proyectos → eventos anteriores → misión territorial → sedes/Café Meetup → recursos → oportunidades → aliados → equipo → FAQ → CTA final → footer.

## Sitemap objetivo

MVP: `/`, `/eventos`, `/eventos/[slug]`, `/proyectos`, `/proyectos/[slug]`, `/personas|/comunidad`, `/recursos`, `/aliados`, `/contacto`, `/codigo-de-conducta`.
Fase territorial: `/localidades`, `/localidades/[slug]`, `/centinelas`, `/sedes`, `/cafe-meetup`.
Fase ecosistema: `/oportunidades`, `/personas/[slug]`, `/organizaciones/[slug]`, `/recursos/[categoria]/[slug]`.
Regla: no exponer rutas vacías.

## Microcopy (Web v3.0 §21)

- CTA comunidad: "Sumate a la comunidad" · Evento: "Reservar lugar" · Proyecto: "Ver qué están construyendo" · Centinela: "Quiero activar mi localidad" · Sede: "Quiero recibir un meetup" · Partner: "Quiero colaborar".
- Tono: directo, cercano, competente, voseo. Evitar "revolucionar", "disrumpir", "cambiar el mundo", "la IA lo hace todo".

## Contenido real disponible (vs plan)

**Publicable hoy:** identidad, marca v3, canales declarados (Instagram documentado), Luma como sistema de eventos (sin URL aún), fidelidad territorial y "Hecho en Formosa" como compromisos, categorías de colaboración.
**Plan/boceto (no publicar como hecho):** estado de Fundación, board, export maestro del logo, nº de miembros, fecha/sede/capacidad de eventos, URL de Luma, galerías, proyectos nombrados, Centinelas, sedes activas, logos de terceros, métricas.

## Métricas

Eventos analíticos mínimos: `community_join_clicked`, `event_register_clicked`, `calendar_viewed`, `project_opened`, `project_submit_*`, `sentinel_cta_clicked/application_completed`, `venue_cta_clicked/application_completed`, `partner_cta_clicked`, `resource_opened`, `locality_opened`, `outbound_social_clicked`.
UTM en campañas. Privacidad/consentimiento según herramienta.

## Criterios de aceptación (Web v3.0 §29)

La home no está terminada hasta que: representa el Manual v2.4 sin reinterpretarlo como SaaS genérico; hero identifica y tiene CTA funcional; hay bloque de actividad/evento real o empty state útil; aparecen personas o mecanismo honesto; existe "Hecho en Formosa" o placeholder con CTA; hay prueba de actividad; misión territorial/Centinelas visible; CTA de sedes/aliados; footer y estado institucional correctos; mobile sin overflow; keyboard/focus funcionan; reduced motion; metadata/OG/canonical; sin partnerships/datos/lorem ipsum inventados; sin paisajes falsos; sin componentes "bonitos" sin función.
