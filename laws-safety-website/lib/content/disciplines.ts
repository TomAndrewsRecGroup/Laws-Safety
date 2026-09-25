import type { Discipline } from './types';
import { CONSULTANCY, HOUSING_CONTRACTOR, orgLabel } from './profile';

/**
 * The disciplines on Stephen's record, reconciled against his CV. The
 * educational copy (`what`, `regulations`, `keyTakeaways`, `faqs`) is general
 * guidance on the law and practice; every `delivered` bullet traces to a line
 * of the CV. A discipline the CV does not evidence is not here.
 *
 * Voice: record, never offer. See docs/WORDING_RULES.md.
 */
export const DISCIPLINES: Discipline[] = [
  {
    slug: 'cdm-2015',
    title: 'CDM 2015 and construction health and safety',
    seoTitle: 'CDM 2015 and construction health and safety',
    shortTitle: 'CDM 2015 and construction',
    summary:
      'Specialist support to clients, designers and principal contractors under CDM 2015, on commercial and housing projects from groundworks to completion.',
    what: [
      'The Construction (Design and Management) Regulations 2015 apply to every construction project in Great Britain, from a domestic extension to a hospital. They put named duties on six duty holders: the client, the principal designer, the principal contractor, designers, contractors and workers. Where more than one contractor is involved at any time, the client must appoint a principal designer and a principal contractor in writing; if it fails to, it carries those duties itself.',
      'The principal designer plans, manages, monitors and coordinates health and safety in the pre-construction phase: assembling pre-construction information for the people who will build the job, making sure designers eliminate and reduce foreseeable risk, and preparing the health and safety file that is handed to the client at the end. The principal contractor carries the same duties for the construction phase, and every project, however small, needs a construction phase plan before work starts.',
      'A project is notifiable to the Health and Safety Executive on an F10 where construction work is scheduled to last more than 30 working days with more than 20 workers on site at the same time, or to exceed 500 person days. Notification changes nothing about the duties themselves; they apply to the un-notified job too. On site, the regulations are only as good as the people applying them: the site inductions, the reviewed RAMS, the inspections at the prescribed intervals and the subcontractors whose competence somebody actually checked.',
    ],
    regulations: [
      'Construction (Design and Management) Regulations 2015',
      'Health and Safety at Work etc. Act 1974',
      'Management of Health and Safety at Work Regulations 1999',
      'Work at Height Regulations 2005',
      'HSE L153, Managing health and safety in construction (the approved guidance to CDM 2015)',
    ],
    delivered: [
      `Specialist health and safety support to the construction industry, to clients, designers and principal contractors, from 2011 as a consultant and trainer with ${orgLabel(CONSULTANCY)}.`,
      `Eighteen months seconded to ${orgLabel(HOUSING_CONTRACTOR)} as health, safety and environmental manager, responsible for between three and nine live construction sites at a time and reporting to its board every month.`,
      'Commercial and housing projects with clients, principal contractors and contractors, from demolition and groundworks through to completion.',
      'Reviewing high-risk risk assessments and safe systems of work, approving subcontractor competence, and leading accident investigations on construction sites.',
      'CITB Site Management Safety Training Scheme (SMSTS), Temporary Works Coordinator training and a CSCS black card as a health and safety manager.',
    ],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out'],
    related: ['temporary-works-and-high-risk-activities', 'contractor-management', 'risk-assessments-and-method-statements'],
    keyTakeaways: [
      'CDM 2015 applies to every construction project, and a principal designer and principal contractor must be appointed in writing whenever more than one contractor will be involved.',
      'A construction phase plan is required on every project before work starts; the health and safety file is required wherever there is more than one contractor.',
      'An F10 notification to the HSE is needed above 30 working days with more than 20 workers at once, or 500 person days.',
    ],
    faqs: [
      {
        question: 'Does a small project still need a principal designer?',
        answer:
          'Yes, if more than one contractor will work on it at any point. The threshold is the number of contractors, not the size or value of the job. A single-contractor project has no principal designer or principal contractor, but the contractor takes on the construction phase plan and the client keeps its own duties.',
      },
      {
        question: 'What is the difference between a principal designer and a CDM adviser?',
        answer:
          'The principal designer is a legal appointment under regulation 5 and must be a designer with control over the pre-construction phase. A CDM adviser is not a defined role; it is a competent person who helps a client, designer or principal designer discharge the duties they hold.',
      },
      {
        question: 'When must a project be notified to the HSE?',
        answer:
          'When the construction work is scheduled to last longer than 30 working days and have more than 20 workers working at the same time at any point, or to exceed 500 person days. The client notifies on form F10 as soon as practicable before the construction phase begins.',
      },
    ],
  },
  {
    slug: 'safety-audits-and-site-inspections',
    title: 'Site inspections and compliance audits',
    seoTitle: 'Site inspections and compliance audits',
    shortTitle: 'Inspections and audits',
    summary:
      'Site and premises inspections with reports and closeout, compliance auditing and gap analysis, for construction, retail and process clients since 2011.',
    what: [
      'An inspection and an audit answer different questions. An inspection asks whether a place of work is safe today: guarding in place, edge protection up, walkways clear, permits live, welfare adequate. An audit asks whether the arrangements that are supposed to keep it safe are working: whether risk assessments are current, whether training matches the work, whether incidents are investigated and whether what management believes is happening on site is what actually happens.',
      'The HSE’s HSG65, Managing for health and safety, sets the framework most UK audits are built on: plan, do, check, act. An audit scored against it tells a board where the management system is strong and where it is running on goodwill. A gap analysis is the same exercise pointed at a target, whether that is statutory compliance, a client’s pre-qualification requirements or a standard the business wants to reach, and it produces the development plan that gets it there.',
      'A useful report is short on generalities and specific about evidence: what was looked at, what was found, the regulation or standard it is measured against, and a prioritised action list with owners and dates, followed through to closeout. Anything else is a certificate of attendance.',
    ],
    regulations: [
      'Health and Safety at Work etc. Act 1974, sections 2 and 3',
      'Management of Health and Safety at Work Regulations 1999, regulations 3 and 5',
      'Construction (Design and Management) Regulations 2015, regulation 24 (inspection of excavations) and Work at Height Regulations 2005, regulation 12 (inspection of scaffolds)',
      'HSE HSG65, Managing for health and safety',
    ],
    delivered: [
      'Site and premises inspections for client businesses since 2011, producing reports and supporting closeout where required.',
      `Inspecting and supporting each site team across three to nine live housing sites during 18 months seconded to ${orgLabel(HOUSING_CONTRACTOR)}.`,
      'Gap analysis and organisational development planning as the first step of each client engagement, as Consultancy Director from 2017 to 2023.',
      'Compliance auditing and policy review as core competencies across construction, retail, fabrication and process operations.',
      'Safety analysis and reporting to clients, and monthly reporting to a contractor’s board.',
    ],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out', 'fabrication-and-process'],
    related: ['competent-person', 'contractor-management', 'cdm-2015'],
    keyTakeaways: [
      'An inspection checks the workplace; an audit checks the management system that is meant to keep it safe. A business needs both.',
      'HSG65’s plan, do, check, act cycle is the benchmark most UK audits are scored against; a gap analysis is the same exercise pointed at a target.',
      'A report is only useful if it names the evidence, the standard and a dated, owned action list, and someone follows it to closeout.',
    ],
    faqs: [
      {
        question: 'How often should a construction site be inspected?',
        answer:
          'There is no fixed legal interval for general site inspections, but the duty to monitor is continuous and specific inspections are prescribed: excavations at the start of every shift, scaffolds every seven days and after adverse weather, and lifting equipment at the intervals set by LOLER. Most principal contractors run a documented weekly inspection alongside daily supervisor checks.',
      },
      {
        question: 'What does a health and safety audit look at?',
        answer:
          'Policy and organisation, risk assessment and control, competence and training, communication and consultation, monitoring and inspection, incident reporting and investigation, and management review. Each is tested against documents, interviews and what is physically found in the workplace.',
      },
      {
        question: 'What is a gap analysis?',
        answer:
          'A structured comparison of a business’s current health and safety arrangements against what it needs: the law, a client’s or scheme’s requirements, or a standard. The output is a list of the gaps, prioritised, with a plan and owners for closing them. It is usually the first step in a new engagement.',
      },
    ],
  },
  {
    slug: 'risk-assessments-and-method-statements',
    title: 'Risk assessments and safe systems of work (RAMS)',
    seoTitle: 'Risk assessments and safe systems of work',
    shortTitle: 'Risk assessments and RAMS',
    summary:
      'Suitable and sufficient risk assessments under regulation 3, safe systems of work and method statements for high-risk work, and COSHH training.',
    what: [
      'Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires every employer and self-employed person to make a suitable and sufficient assessment of the risks to their employees and to anyone else affected by their work, and to record the significant findings where five or more people are employed. The HSE’s five steps still describe the job well: identify the hazards, decide who might be harmed and how, evaluate the risks and decide on precautions, record the findings, and review.',
      'A method statement is not a legal requirement in itself. It is the practical answer to the question a risk assessment raises: given these risks, how exactly will the work be done? On construction projects the principal contractor will expect one for every high-risk activity, and the Construction (Design and Management) Regulations 2015 make the construction phase plan the document that draws them together. Together they are known as RAMS; outside construction the same document is often called a safe system of work.',
      'The common failure is generic paperwork. A risk assessment copied from the last job, listing hazards that are not present and missing the one that is, fails the suitable and sufficient test and gives the site team nothing to work with. A good one is specific to the task, the place and the people, short enough to be read at the point of work, and reviewed when the work changes.',
    ],
    regulations: [
      'Management of Health and Safety at Work Regulations 1999, regulation 3',
      'Construction (Design and Management) Regulations 2015, regulation 12 (construction phase plan)',
      'Work at Height Regulations 2005',
      'Control of Substances Hazardous to Health Regulations 2002',
      'Manual Handling Operations Regulations 1992',
      'HSE INDG163, Risk assessment: a brief guide to controlling risks in the workplace',
    ],
    delivered: [
      'Reviewing high-risk risk assessments and safe systems of work for construction clients and principal contractors since 2011.',
      'Reviewing and managing high-risk activities across three to nine live housing sites during an 18-month secondment as health, safety and environmental manager.',
      'Risk assessment and COSHH courses delivered as Qualsafe-accredited and bespoke training.',
      'Creating and reviewing policies, procedures and safe systems of work for client businesses across construction, retail, fabrication and process operations.',
    ],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out', 'fabrication-and-process'],
    related: ['temporary-works-and-high-risk-activities', 'cdm-2015', 'health-and-safety-training'],
    keyTakeaways: [
      'A risk assessment is a legal requirement for every employer; its significant findings must be recorded where five or more people are employed.',
      'A method statement is not required by law but is the practical control document for high-risk work and is expected by every principal contractor.',
      'Generic, copied RAMS fail the suitable and sufficient test. Task-, place- and people-specific ones are the standard.',
    ],
    faqs: [
      {
        question: 'Do I legally need a method statement?',
        answer:
          'No regulation names a method statement as such. What the law requires is a suitable and sufficient risk assessment and, on construction projects, a construction phase plan. A method statement is the accepted way to show how a high-risk task will be carried out safely, and a principal contractor is entitled to insist on one before work starts.',
      },
      {
        question: 'How long is a risk assessment valid for?',
        answer:
          'Until it is no longer valid. Regulation 3 requires review when there is reason to suspect it is out of date or the work has changed significantly. An annual review is common practice, but a change in equipment, materials, people or the site itself triggers a review straight away.',
      },
      {
        question: 'What makes a risk assessment suitable and sufficient?',
        answer:
          'It identifies the significant hazards of the actual work, considers everyone who could be harmed including the public and contractors, evaluates the remaining risk after existing controls, sets out further controls where needed, and is proportionate to the risk. It does not need to be long; it needs to be true.',
      },
    ],
  },
  {
    slug: 'temporary-works-and-high-risk-activities',
    title: 'Temporary works and high-risk construction activities',
    seoTitle: 'Temporary works and high-risk activities',
    shortTitle: 'Temporary works and high-risk',
    summary:
      'Temporary works coordination and the management of high-risk activities: excavations, groundworks, concrete frames, work at height and demolition.',
    what: [
      'Temporary works are the structures a project needs to build the permanent one and then takes away: excavation support, falsework and formwork, scaffolding, propping, hoardings, crane bases and working platforms. They fail differently from permanent works, because nobody designed the building around them and they are altered, loaded and struck by the people on site. BS 5975 sets the code of practice for temporary works procedures, and the industry has built its control system around it: a designated individual with overall responsibility, a temporary works coordinator on each project, temporary works supervisors, a register of every item, a design brief and design check for each, and a permit to load and a permit to strike.',
      'CDM 2015 adds the legal spine. Regulation 19 requires all practicable steps to prevent a structure becoming unstable during construction; regulation 22 requires excavations to be supported where there is a risk of collapse, and regulation 24 requires them to be inspected at the start of every shift and after any event likely to have affected their strength or stability; regulation 20 governs demolition and dismantling; and the Work at Height Regulations 2005 govern every working platform.',
      'The high-risk activities a site safety adviser reviews and manages are the ones that kill: deep excavations, lifting operations, work at height, demolition, work near live services and the interfaces between them. Each needs a task-specific RAMS, a competent supervisor, a permit where the control depends on sequence, and someone independent who checks that what is on paper is what is on the ground.',
    ],
    regulations: [
      'BS 5975:2019, Code of practice for temporary works procedures and the permissible stress design of falsework',
      'Construction (Design and Management) Regulations 2015, regulations 19 (stability of structures), 20 (demolition or dismantling), 22 (excavations) and 24 (inspection)',
      'Work at Height Regulations 2005',
      'Lifting Operations and Lifting Equipment Regulations 1998',
      'HSE HSG150, Health and safety in construction',
    ],
    delivered: [
      'Temporary Works Coordinator training.',
      'Reviewing and managing high-risk activities across three to nine live housing sites, as seconded health, safety and environmental manager.',
      'Many years of work with groundwork and reinforced-concrete-frame contractors on highways, footings and deep excavation works, from a background in plant operation.',
      'Reviewing high-risk risk assessments and safe systems of work for principal contractors and their subcontractors.',
    ],
    sectors: ['civil-engineering', 'construction'],
    related: ['cdm-2015', 'risk-assessments-and-method-statements', 'contractor-management'],
    keyTakeaways: [
      'BS 5975 is the code of practice for temporary works; its control system runs on a designated individual, a temporary works coordinator, a register, a design check and permits to load and strike.',
      'CDM 2015 regulations 22 and 24 require an excavation at risk of collapse to be supported, and to be inspected at the start of every shift.',
      'Deep excavations, lifting, work at height and demolition are the activities that need task-specific RAMS, a competent supervisor and an independent check on the ground.',
    ],
    faqs: [
      {
        question: 'What does a temporary works coordinator do?',
        answer:
          'Under BS 5975 the temporary works coordinator is appointed by the principal contractor for a project and is responsible for making sure every item of temporary works is identified on the register, has a design brief and a checked design, is built as designed, is inspected before loading and before striking, and is only loaded or struck under a permit. The coordinator does not have to design the works; they have to control them.',
      },
      {
        question: 'How often must an excavation be inspected?',
        answer:
          'Under regulation 24 of CDM 2015, by a competent person at the start of every shift in which work is carried out in it, after any event likely to have affected its strength or stability, and after any accidental fall of rock, earth or other material. A written report is required after the first inspection in each seven-day period and after any event that prompted an inspection.',
      },
      {
        question: 'Does a small excavation need support?',
        answer:
          'The regulation is about risk, not depth. Any excavation where there is a risk of a person being buried or trapped by a fall or dislodgement of material must be prevented from collapsing, by support or by battering back, and the risk in a shallow trench in poor ground can be as real as in a deep one.',
      },
    ],
  },
  {
    slug: 'contractor-management',
    title: 'Contractor and subcontractor management',
    seoTitle: 'Contractor and subcontractor management',
    shortTitle: 'Contractor management',
    summary:
      'Assessing subcontractor competence, supporting subcontractors on live sites, and the pre-qualification, induction and monitoring behind contractor control.',
    what: [
      'Section 3 of the Health and Safety at Work etc. Act 1974 makes every employer responsible for people who are not its employees but are affected by its undertaking, which includes the contractors it brings in. The Management Regulations add the duties to cooperate and coordinate where two employers share a workplace and to give a visiting contractor the information it needs. CDM 2015 puts it more sharply for construction: regulation 8 requires anyone appointing a designer or contractor to check it has the skills, knowledge, experience and organisational capability for the work, and regulation 15 sets out what every contractor must then do.',
      'The HSE’s guidance, Using contractors: a brief guide, sets out the cycle that contractor management follows: plan the work and decide what the contractor needs to know, choose a contractor who is competent for it, brief and induct them, cooperate and coordinate while the work is done, monitor it, and review both the work and the contractor at the end. Pre-qualification through an SSIP scheme such as CHAS, SafeContractor or Constructionline answers the paperwork question; it does not answer whether the gang who turn up on Monday can do the job safely.',
      'On a live site the discipline is continuous. Subcontractor RAMS are reviewed before the work starts and again when the work changes; supervisors are named; permits control the tasks where sequence matters; inspections check what is actually happening; and a subcontractor that cannot meet the standard is supported to reach it or stopped.',
    ],
    regulations: [
      'Health and Safety at Work etc. Act 1974, section 3',
      'Management of Health and Safety at Work Regulations 1999, regulations 11 and 12',
      'Construction (Design and Management) Regulations 2015, regulations 8 and 15',
      'HSE INDG368, Using contractors: a brief guide',
      'Safety Schemes in Procurement (SSIP) and the Common Assessment Standard',
    ],
    delivered: [
      'Approving subcontractor competence for construction clients and principal contractors since 2011.',
      `Assessing and supporting subcontractors across three to nine live housing sites during 18 months seconded to ${orgLabel(HOUSING_CONTRACTOR)}.`,
      'Contractor management as a core competency across construction, retail fit-out, fabrication and process clients.',
      'Reviewing subcontractor risk assessments and safe systems of work before high-risk work starts.',
    ],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out', 'fabrication-and-process'],
    related: ['cdm-2015', 'safety-audits-and-site-inspections', 'temporary-works-and-high-risk-activities'],
    keyTakeaways: [
      'An employer is responsible for the safety of the contractors it brings in, under section 3 of the 1974 Act and, in construction, CDM 2015 regulations 8 and 15.',
      'Pre-qualification through SSIP answers the paperwork question; competence is proven by RAMS review, induction, supervision and monitoring on the day.',
      'The HSE cycle is plan, choose, brief, cooperate and coordinate, monitor, review.',
    ],
    faqs: [
      {
        question: 'What should be checked before appointing a subcontractor?',
        answer:
          'Under CDM 2015 regulation 8, that the organisation has the skills, knowledge, experience and organisational capability for the specific work: relevant qualifications and cards, a history of similar work, insurance, a health and safety policy where five or more are employed, sample RAMS for the task, and how it will supervise its people on site. SSIP membership covers much of the documentary check.',
      },
      {
        question: 'Who is responsible if a subcontractor’s worker is injured?',
        answer:
          'Potentially everyone in the chain. The subcontractor as employer, the principal contractor for the management of the site, and the client for its CDM duties can each be prosecuted for their own failures. Responsibility is not transferred by a contract; it is discharged by each party doing what the regulations require of it.',
      },
      {
        question: 'Is an SSIP certificate enough to prove competence?',
        answer:
          'No. It proves the contractor’s documented arrangements met the Common Assessment Standard at the date of assessment. Competence for a particular job is shown by task-specific RAMS, the qualifications of the people actually attending, and what an inspection finds once they start.',
      },
    ],
  },
  {
    slug: 'accident-investigation',
    title: 'Accident and incident investigation',
    seoTitle: 'Accident and incident investigation',
    shortTitle: 'Accident investigation',
    summary:
      'Investigations led and managed through to closeout, RIDDOR reporting, and the evidence a business needs when the regulator or an insurer asks.',
    what: [
      'The point of an investigation is to stop the next one. The HSE’s HSG245, Investigating accidents and incidents, sets out the approach used across UK industry: gather the information, analyse it, identify the risk-control measures that failed or were missing, and produce an action plan. Done properly it separates the immediate cause (the unguarded blade, the missing edge protection) from the underlying causes (the pressure, the training gap, the assessment that was never reviewed) and the root cause in how the work was managed.',
      'Alongside the investigation sit the legal duties. The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 require the responsible person to report work-related deaths, specified injuries, injuries that keep a worker off normal duties for more than seven days, certain occupational diseases and listed dangerous occurrences to the HSE. Deaths and specified injuries are reported without delay; over-seven-day injuries within fifteen days. Injuries causing more than three days’ incapacity must be recorded even where they are not reportable.',
      'An investigation also has to stand up later. Photographs taken before anything is moved, witness statements taken while memories are fresh, documents secured, and a report that distinguishes fact from inference are what an insurer, a solicitor or an HSE inspector will ask for, sometimes years afterwards.',
    ],
    regulations: [
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013',
      'Social Security (Claims and Payments) Regulations 1979, regulation 25 (the accident book)',
      'Management of Health and Safety at Work Regulations 1999, regulation 3(3) (review of assessment)',
      'HSE HSG245, Investigating accidents and incidents',
    ],
    delivered: [
      'Leading accident investigations for construction clients and principal contractors since 2011.',
      'Managing incident investigations through to closeout for the client base as Consultancy Director, 2017 to 2023.',
      'Conducting incident investigations across three to nine live housing sites during an 18-month secondment as health, safety and environmental manager.',
      'Incident investigation as a core competency across construction, retail, fabrication and process operations.',
    ],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out', 'fabrication-and-process'],
    related: ['risk-assessments-and-method-statements', 'safety-audits-and-site-inspections', 'contractor-management'],
    keyTakeaways: [
      'HSG245 sets the UK approach: gather, analyse, identify the control measures that failed, and act.',
      'RIDDOR 2013 requires deaths and specified injuries to be reported to the HSE without delay, and over-seven-day injuries within fifteen days.',
      'An investigation that stops at the immediate cause changes nothing; the underlying and root causes are where the next incident is prevented.',
    ],
    faqs: [
      {
        question: 'Which injuries have to be reported under RIDDOR?',
        answer:
          'Work-related deaths, the specified injuries listed in regulation 4 (such as fractures other than to fingers, thumbs and toes, amputations, loss of sight and serious burns), injuries that keep a worker away from their normal work for more than seven consecutive days, listed occupational diseases, dangerous occurrences, and injuries to members of the public who are taken directly to hospital for treatment.',
      },
      {
        question: 'What is the difference between an immediate cause and a root cause?',
        answer:
          'The immediate cause is the event or condition that directly produced the injury, such as a fall from an unprotected edge. The root cause is the management failure that allowed that condition to exist, such as a site set-up that never planned the edge protection or a supervisor with no time to check it. Fixing the immediate cause prevents that accident; fixing the root cause prevents the family of accidents it belongs to.',
      },
      {
        question: 'Should a near miss be investigated?',
        answer:
          'Yes, in proportion to what it could have caused. A near miss is free information about a control that failed without anyone being hurt. Businesses that investigate and act on them consistently see fewer injuries; those that record them and stop there see the same event again with a different ending.',
      },
    ],
  },
  {
    slug: 'health-and-safety-training',
    title: 'Health and safety training: CITB, IOSH and NEBOSH courses',
    seoTitle: 'Health and safety training: CITB, IOSH, NEBOSH',
    shortTitle: 'Training and courses',
    summary:
      'CITB, IOSH and NEBOSH courses delivered, from the Directors’ Role and SMSTS to Managing Safely and the NEBOSH Certificates, plus bespoke training.',
    what: [
      'Section 2 of the Health and Safety at Work etc. Act 1974 requires every employer to provide the information, instruction, training and supervision necessary to keep its employees safe, and regulation 13 of the Management Regulations requires training on recruitment, on exposure to new or increased risks, and periodically thereafter. Training is therefore not a benefit; it is the way an employer shows the competence it is relying on actually exists.',
      'In construction the ladder is well established: the one-day CITB Health and Safety Awareness course for everyone, the two-day Site Supervisors’ Safety Training Scheme for supervisors and gangers, the five-day Site Management Safety Training Scheme for site managers, and the Directors’ Role for Health and Safety for the people who carry the accountability. IOSH Working Safely, Managing Safely and Leading Safely serve the same three levels in every other sector, and the NEBOSH General and Construction Certificates are the recognised entry qualifications for anyone whose job is health and safety itself.',
      'The training that changes behaviour is the training that is specific and well taught: a trainer who has run sites and investigated incidents brings the course to the room in a way a slide deck cannot. Records matter too: a training matrix that shows who is competent for what, and when it expires, is one of the first things an inspector or an auditor asks to see.',
    ],
    regulations: [
      'Health and Safety at Work etc. Act 1974, section 2(2)(c)',
      'Management of Health and Safety at Work Regulations 1999, regulation 13',
      'Construction (Design and Management) Regulations 2015, regulation 15 (contractor duties: information, instruction and training)',
      'CITB Site Safety Plus scheme; IOSH Leading, Managing and Working Safely; NEBOSH National General and Construction Certificates',
    ],
    delivered: [
      'CITB courses delivered: Directors’ Role for Health and Safety, Site Management Safety Training Scheme (SMSTS), Site Supervisors’ Safety Training Scheme (SSSTS) and Health and Safety Awareness.',
      'IOSH courses delivered: Leading Safely, Managing Safely and Working Safely.',
      'NEBOSH courses delivered: the General Certificate and the Construction Certificate.',
      'Qualsafe-accredited and bespoke training delivered in risk assessment, COSHH, fire safety and a wide range of other health and safety subjects.',
      'A PTLLS teaching qualification; identifying training needs for client businesses since 2011; three years as IOSH South East Lead Mentor.',
    ],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out', 'fabrication-and-process'],
    related: ['competent-person', 'risk-assessments-and-method-statements', 'cdm-2015'],
    keyTakeaways: [
      'Training is a legal duty under section 2 of the 1974 Act and regulation 13 of the Management Regulations, on recruitment, on new risks and periodically.',
      'CITB Site Safety Plus (Awareness, SSSTS, SMSTS, Directors’ Role) is the construction ladder; IOSH Working, Managing and Leading Safely serve the same levels elsewhere.',
      'A maintained training matrix proves competence when it is questioned.',
    ],
    faqs: [
      {
        question: 'What is the difference between SSSTS and SMSTS?',
        answer:
          'Both are CITB Site Safety Plus courses. The Site Supervisors’ Safety Training Scheme is a two-day course for supervisors and gangers; the Site Management Safety Training Scheme is a five-day course for site managers, agents and those with overall responsibility for a site. Both are refreshed every five years.',
      },
      {
        question: 'What does the CITB Directors’ Role for Health and Safety course cover?',
        answer:
          'A one-day course for directors and senior managers on the legal accountability they carry personally under section 37 of the Health and Safety at Work etc. Act 1974, the leadership framework in the HSE and Institute of Directors guidance, and what an effective board does to plan, deliver, monitor and review health and safety.',
      },
      {
        question: 'Which IOSH course is right for a manager?',
        answer:
          'IOSH Managing Safely, for anyone who manages people or activities and needs to understand risk assessment, control, incidents and their own responsibilities. Working Safely is the one-day course for everyone else; Leading Safely is the short course for directors and senior leaders.',
      },
    ],
  },
  {
    slug: 'competent-person',
    title: 'Competent person, policy and safety leadership',
    seoTitle: 'Competent person, policy and safety leadership',
    shortTitle: 'Competent person and policy',
    summary:
      'Working with directors and senior management on statutory compliance, policies and procedures, and the strategic guidance of director and safety meetings.',
    what: [
      'Regulation 7 of the Management of Health and Safety at Work Regulations 1999 requires every employer to appoint one or more competent persons to help it comply with its health and safety duties. The regulations prefer that person to be an employee, but where no one in the business has the training, knowledge and experience, an external adviser fills the role. The appointment does not transfer the employer’s duties; it gives the employer the competence to meet them.',
      'Section 2(3) of the Health and Safety at Work etc. Act 1974 requires every employer with five or more employees to have a written health and safety policy: a statement of intent signed at the top, the organisation that delivers it, and the arrangements that make it real. The arrangements section is the one that matters and the one most often copied from a template that describes a different business. Behind it sit the procedures, the legal register, the risk assessment library, the training records, the incident log and the contractor controls.',
      'Leadership is the part the law now reaches directly. Section 37 of the 1974 Act makes a director personally liable where an offence was committed with their consent or connivance or through their neglect, and the HSE and Institute of Directors guidance, Leading health and safety at work, describes what a board is expected to do: plan, deliver, monitor and review. The adviser who sits in the director meeting, chairs the safety meeting and brings the improvement plan is doing the work that turns a policy into a culture.',
    ],
    regulations: [
      'Management of Health and Safety at Work Regulations 1999, regulation 7',
      'Health and Safety at Work etc. Act 1974, sections 2(3) and 37',
      'HSE and Institute of Directors INDG417, Leading health and safety at work',
      'HSE INDG259, An introduction to health and safety',
    ],
    delivered: [
      'Working directly with client senior management and directors to ensure compliance with statutory health and safety requirements, since 2011.',
      'Creating and reviewing health and safety policies and procedures for client businesses.',
      'Participating in and chairing director and safety meetings, providing strategic safety guidance and improvement initiatives.',
      'Leading initial client meetings, gap analysis and organisational development planning, and acting as the direct point of contact for the client base, as Consultancy Director from 2017 to 2023.',
      'Leadership development, mentoring and the CITB Directors’ Role for Health and Safety course as part of the record.',
    ],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out', 'fabrication-and-process'],
    related: ['safety-audits-and-site-inspections', 'health-and-safety-training', 'accident-investigation'],
    keyTakeaways: [
      'Every employer must appoint a competent person under regulation 7; an external adviser fills the role where no one in-house has the competence.',
      'A written health and safety policy is required at five or more employees, and its arrangements section must describe the business it belongs to.',
      'Section 37 makes directors personally liable for offences committed through their consent, connivance or neglect; the HSE and IoD guidance sets out what a board must do.',
    ],
    faqs: [
      {
        question: 'Does a small business need a health and safety adviser?',
        answer:
          'Every employer needs access to competent health and safety assistance under regulation 7. A small business whose owner or manager has the relevant training and experience can be its own competent person; one that does not needs someone who does, whether an employee or an external adviser.',
      },
      {
        question: 'What must a health and safety policy contain?',
        answer:
          'Three parts: a general statement of intent signed by the most senior person, the organisation setting out who is responsible for what, and the arrangements describing how each significant risk is managed in practice. It must be reviewed when the business changes and brought to the attention of employees.',
      },
      {
        question: 'Can a director be prosecuted personally?',
        answer:
          'Yes. Section 37 of the Health and Safety at Work etc. Act 1974 allows a director, manager, secretary or similar officer to be prosecuted alongside the company where the company’s offence was committed with their consent or connivance, or was attributable to their neglect. Disqualification from acting as a director is also available to the court.',
      },
    ],
  },
];

export function getDiscipline(slug: string): Discipline | undefined {
  return DISCIPLINES.find((d) => d.slug === slug);
}
