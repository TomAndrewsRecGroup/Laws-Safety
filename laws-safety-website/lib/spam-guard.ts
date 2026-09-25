/**
 * Spam Guard
 *
 * Layered, low-false-positive spam detection for public forms. Each layer is
 * independent; any single positive marks the submission as spam.
 *
 *   1. Honeypot       , a hidden field genuine users never fill.
 *   2. Time-to-submit , humans take seconds; bots post instantly (or replay
 *                        a stale token).
 *   3. Origin/Referer , the request must originate from our own site.
 *   4. Gibberish      , random-letter names/companies (the observed abuse):
 *                        no-vowel words, extreme consonant runs, very low
 *                        vowel ratios.
 *
 * `kind` distinguishes structural bot signals (honeypot / timing / origin , 
 * safe to drop silently) from content signals (gibberish, worth telling a
 * human so they can correct a genuine mistake).
 */

// 'y' counts as a vowel so real names like "Krzysztof" / "Rhys" are not flagged.
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

// Keyboard rows, a 5+ char run along a row (either direction) is keyboard mash
// (e.g. "qwertyuiop", "asdfghjkl") that the vowel heuristics can miss.
const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function hasKeyboardRun(t: string): boolean {
  for (const row of KEYBOARD_ROWS) {
    const rev = row.split('').reverse().join('');
    for (let i = 0; i + 5 <= t.length; i++) {
      const seg = t.slice(i, i + 5);
      if (row.includes(seg) || rev.includes(seg)) return true;
    }
  }
  return false;
}

const MIN_SUBMIT_MS = 2500;               // faster than this = bot
const MAX_FORM_AGE_MS = 6 * 60 * 60 * 1000; // 6h, stale/replayed token

export interface SpamResult {
  spam: boolean;
  /** 'structural' = drop silently; 'content' = surface to the user. */
  kind?: 'structural' | 'content';
  reason?: string;
}

const NOT_SPAM: SpamResult = { spam: false };

/**
 * Does a single word look like keyboard-mash / random letters?
 * Only judges words of 5+ letters so short acronyms (SIG, RMD, BAM) are safe.
 */
export function isGibberishWord(word: string): boolean {
  const t = word.toLowerCase().replace(/[^a-z]/g, '');
  if (t.length < 5) return false;

  if (hasKeyboardRun(t)) return true;

  let vowels = 0;
  let maxConsonantRun = 0;
  let run = 0;
  for (const ch of t) {
    if (VOWELS.has(ch)) {
      vowels++;
      run = 0;
    } else {
      run++;
      if (run > maxConsonantRun) maxConsonantRun = run;
    }
  }

  if (vowels === 0) return true;              // e.g. "xkqjwptz"
  if (maxConsonantRun >= 6) return true;      // e.g. "hjklmnpq"
  if (vowels / t.length < 0.15) return true;  // extreme consonant dominance
  return false;
}

/** Does a free-text value (may contain multiple words) look like gibberish? */
export function looksGibberish(value: string): boolean {
  if (!value) return false;
  const letters = value.toLowerCase().replace(/[^a-z]/g, '');
  // A 5+ letter value with no vowel at all across the whole string.
  if (letters.length >= 5 && !/[aeiouy]/.test(letters)) return true;
  return value.split(/\s+/).filter(Boolean).some(isGibberishWord);
}

function hostFromUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export interface SpamCheckInput {
  /** Hidden honeypot field value, should always be empty. */
  honeypot?: unknown;
  /** Client timestamp (ms) captured when the form was rendered. */
  renderedAt?: unknown;
  /** Free-text fields to scan for gibberish (name, company, role, …). */
  textFields?: Array<string | undefined | null>;
  origin?: string | null;
  referer?: string | null;
  /** Bare hostnames (no scheme) that are allowed to submit. */
  allowedHosts: string[];
  /**
   * Require the request to prove it came from our own form, a valid same-origin
   * Origin/Referer header OR a valid timing token. Blocks scripts that POST
   * directly to the endpoint with neither. Enable for self-owned form routes.
   */
  requireProof?: boolean;
  /** Injectable clock for testing. */
  now?: number;
}

export function evaluateSpam(input: SpamCheckInput): SpamResult {
  // 1. Honeypot, any non-empty value is a bot.
  if (typeof input.honeypot === 'string' && input.honeypot.trim() !== '') {
    return { spam: true, kind: 'structural', reason: 'honeypot' };
  }

  // 2. Timing, a supplied timestamp must be well-formed and within the window.
  const now = input.now ?? Date.now();
  const hasTimestamp = input.renderedAt !== undefined && input.renderedAt !== null && input.renderedAt !== '';
  const renderedAt = Number(input.renderedAt);
  let timingProof = false;
  if (hasTimestamp) {
    if (!Number.isFinite(renderedAt)) {
      return { spam: true, kind: 'structural', reason: 'bad-timestamp' };
    }
    const elapsed = now - renderedAt;
    if (elapsed < MIN_SUBMIT_MS || elapsed > MAX_FORM_AGE_MS) {
      return { spam: true, kind: 'structural', reason: 'timing' };
    }
    timingProof = true;
  }

  // 3. Origin, when present, must match an allowed host. Referer is a fallback.
  const origin = hostFromUrl(input.origin) ?? hostFromUrl(input.referer);
  if (origin && !input.allowedHosts.includes(origin)) {
    return { spam: true, kind: 'structural', reason: 'origin' };
  }
  const originProof = origin !== null && input.allowedHosts.includes(origin);

  // 3b. Proof of origin, a real browser form sends a same-origin header and a
  //     timing token. A direct API script sends neither; reject it.
  if (input.requireProof && !originProof && !timingProof) {
    return { spam: true, kind: 'structural', reason: 'no-proof' };
  }

  // 4. Gibberish content.
  for (const field of input.textFields ?? []) {
    if (field && looksGibberish(field)) {
      return { spam: true, kind: 'content', reason: 'gibberish' };
    }
  }

  return NOT_SPAM;
}
