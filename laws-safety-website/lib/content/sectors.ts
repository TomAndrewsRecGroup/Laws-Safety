import type { Sector } from './types';
import { HOUSING_CONTRACTOR, orgLabel } from './profile';

/**
 * The sectors on Stephen's record, as his CV states them: construction
 * (commercial and housing), civil engineering, retail fit-out, and
 * fabrication and process operations. `landscape` is general, checkable copy
 * about each sector's safety picture; every `delivered` bullet traces to the
 * CV. A sector the CV does not evidence is not here.
 */
export const SECTORS: Sector[] = [
  {
    slug: 'construction',
    title: 'Construction and housing development',
    seoTitle: 'Construction and housing: safety record',
    shortTitle: 'Construction and housing',
    summary:
      'Clients, principal contractors and contractors on commercial and housing projects, from demolition and groundworks through to completion, under CDM 2015.',
    landscape: [
      'Construction remains the sector with the highest number of workplace deaths in Great Britain, and falls from height account for around half of them. The Construction (Design and Management) Regulations 2015 are the framework: the client, principal designer and principal contractor carry named duties, every project needs a construction phase plan, and larger projects are notified to the HSE on an F10.',
      'On site the risks are well known and still kill people: work at height, excavations and temporary works, moving plant and vehicles, structural collapse during demolition and refurbishment, silica dust, asbestos in pre-2000 buildings and manual handling. The controls are known too, which is why HSE inspectors treat a fall from an unprotected edge as a failure of management, not luck.',
      'Housing development adds its own pattern: many small sites or one large one built in phases, a long tail of subcontractors, plots handed over while others are still being built, and the public living next to the work. What separates a well-run site from a lucky one is the paperwork being real: RAMS that describe the actual task, inductions and toolbox talks that reach the people doing it, inspections at the intervals the regulations set, and a principal contractor who knows what every subcontractor is doing that day.',
    ],
    delivered: [
      'Specialist health and safety support to clients, designers and principal contractors on commercial and housing projects since 2011, from demolition and groundworks through to completion.',
      `Eighteen months seconded to ${orgLabel(HOUSING_CONTRACTOR)} as health, safety and environmental manager, responsible for between three and nine live construction sites at a time: inspecting and supporting each site team, monthly board reporting, incident investigations, subcontractor assessment and the management of high-risk activities.`,
      'Reviewing high-risk risk assessments and safe systems of work, approving subcontractor competence and leading accident investigations for principal contractors.',
      'CITB Site Management Safety Training Scheme (SMSTS), Temporary Works Coordinator training and a CSCS black card as a health and safety manager; SMSTS, SSSTS and Health and Safety Awareness delivered as a CITB trainer.',
    ],
    disciplines: ['cdm-2015', 'temporary-works-and-high-risk-activities', 'contractor-management', 'risk-assessments-and-method-statements', 'safety-audits-and-site-inspections', 'accident-investigation', 'health-and-safety-training'],
    keyTakeaways: [
      'Construction has the highest number of workplace deaths of any sector in Great Britain, and falls from height account for around half of them.',
      'CDM 2015 governs every project: named duty holders, a construction phase plan on every job, and F10 notification above the thresholds.',
      'Housing development multiplies the subcontractor interfaces and puts the public next to the work; real RAMS, real inductions and prescribed inspections are what an inspector looks for after an incident.',
    ],
    faqs: [
      {
        question: 'What are the biggest health and safety risks on a construction site?',
        answer:
          'Falls from height, being struck by moving plant or vehicles, structural collapse, contact with electricity, and the long-term harm from silica dust, asbestos and noise. Falls from height alone account for around half of construction deaths in a typical year.',
      },
      {
        question: 'Does CDM 2015 apply to domestic projects?',
        answer:
          'Yes. A domestic client’s duties pass to the contractor on a single-contractor project, or to the principal contractor where there is more than one, unless the client agrees in writing that the principal designer will carry them. The contractors’ own duties, including the construction phase plan, apply in full.',
      },
      {
        question: 'What does a health, safety and environmental manager do on a housing development?',
        answer:
          'Inspects each site and supports its team, reviews and challenges RAMS before high-risk work, assesses and supports subcontractors, investigates incidents, manages the high-risk activities across every live site, and reports to the board on where the programme stands. On a multi-site programme that means keeping three, six or nine sites to the same standard at once.',
      },
    ],
  },
  {
    slug: 'civil-engineering',
    title: 'Civil engineering and groundworks',
    seoTitle: 'Civil engineering and groundworks: record',
    shortTitle: 'Civil engineering',
    summary:
      'Groundwork and reinforced-concrete-frame contractors on highways, footings and deep excavation works, from a background in plant operation.',
    landscape: [
      'Civil engineering is the part of construction where the ground itself is the hazard. Excavations collapse without warning and a cubic metre of soil weighs more than a tonne; buried services are struck because nobody scanned or hand-dug; plant works close to people because the site is a strip of road rather than a fenced compound; and reinforced-concrete frames depend on falsework and formwork that are loaded before anyone has checked them.',
      'The controls are specific and prescribed. CDM 2015 regulation 22 requires excavations to be supported or battered where there is a risk of collapse and regulation 24 requires them to be inspected at the start of every shift; HSG47, Avoiding danger from underground services, sets out plans, cable detection and safe digging; BS 5975 governs temporary works; the Work at Height Regulations 2005 cover every edge and platform; and workplace transport is planned to keep plant and people apart.',
      'It is also the sector where the person doing the safety work is judged on whether they understand the job. A background in plant operation and years on groundworks and frame contracts mean the RAMS review, the excavation inspection and the toolbox talk are done by someone who has stood in the hole.',
    ],
    delivered: [
      'Many years of work with groundwork and reinforced-concrete-frame contractors, covering highways, footings and deep excavation works.',
      'A background in plant operation before moving into health and safety.',
      'Temporary Works Coordinator training; reviewing and managing high-risk activities including deep excavations across live sites.',
      'Reviewing high-risk risk assessments and safe systems of work, approving subcontractor competence and leading accident investigations on civil engineering works.',
    ],
    disciplines: ['temporary-works-and-high-risk-activities', 'cdm-2015', 'risk-assessments-and-method-statements', 'contractor-management', 'accident-investigation', 'safety-audits-and-site-inspections'],
    keyTakeaways: [
      'Excavations, buried services, plant movements and temporary works are the civil engineering hazards that kill; each has a prescribed control.',
      'CDM 2015 regulations 22 and 24 require excavations to be supported and inspected at the start of every shift; HSG47 governs work near underground services.',
      'Safety work on groundworks and frame contracts is judged on whether the adviser understands the job.',
    ],
    faqs: [
      {
        question: 'What must happen before digging near underground services?',
        answer:
          'HSG47 sets the sequence: obtain the service plans, use a cable avoidance tool and signal generator to locate services, mark them, hand-dig trial holes to expose them, and keep mechanical excavation clear of them. A permit to dig records that each step was done.',
      },
      {
        question: 'When does an excavation have to be supported?',
        answer:
          'Whenever there is a risk of a person being buried or trapped by a fall or dislodgement of material, whatever the depth. The support or the battering back must be designed for the ground, installed before anyone enters, and inspected at the start of every shift under regulation 24 of CDM 2015.',
      },
      {
        question: 'Who is responsible for falsework on a reinforced-concrete frame?',
        answer:
          'The temporary works coordinator controls it under BS 5975: every item is on the register, has a checked design, is inspected before loading and is loaded and struck only under a permit. The principal contractor appoints the coordinator; the frame contractor builds to the design and stops when the permit says stop.',
      },
    ],
  },
  {
    slug: 'retail-fit-out',
    title: 'Retail fit-out',
    seoTitle: 'Retail fit-out: health and safety record',
    shortTitle: 'Retail fit-out',
    summary:
      'Fit-out projects from shell and core through to Category B: short programmes, trading neighbours and the public a hoarding away.',
    landscape: [
      'A retail fit-out is construction inside a building that is often already open to the public. The programme is short and the trades overlap: strip-out, mechanical and electrical first fix, partitions and ceilings, shopfront and glazing, second fix and finishes, all inside a few weeks and often on night shifts. Shell and core is the landlord’s bare unit; Category A adds the base services and finishes; Category B is the tenant’s fit-out that makes it a shop.',
      'CDM 2015 applies in full, with the added complication that the landlord, the tenant and the fit-out contractor may each be a client, a principal contractor or both at different stages, and the health and safety file for the unit has to survive the change of hands. Hot works, work at height on mezzanines and ceilings, asbestos in older units, dust and noise reaching trading neighbours, fire safety with the unit’s detection isolated, and the shopping public on the other side of a hoarding are the recurring risks.',
      'The work that keeps these projects safe is the boring work done fast: a site set-up that separates the unit from the mall, permits for hot works and ceiling voids, RAMS that match the actual sequence, an induction for a workforce that changes daily, and a fire plan agreed with the centre before the alarm is isolated.',
    ],
    delivered: [
      'Health and safety support on retail fit-out projects from shell and core through to Category B, with clients and contractors.',
      'Site and premises inspections, RAMS review and contractor management on fit-out programmes.',
      'Creating and reviewing policies and procedures, and identifying training needs, for retail clients.',
    ],
    disciplines: ['cdm-2015', 'contractor-management', 'risk-assessments-and-method-statements', 'safety-audits-and-site-inspections', 'health-and-safety-training'],
    keyTakeaways: [
      'A fit-out is construction inside a building that is often open to the public: CDM 2015 applies in full, and the client and principal contractor roles can change hands between shell and core, Category A and Category B.',
      'Hot works, ceiling voids, asbestos in older units, isolated fire detection and the public beyond the hoarding are the recurring risks.',
      'Short programmes and a daily-changing workforce make site set-up, permits and induction the controls that matter.',
    ],
    faqs: [
      {
        question: 'What is the difference between shell and core, Category A and Category B?',
        answer:
          'Shell and core is the landlord’s bare unit: structure, envelope and the main services capped off. Category A adds the base build-out, typically raised floors, suspended ceilings, basic mechanical and electrical services and finishes. Category B is the tenant’s fit-out: the layout, shopfront, fixtures, lighting and everything that makes the unit a particular shop.',
      },
      {
        question: 'Does CDM 2015 apply to a shop fit-out?',
        answer:
          'Yes. Fit-out is construction work under the regulations. Where more than one contractor is involved, which is almost always, a principal designer and principal contractor must be appointed, a construction phase plan is required before work starts, and the health and safety file must be handed over at the end.',
      },
      {
        question: 'Who manages fire safety while a unit is being fitted out?',
        answer:
          'The fit-out contractor for the unit and the centre or landlord for the building, and the arrangements must be agreed in writing before the unit’s detection is isolated: temporary detection, hot works permits, fire watch, extinguishers, escape routes through the hoarding and the point at which the permanent system is recommissioned.',
      },
    ],
  },
  {
    slug: 'fabrication-and-process',
    title: 'Fabrication and process operations',
    seoTitle: 'Fabrication and process: safety record',
    shortTitle: 'Fabrication and process',
    summary:
      'Workshops, fabrication shops and process plants: machinery, hot work, hazardous substances and the management systems that hold up on the shop floor.',
    landscape: [
      'Fabrication and process operations carry a disproportionate share of the specified injuries reported under RIDDOR, most of them involving machinery. The Provision and Use of Work Equipment Regulations 1998 set the duties on guarding, controls, maintenance and inspection; the Lifting Operations and Lifting Equipment Regulations 1998 add thorough examination for cranes, hoists and forklifts; and the Supply of Machinery (Safety) Regulations govern what a new machine must arrive with.',
      'The occupational health risks are slower and just as serious: welding fume and other hazardous substances under COSHH, noise under the Control of Noise at Work Regulations 2005 with its action values at 80 and 85 decibels, hand-arm vibration under the Control of Vibration at Work Regulations 2005, and manual handling. Health surveillance is a legal requirement where the assessment shows exposure that could cause disease, and since 2019 the HSE has treated all welding fume as carcinogenic, with local exhaust ventilation expected indoors.',
      'A fabricator’s or processor’s arrangements have to work across shifts, contractors and maintenance, which is where permit-to-work, lock-out tag-out and contractor control decide whether the policy means anything at three in the morning.',
    ],
    delivered: [
      'Health and safety support to fabrication and process operations as part of a client base spanning construction, retail, fabrication and process.',
      'Site and premises inspections with reports and closeout, compliance auditing, policy and procedure review, and incident investigation for fabrication and process clients.',
      'Qualsafe-accredited and bespoke training in risk assessment and COSHH.',
    ],
    disciplines: ['risk-assessments-and-method-statements', 'safety-audits-and-site-inspections', 'accident-investigation', 'competent-person', 'health-and-safety-training', 'contractor-management'],
    keyTakeaways: [
      'Machinery causes most of the sector’s specified injuries; PUWER 1998 and LOLER 1998 set the guarding, maintenance and examination duties.',
      'Welding fume, COSHH, noise and vibration are the slow injuries; health surveillance is required where exposure could cause disease, and welding fume is treated as carcinogenic.',
      'Permit-to-work, lock-out tag-out and contractor control are where a management system is tested.',
    ],
    faqs: [
      {
        question: 'How often must lifting equipment be thoroughly examined?',
        answer:
          'Under LOLER 1998, every six months for equipment that lifts people and for lifting accessories, every twelve months for other lifting equipment, or in accordance with a written scheme of examination drawn up by a competent person. The examination is separate from routine inspection and maintenance.',
      },
      {
        question: 'When is health surveillance required in a workshop?',
        answer:
          'Where a risk assessment shows that workers are exposed to a hazard that could cause an identifiable disease or adverse health effect, that valid detection techniques exist, and that surveillance is likely to further their protection. Welding fume, noise, hand-arm vibration, respiratory sensitisers and skin irritants are the usual triggers.',
      },
      {
        question: 'What are the noise action values?',
        answer:
          'The lower exposure action value is a daily or weekly personal exposure of 80 dB(A); the upper is 85 dB(A). Above the lower value hearing protection must be made available; above the upper it must be worn and the area marked. The exposure limit value, which must not be exceeded, is 87 dB(A) taking protection into account.',
      },
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
