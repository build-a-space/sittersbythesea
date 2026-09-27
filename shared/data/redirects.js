// Old WordPress URLs -> new pages, so existing rankings and bookmarks carry
// over. Used by server.js and by the Netlify build (_redirects).
// TODO: check against the old site's sitemap before launch.
export const REDIRECTS = {
  main: {
    '/virginia-beach-dog-walking-pet-sitting/': { site: 'vb', path: '/' },
    '/charleston-dog-walking-pet-sitting/': { site: 'chs', path: '/' },
    '/contact-us/': { site: 'main', path: '/contact/' },
    '/about-us/': { site: 'main', path: '/about/' },
    '/testimonials/': { site: 'main', path: '/reviews/' },
    '/faq/': { site: 'main', path: '/services/' },
    '/trusted-partners/': { site: 'main', path: '/about/' },
    '/service-areas/': { site: 'main', path: '/#coasts' },
  },
};
