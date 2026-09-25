import type { ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import type { Crumb } from '@/lib/schema';

/**
 * The navy hero every inner page opens with: the header, breadcrumbs, an
 * eyebrow, the H1 and a lead, over the brand's radial ground and 72px grid.
 * Exactly one <h1> per page lives here.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  aside,
  compact = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="theme-dark relative overflow-hidden bg-navy-800 text-ink-light">
      <div className="absolute inset-0 bg-hero-radial" aria-hidden />
      <div
        className="absolute inset-0 bg-hero-grid bg-grid opacity-90"
        style={{ backgroundPosition: '36px 20px', maskImage: 'radial-gradient(ellipse 70% 80% at 50% 30%, #000 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 30%, #000 0%, transparent 100%)' }}
        aria-hidden
      />
      <div className="relative">
        <Header />
        <section className={`relative mx-auto max-w-site px-4 sm:px-6 lg:px-8 ${compact ? 'pb-10 pt-8 sm:pb-12 sm:pt-10' : 'pb-14 pt-10 sm:pb-20 sm:pt-14'}`}>
          <div className={`grid gap-10 ${aside ? 'lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center' : ''}`}>
            <div className="max-w-3xl">
              {crumbs && crumbs.length > 1 && (
                <nav aria-label="Breadcrumb" className="mb-5">
                  <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-light-muted">
                    {crumbs.map((c, i) => {
                      const last = i === crumbs.length - 1;
                      return (
                        <li key={c.path} className="flex items-center gap-2">
                          {last ? (
                            <span aria-current="page" className="text-ink-light-soft">
                              {c.name}
                            </span>
                          ) : (
                            <Link href={c.path} className="transition hover:text-gold-bright">
                              {c.name}
                            </Link>
                          )}
                          {!last && <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/50" />}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              )}
              {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
              <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.015em] text-white sm:text-[2.75rem] lg:text-[3rem]">{title}</h1>
              {lead && <div className="mt-5 max-w-2xl text-pretty text-lg font-light leading-relaxed text-ink-light-muted">{lead}</div>}
              {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>}
            </div>
            {aside && <div className="relative">{aside}</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
