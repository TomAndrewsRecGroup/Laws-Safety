import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import { ContactCard } from '@/components/ContactCard';
import { Section, SectionHeading, LinkCard } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForIndex } from '@/lib/links';
import { PERSON_NAME, SITE_NAME } from '@/lib/site';
import { PROFILE, DISCIPLINES, paths } from '@/lib/content';

const TITLE = 'Expertise: disciplines Stephen has delivered';
const DESCRIPTION = `Disciplines ${PERSON_NAME} has delivered: CDM 2015, inspections and audits, RAMS, temporary works, contractor management, investigation, training and policy.`;

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: paths.expertise,
  og: { title: 'Disciplines Stephen has delivered', eyebrow: SITE_NAME, tag: 'Expertise' },
});

export default function ExpertisePage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Expertise', path: paths.expertise },
  ];
  return (
    <main>
      <JsonLd id="expertise-graph" data={pageGraph({ path: paths.expertise, type: 'CollectionPage', name: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Expertise"
        title={`Disciplines ${PROFILE.givenName} has delivered`}
        lead={`${DISCIPLINES.length} disciplines, each with the law behind it, what ${PROFILE.givenName} has delivered under it, and the sectors and places where he did so.`}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="The disciplines" title="Discipline by discipline" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DISCIPLINES.map((d) => (
                <LinkCard key={d.slug} href={paths.discipline(d.slug)} title={d.title} text={d.summary} />
              ))}
            </div>
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
          </aside>
        </div>
      </Section>
      <InternalLinkBand band={bandForIndex('expertise')} />
    </main>
  );
}
