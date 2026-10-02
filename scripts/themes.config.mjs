// One entry per tool. `accent` is the brand colour for that tool; everything
// else on the page (background tint, surfaces, headings, links, buttons) is
// derived from its hue by scripts/build-themes.mjs. `bgHue` optionally shifts the
// background tint so neighbouring hues (ember / wheat / citron) read as different pages.
export const THEMES = [
  { id: "ember", name: "Ember", accent: "#d4693f", bgHue: 8, tool: "fix-it" },
  { id: "lapis", name: "Lapis", accent: "#5f8bd1", tool: "a11y-statement" },
  { id: "moss", name: "Moss", accent: "#7d9b7a", tool: "quote-invoice" },
  { id: "iris", name: "Iris", accent: "#9b8ae0", tool: "chat-to-pdf" },
  { id: "wheat", name: "Wheat", accent: "#c4a27a", bgHue: 40, tool: "cottage-food-labels" },
  { id: "citron", name: "Citron", accent: "#b8b94e", bgHue: 72, tool: "listing-optimizer" },
  { id: "verdigris", name: "Verdigris", accent: "#5f8f88", tool: "domain-ssl-report" },
  { id: "plum", name: "Plum", accent: "#8d6a7f", tool: "maker-label-pack" },
];
