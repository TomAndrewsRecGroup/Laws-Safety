import type { Metadata } from 'next';
import { ogImageMeta, type OgImageOptions } from './og';
import { clampDescription, clampTitle } from './seo-title';
import { absoluteUrl } from './site-urls';
import { SITE_NAME } from './site';

/**
 * Build a page's Metadata the same way every time: a title inside the SERP
 * budget, a description inside its budget, a self-referential canonical, and
 * a branded Open Graph card. Next.js replaces `openGraph` wholesale rather
 * than merging it with the root layout's, so the images always go in here.
 */
export function pageMeta(o: { title: string; description: string; path: string; og?: Partial<OgImageOptions>; type?: 'website' | 'article' | 'profile'; noindex?: boolean; absoluteTitle?: boolean }): Metadata {
  const title = clampTitle(o.title);
  const description = clampDescription(o.description);
  const url = absoluteUrl(o.path);
  const images = ogImageMeta({ title: o.og?.title ?? o.title, eyebrow: o.og?.eyebrow, tag: o.og?.tag, subtitle: o.og?.subtitle ?? description });
  return {
    title: o.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: o.type ?? 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: 'en_GB',
      images,
    },
    twitter: { card: 'summary_large_image', title, description, images },
    ...(o.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
