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
import { bandForDiscipline } from '@/lib/links';
import { PERSON_NAME } from '@/lib/site';
import { DISCIPLINES, getDiscipline, sectorsForDiscipline, locationsFor, insightsFor, paths, PROFILE } from '@/lib/content';

export function generateStaticParams() {
  return DISCIPLINES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) return {};
  return pageMeta({
    title: d.seoTitle ?? d.title,
    description: d.summary,
    path: paths.discipline(d.slug),
    og: { title: d.seoTitle ?? d.title, eyebrow: `${PERSON_NAME} · Expertise`, tag: d.shortTitle, subtitle: d.summary },
  });
}

export default async function DisciplinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) notFound();

  const sectors = sectorsForDiscipline(d.slug);
  const locations = locationsFor('discipline', d.slug);
  const guides = insightsFor('discipline', d.slug);
  const related = d.related.map((r) => getDiscipline(r)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const path = paths.discipline(d.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Expertise', path: paths.expertise },
    { name: d.shortTitle, path },
  ];

  return (
    <main>
      <JsonLd id="discipline-graph" data={pageGraph({ path, name: d.title, description: d.summary, crumbs, faqs: d.faqs })} />

      <PageHero crumbs={crumbs} eyebrow="Expertise" title={d.title} lead={d.summary} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <article>
            <KeyTakeaways items={d.keyTakeaways} />

            <SectionHeading eyebrow="The discipline" title="What it involves, and the law behind it" />
            <div className="article-body max-w-prose">
              {d.what.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-ink/10 bg-surface-raised p-5 sm:p-6">
              <p className="eyebrow mb-3">Regulations and standards</p>
              <ul className="space-y-2 text-[15px] leading-relaxed text-ink">
                {d.regulations.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="The record" title={`What ${PROFILE.givenName} has delivered`} as="h3" />
              <ul className="space-y-3">
                {d.delivered.map((x, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-gold/40 bg-surface p-4 text-[15px] leading-relaxed text-ink sm:text-base">
                    <span aria-hidden className="mt-[9px] h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            {sectors.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="Sectors" title="Where this was applied" as="h3" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {sectors.map((s) => (
                    <LinkCard key={s.slug} href={paths.sector(s.slug)} title={s.title} text={s.summary} />
                  ))}
                </div>
              </div>
            )}

            {locations.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="Places" title="Areas where this discipline mattered most" as="h3" />
                <PillLinks ariaLabel="Locations" items={locations.map((l) => ({ href: paths.location(l.slug), label: l.name }))} />
              </div>
            )}

            {guides.length > 0 && (
              <div className="mt-12">
                <SectionHeading eyebrow="Guides" title="Read the guide" as="h3" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {guides.map((g) => (
                    <LinkCard key={g.slug} href={paths.insight(g.slug)} meta={g.category} title={g.title} text={g.description} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12">
              <FaqList faqs={d.faqs} title={`Questions about ${d.shortTitle}`} />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
            {related.length > 0 && (
              <nav aria-label="Related disciplines" className="rounded-lg border border-ink/10 p-5">
                <p className="eyebrow mb-3">Related disciplines</p>
                <ul className="space-y-2.5">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <a href={paths.discipline(r.slug)} className="text-[15px] font-medium text-ink transition hover:text-blue">
                        {r.shortTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </Section>

      <InternalLinkBand band={bandForDiscipline(d.slug)} />
    </main>
  );
}
