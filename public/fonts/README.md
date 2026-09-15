# Fonts

## English (`display`, `body`, `mono` roles)
Back to **Fontsource** (self-hosted npm packages that mirror the Google
Fonts catalog) — `@fontsource-variable/bricolage-grotesque`,
`@fontsource-variable/instrument-sans`, `@fontsource/jetbrains-mono`.
These are pulled in via `npm install` and imported at the top of
`src/styles/global.css`. Nothing to drop in this folder for English.

## Persian (`fa` role)
Self-hosted directly from `public/fonts/fa/` — no package, no CDN. Each
static weight is its own file, matched to its own `@font-face` rule in
`global.css`:

| File | Weight |
|---|---|
| `Vazirmatn-Thin.woff2` | 100 |
| `Vazirmatn-ExtraLight.woff2` | 200 |
| `Vazirmatn-Light.woff2` | 300 |
| `Vazirmatn-Regular.woff2` | 400 |
| `Vazirmatn-Medium.woff2` | 500 |
| `Vazirmatn-SemiBold.woff2` | 600 |
| `Vazirmatn-Bold.woff2` | 700 |
| `Vazirmatn-ExtraBold.woff2` | 800 |

**Important:** these are *static* files (one weight per file), not a
variable font, so each one needs its **own** `@font-face` rule with a
single `font-weight` value. Packing several static files into one rule
with a list like `font-weight: 100 200 300 ... 900` is invalid CSS — a
single `@font-face` rule only accepts one weight, or a two-value range
*if the file itself is a variable font*. An invalid descriptor makes the
browser drop the whole rule, which looks exactly like "the font isn't
loading."

If you ever swap in the single variable-font file instead (usually named
something like `Vazirmatn[wght].woff2` or `Vazirmatn-Variable.woff2`),
collapse this back down to one rule:
```css
@font-face {
  font-family: 'Fa Local';
  src: url('/fonts/fa/Vazirmatn-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

## Licensing note
Whatever fonts you use must be licensed for **web embedding**. Vazirmatn
is SIL Open Font License, which covers this. If you swap in a different
typeface later, check its license — a desktop-only license (the kind
bundled with Photoshop/Illustrator, for instance) usually does not cover
web use.
