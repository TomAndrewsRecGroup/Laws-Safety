# Site architecture

How the site is wired and the three scripts that stop it drifting. Inherited from the Andrews Recruitment Group site, whose August 2026 audit is the reason every rule below exists.

## The shape

```
/                                   homepage (ProfilePage)
├── /about                          Stephen's record
├── /expertise                      hub: disciplines
│   └── /expertise/{discipline}     8 spokes
├── /sectors                        hub: sectors
│   └── /sectors/{sector}           4 spokes
├── /locations                      hub: places
│   └── /locations/{area}           8 spokes
├── /insights                       hub: guides
│   └── /insights/{guide}           6 spokes
├── /faq, /contact, /legal
└── /testimonials                   only once it has content
```

Four hubs at click depth 1, every spoke at depth 2, nothing deeper. 35 pages in the sitemap while testimonials is empty.

## Chrome versus content

The header links the four hubs and the utility pages; the footer links the hubs, the disciplines and the sectors. Those are sitewide, so they make every page *reachable* but they say nothing about whether a page is *properly linked*: Google discounts sitewide boilerplate.

In-content links are what count. On this site they come from three places, all inside `<main>`:

1. **Hub grids.** Each hub page lists every one of its spokes as a `LinkCard`, and the homepage lists every discipline, sector and place.
2. **Spoke cross-links.** A discipline page lists the sectors it was applied in, the areas where it mattered and the guides that explain it; a sector page lists its disciplines, places and guides; a location page lists its sectors, disciplines and neighbours; a guide links back to its discipline and sector.
3. **The link band** (`components/InternalLinkBand.tsx`, computed by `lib/links.ts`): three or four contextual links at the end of every page body, with anchor text that varies by source so the same target is never linked with the same words site-wide.

Two pages are allowed to have no in-content inbound link, and `scripts/link-graph.mjs` says why for each: `/` (the header lock-up) and `/legal` (footer-only is the convention). Nothing else may join that list; a content page with no in-content link is exactly the shape that lands in "Discovered – currently not indexed".

## Linking rules

- **Cards are links.** A hub card is wrapped in `<Link href>` so the anchor is in the server HTML. Hover effects sit on top, never instead.
- **Never link a redirecting path.** `/services`, `/blog`, `/reviews` and the rest of the alias list in `next.config.mjs` all 308. Link the destination. `seo:audit` fails on any `href` to one of them.
- **The footer is for hubs and their direct children, not for a hand-picked subset of spokes.** Sitewide links to three of eight locations would give them an arbitrary advantage over their siblings.
- **Every new spoke is asserted.** When a discipline, sector, location or guide is added, its slug goes into `REQUIRED_INTERNAL_LINKS` in `scripts/seo-audit.mjs` so a hub that stops linking it fails the audit.

## Templated pages and duplication

Four families share a template: disciplines, sectors, locations and guides. Near-duplication is what keeps templated pages out of the index, so each family carries copy that varies on its own axis:

- Disciplines: the `what` paragraphs, regulations, key facts and FAQs are written per discipline.
- Sectors: the `landscape` is the sector's own hazards, regulators and failure modes.
- Locations: `localContext` is the area's own geography, industry and enforcing authorities, and `projects` is Stephen's own record there.
- Guides: original long-form.

`scripts/content-similarity.mjs` compares body copy only (chrome stripped) as 8-word shingles and fails above 55% shared-of-smaller. The launch figures are in the README's verification notes; every family sits well under the threshold.

If you add shared copy to a template, ask which axis it varies on. A sentence that is the same on every location page makes every location page more like every other; measure the specific pair before and after.

## Guardrails

| Command | Fails on |
|---|---|
| `npm run content:check` | placeholders, offer language, template leftovers, budgets |
| `npm run seo:audit -- --base=URL` | non-200 or redirecting sitemap URLs, bad canonicals, noindex, titles over 60 chars, descriptions over 160, missing `og:image`, zero or multiple `<h1>`, missing or invalid JSON-LD, required internal links missing, links to redirecting paths, the footer-only pages going unlinked, legacy aliases failing to redirect |
| `npm run seo:architecture -- --base=URL` | a sitemap URL unreachable from the homepage, a content page with no in-content inbound link, a hub below click depth 1, anything deeper than click depth 3 |
| `npm run seo:similarity -- --base=URL` | any family over 55% body-copy overlap |

`content:check` runs inside `npm run build`. The other three run against production from `.github/workflows/seo-audit.yml` after every successful Vercel production deploy, weekly on Mondays at 07:30 UTC (after the 07:00 IndexNow cron), and on demand from the Actions tab. To run them against a local build:

```bash
npm run build && npm run start
npm run seo:audit -- --base=http://localhost:3000
npm run seo:architecture -- --base=http://localhost:3000 --verbose
npm run seo:similarity -- --base=http://localhost:3000
```
