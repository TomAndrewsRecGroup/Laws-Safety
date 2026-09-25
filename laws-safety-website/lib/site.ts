/**
 * Site-wide constants. The one place the canonical host, the brand name and
 * the contact details live; every route, schema block and feed reads them
 * from here so they can never drift apart.
 *
 * The canonical host is www.laws-safety.com. The non-www to www redirect is
 * handled in the Vercel domain settings, NOT in next.config.mjs (a host-based
 * redirect there loops on Vercel).
 */

export const BASE_URL = 'https://www.laws-safety.com';
export const PRIMARY_HOST = 'laws-safety.com';

export const SITE_NAME = 'Laws Safety';
export const PERSON_NAME = 'Stephen Laws';

/** Contact details from the Laws Safety brand canvas (signature and centrepiece). */
export const CONTACT = {
  email: 'Stephen@Laws-Safety.com',
  /** Display form, as it appears on the signature. */
  phoneDisplay: '07792 543081',
  /** E.164 form for tel: links and schema. */
  phoneE164: '+447792543081',
  address: {
    line1: 'Unit 7, Nepicar Park',
    line2: 'Wrotham',
    town: 'Sevenoaks',
    county: 'Kent',
    postcode: 'TN15 7AF',
    country: 'GB',
  },
} as const;

export const ADDRESS_ONE_LINE = `${CONTACT.address.line1}, ${CONTACT.address.line2}, ${CONTACT.address.town}, ${CONTACT.address.county} ${CONTACT.address.postcode}`;

/** Schema @ids, so every page's JSON-LD points at the same entities. */
export const IDS = {
  person: `${BASE_URL}/#stephen-laws`,
  organization: `${BASE_URL}/#organization`,
  website: `${BASE_URL}/#website`,
  logo: `${BASE_URL}/#logo`,
} as const;

/** Brand assets served from /public. */
export const ASSETS = {
  emblem: '/laws-safety-emblem.png',
  emblemSmall: '/laws-safety-emblem-160.png',
  wordmarkWhite: '/laws-safety-wordmark-white.svg',
  wordmarkNavy: '/laws-safety-wordmark-navy.svg',
  favicon: '/favicon.png',
} as const;

/**
 * Google Analytics 4. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel to enable;
 * with it unset the gtag script is not rendered at all.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
