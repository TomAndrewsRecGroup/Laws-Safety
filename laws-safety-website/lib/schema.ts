/**
 * JSON-LD helpers. The entity graph is Person-first: Stephen Laws is the
 * main entity of the site, Laws Safety is the Organization he founded, and
 * every page's WebPage node points back at both. There are deliberately no
 * Service, Offer or makesOffer nodes anywhere: the graph describes a person
 * and his record, machine-readably, and nothing that could be read as a
 * solicitation.
 */

import { BASE_URL, IDS, SITE_NAME, PERSON_NAME, CONTACT, ASSETS } from './site';
import { PROFILE, DISCIPLINES, SECTORS, LOCATIONS, paths, type Faq, type Insight } from './content';
import { LEGAL } from './content/legal';
import { absoluteUrl } from './site-urls';

/**
 * Serialise a JSON-LD object for a <script> tag. Escapes '<' so no string
 * can close the script block.
 */
export function ldJson(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

const OG_DEFAULT = `${BASE_URL}/api/og?title=${encodeURIComponent('Stephen Laws')}&eyebrow=${encodeURIComponent('Laws Safety')}`;

/** The Person node, reused on every page by @id. */
export function personNode() {
  return {
    '@type': 'Person',
    '@id': IDS.person,
    name: PERSON_NAME,
    givenName: PROFILE.givenName,
    familyName: PROFILE.familyName,
    honorificSuffix: PROFILE.postNominals,
    jobTitle: PROFILE.jobTitle,
    description: PROFILE.summary,
    url: absoluteUrl(paths.about),
    ...(PROFILE.photo ? { image: { '@type': 'ImageObject', url: `${BASE_URL}${PROFILE.photo.src}`, caption: PROFILE.photo.alt } } : {}),
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phoneE164,
    worksFor: { '@id': IDS.organization },
    workLocation: {
      '@type': 'Place',
      name: 'Wrotham, Kent',
      address: postalAddress(),
    },
    homeLocation: { '@type': 'Place', name: 'Kent, England' },
    knowsAbout: [
      'Occupational health and safety',
      ...DISCIPLINES.map((d) => d.title),
      ...SECTORS.map((s) => `Health and safety in ${s.title.toLowerCase()}`),
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Health and safety practitioner',
      occupationLocation: [
        { '@type': 'AdministrativeArea', name: 'Greater London' },
        { '@type': 'AdministrativeArea', name: 'South East England' },
      ],
    },
    memberOf: PROFILE.affiliations.map((a) => ({
      '@type': 'OrganizationRole',
      roleName: a.role,
      memberOf: { '@type': 'Organization', name: a.organisation },
    })),
    hasCredential: [...PROFILE.memberships, ...PROFILE.qualifications].map((q) => ({
      '@type': 'EducationalOccupationalCredential',
      name: q.name,
      ...(q.year ? { dateCreated: String(q.year) } : {}),
    })),
    ...(PROFILE.linkedin ? { sameAs: [PROFILE.linkedin] } : {}),
  };
}

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: `${CONTACT.address.line1}, ${CONTACT.address.line2}`,
    addressLocality: CONTACT.address.town,
    addressRegion: CONTACT.address.county,
    postalCode: CONTACT.address.postcode,
    addressCountry: CONTACT.address.country,
  };
}

/** The Organization node: the name Stephen works under. */
export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': IDS.organization,
    name: SITE_NAME,
    legalName: LEGAL.entity,
    identifier: { '@type': 'PropertyValue', propertyID: 'Companies House', value: LEGAL.companyNumber },
    url: BASE_URL,
    logo: { '@type': 'ImageObject', '@id': IDS.logo, url: `${BASE_URL}${ASSETS.favicon}`, width: 512, height: 512, caption: `${SITE_NAME} emblem` },
    image: { '@type': 'ImageObject', url: OG_DEFAULT, width: 1200, height: 630 },
    founder: { '@id': IDS.person },
    employee: { '@id': IDS.person },
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    address: postalAddress(),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Greater London' },
      { '@type': 'AdministrativeArea', name: 'South East England' },
    ],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'general enquiries', email: CONTACT.email, telephone: CONTACT.phoneE164, areaServed: 'GB', availableLanguage: ['English'] }],
    ...(PROFILE.linkedin ? { sameAs: [PROFILE.linkedin] } : {}),
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: BASE_URL,
    name: SITE_NAME,
    description: `The health and safety record of ${PERSON_NAME}.`,
    publisher: { '@id': IDS.organization },
    about: { '@id': IDS.person },
    inLanguage: 'en-GB',
  };
}

/** The site-wide graph, emitted once from the root layout. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), personNode(), websiteNode()],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(pagePath: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(pagePath)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

export function faqNode(pagePath: string, faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(pagePath)}#faq`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['[data-speakable]'] },
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
}

export interface WebPageOptions {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'AboutPage' | 'ProfilePage' | 'CollectionPage' | 'ContactPage' | 'FAQPage';
  dateModified?: string;
  crumbs?: Crumb[];
  faqs?: Faq[];
  /** Extra nodes to add to the graph (an Article, say). */
  extra?: unknown[];
}

/**
 * A page-level @graph: WebPage (+ breadcrumb, + FAQ, + anything else), all
 * pointing at the site-wide Person, Organization and WebSite by @id.
 */
export function pageGraph(o: WebPageOptions) {
  const url = absoluteUrl(o.path);
  const nodes: unknown[] = [
    {
      '@type': o.type ?? 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: o.name,
      description: o.description,
      inLanguage: 'en-GB',
      isPartOf: { '@id': IDS.website },
      about: { '@id': IDS.person },
      ...(o.type === 'ProfilePage' ? { mainEntity: { '@id': IDS.person } } : {}),
      ...(o.dateModified ? { dateModified: o.dateModified } : {}),
      ...(o.crumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    },
  ];
  if (o.crumbs) nodes.push(breadcrumbNode(o.path, o.crumbs));
  if (o.faqs && o.faqs.length) nodes.push(faqNode(o.path, o.faqs));
  if (o.extra) nodes.push(...o.extra);
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function articleNode(i: Insight) {
  const url = absoluteUrl(paths.insight(i.slug));
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: i.title,
    description: i.description,
    datePublished: i.datePublished,
    dateModified: i.dateModified,
    author: { '@id': IDS.person },
    publisher: { '@id': IDS.organization },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    image: { '@type': 'ImageObject', url: `${BASE_URL}/api/og?title=${encodeURIComponent(i.title)}&eyebrow=${encodeURIComponent('Guide')}`, width: 1200, height: 630 },
    articleSection: i.category,
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    about: [...i.disciplines.map((d) => DISCIPLINES.find((x) => x.slug === d)?.title), ...i.sectors.map((s) => SECTORS.find((x) => x.slug === s)?.title)].filter(Boolean),
  };
}

/** A Place node for a location page. */
export function placeNode(slug: string) {
  const l = LOCATIONS.find((x) => x.slug === slug);
  if (!l) return null;
  return {
    '@type': 'Place',
    '@id': `${absoluteUrl(paths.location(l.slug))}#place`,
    name: l.name,
    containedInPlace: { '@type': 'AdministrativeArea', name: l.region === 'South East London' ? 'Greater London' : 'Kent' },
  };
}
