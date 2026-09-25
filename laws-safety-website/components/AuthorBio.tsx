import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Emblem } from '@/components/Brand';
import { PROFILE, paths } from '@/lib/content';
import { PERSON_NAME } from '@/lib/site';

/** Byline card for the guides: who Stephen is, in one paragraph, with the link to his record. */
export default function AuthorBio() {
  return (
    <aside aria-label="About the author" className="rounded-lg border border-ink/10 bg-surface-raised p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-navy-800">
          {PROFILE.photo ? <Image src={PROFILE.photo.avatar ?? PROFILE.photo.src} alt={PROFILE.photo.alt} width={64} height={64} className="h-full w-full object-cover" /> : <Emblem size={34} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="eyebrow mb-1 !text-[10px]">Written by</p>
          <p className="text-[1.125rem] font-semibold leading-tight text-ink">{PERSON_NAME}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{PROFILE.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
            <Link href={paths.about} className="text-gold-ink transition hover:text-blue">
              About Stephen
            </Link>
            {PROFILE.linkedin && (
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gold-ink transition hover:text-blue">
                <Linkedin className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                Connect on LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
