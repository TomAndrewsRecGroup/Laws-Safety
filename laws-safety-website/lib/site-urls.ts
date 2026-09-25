/**
 * Single URL registry: the one source of truth for every URL on the site.
 * Consumed by app/sitemap.ts, lib/indexnow.ts, the llms.txt handlers and the
 * SEO scripts, so none of them can drift apart.
 *
 * Every entry is derived from the content model, so adding a discipline,
 * sector, location or guide to lib/content is enough to put it in the
 * sitemap, the IndexNow sweep and llms.txt.
 */

import { BASE_URL } from './site';
import { DISCIPLINES, SECTORS, LOCATIONS, INSIGHTS, hasTestimonials, paths } from './content';

export { BASE_URL };

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface StaticUrl {
  path: string; // leading-slash path, '' for the homepage
  changeFrequency: ChangeFreq;
  priority: number;
  /** ISO date for lastModified where the content carries one. */
  lastModified?: string;
}

/** A stable date for pages whose content changes infrequently. */
export const STATIC_DATE = new Date('2026-09-25');

const CORE: StaticUrl[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: paths.about, changeFrequency: 'monthly', priority: 0.9 },
  { path: paths.expertise, changeFrequency: 'monthly', priority: 0.9 },
  { path: paths.sectors, changeFrequency: 'monthly', priority: 0.9 },
  { path: paths.locations, changeFrequency: 'monthly', priority: 0.8 },
  { path: paths.insights, changeFrequency: 'weekly', priority: 0.9 },
  { path: paths.faq, changeFrequency: 'monthly', priority: 0.7 },
  { path: paths.contact, changeFrequency: 'monthly', priority: 0.8 },
  { path: paths.legal, changeFrequency: 'yearly', priority: 0.3 },
];

/** Only listed once it has real, permissioned quotes. */
const TESTIMONIALS_PAGE: StaticUrl[] = hasTestimonials ? [{ path: paths.testimonials, changeFrequency: 'monthly', priority: 0.7 }] : [];

const DISCIPLINE_PAGES: StaticUrl[] = DISCIPLINES.map((d) => ({ path: paths.discipline(d.slug), changeFrequency: 'monthly', priority: 0.85 }));
const SECTOR_PAGES: StaticUrl[] = SECTORS.map((s) => ({ path: paths.sector(s.slug), changeFrequency: 'monthly', priority: 0.85 }));
const LOCATION_PAGES: StaticUrl[] = LOCATIONS.map((l) => ({ path: paths.location(l.slug), changeFrequency: 'monthly', priority: 0.7 }));
const INSIGHT_PAGES: StaticUrl[] = INSIGHTS.map((i) => ({
  path: paths.insight(i.slug),
  changeFrequency: 'monthly',
  priority: 0.8,
  lastModified: i.dateModified,
}));

/** Every URL on the site, in a sensible crawl order. */
export function getAllStaticUrls(): StaticUrl[] {
  return [...CORE, ...DISCIPLINE_PAGES, ...SECTOR_PAGES, ...LOCATION_PAGES, ...INSIGHT_PAGES, ...TESTIMONIALS_PAGE];
}

/** Absolute URLs only (for IndexNow). */
export function getAllStaticUrlStrings(): string[] {
  return getAllStaticUrls().map((u) => `${BASE_URL}${u.path}`);
}

/** Absolute URL for a path. */
export function absoluteUrl(path: string): string {
  return `${BASE_URL}${path === '/' ? '' : path}`;
}
