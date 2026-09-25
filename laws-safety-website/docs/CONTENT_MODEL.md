# The content model

Everything a visitor reads comes from `lib/content/*.ts`. The pages under `app/` are templates; they carry no facts of their own. This document says what each file holds, which fields are Stephen's record and which are general, and how to make the common changes.

The types are in `lib/content/types.ts` and every field has a comment there.

## Two kinds of copy

**General copy** explains the law and the practice: a discipline's `what`, `regulations`, `keyTakeaways` and `faqs`; a sector's `landscape`; a location's `localContext` and `siteTypes`; the guides. It makes no claim about Stephen and can be written and checked against the regulations and guidance it cites.

**Record copy** is what Stephen has done: `PROFILE`, every `delivered` list, every location's `projects`, the testimonials, and the FAQ answers about him. It comes only from Stephen, in his words or his CV, and is never inferred; the current record was written from his September 2026 CV. Where something is not yet supplied it is written as a `[[placeholder]]`.

Employers and clients are never written into copy by name. They are `Organisation` records in `profile.ts` (`CONSULTANCY`, `HOUSING_CONTRACTOR`) rendered through `orgLabel()`, which prints the name only when `NAME_EMPLOYERS` is true. That switch is Stephen's decision under the non-compete.

## Stephen's record: what is filled and what is still open

No `[[placeholder]]` remains; `npm run content:check` passes clean. What each file holds and what would still add value:

1. **`profile.ts`**: filled from the CV, plus his LinkedIn URL, his photo (`public/stephen-laws.jpg` for the portrait, `public/stephen-laws-avatar.jpg` for the head-and-shoulders crop used in bylines) and `coverage` ("London and the South East"). To change the photo, replace the two files and keep the names.
2. **`disciplines.ts`**: filled from the CV, eight disciplines. Add detail (site counts, years, project types) as Stephen supplies it.
3. **`sectors.ts`**: filled from the CV, four sectors. Same.
4. **`locations.ts`**: `projects` for each area, as `{ title, detail }`. This ships empty and the page renders nothing for it until filled; it is the highest-value content on the location pages and the one thing no template can write.
5. **`faqs.ts`**: filled from the CV.
6. **`legal.ts`**: Laws Safety Limited, company number 17413846, registered office as filed at Companies House; `icoReference` is null until the ICO registration exists.
7. **`testimonials.ts`**: quotes given with permission. The page appears, and enters the sitemap and the footer, as soon as the list has one entry.

After any change: `npm run content:check`, then `npm run build`.

## Adding a discipline

Add a record to `DISCIPLINES` in `disciplines.ts`. Required: a unique `slug`, `title`, `seoTitle` (≤ 46 characters, the `<title>` body before " | Laws Safety"), `shortTitle` (≤ 32 characters), `summary` (≤ 155 characters, it is the meta description), `what` (two to three paragraphs), `regulations`, `delivered`, `sectors` (slugs), `related` (slugs), `keyTakeaways` (three or four), `faqs` (three). The page, the hub card, the footer entry, the sitemap, `llms.txt` and the link bands follow automatically. Add the new slug to the `disciplines` lists of the sectors and locations it applies to, and to `REQUIRED_INTERNAL_LINKS` in `scripts/seo-audit.mjs` so the audit asserts the hub links it.

## Adding a sector or a location

The same pattern in `sectors.ts` and `locations.ts`. A location needs a `region` from the `KentRegion` union, `nearby` slugs (three), and `localContext` that is checkable public geography: what the area is, what kind of sites it holds, which councils and which fire service. Distances are road miles from Nepicar Park, rounded.

## Adding a guide

Add a record to `INSIGHTS` in `insights.ts`. Content is structured as `sections`, each with an `id` (used as the anchor), a `heading` and `blocks` of type `p`, `ul`, `ol`, `callout` or `table`. Set `datePublished` and `dateModified` as `YYYY-MM-DD`; the RSS feed and the Article schema read them. `keyTakeaways` renders as the extractable block at the top. Link it to its `disciplines` and `sectors` by slug and the spoke pages will list it. Every guide is Stephen's to approve before it is published.

## Adding a testimonial

```ts
{ quote: '…', author: 'Site manager', role: 'Principal contractor', sector: 'construction', year: 2024, permission: true }
```

`author` is the person's name only where they have agreed to be named; otherwise their role. `permission` must be `true` and means written permission exists.

## Budgets

Card summaries and guide descriptions double as meta descriptions and are checked against 155 characters; short titles against 32; `seoTitle` against 46 (plus the " | Laws Safety" suffix makes 60, where Google truncates). Every spoke record carries a hand-written `seoTitle`; `lib/seo-title.ts` clamps as a backstop only. Write inside the budget rather than relying on the clamp: a title or description that finishes its thought reads better than one cut mid-clause.
