// One entry per website. Everything that differs between the three sites
// lives here, so the page templates can stay shared.

export const SITES = {
  main: {
    key: 'main',
    src: 'main',
    port: 4321,
    host: 'sittersbythesea.net',
    subdomain: null,
    demoPath: '',
    name: 'Sitters by the Sea',
    shortName: 'Sitters by the Sea',
  },
  vb: {
    key: 'vb',
    src: 'city',
    port: 4322,
    host: 'virginiabeach.sittersbythesea.net',
    subdomain: 'virginiabeach',
    demoPath: 'virginia-beach',
    name: 'Sitters by the Sea Virginia Beach',
    shortName: 'Virginia Beach',
  },
  chs: {
    key: 'chs',
    src: 'city',
    port: 4323,
    host: 'charleston.sittersbythesea.net',
    subdomain: 'charleston',
    demoPath: 'charleston',
    name: 'Sitters by the Sea Charleston',
    shortName: 'Charleston',
  },
};

// SITE_MODE controls how the three sites link to each other:
//   prod  -> https://virginiabeach.sittersbythesea.net
//   local -> http://virginiabeach.localhost:8080 (served by server.js)
//   demo  -> /virginia-beach/ (all three sites in one folder)
export function siteOrigin(key, mode = process.env.SITE_MODE || 'prod') {
  const s = SITES[key];
  // Staging or custom domains: ORIGIN_MAIN, ORIGIN_VB and ORIGIN_CHS override
  // the production addresses, e.g. ORIGIN_MAIN=https://sitters.reviewour.site
  const override = process.env[`ORIGIN_${key.toUpperCase()}`];
  if (override && mode !== 'demo' && mode !== 'local') return override.replace(/\/$/, '');
  if (mode === 'demo') return 'https://demo.sittersbythesea.net';
  if (mode === 'local') {
    const port = process.env.PORT || 8080;
    return s.subdomain ? `http://${s.subdomain}.localhost:${port}` : `http://localhost:${port}`;
  }
  return `https://${s.host}`;
}

export function siteBase(key, mode = process.env.SITE_MODE || 'prod') {
  return mode === 'demo' && SITES[key].demoPath ? `/${SITES[key].demoPath}` : '';
}

/** Absolute URL (prod/local) or root-relative path (demo) to a page on any site. */
export function siteHref(key, path = '/', mode = process.env.SITE_MODE || 'prod') {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (mode === 'demo') return `${siteBase(key, mode)}${p}`;
  return `${siteOrigin(key, mode)}${p}`;
}
