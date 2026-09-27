import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITES, siteBase, siteOrigin } from './shared/data/sites.js';

const key = process.env.SITE || 'main';
const mode = process.env.SITE_MODE || 'prod';
const site = SITES[key];
if (!site) throw new Error(`Unknown SITE "${key}". Use main, vb or chs.`);

export default defineConfig({
  site: siteOrigin(key, mode === 'demo' ? 'prod' : mode),
  base: siteBase(key, mode) || '/',
  srcDir: `./sites/${site.src}`,
  publicDir: './public',
  outDir: mode === 'demo' ? `./dist-demo/${key}` : `./dist/${key}`,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  server: { port: site.port },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
