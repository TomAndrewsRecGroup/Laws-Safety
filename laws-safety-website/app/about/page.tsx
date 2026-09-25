import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import KeyTakeaways from '@/components/KeyTakeaways';
import { Emblem } from '@/components/Brand';
import { ContactCard, ContactBand } from '@/components/ContactCard';
import { Section, SectionHeading, FactList, PillLinks } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForIndex } from '@/lib/links';
import { lowerWords } from '@/lib/text';
import { PERSON_NAME, SITE_NAME } from '@/lib/site';
import { PROFILE, DISCIPLINES, SECTORS, paths, sinceLine, yearsInSafety, orgLabel } from '@/lib/content';

const DESCRIPTION = `Who ${PERSON_NAME} is: his career in health and safety, his qualifications and memberships, and the sectors and places he has worked across London and the South East.`;

export const metadata: Metadata = pageMeta({
  title: `About ${PERSON_NAME}`,
  description: DESCRIPTION,
  path: paths.about,
  type: 'profile',
  og: { title: `About ${PERSON_NAME}`, eyebrow: SITE_NAME, tag: 'About' },
});

export default function AboutPage() {
  const since = sinceLine();
  const years = yearsInSafety();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: paths.about },
  ];

  return (
    <main>
      <JsonLd
        id="about-graph"
        data={pageGraph({ path: paths.about, type: 'ProfilePage', name: `About ${PERSON_NAME}`, description: DESCRIPTION, crumbs })}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="About"
        title={
          <>
            {PERSON_NAME}
            {PROFILE.postNominals && <span className="ml-3 align-middle text-[0.45em] font-medium tracking-[0.18em] text-gold">{PROFILE.postNominals}</span>}
          </>
        }
        lead={PROFILE.headline}
        aside={
          <div className="mx-auto flex max-w-[22rem] items-center justify-center lg:justify-end">
            {PROFILE.photo ? (
              <Image src={PROFILE.photo.src} alt={PROFILE.photo.alt} width={352} height={352} priority className="rounded-lg border border-gold/30 object-cover shadow-emblem-dark" />
            ) : (
              <Emblem size={220} priority shadow />
            )}
          </div>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <article>
            <KeyTakeaways
              title="In brief"
              items={[
                years ? `${PERSON_NAME} has worked in health and safety ${since}, ${years} years.` : `${PERSON_NAME} works in health and safety from Wrotham, Kent.`,
                `Disciplines delivered: ${DISCIPLINES.map((d) => lowerWords(d.shortTitle)).join(', ')}.`,
                `Sectors worked across: ${SECTORS.map((s) => lowerWords(s.shortTitle)).join(', ')}.`,
                'Chartered Member of IOSH; Vice Chair of the Kent Health and Safety Group and of Safety Groups UK; IOSH South East Lead Mentor for three years.',
                `Based at Nepicar Park, Wrotham, near Sevenoaks; worked across ${PROFILE.coverage}.`,
              ]}
            />

            <SectionHeading eyebrow="The record" title={`${PROFILE.givenName}'s career`} />
            <div className="article-body max-w-prose">
              {PROFILE.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="Timeline" title="Where the years went" as="h3" />
              <ol className="relative border-l border-ink/15 pl-6">
                {PROFILE.timeline.map((t, i) => (
                  <li key={i} className="relative mb-8 last:mb-0">
                    <span aria-hidden className="absolute -left-[31px] top-[7px] h-2.5 w-2.5 rotate-45 border border-gold-deep bg-surface" />
                    <p className="eyebrow !text-[10px]">{t.period}</p>
                    <p className="mt-1 text-[1.0625rem] font-semibold text-ink">
                      {t.title}
                      {t.organisation && <span className="font-normal text-ink-muted">, {orgLabel(t.organisation)}</span>}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{t.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="In the profession" title="Standing in the profession" as="h3" intro="The groups and the institution Stephen has served, and the roles he holds in them." />
              <ul className="grid gap-3 sm:grid-cols-2">
                {PROFILE.affiliations.map((a) => (
                  <li key={a.organisation} className="rounded-lg border border-gold/40 bg-surface p-4">
                    <p className="text-[1.0625rem] font-semibold text-ink">{a.role}</p>
                    <p className="mt-0.5 text-[15px] text-ink-muted">
                      {a.organisation}
                      {a.tenure ? `, ${a.tenure}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="Credentials" title="Qualifications and memberships" as="h3" />
              <FactList
                items={[
                  { label: 'Memberships', value: <ul className="space-y-1">{PROFILE.memberships.map((m) => <li key={m.name}>{m.name}{m.awardedBy ? `, ${m.awardedBy}` : ''}{m.year ? ` (${m.year})` : ''}</li>)}</ul> },
                  { label: 'Qualifications', value: <ul className="space-y-1">{PROFILE.qualifications.map((q) => <li key={q.name}>{q.name}{q.awardedBy ? `, ${q.awardedBy}` : ''}{q.year ? ` (${q.year})` : ''}</li>)}</ul> },
                  { label: 'Based', value: PROFILE.basedIn },
                  { label: 'Worked across', value: PROFILE.coverage },
                ]}
              />
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="Disciplines" title="What he has delivered" as="h3" intro="Each has its own page with what was delivered and the law behind it." />
              <PillLinks ariaLabel="Disciplines" items={DISCIPLINES.map((d) => ({ href: paths.discipline(d.slug), label: d.shortTitle }))} />
            </div>

            <div className="mt-10">
              <SectionHeading eyebrow="Sectors" title="Where he has worked" as="h3" />
              <PillLinks ariaLabel="Sectors" items={SECTORS.map((s) => ({ href: paths.sector(s.slug), label: s.shortTitle }))} />
              <p className="mt-6 text-sm text-ink-muted">
                The places are listed separately:{' '}
                <Link href={paths.locations} className="font-medium text-gold-ink underline decoration-gold/40 underline-offset-2 hover:text-blue">
                  where the work was done
                </Link>
                .
              </p>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <ContactCard />
          </aside>
        </div>
      </Section>

      <InternalLinkBand band={bandForIndex('about')} />
      <ContactBand />
    </main>
  );
}
