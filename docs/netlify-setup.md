# Launching on Netlify

The repo builds three separate Netlify sites. All three connect to the same
GitHub repo and branch. The only difference between them is the `SITE`
environment variable.

| Netlify site name (suggested) | `SITE` | Custom domain |
| --- | --- | --- |
| sittersbythesea | `main` | `sittersbythesea.net` (+ `www.sittersbythesea.net`) |
| sittersbythesea-vb | `vb` | `virginiabeach.sittersbythesea.net` |
| sittersbythesea-chs | `chs` | `charleston.sittersbythesea.net` |

## 1. Create the three sites

Repeat for each row in the table:

1. In Netlify, choose **Add new site → Import an existing project → GitHub**,
   and pick `build-a-space/sittersbythesea`.
2. Branch to deploy: `main`.
3. Leave the build command and publish directory as they are. Netlify reads
   them from `netlify.toml` (`npm run build:netlify`, `netlify-publish`).
4. Before the first deploy, open **Site configuration → Environment
   variables** and add `SITE` with the value from the table.
5. Deploy, then check the `*.netlify.app` preview link.

## Staging on reviewour.site (before launch)

To review the sites on staging addresses first, give each staging site its
own domain in Netlify, for example:

| Netlify site | Staging domain |
| --- | --- |
| main | `sitters.reviewour.site` |
| vb | `sitters-vb.reviewour.site` |
| chs | `sitters-chs.reviewour.site` |

Then add these environment variables to **all three** Netlify sites (in
addition to `SITE`), and redeploy:

| Variable | Value |
| --- | --- |
| `ORIGIN_MAIN` | `https://sitters.reviewour.site` |
| `ORIGIN_VB` | `https://sitters-vb.reviewour.site` |
| `ORIGIN_CHS` | `https://sitters-chs.reviewour.site` |
| `NOINDEX` | `true` |

The sites then link to each other on the staging addresses, and `NOINDEX`
keeps Google from indexing the staging copies.

**At launch:** delete all four variables, add the real domains, and
redeploy. The sites switch back to the `sittersbythesea.net` addresses.

## 2. Contact form (main site only)

The contact form uses Netlify Forms, so there is nothing to install.

1. On the **main** site, open **Forms** and enable form detection, then
   redeploy once. A form named `contact` appears.
2. Under **Forms → Form notifications**, add an email notification to
   `info@sittersbythesea.net`.

Spam protection: the form has a hidden honeypot field. Netlify's spam filter
also runs on every submission.

## 3. Connect the domains

On each site, open **Domain management → Add a domain** and add the domain
from the table. Then choose one of the two options below.

**Option A: keep DNS where it is now.** At your current DNS provider:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | Netlify's load balancer IP (Netlify shows it; currently `75.2.60.5`) |
| CNAME | `www` | `sittersbythesea.netlify.app` |
| CNAME | `virginiabeach` | `sittersbythesea-vb.netlify.app` |
| CNAME | `charleston` | `sittersbythesea-chs.netlify.app` |

Use the real `*.netlify.app` names of your sites if they differ.

**Option B: move DNS to Netlify.** Netlify gives you nameservers to set at
your registrar. **Before switching, copy every existing record, especially
the MX records for email.** Otherwise email to info@sittersbythesea.net
will stop working.

Netlify issues free HTTPS certificates automatically once DNS points at it.
On the main site, set `sittersbythesea.net` as the primary domain so `www`
redirects to it.

## 4. After launch

- In Google Search Console, add all three domains as properties and submit
  each `https://<domain>/sitemap-index.xml`.
- Update both Google Business Profiles: the Virginia Beach profile's website
  goes to `virginiabeach.sittersbythesea.net`, and Charleston's goes to
  `charleston.sittersbythesea.net`.
- Check the old WordPress sitemap for URLs that are not in
  `shared/data/redirects.js` and add them there.

## Testing a build locally

```bash
SITE=main npm run build:netlify   # or vb / chs
npx serve netlify-publish
```
