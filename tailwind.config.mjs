/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        graphite: 'rgb(var(--color-graphite) / <alpha-value>)',
        fog: 'rgb(var(--color-fog) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        chalk: 'rgb(var(--color-chalk) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'sans-serif'],
        body: ['"Instrument Sans Variable"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        fa: ['"Vazirmatn Variable"', 'Tahoma', '"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        'clamp-hero': 'clamp(2.75rem, 8vw, 8rem)',
        'clamp-h2': 'clamp(2rem, 5vw, 4rem)',
        'clamp-h3': 'clamp(1.5rem, 3vw, 2.25rem)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        widemono: '0.14em',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
