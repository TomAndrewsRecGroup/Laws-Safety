/**
 * /api/indexnow
 *
 * Secured API route to trigger IndexNow URL submissions (pings Bing and other
 * IndexNow search engines with our latest pages).
 *
 * GET  , used by the Vercel Cron job. Submits ALL static sitemap URLs.
 *        Authenticated by CRON_SECRET (Vercel auto-attaches it as a Bearer
 *        header) or INDEXNOW_SUBMIT_SECRET.
 * POST , manual trigger.
 *        Body: { "all": true }  , submit all static sitemap URLs
 *              { "urls": [...] } , submit specific URLs
 *        Authenticated by INDEXNOW_SUBMIT_SECRET (Bearer).
 *
 * Example:
 *   curl -X POST https://www.laws-safety.com/api/indexnow \
 *     -H "Authorization: Bearer YOUR_SECRET" -H "Content-Type: application/json" \
 *     -d '{"all": true}'
 */

import { createHash, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { submitAllSitemapUrls, submitUrlsToIndexNow } from '@/lib/indexnow';
import { PRIMARY_HOST } from '@/lib/site';

const ALLOWED_HOST = PRIMARY_HOST;

// Give the cron sweep room to submit every batch to IndexNow. Vercel clamps
// this to the plan's ceiling automatically.
export const maxDuration = 60;

/** Constant-time secret comparison (hash first so lengths always match). */
function secretsMatch(a: string, b: string): boolean {
  if (!a || !b) return false;
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Extract a Bearer token from the Authorization header. */
function bearerToken(req: NextRequest): string {
  const authHeader = (req.headers.get('authorization') ?? '').trim();
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
}

/**
 * GET , the scheduled Vercel Cron entry point. Submits every static sitemap
 * URL. Accepts either CRON_SECRET (Vercel injects it as a Bearer header on
 * cron invocations) or INDEXNOW_SUBMIT_SECRET, so it works no matter which
 * one is configured.
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const submitSecret = process.env.INDEXNOW_SUBMIT_SECRET;

  if (!cronSecret && !submitSecret) {
    return NextResponse.json(
      { error: 'Server misconfiguration: set CRON_SECRET or INDEXNOW_SUBMIT_SECRET' },
      { status: 500 }
    );
  }

  const token = bearerToken(req);
  const authorised =
    (cronSecret && secretsMatch(token, cronSecret)) ||
    (submitSecret && secretsMatch(token, submitSecret));

  if (!authorised) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await submitAllSitemapUrls();
  return NextResponse.json(result, { status: result.success ? 200 : 502 });
}

export async function POST(req: NextRequest) {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'Server misconfiguration: INDEXNOW_SUBMIT_SECRET not set' },
      { status: 500 }
    );
  }

  if (!secretsMatch(bearerToken(req), secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { urls?: string[]; all?: boolean };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body.all === true) {
    const result = await submitAllSitemapUrls();
    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  }

  if (Array.isArray(body.urls) && body.urls.length > 0) {
    // Only submit URLs that belong to our own host, IndexNow enforces host
    // ownership too, but reject early so we never forward foreign URLs.
    const invalid = body.urls.filter((u) => {
      try { return new URL(u).hostname.replace(/^www\./, '') !== ALLOWED_HOST; }
      catch { return true; }
    });
    if (invalid.length > 0) {
      return NextResponse.json(
        { error: `All URLs must belong to ${ALLOWED_HOST}`, invalid },
        { status: 400 }
      );
    }
    const result = await submitUrlsToIndexNow(body.urls);
    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  }

  return NextResponse.json(
    { error: 'Provide either { urls: [...] } or { all: true }' },
    { status: 400 }
  );
}
