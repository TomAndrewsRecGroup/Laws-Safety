import { MetadataRoute } from 'next';
import { BASE_URL, STATIC_DATE, getAllStaticUrls } from '@/lib/site-urls';

/**
 * Every URL comes from the single registry in lib/site-urls.ts, which is
 * itself derived from the content model. Pages that carry their own
 * modification date (the guides) use it; the rest use a stable date so the
 * sitemap does not claim a change that never happened.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllStaticUrls().map((u) => ({
    url: `${BASE_URL}${u.path}`,
    lastModified: u.lastModified ? new Date(u.lastModified) : STATIC_DATE,
    changeFrequency: u.changeFrequency,
    priority: u.priority,
  }));
}
