import Image from "next/image";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AutoMarquee } from "../components/motion/AutoMarquee";
import { Reveal } from "../components/motion/Reveal";
import { RevealText } from "../components/motion/RevealText";
import {
  collaborators,
  communityWhatsAppUrl,
  contactWhatsAppUrl,
  faq,
  institutional,
  joinNote,
  pillars,
  territorialImages,
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
      className="mr-4 flex h-36 w-44 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-ink/25 sm:w-52"
    >
      {collaborator.url && !hidden ? (
        <a
          href={collaborator.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={collaborator.name}
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
        {/* 02 — Hero */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-widest text-lapacho">
                  {institutional.descriptor}
                </p>
              </Reveal>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                <RevealText text={institutional.ideaMadre} highlight="construyendo" />
              </h1>
              <Reveal delay={150}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                  {institutional.heroSubcopy}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={communityWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-crema transition hover:-translate-y-0.5 hover:bg-lapacho"
                  >
                    Sumate a la comunidad
                  </a>
                  <a
                    href={communityWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-lapacho hover:text-lapacho"
                  >
                    Ver próximo encuentro
                  </a>
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
                  className="h-auto w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-2 text-xs text-ink/50">
                  Estación de tren de Formosa Capital.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* 03 — Colaboradores */}
        <section id="colaboradores" className="border-t border-ink/10 bg-white">
          <Reveal className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Colaboradores
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
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
              <div className="mt-10 max-w-2xl rounded-2xl border border-dashed border-ink/20 p-8 text-ink-soft">
                <p className="font-semibold text-ink">
                  Todavía no hay colaboradores publicados.
                </p>
                <p className="mt-2 leading-relaxed">
                  Estamos sumando a las organizaciones que acompañan e impulsan
                  a Formosa.dev.
                </p>
              </div>
            )}
            <a
              href={contactWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-lapacho px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-lapacho-deep"
            >
              Quiero colaborar
            </a>
          </Reveal>
        </section>

        {/* 04 — Prueba de vida */}
        <section
          aria-label="Síntesis"
          className="border-y border-ink/10 bg-crema-soft"
        >
          <Reveal>
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-8 text-center">
              <span className="text-xl font-extrabold md:text-2xl">Aprender.</span>
              <span className="text-xl font-extrabold md:text-2xl">Conectar.</span>
              <span className="text-xl font-extrabold md:text-2xl">Construir.</span>
              <span className="w-full text-sm text-ink-soft md:w-auto md:text-base">
                {institutional.inclusion}
              </span>
            </div>
          </Reveal>
        </section>

        {/* 05 — Qué es Formosa.dev */}
        <section id="que-es" className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
              Una comunidad para construir desde acá.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              La distancia no debería impedir acceder a personas, conocimiento,
              proyectos y oportunidades. Formosa.dev conecta y multiplica lo que ya
              existe en la provincia: talento, ganas de construir y territorio.
            </p>
            <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, index) => (
                <div key={pillar.title}>
                  <dt className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-bold text-lapacho">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{pillar.title}</span>
                  </dt>
                  <dd className="mt-2 pl-9 text-sm leading-relaxed text-ink-soft">
                    {pillar.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* 06 — Próximo evento */}
        <section id="evento" className="border-t border-ink/10 bg-crema-soft">
          <Reveal className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Próximo evento
            </h2>
            <div className="mt-8 max-w-2xl rounded-2xl border border-ink/10 bg-crema p-8">
              <h3 className="text-xl font-bold">Estamos armando el próximo encuentro</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Todavía no hay una fecha confirmada, pero ya estamos organizando
                los primeros meetups en Formosa Capital. Podés ayudar de tres
                maneras:
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink-soft">
                <li>· Proponé un evento o una charla.</li>
                <li>· Ofrecé una sede.</li>
                <li>· Sumate a la comunidad para enterarte apenas se confirme.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={communityWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-crema transition hover:-translate-y-0.5 hover:bg-lapacho"
                >
                  Sumate a la comunidad
                </a>
                <a
                  href={contactWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-lapacho hover:text-lapacho"
                >
                  Proponé un evento u ofrecé una sede
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 07 — Eventos anteriores / Prueba social */}
        <section id="eventos-anteriores" className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Eventos anteriores
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Acá van a quedar las fotos y los recaps de cada encuentro, para que se
              vea que esto ya está pasando.
            </p>
            <div className="mt-8 max-w-2xl rounded-2xl border border-dashed border-ink/20 p-8 text-ink-soft">
              <p className="font-semibold text-ink">Todavía no hay eventos pasados.</p>
              <p className="mt-2 leading-relaxed">
                El primero va a ser el comienzo de la historia.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 08 — Misión territorial / Mapa de Formosa */}
        <section id="territorio" className="border-t border-ink/10 bg-ink text-crema">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Reveal>
              <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
                Queremos que Formosa.dev se encienda en cada localidad
              </h2>
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
                    className="h-auto w-full rounded-2xl object-cover"
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
                    className="h-auto w-full rounded-2xl object-cover"
                  />
                  <figcaption className="mt-2 text-xs text-crema/60">
                    La Cruz del Norte, desde Formosa.
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal>
              <div className="mt-10 rounded-2xl border border-crema/15 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-crema/50">
                  Estados de una localidad
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {localityStates.map((state) => (
                    <li
                      key={state}
                      className="rounded-full border border-crema/20 px-4 py-1.5 text-sm text-crema/80"
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
                <a
                  href={communityWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-lapacho px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-lapacho-deep"
                >
                  Quiero activar mi localidad
                </a>
                <a
                  href={contactWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-crema/30 px-6 py-3 text-sm font-semibold text-crema transition hover:-translate-y-0.5 hover:border-lapacho hover:text-lapacho"
                >
                  Ofrecer una sede
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 09 — Café Meetup / Sedes */}
        <section id="cafe" className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
              Tu espacio puede ser sede de encuentros
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Cafés, bares, universidades, coworks, empresas e instituciones
              pueden recibir encuentros pequeños y recurrentes. No es un pedido de
              favor: es una colaboración donde el espacio aporta hospitalidad y la
              comunidad aporta convocatoria y contenido.
            </p>
            <a
              href={contactWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-lapacho px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-lapacho-deep"
            >
              Quiero recibir un meetup
            </a>
          </Reveal>
        </section>

        {/* 11 — Equipo / Organización */}
        <section id="equipo" className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Quiénes son parte de la organización de Formosa.dev
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              La comunidad la sostienen voluntarios en community management,
              eventos, contenido y diseño. Una organización abierta, no una marca
              personal.
            </p>
            <div className="mt-8 max-w-2xl rounded-2xl border border-dashed border-ink/20 p-8 text-ink-soft">
              <p className="font-semibold text-ink">El equipo está tomando forma.</p>
              <p className="mt-2 leading-relaxed">
                Cuando haya roles confirmados, van a aparecer acá con su función.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 12 — FAQ */}
        <section id="faq" className="border-t border-ink/10 bg-crema-soft">
          <Reveal className="mx-auto max-w-3xl px-5 py-14 md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 space-y-3">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-ink/10 bg-crema px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 13 — CTA final */}
        <section id="sumate" className="mx-auto max-w-4xl px-5 py-14 md:py-20 text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Hay gente de acá construyendo. Falta que te sumes vos.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {institutional.inclusion} La comunidad es gratis, abierta y arranca
              desde Formosa.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={institutional.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-lapacho px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-lapacho-deep"
              >
                Entrar a la comunidad
              </a>
              <p className="max-w-sm text-sm text-ink-soft">{joinNote}</p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
