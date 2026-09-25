#!/usr/bin/env node
/**
 * content-similarity.mjs — measures how alike a set of pages are.
 *
 * Built for the templated page families (disciplines, sectors, locations, guides), where
 * near-duplication is the thing that keeps pages in Search Console's
 * "Discovered - currently not indexed" bucket. Google can see those pages
 * perfectly well; it just does not think each one earns its own entry.
 *
 * Compares visible text as overlapping 8-word shingles, which catches
 * boilerplate reuse that a naive word-frequency diff would miss.
 *
 *   jaccard            shared / total across both pages
 *   shared-of-smaller  what fraction of the smaller page also appears in the
 *                      larger one. This is the number to watch: it answers
 *                      "how much of this page is not original to it".
 *
 * Usage:
 *   node scripts/content-similarity.mjs <url> <url> [url...]
 *   node scripts/content-similarity.mjs --family=locations [--base=http://localhost:3000]
 *
 * Families are the templated sets worth watching; --family saves typing the
 * representative URLs each time.
 *
 * Exit code is 1 if any pair exceeds --max (default 55%), so this can gate a
 * deploy the same way seo-audit.mjs does.
 */

const DEFAULT_BASE = 'https://www.laws-safety.com';
const SHINGLE = 8;

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const BASE = argOf('base', DEFAULT_BASE).replace(/\/$/, '');
const MAX = Number(argOf('max', '55'));

/**
 * Representative members of each templated family. Three per family is enough
 * to catch a regression; the point is a tripwire, not a census.
 */
const FAMILIES = {
  disciplines: ['/expertise/cdm-2015', '/expertise/contractor-management', '/expertise/competent-person'],
  sectors: ['/sectors/construction', '/sectors/civil-engineering', '/sectors/retail-fit-out'],
  locations: ['/locations/sevenoaks', '/locations/medway', '/locations/ashford'],
  'locations-near': ['/locations/sevenoaks', '/locations/tonbridge-and-tunbridge-wells', '/locations/maidstone'],
  guides: ['/insights/cdm-2015-duty-holders-explained', '/insights/fire-risk-assessment-what-it-must-cover', '/insights/directors-role-in-health-and-safety'],
};

/**
 * Body copy only, with the site chrome removed.
 *
 * This matters more than it sounds. Measured over the whole page, two entirely
 * unrelated short pages score a large overlap purely from the
 * shared header and footer, so a whole-page threshold ends up measuring the
 * footer rather than the content. Every page here renders its content inside
 * <article> (or failing that <main>), so that is what gets compared.
 */
function extractBody(html) {
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let body = article?.[1] ?? main?.[1] ?? html;
  // <main> can still wrap the header on some templates, and the footer sits
  // outside it, so strip both plus any nav for good measure.
  body = body
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  return body;
}

async function visibleText(url) {
  let html;
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'LawsSafety-Similarity/1.0' } });
    if (!res.ok) return '';
    html = await res.text();
  } catch {
    return '';
  }
  return extractBody(
    html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  )
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function shingles(text, n = SHINGLE) {
  const w = text.split(' ').filter(Boolean);
  const out = new Set();
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(' '));
  return out;
}

async function compare(label, urls) {
  const texts = await Promise.all(urls.map(visibleText));
  const sets = texts.map((t) => shingles(t));

  console.log(`\n${label}\n${'-'.repeat(label.length)}`);
  urls.forEach((u, i) => console.log(`  ${String(texts[i].split(' ').length).padStart(5)} words  ${u}`));
  console.log('');

  let worst = 0;
  let total = 0;
  let pairs = 0;

  for (let i = 0; i < urls.length; i++) {
    for (let j = i + 1; j < urls.length; j++) {
      const a = sets[i];
      const b = sets[j];
      if (!a.size || !b.size) continue;
      let shared = 0;
      for (const s of a) if (b.has(s)) shared++;
      const jac = shared / (a.size + b.size - shared);
      const ofSmaller = shared / Math.min(a.size, b.size);
      worst = Math.max(worst, ofSmaller);
      total += ofSmaller;
      pairs++;
      const flag = ofSmaller * 100 > MAX ? '  <-- over threshold' : '';
      console.log(
        `  jaccard ${(jac * 100).toFixed(1).padStart(5)}%   shared-of-smaller ${(ofSmaller * 100)
          .toFixed(1)
          .padStart(5)}%   ${urls[i].split('/').pop()} vs ${urls[j].split('/').pop()}${flag}`
      );
    }
  }

  if (pairs) {
    console.log(`\n  mean ${((total / pairs) * 100).toFixed(1)}%   worst ${(worst * 100).toFixed(1)}%`);
  }
  return worst * 100;
}

async function main() {
  const family = argOf('family', null);
  const explicit = args.filter((a) => !a.startsWith('--'));

  let worst = 0;
  if (explicit.length >= 2) {
    worst = await compare('Ad-hoc comparison', explicit);
  } else {
    const names = family ? [family] : Object.keys(FAMILIES);
    for (const name of names) {
      const paths = FAMILIES[name];
      if (!paths) {
        console.error(`Unknown family "${name}". Known: ${Object.keys(FAMILIES).join(', ')}`);
        process.exit(1);
      }
      worst = Math.max(worst, await compare(name, paths.map((p) => `${BASE}${p}`)));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  if (worst > MAX) {
    console.log(`Worst overlap ${worst.toFixed(1)}% exceeds the ${MAX}% threshold.`);
    console.log('Templated pages are converging. See docs/SITE_ARCHITECTURE.md before adding shared copy.\n');
    process.exit(1);
  }
  console.log(`Worst overlap ${worst.toFixed(1)}%, within the ${MAX}% threshold.\n`);
}

main().catch((err) => {
  console.error('Similarity check failed:', err.message);
  process.exit(1);
});
