import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import { Section } from '@/components/ui';
import { pageGraph } from '@/lib/schema';
import { pageMeta } from '@/lib/meta';
import { PERSON_NAME, SITE_NAME, CONTACT, ADDRESS_ONE_LINE, BASE_URL } from '@/lib/site';
import { paths } from '@/lib/content';
import { LEGAL, LEGAL_ENTITY_LINE } from '@/lib/content/legal';

const TITLE = 'Privacy notice, website terms and cookies';
const DESCRIPTION = `How ${SITE_NAME} handles personal data from the contact form and analytics, the terms on which this website is provided, and the cookies it uses.`;

export const metadata: Metadata = pageMeta({
  title: 'Privacy, terms and cookies',
  description: DESCRIPTION,
  path: paths.legal,
  og: { title: TITLE, eyebrow: SITE_NAME, tag: 'Legal' },
});

function reviewed(): string {
  return new Date(`${LEGAL.reviewed}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function LegalPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Legal', path: paths.legal },
  ];
  return (
    <main>
      <JsonLd id="legal-graph" data={pageGraph({ path: paths.legal, name: TITLE, description: DESCRIPTION, crumbs, dateModified: LEGAL.reviewed })} />
      <PageHero compact crumbs={crumbs} eyebrow="Legal" title={TITLE} lead={`Last reviewed ${reviewed()}.`} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-6 lg:self-start">
            <p className="eyebrow mb-3">On this page</p>
            <ol className="space-y-2 text-[15px]">
              <li><a href="#privacy" className="text-ink hover:text-blue">Privacy notice</a></li>
              <li><a href="#terms" className="text-ink hover:text-blue">Website terms</a></li>
              <li><a href="#cookies" className="text-ink hover:text-blue">Cookies</a></li>
              <li><a href="#accessibility" className="text-ink hover:text-blue">Accessibility</a></li>
            </ol>
          </nav>

          <div className="article-body max-w-prose">
            <section id="privacy" className="scroll-mt-6">
              <h2 className="mb-4 text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">Privacy notice</h2>
              <p>
                This notice explains how personal data is handled on {BASE_URL.replace('https://', '')}. The controller is {LEGAL_ENTITY_LINE}, whose registered office is at {LEGAL.registeredOffice} and whose office is at {ADDRESS_ONE_LINE}. Questions about this notice go to {PERSON_NAME} at{' '}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or {CONTACT.phoneDisplay}.{LEGAL.icoReference ? ` ICO registration reference ${LEGAL.icoReference}.` : ''}
              </p>
              <h3 className="mb-2 mt-6 text-[1.125rem] font-semibold text-ink">What is collected and why</h3>
              <ul>
                <li>
                  <strong>The contact form.</strong> Name, email address, message and, if given, phone number and organisation. This is used to reply to the message and for no other purpose. The lawful basis is legitimate interests (responding to an enquiry the person has chosen to send), and where the message leads to a working relationship, the steps taken at the person&rsquo;s request before entering into a contract.
                </li>
                <li>
                  <strong>Email and phone.</strong> Anything sent directly to {CONTACT.email} or {CONTACT.phoneDisplay} is handled on the same basis.
                </li>
                <li>
                  <strong>Analytics.</strong> With consent, Google Analytics 4 records page views and interactions to understand how the site is read, using cookies described below with IP addresses anonymised. Vercel Analytics records aggregate, cookieless page-view counts that identify no individual. The lawful basis for Google Analytics is consent; it does not load until consent is given.
                </li>
                <li>
                  <strong>Server logs.</strong> The hosting provider, Vercel, keeps short-lived request logs (IP address, user agent, URL) for security and to keep the site running. The lawful basis is legitimate interests.
                </li>
              </ul>
              <h3 className="mb-2 mt-6 text-[1.125rem] font-semibold text-ink">Who receives it</h3>
              <p>
                Contact-form messages are delivered by Resend, an email delivery service, to {PERSON_NAME}&rsquo;s mailbox. The site is hosted by Vercel. Analytics data goes to Google where consent has been given. None of the data is sold, and it is not shared with anyone else unless the law requires it. Where a processor stores data outside the United Kingdom, transfers rely on the UK International Data Transfer Agreement or an adequacy regulation.
              </p>
              <h3 className="mb-2 mt-6 text-[1.125rem] font-semibold text-ink">How long it is kept</h3>
              <p>
                Contact messages are kept for as long as the conversation they started is live and for up to two years afterwards, then deleted, unless they form part of a working record that has to be kept longer. Analytics data is retained by Google for 14 months. Server logs are retained by Vercel for a matter of days.
              </p>
              <h3 className="mb-2 mt-6 text-[1.125rem] font-semibold text-ink">Your rights</h3>
              <p>
                Under the UK General Data Protection Regulation and the Data Protection Act 2018, anyone whose data is held can ask to see it, have it corrected or deleted, restrict or object to its use, and receive a copy in a portable form. Consent for analytics can be withdrawn at any time by clearing the site&rsquo;s cookies. Requests go to {CONTACT.email}. Anyone unhappy with how their data has been handled can complain to the Information Commissioner&rsquo;s Office at ico.org.uk.
              </p>
            </section>

            <section id="terms" className="mt-12 scroll-mt-6">
              <h2 className="mb-4 text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">Website terms</h2>
              <p>
                This website is published by {LEGAL_ENTITY_LINE}, registered office {LEGAL.registeredOffice}, to describe {PERSON_NAME}&rsquo;s professional record and to make his guides available. It is provided free of charge and on the following terms.
              </p>
              <ul>
                <li>
                  <strong>Information, not advice.</strong> The guides and every other page describe health and safety law and practice in general terms as they stood when written. They are not advice on any particular workplace, project or set of facts, and nothing on the site creates a professional relationship or a duty of care to a reader. A decision about a specific situation needs a competent person who has seen it.
                </li>
                <li>
                  <strong>Accuracy.</strong> Reasonable care is taken to keep the content accurate and current, and each guide carries the date it was last revised. The law changes; a reader should check the current position with the Health and Safety Executive, the relevant regulator or the legislation itself before relying on anything here.
                </li>
                <li>
                  <strong>Copyright.</strong> The text, the logo and the design of this site are the copyright of {LEGAL.entity}. The guides may be quoted with attribution and a link; they may not be reproduced in full or presented as anyone else&rsquo;s work.
                </li>
                <li>
                  <strong>Links.</strong> Links to other sites are provided for reference. No responsibility is taken for their content.
                </li>
                <li>
                  <strong>Liability.</strong> To the extent the law allows, no liability is accepted for loss arising from reliance on the content of this site. Nothing in these terms limits liability for death or personal injury caused by negligence, or for fraud.
                </li>
                <li>
                  <strong>Law.</strong> These terms are governed by the law of England and Wales.
                </li>
              </ul>
            </section>

            <section id="cookies" className="mt-12 scroll-mt-6">
              <h2 className="mb-4 text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">Cookies</h2>
              <p>The site sets no cookies until a choice has been made on the analytics banner, and none at all if analytics is declined.</p>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Set by</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Lasts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ls-analytics-consent</td>
                    <td>This site (local storage)</td>
                    <td>Remembers whether analytics was accepted or declined</td>
                    <td>Until cleared</td>
                  </tr>
                  <tr>
                    <td>_ga, _ga_*</td>
                    <td>Google Analytics 4 (with consent)</td>
                    <td>Distinguishes visitors and sessions for aggregate statistics</td>
                    <td>Up to 2 years</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Vercel Analytics uses no cookies and no persistent identifiers. Consent can be withdrawn by clearing this site&rsquo;s data in the browser, after which the banner appears again.
              </p>
            </section>

            <section id="accessibility" className="mt-12 scroll-mt-6">
              <h2 className="mb-4 text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">Accessibility</h2>
              <p>
                The site is built to meet WCAG 2.1 AA: every text and background pairing is 4.5:1 or better, every control is reachable and operable by keyboard with a visible focus ring, images carry alternative text, and motion respects the reduced-motion preference. Anyone who has difficulty using any part of it is asked to say so at {CONTACT.email}, so it can be fixed.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </main>
  );
}
