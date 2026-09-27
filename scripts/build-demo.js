// Builds a single-folder preview of all three sites (demo/site) that works
// from any static file host: main at the root, city sites in subfolders, and
// every link rewritten to a relative path ending in index.html.
import { spawnSync } from 'node:child_process';
import { cpSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { SITES } from '../shared/data/sites.js';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const out = path.join(root, 'demo', 'site');
rmSync(path.join(root, 'demo'), { recursive: true, force: true });
rmSync(path.join(root, 'dist-demo'), { recursive: true, force: true });

for (const key of Object.keys(SITES)) {
  const r = spawnSync('npx', ['astro', 'build'], { cwd: root, stdio: 'inherit', env: { ...process.env, SITE: key, SITE_MODE: 'demo' } });
  if (r.status !== 0) process.exit(r.status ?? 1);
  const dest = path.join(out, SITES[key].demoPath);
  mkdirSync(dest, { recursive: true });
  cpSync(path.join(root, 'dist-demo', key), dest, { recursive: true });
}
// City builds carry their own copy of /public; the demo shares the root copy.
for (const key of ['vb', 'chs']) {
  const dir = path.join(out, SITES[key].demoPath);
  for (const f of ['images', 'favicon.png']) rmSync(path.join(dir, f), { recursive: true, force: true });
}

function toRelative(fromFile, url) {
  const m = url.match(/^([^?#]*)(.*)$/);
  let p = m[1];
  if (p.endsWith('/')) p += 'index.html';
  const rel = path.posix.relative(path.posix.dirname('/' + path.relative(out, fromFile).split(path.sep).join('/')), p);
  return (rel || 'index.html') + m[2];
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const f = path.join(dir, name);
    if (statSync(f).isDirectory()) walk(f);
    else if (f.endsWith('.html')) {
      let html = readFileSync(f, 'utf8');
      html = html.replace(/(\s(?:href|src|action)=")(\/(?!\/)[^"]*)"/g, (_, a, u) => `${a}${toRelative(f, u)}"`);
      html = html.replace(/url\((['"]?)(\/(?!\/)[^)'"]*)\1\)/g, (_, q, u) => `url(${q}${toRelative(f, u)}${q})`);
      writeFileSync(f, html);
    }
  }
}
walk(out);
rmSync(path.join(root, 'dist-demo'), { recursive: true, force: true });
console.log(`\nDemo written to ${path.relative(root, out)}/`);
