import type { Faq } from '@/lib/content';

/**
 * Native <details> accordion: server-rendered, no JavaScript, every answer in
 * the HTML for crawlers and tagged data-speakable for the page's
 * SpeakableSpecification. Pair with `faqNode()` in the page's JSON-LD so the
 * markup and the visible copy never disagree.
 */
export default function FaqList({ faqs, title = 'Questions', id = 'faq' }: { faqs: Faq[]; title?: string; id?: string }) {
  if (!faqs.length) return null;
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="mb-5 text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="divide-y divide-ink/10 rounded-lg border border-ink/10">
        {faqs.map((f, i) => (
          <details key={i} className="group px-5 py-4 sm:px-6" id={`${id}-${i + 1}`}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1.0625rem] font-semibold leading-snug text-ink [&::-webkit-details-marker]:hidden">
              <span>{f.question}</span>
              <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rotate-45 border-b border-r border-gold-deep transition-transform group-open:-rotate-[135deg]" />
            </summary>
            <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-muted" data-speakable>
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
