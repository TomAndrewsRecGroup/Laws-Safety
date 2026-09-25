/**
 * The content model. Every page family on the site is generated from the
 * records in lib/content/*, and so are the sitemap, llms.txt, the RSS feed,
 * the internal link bands and the JSON-LD graph. Change the record, and the
 * whole site follows.
 *
 * Voice rule for every string in these files (see docs/WORDING_RULES.md):
 * Stephen's record, never an offer. "Stephen has delivered…", never "we offer".
 *
 * Placeholders: any string wrapped in double square brackets is a fact still to be
 * confirmed from Stephen's own record. `npm run content:check` fails while any
 * remain, and `npm run build` runs it first, so a placeholder can never reach
 * production by accident.
 */

export interface Faq {
  question: string;
  answer: string;
}

export interface Qualification {
  /** Written in full, post-nominal after: "Chartered Member of IOSH (CMIOSH)". */
  name: string;
  awardedBy?: string;
  year?: number;
}

export interface TimelineEntry {
  /** "2009" or "2009 to 2014". */
  period: string;
  title: string;
  /** The employer or client organisation, rendered by name or by description. */
  organisation?: Organisation;
  detail: string;
}

export interface Organisation {
  /** The real name, used only when PROFILE.nameEmployers is true. */
  name: string;
  /** How it is described otherwise: "a Kent health and safety consultancy and training provider". */
  described: string;
}

export interface Affiliation {
  organisation: string;
  role: string;
  /** "since 2011", "for 15 years", as Stephen states it. */
  tenure?: string;
}

export interface Profile {
  name: string;
  givenName: string;
  familyName: string;
  /** Post-nominals as they follow his name: "CMIOSH". */
  postNominals: string;
  /**
   * Whether employers and clients are named on the site (true) or described
   * by type (false). Stephen's decision, under the non-compete; the default
   * describes.
   */
  nameEmployers: boolean;
  /** Professional bodies and groups: the roles he holds in the profession. */
  affiliations: Affiliation[];
  /** One line under the name: what he is. */
  headline: string;
  /** Schema jobTitle. */
  jobTitle: string;
  /** Year his health and safety career began; null until confirmed. */
  careerStart: number | null;
  /** Two or three sentences in the record voice; used on the homepage and in meta. */
  summary: string;
  /** The /about narrative, one paragraph per entry. */
  bio: string[];
  qualifications: Qualification[];
  memberships: Qualification[];
  timeline: TimelineEntry[];
  /** His LinkedIn profile URL, or null while unsupplied (the "Connect on LinkedIn" links and schema sameAs follow it). */
  linkedin: string | null;
  /**
   * His photo, or null while none is supplied (the emblem is used instead).
   * `src` is the portrait (/about, the homepage, schema Person image);
   * `avatar` is an optional head-and-shoulders crop for small bylines.
   */
  photo: { src: string; alt: string; avatar?: string } | null;
  /** Where he is based, as a place name. */
  basedIn: string;
  /** Where the work was done, as it should read after "across": "London and the South East". */
  coverage: string;
}

export interface Discipline {
  slug: string;
  title: string;
  /** Hand-written <title> body, ≤ 46 characters (lib/seo-title.ts budget). Falls back to title, clamped. */
  seoTitle?: string;
  /** For cards, nav and the OG tag. ≤ 32 characters. */
  shortTitle: string;
  /** One sentence for cards and the meta description. ≤ 155 characters. */
  summary: string;
  /** Educational paragraphs: what the discipline is and the law behind it. */
  what: string[];
  /** The regulations and standards it sits under, written in full. */
  regulations: string[];
  /** What Stephen has delivered in this discipline. Record voice. */
  delivered: string[];
  /** Sector slugs where he has applied it. */
  sectors: string[];
  /** Related discipline slugs. */
  related: string[];
  keyTakeaways: string[];
  faqs: Faq[];
}

export interface Sector {
  slug: string;
  title: string;
  /** Hand-written <title> body, ≤ 46 characters. */
  seoTitle?: string;
  shortTitle: string;
  summary: string;
  /** The sector's safety landscape: hazards, regulators, what good looks like. */
  landscape: string[];
  /** What Stephen has delivered in this sector. Record voice. */
  delivered: string[];
  /** Discipline slugs applied in this sector. */
  disciplines: string[];
  keyTakeaways: string[];
  faqs: Faq[];
}

export type KentRegion = 'West Kent' | 'Mid Kent' | 'North Kent' | 'East Kent' | 'South East London';

export interface LocationProject {
  title: string;
  detail: string;
}

export interface Location {
  slug: string;
  /** "Sevenoaks", "Medway". */
  name: string;
  /** Hand-written <title> body, ≤ 46 characters. */
  seoTitle?: string;
  /** The wider patch the page speaks for: "Sevenoaks, Wrotham and West Kent". */
  area: string;
  region: KentRegion;
  summary: string;
  /** Checkable local context: what the area is and what kind of sites it holds. */
  localContext: string[];
  /** The site types typical of the area, as short noun phrases. */
  siteTypes: string[];
  /** Sector slugs relevant here. */
  sectors: string[];
  /** Discipline slugs relevant here. */
  disciplines: string[];
  /** Neighbouring location slugs. */
  nearby: string[];
  /**
   * Work Stephen has done in this area, from his own record. Ships empty and
   * renders nothing until filled; the page never invents a project.
   */
  projects: LocationProject[];
  faqs: Faq[];
}

export type InsightBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'table'; columns: string[]; rows: string[][] };

export interface InsightSection {
  id: string;
  heading: string;
  blocks: InsightBlock[];
}

export interface Insight {
  slug: string;
  title: string;
  /** Hand-written <title> body, ≤ 46 characters. */
  seoTitle?: string;
  /** ≤ 155 characters. */
  description: string;
  /** ISO date, YYYY-MM-DD. */
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  category: string;
  /** One-paragraph standfirst under the title. */
  standfirst: string;
  keyTakeaways: string[];
  sections: InsightSection[];
  /** Discipline and sector slugs the article relates to (drives the link band). */
  disciplines: string[];
  sectors: string[];
  faqs: Faq[];
}

export interface Testimonial {
  quote: string;
  /** Name only where the person has agreed to be named; otherwise their role. */
  author: string;
  role: string;
  /** Sector slug, for the attribution line. */
  sector: string;
  year?: number;
  /** Must be true; the page only renders quotes given with permission. */
  permission: true;
}

export interface FaqEntry extends Faq {
  category: 'about' | 'record' | 'contact';
}
