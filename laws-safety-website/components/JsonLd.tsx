import { ldJson } from '@/lib/schema';

/**
 * Server-rendered JSON-LD block. Rendered into the page HTML (not via
 * next/script) so crawlers that do not execute JavaScript still see it.
 */
export default function JsonLd({ data, id }: { data: unknown; id?: string }) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(data) }} />;
}
