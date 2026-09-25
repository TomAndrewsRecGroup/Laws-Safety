import { BASE_URL, PERSON_NAME, SITE_NAME, CONTACT } from '@/lib/site';
import { insightsByDate, paths } from '@/lib/content';

/**
 * /rss.xml: the guides, newest first, with <link rel="alternate"> discovery
 * from the root layout. Static at build; rebuilt on every deploy.
 */
export const dynamic = 'force-static';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  const items = insightsByDate()
    .map((i) => {
      const url = `${BASE_URL}${paths.insight(i.slug)}`;
      return `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${i.datePublished}T09:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(PERSON_NAME)}</dc:creator>
      <category>${escapeXml(i.category)}</category>
      <description>${escapeXml(i.description)}</description>
    </item>`;
    })
    .join('\n');

  const lastBuild = insightsByDate()[0]?.dateModified ?? '2026-09-25';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}, guides by ${escapeXml(PERSON_NAME)}</title>
    <link>${BASE_URL}${paths.insights}</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Health and safety guides from ${escapeXml(PERSON_NAME)}: CDM 2015, fire risk assessment, RAMS, the directors’ role, investigation and policy.</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date(`${lastBuild}T09:00:00Z`).toUTCString()}</lastBuildDate>
    <managingEditor>${escapeXml(CONTACT.email)} (${escapeXml(PERSON_NAME)})</managingEditor>
    <image>
      <url>${BASE_URL}/favicon.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${BASE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  });
}
