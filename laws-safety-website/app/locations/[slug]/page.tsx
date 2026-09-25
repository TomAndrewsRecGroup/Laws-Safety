import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import FaqList from '@/components/FaqList';
import { ContactCard } from '@/components/ContactCard';
import { Section, SectionHeading, PillLinks, LinkCard } from '@/components/ui';
import { pageGraph, placeNode } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForLocation } from '@/lib/links';
import { PERSON_NAME } from '@/lib/site';
import { LOCATIONS, getLocation, getSector, getDiscipline, paths, PROFILE } from '@/lib/content';

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return pageMeta({
    title: l.seoTitle ?? `Health and safety in ${l.name}: Stephen Laws`,
    description: l.summary,
    path: paths.location(l.slug),
    og: { title: l.area, eyebrow: `${PERSON_NAME} · Locations`, tag: l.region, subtitle: l.summary },
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) notFound();

  const sectors = l.sectors.map((s) => getSector(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const disciplines = l.disciplines.map((d) => getDiscipline(d)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const nearby = l.nearby.map((n) => getLocation(n)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const path = paths.location(l.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: paths.locations },
    { name: l.name, path },
  ];
  const place = placeNode(l.slug);

  return (
    <main>
      <JsonLd id="location-graph" data={pageGraph({ path, name: `Health and safety in ${l.name}: ${PERSON_NAME}`, description: l.summary, crumbs, faqs: l.faqs, extra: place ? [place] : [] })} />

      <PageHero crumbs={crumbs} eyebrow={l.region} title={l.area} lead={l.summary} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <article>
            <SectionHeading eyebrow="The patch" title={`${l.name} and the sites it holds`} />
            <div className="article-body max-w-prose">
              {l.localContext.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-ink/10 bg-surface-raised p-5 sm:p-6">
              <p className="eyebrow mb-3">Typical site types</p>
              <ul className="grid gap-2 text-[15px] leading-relaxed text-ink sm:grid-cols-2">
                {l.siteTypes.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {l.projects.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="The record" title={`Work ${PROFILE.givenName} has done around ${l.name}`} as="h3" />
                <ul className="space-y-3">
                  {l.projects.map((p, i) => (
                    <li key={i} className="rounded-lg border border-gold/40 bg-surface p-4 sm:p-5">
                      <p className="text-[1.0625rem] font-semibold text-ink">{p.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{p.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12">
              <SectionHeading eyebrow="Sectors" title={`The sectors that matter around ${l.name}`} as="h3" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sectors.slice(0, 4).map((s) => (
                  <LinkCard key={s.slug} href={paths.sector(s.slug)} title={s.title} text={s.summary} />
                ))}
              </div>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="Disciplines" title="The disciplines these sites call for" as="h3" />
              <PillLinks ariaLabel="Disciplines" items={disciplines.map((d) => ({ href: paths.discipline(d.slug), label: d.shortTitle }))} />
            </div>

            <div className="mt-12">
              <FaqList faqs={l.faqs} title={`Questions about ${l.name}`} />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
            {nearby.length > 0 && (
              <nav aria-label="Nearby areas" className="rounded-lg border border-ink/10 p-5">
                <p className="eyebrow mb-3">Nearby</p>
                <ul className="space-y-2.5">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <a href={paths.location(n.slug)} className="text-[15px] font-medium text-ink transition hover:text-blue">
                        {n.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </Section>

      <InternalLinkBand band={bandForLocation(l.slug)} />
    </main>
  );
}
