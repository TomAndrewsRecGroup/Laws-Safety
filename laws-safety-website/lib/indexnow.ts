/**
 * IndexNow utility for the Laws Safety website.
 *
 * The key is INDEXNOW_API_KEY in the environment (32 hex characters; generate
 * with `openssl rand -hex 32`). It is served at /{key}.txt through a build-time
 * rewrite in next.config.mjs to app/api/indexnow/key/route.ts, so the search
 * engines can verify ownership.
 */

import { BASE_URL } from './site';
import { getAllStaticUrlStrings } from './site-urls';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export function indexNowKey(): string {
  return process.env.INDEXNOW_API_KEY || '';
}

export async function submitUrlsToIndexNow(urls: string[]): Promise<{ success: boolean; status?: number; error?: string }> {
  if (!urls.length) return { success: false, error: 'No URLs provided' };

  const key = indexNowKey();
  if (!key) return { success: false, error: 'INDEXNOW_API_KEY is not set' };

  const body = {
    // Must match the host of the submitted URLs (the canonical www host).
    host: new URL(BASE_URL).host,
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      console.log(`[IndexNow] Submitted ${urls.length} URL(s). Status: ${res.status}`);
      return { success: true, status: res.status };
    }
    const text = await res.text();
    console.error(`[IndexNow] Submission failed. Status: ${res.status}`, text);
    return { success: false, status: res.status, error: text };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[IndexNow] Network error:', message);
    return { success: false, error: message };
  }
}

export async function submitUrlToIndexNow(url: string) {
  return submitUrlsToIndexNow([url]);
}

/** Submit every URL in the registry, in batches of 100. */
export async function submitAllSitemapUrls(): Promise<{ success: boolean; status?: number; error?: string }> {
  const allUrls = getAllStaticUrlStrings();
  const BATCH_SIZE = 100;
  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const result = await submitUrlsToIndexNow(allUrls.slice(i, i + BATCH_SIZE));
    if (!result.success) return result;
  }
  return { success: true };
}
