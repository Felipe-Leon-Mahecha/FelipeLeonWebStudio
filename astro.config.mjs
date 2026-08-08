// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://felipe-leon-web-studio.vercel.app',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), icon()]
});
