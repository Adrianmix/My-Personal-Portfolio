# Mohammad Pouhassani — Portfolio Site

Astro + Tailwind + one React island + a vanilla three.js signature element.
Fully bilingual (English / Persian, with RTL support) and theme-aware
(light / dark / auto).

## Stack
- **Astro** — static site framework, ships almost no JS by default
- **Tailwind CSS** — utility styling, tokens defined in `tailwind.config.mjs`
- **React** — one interactive island (`WorkGrid.tsx`, the filterable project grid)
- **three.js** — the "Ink Blob," a grayscale 3D metaball in the hero (`src/scripts/blob.ts`)
- **Dark mode** — light / dark / auto toggle, default auto, class-based via Tailwind (`darkMode: 'class'`)
- **Fonts** — all via Fontsource, including Vazirmatn for Persian (a real Google Fonts entry, self-hosted via npm — no manual font files)

## Fonts
Every typeface — `font-display`, `font-body`, `font-mono`, and `font-fa`
— comes from **Fontsource**: self-hosted npm packages that repackage the
actual Google Fonts catalog files. No runtime call to fonts.google.com,
no manually-placed font files to get filenames/formats wrong on. Just
`npm install` and they're there. Vazirmatn (the Persian typeface) is a
real Google Fonts entry under the OFL license, so this is both the
simplest and the most correct way to use it.

## Adding real project images
Each project card shows a plain placeholder box until you give it an
`image`. To add one:
1. Drop the file in `public/work/` (see `public/work/README.md`).
2. In `src/i18n/content.ts`, find that project under `work.projects` and
   add an `image` field pointing at it, e.g. `image: '/work/project-one.jpg'`.
3. Set it on both the `en` and `fa` entries if you want the image to show
   in both languages (they share the same file, just different copy).

No `image` set → the card falls back to the placeholder automatically, so
you can fill these in one at a time.

## Project detail modal
Clicking **View** on a project card opens a modal with the full picture:
description, tags (languages/tools), a screenshot gallery, and buttons
for the live demo and GitHub repo. It's all driven by the same `Project`
entries in `src/i18n/content.ts` — no separate data to maintain:

```ts
{
  title: 'Local Network Connection',
  description: '...',
  type: 'app' as const,
  tags: ['React.js', 'Next.js', 'Php'],
  liveUrl: 'https://mpouhassaniir.vercel.app/',
  githubUrl: 'https://github.com/Adrianmix/local-hub',
  image: '/work/local-hub.jpg',             // card cover + modal hero image
  screenshots: [                             // modal gallery, optional
    '/work/local-hub-1.jpg',
    '/work/local-hub-2.jpg',
  ],
},
```

- `githubUrl` is separate from `caseStudyUrl` — use whichever apply.
  `caseStudyUrl` renders as a plain text link (e.g. for a Figma file or
  write-up); `githubUrl` renders as its own button with a GitHub mark.
- `screenshots` is optional. Left unset, the modal shows a small
  "No screenshots yet" note instead of an empty gallery.
- The modal closes on Escape, on backdrop click, or the close button, and
  locks page scroll while open. It also respects the page's `dir`, so it
  mirrors correctly on the Persian route.
- **Click any image to open it full-size** in a lightbox — the hero image
  and every screenshot thumbnail are clickable (hover shows an expand
  icon). The lightbox supports left/right navigation between all of a
  project's images (buttons, or the arrow keys — mapped to the physical
  side they appear on, so this flips correctly in RTL), and closes on
  Escape, backdrop click, or its own close button. Escape closes only the
  lightbox first if it's open on top of the modal, then the modal on a
  second press.
- **A "Project details" section for the full write-up.** The card and the
  top of the modal both use the short `description`. For anything
  longer — the problem it solves, stack details, decisions you made — add
  a `fullDescription` field:
  ```ts
  fullDescription:
    'First paragraph.\n\nSecond paragraph — separate paragraphs with a blank line, each one renders as its own <p>.',
  ```
  Left unset, this section just doesn't render, so you can fill it in
  project by project. There's a working example on the first project in
  both `en` and `fa`.

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
The site now has two fully separate routes sharing one component set:
- `/` — English, LTR
- `/fa` — Persian, RTL

Every component takes a `lang="en" | "fa"` prop and pulls its copy from
`src/i18n/content.ts` — there's one dictionary per language, so translating
or editing text never means touching a component file. `<html dir>` flips
to `rtl` automatically on the Persian route, which is what drives the
mirrored layout (logical `start-`/`end-` positioning instead of
`left`/`right` throughout), the reversed marquee direction, the flipped
services hover-arrow, and the font swap to **Vazirmatn** (a variable font
built for Persian/Arabic script via Fontsource — Latin fonts don't cover
those glyphs).
Email addresses stay forced `dir="ltr"` even on the Persian page, since
addresses and URLs shouldn't mirror.

A language switcher (`فارسی` / `English`) sits in the header on both
versions. Add more languages later by adding a new key to `content.ts` and
a new `src/pages/<code>/index.astro` — no component rewrites needed.

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
- **Palette (monochrome, as requested):** Ink `#0B0B0C`, Paper `#F5F5F3`,
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

## What's still placeholder (tell me and I'll fill these in)
- Real name / bio copy — in `src/i18n/content.ts`, in **both** the `en` and
  `fa` objects
- A real portrait photo (currently a gradient block in `About.astro`)
- Real projects — screenshots, live demo links, and case study links, in
  `content.ts` under `work.projects` for each language (currently 6
  placeholder entries, 3 web / 3 visual)
- Real email + social links (also in `content.ts`, under `contact`)
- Favicon / any brand mark beyond the placeholder dot

If your Persian is better than mine, double-check the `fa` copy in
`content.ts` — it's a reasonable machine-assisted translation, not
reviewed by a native speaker.
