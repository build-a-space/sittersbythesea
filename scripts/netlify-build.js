// Netlify build: each of the three Netlify sites sets SITE (main, vb or chs)
// in its environment variables. This builds that one site into
// netlify-publish/ and writes its _redirects file.
import { spawnSync } from 'node:child_process';
import { cpSync, rmSync, writeFileSync } from 'node:fs';
import { SITES, siteHref } from '../shared/data/sites.js';
import { REDIRECTS } from '../shared/data/redirects.js';

const key = process.env.SITE;
if (!SITES[key]) {
  console.error(`Set the SITE environment variable to one of: ${Object.keys(SITES).join(', ')}`);
  process.exit(1);
}

const env = { ...process.env, SITE: key, SITE_MODE: 'prod' };
const r = spawnSync('npx', ['astro', 'build'], { stdio: 'inherit', env });
if (r.status !== 0) process.exit(r.status ?? 1);

rmSync('netlify-publish', { recursive: true, force: true });
cpSync(`dist/${key}`, 'netlify-publish', { recursive: true });

const lines = Object.entries(REDIRECTS[key] ?? {}).map(([from, to]) => {
  const target = siteHref(to.site, to.path, 'prod');
  return `${from.replace(/\/$/, '')}  ${target}  301!\n${from}  ${target}  301!`;
});
writeFileSync('netlify-publish/_redirects', lines.length ? `${lines.join('\n')}\n` : '');
console.log(`\nBuilt ${key} → netlify-publish/ (${lines.length} redirects)`);
