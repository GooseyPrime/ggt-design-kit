# ggt-design-kit

Installable **plain CSS** design kit for [Golden Goose Tools](https://github.com/GooseyPrime/GoldenGooseTools).

- Dark surfaces, hairline borders, **no drop shadows**
- **Fraunces** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (labels)
- Shared chrome: hero, input, result panel, locked tally, paywall, trust line
- One full-page colour theme per tool (`data-ggt-theme`), AA-checked
- **No Tailwind**, no UI libraries

## Install from GitHub

```bash
npm install github:GooseyPrime/ggt-design-kit
```

Or in `package.json`:

```json
{
  "dependencies": {
    "ggt-design-kit": "github:GooseyPrime/ggt-design-kit"
  }
}
```

Pin a commit or tag when you want a frozen kit:

```bash
npm install github:GooseyPrime/ggt-design-kit#v0.1.0
```

## Use in a Next.js / tool app

1. Load fonts in your root layout (shop already does this via `next/font`):

```ts
import type { ReactNode } from "react";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-ggt-theme="moss" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="ggt-root">{children}</body>
    </html>
  );
}
```

2. Import the kit once (e.g. root layout or tool `globals.css`):

```css
@import "ggt-design-kit/src/index.css";
```

3. Mark up with kit classes:

```html
<main class="ggt-root">
  <div class="ggt-wrap">
    <header class="ggt-hero">
      <p class="ggt-eyebrow">Golden Goose Tools</p>
      <h1>Tool name</h1>
      <p class="ggt-lede">One-line promise.</p>
    </header>

    <form class="ggt-input-row">
      <input class="ggt-input" type="url" placeholder="https://…" />
      <button class="ggt-btn" type="submit">Run</button>
    </form>

    <section class="ggt-result">…</section>
    <aside class="ggt-tally ggt-tally--locked">…</aside>
    <section class="ggt-paywall">…</section>
    <p class="ggt-trust">Paid once. Yours to keep. No account required for the free pass.</p>
  </div>
</main>
```

## Per-tool page themes

Every tool page gets its own palette: a tinted page background, surfaces, headings, links and buttons all
derive from one brand colour. Same fonts, same components; only colour tokens change.

```tsx
<html lang="en" data-ggt-theme="moss" className={...fontVariables}>
```

| Theme id | Brand colour | Tool |
| --- | --- | --- |
| `ember` | `#d4693f` | fix-it |
| `lapis` | `#5f8bd1` | a11y-statement |
| `moss` | `#7d9b7a` | quote-invoice |
| `iris` | `#9b8ae0` | chat-to-pdf |
| `wheat` | `#c4a27a` | cottage-food-labels |
| `citron` | `#b8b94e` | listing-optimizer |
| `verdigris` | `#5f8f88` | domain-ssl-report |
| `plum` | `#8d6a7f` | maker-label-pack |

Do not also set `--ggt-accent` in the tool: the theme owns it. A tool can still add its own overrides on
`[data-ggt-theme="…"]` in its own CSS.

**Add or change a theme:** edit `scripts/themes.config.mjs`, run `npm run build:themes`, commit
`src/themes.css`. `npm test` fails if `themes.css` is stale or any pair misses WCAG AA
(body and headings 7:1; secondary text, links, accent text and button labels 4.5:1; borders and focus rings 3:1).

## Tokens

| Token | Role |
| --- | --- |
| `--ggt-void` | Page background |
| `--ggt-ink` | Panel |
| `--ggt-slate` | Raised panel |
| `--ggt-hairline` | Borders |
| `--ggt-paper` | Primary text |
| `--ggt-mist` | Muted text |
| `--ggt-accent` | Brand colour (borders, focus ring); set by the theme |
| `--ggt-accent-text` | Readable lighter accent for text (eyebrow, small labels) |
| `--ggt-heading` | Headings |
| `--ggt-link` / `--ggt-link-hover` | Links |
| `--ggt-wash` | Paywall / highlighted panel background |
| `--ggt-btn-bg` / `--ggt-btn-bg-hover` / `--ggt-btn-fg` | Buttons |
| `--font-display` / `--font-sans` / `--font-mono` | Fonts from the host app |

## Rules

- Do not add Tailwind or utility frameworks to consume this kit
- Stripe / checkout stay in the **shop** — paywall chrome here is presentational only
- Draft PRs in this repo; Brandon merges

## License

MIT
