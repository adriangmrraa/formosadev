import Image from "next/image";
import { CommunityJoinTrigger } from "../components/CommunityConversation";
import { PastEvents } from "../components/PastEvents";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AutoMarquee } from "../components/motion/AutoMarquee";
import { Reveal } from "../components/motion/Reveal";
import { RevealText } from "../components/motion/RevealText";
import { Button, buttonClass } from "../components/ui/Button";
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
import type { Collaborator } from "../lib/types";

const localityStates = [
  "Buscando referente",
  "Comunidad en formación",
  "Actividad local",
  "Comunidad activa",
  "Camino al hackathon",
];

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
      className="mr-4 flex h-36 w-44 shrink-0 items-center justify-center rounded-card border border-hairline bg-surface p-6 transition-colors hover:border-hairline-strong sm:w-52"
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
                <RevealText text={institutional.ideaMadre} highlight="construyendo" />
              </h1>
              <Reveal delay={150}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted">
                  {institutional.heroSubcopy}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CommunityJoinTrigger className={buttonClass({ variant: "primary" })}>
                    Sumate a la comunidad
                  </CommunityJoinTrigger>
                  <CommunityJoinTrigger className={buttonClass({ variant: "secondary" })}>
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
                  className="h-auto w-full rounded-card object-cover"
                />
                <figcaption className="mt-2 text-xs text-text/50">
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
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Los encuentros de la comunidad: lo que ya pasó y lo que viene.
            </p>
            {upcomingEvent ? (
              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-start">
                <div>
                  <Eyebrow>{upcomingEvent.descriptor}</Eyebrow>
                  <h3 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">
                    {upcomingEvent.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-text-muted">
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
                    >
                      Reservar lugar
                    </Button>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
                      {upcomingEvent.note}
                    </p>
                  </div>
                </div>

                <div className="w-full overflow-hidden rounded-card border border-hairline bg-surface">
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
              <div className="mt-12 max-w-2xl rounded-card border border-hairline bg-canvas p-8">
                <h3 className="text-xl font-bold">Estamos armando el próximo encuentro</h3>
                <p className="mt-3 leading-relaxed text-text-muted">
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
                  <CommunityJoinTrigger className={buttonClass({ variant: "primary" })}>
                    Sumate a la comunidad
                  </CommunityJoinTrigger>
                  <Button
                    href={contactWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    Proponé un evento u ofrecé una sede
                  </Button>
                </div>
              </div>
            ) : null}
          </Reveal>
        </Section>

        {/* 03 — Colaboradores */}
        <Section id="colaboradores" tone="surface">
          <Reveal>
            <SectionHeading>Colaboradores</SectionHeading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Empresas, instituciones y organizaciones que colaboran, apoyan e
              impulsan a la comunidad.
            </p>
            {collaborators.length > 0 ? (
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
            ) : (
              <EmptyState
                className="mt-10 max-w-2xl"
                title="Todavía no hay colaboradores publicados."
                description="Estamos sumando a las organizaciones que acompañan e impulsan a Formosa.dev."
              />
            )}
            <Button
              href={contactWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="accent"
              className="mt-8"
            >
              Quiero colaborar
            </Button>
          </Reveal>
        </Section>

        {/* 04 — Redes */}
        <Section id="redes" tone="soft">
          <Reveal>
            <SectionHeading>Redes</SectionHeading>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {channels
                .filter(
                  (channel): channel is typeof channel & { url: string } =>
                    Boolean(channel.url)
                )
                .map((channel) => (
                  <li key={channel.id}>
                    <ChannelCard
                      href={channel.url}
                      name={channel.name}
                      note={channel.note}
                    />
                  </li>
                ))}
              <li>
                <ChannelCard
                  href={communityWhatsAppUrl}
                  name="WhatsApp"
                  note="Comunidad oficial"
                />
              </li>
            </ul>
          </Reveal>
        </Section>

        {/* 05 — Síntesis */}
        <Section ariaLabel="Síntesis" tone="strip" spacing="compact">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
              <span className="text-xl font-extrabold md:text-2xl">Aprender.</span>
              <span className="text-xl font-extrabold md:text-2xl">Conectar.</span>
              <span className="text-xl font-extrabold md:text-2xl">Construir.</span>
              <span className="w-full text-sm text-text-muted md:w-auto md:text-base">
                {institutional.inclusion}
              </span>
            </div>
          </Reveal>
        </Section>

        {/* 06 — Qué es Formosa.dev */}
        <Section id="que-es">
          <Reveal>
            <SectionHeading className="max-w-2xl">
              Una comunidad para construir desde acá.
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              La distancia no debería impedir acceder a personas, conocimiento,
              proyectos y oportunidades. Formosa.dev conecta y multiplica lo que ya
              existe en la provincia: talento, ganas de construir y territorio.
            </p>
            <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, index) => (
                <div key={pillar.title}>
                  <dt className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{pillar.title}</span>
                  </dt>
                  <dd className="mt-2 pl-9 text-sm leading-relaxed text-text-muted">
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
            <SectionHeading className="max-w-2xl">
              Queremos que Formosa.dev se encienda en cada localidad
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-crema/80">
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
                  className="h-auto w-full rounded-card object-cover"
                />
                <figcaption className="mt-2 text-xs text-crema/60">
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
                  className="h-auto w-full rounded-card object-cover"
                />
                <figcaption className="mt-2 text-xs text-crema/60">
                  La Cruz del Norte, desde Formosa.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-10 rounded-card border border-crema/15 p-6">
              <Eyebrow tone="onDark">Estados de una localidad</Eyebrow>
              <ul className="mt-3 flex flex-wrap gap-2">
                {localityStates.map((state) => (
                  <li
                    key={state}
                    className="rounded-pill border border-crema/20 px-4 py-1.5 text-sm text-crema/80"
                  >
                    {state}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-crema/70">
                Empezamos por Formosa Capital, en comunidad en formación. El resto
                del mapa se enciende cuando haya alguien dispuesto a construir
                comunidad en su localidad.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <CommunityJoinTrigger className={buttonClass({ variant: "onDarkAccent" })}>
                Quiero activar mi localidad
              </CommunityJoinTrigger>
              <Button
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="onDarkSecondary"
              >
                Ofrecer una sede
              </Button>
            </div>
          </Reveal>
        </Section>

        {/* 08 — Café Meetup / Sedes */}
        <Section id="cafe">
          <Reveal>
            <SectionHeading className="max-w-2xl">
              Tu espacio puede ser sede de encuentros
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              Cafés, bares, universidades, coworks, empresas e instituciones
              pueden recibir encuentros pequeños y recurrentes. No es un pedido de
              favor: es una colaboración donde el espacio aporta hospitalidad y la
              comunidad aporta convocatoria y contenido.
            </p>
            <Button
              href={contactWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="accent"
              className="mt-8"
            >
              Quiero recibir un meetup
            </Button>
          </Reveal>
        </Section>

        {/* 09 — Equipo / Organización */}
        <Section id="equipo">
          <Reveal>
            <SectionHeading>
              Quiénes son parte de la organización de Formosa.dev
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              La comunidad la sostienen voluntarios en community management,
              eventos, contenido y diseño. Una organización abierta, no una marca
              personal.
            </p>
            <EmptyState
              className="mt-8 max-w-2xl"
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
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-control border border-hairline bg-canvas px-5 py-4"
                >
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="mt-3 leading-relaxed text-text-muted">
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
              Hay gente de acá construyendo. Falta que te sumes vos.
            </SectionHeading>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-muted">
              {institutional.inclusion} La comunidad es gratis, abierta y arranca
              desde Formosa.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <CommunityJoinTrigger className={buttonClass({ variant: "accent", size: "lg" })}>
                Entrar a la comunidad
              </CommunityJoinTrigger>
              <p className="max-w-sm text-sm text-text-muted">{joinNote}</p>
            </div>
          </Reveal>
        </Section>
      </main>

      <Footer />
    </>
  );
}
