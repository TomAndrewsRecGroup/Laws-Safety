# SEO and AI discoverability

What the site does to be found by search engines and cited by answer engines, and where each piece lives. All of it is generated from the content model, so it cannot drift from the pages.

## Metadata

- **Titles** are written against a budget (`lib/seo-title.ts`): 46 characters for the page's own words plus the " | Laws Safety" suffix the root layout appends, 60 in total, the point at which Google truncates. The words that identify the page come first. The homepage opts out of the template so it is not double-branded.
- **Descriptions** are written to 155 characters and clamped as a backstop. Card summaries double as descriptions and are budget-checked by `content:check`.
- **Canonicals** are self-referential absolute URLs on every page, with `hreflang` `en-GB` and `x-default` on the root.
- **Open Graph and Twitter cards** on every page, each with a branded 1200×630 image from `/api/og` (`lib/og.ts`). Next.js replaces a page's `openGraph` object rather than merging it with the layout's, so `lib/meta.ts` always passes the images; a page that sets `openGraph` by hand without them ships with no card.
- **One `<h1>` per page**, in the hero. Section headings start at `<h2>`.

## Structured data

Person-first. The root layout emits the site-wide graph once (`lib/schema.ts`, `siteGraph()`): `Person` (Stephen, `@id` `/#stephen-laws`), `Organization` (Laws Safety, founded by him, with address and contact point) and `WebSite`. Every page then emits its own `@graph` with a `WebPage` (or `ProfilePage`, `CollectionPage`, `ContactPage`, `FAQPage`) pointing back at those by `@id`, a `BreadcrumbList`, and where the page has visible Q&A an `FAQPage` with a `SpeakableSpecification` on `[data-speakable]`. Guides add an `Article` with Stephen as `author`; locations add a `Place`.

There are deliberately **no `Service`, `Offer` or `makesOffer` nodes**. The graph describes a person and his record, which is the same rule the copy follows (`docs/WORDING_RULES.md`) applied to machine-readable data.

JSON-LD is rendered into the server HTML (`components/JsonLd.tsx`), not injected by script, so crawlers that do not execute JavaScript still see it. `seo:audit` fails on missing or invalid blocks.

## Answer engines

- **`/llms.txt`** and **`/llms-full.txt`** (`app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`): citable facts about Stephen, every discipline, sector, location and guide with its URL, the FAQ, and an explicit statement of what may be cited and how to attribute it. Generated from the content model.
- **Key facts blocks** (`components/KeyTakeaways.tsx`) at the top of every discipline, sector and guide page: three to six self-contained, quotable sentences tagged `data-speakable`.
- **Native `<details>` FAQs** (`components/FaqList.tsx`): every answer is in the HTML, tagged `data-speakable`, and mirrored in the page's `FAQPage` schema.
- **`robots.txt`** names GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, anthropic-ai, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, cohere-ai, CoherePBot, Amazonbot, Applebot-Extended, Meta-ExternalAgent, YouBot, DuckAssistBot, MistralAI-User and CCBot explicitly, and allows `/api/og` so the cards render in previews.

## Crawling and indexing

- **Sitemap** (`app/sitemap.ts`) from the single URL registry `lib/site-urls.ts`, which is derived from the content model. Guides carry their own `lastModified`; other pages use a stable date so the sitemap never claims a change that did not happen.
- **IndexNow** (`lib/indexnow.ts`, `app/api/indexnow/route.ts`): a daily Vercel cron submits every registry URL to Bing and the other IndexNow engines; the key file is served at `/{INDEXNOW_API_KEY}.txt`.
- **RSS** at `/rss.xml` with `<link rel="alternate">` discovery in the head.
- **Redirects** for every alias someone might type or link (`next.config.mjs`), each asserted by `seo:audit` so it cannot be dropped silently.
- **Security headers** including a CSP with no `unsafe-eval`, HSTS with preload, and `X-Frame-Options`.

## Performance

Sora is self-hosted through `next/font/local` with `display: swap`; the emblem and wordmark go through `next/image` with AVIF/WebP; motion is limited to the hero and respects `prefers-reduced-motion`. Shared JavaScript is about 103 kB; the homepage's own chunk is larger because of the hero animation.

## What is not claimed

Core Web Vitals need field data from CrUX or a Lighthouse run against production once the domain is live; no score is claimed here because none has been measured.
