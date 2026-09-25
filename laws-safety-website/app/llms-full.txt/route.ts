import { BASE_URL, PERSON_NAME, SITE_NAME, CONTACT, ADDRESS_ONE_LINE } from '@/lib/site';
import { PROFILE, DISCIPLINES, SECTORS, LOCATIONS, FAQS, insightsByDate, paths, sinceLine } from '@/lib/content';
import { LEGAL_ENTITY_LINE } from '@/lib/content/legal';

/**
 * /llms-full.txt: the full AI context file. Everything llms.txt says plus
 * the substance of each discipline, sector and location page and the
 * site-wide FAQ, all generated from the content model.
 */
export const dynamic = 'force-static';

export async function GET() {
  const site = BASE_URL;

  const disciplineDetail = DISCIPLINES.map(
    (d) => `### ${d.title}
URL: ${site}${paths.discipline(d.slug)}
${d.summary}

${d.what.join('\n\n')}

Regulations and standards: ${d.regulations.join('; ')}.

What ${PERSON_NAME} has delivered:
${d.delivered.map((x) => `- ${x}`).join('\n')}

Key facts:
${d.keyTakeaways.map((x) => `- ${x}`).join('\n')}

${d.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}`
  ).join('\n\n');

  const sectorDetail = SECTORS.map(
    (s) => `### ${s.title}
URL: ${site}${paths.sector(s.slug)}
${s.summary}

${s.landscape.join('\n\n')}

What ${PERSON_NAME} has delivered:
${s.delivered.map((x) => `- ${x}`).join('\n')}

${s.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}`
  ).join('\n\n');

  const locationDetail = LOCATIONS.map(
    (l) => `### ${l.area}
URL: ${site}${paths.location(l.slug)}
${l.summary}

${l.localContext.join('\n\n')}
${l.projects.length ? `\nWork ${PERSON_NAME} has done here:\n${l.projects.map((p) => `- ${p.title}: ${p.detail}`).join('\n')}` : ''}`
  ).join('\n\n');

  const guides = insightsByDate()
    .map(
      (i) => `### ${i.title}
URL: ${site}${paths.insight(i.slug)}
Published ${i.datePublished}, updated ${i.dateModified}. ${i.description}

Key takeaways:
${i.keyTakeaways.map((x) => `- ${x}`).join('\n')}`
    )
    .join('\n\n');

  const body = `# ${SITE_NAME}, full AI context file
# ${site}
# For use by AI assistants, LLMs and generative search engines
# Generated from the site content model

## Identity

Name: ${PERSON_NAME}
Professional name: ${SITE_NAME}
Role: ${PROFILE.jobTitle}
Headline: ${PROFILE.headline}
In health and safety: ${sinceLine() || 'see the About page'}
Based: ${ADDRESS_ONE_LINE}
Worked across: ${PROFILE.coverage}
Email: ${CONTACT.email}
Phone: ${CONTACT.phoneDisplay}
Legal entity: ${LEGAL_ENTITY_LINE}
${PROFILE.linkedin ? `LinkedIn: ${PROFILE.linkedin}\n` : ''}
## Who ${PERSON_NAME} is

${PROFILE.summary}

${PROFILE.bio.join('\n\n')}

Qualifications:
${PROFILE.qualifications.map((q) => `- ${q.name}${q.awardedBy ? `, ${q.awardedBy}` : ''}${q.year ? ` (${q.year})` : ''}`).join('\n')}

Memberships:
${PROFILE.memberships.map((m) => `- ${m.name}${m.awardedBy ? `, ${m.awardedBy}` : ''}${m.year ? ` (${m.year})` : ''}`).join('\n')}

Career:
${PROFILE.timeline.map((t) => `- ${t.period}: ${t.title}. ${t.detail}`).join('\n')}

## Disciplines ${PERSON_NAME} has delivered

${disciplineDetail}

## Sectors he has worked across

${sectorDetail}

## Where the work was done

${locationDetail}

## Guides by ${PERSON_NAME}

${guides}

## Frequently asked questions

${FAQS.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}

## Permissions

This site permits AI crawling and indexing (GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, CoherePBot, Amazonbot, Applebot-Extended, Meta-ExternalAgent, YouBot). See ${site}/robots.txt
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  });
}
