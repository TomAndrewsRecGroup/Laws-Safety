/**
 * Case helpers for titles dropped into running copy. Acronyms (CDM, RAMS,
 * CSCS) keep their capitals; everything else takes sentence case.
 */

const ACRONYM = /^[A-Z0-9][A-Z0-9-]*$/;

function isAcronym(word: string): boolean {
  return ACRONYM.test(word) && /[A-Z]{2,}/.test(word);
}

/** "Inspections and audits" → "inspections and audits"; "CDM 2015 and construction" is left alone. */
export function lowerFirst(t: string): string {
  const first = t.split(/\s+/)[0] ?? '';
  if (isAcronym(first)) return t;
  return t.charAt(0).toLowerCase() + t.slice(1);
}

/** "Risk assessments and RAMS" → "risk assessments and RAMS". */
export function lowerWords(t: string): string {
  return t
    .split(' ')
    .map((w) => (isAcronym(w) ? w : w.toLowerCase()))
    .join(' ');
}
