import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Coffee,
  MessageCircle,
  Ticket,
  Users,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CommunityJoinTrigger } from "../components/CommunityConversation";
import { PastEvents } from "../components/PastEvents";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AmbientVideo } from "../components/motion/AmbientVideo";
import { AutoMarquee } from "../components/motion/AutoMarquee";
import { Parallax } from "../components/motion/Parallax";
import { Reveal } from "../components/motion/Reveal";
import { RevealText } from "../components/motion/RevealText";
import { Button, buttonClass } from "../components/ui/Button";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "../components/ui/brand-icons";
import { ChannelCard } from "../components/ui/ChannelCard";
import { EmptyState } from "../components/ui/EmptyState";
import { Eyebrow, Section, SectionHeading } from "../components/ui/Section";
import {
  collaborators,
  channels,
  communityWhatsAppUrl,
  contactWhatsAppUrl,
  faq,
  institutional,
  joinNote,
  pastEvents,
  pillars,
  territorialImages,
  upcomingEvent,
} from "../lib/content";
import type { Collaborator, EventVideo } from "../lib/types";

const localityStates = [
  "Buscando referente",
  "Comunidad en formación",
  "Actividad local",
  "Comunidad activa",
  "Camino al hackathon",
];

/** The state Formosa Capital is currently in, per the Territorio copy. */
const currentLocalityState = "Comunidad en formación";

/** The recap video of the newest event powers the full-bleed ambient band. */
const recapEvent = pastEvents[0];
const recapVideo = recapEvent?.media.find(
  (entry): entry is EventVideo => entry.kind === "video"
);

const channelIcons: Record<string, ReactNode> = {
  instagram: <InstagramIcon className="size-5" />,
  telegram: <TelegramIcon className="size-5" />,
  x: <XIcon className="size-5" />,
  linkedin: <LinkedInIcon className="size-5" />,
  github: <GitHubIcon className="size-5" />,
  youtube: <YouTubeIcon className="size-5" />,
  whatsapp: <WhatsAppIcon className="size-5" />,
};

function CollaboratorCard({
  collaborator,
  hidden = false,
}: {
  collaborator: Collaborator;
  hidden?: boolean;
}) {
  const image = (
    <Image
      src={collaborator.logoSrc}
      alt={hidden ? "" : collaborator.logoAlt}
      width={240}
      height={96}
      className={
        collaborator.large
          ? "h-18 w-auto max-w-full object-contain"
          : "h-12 w-auto max-w-full object-contain"
      }
    />
  );

  return (
    <li
      aria-hidden={hidden || undefined}
      className="surface-glow mr-4 flex h-36 w-44 shrink-0 items-center justify-center rounded-card border border-hairline-soft p-6 transition-colors duration-200 hover:border-hairline-strong sm:w-52"
    >
      {collaborator.url && !hidden ? (
        <a
          href={collaborator.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={collaborator.name}
          className="rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {image}
        </a>
      ) : (
        image
      )}
    </li>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* 01 — Hero */}
        <Section spacing="hero">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Reveal>
                <Eyebrow>{institutional.descriptor}</Eyebrow>
              </Reveal>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                <RevealText
                  text={institutional.ideaMadre}
                  highlight="construyendo"
                  displayAccent
                />
              </h1>
              <Reveal delay={150}>
                <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-text-muted">
                  {institutional.heroSubcopy}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CommunityJoinTrigger className={buttonClass({ variant: "accent" })}>
                    <WhatsAppIcon className="size-4" />
                    Sumate a la comunidad
                  </CommunityJoinTrigger>
                  <CommunityJoinTrigger className={buttonClass({ variant: "secondary" })}>
                    <CalendarDays aria-hidden="true" className="size-4" />
                    Ver próximo encuentro
                  </CommunityJoinTrigger>
                </div>
              </Reveal>
            </div>
            <Reveal scale delay={120}>
              <figure>
                <Image
                  src={territorialImages.hero.src}
                  alt={territorialImages.hero.alt}
                  width={territorialImages.hero.width}
                  height={territorialImages.hero.height}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="media-glow h-auto w-full rounded-card object-cover"
                />
                <figcaption className="mt-3 text-xs font-light text-text-faint">
                  Paisajes y encuentros de Formosa.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Section>

        {/* 02 — Eventos (próximo + anteriores) */}
        <Section id="evento" tone="soft">
          <Reveal>
            <SectionHeading>Eventos</SectionHeading>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
              Los encuentros de la comunidad: lo que ya pasó y lo que viene.
            </p>
            {upcomingEvent ? (
              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-start">
                <div>
                  <Eyebrow>{upcomingEvent.descriptor}</Eyebrow>
                  <h3 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">
                    {upcomingEvent.title}
                  </h3>
                  <p className="mt-4 font-light leading-relaxed text-text-muted">
                    {upcomingEvent.description}
                  </p>
                  <p className="mt-5 text-sm">
                    <span className="font-semibold text-text-muted">Lugar: </span>
                    <span className="text-text">{upcomingEvent.location}</span>
                  </p>
                  <div className="mt-6">
                    <Button
                      href={upcomingEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="accent"
                      icon={<Ticket />}
                    >
                      Reservar lugar
                    </Button>
                    <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-text-muted">
                      {upcomingEvent.note}
                    </p>
                  </div>
                </div>

                <div className="media-glow w-full overflow-hidden rounded-card border border-hairline bg-surface">
                  <iframe
                    src={upcomingEvent.embedUrl}
                    title={`Registro al evento: ${upcomingEvent.title}`}
                    loading="lazy"
                    allow="fullscreen; payment"
                    className="block h-[450px] w-full border-0"
                  />
                </div>
              </div>
            ) : null}

            {pastEvents.length > 0 ? (
              <div className="mt-10 border-t border-hairline pt-10">
                <PastEvents events={pastEvents} />
              </div>
            ) : null}

            {!upcomingEvent ? (
              <div className="surface-glow mt-12 max-w-2xl rounded-panel border border-hairline-soft p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="icon-orb flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                    <CalendarDays aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold">Estamos armando el próximo encuentro</h3>
                    <p className="mt-3 font-light leading-relaxed text-text-muted">
                      Todavía no hay una fecha confirmada, pero ya estamos organizando
                      los primeros meetups en Formosa Capital. Podés ayudar de tres
                      maneras:
                    </p>
                    <ul className="mt-5 space-y-2 text-sm leading-relaxed text-text-muted">
                      <li>· Proponé un evento o una charla.</li>
                      <li>· Ofrecé una sede.</li>
                      <li>· Sumate a la comunidad para enterarte apenas se confirme.</li>
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <CommunityJoinTrigger className={buttonClass({ variant: "accent" })}>
                        <WhatsAppIcon className="size-4" />
                        Sumate a la comunidad
                      </CommunityJoinTrigger>
                      <Button
                        href={contactWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        icon={<MessageCircle />}
                      >
                        Proponé un evento u ofrecé una sede
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </Reveal>
        </Section>

        {/* Recap video — full-bleed ambient band between sections 02 and 03.
            The video covers the whole band (object-cover, no letterboxing)
            and zooms gently while it crosses the viewport; real playback
            stays in the gallery lightbox above. */}
        {recapEvent && recapVideo ? (
          <section
            aria-label={`Recap en video: ${recapEvent.title}`}
            className="relative"
          >
            <Parallax className="relative h-[52svh] max-h-[560px] min-h-80 overflow-hidden">
              <div
                className="depth-zoom absolute inset-0"
                style={{ "--dz": "0.12" } as CSSProperties}
              >
                <AmbientVideo
                  sources={recapVideo.sources}
                  poster={recapVideo.poster}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/35"
              />
              <div className="absolute inset-x-0 bottom-0 pb-6">
                <div className="mx-auto flex max-w-6xl items-center gap-4 px-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-crema/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-crema backdrop-blur">
                    <span className="live-dot" aria-hidden="true" />
                    Recap
                  </span>
                  <p className="min-w-0 truncate text-sm font-semibold text-crema/90">
                    {recapEvent.descriptor}
                  </p>
                </div>
              </div>
            </Parallax>
          </section>
        ) : null}

        {/* 03 — Colaboradores */}
        <Section id="colaboradores" tone="surface">
          <Reveal>
            <Parallax className="depth-shift" style={{ "--dy": "-18px" } as CSSProperties}>
              <SectionHeading>Colaboradores</SectionHeading>
              <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
                Empresas, instituciones y organizaciones que colaboran, apoyan e
                impulsan a la comunidad.
              </p>
            </Parallax>
            {collaborators.length > 0 ? (
              <Parallax className="depth-shift" style={{ "--dy": "22px" } as CSSProperties}>
                <AutoMarquee duration={36}>
                  <ul className="colaboradores-track mt-10">
                    {collaborators.map((collaborator) => (
                      <CollaboratorCard
                        key={collaborator.id}
                        collaborator={collaborator}
                      />
                    ))}
                    {collaborators.map((collaborator) => (
                      <CollaboratorCard
                        key={`${collaborator.id}-copy`}
                        collaborator={collaborator}
                        hidden
                      />
                    ))}
                  </ul>
                </AutoMarquee>
              </Parallax>
            ) : (
              <EmptyState
                className="mt-10 max-w-2xl"
                title="Todavía no hay colaboradores publicados."
                description="Estamos sumando a las organizaciones que acompañan e impulsan a Formosa.dev."
              />
            )}
            <Parallax className="depth-shift" style={{ "--dy": "-18px" } as CSSProperties}>
              <Button
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="accent"
                icon={<MessageCircle />}
                className="mt-8"
              >
                Quiero colaborar
              </Button>
            </Parallax>
          </Reveal>
        </Section>

        {/* 04 — Redes */}
        <Section id="redes" tone="soft">
          <Reveal>
            <Parallax className="depth-shift" style={{ "--dy": "-14px" } as CSSProperties}>
              <SectionHeading>Redes</SectionHeading>
            </Parallax>
            <Parallax className="depth-shift" style={{ "--dy": "20px" } as CSSProperties}>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {channels
                  .filter(
                    (channel): channel is typeof channel & { url: string } =>
                      Boolean(channel.url)
                  )
                  .map((channel, index) => (
                    <li
                      key={channel.id}
                      className="stagger-item"
                      style={{ "--i": index } as CSSProperties}
                    >
                      <ChannelCard
                        href={channel.url}
                        name={channel.name}
                        note={channel.note}
                        icon={channelIcons[channel.id]}
                      />
                    </li>
                  ))}
                <li
                  className="stagger-item"
                  style={{ "--i": channels.length } as CSSProperties}
                >
                  <ChannelCard
                    href={communityWhatsAppUrl}
                    name="WhatsApp"
                    note="Comunidad oficial"
                    icon={channelIcons.whatsapp}
                  />
                </li>
              </ul>
            </Parallax>
          </Reveal>
        </Section>

        {/* 05 — Síntesis */}
        <Section ariaLabel="Síntesis" tone="strip" spacing="compact">
          <Reveal>
            <Parallax
              className="depth-zoom"
              style={{ "--dz": "0.05" } as CSSProperties}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
                <span className="font-display text-xl font-black italic md:text-2xl">Aprender.</span>
                <span className="font-display text-xl font-black italic md:text-2xl">Conectar.</span>
                <span className="font-display text-xl font-black italic md:text-2xl">Construir.</span>
                <span className="w-full text-sm font-light text-text-muted md:w-auto md:text-base">
                  {institutional.inclusion}
                </span>
              </div>
            </Parallax>
          </Reveal>
        </Section>

        {/* 06 — Qué es Formosa.dev */}
        <Section id="que-es">
          <Reveal>
            <SectionHeading className="max-w-2xl" accent="construir">
              Una comunidad para construir desde acá.
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
              La distancia no debería impedir acceder a personas, conocimiento,
              proyectos y oportunidades. Formosa.dev conecta y multiplica lo que ya
              existe en la provincia: talento, ganas de construir y territorio.
            </p>
            <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="stagger-item"
                  style={{ "--i": index } as CSSProperties}
                >
                  <dt className="flex items-center gap-3">
                    <span className="orb flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-black italic tabular-nums text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{pillar.title}</span>
                  </dt>
                  <dd className="mt-2 pl-14 text-sm font-light leading-relaxed text-text-muted">
                    {pillar.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        {/* 07 — Misión territorial / Mapa de Formosa */}
        <Section id="territorio" tone="dark">
          <Reveal>
            <SectionHeading className="max-w-2xl" accent="encienda">
              Queremos que Formosa.dev se encienda en cada localidad
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-crema/80">
              La métrica no es cuántas localidades visitamos, sino cuántas quedan
              con capacidad de sostener actividad local propia. Cada punto del
              mapa es una comunidad que arranca, un referente que aparece y un
              camino hacia el primer encuentro.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal scale>
              <figure>
                <Image
                  src={territorialImages.banado.src}
                  alt={territorialImages.banado.alt}
                  width={territorialImages.banado.width}
                  height={territorialImages.banado.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="media-glow-dark h-auto w-full rounded-card object-cover"
                />
                <figcaption className="mt-3 text-xs font-light text-crema/60">
                  Bañado La Estrella, Formosa.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal scale delay={100}>
              <figure>
                <Image
                  src={territorialImages.cruzDelNorte.src}
                  alt={territorialImages.cruzDelNorte.alt}
                  width={territorialImages.cruzDelNorte.width}
                  height={territorialImages.cruzDelNorte.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="media-glow-dark h-auto w-full rounded-card object-cover"
                />
                <figcaption className="mt-3 text-xs font-light text-crema/60">
                  La Cruz del Norte, desde Formosa.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal>
            <div className="surface-well-dark mt-10 rounded-card border border-crema/15 p-6">
              <Eyebrow tone="onDark">Estados de una localidad</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {localityStates.map((state) =>
                  state === currentLocalityState ? (
                    <li
                      key={state}
                      className="orb flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold text-white"
                    >
                      <span className="live-dot" aria-hidden="true" />
                      {state}
                    </li>
                  ) : (
                    <li
                      key={state}
                      className="orb-dark rounded-pill px-4 py-2 text-sm text-crema/80"
                    >
                      {state}
                    </li>
                  )
                )}
              </ul>
              <p className="mt-4 text-sm font-light leading-relaxed text-crema/70">
                Empezamos por Formosa Capital, en comunidad en formación. El resto
                del mapa se enciende cuando haya alguien dispuesto a construir
                comunidad en su localidad.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <CommunityJoinTrigger className={buttonClass({ variant: "onDarkAccent" })}>
                <MessageCircle aria-hidden="true" className="size-4" />
                Quiero activar mi localidad
              </CommunityJoinTrigger>
              <Button
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="onDarkSecondary"
                icon={<MessageCircle />}
              >
                Ofrecer una sede
              </Button>
            </div>
          </Reveal>
        </Section>

        {/* 08 — Café Meetup / Sedes */}
        <Section id="cafe">
          <Reveal>
            <SectionHeading className="max-w-2xl" accent="sede">
              Tu espacio puede ser sede de encuentros
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
              Cafés, bares, universidades, coworks, empresas e instituciones
              pueden recibir encuentros pequeños y recurrentes. No es un pedido de
              favor: es una colaboración donde el espacio aporta hospitalidad y la
              comunidad aporta convocatoria y contenido.
            </p>
            <a
              href={contactWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow group mt-8 flex min-h-[58px] max-w-xl items-center gap-3 rounded-card px-4 py-3 text-white transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span className="cta-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                <Coffee aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1 text-[17px] font-bold leading-tight">
                Quiero recibir un meetup
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                <ChevronRight
                  aria-hidden="true"
                  className="chevron-bounce size-5"
                />
              </span>
            </a>
          </Reveal>
        </Section>

        {/* 09 — Equipo / Organización */}
        <Section id="equipo">
          <Reveal>
            <SectionHeading>
              Quiénes son parte de la organización de Formosa.dev
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-muted">
              La comunidad la sostienen voluntarios en community management,
              eventos, contenido y diseño. Una organización abierta, no una marca
              personal.
            </p>
            <EmptyState
              className="mt-8 max-w-2xl"
              icon={<Users className="size-5" />}
              title="El equipo está tomando forma."
              description="Cuando haya roles confirmados, van a aparecer acá con su función."
            />
          </Reveal>
        </Section>

        {/* 10 — FAQ */}
        <Section id="faq" tone="soft" width="narrow">
          <Reveal>
            <SectionHeading>Preguntas frecuentes</SectionHeading>
            <div className="mt-8 space-y-3">
              {faq.map((item, index) => (
                <details
                  key={item.question}
                  className="stagger-item group rounded-control border border-hairline-soft bg-surface px-5 py-4 transition-colors duration-200 open:border-hairline hover:bg-canvas-soft"
                  style={{ "--i": index } as CSSProperties}
                >
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 shrink-0 text-text-muted transition-transform duration-300 group-open:rotate-180 group-open:text-accent motion-reduce:transition-none"
                    />
                  </summary>
                  <p className="mt-3 font-light leading-relaxed text-text-muted">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* 11 — CTA final */}
        <Section id="sumate" width="cta" className="text-center">
          <Reveal>
            <SectionHeading size="lg">
              Hay gente de acá construyendo. Falta que te sumes{" "}
              <span className="highlight font-display font-black italic">vos</span>.
            </SectionHeading>
            <p className="mx-auto mt-5 max-w-xl text-lg font-light leading-relaxed text-text-muted">
              {institutional.inclusion} La comunidad es gratis, abierta y arranca
              desde Formosa.
            </p>
            <div className="relative mt-10 flex flex-col items-center gap-4">
              <div
                aria-hidden="true"
                className="bloom -inset-x-16 -inset-y-12"
              />
              <CommunityJoinTrigger className={buttonClass({ variant: "accent", size: "lg" })}>
                <WhatsAppIcon className="size-4" />
                Entrar a la comunidad
              </CommunityJoinTrigger>
              <p className="relative max-w-sm text-sm font-light text-text-muted">{joinNote}</p>
            </div>
          </Reveal>
        </Section>
      </main>

      <Footer />
    </>
  );
}
