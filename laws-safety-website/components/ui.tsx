import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Page-body section: white ground, site max width, section spacing. */
export function Section({ children, className = '', id, raised = false }: { children: ReactNode; className?: string; id?: string; raised?: boolean }) {
  return (
    <section id={id} className={`${raised ? 'bg-surface-raised' : 'bg-surface'} py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Eyebrow + heading + optional intro, left-aligned in the body. */
export function SectionHeading({ eyebrow, title, intro, as: Tag = 'h2' }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; as?: 'h2' | 'h3' }) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className="text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink sm:text-[2.125rem]">{title}</Tag>
      {intro && <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>}
    </div>
  );
}

const btnBase = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition focus-visible:outline-none';

/** Primary button: gold fill, navy text, on both grounds. */
export function ButtonLink({ href, children, variant = 'primary', className = '', external = false }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'secondary-dark'; className?: string; external?: boolean }) {
  const styles =
    variant === 'primary'
      ? 'bg-gold text-navy-800 hover:bg-gold-bright'
      : variant === 'secondary-dark'
        ? 'border border-gold/40 text-ink-light hover:border-gold hover:text-white'
        : 'border border-ink/15 text-ink hover:border-ink/40';
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${btnBase} ${styles} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${btnBase} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/** A card that is a link. The whole card is the anchor, so it counts in the link graph. */
export function LinkCard({ href, title, text, meta, className = '' }: { href: string; title: string; text?: string; meta?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col rounded-lg border border-ink/10 bg-surface p-5 shadow-none transition hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card sm:p-6 ${className}`}
    >
      {meta && <span className="eyebrow mb-3 !text-[10px]">{meta}</span>}
      <span className="text-[1.125rem] font-semibold leading-snug text-ink">{title}</span>
      {text && <span className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</span>}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-gold-ink transition group-hover:gap-2.5">
        Read more
        <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
      </span>
    </Link>
  );
}

/** A quiet inline link list, for related items. */
export function PillLinks({ items, ariaLabel }: { items: { href: string; label: string }[]; ariaLabel: string }) {
  if (!items.length) return null;
  return (
    <ul aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href} className="inline-flex min-h-[40px] items-center rounded-full border border-ink/12 px-4 py-2 text-sm text-ink transition hover:border-gold hover:text-ink">
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** A definition-style list of short facts. */
export function FactList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-ink/10 rounded-lg border border-ink/10">
      {items.map((i) => (
        <div key={i.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">{i.label}</dt>
          <dd className="text-sm leading-relaxed text-ink">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
