# Laws Safety — Website

The website of [Laws Safety](https://www.laws-safety.com), the professional name of Stephen Laws CMIOSH, health and safety practitioner, Wrotham, Kent (Laws Safety Limited, company number 17413846).

**Read `docs/WORDING_RULES.md` before touching any copy.** The site describes Stephen's record under a non-compete: it never sells, and `npm run build` refuses to ship copy that does.

Built with Next.js 15 (App Router), Tailwind CSS and Framer Motion, hosted on Vercel. Forked from the Andrews Recruitment Group site so it inherits the same SEO / AI-discoverability architecture; everything recruitment-specific was removed.

## Stack

- **Framework**: Next.js 15 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS with the Laws Safety design tokens (`tailwind.config.ts`, mirrored from the Design System artifact)
- **Type**: Sora, self-hosted (`app/fonts`, OFL)
- **Email**: Resend (the contact form)
- **Rate limiting**: Upstash Redis, in-memory fallback
- **Analytics**: Vercel Analytics (cookieless); Google Analytics 4 behind a consent banner
- **Hosting**: Vercel, with a daily IndexNow cron

## The content model

Every page family is generated from `lib/content/*`:

| File | Drives |
|---|---|
| `profile.ts` | Who Stephen is (from his CV): homepage, `/about`, schema Person, llms.txt, author byline. Employers are described by type, never named |
| `disciplines.ts` | `/expertise` and `/expertise/[slug]` |
| `sectors.ts` | `/sectors` and `/sectors/[slug]` (the four sectors on his CV) |
| `locations.ts` | `/locations` and `/locations/[slug]` |
| `insights.ts` | `/insights`, `/insights/[slug]`, `/rss.xml` |
| `testimonials.ts` | `/testimonials` (404 and unlisted while empty) |
| `faqs.ts` | `/faq` |
| `legal.ts` | Laws Safety Limited: company number, registered office and ICO reference, on `/legal` and in the footer |

Change a record and the page, the sitemap, `llms.txt`, the internal link bands and the JSON-LD all follow. `docs/CONTENT_MODEL.md` explains each field and how to add a discipline, sector, location, guide or testimonial.

Any string containing `[[…]]` is a fact still to be confirmed from Stephen's own record; none remain at launch. `npm run content:check` lists any that are added; `npm run build` runs it first and fails while any remain (`ALLOW_PLACEHOLDERS=1` permits a preview build).

## Pages

| Route | Description |
|---|---|
| `/` | Homepage: the centrepiece, who he is, disciplines, sectors, places, guides |
| `/about` | Stephen's career, timeline, qualifications and memberships |
| `/expertise`, `/expertise/[slug]` | Disciplines: the law, what he delivered, where |
| `/sectors`, `/sectors/[slug]` | Sectors: the safety landscape, what he delivered, the disciplines involved |
| `/locations`, `/locations/[slug]` | London and the South East, area by area |
| `/insights`, `/insights/[slug]` | Guides to the law and practice, under his byline |
| `/faq` | Questions people ask |
| `/contact` | Get in touch: details and the form |
| `/testimonials` | Only once permissioned quotes exist |
| `/legal` | Privacy notice, website terms, cookies, accessibility |

Machine-readable: `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest`, `/{INDEXNOW_API_KEY}.txt`.

## API routes

| Route | Purpose |
|---|---|
| `POST /api/contact` | The form → Resend email to Stephen (rate limited, spam guarded, zod validated) |
| `GET /api/og` | Branded Open Graph card generator (every page references it) |
| `GET/POST /api/indexnow` | IndexNow submission: cron sweep (GET, `CRON_SECRET`) and manual trigger (POST, `INDEXNOW_SUBMIT_SECRET`) |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in what you have; nothing is required to run locally
npm run dev
```

## Guardrails

| Command | Fails on |
|---|---|
| `npm run content:check` | a `[[placeholder]]`, any offer language, a template leftover, a summary over its SERP budget |
| `npm run seo:audit -- --base=URL` | non-200 or redirecting sitemap URLs, bad canonicals, noindex, titles over 60 chars, descriptions over 160, missing `og:image`, zero or multiple `<h1>`, missing or invalid JSON-LD, any required internal link missing, links to redirecting paths |
| `npm run seo:architecture -- --base=URL` | a sitemap URL unreachable from the homepage, a page with no in-content inbound link, a hub below click depth 1, anything deeper than click depth 3 |
| `npm run seo:similarity -- --base=URL` | any templated family over 55% body-copy overlap |

`.github/workflows/seo-audit.yml` runs the three SEO checks against production after every successful Vercel deploy, weekly on Mondays, and on demand. See `docs/SITE_ARCHITECTURE.md` and `docs/SEO_AIO.md`.

## Deploying

`docs/DEPLOY.md`: Vercel project, the domain, environment variables, Resend domain verification, the IndexNow key, Search Console and GA4.
