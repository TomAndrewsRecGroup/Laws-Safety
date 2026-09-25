import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { Emblem, Wordmark, Diamond } from '@/components/Brand';
import { Section, SectionHeading, ButtonLink } from '@/components/ui';
import { ContactBand } from '@/components/ContactCard';
import { FadeIn, FadeInUp } from '@/components/HeroAnimations';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { PERSON_NAME, SITE_NAME, CONTACT, ADDRESS_ONE_LINE } from '@/lib/site';
import { PROFILE, paths, sinceLine, orgLabel } from '@/lib/content';

export const metadata: Metadata = pageMeta({
  title: `${PERSON_NAME} | ${SITE_NAME}`,
  absoluteTitle: true,
  description: `Who ${PERSON_NAME} is and what he has done in health and safety since 2011, across London and the South East.`,
  path: '/',
  type: 'profile',
  og: { title: PERSON_NAME, eyebrow: SITE_NAME, subtitle: 'Health and safety across London and the South East.' },
});

export default function HomePage() {
  const since = sinceLine();

  return (
    <main>
      <JsonLd
        id="home-graph"
        data={pageGraph({
          path: '/',
          type: 'ProfilePage',
          name: `${PERSON_NAME}, ${SITE_NAME}`,
          description: `Who ${PERSON_NAME} is and what he has done in health and safety.`,
        })}
      />

      {/* ─── Hero: the centrepiece ─────────────────────────────────────── */}
      <div className="theme-dark relative overflow-hidden bg-navy-800 text-ink-light">
        <div className="absolute inset-0 bg-hero-radial" aria-hidden />
        <div
          className="absolute inset-0 bg-hero-grid bg-grid"
          style={{ backgroundPosition: '36px 20px', maskImage: 'radial-gradient(ellipse 58% 60% at 50% 42%, #000 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 58% 60% at 50% 42%, #000 0%, transparent 100%)' }}
          aria-hidden
        />
        <div className="relative">
          <Header />
          <section className="relative mx-auto max-w-site px-4 pb-16 pt-6 text-center sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
            {/* Glow, rings, ticks, emblem */}
            <FadeIn className="relative mx-auto mb-6 flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px]">
              <div className="ls-glow absolute inset-[-40%] rounded-full" style={{ background: 'radial-gradient(circle, rgba(66,142,236,0.40) 0%, rgba(40,96,190,0.18) 26%, rgba(10,20,38,0) 58%)' }} aria-hidden />
              <div className="absolute inset-[10%] rounded-full" style={{ background: 'radial-gradient(circle, rgba(242,199,92,0.20) 0%, rgba(242,199,92,0) 60%)' }} aria-hidden />
              <svg className="absolute inset-[-25%] h-[150%] w-[150%]" viewBox="0 0 900 900" aria-hidden>
                <circle cx="450" cy="450" r="256" fill="none" stroke="#d4af37" strokeOpacity="0.26" strokeWidth="1" />
                <circle cx="450" cy="450" r="372" fill="none" stroke="#d4af37" strokeOpacity="0.11" strokeWidth="1" />
                <circle cx="450" cy="450" r="446" fill="none" stroke="#d4af37" strokeOpacity="0.05" strokeWidth="1" />
              </svg>
              <svg className="ls-ticks absolute inset-[-25%] h-[150%] w-[150%]" viewBox="0 0 900 900" aria-hidden>
                <circle cx="450" cy="450" r="304" fill="none" stroke="#d4af37" strokeOpacity="0.34" strokeWidth="1.5" strokeDasharray="2 11" />
              </svg>
              <div className="relative">
                <Emblem size={300} priority shadow fluid quality={95} sizes="(min-width: 640px) 357px, 280px" className="w-[280px] sm:w-[357px]" />
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="flex flex-col items-center gap-5">
              <Diamond />
              <Wordmark width={440} priority fluid className="w-[300px] drop-shadow-[0_8px_26px_rgba(0,0,0,0.55)] sm:w-[440px]" />
              <div className="h-px w-full max-w-3xl bg-gold-rule" aria-hidden />
            </FadeIn>

            <FadeInUp delay={0.3} className="mx-auto mt-8 max-w-3xl">
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.015em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
                {PERSON_NAME}
                {PROFILE.postNominals && <span className="ml-3 align-middle text-[0.45em] font-medium tracking-[0.18em] text-gold">{PROFILE.postNominals}</span>}
                <span className="mt-2 block text-[1.125rem] font-normal leading-snug tracking-normal text-ink-light-muted sm:text-[1.375rem]">{PROFILE.headline}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base font-normal leading-relaxed text-ink-light-soft sm:text-lg">{PROFILE.summary}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={paths.about}>About Stephen</ButtonLink>
                <ButtonLink href={paths.contact} variant="secondary-dark">
                  Get in touch with Stephen
                </ButtonLink>
              </div>
            </FadeInUp>

            <FadeIn delay={0.5} className="mt-10">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[15px] text-ink-light-soft">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition hover:text-gold-bright">
                    <Mail className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                    {CONTACT.email}
                  </a>
                </li>
                <li aria-hidden className="hidden h-5 w-px bg-gold/40 sm:block" />
                <li>
                  <a href={`tel:${CONTACT.phoneE164}`} className="inline-flex items-center gap-2 transition hover:text-gold-bright">
                    <Phone className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li aria-hidden className="hidden h-5 w-px bg-gold/40 sm:block" />
                <li className="inline-flex items-center gap-2 text-ink-light-muted">
                  <MapPin className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                  {ADDRESS_ONE_LINE}
                </li>
              </ul>
            </FadeIn>
          </section>
        </div>
      </div>

      {/* ─── Who Stephen is ────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who he is" title={since ? `In health and safety ${since}` : 'In health and safety'} />
            <div className="space-y-4 text-pretty text-base leading-relaxed text-ink sm:text-[1.0625rem]">
              {PROFILE.bio.slice(0, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-surface-raised p-6">
            {PROFILE.photo && (
              <div className="relative mb-6 aspect-[5/4] w-full overflow-hidden rounded-lg border border-gold/30 bg-navy-800">
                <Image src={PROFILE.photo.src} alt={PROFILE.photo.alt} fill sizes="(min-width: 1024px) 28rem, (min-width: 640px) 36rem, 100vw" className="object-cover object-[50%_22%]" />
              </div>
            )}
            <p className="eyebrow mb-4">In the profession</p>
            <ul className="space-y-3">
              {PROFILE.affiliations.map((a) => (
                <li key={a.organisation} className="flex items-start gap-3 text-[15px] leading-snug text-ink">
                  <span aria-hidden className="mt-[8px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep" />
                  <span>
                    <span className="font-semibold">{a.role}</span>, {a.organisation}
                    {a.tenure && <span className="text-ink-muted"> ({a.tenure})</span>}
                  </span>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-3 mt-6">Qualifications</p>
            <ul className="space-y-2">
              {PROFILE.qualifications.map((q) => (
                <li key={q.name} className="flex items-start gap-3 text-[14px] leading-snug text-ink">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-gold-deep" />
                  <span>
                    {q.name}
                    {q.awardedBy && <span className="text-ink-muted">, {q.awardedBy}</span>}
                    {q.year && <span className="text-ink-muted"> ({q.year})</span>}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-5 text-sm">
              <div>
                <dt className="eyebrow !text-[10px]">Based</dt>
                <dd className="mt-1 text-ink">{PROFILE.basedIn}</dd>
              </div>
              <div>
                <dt className="eyebrow !text-[10px]">Worked across</dt>
                <dd className="mt-1 text-ink">{PROFILE.coverage}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* ─── What he has done ─────────────────────────────────────────── */}
      <Section raised id="career">
        <SectionHeading eyebrow="What he has done" title="Career so far" />
        <ol className="relative max-w-prose border-l border-ink/15 pl-6">
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
        <div className="mt-8">
          <Link href={paths.about} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink transition hover:text-blue">
            Read more about Stephen
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>

      <ContactBand />
    </main>
  );
}
