import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { LockUp } from '@/components/Brand';
import { CONTACT, ADDRESS_ONE_LINE, SITE_NAME, PERSON_NAME } from '@/lib/site';
import { PROFILE, DISCIPLINES, SECTORS, paths } from '@/lib/content';
import { LEGAL } from '@/lib/content/legal';

/**
 * Site footer, on navy. Carries the four hubs and the utility pages, not the
 * spokes: a sitewide link to a handful of spokes gives them an arbitrary
 * advantage over their siblings, and the hub grids are the better channel.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark relative bg-navy-800 text-ink-light">
      <div className="absolute inset-x-0 top-0 h-px bg-gold-rule" aria-hidden />
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Link href="/" aria-label={`${SITE_NAME} home`} className="inline-flex rounded-md">
              <LockUp emblemSize={48} wordmarkWidth={176} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-light-muted">
              The health and safety record of {PERSON_NAME}. Disciplines delivered, sectors worked across and the places the work was done, across {PROFILE.coverage}.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2.5 text-ink-light-soft transition hover:text-gold-bright">
                  <Mail className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneE164}`} className="inline-flex items-center gap-2.5 text-ink-light-soft transition hover:text-gold-bright">
                  <Phone className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-light-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} aria-hidden />
                <span>{ADDRESS_ONE_LINE}</span>
              </li>
              {PROFILE.linkedin && (
                <li>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ink-light-soft transition hover:text-gold-bright">
                    <Linkedin className="h-4 w-4 text-gold" strokeWidth={1.8} aria-hidden />
                    Connect on LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Site */}
          <div>
            <h2 className="eyebrow mb-4">Site</h2>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Stephen', href: paths.about },
                { label: 'Expertise', href: paths.expertise },
                { label: 'Sectors', href: paths.sectors },
                { label: 'Locations', href: paths.locations },
                { label: 'Guides', href: paths.insights },
                { label: 'FAQ', href: paths.faq },
                { label: 'Get in touch', href: paths.contact },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-light-soft transition hover:text-gold-bright">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines */}
          <div>
            <h2 className="eyebrow mb-4">Disciplines</h2>
            <ul className="space-y-2.5 text-sm">
              {DISCIPLINES.map((d) => (
                <li key={d.slug}>
                  <Link href={paths.discipline(d.slug)} className="text-ink-light-soft transition hover:text-gold-bright">
                    {d.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h2 className="eyebrow mb-4">Sectors</h2>
            <ul className="space-y-2.5 text-sm">
              {SECTORS.map((s) => (
                <li key={s.slug}>
                  <Link href={paths.sector(s.slug)} className="text-ink-light-soft transition hover:text-gold-bright">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mb-4 mt-8">Legal</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={paths.legal} className="text-ink-light-soft transition hover:text-gold-bright">
                  Privacy notice
                </Link>
              </li>
              <li>
                <Link href={`${paths.legal}#terms`} className="text-ink-light-soft transition hover:text-gold-bright">
                  Website terms
                </Link>
              </li>
              <li>
                <Link href={`${paths.legal}#cookies`} className="text-ink-light-soft transition hover:text-gold-bright">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-light-muted sm:flex-row sm:items-center">
          <p>
            © {year} {LEGAL.entity}. {LEGAL.entity} is registered in {LEGAL.registeredIn}, company number {LEGAL.companyNumber}. Registered office: {LEGAL.registeredOffice}.
          </p>
          <p className="shrink-0">Health and safety, on the record.</p>
        </div>
      </div>
    </footer>
  );
}
