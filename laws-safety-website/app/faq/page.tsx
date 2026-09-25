import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import FaqList from '@/components/FaqList';
import { ContactCard } from '@/components/ContactCard';
import { Section } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForIndex } from '@/lib/links';
import { PERSON_NAME, SITE_NAME } from '@/lib/site';
import { FAQS, FAQ_CATEGORIES, paths } from '@/lib/content';

const TITLE = 'Frequently asked questions';
const DESCRIPTION = `Questions people ask about ${PERSON_NAME}: who he is, what his health and safety record covers, where he has worked, and how to get in touch.`;

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: paths.faq,
  og: { title: `Questions about ${PERSON_NAME}`, eyebrow: SITE_NAME, tag: 'FAQ' },
});

export default function FaqPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: paths.faq },
  ];
  return (
    <main>
      <JsonLd id="faq-graph" data={pageGraph({ path: paths.faq, name: TITLE, description: DESCRIPTION, crumbs, faqs: FAQS })} />
      <PageHero crumbs={crumbs} eyebrow="FAQ" title={`Questions people ask about ${PERSON_NAME}`} lead="Who he is, what his record covers and how to reach him. The longer answers live in the rest of the site." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div className="space-y-10">
            {FAQ_CATEGORIES.map((c) => {
              const items = FAQS.filter((f) => f.category === c.id);
              if (!items.length) return null;
              return <FaqList key={c.id} id={`faq-${c.id}`} title={c.label} faqs={items} />;
            })}
          </div>
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
          </aside>
        </div>
      </Section>
      <InternalLinkBand band={bandForIndex('faq')} />
    </main>
  );
}
