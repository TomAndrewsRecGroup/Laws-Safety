import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import KeyTakeaways from '@/components/KeyTakeaways';
import FaqList from '@/components/FaqList';
import { ContactCard } from '@/components/ContactCard';
import { Section, SectionHeading, PillLinks, LinkCard } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForSector } from '@/lib/links';
import { PERSON_NAME } from '@/lib/site';
import { SECTORS, getSector, disciplinesForSector, locationsFor, insightsFor, paths, PROFILE } from '@/lib/content';

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) return {};
  return pageMeta({
    title: s.seoTitle ?? `${s.title}: health and safety record`,
    description: s.summary,
    path: paths.sector(s.slug),
    og: { title: `${s.title}: what Stephen has delivered`, eyebrow: `${PERSON_NAME} · Sectors`, tag: s.shortTitle, subtitle: s.summary },
  });
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) notFound();

  const disciplines = disciplinesForSector(s.slug);
  const locations = locationsFor('sector', s.slug);
  const guides = insightsFor('sector', s.slug);
  const path = paths.sector(s.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Sectors', path: paths.sectors },
    { name: s.shortTitle, path },
  ];

  return (
    <main>
      <JsonLd id="sector-graph" data={pageGraph({ path, name: `${s.title}: health and safety record`, description: s.summary, crumbs, faqs: s.faqs })} />

      <PageHero crumbs={crumbs} eyebrow="Sectors" title={s.title} lead={s.summary} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <article>
            <KeyTakeaways items={s.keyTakeaways} />

            <SectionHeading eyebrow="The sector" title={`Health and safety in ${s.shortTitle.toLowerCase()}`} />
            <div className="article-body max-w-prose">
              {s.landscape.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="The record" title={`What ${PROFILE.givenName} has delivered in ${s.shortTitle.toLowerCase()}`} as="h3" />
              <ul className="space-y-3">
                {s.delivered.map((x, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-gold/40 bg-surface p-4 text-[15px] leading-relaxed text-ink sm:text-base">
                    <span aria-hidden className="mt-[9px] h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            {disciplines.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="Disciplines" title="The disciplines applied here" as="h3" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {disciplines.map((d) => (
                    <LinkCard key={d.slug} href={paths.discipline(d.slug)} title={d.shortTitle} text={d.summary} />
                  ))}
                </div>
              </div>
            )}

            {locations.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="Places" title={`Where ${s.shortTitle.toLowerCase()} work was done`} as="h3" />
                <PillLinks ariaLabel="Locations" items={locations.map((l) => ({ href: paths.location(l.slug), label: l.name }))} />
              </div>
            )}

            {guides.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="Guides" title="Guides that apply" as="h3" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {guides.slice(0, 2).map((g) => (
                    <LinkCard key={g.slug} href={paths.insight(g.slug)} meta={g.category} title={g.title} text={g.description} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12">
              <FaqList faqs={s.faqs} title={`Questions about ${s.shortTitle.toLowerCase()} safety`} />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
          </aside>
        </div>
      </Section>

      <InternalLinkBand band={bandForSector(s.slug)} />
    </main>
  );
}
