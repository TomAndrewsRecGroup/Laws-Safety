import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { CONTACT, PERSON_NAME } from '@/lib/site';
import { PROFILE, paths } from '@/lib/content';
import { ButtonLink } from '@/components/ui';

/**
 * The one call to action the site carries: get in touch with Stephen. Used
 * in page asides and as the closing band on the homepage. No other CTA
 * wording is permitted (see docs/WORDING_RULES.md).
 */
export function ContactCard({ compact = false }: { compact?: boolean }) {
  return (
    <aside aria-label={`Get in touch with ${PERSON_NAME}`} className="rounded-lg border border-ink/10 bg-surface-raised p-5 sm:p-6">
      <p className="eyebrow mb-2">Get in touch</p>
      <p className="text-[1.125rem] font-semibold leading-snug text-ink">{PERSON_NAME}</p>
      {!compact && <p className="mt-1 text-sm text-ink-muted">Wrotham, near Sevenoaks, Kent</p>}
      <ul className="mt-4 space-y-2.5 text-sm">
        <li>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2.5 text-ink transition hover:text-blue">
            <Mail className="h-4 w-4 text-gold-deep" strokeWidth={1.8} aria-hidden />
            {CONTACT.email}
          </a>
        </li>
        <li>
          <a href={`tel:${CONTACT.phoneE164}`} className="inline-flex items-center gap-2.5 text-ink transition hover:text-blue">
            <Phone className="h-4 w-4 text-gold-deep" strokeWidth={1.8} aria-hidden />
            {CONTACT.phoneDisplay}
          </a>
        </li>
        {!compact && (
          <li className="flex items-start gap-2.5 text-ink-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.8} aria-hidden />
            <span>
              {CONTACT.address.line1}, {CONTACT.address.line2}
              <br />
              {CONTACT.address.town}, {CONTACT.address.county} {CONTACT.address.postcode}
            </span>
          </li>
        )}
        {PROFILE.linkedin && (
          <li>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ink transition hover:text-blue">
              <Linkedin className="h-4 w-4 text-gold-deep" strokeWidth={1.8} aria-hidden />
              Connect on LinkedIn
            </a>
          </li>
        )}
      </ul>
      <div className="mt-5">
        <ButtonLink href={paths.contact} className="w-full sm:w-auto">
          Get in touch with Stephen
        </ButtonLink>
      </div>
    </aside>
  );
}

/** Full-width closing band, navy, used on the homepage and the about page. */
export function ContactBand() {
  return (
    <section className="theme-dark relative overflow-hidden bg-navy-800 py-14 text-ink-light sm:py-20">
      <div className="absolute inset-0 bg-hero-radial opacity-80" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-rule" aria-hidden />
      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Get in touch</p>
            <h2 className="text-balance text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.125rem]">Get in touch with {PERSON_NAME}</h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-ink-light-muted sm:text-lg">
              By email, by phone, or through the form. The office is at Nepicar Park, Wrotham, beside junction 2 of the M20.
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-light-soft">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition hover:text-gold-bright">
                  <Mail className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneE164}`} className="inline-flex items-center gap-2 transition hover:text-gold-bright">
                  <Phone className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href={paths.contact}>Get in touch with Stephen</ButtonLink>
            <Link href={paths.faq} className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold text-ink-light transition hover:border-gold hover:text-white">
              Questions people ask
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
