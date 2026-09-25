import Link from 'next/link';
import type { Band } from '@/lib/links';

/**
 * Contextual "go deeper" band at the end of a page's body. Renders the links
 * lib/links.ts computed for the page, inside <main>, so they count as
 * in-content links in the link graph rather than chrome.
 */
const GRID_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export default function InternalLinkBand({ band }: { band: Band }) {
  const cols = GRID_COLS[band.links.length] ?? 'lg:grid-cols-3';
  return (
    <section aria-labelledby="go-deeper" className="bg-surface-raised py-12 sm:py-14">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-2">Go deeper</p>
        <h2 id="go-deeper" className="text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">
          {band.heading}
        </h2>
        <p className="mb-6 mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">{band.intro}</p>
        <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${cols}`}>
          {band.links.map((l) => (
            <Link key={l.href} href={l.href} className="group rounded-lg border border-ink/10 bg-surface p-5 transition hover:border-gold/60 hover:shadow-card">
              <span className="block text-[15px] font-semibold leading-snug text-ink transition group-hover:text-blue">{l.anchor}</span>
              <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">{l.blurb}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
