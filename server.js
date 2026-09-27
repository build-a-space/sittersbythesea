// Serves all three built sites from one Node process, picking the site by
// hostname. Locally: http://localhost:8080, http://virginiabeach.localhost:8080
// and http://charleston.localhost:8080 (run `SITE_MODE=local npm run build` first
// so cross-site links point at localhost).
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { REDIRECTS } from './shared/data/redirects.js';

const PORT = Number(process.env.PORT) || 8080;
const DIST = path.resolve(new URL('.', import.meta.url).pathname, 'dist');
const APEX = 'sittersbythesea.net';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};


function siteFor(host = '') {
  const h = host.split(':')[0].toLowerCase();
  if (h.startsWith('virginiabeach.')) return 'vb';
  if (h.startsWith('charleston.')) return 'chs';
  return 'main';
}

function originFor(site, req) {
  const host = (req.headers.host || APEX).toLowerCase();
  const local = host.includes('localhost');
  const proto = local ? 'http' : 'https';
  const base = local ? `localhost:${PORT}` : APEX;
  const sub = { main: '', vb: 'virginiabeach.', chs: 'charleston.' }[site];
  return `${proto}://${sub}${base}`;
}

function send(res, status, file, headers = {}) {
  const type = TYPES[path.extname(file)] || 'application/octet-stream';
  const cache = /\.(png|jpe?g|webp|avif|svg|woff2|ico)$/.test(file) ? 'public, max-age=2592000' : 'public, max-age=300';
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': cache, 'X-Content-Type-Options': 'nosniff', ...headers });
  createReadStream(file).pipe(res);
}

function handleContact(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 20_000) req.destroy();
  });
  req.on('end', () => {
    const data = Object.fromEntries(new URLSearchParams(body));
    if (!data.name || !data.email) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: false, error: 'Name and email are required.' }));
    }
    // TODO: send to the office inbox (e.g. via an email API) or into Time To Pet.
    console.log('[contact]', new Date().toISOString(), JSON.stringify(data));
    if ((req.headers.accept || '').includes('application/json')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: true }));
    }
    res.writeHead(303, { Location: '/contact/?sent=1#book' });
    res.end();
  });
}

createServer((req, res) => {
  const host = (req.headers.host || '').toLowerCase();
  if (host.startsWith('www.')) {
    res.writeHead(301, { Location: `https://${host.slice(4)}${req.url}` });
    return res.end();
  }
  const site = siteFor(host);
  const url = new URL(req.url, 'http://x');

  if (url.pathname === '/api/contact' && req.method === 'POST') return handleContact(req, res);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    return res.end();
  }

  const redirect = REDIRECTS[site]?.[url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`];
  if (redirect) {
    res.writeHead(301, { Location: `${originFor(redirect.site, req)}${redirect.path}` });
    return res.end();
  }

  const root = path.join(DIST, site);
  let file = path.normalize(path.join(root, decodeURIComponent(url.pathname)));
  if (!file.startsWith(root)) {
    res.writeHead(400);
    return res.end();
  }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` });
      return res.end();
    }
    file = path.join(file, 'index.html');
  }
  if (existsSync(file)) return send(res, 200, file);
  const notFound = path.join(root, '404.html');
  if (existsSync(notFound)) return send(res, 404, notFound);
  res.writeHead(404);
  res.end('Not found');
}).listen(PORT, () => {
  console.log(`Sitters by the Sea on http://localhost:${PORT}`);
  console.log(`  Virginia Beach: http://virginiabeach.localhost:${PORT}`);
  console.log(`  Charleston:     http://charleston.localhost:${PORT}`);
});
