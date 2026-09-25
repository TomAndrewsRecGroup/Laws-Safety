/**
 * Lightweight GA4 event helper.
 *
 * gtag is loaded in app/layout.tsx. This wrapper is safe to call from any
 * client component: if analytics has not loaded (or is blocked), it no-ops
 * instead of throwing. Use it to record conversions such as form submissions
 * and CV scans so they show up as GA4 events.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', name, params);
  } catch {
    // Never let analytics break a user flow.
  }
}
