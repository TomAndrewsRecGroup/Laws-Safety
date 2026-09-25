import type { Organisation, Profile } from './types';

/**
 * Stephen's own record, taken from his CV (September 2026) and the details
 * supplied with it (LinkedIn, photo, where the work was done). Nothing here
 * is inferred; every line traces to the CV or to what Stephen supplied.
 *
 * Employers and clients are never named, anywhere: not on the site and not
 * in this source. They are described by type only, and
 * scripts/content-check.mjs fails the build if a name ever appears.
 */

/** How an organisation is printed on the site: by type, never by name. */
export function orgLabel(org: Organisation): string {
  return org.described;
}

/** The consultancy and training business Stephen worked in from 2011. */
export const CONSULTANCY: Organisation = {
  described: 'a health and safety consultancy',
};

/** The contractor he was seconded to for 18 months. */
export const HOUSING_CONTRACTOR: Organisation = {
  described: 'a national housing contractor',
};

export const PROFILE: Profile = {
  name: 'Stephen Laws',
  givenName: 'Stephen',
  familyName: 'Laws',
  postNominals: 'CMIOSH',
  headline: 'Chartered health and safety professional, based in Kent.',
  jobTitle: 'Health and Safety Professional and General Manager',
  careerStart: 2011,
  summary: `Stephen has worked in health and safety since 2011. He has advised company directors, managed safety on live building sites, investigated accidents and taught courses up to NEBOSH level. He is Vice Chair of the Kent Health and Safety Group and of Safety Groups UK.`,
  bio: [
    `Stephen started out as a plant operator in civil engineering. In February 2011 he moved into health and safety, joining ${orgLabel(CONSULTANCY)} as a consultant. Before long he was teaching courses as well.`,
    'His work has always been about keeping businesses within the law. He has worked directly with owners, directors and senior managers. He has written and checked safety policies, inspected sites, written up what needed fixing, and stayed involved until it was fixed. He has also led accident investigations.',
    'On construction projects he has supported clients, designers and principal contractors. He has checked risk assessments for high-risk work, checked that subcontractors were up to the job, and chaired safety meetings.',
    `For 18 months he was seconded to ${orgLabel(HOUSING_CONTRACTOR)} as its health, safety and environmental manager. He looked after 3 to 9 live building sites at a time and reported to the board every month.`,
    'From September 2017 to February 2023 he was Consultancy Director, in charge of all the consultancy’s client work. Since February 2023 he has been General Manager, running the business day to day.',
    'He has taught courses from IOSH Working Safely up to the NEBOSH General and Construction Certificates, as well as CITB site safety courses such as SMSTS and SSSTS.',
  ],
  qualifications: [
    { name: 'NEBOSH General Certificate (Credit)' },
    { name: 'NEBOSH Construction Certificate (Credit)' },
    { name: 'CSCS black card, Health and Safety Manager' },
    { name: 'PTLLS teaching qualification (Preparing to Teach in the Lifelong Learning Sector)' },
    { name: 'Temporary Works Coordinator' },
    { name: 'CITB Site Management Safety Training Scheme (SMSTS)' },
  ],
  memberships: [
    { name: 'Chartered Member of the Institution of Occupational Safety and Health (CMIOSH)' },
    { name: 'Vice Chair, Kent Health and Safety Group' },
    { name: 'Vice Chair, Safety Groups UK' },
    { name: 'IOSH South East Branch, Lead Mentor for 3 years' },
  ],
  affiliations: [
    { organisation: 'Institution of Occupational Safety and Health (IOSH)', role: 'Chartered Member (CMIOSH)' },
    { organisation: 'Kent Health and Safety Group', role: 'Vice Chair', tenure: 'member for 15 years' },
    { organisation: 'Safety Groups UK', role: 'Vice Chair', tenure: 'involved for 3 years' },
    { organisation: 'IOSH South East Branch', role: 'Member, and Lead Mentor for 3 years', tenure: '11 years' },
  ],
  timeline: [
    {
      period: 'Before 2011',
      title: 'Plant operator, civil engineering',
      detail: 'Worked plant on civil engineering sites before moving into health and safety.',
    },
    {
      period: 'February 2011 to February 2017',
      title: 'Health and safety consultant and trainer',
      organisation: CONSULTANCY,
      detail: 'Helped client businesses meet their legal duties. Inspected sites, wrote policies, checked risk assessments, investigated accidents and taught courses.',
    },
    {
      period: '18 months within that time',
      title: 'Health, safety and environmental manager (secondment)',
      organisation: HOUSING_CONTRACTOR,
      detail: 'Looked after 3 to 9 live building sites at a time. Reported to the board every month.',
    },
    {
      period: 'September 2017 to February 2023',
      title: 'Consultancy Director',
      organisation: CONSULTANCY,
      detail: 'In charge of all the consultancy’s client work. Reported to the board and was the main contact for clients.',
    },
    {
      period: 'February 2023 to now',
      title: 'General Manager',
      organisation: CONSULTANCY,
      detail: 'Runs the business day to day: finance, planning and the team. Still does consultancy and training when needed.',
    },
  ],
  linkedin: 'https://www.linkedin.com/in/stephen-laws-cmiosh-b3163730',
  photo: { src: '/stephen-laws.jpg', alt: 'Stephen Laws CMIOSH', avatar: '/stephen-laws-avatar.jpg' },
  basedIn: 'Wrotham, near Sevenoaks, Kent',
  coverage: 'London and the South East',
};

/** "since 2011", or an empty string while the start year is unconfirmed. */
export function sinceLine(): string {
  return PROFILE.careerStart ? `since ${PROFILE.careerStart}` : '';
}

/** Whole years in the profession, or null while unconfirmed. */
export function yearsInSafety(now = new Date()): number | null {
  return PROFILE.careerStart ? now.getFullYear() - PROFILE.careerStart : null;
}
