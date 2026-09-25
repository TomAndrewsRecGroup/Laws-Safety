/**
 * Page title and meta description budgets.
 *
 * Google truncates the SERP title at roughly 600px, about 60-65 characters.
 * The root layout appends BRAND_SUFFIX to every page title through the
 * Next.js title template, so a page's own title has TITLE_BODY_MAX characters
 * before the whole thing is cut off.
 *
 * The rule this encodes: the words that identify the page (the discipline,
 * the sector, the town) come first and survive truncation; the brand can fall
 * off the end.
 */

/** Appended by the title template in app/layout.tsx. */
export const BRAND_SUFFIX = ' | Laws Safety';

/** Total characters before Google starts truncating. */
export const TITLE_MAX = 60;

/** What a page's own title may use, once the brand suffix is accounted for. */
export const TITLE_BODY_MAX = TITLE_MAX - BRAND_SUFFIX.length; // 46

/**
 * Trim a title to the budget on a word boundary, so a clamped title still
 * reads as words rather than a severed one.
 */
export function clampTitle(text: string, max: number = TITLE_BODY_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;

  return trimmed.replace(/[\s,:|&/–-]+$/, '').replace(/\s+(and|or|&|for|in|of|the)$/i, '');
}

/**
 * Meta description budget. Google renders roughly 155-160 characters before
 * truncating. Templates aim to come in under this naturally, because a
 * description that finishes its thought reads better than one cut mid-clause;
 * `clampDescription` is the backstop.
 */
export const DESCRIPTION_MAX = 155;

/** Trim a description to the budget on a sentence or word boundary. */
export function clampDescription(text: string, max: number = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const sentenceEnd = clean.slice(0, max + 1).lastIndexOf('. ');
  if (sentenceEnd > max * 0.6) return clean.slice(0, sentenceEnd + 1);

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return trimmed.replace(/[\s,;:|&/–-]+$/, '') + '…';
}
