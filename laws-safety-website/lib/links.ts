/**
 * The internal link plan, computed from the content model.
 *
 * Two rules are encoded here rather than left to each page:
 *
 *  - In-content beats chrome. The header and footer link the hubs; these
 *    bands put spoke-to-spoke links in body copy, which is what makes a
 *    templated page "properly linked" rather than merely reachable.
 *  - Anchor text varies per source. The same target is never linked with the
 *    same words from every page, because repeated exact-match anchors across
 *    a site read as manipulation rather than navigation. Variants are dealt
 *    deterministically by hashing the source slug.
 *
 * scripts/link-graph.mjs checks the result: every sitemap page must have at
 * least one in-content inbound link and sit within three clicks of home.
 */

import { DISCIPLINES, SECTORS, LOCATIONS, INSIGHTS, getDiscipline, getSector, getLocation, getInsight, insightsFor, locationsFor, paths } from './content';
import { lowerFirst } from './text';

export interface BandLink {
  href: string;
  anchor: string;
  blurb: string;
}

export interface Band {
  heading: string;
  intro: string;
  links: BandLink[];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: string, offset = 0): T {
  return arr[(hash(seed) + offset) % arr.length];
}

const DISCIPLINE_ANCHORS = [
  (t: string) => `${t}: what Stephen has delivered`,
  (t: string) => `Stephen's record in ${lower(t)}`,
  (t: string) => `How ${lower(t)} was delivered`,
  (t: string) => `${t}, on the record`,
];
const SECTOR_ANCHORS = [
  (t: string) => `${t}: where this was applied`,
  (t: string) => `Stephen's work in ${lower(t)}`,
  (t: string) => `The ${lower(t)} record`,
  (t: string) => `${t} sites and what was done on them`,
];
const LOCATION_ANCHORS = [
  (a: string) => `The work in ${a}`,
  (a: string) => `${a}: sites and sectors`,
  (a: string) => `Where it was done: ${a}`,
  (a: string) => `${a}, on the map`,
];
const GUIDE_ANCHORS = [(t: string) => `Guide: ${t}`, (t: string) => `Read: ${t}`, (t: string) => `${t}`];

const lower = lowerFirst;

function disciplineLink(slug: string, seed: string, offset = 0): BandLink | null {
  const d = getDiscipline(slug);
  if (!d) return null;
  return { href: paths.discipline(d.slug), anchor: pick(DISCIPLINE_ANCHORS, seed, offset)(d.shortTitle), blurb: d.summary };
}
function sectorLink(slug: string, seed: string, offset = 0): BandLink | null {
  const s = getSector(slug);
  if (!s) return null;
  return { href: paths.sector(s.slug), anchor: pick(SECTOR_ANCHORS, seed, offset)(s.shortTitle), blurb: s.summary };
}
function locationLink(slug: string, seed: string, offset = 0): BandLink | null {
  const l = getLocation(slug);
  if (!l) return null;
  return { href: paths.location(l.slug), anchor: pick(LOCATION_ANCHORS, seed, offset)(l.name), blurb: l.summary };
}
function guideLink(slug: string, seed: string, offset = 0): BandLink | null {
  const i = getInsight(slug);
  if (!i) return null;
  return { href: paths.insight(i.slug), anchor: pick(GUIDE_ANCHORS, seed, offset)(i.title), blurb: i.description };
}

const ABOUT_LINK: BandLink = { href: paths.about, anchor: 'Who delivered it', blurb: 'Stephen’s career, qualifications and memberships, in his own record.' };
const FAQ_LINK: BandLink = { href: paths.faq, anchor: 'Questions people ask about Stephen', blurb: 'Who he is, what he has done and how to reach him.' };
const CONTACT_LINK: BandLink = { href: paths.contact, anchor: 'Get in touch with Stephen', blurb: 'Email, phone, and the office at Nepicar Park, Wrotham.' };

const compact = (links: (BandLink | null)[]): BandLink[] => {
  const seen = new Set<string>();
  return links.filter((l): l is BandLink => Boolean(l) && !seen.has(l!.href) && Boolean(seen.add(l!.href)));
};

export function bandForDiscipline(slug: string): Band {
  const d = getDiscipline(slug)!;
  const sectorSlug = pick(d.sectors, slug);
  const loc = locationsFor('discipline', slug)[hash(slug) % Math.max(1, locationsFor('discipline', slug).length)];
  const guide = insightsFor('discipline', slug)[0];
  return {
    heading: 'Go deeper',
    intro: `Where Stephen applied ${lower(d.shortTitle)}, the places the work was done, and the guide that explains the law behind it.`,
    links: compact([sectorLink(sectorSlug, slug), loc ? locationLink(loc.slug, slug) : null, guide ? guideLink(guide.slug, slug) : null, ABOUT_LINK]),
  };
}

export function bandForSector(slug: string): Band {
  const s = getSector(slug)!;
  const locs = locationsFor('sector', slug);
  const loc = locs[hash(slug) % Math.max(1, locs.length)];
  const guide = insightsFor('sector', slug)[0];
  return {
    heading: 'Go deeper',
    intro: `The disciplines Stephen delivered in ${lower(s.shortTitle)}, one of the places he delivered them, and a guide to the law that applies.`,
    links: compact([disciplineLink(s.disciplines[0], slug), disciplineLink(s.disciplines[1], slug, 1), loc ? locationLink(loc.slug, slug) : null, guide ? guideLink(guide.slug, slug) : null]),
  };
}

export function bandForLocation(slug: string): Band {
  const l = getLocation(slug)!;
  return {
    heading: 'Go deeper',
    intro: `The sectors and disciplines that matter most around ${l.name}, and the neighbouring patch.`,
    links: compact([sectorLink(l.sectors[0], slug), disciplineLink(l.disciplines[0], slug), locationLink(l.nearby[0], slug), ABOUT_LINK]),
  };
}

export function bandForInsight(slug: string): Band {
  const i = getInsight(slug)!;
  return {
    heading: 'From the guide to the record',
    intro: 'The discipline this guide describes, the sector it applies to most, and the questions readers ask next.',
    links: compact([disciplineLink(i.disciplines[0], slug), sectorLink(i.sectors[0], slug), i.disciplines[1] ? disciplineLink(i.disciplines[1], slug, 2) : null, FAQ_LINK]),
  };
}

export function bandForIndex(kind: 'expertise' | 'sectors' | 'locations' | 'insights' | 'about' | 'faq' | 'contact' | 'home'): Band {
  const firstGuide = INSIGHTS[0];
  switch (kind) {
    case 'expertise':
      return {
        heading: 'Go deeper',
        intro: 'The disciplines above were delivered in real sectors and real places; start with either, or read the guides.',
        links: compact([
          { href: paths.sectors, anchor: 'Sectors Stephen has worked across', blurb: SECTORS.map((s) => s.shortTitle).join(', ') + '.' },
          { href: paths.locations, anchor: 'Where the work was done', blurb: `${LOCATIONS.length} areas across London and the South East.` },
          { href: paths.insights, anchor: 'Guides to the law and practice', blurb: `${INSIGHTS.length} guides written by Stephen.` },
        ]),
      };
    case 'sectors':
      return {
        heading: 'Go deeper',
        intro: 'Each sector drew on the same disciplines, applied differently. See the disciplines, the places, and the guides.',
        links: compact([
          { href: paths.expertise, anchor: 'Disciplines Stephen has delivered', blurb: DISCIPLINES.map((d) => d.shortTitle).join(', ') + '.' },
          { href: paths.locations, anchor: 'The London and South East patch', blurb: 'Sevenoaks to the coast, and the London edge.' },
          firstGuide ? guideLink(firstGuide.slug, 'sectors') : null,
        ]),
      };
    case 'locations':
      return {
        heading: 'Go deeper',
        intro: 'The places are one axis of the record; the sectors and disciplines are the other two.',
        links: compact([
          { href: paths.sectors, anchor: 'The sectors behind the places', blurb: SECTORS.map((s) => s.shortTitle).join(', ') + '.' },
          { href: paths.expertise, anchor: 'What was delivered on those sites', blurb: DISCIPLINES.map((d) => d.shortTitle).join(', ') + '.' },
          ABOUT_LINK,
        ]),
      };
    case 'insights':
      return {
        heading: 'Behind the guides',
        intro: 'The guides explain the law; the record shows it applied.',
        links: compact([
          { href: paths.expertise, anchor: 'The disciplines the guides describe', blurb: 'What Stephen has delivered, discipline by discipline.' },
          FAQ_LINK,
          ABOUT_LINK,
        ]),
      };
    case 'about':
      return {
        heading: 'The record in detail',
        intro: 'What Stephen delivered, where he delivered it, and the questions people ask.',
        links: compact([
          { href: paths.expertise, anchor: 'Discipline by discipline', blurb: `${DISCIPLINES.length} disciplines, each with what was delivered and the law behind it.` },
          { href: paths.locations, anchor: 'Place by place', blurb: `${LOCATIONS.length} areas across London and the South East.` },
          FAQ_LINK,
        ]),
      };
    case 'faq':
      return {
        heading: 'Go deeper',
        intro: 'The longer answers live in the record itself.',
        links: compact([ABOUT_LINK, { href: paths.expertise, anchor: 'Disciplines, in full', blurb: 'What was delivered and the regulations behind each.' }, CONTACT_LINK]),
      };
    case 'contact':
      return {
        heading: 'Before you write',
        intro: 'Who Stephen is, and the questions most people have already asked.',
        links: compact([ABOUT_LINK, FAQ_LINK]),
      };
    case 'home':
    default:
      return {
        heading: 'Go deeper',
        intro: 'The three axes of the record.',
        links: compact([
          { href: paths.expertise, anchor: 'Disciplines', blurb: 'What Stephen has delivered.' },
          { href: paths.sectors, anchor: 'Sectors', blurb: 'Where he has worked.' },
          { href: paths.locations, anchor: 'Places', blurb: 'London and the South East.' },
        ]),
      };
  }
}
