import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

export default defineConfig({
  site: 'https://me.tunetactics.ir',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: isVercel ? 'static' : 'server',
  adapter: isVercel ? undefined : node({ mode: 'standalone' }),
});
