"use client";

import { PROVIDERS, RUTAS } from "../../lib/metameetup";
import {
  hasRutaD,
  suggestRuta,
  type MeetupState,
} from "../../lib/metameetup-store";
import { CheckItem, TextAreaField } from "./fields";
import { ProviderTree } from "./ProviderTree";

type Update = (mutate: (draft: MeetupState) => MeetupState) => void;

export function StepCanal({
  state,
  update,
}: {
  state: MeetupState;
  update: Update;
}) {
  const ruta = suggestRuta(state);
  const rutaD = hasRutaD(state);

  return (
    <div className="space-y-8">
      <p className="max-w-2xl font-light leading-relaxed text-text-muted">
        Que el repo tenga un adaptador no significa que tu cuenta pueda entrar
        hoy: cada integración depende de tus activos y permisos de Meta.
        Respondé las preguntas y el árbol te dice qué ruta seguir — incluida la
        demo, que es una ruta válida.
      </p>

      <ProviderTree state={state} update={update} />

      {state.canal.proveedor !== "" && state.canal.proveedor !== "demo" ? (
        <div className="fd-pop">
          <CheckItem
            label="Tengo un canal o número de laboratorio autorizado"
            hint="Un número/cuenta de prueba que podés modificar sin riesgo — nunca tu número comercial en uso."
            checked={state.canal.laboratorio === true}
            onChange={(v) =>
              update((s) => ({
                ...s,
                canal: { ...s.canal, laboratorio: v ? true : null },
              }))
            }
          />
        </div>
      ) : null}

      {state.canal.proveedor !== "" ? (
        <section className="fd-pop">
          <h3 className="text-base font-bold">Tu ruta sugerida</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {RUTAS.map((r) => {
              const active = r.id === ruta || (r.id === "D" && rutaD);
              return (
                <div
                  key={r.id}
                  className={`rounded-card border p-4 transition-colors duration-200 ${
                    active
                      ? "border-lapacho/50 bg-accent-soft"
                      : "border-hairline-soft bg-surface"
                  }`}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-text">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full font-display text-xs font-black italic ${
                        active ? "orb text-white" : "orb-idle text-text-muted"
                      }`}
                    >
                      {r.id}
                    </span>
                    {r.name}
                    {active ? (
                      <span className="ml-auto text-xs font-semibold text-accent">
                        sugerida
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1.5 text-xs font-light leading-relaxed text-text-muted">
                    {r.detail}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs font-light leading-relaxed text-text-faint">
            La sugerencia sale de tu nivel (paso Entorno) y de tus accesos. El
            facilitador confirma la ruta en la llamada previa.
          </p>
        </section>
      ) : null}

      <TextAreaField
        label="Bloqueos o notas sobre tu canal"
        hint="Sin claves ni datos sensibles — solo el bloqueo: «me falta verificación de Meta», «no sé quién administra el portfolio»…"
        value={state.canal.notas}
        onChange={(v) =>
          update((s) => ({ ...s, canal: { ...s.canal, notas: v } }))
        }
        placeholder="Ej.: La página de Facebook existe pero no sé quién es admin"
      />

      <details className="rounded-card border border-hairline-soft bg-surface">
        <summary className="flex min-h-11 cursor-pointer items-center px-5 py-3 text-sm font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
          Comparar los tres proveedores
        </summary>
        <ul className="space-y-3 border-t border-hairline px-5 py-4">
          {PROVIDERS.map((p) => (
            <li key={p.id} className="text-sm">
              <p className="font-semibold text-text">
                {p.name}
                <span className="ml-2 font-normal text-text-faint">{p.channels}</span>
              </p>
              <p className="mt-0.5 font-light leading-relaxed text-text-muted">
                {p.when}
              </p>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
