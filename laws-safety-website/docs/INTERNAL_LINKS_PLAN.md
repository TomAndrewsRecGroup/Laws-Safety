# Internal links plan

The plan is executed by `lib/links.ts` and the hub/spoke templates, and asserted by `scripts/seo-audit.mjs` (`REQUIRED_INTERNAL_LINKS`) and `scripts/link-graph.mjs`. This document is the human-readable version.

## Principles

1. **Every page earns at least one in-content inbound link**, from a page a reader of it would plausibly have come from. Chrome (header, footer) does not count.
2. **Anchor text varies per source.** The same target linked with identical words from every page reads as manipulation. `lib/links.ts` deals variants deterministically by hashing the source slug.
3. **No link points at a redirecting path.**
4. **Hubs are one click from home; spokes are two.** Nothing is deeper.

## Sources → targets

| Source | In-content links to |
|---|---|
| `/` | `/about`; every discipline; every sector; every location; the three newest guides; `/contact`; `/faq`; the hubs `/expertise`, `/locations`, `/insights` |
| `/about` | every discipline (pill links); every sector (pill links); `/locations`; band: `/expertise`, `/locations`, `/faq`; `/contact` |
| `/expertise` | every discipline (cards); band: `/sectors`, `/locations`, `/insights` |
| `/expertise/{d}` | its sectors (cards); its locations (pills); its guides (cards); related disciplines (aside); band: one sector, one location, one guide, `/about` |
| `/sectors` | every sector (cards); band: `/expertise`, `/locations`, one guide |
| `/sectors/{s}` | its disciplines (cards); its locations (pills); up to two guides; band: two disciplines, one location, one guide |
| `/locations` | every location (cards); band: `/sectors`, `/expertise`, `/about` |
| `/locations/{l}` | its sectors (cards); its disciplines (pills); nearby locations (aside); band: one sector, one discipline, one neighbour, `/about` |
| `/insights` | every guide (cards); `/rss.xml`; band: `/expertise`, `/faq`, `/about` |
| `/insights/{g}` | its disciplines and sectors (inline); `/about` (byline); band: one discipline, one sector, a second discipline, `/faq` |
| `/faq` | band: `/about`, `/expertise`, `/contact` |
| `/contact` | band: `/about`, `/faq` |

## Money pages

There are no commercial money pages on this site by design. The pages that matter most for search are the discipline spokes (the queries are "CDM adviser Kent", "health and safety consultant Sevenoaks" and their kin) and the location spokes (local intent). Both families receive links from every hub, from each other, and from the guides, which is the strongest editorial signal the site can give without a single sentence of offer.

## Verifying

```bash
npm run seo:audit -- --base=http://localhost:3000        # asserts the pairs above
npm run seo:architecture -- --base=http://localhost:3000 --verbose   # depth, orphans, least-linked
```

At launch: 35 pages, max click depth 2, 0 orphans, every hub linked from every page.
