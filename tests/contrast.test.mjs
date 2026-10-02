// WCAG 2.x AA checks for every theme, computed from the generated CSS itself.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { contrast } from "../scripts/palette.mjs";
import { THEMES } from "../scripts/themes.config.mjs";
import { render } from "../scripts/build-themes.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = (f) => fs.readFileSync(path.join(here, "..", "src", f), "utf8");

function block(css, selector) {
  const i = css.indexOf(selector);
  assert.ok(i >= 0, `missing ${selector}`);
  const body = css.slice(css.indexOf("{", i) + 1, css.indexOf("}", i));
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()])
  );
}

const shared = block(src("tokens.css"), ":root");
const themesCss = src("themes.css");

test("src/themes.css is the generator's output", () => {
  assert.equal(themesCss, render());
});

test("every theme has a distinct accent and page background", () => {
  const accents = new Set(THEMES.map((t) => t.accent));
  assert.equal(accents.size, THEMES.length);
  const voids = new Set(THEMES.map((t) => block(themesCss, `[data-ggt-theme="${t.id}"]`)["ggt-void"]));
  assert.equal(voids.size, THEMES.length);
});

for (const t of THEMES) {
  test(`theme ${t.id} meets WCAG AA`, () => {
    const v = { ...shared, ...block(themesCss, `[data-ggt-theme="${t.id}"]`) };
    const surfaces = [v["ggt-void"], v["ggt-ink"], v["ggt-slate"], v["ggt-wash"]];
    const min = (fg, bgs, ratio, what) => {
      for (const bg of bgs) {
        const c = contrast(fg, bg);
        assert.ok(c >= ratio, `${t.id}: ${what} ${fg} on ${bg} is ${c.toFixed(2)}:1 (needs ${ratio}:1)`);
      }
    };
    min(v["ggt-paper"], surfaces, 7, "body text");
    min(v["ggt-mist"], surfaces, 4.5, "secondary text");
    min(v["ggt-heading"], surfaces, 7, "headings");
    min(v["ggt-accent-text"], surfaces, 4.5, "eyebrow / accent text");
    min(v["ggt-link"], surfaces, 4.5, "links");
    min(v["ggt-btn-fg"], [v["ggt-btn-bg"], v["ggt-btn-bg-hover"]], 4.5, "button label");
    // Non-text: borders and focus rings need 3:1 against adjacent surfaces.
    min(v["ggt-hairline"], surfaces, 3, "hairline border");
    min(v["ggt-accent"], [v["ggt-void"], v["ggt-ink"], v["ggt-slate"]], 3, "accent border / focus ring");
    min(v["ggt-btn-bg"], [v["ggt-void"]], 3, "button against page");
    // Status colours used as text on every surface.
    for (const k of ["ggt-crit", "ggt-warn", "ggt-good"]) min(shared[k], surfaces, 4.5, k);
  });
}
