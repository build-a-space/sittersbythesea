// Builds all three sites: dist/main, dist/vb and dist/chs.
import { spawnSync } from 'node:child_process';

const mode = process.env.SITE_MODE || 'prod';
for (const site of ['main', 'vb', 'chs']) {
  console.log(`\n▸ Building ${site} (${mode})`);
  const r = spawnSync('npx', ['astro', 'build'], { stdio: 'inherit', env: { ...process.env, SITE: site, SITE_MODE: mode } });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
