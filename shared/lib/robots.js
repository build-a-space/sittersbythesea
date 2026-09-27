import { SITE_KEY, MODE, prodUrl } from './site.js';

export function robotsResponse() {
  const body = MODE === 'demo'
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${prodUrl(SITE_KEY, '/sitemap-index.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
