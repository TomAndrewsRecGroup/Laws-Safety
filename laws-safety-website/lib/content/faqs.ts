import type { FaqEntry } from './types';
import { ADDRESS_ONE_LINE, CONTACT } from '@/lib/site';
import { CONSULTANCY, HOUSING_CONTRACTOR, orgLabel } from './profile';

/**
 * The general FAQ: who Stephen is, what his record covers and how to reach
 * him. Every answer about his career traces to his CV.
 */
export const FAQS: FaqEntry[] = [
  {
    category: 'about',
    question: 'Who is Stephen Laws?',
    answer: `Stephen Laws CMIOSH is a chartered health and safety professional based at Wrotham, near Sevenoaks, Kent. He has worked in health and safety since 2011, as a consultant, trainer, consultancy director and general manager at ${orgLabel(CONSULTANCY)}, and for 18 months as health, safety and environmental manager on secondment to ${orgLabel(HOUSING_CONTRACTOR)}. He is Vice Chair of the Kent Health and Safety Group and Vice Chair of Safety Groups UK.`,
  },
  {
    category: 'about',
    question: 'What is Laws Safety?',
    answer:
      'Laws Safety is the name under which Stephen Laws is known professionally. This site is his record: the disciplines he has delivered, the sectors and places he has worked in, and the guides he has written. It is based at Nepicar Park in Wrotham, Kent.',
  },
  {
    category: 'about',
    question: 'What qualifications and memberships does Stephen hold?',
    answer:
      'Stephen is a Chartered Member of the Institution of Occupational Safety and Health (CMIOSH). He holds the NEBOSH General Certificate and the NEBOSH Construction Certificate, both with credit, a CSCS black card as a health and safety manager, the PTLLS teaching qualification, Temporary Works Coordinator training and the CITB Site Management Safety Training Scheme (SMSTS).',
  },
  {
    category: 'about',
    question: 'What is Stephen’s standing in the health and safety profession?',
    answer:
      'He has been part of the Kent Health and Safety Group for 15 years and is its Vice Chair; he has served the IOSH South East Branch for 11 years, including three as its Lead Mentor; and he has been involved with Safety Groups UK for three years and is its Vice Chair.',
  },
  {
    category: 'record',
    question: 'Which sectors has Stephen worked in?',
    answer:
      'Construction, including commercial and housing projects with clients, principal contractors and contractors from demolition and groundworks through to completion; civil engineering, working for many years with groundwork and reinforced-concrete-frame contractors on highways, footings and deep excavations; retail fit-out from shell and core through to Category B; and fabrication and process operations.',
  },
  {
    category: 'record',
    question: 'Which health and safety disciplines has Stephen delivered?',
    answer:
      'CDM 2015 and construction health and safety, site and premises inspections and compliance audits, risk assessments and safe systems of work, temporary works and high-risk activities, contractor and subcontractor management, accident and incident investigation, health and safety training, and the competent-person role with policy review and safety leadership.',
  },
  {
    category: 'record',
    question: 'Which courses has Stephen delivered?',
    answer:
      'CITB Directors’ Role for Health and Safety, SMSTS, SSSTS and Health and Safety Awareness; IOSH Leading Safely, Managing Safely and Working Safely; the NEBOSH General and Construction Certificates; and Qualsafe-accredited and bespoke courses in risk assessment, COSHH, fire safety and a wide range of other subjects.',
  },
  {
    category: 'record',
    question: 'Where has Stephen worked?',
    answer:
      'Across London and the South East, from his base at Wrotham near Sevenoaks. The location pages describe the areas and the kinds of site each one holds.',
  },
  {
    category: 'record',
    question: 'Are the guides on this site written by Stephen?',
    answer:
      'They are published under his name and cover the law and practice of the disciplines he has worked in. Each one is reviewed by Stephen before it is published and revised when the law changes.',
  },
  {
    category: 'contact',
    question: 'How can I get in touch with Stephen?',
    answer: `By email at ${CONTACT.email}, by phone on ${CONTACT.phoneDisplay}, or through the form on the contact page. His office is at ${ADDRESS_ONE_LINE}.`,
  },
];

export const FAQ_CATEGORIES: { id: FaqEntry['category']; label: string }[] = [
  { id: 'about', label: 'About Stephen' },
  { id: 'record', label: 'His record' },
  { id: 'contact', label: 'Getting in touch' },
];
