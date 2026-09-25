import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import KeyTakeaways from '@/components/KeyTakeaways';
import FaqList from '@/components/FaqList';
import AuthorBio from '@/components/AuthorBio';
import { ContactCard } from '@/components/ContactCard';
import { Section } from '@/components/ui';
import { pageGraph, articleNode } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForInsight } from '@/lib/links';
import { PERSON_NAME } from '@/lib/site';
import { INSIGHTS, getInsight, getDiscipline, getSector, paths, type InsightBlock } from '@/lib/content';

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getInsight(slug);
  if (!i) return {};
  return pageMeta({
    title: i.seoTitle ?? i.title,
    description: i.description,
    path: paths.insight(i.slug),
    type: 'article',
    og: { title: i.seoTitle ?? i.title, eyebrow: `Guide · ${PERSON_NAME}`, tag: i.category, subtitle: i.description },
  });
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function Block({ b }: { b: InsightBlock }) {
  switch (b.type) {
    case 'p':
      return <p>{b.text}</p>;
    case 'ul':
      return (
        <ul>
          {b.items.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {b.items.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ol>
      );
    case 'callout':
      return (
        <aside className="my-6 rounded-lg border border-gold/40 bg-surface-raised p-5">
          <p className="eyebrow mb-2">{b.title}</p>
          <p className="!mb-0 text-[15px] leading-relaxed text-ink">{b.text}</p>
        </aside>
      );
    case 'table':
      return (
        <div className="my-6 overflow-x-auto">
          <table>
            <thead>
              <tr>
                {b.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getInsight(slug);
  if (!i) notFound();

  const path = paths.insight(i.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: paths.insights },
    { name: i.category, path },
  ];
  const disciplines = i.disciplines.map((d) => getDiscipline(d)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const sectors = i.sectors.map((s) => getSector(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <main>
      <JsonLd id="article-graph" data={pageGraph({ path, name: i.title, description: i.description, dateModified: i.dateModified, crumbs, faqs: i.faqs, extra: [articleNode(i)] })} />

      <PageHero
        compact
        crumbs={crumbs}
        eyebrow={`Guide · ${i.category}`}
        title={i.title}
        lead={
          <>
            <span className="block">{i.standfirst}</span>
            <span className="mt-4 block text-sm text-ink-light-muted">
              By {PERSON_NAME} · Published {formatDate(i.datePublished)}
              {i.dateModified !== i.datePublished ? ` · Updated ${formatDate(i.dateModified)}` : ''} · {i.readingMinutes} min read
            </span>
          </>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <article className="max-w-prose">
            <KeyTakeaways title="Key takeaways" items={i.keyTakeaways} />

            <nav aria-label="In this guide" className="mb-10 rounded-lg border border-ink/10 p-5">
              <p className="eyebrow mb-3">In this guide</p>
              <ol className="space-y-1.5 text-[15px]">
                {i.sections.map((s, n) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-ink transition hover:text-blue">
                      <span className="mr-2 text-gold-ink">{n + 1}.</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="article-body">
              {i.sections.map((s) => (
                <section key={s.id} id={s.id} className="mb-10 scroll-mt-6">
                  <h2 className="mb-4 text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">{s.heading}</h2>
                  {s.blocks.map((b, n) => (
                    <Block key={n} b={b} />
                  ))}
                </section>
              ))}
            </div>

            {(disciplines.length > 0 || sectors.length > 0) && (
              <div className="mt-2 rounded-lg border border-ink/10 bg-surface-raised p-5">
                <p className="eyebrow mb-3">In the record</p>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  This guide describes the law. What {PERSON_NAME} has delivered under it is set out in{' '}
                  {disciplines.map((d, n) => (
                    <span key={d.slug}>
                      <Link href={paths.discipline(d.slug)} className="font-medium text-ink underline decoration-gold/40 underline-offset-2 hover:text-blue">
                        {d.shortTitle}
                      </Link>
                      {n < disciplines.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  {sectors.length > 0 && (
                    <>
                      {disciplines.length > 0 ? ', and in the ' : 'the '}
                      {sectors.map((s, n) => (
                        <span key={s.slug}>
                          <Link href={paths.sector(s.slug)} className="font-medium text-ink underline decoration-gold/40 underline-offset-2 hover:text-blue">
                            {s.shortTitle.toLowerCase()}
                          </Link>
                          {n < sectors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                      {sectors.length > 1 ? ' sectors' : ' sector'}
                    </>
                  )}
                  .
                </p>
              </div>
            )}

            {i.faqs.length > 0 && (
              <div className="mt-12">
                <FaqList faqs={i.faqs} title="Questions this guide raises" />
              </div>
            )}

            <div className="mt-12">
              <AuthorBio />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ContactCard compact />
          </aside>
        </div>
      </Section>

      <InternalLinkBand band={bandForInsight(i.slug)} />
    </main>
  );
}
