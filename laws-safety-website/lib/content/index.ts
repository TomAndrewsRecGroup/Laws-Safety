/**
 * One import for the whole content model.
 */
export * from './types';
export { PROFILE, CONSULTANCY, HOUSING_CONTRACTOR, orgLabel, sinceLine, yearsInSafety } from './profile';
export { DISCIPLINES, getDiscipline } from './disciplines';
export { SECTORS, getSector } from './sectors';
export { LOCATIONS, getLocation } from './locations';
export { INSIGHTS, getInsight, insightsByDate } from './insights';
export { TESTIMONIALS, hasTestimonials } from './testimonials';
export { FAQS, FAQ_CATEGORIES } from './faqs';

import { DISCIPLINES } from './disciplines';
import { SECTORS } from './sectors';
import { LOCATIONS } from './locations';
import { INSIGHTS } from './insights';

/** Paths, so no page or feed spells a URL by hand. */
export const paths = {
  home: '/',
  about: '/about',
  expertise: '/expertise',
  discipline: (slug: string) => `/expertise/${slug}`,
  sectors: '/sectors',
  sector: (slug: string) => `/sectors/${slug}`,
  locations: '/locations',
  location: (slug: string) => `/locations/${slug}`,
  insights: '/insights',
  insight: (slug: string) => `/insights/${slug}`,
  testimonials: '/testimonials',
  faq: '/faq',
  contact: '/contact',
  legal: '/legal',
} as const;

/** Disciplines applied in a sector, in the sector's own order. */
export function disciplinesForSector(sectorSlug: string) {
  const s = SECTORS.find((x) => x.slug === sectorSlug);
  if (!s) return [];
  return s.disciplines.map((d) => DISCIPLINES.find((x) => x.slug === d)).filter((x): x is NonNullable<typeof x> => Boolean(x));
}

/** Sectors a discipline has been applied in. */
export function sectorsForDiscipline(disciplineSlug: string) {
  const d = DISCIPLINES.find((x) => x.slug === disciplineSlug);
  if (!d) return [];
  return d.sectors.map((s) => SECTORS.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
}

/** Locations that name a sector or a discipline. */
export function locationsFor(kind: 'sector' | 'discipline', slug: string) {
  return LOCATIONS.filter((l) => (kind === 'sector' ? l.sectors : l.disciplines).includes(slug));
}

/** Guides that relate to a discipline or a sector, newest first. */
export function insightsFor(kind: 'sector' | 'discipline', slug: string) {
  return INSIGHTS.filter((i) => (kind === 'sector' ? i.sectors : i.disciplines).includes(slug)).sort((a, b) =>
    a.datePublished < b.datePublished ? 1 : -1
  );
}
