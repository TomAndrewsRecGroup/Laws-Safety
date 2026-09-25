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
import { PROFILE, LOCATIONS, paths, type KentRegion } from '@/lib/content';

const TITLE = 'Locations: where the work was done';
const DESCRIPTION = `Where ${PERSON_NAME} has worked: Sevenoaks, Maidstone, Medway, Tonbridge and Tunbridge Wells, Dartford and Gravesend, Ashford, Canterbury and East Kent, and the London edge.`;
const REGION_ORDER: KentRegion[] = ['West Kent', 'Mid Kent', 'North Kent', 'East Kent', 'South East London'];

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: paths.locations,
  og: { title: 'Where the work was done', eyebrow: SITE_NAME, tag: 'Locations' },
});

export default function LocationsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: paths.locations },
  ];
  return (
    <main>
      <JsonLd id="locations-graph" data={pageGraph({ path: paths.locations, type: 'CollectionPage', name: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Locations"
        title="Where the work was done"
        lead={`From the office at Nepicar Park, Wrotham, beside junction 2 of the M20, across ${PROFILE.coverage}. Each area page describes the patch, the kind of sites it holds, and the sectors and disciplines that matter most there.`}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div className="space-y-12">
            {REGION_ORDER.map((region) => {
              const locs = LOCATIONS.filter((l) => l.region === region);
              if (!locs.length) return null;
              return (
                <div key={region}>
                  <SectionHeading eyebrow={region} title={region === 'South East London' ? 'The London edge' : region} as="h2" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {locs.map((l) => (
                      <LinkCard key={l.slug} href={paths.location(l.slug)} title={l.area} text={l.summary} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
          </aside>
        </div>
      </Section>
      <InternalLinkBand band={bandForIndex('locations')} />
    </main>
  );
}
