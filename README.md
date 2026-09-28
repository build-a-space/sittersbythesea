# Sitters by the Sea

One Node.js codebase ([Astro](https://astro.build)) that builds three websites:

| Site | Domain | Pages |
| --- | --- | --- |
| Main | `sittersbythesea.net` | Home, Services, About, Reviews, Contact |
| Virginia Beach | `virginiabeach.sittersbythesea.net` | Home, Services, Service areas |
| Charleston | `charleston.sittersbythesea.net` | Home, Services, Service areas |

## Commands

```bash
npm install
npm run dev          # main site at http://localhost:4321
npm run dev:vb       # Virginia Beach at http://localhost:4322
npm run dev:chs      # Charleston at http://localhost:4323

npm run build        # builds dist/main, dist/vb and dist/chs
npm start            # serves all three by hostname on :8080

SITE_MODE=local npm run build && npm start
# then open http://localhost:8080, http://virginiabeach.localhost:8080, http://charleston.localhost:8080

npm run demo         # one-folder preview of all three sites in demo/site
```

## Deploying

The sites are hosted on Vercel as three projects from this one repo, currently on staging addresses at reviewour.site. See [docs/vercel-setup.md](docs/vercel-setup.md). (A Netlify setup is also documented in [docs/netlify-setup.md](docs/netlify-setup.md).)

## Where things live

- `shared/data/`: business facts, services, cities and neighborhoods, domains. Most content edits happen here.
- `shared/components/`, `shared/layouts/`, `shared/styles/global.css`: the shared design system.
- `sites/main/pages/`: main site pages.
- `sites/city/pages/`: city pages, built once for each city (`SITE=vb` or `SITE=chs`).
- `public/images/`: logo, brand art and photos.
- `server.js`: an optional Node server for local previews or self-hosting. It picks the site by hostname, redirects old WordPress URLs and handles the contact form.
- `netlify.toml`, `scripts/netlify-build.js`: the Netlify build. Each Netlify site sets `SITE`.
- `docs/site-plan.html`: the site plan and design direction.

## SEO built in

- Unique titles, descriptions, canonical URLs and Open Graph tags on every page
- JSON-LD: Organization and WebSite (main), LocalBusiness with service areas (each city), BreadcrumbList and FAQPage
- Separate `sitemap-index.xml` and `robots.txt` for each subdomain
- 301 redirects from the old city pages to the new subdomains (`server.js`)
- Static HTML, inlined CSS, no client JavaScript framework

## To do before launch

- Add the Time To Pet portal link (`shared/data/business.js` → `timeToPet`)
- Confirm the Charleston phone number (`shared/data/cities.js`)
- Turn on Netlify Forms email notifications (docs/netlify-setup.md)
- Swap in full-size photos
