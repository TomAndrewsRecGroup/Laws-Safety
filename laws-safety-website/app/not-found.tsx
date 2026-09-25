import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Section, ButtonLink } from '@/components/ui';
import { PERSON_NAME } from '@/lib/site';
import { paths } from '@/lib/content';

export default function NotFound() {
  return (
    <main>
      <PageHero compact eyebrow="Error 404" title="That page is not here" lead="The address may have been mistyped, or the page has moved. Everything on the site is one click from the links below." />
      <Section>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href={paths.about} variant="secondary">
            About {PERSON_NAME}
          </ButtonLink>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Expertise', href: paths.expertise },
            { label: 'Sectors', href: paths.sectors },
            { label: 'Locations', href: paths.locations },
            { label: 'Guides', href: paths.insights },
            { label: 'FAQ', href: paths.faq },
            { label: 'Contact', href: paths.contact },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block rounded-md border border-ink/10 px-4 py-3 text-center text-sm font-medium text-ink transition hover:border-gold">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
