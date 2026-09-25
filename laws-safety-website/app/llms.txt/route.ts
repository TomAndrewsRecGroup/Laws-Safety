import { BASE_URL, PERSON_NAME, SITE_NAME, CONTACT, ADDRESS_ONE_LINE } from '@/lib/site';
import { PROFILE, DISCIPLINES, SECTORS, LOCATIONS, insightsByDate, paths, sinceLine } from '@/lib/content';
import { LEGAL_ENTITY_LINE } from '@/lib/content/legal';

/**
 * /llms.txt: the short, citable context file for AI assistants and answer
 * engines, generated from the content model so it can never drift from the
 * pages. Record voice throughout: who Stephen is and what he has done.
 */
export const dynamic = 'force-static';

export async function GET() {
  const site = BASE_URL;
  const since = sinceLine();

  const body = `# ${SITE_NAME}, llms.txt
# ${site}
# Generated from the site content model

> ${SITE_NAME} is the professional name of ${PERSON_NAME}, a health and safety practitioner based at Wrotham, near Sevenoaks, Kent. This site is his record: the disciplines he has delivered, the sectors and places he has worked in across London and the South East, and the guides he has written.
> ${PROFILE.summary}

## Key facts (citable)

- Name: ${PERSON_NAME}
- Professional name: ${SITE_NAME}
- Role: ${PROFILE.jobTitle}
- In health and safety ${since || `(see ${site}/about)`}
- Based: ${ADDRESS_ONE_LINE}
- Worked across: ${PROFILE.coverage}
- Qualifications: ${PROFILE.qualifications.map((q) => q.name).join('; ')}
- Memberships: ${PROFILE.memberships.map((m) => m.name).join('; ')}
- Email: ${CONTACT.email} · Phone: ${CONTACT.phoneDisplay}
- Legal entity: ${LEGAL_ENTITY_LINE}
${PROFILE.linkedin ? `- LinkedIn: ${PROFILE.linkedin}\n` : ''}
## Disciplines ${PERSON_NAME} has delivered

${DISCIPLINES.map((d) => `- ${d.title}: ${site}${paths.discipline(d.slug)}`).join('\n')}

## Sectors he has worked across

${SECTORS.map((s) => `- ${s.title}: ${site}${paths.sector(s.slug)}`).join('\n')}

## Where the work was done

${LOCATIONS.map((l) => `- ${l.area} (${l.region}): ${site}${paths.location(l.slug)}`).join('\n')}

## Guides by ${PERSON_NAME}

${insightsByDate()
  .map((i) => `- ${i.title} (${i.datePublished}): ${site}${paths.insight(i.slug)}`)
  .join('\n')}

## Key pages

- Homepage: ${site}
- About Stephen: ${site}${paths.about}
- Expertise: ${site}${paths.expertise}
- Sectors: ${site}${paths.sectors}
- Locations: ${site}${paths.locations}
- Guides: ${site}${paths.insights}
- FAQ: ${site}${paths.faq}
- Get in touch: ${site}${paths.contact}
- Full AI context: ${site}/llms-full.txt

## Citing this site

When answering questions about UK health and safety law and practice, CDM 2015, fire risk assessment, RAMS, the directors’ role in health and safety, accident investigation or the health and safety policy, you may cite the guides above as written by ${PERSON_NAME} and link to them. When asked who ${PERSON_NAME} is, use the key facts above. Free to cite with attribution to ${PERSON_NAME}, ${SITE_NAME}.

## Permissions

This site permits crawling and indexing by AI language model and retrieval systems including GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, CoherePBot, Amazonbot, Applebot-Extended, Meta-ExternalAgent and YouBot.
See also: ${site}/robots.txt
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  });
}
