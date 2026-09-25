import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import { ContactCard } from '@/components/ContactCard';
import { Section, SectionHeading } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { PERSON_NAME, SITE_NAME } from '@/lib/site';
import { TESTIMONIALS, hasTestimonials, getSector, paths } from '@/lib/content';

/**
 * Renders only once lib/content/testimonials.ts holds permissioned quotes.
 * Until then the route is a 404, it is absent from the sitemap and nothing
 * links to it, so the site never publishes a thin page.
 */
const TITLE = `What people say about ${PERSON_NAME}`;
const DESCRIPTION = `Testimonials about ${PERSON_NAME}, quoted with permission and attributed by role and sector.`;

export const metadata: Metadata = hasTestimonials
  ? pageMeta({ title: 'Testimonials', description: DESCRIPTION, path: paths.testimonials, og: { title: TITLE, eyebrow: SITE_NAME, tag: 'Testimonials' } })
  : { title: 'Not found', robots: { index: false, follow: false } };

export default function TestimonialsPage() {
  if (!hasTestimonials) notFound();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Testimonials', path: paths.testimonials },
  ];
  return (
    <main>
      <JsonLd id="testimonials-graph" data={pageGraph({ path: paths.testimonials, name: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHero crumbs={crumbs} eyebrow="Testimonials" title={TITLE} lead="Each quote is used with its author's permission and attributed by role and sector unless the person has agreed to be named." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="In their words" title={`${TESTIMONIALS.length} ${TESTIMONIALS.length === 1 ? 'testimonial' : 'testimonials'}`} />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TESTIMONIALS.map((t, i) => {
                const sector = getSector(t.sector);
                return (
                  <li key={i} className="flex flex-col rounded-lg border border-ink/10 bg-surface p-6">
                    <blockquote className="text-[1.0625rem] leading-relaxed text-ink">
                      <span aria-hidden className="mr-1 text-2xl leading-none text-gold">&ldquo;</span>
                      {t.quote}
                    </blockquote>
                    <footer className="mt-4 border-t border-ink/10 pt-4 text-sm text-ink-muted">
                      <span className="font-semibold text-ink">{t.author}</span>
                      {t.role && <span>, {t.role}</span>}
                      {sector && <span> · {sector.shortTitle}</span>}
                      {t.year && <span> · {t.year}</span>}
                    </footer>
                  </li>
                );
              })}
            </ul>
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
          </aside>
        </div>
      </Section>
    </main>
  );
}
