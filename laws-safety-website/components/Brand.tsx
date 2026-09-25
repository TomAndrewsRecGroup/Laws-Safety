import Image from 'next/image';
import Link from 'next/link';
import { ASSETS, SITE_NAME } from '@/lib/site';

/**
 * The emblem: the crystal eagle, transparent PNG. `size` is the rendered
 * height in px; width follows the 542:456 ratio. The master is 1626x1368
 * (3x), so it stays sharp on high-density screens; pass `quality` and
 * `sizes` where it is shown large.
 */
export function Emblem({ size = 40, className = '', priority = false, shadow = false, fluid = false, quality, sizes }: { size?: number; className?: string; priority?: boolean; shadow?: boolean; fluid?: boolean; quality?: number; sizes?: string }) {
  const width = Math.round((size * 542) / 456);
  return (
    <Image
      src={size > 160 ? ASSETS.emblem : ASSETS.emblemSmall}
      alt={`${SITE_NAME} emblem`}
      width={width}
      height={size}
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={`${shadow ? 'drop-shadow-[0_26px_48px_rgba(0,0,0,0.62)]' : ''} ${fluid ? 'h-auto' : ''} ${className}`}
      style={fluid ? undefined : { width, height: size }}
    />
  );
}

/**
 * The LAWS SAFETY wordmark. A single-path SVG, white on navy or navy on
 * white; there is no other colour. `width` in px; the file's ratio is 2507:228.
 */
export function Wordmark({ onDark = true, width = 160, className = '', priority = false, fluid = false }: { onDark?: boolean; width?: number; className?: string; priority?: boolean; fluid?: boolean }) {
  const height = Math.round((width * 228) / 2507);
  return (
    <Image
      src={onDark ? ASSETS.wordmarkWhite : ASSETS.wordmarkNavy}
      alt={SITE_NAME}
      width={width}
      height={height}
      priority={priority}
      className={`${fluid ? 'h-auto' : ''} ${className}`}
      style={fluid ? undefined : { width, height }}
    />
  );
}

/** The horizontal lock-up used in the header and footer: emblem, gold rule, wordmark. */
export function LockUp({ onDark = true, emblemSize = 40, wordmarkWidth = 150, priority = false }: { onDark?: boolean; emblemSize?: number; wordmarkWidth?: number; priority?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3 sm:gap-4">
      <Emblem size={emblemSize} priority={priority} />
      <span aria-hidden className="block w-px self-stretch" style={{ background: 'rgba(212,175,55,0.4)' }} />
      <Wordmark onDark={onDark} width={wordmarkWidth} priority={priority} />
    </span>
  );
}

/** Lock-up as the home link. */
export function BrandLink({ onDark = true, priority = false }: { onDark?: boolean; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${SITE_NAME} home`} className="inline-flex items-center rounded-md">
      <LockUp onDark={onDark} priority={priority} />
    </Link>
  );
}

/** The centrepiece ornament: rule, diamond, rule. */
export function Diamond({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-center gap-[14px] ${className}`}>
      <span className="block h-px w-[72px] bg-gold/55" />
      <span className="block h-[7px] w-[7px] rotate-45 bg-gold" />
      <span className="block h-px w-[72px] bg-gold/55" />
    </span>
  );
}
