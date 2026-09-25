# Deploying

Vercel, one project, production on `main`.

## 1. Repository and project

1. Push this repository to GitHub (for example `TomAndrewsRecGroup/Laws-Safety-Website`).
2. In Vercel, **Add New → Project**, import it, framework preset Next.js, no build overrides. `npm run build` runs `content:check` first and the record ships with no `[[placeholders]]`, so it builds clean. If a placeholder is ever added back (a fact awaiting Stephen), the build fails until it is filled; `ALLOW_PLACEHOLDERS=1` permits a Preview build only. Never set it for Production.
3. Under **Settings → Environment Variables**, add the variables below.

## 2. Environment variables

| Variable | Environment | Value |
|---|---|---|
| `RESEND_API_KEY` | Production, Preview | From resend.com → API keys |
| `RESEND_FROM` | Production, Preview | `Laws Safety website <noreply@laws-safety.com>` (a verified domain, see §4) |
| `CONTACT_TO` | Preview only | `tomandrews1240@gmail.com` while testing; unset in Production so messages reach Stephen |
| `INDEXNOW_API_KEY` | Production | `openssl rand -hex 32` |
| `INDEXNOW_SUBMIT_SECRET` | Production | `openssl rand -base64 32` |
| `CRON_SECRET` | Production | `openssl rand -base64 32`; Vercel sends it as a Bearer header on cron invocations |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production | `G-XXXXXXXXXX` once the GA4 property exists; unset until then |
| `GOOGLE_SITE_VERIFICATION` | Production | The Search Console HTML-tag token, once the property is added |
| `BING_SITE_VERIFICATION` | Production | The Bing Webmaster Tools token |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Production | Optional; the contact form falls back to in-memory rate limiting without them |

## 3. Domain

1. **Settings → Domains**: add `www.laws-safety.com` and `laws-safety.com`. Set `www` as the production domain and let Vercel redirect the bare domain to it. Do **not** add a host redirect in `next.config.mjs`; it loops on Vercel.
2. At the registrar, point the domain at Vercel as the dashboard instructs (A record `76.76.21.21` for the apex, CNAME `cname.vercel-dns.com` for `www`, or Vercel nameservers).
3. `lib/site.ts` already has `BASE_URL = 'https://www.laws-safety.com'`. If the canonical host ever changes, that constant is the only place to change it.

## 4. Resend

1. Add `laws-safety.com` (or `web.laws-safety.com`) as a domain in Resend and create the DKIM and SPF records it gives you at the registrar.
2. `RESEND_FROM` must use that domain. The `onboarding@resend.dev` sandbox only delivers to the account owner.
3. Test the form on a Preview deployment with `CONTACT_TO=tomandrews1240@gmail.com`, then remove `CONTACT_TO` for Production.

## 5. After the first production deploy

1. **Search Console**: add the `https://www.laws-safety.com` property, verify with the HTML tag (`GOOGLE_SITE_VERIFICATION`), submit `https://www.laws-safety.com/sitemap.xml`.
2. **Bing Webmaster Tools**: the same, with `BING_SITE_VERIFICATION`. Bing also reads the IndexNow submissions.
3. **IndexNow**: confirm `https://www.laws-safety.com/{INDEXNOW_API_KEY}.txt` returns the key, then trigger a first sweep:
   ```bash
   curl -X POST https://www.laws-safety.com/api/indexnow \
     -H "Authorization: Bearer $INDEXNOW_SUBMIT_SECRET" -H "Content-Type: application/json" \
     -d '{"all": true}'
   ```
4. **GA4**: create the property, set `NEXT_PUBLIC_GA_MEASUREMENT_ID`, redeploy. The tag loads only after a visitor accepts the banner.
5. **GitHub Actions**: the `SEO audit` workflow runs on the next `deployment_status` event from Vercel. Check the Actions tab for the first run; it should report 0 errors.
6. **Open Graph**: paste the homepage into the LinkedIn Post Inspector to confirm the card renders.

## 6. Day-to-day

- Content changes are edits to `lib/content/*.ts` followed by a push. `content:check` runs on every build.
- A new guide is a new record in `insights.ts`; the sitemap, RSS and IndexNow pick it up on deploy.
- Testimonials go live the moment `testimonials.ts` has an entry.
