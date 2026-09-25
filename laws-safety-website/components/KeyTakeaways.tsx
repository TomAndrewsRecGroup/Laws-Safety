import type { ReactNode } from 'react';

/**
 * Extractable "Key facts" block near the top of a page: three to six short,
 * self-contained, quotable statements. Every item is tagged data-speakable so
 * it is eligible for the page's SpeakableSpecification, and the block reads as
 * a TL;DR that answer engines can lift verbatim. Server-rendered, no JS.
 */
export default function KeyTakeaways({ items, title = 'Key facts' }: { items: ReactNode[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section aria-label={title} className="mb-10 rounded-lg border border-gold/40 bg-surface-raised p-5 sm:p-6">
      <p className="eyebrow mb-3">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink sm:text-base">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep" />
            <span data-speakable>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
