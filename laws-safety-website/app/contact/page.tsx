import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import InternalLinkBand from '@/components/InternalLinkBand';
import ContactForm from '@/components/ContactForm';
import { Section, SectionHeading } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { bandForIndex } from '@/lib/links';
import { PERSON_NAME, SITE_NAME, CONTACT, ADDRESS_ONE_LINE } from '@/lib/site';
import { PROFILE, paths } from '@/lib/content';

const TITLE = `Get in touch with ${PERSON_NAME}`;
const DESCRIPTION = `Get in touch with ${PERSON_NAME}: ${CONTACT.email}, ${CONTACT.phoneDisplay}, or the form. Office at Nepicar Park, Wrotham, Sevenoaks, Kent TN15 7AF.`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_ONE_LINE)}`;

export const metadata: Metadata = pageMeta({
  title: 'Get in touch',
  description: DESCRIPTION,
  path: paths.contact,
  og: { title: TITLE, eyebrow: SITE_NAME, tag: 'Contact', subtitle: `${CONTACT.email} · ${CONTACT.phoneDisplay}` },
});

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: paths.contact },
  ];
  return (
    <main>
      <JsonLd id="contact-graph" data={pageGraph({ path: paths.contact, type: 'ContactPage', name: TITLE, description: DESCRIPTION, crumbs })} />
      <PageHero crumbs={crumbs} eyebrow="Get in touch" title={TITLE} lead="By email, by phone, or through the form below. Messages go straight to Stephen." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Details" title="Directly" as="h2" />
            <ul className="space-y-5">
              <li>
                <p className="eyebrow !text-[10px]">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 inline-flex items-center gap-2.5 text-[1.0625rem] font-medium text-ink transition hover:text-blue">
                  <Mail className="h-5 w-5 text-gold-deep" strokeWidth={1.8} aria-hidden />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <p className="eyebrow !text-[10px]">Phone</p>
                <a href={`tel:${CONTACT.phoneE164}`} className="mt-1 inline-flex items-center gap-2.5 text-[1.0625rem] font-medium text-ink transition hover:text-blue">
                  <Phone className="h-5 w-5 text-gold-deep" strokeWidth={1.8} aria-hidden />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <p className="eyebrow !text-[10px]">Office</p>
                <p className="mt-1 flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.8} aria-hidden />
                  <span>
                    {CONTACT.address.line1}
                    <br />
                    {CONTACT.address.line2}
                    <br />
                    {CONTACT.address.town}, {CONTACT.address.county} {CONTACT.address.postcode}
                  </span>
                </p>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-gold-ink transition hover:text-blue">
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                </a>
                <p className="mt-2 text-sm text-ink-muted">Beside junction 2 of the M20, where it meets the M26.</p>
              </li>
              {PROFILE.linkedin && (
                <li>
                  <p className="eyebrow !text-[10px]">LinkedIn</p>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2.5 text-[1.0625rem] font-medium text-ink transition hover:text-blue">
                    <Linkedin className="h-5 w-5 text-gold-deep" strokeWidth={1.8} aria-hidden />
                    Connect on LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Form" title="Send a message" as="h2" intro="Name, email and a message are all that is needed; a phone number and organisation help Stephen reply usefully." />
            <ContactForm />
          </div>
        </div>
      </Section>
      <InternalLinkBand band={bandForIndex('contact')} />
    </main>
  );
}
