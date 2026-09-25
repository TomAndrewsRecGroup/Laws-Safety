import { NextResponse } from 'next/server';
import { indexNowKey } from '@/lib/indexnow';

/**
 * The IndexNow key file. next.config.mjs rewrites /{INDEXNOW_API_KEY}.txt to
 * this handler at build time, so the public URL the search engines verify
 * against stays outside /api/ (which robots.txt disallows) and unknown paths
 * keep the normal 404 page.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const key = indexNowKey();
  if (!key) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(key, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
}
