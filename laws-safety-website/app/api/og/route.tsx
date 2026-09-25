/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Site-wide branded Open Graph / social card generator.
 *
 * Renders the Laws Safety visual language, the navy ground with its radial
 * glow and 72px grid, the emblem, the wordmark, a gold eyebrow and Sora
 * type, for ANY page, so every share on LinkedIn, WhatsApp, Slack and every
 * AI-engine preview is on-brand.
 *
 * Query params:
 *   title    , main headline
 *   eyebrow  , the uppercase gold kicker (default "STEPHEN LAWS")
 *   tag      , top-right chip label (e.g. a discipline or sector)
 *   subtitle , one supporting line under the title
 */

const NAVY = '#0a1426';
const GOLD = '#d4af37';
const INK = '#e6ecf7';
const MUTED = '#a9b7d0';

async function loadAsset(request: NextRequest, path: string): Promise<ArrayBuffer> {
  const res = await fetch(new URL(path, request.url));
  if (!res.ok) throw new Error(`asset ${path} returned ${res.status}`);
  return res.arrayBuffer();
}

function toDataUrl(buf: ArrayBuffer, mime: string): string {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return `data:${mime};base64,${btoa(binary)}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawTitle = searchParams.get('title') || 'Stephen Laws';
  const eyebrow = (searchParams.get('eyebrow') || 'Stephen Laws').toUpperCase();
  const tag = searchParams.get('tag') || '';
  const subtitle = searchParams.get('subtitle') || '';

  const title = rawTitle.length > 90 ? rawTitle.slice(0, 87) + '…' : rawTitle;
  const titleSize = title.length > 60 ? 50 : title.length > 38 ? 60 : 72;

  const [sora600, sora400, emblem, wordmark] = await Promise.all([
    loadAsset(request, '/fonts/sora-latin-600-normal.woff'),
    loadAsset(request, '/fonts/sora-latin-400-normal.woff'),
    loadAsset(request, '/laws-safety-emblem-160.png').then((b) => toDataUrl(b, 'image/png')),
    loadAsset(request, '/laws-safety-wordmark-white.svg').then((b) => toDataUrl(b, 'image/svg+xml')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: NAVY,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Sora',
          color: INK,
        }}
      >
        {/* Radial hero ground */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 900px 560px at 50% 40%, #142848 0%, #0d1b33 42%, #070e1c 100%)',
            display: 'flex',
          }}
        />
        {/* Blue glow */}
        <div
          style={{
            position: 'absolute',
            left: '150px',
            top: '-260px',
            width: '900px',
            height: '900px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(66,142,236,0.32) 0%, rgba(40,96,190,0.14) 30%, rgba(10,20,38,0) 60%)',
            display: 'flex',
          }}
        />
        {/* 72px grid */}
        {[72, 144, 216, 288, 360, 432, 504, 576].map((t) => (
          <div key={`h${t}`} style={{ position: 'absolute', top: `${t}px`, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.045)', display: 'flex' }} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (i + 1) * 72).map((l) => (
          <div key={`v${l}`} style={{ position: 'absolute', left: `${l}px`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.045)', display: 'flex' }} />
        ))}
        {/* Gold hairline top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.7) 50%, rgba(212,175,55,0) 100%)', display: 'flex' }} />

        {/* Content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 72px 44px 72px', height: '100%' }}>
          {/* Top: lock-up + tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
              <img src={emblem} width={84} height={71} style={{ objectFit: 'contain' }} alt="" />
              <div style={{ width: '1px', height: '56px', background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
              <img src={wordmark} width={264} height={24} alt="Laws Safety" />
            </div>
            {tag ? (
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px 18px', borderRadius: '999px', border: `1px solid rgba(212,175,55,0.45)`, color: GOLD, fontSize: '13px', fontWeight: 600, letterSpacing: '0.22em' }}>
                {tag.toUpperCase()}
              </div>
            ) : (
              <div style={{ display: 'flex' }} />
            )}
          </div>

          {/* Middle: eyebrow + title + subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1000px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '1px', background: GOLD, opacity: 0.55, display: 'flex' }} />
              <div style={{ width: '7px', height: '7px', background: GOLD, transform: 'rotate(45deg)', display: 'flex' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.32em', color: GOLD, display: 'flex' }}>{eyebrow}</div>
            </div>
            <div style={{ display: 'flex', fontSize: `${titleSize}px`, fontWeight: 600, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.015em' }}>{title}</div>
            {subtitle ? <div style={{ display: 'flex', fontSize: '24px', fontWeight: 400, color: MUTED, lineHeight: 1.4, maxWidth: '900px' }}>{subtitle}</div> : null}
          </div>

          {/* Bottom: contact line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', fontSize: '16px', color: MUTED }}>
            <div style={{ display: 'flex' }}>Stephen@Laws-Safety.com</div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
            <div style={{ display: 'flex' }}>07792 543081</div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(212,175,55,0.4)', display: 'flex' }} />
            <div style={{ display: 'flex' }}>Wrotham, Kent</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Sora', data: sora600, weight: 600, style: 'normal' },
        { name: 'Sora', data: sora400, weight: 400, style: 'normal' },
      ],
    }
  );
}
