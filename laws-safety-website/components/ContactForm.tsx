'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { trackEvent } from '@/lib/analytics';
import { CONTACT } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'w-full rounded-sm border border-ink/20 bg-surface px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-muted/70 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 min-h-[44px]';

/**
 * The "Get in touch" form. Posts JSON to /api/contact. Carries a honeypot
 * (`company_website`) and a render timestamp (`renderedAt`) that the API's
 * spam guard checks; neither is visible to a person.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [renderedAt, setRenderedAt] = useState<number>(0);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, renderedAt }),
      });
      const json = (await res.json()) as { success: boolean; message?: string };
      if (res.ok && json.success) {
        setStatus('sent');
        form.reset();
        trackEvent('contact_form_submit', { location: 'contact_page' });
      } else {
        setStatus('error');
        setMessage(json.message || 'The message could not be sent. Please email Stephen directly.');
      }
    } catch {
      setStatus('error');
      setMessage('The message could not be sent. Please email Stephen directly.');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-lg border border-gold/40 bg-surface-raised p-6">
        <p className="eyebrow mb-2">Sent</p>
        <p className="text-lg font-semibold text-ink">Thank you. Your message has reached Stephen.</p>
        <p className="mt-2 text-sm text-ink-muted">He replies from {CONTACT.email}, so that address is worth adding to your contacts.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="form-note">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Your name <span className="text-gold-ink">*</span>
          </label>
          <input id="name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="organisation" className="mb-1.5 block text-sm font-medium text-ink">
            Organisation
          </label>
          <input id="organisation" name="organisation" type="text" maxLength={120} autoComplete="organization" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email <span className="text-gold-ink">*</span>
          </label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" maxLength={20} autoComplete="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message <span className="text-gold-ink">*</span>
        </label>
        <textarea id="message" name="message" required minLength={10} maxLength={3000} rows={6} className={inputClass} />
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-sm border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
          {message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy-800 transition hover:bg-gold-bright disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending…' : 'Send to Stephen'}
        </button>
        <p id="form-note" className="text-xs leading-relaxed text-ink-muted">
          Your details are used only to reply to you. See the <a href="/legal#privacy" className="underline decoration-gold/50 underline-offset-2 hover:text-blue">privacy notice</a>.
        </p>
      </div>
    </form>
  );
}
