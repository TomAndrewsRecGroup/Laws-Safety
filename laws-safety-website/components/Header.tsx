'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { BrandLink } from '@/components/Brand';
import { paths } from '@/lib/content';

/**
 * Site header. Sits on the navy hero of every page, so it is dark-themed
 * throughout. Every link is a real <a href> in the server HTML, which is what
 * the link-graph guardrail (scripts/link-graph.mjs) depends on.
 */
export const NAV_LINKS = [
  { label: 'About', href: paths.about },
  { label: 'Expertise', href: paths.expertise },
  { label: 'Sectors', href: paths.sectors },
  { label: 'Locations', href: paths.locations },
  { label: 'Guides', href: paths.insights },
  { label: 'Contact', href: paths.contact },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="theme-dark relative z-50 bg-navy-800">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold-rule" aria-hidden />
      <nav aria-label="Main" className="mx-auto flex max-w-site items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <BrandLink priority />

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`relative py-2 text-[15px] font-medium transition-colors hover:text-gold-bright ${isActive(l.href) ? 'text-white' : 'text-ink-light-soft'}`}
              >
                {l.label}
                {isActive(l.href) && <span aria-hidden className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-gold" />}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.8} /> : <Menu className="h-5 w-5" strokeWidth={1.8} />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-navy-800 shadow-card-dark lg:hidden"
      >
        <ul className="mx-auto max-w-site px-4 py-3 sm:px-6">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-md px-3 py-3.5 text-base font-medium transition hover:bg-white/5 ${isActive(l.href) ? 'text-white' : 'text-ink-light-soft'}`}
              >
                <span aria-hidden className={`h-1.5 w-1.5 rotate-45 ${isActive(l.href) ? 'bg-gold' : 'bg-gold/40'}`} />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open && <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default bg-black/50 lg:hidden" />}
    </header>
  );
}
