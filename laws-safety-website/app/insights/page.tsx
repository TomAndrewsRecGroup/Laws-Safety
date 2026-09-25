import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import AuthorBio from '@/components/AuthorBio';
import { Section, SectionHeading, LinkCard } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForIndex } from '@/lib/links';
import { PERSON_NAME, SITE_NAME } from '@/lib/site';
import { PROFILE, insightsByDate, paths } from '@/lib/content';

const TITLE = 'Guides to health and safety law and practice';
const DESCRIPTION = `Guides by ${PERSON_NAME}: CDM 2015 duty holders, fire risk assessment, RAMS, the directors’ role, accident investigation and the health and safety policy.`;

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: paths.insights,
  og: { title: `Guides by ${PERSON_NAME}`, eyebrow: SITE_NAME, tag: 'Guides' },
});

export default function InsightsPage() {
  const guides = insightsByDate();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: paths.insights },
  ];
  return (
    <main>
      <JsonLd id="insights-graph" data={pageGraph({ path: paths.insights, type: 'CollectionPage', name: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Guides"
        title={`Guides by ${PROFILE.givenName}`}
        lead="The law and the practice behind each discipline, written for the people who carry the duties: what the regulations require, what the guidance expects, and what actually goes wrong."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="All guides" title={`${guides.length} guides, newest first`} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {guides.map((g) => (
                <LinkCard key={g.slug} href={paths.insight(g.slug)} meta={`${g.category} · ${g.readingMinutes} min`} title={g.title} text={g.description} />
              ))}
            </div>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <AuthorBio />
            <p className="text-sm leading-relaxed text-ink-muted">
              Guides are also available as an <a href="/rss.xml" className="font-medium text-gold-ink underline decoration-gold/40 underline-offset-2 hover:text-blue">RSS feed</a>.
            </p>
          </aside>
        </div>
      </Section>
      <InternalLinkBand band={bandForIndex('insights')} />
    </main>
  );
}
