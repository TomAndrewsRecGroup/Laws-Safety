/**
 * The legal entity behind the site, as filed at Companies House
 * (checked 25 September 2026), and the facts the legal page needs.
 */
export const LEGAL = {
  /** The registered company name. */
  entity: 'Laws Safety Limited',
  /** Companies House number. */
  companyNumber: '17413846',
  /** Where the company is registered. */
  registeredIn: 'England and Wales',
  /**
   * The registered office, exactly as it appears on the register. It is a
   * different unit from the office address on the contact page (lib/site.ts);
   * both are printed as supplied.
   */
  registeredOffice: 'Unit 8 Nepicar Park, London Road, Wrotham, Kent TN15 7AF',
  /** ICO registration reference, or null if not registered (most small companies processing contact-form data do register). */
  icoReference: null as string | null,
  /** Date the notices were last reviewed. */
  reviewed: '2026-09-25',
};

/** "Laws Safety Limited (company number 17413846, registered in England and Wales)". */
export const LEGAL_ENTITY_LINE = `${LEGAL.entity} (company number ${LEGAL.companyNumber}, registered in ${LEGAL.registeredIn})`;
