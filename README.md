# ggt-design-kit

Installable **plain CSS** design kit for [Golden Goose Tools](https://github.com/GooseyPrime/GoldenGooseTools).

- Dark surfaces, hairline borders, **no drop shadows**
- **Fraunces** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (labels)
- Shared chrome: hero, input, result panel, locked tally, paywall, trust line
- One accent slot per tool (`--ggt-accent`)
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

1. Load fonts (shop already does this via `next/font`):

```ts
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
```

2. Import the kit once (e.g. root layout or tool `globals.css`):

```css
@import "ggt-design-kit/src/index.css";

/* Per-tool accent */
:root {
  --ggt-accent: #b08b4f; /* example: antique gold */
}
```

3. Mark up with kit classes:

```html
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
```

## Tokens

| Token | Role |
| --- | --- |
| `--ggt-void` | Page background |
| `--ggt-ink` | Panel |
| `--ggt-slate` | Raised panel |
| `--ggt-hairline` | Borders |
| `--ggt-paper` | Primary text |
| `--ggt-mist` | Muted text |
| `--ggt-accent` | **Per-tool** accent (set in the tool) |
| `--font-display` / `--font-sans` / `--font-mono` | Fonts from the host app |

## Rules

- Do not add Tailwind or utility frameworks to consume this kit
- Stripe / checkout stay in the **shop** — paywall chrome here is presentational only
- Draft PRs in this repo; Brandon merges

## License

MIT
