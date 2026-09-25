#!/usr/bin/env node
/**
 * SEO / Search Console audit sweep.
 *
 * Crawls every URL in the live sitemap plus the legacy URLs Google has on
 * record from the Search Console coverage export, and reports anything that
 * would show up as a coverage issue: non-200s, redirect chains, missing or
 * mismatched canonicals, noindex-on-a-sitemap-URL conflicts.
 *
 * Usage:
 *   npm run seo:audit                       # audit production
 *   npm run seo:audit -- --base=http://localhost:3000
 *   npm run seo:audit -- --json=report.json # also write a machine-readable report
 *
 * Exit code is 1 when any error-level problem is found, so this can gate CI.
 */

const DEFAULT_BASE = 'https://www.laws-safety.com';
const CONCURRENCY = 8;
const TIMEOUT_MS = 30_000;

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const BASE = argOf('base', DEFAULT_BASE).replace(/\/$/, '');
const JSON_OUT = argOf('json', null);

/**
 * Legacy URLs Google still has on record. Every one of these should resolve
 * to a 200 in a single redirect hop. Sourced from the Search Console coverage
 * export, so this list is the regression test for the redirect map.
 */
const LEGACY_URLS = [
  // Aliases mapped in next.config.mjs. Each must resolve to a 200 in one hop.
  '/home',
  '/index',
  '/about-us',
  '/about-stephen',
  '/stephen-laws',
  '/services',
  '/disciplines',
  '/disciplines/cdm-2015',
  '/industries',
  '/industries/construction',
  '/areas',
  '/areas/sevenoaks',
  '/blog',
  '/news',
  '/guides',
  '/guides/cdm-2015-duty-holders-explained',
  '/contact-us',
  '/privacy',
  '/privacy-policy',
  '/terms',
  '/cookies',
  '/feed',
  '/feed.xml',
  // Feeds and machine-readable endpoints that must stay reachable.
  '/rss.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
];

/** URLs that are expected to 404 and should stay that way. */
const EXPECTED_404 = ['/this-page-should-never-exist-laws-safety-seo-probe', '/testimonials-probe-not-a-page'];

/**
 * Title budget. Google truncates at roughly 60-65 characters, so anything past
 * TITLE_WARN is invisible in the SERP. Kept in step with lib/seo-title.ts.
 */
const TITLE_WARN = 60;

/** Google renders roughly 155-160 characters of a description. */
const DESCRIPTION_WARN = 160;

/**
 * docs/INTERNAL_LINKS_PLAN.md, encoded as an assertion.
 *
 * Each page needs real inbound internal links, not just a sitemap entry,
 * which is the difference between "indexed" and "Discovered - currently not
 * indexed". These are the source -> target pairs the plan calls for; the
 * audit fails if any of them go missing.
 */
const REQUIRED_INTERNAL_LINKS = [
  // The four hubs must be linked from the homepage, in content and in chrome.
  ['/', ['/about', '/expertise', '/sectors', '/locations', '/insights', '/contact']],
  // Each hub must link every one of its spokes.
  ['/expertise', ['/expertise/cdm-2015', '/expertise/safety-audits-and-site-inspections', '/expertise/risk-assessments-and-method-statements', '/expertise/temporary-works-and-high-risk-activities', '/expertise/contractor-management', '/expertise/accident-investigation', '/expertise/health-and-safety-training', '/expertise/competent-person']],
  ['/sectors', ['/sectors/construction', '/sectors/civil-engineering', '/sectors/retail-fit-out', '/sectors/fabrication-and-process']],
  ['/locations', ['/locations/sevenoaks', '/locations/maidstone', '/locations/medway', '/locations/tonbridge-and-tunbridge-wells', '/locations/dartford-and-gravesend', '/locations/ashford', '/locations/canterbury-and-east-kent', '/locations/bromley-and-south-east-london']],
  ['/insights', ['/insights/cdm-2015-duty-holders-explained', '/insights/fire-risk-assessment-what-it-must-cover', '/insights/risk-assessments-and-method-statements-that-get-read', '/insights/directors-role-in-health-and-safety', '/insights/accident-investigation-root-cause-not-blame', '/insights/health-and-safety-policy-what-the-law-requires']],
  // Spokes cross-link: a discipline to a sector, a sector to a discipline, a guide to its discipline.
  ['/expertise/cdm-2015', ['/sectors/construction', '/insights/cdm-2015-duty-holders-explained']],
  ['/sectors/construction', ['/expertise/cdm-2015', '/expertise/temporary-works-and-high-risk-activities']],
  ['/sectors/civil-engineering', ['/expertise/temporary-works-and-high-risk-activities', '/expertise/cdm-2015']],
  ['/insights/cdm-2015-duty-holders-explained', ['/expertise/cdm-2015']],
  ['/about', ['/expertise', '/sectors', '/locations', '/faq']],
  ['/faq', ['/about', '/contact']],
];

/**
 * Utility pages whose only natural home is the footer. Asserting a link from
 * the homepage (they are in the footer) keeps them attached to the graph.
 */
const NO_LONGER_ORPHANED = ['/faq', '/legal'];

/**
 * URLs that must answer 410 Gone (permanently removed content). None yet: the
 * site has no expiring pages. Kept so the audit path exists for the day a
 * page is retired for good.
 */
const GONE_URLS = [];

/**
 * Paths that 301/308 elsewhere. Linking one internally spends a redirect hop
 * and dilutes the signal, so no page should reference them in an href.
 */
const REDIRECT_PATHS = [
  '/home',
  '/index',
  '/about-us',
  '/about-stephen',
  '/stephen-laws',
  '/services',
  '/disciplines',
  '/industries',
  '/areas',
  '/blog',
  '/news',
  '/guides',
  '/reviews',
  '/contact-us',
  '/privacy',
  '/privacy-policy',
  '/terms',
  '/cookies',
  '/feed',
  '/feed.xml',
];

async function fetchWithTimeout(url, init = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, redirect: 'manual' });
  } finally {
    clearTimeout(timer);
  }
}

/** Follow redirects by hand so we can count and report every hop. */
async function trace(url, { wantBody = false } = {}) {
  const hops = [];
  let current = url;

  for (let i = 0; i <= 10; i++) {
    let res;
    try {
      res = await fetchWithTimeout(current, { headers: { 'user-agent': 'LawsSafety-SEO-Audit/1.0' } });
    } catch (err) {
      return { url, hops, status: 0, final: current, error: err.message, body: '' };
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) return { url, hops, status: res.status, final: current, error: 'redirect without Location', body: '' };
      const next = new URL(location, current).toString();
      hops.push({ from: current, to: next, status: res.status });
      current = next;
      continue;
    }

    const body = wantBody && res.ok ? await res.text() : '';
    return { url, hops, status: res.status, final: current, body };
  }

  return { url, hops, status: 0, final: current, error: 'redirect loop (>10 hops)', body: '' };
}

const pick = (html, re) => (html.match(re)?.[1] ?? '').trim();

const stripSlash = (s) => s.replace(/\/$/, '');

/**
 * Canonicals are hard-coded absolute production URLs, so against a local build
 * every page would look like it canonicalises elsewhere. Off production,
 * compare paths only; on production, demand an exact match.
 */
function canonicalMatches(canonical, url) {
  if (BASE === DEFAULT_BASE) return stripSlash(canonical) === stripSlash(url);
  try {
    return stripSlash(new URL(canonical).pathname) === stripSlash(new URL(url).pathname);
  } catch {
    return false;
  }
}

/**
 * Decode the HTML entities Next.js emits so lengths are measured the way
 * Google renders them. "&amp;" occupies 5 characters in the markup but is one
 * ampersand on the results page, and titles here are full of them.
 */
function decodeEntities(s) {
  return s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2F;/g, '/')
    .replace(/&amp;/g, '&');
}

function inspectHtml(html) {
  const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  );
  return {
    canonical: pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i),
    robots: pick(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i),
    title: decodeEntities(pick(html, /<title[^>]*>([^<]*)<\/title>/i)),
    description: decodeEntities(pick(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i)),
    ogImage: pick(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i),
    ogTitle: pick(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i),
    twitterCard: pick(html, /<meta[^>]+name="twitter:card"[^>]+content="([^"]*)"/i),
    h1Count: (html.match(/<h1[\s>]/gi) ?? []).length,
    ldBlocks,
  };
}

/** Run `worker` over `items` with a fixed concurrency ceiling. */
async function mapPool(items, worker) {
  const out = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        out[i] = await worker(items[i], i);
      }
    })
  );
  return out;
}

async function getSitemapUrls() {
  const res = await fetchWithTimeout(`${BASE}/sitemap.xml`, { redirect: 'follow' });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  // The sitemap always emits absolute production URLs (BASE_URL in
  // lib/site-urls.ts is fixed), so when auditing a local build we have to point
  // them back at the host under test or we would silently audit production.
  if (BASE === DEFAULT_BASE) return locs;
  return locs.map((u) => {
    try {
      return `${BASE}${new URL(u).pathname.replace(/\/$/, '')}`;
    } catch {
      return u;
    }
  });
}

const problems = [];
const add = (level, url, issue, detail = '') => problems.push({ level, url, issue, detail });

async function auditSitemap(urls) {
  const results = await mapPool(urls, (u) => trace(u, { wantBody: true }));

  for (const r of results) {
    if (r.error) {
      add('error', r.url, 'request failed', r.error);
      continue;
    }
    if (r.hops.length > 0) {
      add('error', r.url, 'sitemap URL redirects', `${r.hops.length} hop(s) -> ${r.final}`);
      continue;
    }
    if (r.status !== 200) {
      add('error', r.url, `sitemap URL returned ${r.status}`);
      continue;
    }

    const meta = inspectHtml(r.body);
    const isHtml = /<html/i.test(r.body);
    if (!isHtml) continue; // feeds and text endpoints have no head metadata

    if (!meta.canonical) {
      add('error', r.url, 'missing canonical');
    } else if (!canonicalMatches(meta.canonical, r.url)) {
      add('error', r.url, 'canonical points elsewhere', meta.canonical);
    }
    if (/noindex/i.test(meta.robots)) {
      add('error', r.url, 'noindex on a sitemap URL', meta.robots);
    }
    if (!meta.title) add('warn', r.url, 'missing <title>');
    if (!meta.description) add('warn', r.url, 'missing meta description');
    if (meta.title && meta.title.length > TITLE_WARN) {
      add('warn', r.url, `title ${meta.title.length} chars (>${TITLE_WARN} truncates in SERPs)`);
    }
    if (meta.description && meta.description.length > DESCRIPTION_WARN) {
      add('warn', r.url, `description ${meta.description.length} chars (>${DESCRIPTION_WARN} truncates in SERPs)`);
    }

    // Open Graph. A page whose own openGraph block omits `images` replaces the
    // root layout's wholesale and ends up sharing with no card at all, which is
    // how the homepage came to have no og:image.
    if (!meta.ogImage) add('error', r.url, 'missing og:image', 'shares on LinkedIn/Facebook with no card');
    if (!meta.ogTitle) add('warn', r.url, 'missing og:title');
    if (!meta.twitterCard) add('warn', r.url, 'missing twitter:card');

    // Headings.
    if (meta.h1Count === 0) add('error', r.url, 'no <h1>');
    if (meta.h1Count > 1) add('error', r.url, `${meta.h1Count} <h1> elements`, 'exactly one per page');

    // Structured data: the AI-discoverability surface. Invalid JSON-LD is
    // silently ignored by every consumer, so it fails closed without warning.
    if (!meta.ldBlocks.length) {
      add('error', r.url, 'no JSON-LD structured data');
    } else {
      for (const block of meta.ldBlocks) {
        try {
          JSON.parse(block);
        } catch (err) {
          add('error', r.url, 'invalid JSON-LD', err.message.slice(0, 90));
          break;
        }
      }
    }
  }

  // Two pages sharing a title is a duplicate-content signal and is exactly how
  // "Duplicate without user-selected canonical" starts.
  const byTitle = new Map();
  for (const r of results) {
    if (r.status !== 200 || !/<html/i.test(r.body)) continue;
    const t = inspectHtml(r.body).title;
    if (!t) continue;
    byTitle.set(t, [...(byTitle.get(t) ?? []), r.url]);
  }
  for (const [t, urls] of byTitle) {
    if (urls.length > 1) add('warn', urls[0], `title shared with ${urls.length - 1} other page(s)`, `"${t}" also on ${urls.slice(1).join(', ')}`);
  }

  return results;
}

/**
 * Assert INTERNAL_LINKS_PLAN.md still holds. A link that quietly disappears in
 * a refactor takes the target page's crawl priority with it, and nothing else
 * in the build would notice.
 */
async function auditInternalLinks() {
  const pages = await mapPool(
    REQUIRED_INTERNAL_LINKS,
    ([path]) => trace(`${BASE}${path}`, { wantBody: true })
  );

  pages.forEach((r, i) => {
    const [path, targets] = REQUIRED_INTERNAL_LINKS[i];
    if (r.status !== 200 || !r.body) {
      add('error', `${BASE}${path}`, 'could not check internal links', `status ${r.status}`);
      return;
    }
    const missing = targets.filter((t) => !r.body.includes(`href="${t}"`));
    if (missing.length) {
      add('error', `${BASE}${path}`, 'missing required internal link(s)', `${missing.join(', ')} (see docs/INTERNAL_LINKS_PLAN.md)`);
    }
  });

  return pages;
}

/**
 * No page should link to a path that redirects. These are cheap to introduce
 * (an old slug pasted into a CTA) and invisible without a crawl: /sectors
 * linked to /roles, a 308 to /jobs, for exactly this reason.
 */
function auditRedirectLinks(sitemapResults) {
  for (const r of sitemapResults) {
    if (r.status !== 200 || !r.body || !/<html/i.test(r.body)) continue;
    const hits = REDIRECT_PATHS.filter((p) => r.body.includes(`href="${p}"`));
    if (hits.length) {
      add('error', r.url, 'links to redirecting path(s)', `${hits.join(', ')} — link the destination instead`);
    }
  }
}

/** The three pages that had no inbound links at all must stay attached. */
async function auditOrphans() {
  const home = await trace(`${BASE}/`, { wantBody: true });
  if (home.status !== 200 || !home.body) {
    add('error', `${BASE}/`, 'could not check orphan links', `status ${home.status}`);
    return;
  }
  const missing = NO_LONGER_ORPHANED.filter((p) => !home.body.includes(`href="${p}"`));
  if (missing.length) {
    add('error', `${BASE}/`, 'previously-orphaned page(s) unlinked again', missing.join(', '));
  }
}

async function auditGone() {
  if (!GONE_URLS.length) return;
  const results = await mapPool(GONE_URLS.map((p) => `${BASE}${p}`), (u) => trace(u));

  for (const r of results) {
    if (r.error) {
      add('error', r.url, 'request failed', r.error);
      continue;
    }
    if (r.status === 410) continue;
    if (r.status === 404) {
      add('error', r.url, 'retired page answers 404, expected 410');
      continue;
    }
    add('error', r.url, `retired page returned ${r.status}, expected 410`, `-> ${r.final}`);
  }
}

async function auditLegacy() {
  const urls = LEGACY_URLS.map((p) => `${BASE}${p}`);
  const results = await mapPool(urls, (u) => trace(u));

  for (const r of results) {
    if (r.error) {
      add('error', r.url, 'request failed', r.error);
      continue;
    }
    if (r.status === 404) {
      add('error', r.url, 'legacy URL still 404s', 'needs a redirect in next.config.mjs');
      continue;
    }
    if (r.status !== 200) {
      add('error', r.url, `legacy URL returned ${r.status}`, `-> ${r.final}`);
      continue;
    }
    if (r.hops.length > 1) {
      add('warn', r.url, `redirect chain of ${r.hops.length} hops`, `-> ${r.final}`);
    }
  }

  return results;
}

async function auditExpected404() {
  for (const path of EXPECTED_404) {
    const r = await trace(`${BASE}${path}`);
    if (r.status !== 404) {
      add('error', `${BASE}${path}`, `expected 404, got ${r.status}`, 'soft-404 risk');
    }
  }
}

async function main() {
  console.log(`\nSEO audit against ${BASE}\n${'='.repeat(60)}`);

  const sitemapUrls = await getSitemapUrls();
  console.log(`Sitemap URLs:  ${sitemapUrls.length}`);
  console.log(`Legacy URLs:   ${LEGACY_URLS.length}`);
  console.log(`Retired URLs:  ${GONE_URLS.length}  (must answer 410)`);
  console.log(`Link assertions: ${REQUIRED_INTERNAL_LINKS.reduce((n, [, t]) => n + t.length, 0)}`);
  console.log('Sweeping...\n');

  const [sitemapResults, legacyResults] = await Promise.all([
    auditSitemap(sitemapUrls),
    auditLegacy(),
    auditInternalLinks(),
    auditGone(),
  ]);
  await auditExpected404();
  await auditOrphans();
  auditRedirectLinks(sitemapResults);

  const errors = problems.filter((p) => p.level === 'error');
  const warns = problems.filter((p) => p.level === 'warn');

  if (errors.length) {
    console.log(`ERRORS (${errors.length})\n${'-'.repeat(60)}`);
    for (const p of errors) console.log(`  ${p.url}\n    ${p.issue}${p.detail ? ` :: ${p.detail}` : ''}`);
    console.log('');
  }
  if (warns.length) {
    console.log(`WARNINGS (${warns.length})\n${'-'.repeat(60)}`);
    for (const p of warns) console.log(`  ${p.url}\n    ${p.issue}${p.detail ? ` :: ${p.detail}` : ''}`);
    console.log('');
  }

  const okSitemap = sitemapResults.filter((r) => r.status === 200 && r.hops.length === 0).length;
  const okLegacy = legacyResults.filter((r) => r.status === 200).length;

  console.log(`${'='.repeat(60)}`);
  console.log(`Sitemap URLs clean:  ${okSitemap}/${sitemapUrls.length}`);
  console.log(`Legacy URLs resolve: ${okLegacy}/${LEGACY_URLS.length}`);
  console.log(`Errors: ${errors.length}   Warnings: ${warns.length}`);
  console.log(errors.length ? '\nFIX ERRORS BEFORE VALIDATING IN SEARCH CONSOLE.\n' : '\nAll clear. Safe to hit "Validate Fix" in Search Console.\n');

  if (JSON_OUT) {
    const { writeFile } = await import('node:fs/promises');
    await writeFile(
      JSON_OUT,
      JSON.stringify({ base: BASE, sitemapUrls, problems, sitemapResults, legacyResults }, null, 2)
    );
    console.log(`Wrote ${JSON_OUT}\n`);
  }

  process.exit(errors.length ? 1 : 0);
}

main().catch((err) => {
  console.error('Audit failed:', err.message);
  process.exit(1);
});
