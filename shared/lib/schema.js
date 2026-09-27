import { business } from '../data/business.js';
import { services } from '../data/services.js';
import { prodUrl } from './site.js';

const ORG_ID = `${prodUrl('main')}#organization`;

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: business.name,
    slogan: business.tagline,
    url: prodUrl('main'),
    logo: prodUrl('main', '/images/brand/logo.png'),
    email: business.email,
    telephone: business.phoneHref,
    foundingDate: String(business.founded),
    founder: { '@type': 'Person', name: business.owner },
    award: business.awards.map((a) => `${a.title}: ${a.detail}`),
    memberOf: business.memberships.map((m) => ({ '@type': 'Organization', name: m.name })),
    sameAs: [business.facebook, business.yelp, business.nextdoor],
    subOrganization: [{ '@id': `${prodUrl('vb')}#business` }, { '@id': `${prodUrl('chs')}#business` }],
  };
}

export function website(key) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: business.name,
    url: prodUrl(key),
    publisher: { '@id': ORG_ID },
  };
}

export function localBusiness(city) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${prodUrl(city.key)}#business`,
    name: `${business.name} ${city.name}`,
    description: `Dog walking, pet sitting, overnight and live-in pet care in ${city.name}, ${city.state}.`,
    url: prodUrl(city.key),
    image: prodUrl(city.key, city.heroImage),
    logo: prodUrl(city.key, '/images/brand/logo.png'),
    telephone: city.phoneHref,
    email: business.email,
    address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: city.state, addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: city.geo.lat, longitude: city.geo.lng },
    areaServed: [
      { '@type': 'City', name: `${city.name}, ${city.state}` },
      ...city.areas.map((a) => ({ '@type': 'Place', name: `${a.name}, ${city.state}` })),
    ],
    openingHoursSpecification: business.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: { '@id': ORG_ID },
    sameAs: [business.facebook],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pet care services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.short },
      })),
    },
  };
}

export function breadcrumbs(key, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: prodUrl(key, item.path),
    })),
  };
}

export function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
