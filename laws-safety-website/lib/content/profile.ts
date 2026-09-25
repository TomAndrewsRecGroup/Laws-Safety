import type { Organisation, Profile } from './types';

/**
 * Stephen's own record, taken from his CV (September 2026) and the details
 * supplied with it (LinkedIn, photo, where the work was done). Nothing here
 * is inferred; every line traces to the CV or to what Stephen supplied.
 *
 * Employers and clients are described by type, not named, unless
 * `nameEmployers` is set to true: that is Stephen's decision under the
 * non-compete, and the site is correct either way.
 */

/**
 * Whether employers and clients are named on the site. Stephen's decision
 * under the non-compete; false describes them by type everywhere.
 */
export const NAME_EMPLOYERS = false;

/** The name of an organisation as the site is allowed to print it. */
export function orgLabel(org: Organisation): string {
  return NAME_EMPLOYERS ? org.name : org.described;
}

/** The consultancy and training business Stephen worked in from 2011. */
export const CONSULTANCY: Organisation = {
  name: 'Lighthouse Safety Training Ltd',
  described: 'a Kent health and safety consultancy and training provider',
};

/** The contractor he was seconded to for 18 months. */
export const HOUSING_CONTRACTOR: Organisation = {
  name: 'Willmott Dixon Housing',
  described: 'a national housing contractor',
};

export const PROFILE: Profile = {
  name: 'Stephen Laws',
  givenName: 'Stephen',
  familyName: 'Laws',
  postNominals: 'CMIOSH',
  nameEmployers: NAME_EMPLOYERS,
  headline: 'Chartered health and safety professional, Vice Chair of the Kent Health and Safety Group and of Safety Groups UK.',
  jobTitle: 'Health and Safety Professional and General Manager',
  careerStart: 2011,
  summary: `Stephen Laws is a Chartered Member of IOSH who has worked in health and safety since 2011, across construction and housing development, civil engineering, retail fit-out, and fabrication and process operations. He has been a consultant, trainer, consultancy director and general manager at ${orgLabel(CONSULTANCY)}, spent 18 months seconded to ${orgLabel(HOUSING_CONTRACTOR)} as its health, safety and environmental manager, and is Vice Chair of the Kent Health and Safety Group and of Safety Groups UK.`,
  bio: [
    `Stephen came into health and safety from plant operation in civil engineering, and joined ${orgLabel(CONSULTANCY)} as a consultant in February 2011, progressing into delivering training. From the start the work was with client senior management and directors: keeping businesses compliant with their statutory duties, advising on every health and safety requirement, identifying training needs, creating and reviewing policies and procedures, and inspecting sites and premises with written reports and support through to closeout. In construction he provided specialist support to clients, designers and principal contractors, reviewed high-risk risk assessments and safe systems of work, approved subcontractor competence, led accident investigations, and sat on and chaired director and safety meetings, bringing strategic safety guidance and improvement initiatives to the table.`,
    `Within that role he was seconded for 18 months to ${orgLabel(HOUSING_CONTRACTOR)} as health, safety and environmental manager, responsible for between three and nine live construction sites at a time: inspecting and supporting each site team, reporting to the board every month, investigating incidents, assessing and supporting subcontractors, and reviewing and managing the high-risk activities on every site. From September 2017 to February 2023 he was the consultancy’s Consultancy Director, overseeing its whole health and safety consultancy provision: planning, forecasting and reporting to the board, keeping the client base supported and professionally managed, leading initial client meetings, gap analysis and organisational development planning, acting as each client’s direct point of contact, providing safety analysis and reporting, and managing incident investigations through to closeout. Since February 2023 he has been its General Manager, responsible for financial and operational reporting, planning, forecasting and analysis, HR and team management, and consultancy and training as the business requires.`,
    'Stephen is a Chartered Member of IOSH, holds the NEBOSH General and Construction Certificates, both awarded with credit, and carries a CSCS black card as a health and safety manager, a PTLLS teaching qualification, Temporary Works Coordinator training and the CITB Site Management Safety Training Scheme. He has been part of the Kent Health and Safety Group for 15 years and is its Vice Chair, has served the IOSH South East Branch for 11 years including three as its Lead Mentor, and has been involved with Safety Groups UK for three years and is its Vice Chair. The courses he has delivered run from the CITB Directors’ Role for Health and Safety, SMSTS, SSSTS and Health and Safety Awareness, through IOSH Leading Safely, Managing Safely and Working Safely, to the NEBOSH General and Construction Certificates and Qualsafe-accredited and bespoke courses in risk assessment, COSHH, fire safety and a wide range of other subjects.',
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
    { name: 'IOSH South East Branch, Lead Mentor for three years' },
  ],
  affiliations: [
    { organisation: 'Institution of Occupational Safety and Health (IOSH)', role: 'Chartered Member (CMIOSH)' },
    { organisation: 'Kent Health and Safety Group', role: 'Vice Chair', tenure: 'a member for 15 years' },
    { organisation: 'Safety Groups UK', role: 'Vice Chair', tenure: 'involved for three years' },
    { organisation: 'IOSH South East Branch', role: 'Member, and Lead Mentor for three years', tenure: '11 years' },
  ],
  timeline: [
    {
      period: 'Before 2011',
      title: 'Plant operation, civil engineering',
      detail: 'Stephen came into health and safety from plant operation, the background behind his years of work with groundwork and reinforced-concrete-frame contractors.',
    },
    {
      period: 'February 2011 to February 2017',
      title: 'Health and safety consultant and trainer',
      organisation: CONSULTANCY,
      detail:
        'Statutory compliance with client senior management and directors; policies and procedures; site and premises inspections; specialist construction support to clients, designers and principal contractors; high-risk RAMS review; subcontractor competence; accident investigations; chairing director and safety meetings.',
    },
    {
      period: '18 months within that period',
      title: 'Health, safety and environmental manager (secondment)',
      organisation: HOUSING_CONTRACTOR,
      detail: 'Between three and nine live construction sites at a time: inspecting and supporting each site team, monthly board reporting, incident investigations, subcontractor assessment, and the review and management of high-risk activities.',
    },
    {
      period: 'September 2017 to February 2023',
      title: 'Consultancy Director',
      organisation: CONSULTANCY,
      detail:
        'Oversaw the whole health and safety consultancy provision: planning, forecasting and reporting to the board; the client base; initial client meetings, gap analysis and organisational development planning; safety analysis and reporting; incident investigations through to closeout; training as required.',
    },
    {
      period: 'February 2023 to date',
      title: 'General Manager',
      organisation: CONSULTANCY,
      detail: 'Financial and operational reporting, planning, forecasting and analysis, HR and team management, and consultancy and training as the business requires.',
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
