/**
 * Branded Open Graph image helpers. Builds absolute URLs for the site-wide
 * dynamic card generator (app/api/og/route.tsx) so every page can ship an
 * on-brand social and AI-engine preview with one call.
 */

import { BASE_URL } from './site';

export interface OgImageOptions {
  title: string;
  eyebrow?: string;
  tag?: string;
  subtitle?: string;
}

/** Absolute URL to a branded OG card for the given page. */
export function ogImageUrl(opts: OgImageOptions): string {
  const params = new URLSearchParams();
  params.set('title', opts.title);
  if (opts.eyebrow) params.set('eyebrow', opts.eyebrow);
  if (opts.tag) params.set('tag', opts.tag);
  if (opts.subtitle) params.set('subtitle', opts.subtitle);
  return `${BASE_URL}/api/og?${params.toString()}`;
}

/**
 * A ready-to-spread `openGraph.images` array (Next.js Metadata) for a branded
 * card. Also valid for `twitter.images`.
 *
 * Next.js replaces a page's `openGraph` object wholesale rather than merging
 * it with the root layout's, so every page that sets `openGraph` must pass
 * this or it ships with no card at all.
 */
export function ogImageMeta(opts: OgImageOptions) {
  return [
    {
      url: ogImageUrl(opts),
      width: 1200,
      height: 630,
      alt: `${opts.title}, Stephen Laws, Laws Safety`,
    },
  ];
}
