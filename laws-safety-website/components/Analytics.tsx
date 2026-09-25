'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

const CONSENT_KEY = 'ls-analytics-consent';
type Consent = 'granted' | 'denied' | null;

function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

/**
 * Analytics with consent.
 *
 * Vercel Analytics is cookieless and privacy-preserving, so it runs without
 * a banner. Google Analytics 4 sets cookies, which under PECR needs consent
 * first, so the gtag script is only injected after the visitor accepts, and
 * the choice is remembered in localStorage. With no measurement id
 * configured nothing GA-related renders at all.
 */
export default function Analytics({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Private mode or blocked storage: the banner will simply show again next visit.
    }
    setConsent(value);
  };

  return (
    <>
      <VercelAnalytics />
      {gaId && consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {gaId && ready && consent === null && (
        <div role="dialog" aria-live="polite" aria-label="Analytics cookies" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-lg border border-ink/15 bg-surface p-4 shadow-card sm:inset-x-auto sm:right-4 sm:bottom-4">
          <p className="text-sm leading-relaxed text-ink">
            This site uses Google Analytics to understand how it is read. Analytics cookies are set only if you accept.{' '}
            <a href="/legal#cookies" className="underline decoration-gold/50 underline-offset-2 hover:text-blue">
              About cookies
            </a>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose('granted')} className="inline-flex min-h-[40px] items-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy-800 transition hover:bg-gold-bright">
              Accept
            </button>
            <button type="button" onClick={() => choose('denied')} className="inline-flex min-h-[40px] items-center rounded-md border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/50">
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
