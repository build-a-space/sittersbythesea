// Vercel build: each of the three Vercel projects sets SITE (main, vb or chs).
// Writes .vercel/output (Vercel Build Output API v3) with the static site,
// per-site redirects and headers, and the contact form function (main only).
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { SITES, siteHref } from '../shared/data/sites.js';
import { REDIRECTS } from '../shared/data/redirects.js';

const key = process.env.SITE;
if (!SITES[key]) {
  console.error(`Set the SITE environment variable to one of: ${Object.keys(SITES).join(', ')}`);
  process.exit(1);
}

const r = spawnSync('npx', ['astro', 'build'], { stdio: 'inherit', env: { ...process.env, SITE: key, SITE_MODE: 'prod' } });
if (r.status !== 0) process.exit(r.status ?? 1);

const out = '.vercel/output';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(`dist/${key}`, `${out}/static`, { recursive: true });

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const redirects = Object.entries(REDIRECTS[key] ?? {}).map(([from, to]) => ({
  src: `^${escape(from.replace(/\/$/, ''))}/?$`,
  status: 301,
  headers: { Location: siteHref(to.site, to.path, 'prod') },
}));

const routes = [
  {
    src: '/(.*)',
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'SAMEORIGIN',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
    continue: true,
  },
  { src: '^/images/(.*)$', headers: { 'Cache-Control': 'public, max-age=2592000' }, continue: true },
  // Add the trailing slash Astro's directory-style pages expect.
  { src: '^/(?!api/)((?:[^/.]+/)*[^/.]+)$', status: 308, headers: { Location: '/$1/' } },
  ...redirects,
  { handle: 'filesystem' },
  { src: '^/(.*)/$', dest: '/$1/index.html', check: true },
  { handle: 'error' },
  { status: 404, src: '^(?!/api).*$', dest: '/404.html' },
];
writeFileSync(`${out}/config.json`, JSON.stringify({ version: 3, routes }, null, 2));

if (key === 'main') {
  const fn = `${out}/functions/api/contact.func`;
  mkdirSync(fn, { recursive: true });
  cpSync('vercel/contact-function.js', `${fn}/index.js`);
  writeFileSync(`${fn}/package.json`, JSON.stringify({ type: 'commonjs' }));
  writeFileSync(`${fn}/.vc-config.json`, JSON.stringify({ runtime: 'nodejs22.x', handler: 'index.js', launcherType: 'Nodejs' }, null, 2));
}
console.log(`\nBuilt ${key} → ${out} (${redirects.length} redirects)`);
