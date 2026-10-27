import { expect, test, type Page } from "@playwright/test";

const URL = "/metameetup/";
const KEY = "formosadev:metameetup:v1";

function railButton(page: Page, name: RegExp | string) {
  return page
    .getByRole("navigation", { name: "Pasos del recorrido" })
    .getByRole("button", { name });
}

async function expectNoErrors(page: Page, collected: string[]) {
  const fatal = collected.filter(
    (m) => !m.includes("Failed to load resource")
  );
  expect(fatal, `console errors: ${fatal.join("\n")}`).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  (page as unknown as { __errors: string[] }).__errors = errors;
});

test("navega adelante y atrás, y por el rail", async ({ page }) => {
  await page.goto(URL);
  await expect(
    page.getByRole("heading", { name: "Empezá acá" })
  ).toBeVisible();
  await expect(page.getByText("Paso 1 de 8 · Inicio")).toBeVisible();

  await page.getByRole("button", { name: "Empezar mi recorrido" }).click();
  await expect(
    page.getByRole("heading", { name: "El caso que vas a traer" })
  ).toBeVisible();
  await expect(page.getByText("Paso 2 de 8 · Tu caso")).toBeVisible();

  await page.getByRole("button", { name: "Atrás" }).click();
  await expect(page.getByText("Paso 1 de 8 · Inicio")).toBeVisible();

  await railButton(page, /El sistema/).click();
  await expect(
    page.getByRole("heading", { name: "Cómo viaja un mensaje" })
  ).toBeVisible();

  await expectNoErrors(page, (page as never as { __errors: string[] }).__errors);
});

test("los datos del caso persisten tras recargar", async ({ page }) => {
  await page.goto(URL);
  await railButton(page, /Tu caso/).click();
  await page
    .getByLabel(/Mi negocio o proyecto/)
    .fill("Distribuidora QA del barrio");
  await page.getByLabel(/Quién escribe/).fill("Revendedoras del interior");

  await page.reload();
  await expect(page.getByLabel(/Mi negocio o proyecto/)).toHaveValue(
    "Distribuidora QA del barrio"
  );
  await expect(page.getByLabel(/Quién escribe/)).toHaveValue(
    "Revendedoras del interior"
  );
  await expect(
    page.getByText("Guardado en tu navegador").first()
  ).toBeVisible();
});

test("localStorage corrupto no rompe la app", async ({ page }) => {
  await page.addInitScript(
    (k) => window.localStorage.setItem(k, "{broken json"),
    KEY
  );
  await page.goto(URL);
  await expect(
    page.getByRole("heading", { name: "Empezá acá" })
  ).toBeVisible();
  await expect(page.getByText("Paso 1 de 8 · Inicio")).toBeVisible();
});

test("un step guardado fuera de rango se clampa", async ({ page }) => {
  await page.addInitScript(
    (k) =>
      window.localStorage.setItem(
        k,
        JSON.stringify({ v: 1, step: 99, visited: [99] })
      ),
    KEY
  );
  await page.goto(URL);
  await expect(page.getByText("Paso 8 de 8 · Tu estado")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Resumen y salida" })
  ).toBeVisible();
});

test("sin localStorage avisa que no puede guardar", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    });
  });
  await page.goto(URL);
  await expect(
    page.getByText("No se pudo guardar en este navegador")
  ).toBeVisible();
});

test("el árbol de proveedor resuelve y sugiere ruta", async ({ page }) => {
  await page.goto(URL);
  await railButton(page, /Tu canal/).click();

  await page.getByRole("button", { name: "Solo WhatsApp" }).click();
  await page.getByRole("button", { name: "Ninguno / no sé" }).click();
  await expect(page.getByText("Tu ruta", { exact: true })).toBeVisible();
  await expect(page.getByText("Zernio").first()).toBeVisible();
  await expect(
    page.getByText("/api/webhooks/ingress/zernio")
  ).toBeVisible();

  // Re-click deselecciona sin borrar nada más.
  await page.getByRole("button", { name: "Ninguno / no sé" }).click();
  await expect(
    page.getByText("Tu ruta", { exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Solo WhatsApp" })
  ).toHaveAttribute("aria-pressed", "true");
});

test("los prompts interpolan lo completado y linkean lo faltante", async ({
  page,
}) => {
  await page.goto(URL);
  await railButton(page, /Tu caso/).click();
  await page.getByLabel(/Mi negocio o proyecto/).fill("Ferretería QA");

  await railButton(page, /Prompts/).click();
  // The case prompt carries the business name.
  await expect(page.locator("pre").filter({ hasText: "Ferretería QA" }).first()).toBeVisible();
  // A missing requirement renders as a placeholder chip.
  await expect(page.locator("pre").first()).toContainText("[");

  const chip = page.getByRole("button", { name: /tu canal/ }).first();
  await chip.click();
  await expect(
    page.getByRole("heading", { name: "El caso que vas a traer" })
  ).toBeVisible();
});

test("el simulador recorre el circuito y se corta sin permisos", async ({
  page,
}) => {
  await page.goto(URL);
  await railButton(page, /El sistema/).click();

  await page.getByRole("button", { name: "Simular mensaje" }).click();
  await expect(page.getByText(/1 de 6 · Cliente/)).toBeVisible();

  // Click "next" until it disables — the sim caps phase at the outcome, so
  // this is immune to the autoplay interval advancing on its own.
  const next = page.getByRole("button", {
    name: "Siguiente paso del recorrido",
  });
  while (await next.isEnabled()) {
    try {
      await next.click({ timeout: 1500 });
    } catch {
      break;
    }
  }
  await expect(page.getByText("Respuesta automática")).toBeVisible();
  await expect(page.getByText("Handoff a humano")).toBeVisible();

  await page.getByText(/Simular sin permisos de Meta/).click();
  await page.getByRole("button", { name: "Simular mensaje" }).click();
  while (await next.isEnabled()) {
    try {
      await next.click({ timeout: 1500 });
    } catch {
      break;
    }
  }
  await expect(
    page.getByText("El recorrido se frena en el proveedor")
  ).toBeVisible();
});

test("el semáforo marca checkpoints y el tablero lo refleja", async ({
  page,
}) => {
  await page.goto(URL);
  await railButton(page, /El viernes/).click();

  const verde = page
    .getByRole("button", { name: "Verde", exact: true })
    .first();
  await verde.click();
  await expect(verde).toHaveAttribute("aria-pressed", "true");
  // Re-click deselects.
  await verde.click();
  await expect(verde).toHaveAttribute("aria-pressed", "false");
  await verde.click();

  await railButton(page, /Tu estado/).click();
  await expect(
    page.getByText("empezado, queda por completar").first()
  ).toBeVisible();
});

test("reiniciar borra el progreso guardado", async ({ page }) => {
  await page.goto(URL);
  await railButton(page, /Tu caso/).click();
  await page.getByLabel(/Mi negocio o proyecto/).fill("Caso a borrar");

  await railButton(page, /Tu estado/).click();
  await page.getByRole("button", { name: "Reiniciar mi progreso" }).click();
  await page.getByRole("button", { name: "Sí, borrar todo" }).click();

  await railButton(page, /Tu caso/).click();
  await expect(page.getByLabel(/Mi negocio o proyecto/)).toHaveValue("");
});

test("las flechas del teclado navegan pero no dentro de inputs", async ({
  page,
}) => {
  await page.goto(URL);
  await expect(
    page.getByRole("heading", { name: "Empezá acá" })
  ).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("Paso 2 de 8 · Tu caso")).toBeVisible();

  await page.getByLabel(/Mi negocio o proyecto/).click();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("Paso 2 de 8 · Tu caso")).toBeVisible();
});

test("mobile: swipe horizontal navega entre pasos", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "solo corre en el proyecto mobile");
  await page.goto(URL);
  await expect(
    page.getByRole("heading", { name: "Empezá acá" })
  ).toBeVisible();

  const swipe = (dx: number, dy = 0) =>
    page.evaluate(
      ({ dx, dy }) => {
        const panel = document.getElementById("mm-panel")!;
        const el = panel.querySelector("h2") ?? panel;
        const t = (x: number, y: number) =>
          new Touch({ identifier: 1, target: el, clientX: x, clientY: y });
        const opts = (x: number, y: number) => ({
          touches: [t(x, y)],
          changedTouches: [t(x, y)],
          bubbles: true,
          cancelable: true,
        });
        el.dispatchEvent(new TouchEvent("touchstart", opts(300, 400)));
        el.dispatchEvent(new TouchEvent("touchmove", opts(300 + dx / 2, 400 + dy / 2)));
        el.dispatchEvent(
          new TouchEvent("touchend", {
            ...opts(300 + dx, 400 + dy),
            touches: [],
          })
        );
      },
      { dx, dy }
    );

  // Right swipe advances, left swipe goes back.
  await swipe(140);
  await expect(page.getByText("Paso 2 de 8 · Tu caso")).toBeVisible();
  await swipe(-140);
  await expect(page.getByText("Paso 1 de 8 · Inicio")).toBeVisible();
  // A mostly-vertical gesture must NOT navigate.
  await swipe(30, 200);
  await expect(page.getByText("Paso 1 de 8 · Inicio")).toBeVisible();
});

test("mobile: sin overflow horizontal y rail usable", async ({
  page,
  browserName,
  isMobile,
}) => {
  test.skip(!isMobile, "solo corre en el proyecto mobile");
  await page.goto(URL);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );
  expect(overflow).toBe(false);
  await expect(
    page.getByRole("button", { name: "Siguiente" })
  ).toBeVisible();
  await railButton(page, /Tu canal/).click();
  await expect(
    page.getByRole("heading", { name: "Canal y proveedor" })
  ).toBeVisible();
  void browserName;
});
