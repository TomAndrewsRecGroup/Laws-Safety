import type { Testimonial } from './types';

/**
 * Quotes about Stephen, each given with the author's permission for use here.
 *
 * Attribution is by role and sector unless the person has agreed to be named.
 * Nothing from a former employer's clients or marketing is used. While this
 * list is empty the /testimonials page is noindexed, left out of the sitemap
 * and unlinked, so the site never publishes a thin or placeholder page.
 */
export const TESTIMONIALS: Testimonial[] = [];

export const hasTestimonials = TESTIMONIALS.length > 0;
