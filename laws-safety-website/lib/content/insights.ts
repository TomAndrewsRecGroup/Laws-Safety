import type { Insight } from './types';

/**
 * Guides published under Stephen's byline. They are educational: the law,
 * the guidance and the practice, written for the people who carry the duties.
 * They make no claim about Stephen's own work and contain no offer; his record
 * lives in the expertise and sector pages, and the articles link to it.
 *
 * Every article is Stephen's to approve before it goes live.
 */
export const INSIGHTS: Insight[] = [
  {
    slug: 'cdm-2015-duty-holders-explained',
    seoTitle: 'CDM 2015 explained: the six duty holders',
    title: 'CDM 2015 explained: the six duty holders and what each one must do',
    description:
      'What CDM 2015 requires of each of its six duty holders, when a project must be notified to the HSE, and the three documents every project turns on.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 8,
    category: 'Construction',
    standfirst:
      'The Construction (Design and Management) Regulations 2015 are short, and most of the trouble they cause comes from people not knowing which of the six roles they are holding. This guide sets out each duty holder, what the regulations require of them, and the documents that prove the duties were met.',
    keyTakeaways: [
      'CDM 2015 applies to every construction project in Great Britain, domestic work included.',
      'Where more than one contractor is involved, the client must appoint a principal designer and a principal contractor in writing; if it does not, it holds those duties itself.',
      'Three documents carry the project: pre-construction information, the construction phase plan and the health and safety file.',
      'Notify the HSE on an F10 when the work will exceed 30 working days with more than 20 workers at once, or 500 person days.',
    ],
    sections: [
      {
        id: 'who-the-regulations-apply-to',
        heading: 'Who the regulations apply to',
        blocks: [
          { type: 'p', text: 'CDM 2015 came into force on 6 April 2015 and applies to all construction work in Great Britain: building, civil engineering and engineering construction, from a loft conversion to a motorway. There is no lower size limit. What changes with size is whether the project must be notified to the Health and Safety Executive and whether a principal designer and principal contractor must be appointed, and those are two separate tests.' },
          { type: 'p', text: 'The regulations name six duty holders. A single person or organisation can hold more than one role at once: a small builder on a domestic extension is often the contractor, the principal contractor and, by default, the holder of the client’s duties as well.' },
        ],
      },
      {
        id: 'the-client',
        heading: 'The client',
        blocks: [
          { type: 'p', text: 'The client is anyone for whom a construction project is carried out. Commercial clients must make suitable arrangements for managing the project, including allowing enough time and resource, appointing the principal designer and principal contractor in writing where more than one contractor is involved, providing pre-construction information, making sure a construction phase plan is in place before work starts and that welfare facilities are provided, and ensuring the health and safety file is prepared. Where a client fails to make the appointments, the regulations make it the principal designer and principal contractor by default.' },
          { type: 'p', text: 'Domestic clients, people having work done on their own home, are not expected to carry these duties. Their duties pass automatically to the contractor on a single-contractor project, or to the principal contractor where there is more than one, unless the client agrees in writing that the principal designer will take them on.' },
        ],
      },
      {
        id: 'the-principal-designer',
        heading: 'The principal designer',
        blocks: [
          { type: 'p', text: 'Appointed by the client under regulation 5 for any project with more than one contractor, the principal designer must be a designer with control over the pre-construction phase. Its job is to plan, manage, monitor and coordinate health and safety before and during design: identifying and eliminating or controlling foreseeable risks, making sure designers comply with their own duties, assembling and passing on pre-construction information, and preparing the health and safety file. The role replaced the CDM coordinator of the 2007 regulations, and the change was deliberate: the person coordinating safety in design is now the person who controls the design.' },
        ],
      },
      {
        id: 'the-principal-contractor',
        heading: 'The principal contractor',
        blocks: [
          { type: 'p', text: 'Appointed by the client for the same projects, the principal contractor plans, manages, monitors and coordinates the construction phase. It draws up the construction phase plan before work starts and keeps it current, organises cooperation between contractors, provides site inductions, prevents unauthorised access, consults and engages with workers, provides welfare facilities from the first day, and liaises with the principal designer for as long as that appointment runs.' },
        ],
      },
      {
        id: 'designers-contractors-and-workers',
        heading: 'Designers, contractors and workers',
        blocks: [
          { type: 'ul', items: [
            'Designers, anyone who prepares or modifies a design, including temporary works, must not start work unless the client is aware of its duties, and must eliminate foreseeable risks where they can, reduce or control those they cannot, and give information about the residual risks to the people who need it.',
            'Contractors must plan, manage and monitor their own work, not start unless there is a construction phase plan, provide their workers with appropriate supervision, information, instruction and training, and comply with the principal contractor’s directions. On a single-contractor project the contractor also prepares the construction phase plan itself.',
            'Workers must be consulted about matters that affect their health and safety, take care of themselves and others, cooperate with the duty holders, and report anything they see that is likely to endanger anyone.',
          ] },
        ],
      },
      {
        id: 'the-three-documents',
        heading: 'The three documents',
        blocks: [
          { type: 'table', columns: ['Document', 'Who produces it', 'When it is required'], rows: [
            ['Pre-construction information', 'The client, assembled by the principal designer', 'Every project: the information designers and contractors need to plan the work safely'],
            ['Construction phase plan', 'The principal contractor, or the contractor on a single-contractor project', 'Every project, before the construction phase begins'],
            ['Health and safety file', 'The principal designer, handed to the client at the end', 'Every project with more than one contractor'],
          ] },
          { type: 'p', text: 'The construction phase plan is the one most often missing on small jobs. It does not have to be long; the industry bodies publish short templates for small domestic projects. It has to be there before the work starts and it has to describe this project, not the last one.' },
        ],
      },
      {
        id: 'notification',
        heading: 'Notification to the HSE',
        blocks: [
          { type: 'p', text: 'A project is notifiable when the construction work is scheduled to last longer than 30 working days and have more than 20 workers working simultaneously at any point, or to exceed 500 person days. The client notifies on form F10, online, as soon as practicable before the construction phase begins, and a copy is displayed in the site office. Notification is administrative: it does not change any of the duties above, which apply to the un-notified project in full.' },
          { type: 'callout', title: 'Two tests, not one', text: 'Appointments depend on the number of contractors; notification depends on the size of the job. A two-week refurbishment with three trades needs a principal designer and principal contractor and no F10. A six-month single-contractor project with 25 workers needs an F10 and no principal appointments.' },
        ],
      },
      {
        id: 'enforcement',
        heading: 'What enforcement looks like',
        blocks: [
          { type: 'p', text: 'The HSE enforces CDM directly on construction sites and inspects unannounced. The failures that draw enforcement are predictable: no construction phase plan, no evidence of a principal designer appointment on a multi-contractor job, welfare that was never provided, and work at height with no protection in place. The Sentencing Council guideline for health and safety offences links fines to turnover and culpability, and CDM breaches are prosecuted under the Health and Safety at Work etc. Act 1974 as well as the regulations themselves.' },
        ],
      },
    ],
    disciplines: ['cdm-2015', 'temporary-works-and-high-risk-activities'],
    sectors: ['construction', 'civil-engineering'],
    faqs: [
      { question: 'Can the principal designer and principal contractor be the same organisation?', answer: 'Yes, where a design-and-build contractor controls both phases. The two roles must still be carried out, and the organisation must have the design skills, knowledge and experience the principal designer role requires.' },
      { question: 'When does the principal designer’s appointment end?', answer: 'When the client ends it. If the appointment finishes before the project does, the principal contractor takes over the health and safety file for the rest of the construction phase, so the client should keep the principal designer in place to the end wherever it can.' },
    ],
  },
  {
    slug: 'fire-risk-assessment-what-it-must-cover',
    seoTitle: 'What a fire risk assessment must cover',
    title: 'What a fire risk assessment must cover, and when to review it',
    description:
      'The responsible person, article 9 of the Fire Safety Order, the nine things every assessment must examine, the 2023 recording rule, and when to review.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 7,
    category: 'Fire safety',
    standfirst:
      'A fire risk assessment is the document a fire officer asks for first and the one most often produced from a template that describes a different building. This guide covers who must make one, what it has to examine, the recording rule that changed in October 2023, and when it has to be looked at again.',
    keyTakeaways: [
      'The Regulatory Reform (Fire Safety) Order 2005 applies to every non-domestic premises in England and Wales and to the common parts of flats and HMOs.',
      'The responsible person, the employer or whoever controls the premises, must make a suitable and sufficient fire risk assessment under article 9.',
      'Since 1 October 2023 the whole assessment must be recorded, whatever the size of the organisation.',
      'Review when the premises, the people or the activities change, after any fire or near miss, and on a fixed cycle in between.',
    ],
    sections: [
      {
        id: 'who-must-make-one',
        heading: 'Who must make one',
        blocks: [
          { type: 'p', text: 'The Order places its duties on the responsible person. In a workplace that is the employer; in any other premises it is the owner, or the person who has control of the premises in connection with a trade, business or undertaking, which usually means a landlord or a managing agent. Where a building has several occupiers, each is a responsible person for the part it controls and all of them must cooperate and coordinate with each other. The duties cannot be contracted out: an assessor can be engaged, but the responsible person remains responsible for the assessment being suitable and sufficient.' },
        ],
      },
      {
        id: 'what-it-must-examine',
        heading: 'What it must examine',
        blocks: [
          { type: 'p', text: 'PAS 79-1:2020 sets out the methodology most competent assessors follow, and it matches what fire and rescue services expect to see. In outline:' },
          { type: 'ol', items: [
            'The premises and their use: construction, layout, occupancy and what goes on in them, including anything that changes at night or at weekends.',
            'Fire hazards: sources of ignition, sources of fuel and sources of oxygen, and the housekeeping that keeps them apart.',
            'People at risk: everyone in the building, with particular attention to those who are asleep, unfamiliar with it, isolated, or who would need help to evacuate.',
            'Means of escape: travel distances, the number and width of exits, protected routes, final exit doors, and whether any of it has been compromised by storage, locks or alterations.',
            'Fire detection and warning: the alarm system, its category, its coverage and its testing regime.',
            'Emergency lighting and signage: whether escape routes can be found and followed in the dark.',
            'Fire-fighting equipment: the extinguishers, their types, positions and servicing, and any fixed systems.',
            'Compartmentation and structural protection: fire doors, walls, ceilings, service penetrations and the external wall, where the Fire Safety Act 2021 applies.',
            'Management: training, drills, maintenance records, the arrangements for contractors and visitors, and personal emergency evacuation plans for anyone who needs one.',
          ] },
          { type: 'p', text: 'Each hazard is evaluated against the controls in place, the remaining risk is judged, and the significant findings are turned into an action plan with priorities, owners and dates. The action plan is the point of the exercise; an assessment without one is an inspection report.' },
        ],
      },
      {
        id: 'the-recording-rule',
        heading: 'The recording rule that changed in 2023',
        blocks: [
          { type: 'p', text: 'Until October 2023 the Order required only the significant findings to be recorded, and only where five or more people were employed or a licence or alterations notice applied. Section 156 of the Building Safety Act 2022 amended article 9 with effect from 1 October 2023: the responsible person must now record the full fire risk assessment and the fire safety arrangements, whatever the size of the organisation, and must record the name and organisation of anyone engaged to make or review it. A verbal assessment, or one that exists only in the assessor’s notes, no longer meets the duty.' },
          { type: 'callout', title: 'Residential buildings', text: 'The Fire Safety Act 2021 confirmed that in multi-occupied residential buildings the Order covers the structure, the external walls including cladding and balconies, and the flat entrance doors. The Fire Safety (England) Regulations 2022 added specific duties for those buildings, including quarterly checks of communal fire doors and best-endeavour annual checks of flat entrance doors in buildings over 11 metres, and information for residents.' },
        ],
      },
      {
        id: 'when-to-review',
        heading: 'When to review it',
        blocks: [
          { type: 'p', text: 'Article 9(3) requires the assessment to be reviewed regularly, and in any event where there is reason to suspect it is no longer valid or there has been a significant change in the matters it relates to. In practice that means:' },
          { type: 'ul', items: [
            'Any change to the building: refurbishment, an extension, new partitions, a change to the layout of an escape route.',
            'Any change of use or occupancy, including a new tenant or a new activity in an existing tenant’s space.',
            'Any fire, near miss or false alarm pattern.',
            'A change in the people: sleeping accommodation introduced, a disabled employee starting, a night shift added.',
            'A fixed interval regardless: annual review is the norm, with a full reassessment every three to five years, and sooner in higher-risk premises.',
          ] },
        ],
      },
      {
        id: 'enforcement',
        heading: 'Enforcement',
        blocks: [
          { type: 'p', text: 'Fire and rescue authorities enforce the Order and can issue alterations, enforcement and prohibition notices. A prohibition notice closes the premises or part of them immediately. Offences under article 32 carry unlimited fines and up to two years’ imprisonment, and prosecutions of landlords, managing agents and hospitality operators for missing or inadequate assessments are routine.' },
        ],
      },
    ],
    disciplines: ['health-and-safety-training', 'competent-person'],
    sectors: ['retail-fit-out', 'fabrication-and-process'],
    faqs: [
      { question: 'Does the responsible person have to use a professional assessor?', answer: 'No. The Order requires the assessment to be suitable and sufficient and the person making it to be competent. For simple, low-risk premises a well-informed responsible person can do it; for premises with sleeping accommodation, complex layouts or vulnerable occupants, most responsible persons engage a competent assessor and remain accountable for the result.' },
      { question: 'What is the difference between a fire risk assessment and a fire safety strategy?', answer: 'A fire strategy is a design document for a new or altered building showing how it meets the Building Regulations. A fire risk assessment is the ongoing assessment of the building in use. One does not replace the other.' },
    ],
  },
  {
    slug: 'risk-assessments-and-method-statements-that-get-read',
    seoTitle: 'Writing RAMS that actually get read',
    title: 'RAMS that get read: risk assessments and method statements for the people doing the work',
    description:
      'What regulation 3 requires, why a method statement is practical rather than legal, the five steps, and how to write RAMS the workforce recognises.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 7,
    category: 'Risk management',
    standfirst:
      'Most RAMS are written to be approved rather than to be used. This guide goes back to what the law requires, separates the risk assessment from the method statement, and sets out how to write both so that the person on the tools recognises their job in them.',
    keyTakeaways: [
      'Regulation 3 of the Management Regulations requires every employer to make a suitable and sufficient risk assessment; the significant findings must be recorded at five or more employees.',
      'A method statement is not named in any regulation. It is the practical answer to the risks the assessment found, and principal contractors are entitled to insist on one.',
      'Task-, place- and people-specific beats generic every time; a copied assessment that lists absent hazards and misses present ones fails the suitable and sufficient test.',
      'The document is finished when it has been briefed to the people doing the work and signed by them, not when it has been approved.',
    ],
    sections: [
      {
        id: 'what-the-law-requires',
        heading: 'What the law requires',
        blocks: [
          { type: 'p', text: 'Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires every employer and self-employed person to make a suitable and sufficient assessment of the risks to their employees while at work and to anyone else who may be affected by the conduct of their undertaking. Where five or more people are employed, the significant findings and any group of employees identified as especially at risk must be recorded. The assessment must be reviewed if there is reason to suspect it is no longer valid or there has been a significant change.' },
          { type: 'p', text: 'Specific regulations add their own assessment duties: the Control of Substances Hazardous to Health Regulations 2002 for hazardous substances, the Manual Handling Operations Regulations 1992 for lifting and carrying, the Work at Height Regulations 2005 for work at height, the Control of Noise at Work Regulations 2005 and the Control of Vibration at Work Regulations 2005 for those hazards. They are not separate exercises so much as the general duty applied with more detail where the hazard justifies it.' },
        ],
      },
      {
        id: 'the-five-steps',
        heading: 'The five steps, still',
        blocks: [
          { type: 'p', text: 'The HSE’s five steps have been reworded over the years but not replaced, because they describe the job:' },
          { type: 'ol', items: [
            'Identify the hazards, by walking the task and the place, asking the people who do it, and reading the incident history, not by copying a list.',
            'Decide who might be harmed and how, including contractors, visitors, the public, and anyone especially at risk such as new starters, young people and expectant mothers.',
            'Evaluate the risks and decide on precautions, applying the hierarchy of control: eliminate, substitute, engineer, administer, and only then protect with PPE.',
            'Record the significant findings in a form the workforce can use.',
            'Review it when the work changes and at a sensible fixed interval in between.',
          ] },
        ],
      },
      {
        id: 'where-the-method-statement-fits',
        heading: 'Where the method statement fits',
        blocks: [
          { type: 'p', text: 'A method statement is not a legal requirement in itself. It answers the question the risk assessment raises: given these risks and these controls, how exactly will the work be done, in what sequence, with what equipment, by whom, and what happens if something goes wrong? On construction projects the Construction (Design and Management) Regulations 2015 make the construction phase plan the document that pulls the high-risk method statements together, and a principal contractor will not let a high-risk activity start without one. Outside construction the same document is often called a safe system of work.' },
          { type: 'p', text: 'The two documents have different audiences. The assessment is for the person planning the work and the person checking it. The method statement is for the person doing it, which is why it belongs in plain language, in sequence, with the diagrams and photographs the task needs, and why it is briefed at the point of work and signed by the people who will follow it.' },
        ],
      },
      {
        id: 'why-generic-rams-fail',
        heading: 'Why generic RAMS fail the test',
        blocks: [
          { type: 'p', text: 'The HSE describes a suitable and sufficient assessment as one that identifies the significant risks of the actual work, is proportionate to those risks, considers everyone affected, and remains valid for a reasonable period. A generic document taken from the last job fails on the first point immediately: it lists hazards that are not present, misses the one that is, and gives the site team a document they stop reading after the first page. An inspector or a court will treat it as no assessment at all.' },
          { type: 'callout', title: 'The test in one line', text: 'Would the person doing the work recognise their job in this document? If not, it is not their risk assessment.' },
        ],
      },
      {
        id: 'writing-them-well',
        heading: 'Writing them well',
        blocks: [
          { type: 'ul', items: [
            'One task, one place, one document. A RAMS pack for a whole contract is a filing system, not a control.',
            'Name the actual controls: the type of edge protection, the make of the podium, the exclusion zone distance, the permit number, the competent person on site.',
            'Keep it short enough to be read standing up. Two pages for the assessment, a few more for the method, and the drawings.',
            'Brief it, sign it, keep the briefing record with the document. The signature is the evidence that regulation 13 training and CDM information duties were met.',
            'Change it when the job changes. A method statement for a task that has been re-sequenced on site is a method statement for a different task.',
          ] },
        ],
      },
    ],
    disciplines: ['risk-assessments-and-method-statements', 'cdm-2015', 'health-and-safety-training'],
    sectors: ['construction', 'civil-engineering', 'fabrication-and-process'],
    faqs: [
      { question: 'Does a sole trader need a written risk assessment?', answer: 'A sole trader with no employees must still make the assessment under regulation 3 but is not required to record it. On a construction site the principal contractor will require a written RAMS regardless, as a condition of starting work.' },
      { question: 'How often should RAMS be reviewed?', answer: 'Whenever the task, the place, the equipment or the people change, and at a fixed interval otherwise. Twelve months is common for a standing task; a construction method statement is reviewed whenever the sequence on site departs from it.' },
    ],
  },
  {
    slug: 'directors-role-in-health-and-safety',
    title: 'The directors’ role in health and safety: what the board is accountable for',
    seoTitle: 'The directors’ role in health and safety',
    description:
      'Section 37 personal liability, the HSE and IoD framework of plan, deliver, monitor and review, corporate manslaughter, sentencing, and what a board does.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 7,
    category: 'Leadership',
    standfirst:
      'Health and safety is a board matter because the law made it one. This guide sets out what directors are personally accountable for, the framework the HSE and the Institute of Directors expect a board to follow, how offences are sentenced, and the handful of things an effective board does every quarter.',
    keyTakeaways: [
      'Section 37 of the Health and Safety at Work etc. Act 1974 makes a director personally liable where the company’s offence was committed with their consent or connivance or through their neglect.',
      'The HSE and Institute of Directors guidance, Leading health and safety at work, sets the framework: plan, deliver, monitor, review.',
      'The Corporate Manslaughter and Corporate Homicide Act 2007 applies where a gross breach of a duty of care by senior management causes death.',
      'The Sentencing Council guideline links fines to turnover, culpability and harm; large organisations face fines in the millions for serious breaches.',
    ],
    sections: [
      {
        id: 'personal-liability',
        heading: 'Personal liability under section 37',
        blocks: [
          { type: 'p', text: 'Most health and safety duties fall on the employer as a body corporate. Section 37 of the Health and Safety at Work etc. Act 1974 reaches past the company to the people who run it: where an offence by the company is proved to have been committed with the consent or connivance of, or to be attributable to any neglect on the part of, a director, manager, secretary or similar officer, that person is guilty of the offence as well. Since the Health and Safety (Offences) Act 2008 the penalties for individuals include imprisonment of up to two years, and a court can also disqualify a convicted director under the Company Directors Disqualification Act 1986.' },
          { type: 'p', text: 'Neglect is the limb that catches most directors: not the one who told a site to cut a corner, but the one who never asked, never read the audit, never funded the training and left the policy unsigned for three years. The HSE prosecutes directors under section 37 every year, and the question in each case is what the director knew, or should have known, and what they did about it.' },
        ],
      },
      {
        id: 'the-framework',
        heading: 'The framework: plan, deliver, monitor, review',
        blocks: [
          { type: 'p', text: 'Leading health and safety at work, published jointly by the HSE and the Institute of Directors as INDG417, is the guidance a court and an inspector measure a board against. It asks four things of a board and its members:' },
          { type: 'table', columns: ['Stage', 'What the board does'], rows: [
            ['Plan', 'Owns the health and safety policy, sets the direction, puts health and safety on the board agenda and integrates it into business decisions, including major changes and acquisitions'],
            ['Deliver', 'Resources it: competent advice, training, time and money; appoints a board member to champion it; ensures the management system works and that the workforce is consulted'],
            ['Monitor', 'Receives leading and lagging indicators, audit results, incident data and the outcomes of investigations, and asks what they mean'],
            ['Review', 'Reviews performance at least annually, acts on what it finds, and reports on it publicly where the organisation reports at all'],
          ] },
          { type: 'p', text: 'The guidance is explicit that the same four stages apply to a small business run by its owner as to a listed company; what changes is the scale of the arrangements, not the responsibility.' },
        ],
      },
      {
        id: 'corporate-manslaughter',
        heading: 'Corporate manslaughter',
        blocks: [
          { type: 'p', text: 'The Corporate Manslaughter and Corporate Homicide Act 2007 makes an organisation guilty of the offence where the way its activities were managed or organised by its senior management caused a death and amounted to a gross breach of a relevant duty of care. It is an offence of the organisation, not the individual, and it sits alongside rather than replacing section 37 and the common-law offence of gross negligence manslaughter, under which individual directors and managers can still be prosecuted personally.' },
          { type: 'callout', title: 'Senior management', text: 'The Act defines senior management as the people who play significant roles in making decisions about how the whole or a substantial part of the organisation’s activities are managed, or in actually managing them. In a small company that is the board and often the owner personally.' },
        ],
      },
      {
        id: 'sentencing',
        heading: 'How offences are sentenced',
        blocks: [
          { type: 'p', text: 'The Sentencing Council’s definitive guideline for health and safety offences, corporate manslaughter and food safety offences, in force since February 2016, sets fines by a matrix of culpability (from very high to low), harm (the seriousness of the harm risked and the likelihood of it) and the organisation’s turnover. For a large organisation, one with turnover over £50 million, the starting points for the most serious health and safety offences run into the millions of pounds; for corporate manslaughter the range reaches £20 million. Medium, small and micro organisations are sentenced on proportionately lower tables, and the court then adjusts for aggravating and mitigating factors, an early guilty plea and the organisation’s means.' },
          { type: 'p', text: 'The guideline changed the arithmetic of health and safety for boards: a fine is now calculated from turnover, not capped by precedent, and the culpability assessment looks directly at what the leadership knew and did. That is why the board’s own records, the minutes, the audits received and the actions taken, are the first documents a defence solicitor asks for.' },
        ],
      },
      {
        id: 'what-a-board-does',
        heading: 'What an effective board does',
        blocks: [
          { type: 'ul', items: [
            'Signs and dates the health and safety policy, and re-signs it at every review.',
            'Names a director as the health and safety champion and puts the subject on every board agenda, not the annual one.',
            'Appoints and listens to a competent person, and knows who that is.',
            'Receives a short dashboard each meeting: leading indicators (inspections done, training current, actions closed) alongside lagging ones (incidents, RIDDORs, days lost).',
            'Reads the audit and the incident investigations and minutes the decisions taken on them.',
            'Asks about health and safety before approving a new site, process, contract or acquisition, not after.',
            'Walks the workplace, and talks to the people doing the work, at least once a year.',
          ] },
          { type: 'p', text: 'None of this needs a large organisation. It needs a board that has decided the subject is its own, which is the finding the HSE and the courts look for when something has gone wrong.' },
        ],
      },
    ],
    disciplines: ['competent-person', 'health-and-safety-training'],
    sectors: ['construction', 'fabrication-and-process', 'retail-fit-out'],
    faqs: [
      { question: 'Can a director delegate health and safety to a manager or a consultant?', answer: 'The work, yes; the accountability, no. A board can appoint a competent person and give a manager day-to-day responsibility, and should, but section 37 attaches to what the director consented to, connived at or neglected. A director who appointed an adviser and then ignored the adviser’s reports has delegated nothing that matters.' },
      { question: 'Does the guidance apply to a company with ten employees?', answer: 'Yes. INDG417 is written for organisations of all sizes and says so in its title. The arrangements scale down; the four stages and the personal accountability do not.' },
    ],
  },
  {
    slug: 'accident-investigation-root-cause-not-blame',
    seoTitle: 'Accident investigation: root cause, not blame',
    title: 'Accident investigation: finding the root cause, not the person to blame',
    description:
      'The HSG245 four-step approach, immediate, underlying and root causes, what RIDDOR requires and when, and the evidence to secure in the first hour.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 8,
    category: 'Incidents',
    standfirst:
      'An investigation that ends with “the operative failed to follow the method statement” has found where the incident happened and stopped. This guide sets out the approach the HSE expects, the legal reporting duties that run alongside it, and what to secure in the first hour so the report holds up months later.',
    keyTakeaways: [
      'HSG245 sets the approach: gather the information, analyse it, identify the risk-control measures that failed or were missing, and act.',
      'Immediate cause, underlying causes and root cause are different questions; only the last two prevent the next incident.',
      'RIDDOR 2013: report deaths and specified injuries without delay, over-seven-day injuries within fifteen days, and record over-three-day injuries.',
      'Photograph before anything moves, take statements while memory is fresh, secure the documents, and separate fact from inference in the report.',
    ],
    sections: [
      {
        id: 'the-first-hour',
        heading: 'The first hour',
        blocks: [
          { type: 'p', text: 'Once the injured person has been treated and the area made safe, the investigation starts with preservation. Photograph the scene from several distances and angles before anything is moved. Note the position of equipment, guards, barriers, signs and materials. Identify the witnesses and separate them before they compare accounts. Secure the documents: the RAMS, the permit, the inspection records, the training matrix, the maintenance log for the equipment involved. If the incident is reportable under RIDDOR, or looks as though it might be, do not clear the scene until it is certain the HSE will not want to see it.' },
        ],
      },
      {
        id: 'the-four-steps',
        heading: 'The four steps of HSG245',
        blocks: [
          { type: 'ol', items: [
            'Gather the information: what happened, where, when, to whom, in what conditions, with what equipment, and what was supposed to happen according to the documents.',
            'Analyse: establish the sequence of events and ask why at each link in it until the answers move from the workplace to how the work was managed.',
            'Identify risk-control measures: which controls failed, which were missing, and which would have prevented the incident or reduced its consequences.',
            'Plan and implement: an action plan with owners and dates, the risk assessment reviewed, the lessons communicated to the people who need them.',
          ] },
        ],
      },
      {
        id: 'three-levels-of-cause',
        heading: 'Three levels of cause',
        blocks: [
          { type: 'p', text: 'The immediate cause is the event or condition that directly produced the injury: the unguarded blade, the missing edge protection, the reversing vehicle. The underlying causes are the failures that allowed it: the guard removed for cleaning with no procedure to refit it, the edge protection never planned into the sequence, the banksman reassigned. The root cause is the management failure they share: the pressure on the shift, the assessment nobody reviewed, the supervisor with three sites and no time.' },
          { type: 'callout', title: 'Why blame does not work', text: 'Individual error is almost always the last link in a chain the organisation forged. An investigation that stops at the person finds a cause it cannot control and leaves the chain intact for the next person. That is also why the HSE, insurers and courts look past it.' },
        ],
      },
      {
        id: 'riddor',
        heading: 'RIDDOR: what must be reported and when',
        blocks: [
          { type: 'table', columns: ['Event', 'Duty', 'Timescale'], rows: [
            ['Work-related death', 'Report to the HSE', 'Without delay; by phone as well as online'],
            ['Specified injury (regulation 4)', 'Report', 'Without delay; online within 10 days'],
            ['Injury causing more than 7 consecutive days’ incapacity', 'Report', 'Within 15 days of the accident'],
            ['Injury causing more than 3 consecutive days’ incapacity', 'Record only', 'In the accident book or equivalent'],
            ['Member of the public taken directly to hospital', 'Report', 'Without delay'],
            ['Dangerous occurrence (Schedule 2)', 'Report', 'Without delay'],
            ['Occupational disease (regulations 8 to 9)', 'Report on diagnosis', 'Without delay'],
          ] },
          { type: 'p', text: 'The responsible person for reporting is the employer of the injured worker, or the person in control of the premises where a self-employed person or member of the public is injured. Employers with ten or more employees must also keep an accident book under the Social Security (Claims and Payments) Regulations 1979, and most keep one regardless.' },
        ],
      },
      {
        id: 'the-report',
        heading: 'The report that stands up',
        blocks: [
          { type: 'p', text: 'A report may be read by an HSE inspector, an insurer’s loss adjuster, a claimant’s solicitor and a coroner, sometimes years later. It stands up when it separates what was found from what was concluded, references every document and photograph by number, records who was interviewed and when, states the causes at all three levels, and ends with an action plan that has since been evidenced as done. It also stands up when it is honest: a report that finds no management failure in a serious incident is treated as a report that did not look.' },
        ],
      },
    ],
    disciplines: ['accident-investigation', 'risk-assessments-and-method-statements', 'safety-audits-and-site-inspections'],
    sectors: ['construction', 'civil-engineering', 'fabrication-and-process'],
    faqs: [
      { question: 'Should the injured person’s supervisor lead the investigation?', answer: 'The supervisor is a witness and often part of the causal chain, so no. Someone with the competence to investigate and the independence to report on the management of the work should lead, with the supervisor and the workforce involved as participants.' },
      { question: 'Does a RIDDOR report mean the HSE will investigate?', answer: 'Not necessarily. The HSE selects incidents for investigation against published criteria, weighted towards deaths, serious injuries and dangerous occurrences. Every report is recorded, and a pattern of reports from one site or employer raises the likelihood of a visit.' },
    ],
  },
  {
    slug: 'health-and-safety-policy-what-the-law-requires',
    seoTitle: 'The health and safety policy the law requires',
    title: 'The health and safety policy: what the law requires and what a good one contains',
    description:
      'Section 2(3) of the 1974 Act, the five-employee threshold, the three parts of a policy, the arrangements section inspectors read first, and who signs it.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 6,
    category: 'Management',
    standfirst:
      'Every employer with five or more people needs a written health and safety policy, and most have one somewhere. This guide covers what the Act actually requires, what each of the three parts is for, and why the arrangements section is the one that decides whether the document means anything.',
    keyTakeaways: [
      'Section 2(3) of the Health and Safety at Work etc. Act 1974 requires a written policy at five or more employees, revised as necessary and brought to employees’ attention.',
      'A policy has three parts: the statement of intent, the organisation, and the arrangements.',
      'The arrangements section describes how each significant risk is actually managed; a template that describes a different business fails.',
      'Regulation 7 of the Management Regulations requires every employer to appoint a competent person, and the policy names them.',
    ],
    sections: [
      {
        id: 'what-the-act-requires',
        heading: 'What the Act requires',
        blocks: [
          { type: 'p', text: 'Section 2(3) of the Health and Safety at Work etc. Act 1974 requires every employer to prepare, and revise as often as appropriate, a written statement of its general policy on the health and safety at work of its employees and the organisation and arrangements for carrying it out, and to bring it and any revision to the notice of all employees. The Employers’ Health and Safety Policy Statements (Exception) Regulations 1975 exempt employers with fewer than five employees from the requirement that it be written, though the duty to have a policy remains.' },
          { type: 'p', text: 'The policy is one of the first documents an HSE or local authority inspector asks for, and one of the first an SSIP assessor, an insurer or a principal contractor asks for at pre-qualification. It is also the document a court reads to establish what the employer said it would do.' },
        ],
      },
      {
        id: 'the-three-parts',
        heading: 'The three parts',
        blocks: [
          { type: 'ul', items: [
            'The statement of intent: a page, signed and dated by the most senior person, stating the employer’s commitment and the standards it holds itself to. It is the part that gets framed, and the least important.',
            'The organisation: who is responsible for what, from the board to the supervisor, including the competent person appointed under regulation 7 and the arrangements for consulting employees.',
            'The arrangements: how each significant risk in the business is managed in practice, and how the system as a whole is run: risk assessment, training, contractors, incidents, emergencies, monitoring and review.',
          ] },
        ],
      },
      {
        id: 'the-arrangements-section',
        heading: 'The arrangements section',
        blocks: [
          { type: 'p', text: 'This is the part most often copied from a template and the part inspectors read first, for the same reason: it is where a policy either describes the business or does not. A joinery workshop’s arrangements cover wood dust, machinery guarding, noise and manual handling; a care home’s cover moving and handling, fire with sleeping residents, infection control and violence. A policy whose arrangements section could belong to either has not been written for either.' },
          { type: 'p', text: 'Each arrangement should say what the risk is, what the control is, who is responsible, what records are kept, and where the detailed procedure lives. The policy does not have to contain every procedure; it has to show that they exist and connect them.' },
          { type: 'callout', title: 'A useful test', text: 'Hand the arrangements section to a new supervisor and ask them to find out how a contractor is inducted, who investigates an accident, and where the risk assessments are kept. If they cannot, neither can an inspector.' },
        ],
      },
      {
        id: 'the-competent-person',
        heading: 'The competent person behind it',
        blocks: [
          { type: 'p', text: 'Regulation 7 of the Management of Health and Safety at Work Regulations 1999 requires every employer to appoint one or more competent persons to help it comply with its duties. The regulations prefer an employee where one has the training, knowledge and experience; where no one does, an external adviser fills the role. The appointment does not transfer any duty to the adviser. It gives the employer the competence to meet duties that remain its own, and the policy’s organisation section names who holds it.' },
        ],
      },
      {
        id: 'keeping-it-alive',
        heading: 'Keeping it alive',
        blocks: [
          { type: 'ul', items: [
            'Review it annually and whenever the business changes: a new site, a new process, a new regulation, a serious incident.',
            'Re-sign and re-date the statement of intent at every review; an undated policy is an expired one.',
            'Bring it to employees’ attention in a way that can be evidenced: induction, briefings, a signed acknowledgement, not a folder on a shared drive.',
            'Keep the arrangements consistent with the risk assessments, the training matrix and the procedures they point to. A policy that names a procedure that no longer exists is a finding waiting to be written.',
          ] },
        ],
      },
    ],
    disciplines: ['competent-person', 'safety-audits-and-site-inspections'],
    sectors: ['fabrication-and-process', 'construction', 'retail-fit-out'],
    faqs: [
      { question: 'Does a business with four employees need a written policy?', answer: 'Not by law: the 1975 Exception Regulations remove the writing requirement below five employees. The duty to have a policy and to manage health and safety remains, and any client, insurer or SSIP scheme will ask for a written one regardless, so most small businesses write one anyway.' },
      { question: 'Who should sign the policy?', answer: 'The most senior person in the organisation: the managing director, the chief executive, the owner or, in a school, the chair of trustees. Signature by the health and safety adviser signals that the leadership has delegated its accountability, which it cannot do.' },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}

/** Newest first. */
export function insightsByDate(): Insight[] {
  return [...INSIGHTS].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}
