import { describe, expect, it } from "vitest";
import { STORAGE_KEY, defaultState, loadState, saveState, clearState, casoProgress, setupProgress, canalProgress, viernesProgress, suggestRuta, hasRutaD, resolveProviderPath, resumen, completionOf, type StorageLike, type MeetupState } from "../metameetup-store";
import { PROMPTS, promptMissing } from "../metameetup-prompts";

function fakeStorage(initial?: Record<string, string>): StorageLike & { data: Record<string, string> } {
  const data: Record<string, string> = { ...initial };
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v;
    },
    removeItem: (k) => {
      delete data[k];
    },
  };
}

function withCaso(s: MeetupState): MeetupState {
  return {
    ...s,
    caso: {
      negocio: "Distribuidora Norte",
      ofrece: "Cosmética mayorista",
      quienEscribe: "Revendedoras",
      canal: "whatsapp",
      mensajeEjemplo: "Hola, ¿lista de precios?",
      datoFaltante: "Historial de compra",
      respuestaEsperada: "Catálogo + lead registrado",
      handoff: "Cuando piden precio final",
      criterioExito: "La consulta queda etiquetada",
      noPrometer: "Stock y precios finales",
    },
  };
}

describe("store persistence", () => {
  it("returns defaults when storage is empty", () => {
    expect(loadState(fakeStorage())).toEqual(defaultState());
  });

  it("returns defaults without storage (SSR)", () => {
    expect(loadState(undefined)).toEqual(defaultState());
  });

  it("round-trips state", () => {
    const storage = fakeStorage();
    const s = withCaso(defaultState());
    s.step = 3;
    s.visited = [0, 1, 2, 3];
    expect(saveState(s, storage)).toBe(true);
    expect(loadState(storage)).toEqual(s);
  });

  it("falls back to defaults on corrupt JSON", () => {
    const storage = fakeStorage({ [STORAGE_KEY]: "{broken json" });
    expect(loadState(storage)).toEqual(defaultState());
  });

  it("falls back to defaults on version mismatch", () => {
    const s = { ...defaultState(), v: 999 };
    const storage = fakeStorage({ [STORAGE_KEY]: JSON.stringify(s) });
    expect(loadState(storage).step).toBe(0);
  });

  it("merges partial snapshots without losing new fields", () => {
    const partial = { v: 1, caso: { negocio: "Solo esto" } };
    const storage = fakeStorage({ [STORAGE_KEY]: JSON.stringify(partial) });
    const loaded = loadState(storage);
    expect(loaded.caso.negocio).toBe("Solo esto");
    expect(loaded.caso.ofrece).toBe("");
    expect(loaded.viernes.checkpoints.fork).toBe("");
  });

  it("clears stored state", () => {
    const storage = fakeStorage();
    saveState(withCaso(defaultState()), storage);
    clearState(storage);
    expect(loadState(storage)).toEqual(defaultState());
  });

  it("clamps an out-of-range stored step and sanitizes visited", () => {
    const s = {
      ...defaultState(),
      step: 99,
      visited: [99, -1, "x" as unknown as number, 2],
    };
    const storage = fakeStorage({ [STORAGE_KEY]: JSON.stringify(s) });
    const loaded = loadState(storage);
    expect(loaded.step).toBe(7);
    expect(loaded.visited).toEqual([2, 7]);
  });

  it("repairs visited when the stored step is missing from it", () => {
    const s = { ...defaultState(), step: 4, visited: [] };
    const storage = fakeStorage({ [STORAGE_KEY]: JSON.stringify(s) });
    expect(loadState(storage).visited).toEqual([4]);
  });
});

describe("progress derivation", () => {
  it("starts empty", () => {
    const s = defaultState();
    expect(casoProgress(s).status).toBe("empty");
    expect(setupProgress(s).status).toBe("empty");
    expect(canalProgress(s).status).toBe("empty");
    expect(viernesProgress(s).status).toBe("empty");
  });

  it("caso is done when all fields + canal are filled", () => {
    const s = withCaso(defaultState());
    expect(casoProgress(s).status).toBe("done");
    expect(casoProgress(s).missing).toHaveLength(0);
  });

  it("caso is partial with some fields", () => {
    const s = defaultState();
    s.caso.negocio = "Kiosco";
    expect(casoProgress(s).status).toBe("partial");
    expect(casoProgress(s).missing.length).toBeGreaterThan(0);
  });

  it("canal resolves with provider + lab answer, or demo alone", () => {
    const s = defaultState();
    s.canal.proveedor = "demo";
    expect(canalProgress(s).status).toBe("done");
    const s2 = defaultState();
    s2.canal.proveedor = "zernio";
    expect(canalProgress(s2).status).toBe("partial");
    s2.canal.laboratorio = true;
    expect(canalProgress(s2).status).toBe("done");
  });

  it("completionOf boundaries", () => {
    expect(completionOf(0, 4)).toBe("empty");
    expect(completionOf(2, 4)).toBe("partial");
    expect(completionOf(4, 4)).toBe("done");
  });
});

describe("recommendations", () => {
  it("suggests ruta by level", () => {
    const s = defaultState();
    s.setup.nivel = "avanzado";
    expect(suggestRuta(s)).toBe("A");
    s.setup.nivel = "basico";
    expect(suggestRuta(s)).toBe("B");
    s.setup.nivel = "sin";
    expect(suggestRuta(s)).toBe("C");
    s.setup.nivel = "";
    expect(suggestRuta(s)).toBe("");
  });

  it("ruta D requires provider + lab + meta permissions", () => {
    const s = defaultState();
    s.canal.proveedor = "zernio";
    s.canal.laboratorio = true;
    s.setup.metaEstado = "tengo-permisos";
    expect(hasRutaD(s)).toBe(true);
    s.setup.metaEstado = "pendientes";
    expect(hasRutaD(s)).toBe(false);
  });

  it("provider decision tree mirrors the guide", () => {
    expect(resolveProviderPath({ canalDeseado: "ninguno", tieneProveedor: "", activosMeta: "" })).toBe("demo");
    expect(resolveProviderPath({ canalDeseado: "whatsapp", tieneProveedor: "ycloud", activosMeta: "" })).toBe("ycloud");
    expect(resolveProviderPath({ canalDeseado: "whatsapp", tieneProveedor: "kapso", activosMeta: "" })).toBe("kapso");
    expect(resolveProviderPath({ canalDeseado: "whatsapp", tieneProveedor: "ninguno", activosMeta: "" })).toBe("zernio");
    expect(resolveProviderPath({ canalDeseado: "ig-fb", tieneProveedor: "", activosMeta: "si" })).toBe("zernio");
    expect(resolveProviderPath({ canalDeseado: "ig-fb", tieneProveedor: "", activosMeta: "no" })).toBe("demo");
    expect(resolveProviderPath({ canalDeseado: "", tieneProveedor: "", activosMeta: "" })).toBe("");
  });
});

describe("prompts", () => {
  it("every prompt builds a non-empty string with defaults", () => {
    const s = defaultState();
    for (const spec of PROMPTS) {
      expect(spec.build(s).length).toBeGreaterThan(100);
    }
  });

  it("uses placeholders for missing fields", () => {
    const spec = PROMPTS.find((p) => p.id === "universal")!;
    const text = spec.build(defaultState());
    expect(text).toContain("[NEGOCIO]");
    expect(text).toContain("[CRITERIO DE ACEPTACIÓN]");
  });

  it("injects real values when fields are filled", () => {
    const spec = PROMPTS.find((p) => p.id === "universal")!;
    const text = spec.build(withCaso(defaultState()));
    expect(text).toContain("Distribuidora Norte");
    expect(text).not.toContain("[NEGOCIO]");
  });

  it("reports missing requirements and clears them when filled", () => {
    const spec = PROMPTS.find((p) => p.id === "companion")!;
    expect(promptMissing(spec, defaultState())).toHaveLength(3);
    const s = defaultState();
    s.setup.os = "windows";
    s.setup.nivel = "basico";
    s.setup.agente = "Codex";
    expect(promptMissing(spec, s)).toHaveLength(0);
    expect(spec.build(s)).toContain("Windows");
    expect(spec.build(s)).toContain("Codex");
  });

  it("resumen aggregates all four tracks", () => {
    const items = resumen(defaultState());
    expect(items).toHaveLength(4);
    expect(items.every((i) => i.status === "empty")).toBe(true);
  });
});
