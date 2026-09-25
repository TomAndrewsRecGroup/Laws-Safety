#!/usr/bin/env node
/**
 * link-graph.mjs — checks the shape of the site, not the content of its pages.
 *
 * seo-audit.mjs answers "is each page correct on its own terms". This answers
 * the question that sits above it: can a crawler actually reach every page, and
 * how far from the homepage does it have to walk to get there. Those are the
 * two things that decide whether a page ends up in Search Console's
 * "Discovered - currently not indexed" bucket, and neither is visible from a
 * single page.
 *
 * The distinction that matters here is chrome versus content. A link in the
 * header or footer appears on all 138 pages, so counting raw inbound links says
 * every page in the footer is well linked, which tells you nothing. Google
 * discounts sitewide boilerplate for the same reason. So two graphs are built:
 *
 *   all links      every <a href> — this is what a crawler walks, so click
 *                  depth is measured over it
 *   content links  every <a href> left once <header>, <nav> and <footer> are
 *                  removed — an editorial vote for the target, which is what
 *                  "is this page properly linked" actually means
 *
 * Usage:
 *   node scripts/link-graph.mjs [--base=https://www.laws-safety.com]
 *                               [--json=graph.json] [--verbose]
 *
 * Exit code 1 on any structural regression, so it gates a deploy the same way
 * the other two scripts do.
 */

const DEFAULT_BASE = 'https://www.laws-safety.com';
const CONCURRENCY = 8;

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const BASE = argOf('base', DEFAULT_BASE).replace(/\/$/, '');
const JSON_OUT = argOf('json', null);
const VERBOSE = args.includes('--verbose');

/**
 * The four hubs are the spine of the architecture: every discipline, sector,
 * location and guide hangs off one of them. If a hub slips below the
 * homepage's immediate neighbourhood, everything beneath it slips with it.
 */
const SECTOR_HUBS = ['/expertise', '/sectors', '/locations', '/insights'];

/**
 * Deepest a sitemap page may sit from the homepage. The architecture is
 * hub-and-spoke three levels deep — home, hub, spoke, role-city — so 3 is the
 * design and 4 is the alarm.
 */
const MAX_CLICK_DEPTH = 3;

/**
 * Pages that legitimately have no in-content inbound link.
 *
 * Every entry here is a utility page whose natural home is the nav or the
 * footer, and each is one click from the homepage with a sitewide link on
 * every page. Being chrome-only is the correct outcome for them, not a defect.
 *
 * A content page — a hub, a discipline, a sector, a location, a guide — must
 * never appear here. Those earn their links editorially, and an entry with no
 * in-content inbound link is exactly the shape that lands a page in Search
 * Console's "Discovered - currently not indexed" bucket. Adding one to this
 * list to quiet the check would be hiding the finding rather than fixing it.
 */
const CONTENT_ORPHAN_ALLOW = new Map([
  ['/', 'reached via the header lock-up, which is chrome on every page by design'],
  ['/legal', 'privacy, terms and cookies; footer-only is the convention and the correct placement'],
]);

/**
 * Pages are rendered with canonical absolute URLs whatever host serves them, so
 * a run against localhost or a preview deploy still sees production hrefs. Both
 * that origin and whatever --base points at count as this site; anything else is
 * an outbound link and is dropped.
 */
const CANONICAL_ORIGIN = new URL(DEFAULT_BASE).origin;
const BASE_ORIGIN = new URL(BASE).origin;

const toPath = (url) => {
  try {
    const u = new URL(url, BASE);
    if (u.origin !== BASE_ORIGIN && u.origin !== CANONICAL_ORIGIN) return null;
    const p = u.pathname.replace(/\/+$/, '');
    return p || '/';
  } catch {
    return null;
  }
};

async function fetchPage(path) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { 'user-agent': 'LawsSafety-LinkGraph/1.0' },
      redirect: 'follow',
    });
    return { status: res.status, html: res.ok ? await res.text() : '' };
  } catch (err) {
    return { status: 0, html: '', error: err.message };
  }
}

/**
 * Content region: what the page itself says, with the shared furniture removed.
 *
 * Defined by subtraction rather than by taking the inside of <main>. Several
 * templates close </main> before their closing link band — the sector hubs put
 * their city links there — so scoping to <main> silently drops real in-content
 * links and reports the targets as orphans. Removing <header>, <footer> and
 * <nav> wherever they appear keeps that band and still discards the chrome,
 * which on this site is a <nav> nested inside <main> plus the page footer.
 * <head> survives the subtraction but contains no <a href>, so it cannot
 * contribute a false link.
 */
function contentRegion(html) {
  return html
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
}

const HREF_RE = /<a\b[^>]*?href=["']([^"'>]+)["']/gi;

function hrefsIn(html) {
  const out = [];
  for (const m of html.matchAll(HREF_RE)) {
    const p = toPath(m[1].split('#')[0].split('?')[0]);
    if (p) out.push(p);
  }
  return out;
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        results[i] = await fn(items[i], i);
      }
    })
  );
  return results;
}

async function sitemapPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`, { headers: { 'user-agent': 'LawsSafety-LinkGraph/1.0' } });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const paths = new Set();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
    const p = toPath(m[1].trim());
    if (p) paths.add(p);
  }
  return [...paths].sort();
}

async function main() {
  console.log(`Link graph for ${BASE}\n`);

  const paths = await sitemapPaths();
  console.log(`Sitemap URLs: ${paths.length}`);

  // Fetch every sitemap page rather than only what the crawl reaches. A page
  // nobody links to still emits links, and those links count towards its
  // targets' inbound totals — leaving it out would understate them.
  const fetched = await mapLimit(paths, CONCURRENCY, fetchPage);

  const unfetchable = [];
  const allOut = new Map();
  const contentOut = new Map();

  paths.forEach((p, i) => {
    const { status, html, error } = fetched[i];
    if (status !== 200 || !html) {
      unfetchable.push({ path: p, status, error });
      allOut.set(p, []);
      contentOut.set(p, []);
      return;
    }
    const stripped = html.replace(/<script[\s\S]*?<\/script>/gi, ' ');
    allOut.set(p, [...new Set(hrefsIn(stripped))]);
    contentOut.set(p, [...new Set(hrefsIn(contentRegion(stripped)))]);
  });

  console.log(`Pages fetched: ${paths.length - unfetchable.length}/${paths.length}\n`);

  const inbound = new Map(paths.map((p) => [p, new Set()]));
  const inboundContent = new Map(paths.map((p) => [p, new Set()]));
  for (const [src, hrefs] of allOut) {
    for (const h of hrefs) if (h !== src && inbound.has(h)) inbound.get(h).add(src);
  }
  for (const [src, hrefs] of contentOut) {
    for (const h of hrefs) if (h !== src && inboundContent.has(h)) inboundContent.get(h).add(src);
  }

  // Click depth over every link, chrome included: this is the walk a crawler
  // actually takes, whatever we think of the link's editorial value.
  const inSitemap = new Set(paths);
  const depth = new Map([['/', 0]]);
  const queue = ['/'];
  while (queue.length) {
    const cur = queue.shift();
    for (const h of allOut.get(cur) ?? []) {
      if (inSitemap.has(h) && !depth.has(h)) {
        depth.set(h, depth.get(cur) + 1);
        queue.push(h);
      }
    }
  }

  const errors = [];
  const warnings = [];

  for (const u of unfetchable) {
    errors.push(`${u.path} could not be fetched (${u.error ?? `HTTP ${u.status}`})`);
  }

  // No page family on this site churns, so there is no tolerance band: every
  // stranded page is an error.
  const JOB_CHURN_TOLERANCE = 0;
  const isJobPage = () => false;

  const unreachable = paths.filter((p) => !depth.has(p));
  const contentOrphans = paths.filter((p) => !inboundContent.get(p).size && !CONTENT_ORPHAN_ALLOW.has(p));

  const strandedJobs = new Set([...unreachable, ...contentOrphans].filter(isJobPage));
  const jobsAreBroken = strandedJobs.size > JOB_CHURN_TOLERANCE;

  const report = (path, message) => {
    if (isJobPage(path) && !jobsAreBroken) {
      warnings.push(`${message} (within the ${JOB_CHURN_TOLERANCE}-role tolerance for the /jobs revalidate window)`);
    } else {
      errors.push(message);
    }
  };

  for (const p of unreachable) {
    report(p, `${p} is in the sitemap but unreachable from the homepage by any link`);
  }

  for (const p of contentOrphans) {
    report(p, `${p} has no in-content inbound link — only sitewide chrome points at it`);
  }

  if (jobsAreBroken) {
    errors.push(
      `${strandedJobs.size} job pages are stranded, past the ${JOB_CHURN_TOLERANCE} the revalidate window can explain — ` +
        'check the crawlable list on /jobs still covers every role the sitemap publishes'
    );
  }

  for (const hub of SECTOR_HUBS) {
    if (!inSitemap.has(hub)) {
      errors.push(`hub ${hub} is missing from the sitemap`);
      continue;
    }
    const d = depth.get(hub);
    if (d === undefined) errors.push(`hub ${hub} is unreachable from the homepage`);
    else if (d > 1) errors.push(`hub ${hub} is at click depth ${d}; hubs must be one click from the homepage`);
  }

  const tooDeep = paths.filter((p) => (depth.get(p) ?? 0) > MAX_CLICK_DEPTH);
  for (const p of tooDeep) {
    errors.push(`${p} is at click depth ${depth.get(p)}, deeper than the ${MAX_CLICK_DEPTH}-level architecture allows`);
  }

  // Reported, not enforced. A page with a single in-content link is reachable
  // and correct; it is just thin, and worth seeing before it becomes a problem.
  const thin = paths.filter(
    (p) => inboundContent.get(p).size === 1 && !CONTENT_ORPHAN_ALLOW.has(p)
  );
  for (const p of thin) warnings.push(`${p} has just one in-content inbound link`);

  const byDepth = new Map();
  for (const p of paths) {
    const d = depth.get(p);
    byDepth.set(d ?? 'unreachable', (byDepth.get(d ?? 'unreachable') ?? 0) + 1);
  }
  console.log('Click depth from the homepage');
  for (const [d, n] of [...byDepth.entries()].sort((a, b) => String(a[0]).localeCompare(String(b[0])))) {
    console.log(`  depth ${d}: ${String(n).padStart(4)} pages`);
  }

  console.log('\nHubs');
  for (const hub of SECTOR_HUBS) {
    console.log(
      `  ${hub.padEnd(26)} depth ${String(depth.get(hub) ?? '-').padStart(2)}   ` +
        `inbound ${String(inbound.get(hub)?.size ?? 0).padStart(4)}   ` +
        `in-content ${String(inboundContent.get(hub)?.size ?? 0).padStart(4)}`
    );
  }

  if (VERBOSE) {
    console.log('\nLeast-linked pages (in-content inbound)');
    [...inboundContent.entries()]
      .sort((a, b) => a[1].size - b[1].size)
      .slice(0, 15)
      .forEach(([p, s]) => console.log(`  ${String(s.size).padStart(4)}  ${p}`));
  }

  if (JSON_OUT) {
    const { writeFileSync } = await import('node:fs');
    writeFileSync(
      JSON_OUT,
      JSON.stringify(
        {
          base: BASE,
          paths,
          depth: Object.fromEntries(depth),
          inbound: Object.fromEntries([...inbound].map(([k, v]) => [k, [...v]])),
          inboundContent: Object.fromEntries([...inboundContent].map(([k, v]) => [k, [...v]])),
          errors,
          warnings,
        },
        null,
        2
      )
    );
    console.log(`\nWrote ${JSON_OUT}`);
  }

  console.log(`\n${'='.repeat(60)}`);
  if (warnings.length) {
    console.log(`\nWARNINGS (${warnings.length})`);
    warnings.forEach((w) => console.log(`  ! ${w}`));
  }
  if (errors.length) {
    console.log(`\nERRORS (${errors.length})`);
    errors.forEach((e) => console.log(`  x ${e}`));
    console.log('\nSee docs/SITE_ARCHITECTURE.md for what each of these guards.\n');
    process.exit(1);
  }
  console.log(`\nArchitecture intact. ${paths.length} pages, max click depth ${Math.max(...depth.values())}, 0 orphans.\n`);
}

main().catch((err) => {
  console.error('Link graph failed:', err.message);
  process.exit(1);
});
