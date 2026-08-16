# My Portfolio Site (Foundation)

Astro + Tailwind + one React island + a vanilla three.js signature element.
This is the **foundation pass**: layout, design system, responsiveness, and
the 3D signature piece are all in place with placeholder copy and projects.
Real content (photos, real project screenshots/links, bio) comes next.

## Stack
- **Astro** — static site framework, ships almost no JS by default
- **Tailwind CSS** — utility styling, tokens defined in `tailwind.config.mjs`
- **React** — one interactive island (`WorkGrid.tsx`, the filterable project grid)
- **three.js** — the "Ink Blob," a grayscale 3D metaball in the hero (`src/scripts/blob.ts`)
- **Dark mode** — light / dark / auto toggle, default auto, class-based via Tailwind (`darkMode: 'class'`)

## Dark mode
A light / dark / auto toggle sits in the header (desktop and mobile) next
to the language switcher. **Default is "auto"** — it follows the OS-level
`prefers-color-scheme` setting until the person picks something explicit,
at which point the choice is saved to `localStorage` and respected on
every future visit and on both the English and Persian routes.

How it works:
- **No flash on load.** A small blocking script in `Layout.astro`'s
  `<head>` (`is:inline`, runs before first paint) reads the stored
  preference and applies the `dark` class to `<html>` immediately.
- **One set of CSS variables drives everything.** `src/styles/global.css`
  defines `--color-ink`, `--color-paper`, `--color-graphite`, `--color-fog`,
  `--color-chalk` on `:root`, and a second set on `.dark`. Dark mode
  *swaps the roles* rather than just darkening — `ink` (foreground)
  becomes the light value and `paper` (background) becomes the dark one.
  `tailwind.config.mjs` points every color token at these variables, so
  every existing `bg-paper` / `text-ink` / `bg-ink` / `border-ink/10` class
  across all components repaints correctly with no component changes —
  including the deliberately-inverted Contact section, which still reads
  as "inverted" against a dark page.
- **The 3D blob adapts too.** Its material color tracks `--color-ink` at
  runtime (`src/scripts/blob.ts`) and updates via a `MutationObserver` on
  `<html>`'s class — otherwise `mix-blend-mode: difference` would render
  it nearly invisible once the palette inverts.
- **Auto mode stays live.** While the preference is "auto," a
  `prefers-color-scheme` change listener re-applies the theme immediately
  if you switch your OS setting without touching the toggle.
- The `<meta name="theme-color">` tag (mobile browser chrome color) updates
  alongside the toggle.

## Languages
The site has two fully separate routes sharing one component set:
- `/` — English, LTR
- `/fa` — Persian, RTL

Every component takes a `lang="en" | "fa"` prop and pulls its copy from
`src/i18n/content.ts` — there's one dictionary per language, so translating
or editing text never means touching a component file. `<html dir>` flips
to `rtl` automatically on the Persian route, which is what drives the
mirrored layout (logical `start-`/`end-` positioning instead of
`left`/`right` throughout), the reversed marquee direction, the flipped
services hover-arrow, and the font swap to **Vazirmatn** (a variable font
built for Persian/Arabic script — Latin fonts don't cover those glyphs).
Email addresses stay forced `dir="ltr"` even on the Persian page, since
addresses and URLs shouldn't mirror.

A language switcher (`فارسی` / `English`) sits in the header on both
versions. Add more languages later by adding a new key to `content.ts`

## Run it locally
```bash
npm install
npm run dev
```
Then open the local URL Astro prints (usually `http://localhost:4321`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Design system
- **Palette (monochrome):** Ink `#0B0B0C`, Paper `#F5F5F3`,
  Chalk `#FFFFFF`, Graphite `#4A4A4A`, Fog `#D8D6D2`.
- **Type:** Bricolage Grotesque (display, playful/chunky), Instrument Sans
  (body), JetBrains Mono (labels, eyebrows, nav — a small nod to code).
- **Signature element:** the hero blob is rendered in three.js and sits
  behind the headline with `mix-blend-mode: difference`, so it inverts
  whatever text or shape it drifts across. That's the one "loud" move —
  everything else is intentionally quiet. It respects
  `prefers-reduced-motion` (freezes instead of animating).
- **3D/motion touches:** the blob (WebGL), tilt-on-hover project cards
  (CSS 3D transform), an infinite marquee of skills under the hero.

## File map
```
src/
  components/   Header, Hero, About, Work (+ WorkGrid.tsx island), Services, Contact, Footer, ThemeToggle
  i18n/         content.ts — English + Persian copy dictionaries
  layouts/      Layout.astro (head, meta, global styles, lang/dir + hreflang)
  pages/        index.astro (English, /) and fa/index.astro (Persian, /fa)
  scripts/      blob.ts (three.js scene)
  styles/       global.css (fonts, resets, marquee/blend utilities, RTL overrides)
```