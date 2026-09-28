# Hosting on Vercel

Three Vercel projects (team: Build A Space Members), all connected to
`build-a-space/sittersbythesea` and deploying the `main` branch. Every push to
`main` redeploys all three.

| Project | `SITE` | Staging domain (now) | Final domain (later) |
| --- | --- | --- | --- |
| sittersbythesea | `main` | sitters.reviewour.site | sittersbythesea.net (+ www) |
| sittersbythesea-virginiabeach | `vb` | sitters-vb.reviewour.site | virginiabeach.sittersbythesea.net |
| sittersbythesea-charleston | `chs` | sitters-chs.reviewour.site | charleston.sittersbythesea.net |

Both sets of domains are already added to the projects. Only the staging ones
work until the final DNS is switched.

The build (`npm run build:vercel`, set in `vercel.json`) writes
`.vercel/output` with the static site, redirects from old WordPress URLs,
security headers and, on the main site, the `/api/contact` function.

## Staging (current)

All three projects have these environment variables, so the sites link to
each other on the staging addresses and stay out of Google:

| Variable | Value |
| --- | --- |
| `ORIGIN_MAIN` | `https://sitters.reviewour.site` |
| `ORIGIN_VB` | `https://sitters-vb.reviewour.site` |
| `ORIGIN_CHS` | `https://sitters-chs.reviewour.site` |
| `NOINDEX` | `true` |

DNS records for reviewour.site:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `sitters` | `cname.vercel-dns.com` |
| CNAME | `sitters-vb` | `cname.vercel-dns.com` |
| CNAME | `sitters-chs` | `cname.vercel-dns.com` |

## Launch on sittersbythesea.net (later)

1. In all three projects, delete `ORIGIN_MAIN`, `ORIGIN_VB`, `ORIGIN_CHS`
   and `NOINDEX`, then redeploy.
2. At the DNS provider for sittersbythesea.net:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |
   | CNAME | `virginiabeach` | `cname.vercel-dns.com` |
   | CNAME | `charleston` | `cname.vercel-dns.com` |

   Remove old A/AAAA/CNAME records for `@` and `www` that point at the
   WordPress host. **Leave MX and TXT records alone** so email keeps working.
3. Each project's **Settings → Domains** page shows the exact values Vercel
   expects and turns green once DNS is correct. HTTPS is automatic.
4. Add the three domains to Google Search Console, submit each
   `https://<domain>/sitemap-index.xml`, and point each Google Business
   Profile at its city subdomain.

## Contact form email

The form posts to `/api/contact`, which emails requests through
[Resend](https://resend.com). In the **sittersbythesea** project, add:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from Resend |
| `CONTACT_TO` | `info@sittersbythesea.net` |
| `CONTACT_FROM` | e.g. `Sitters by the Sea <website@sittersbythesea.net>` after verifying the domain in Resend |

Redeploy after adding them. Until then, the form tells visitors to call,
text or email instead.
