import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://aidenybai.com',
  sitemap: true,
  integrations: [solid(), mdx()],
  markdown: {
    remarkPlugins: [],
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true,
    },
  },
});
