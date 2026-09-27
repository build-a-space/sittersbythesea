import { SITES, siteBase, siteHref, siteOrigin } from '../data/sites.js';
import { cities } from '../data/cities.js';
import { business } from '../data/business.js';

export const SITE_KEY = process.env.SITE || 'main';
export const MODE = process.env.SITE_MODE || 'prod';
export const site = SITES[SITE_KEY];
export const city = cities[SITE_KEY] || null;

/** Link to a page on the current site. */
export const href = (path = '/') => `${siteBase(SITE_KEY)}${path}`;

/** Link to a page on any of the three sites. */
export const link = (key, path = '/') => (key === SITE_KEY ? href(path) : siteHref(key, path));

/** Production URL for canonical tags, Open Graph and schema. */
export const prodUrl = (key, path = '/') => `${siteOrigin(key, 'prod')}${path}`;

/** Where "Book" buttons go: Time To Pet once configured, otherwise the contact form. */
export const bookHref = () => business.timeToPet || link('main', '/contact/#book');

/** Strip the demo base from Astro.url.pathname. */
export const pagePath = (pathname) => {
  const base = siteBase(SITE_KEY);
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
};
