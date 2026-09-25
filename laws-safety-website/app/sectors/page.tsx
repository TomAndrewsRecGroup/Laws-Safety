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
import { PROFILE, SECTORS, paths } from '@/lib/content';

const TITLE = 'Sectors Stephen has worked across';
const DESCRIPTION = `Sectors ${PERSON_NAME} has worked across: construction and housing development, civil engineering, retail fit-out, and fabrication and process operations.`;

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: paths.sectors,
  og: { title: TITLE, eyebrow: SITE_NAME, tag: 'Sectors' },
});

export default function SectorsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Sectors', path: paths.sectors },
  ];
  return (
    <main>
      <JsonLd id="sectors-graph" data={pageGraph({ path: paths.sectors, type: 'CollectionPage', name: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Sectors"
        title={`Sectors ${PROFILE.givenName} has worked across`}
        lead="The same disciplines, applied on very different sites. Each sector page sets out its safety landscape, what Stephen has delivered in it, and the disciplines and places involved."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="The sectors" title="Sector by sector" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SECTORS.map((s) => (
                <LinkCard key={s.slug} href={paths.sector(s.slug)} title={s.title} text={s.summary} />
              ))}
            </div>
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
          </aside>
        </div>
      </Section>
      <InternalLinkBand band={bandForIndex('sectors')} />
    </main>
  );
}
