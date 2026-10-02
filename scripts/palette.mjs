// Colour maths shared by the theme generator and the contrast check.
// Plain Node, no dependencies.

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
}

export function rgbToHex([r, g, b]) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function rgbToHsl([r, g, b]) {
  const [rn, gn, bn] = [r, g, b].map((v) => v / 255);
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l * 100];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return [(h * 60 + 360) % 360, s * 100, l * 100];
}

export function hslToRgb([h, s, l]) {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let rgb;
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return rgb.map((v) => (v + m) * 255);
}

export const hsl = (h, s, l) => rgbToHex(hslToRgb([h, s, l]));

export function luminance(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const la = luminance(typeof a === "string" ? hexToRgb(a) : a);
  const lb = luminance(typeof b === "string" ? hexToRgb(b) : b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Mix `fg` over `bg` at `alpha` (0..1). Returns an rgb array. */
export function over(fg, bg, alpha) {
  const f = typeof fg === "string" ? hexToRgb(fg) : fg;
  const b = typeof bg === "string" ? hexToRgb(bg) : bg;
  return f.map((v, i) => v * alpha + b[i] * (1 - alpha));
}

/** Lighten (towards white) in HSL lightness steps until `min` contrast against `against`. */
export function lightenUntil(hex, against, min) {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  let L = l;
  let out = hex;
  while (contrast(out, against) < min && L < 97) {
    L += 0.5;
    out = hsl(h, s, L);
  }
  return out;
}
