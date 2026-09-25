/**
 * Rate Limiting Utility
 * 
 * Protects API endpoints from abuse using Upstash Redis.
 * If UPSTASH credentials are not configured, falls back to a simple in-memory counter.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory fallback for development/testing
const requestCounts = new Map<string, { count: number; resetAt: number }>();

/**
 * Simple in-memory rate limiter fallback
 */
function memoryRateLimit(identifier: string, limit: number, window: number): { success: boolean; remaining: number } {
  const now = Date.now();
  const key = identifier;
  const existing = requestCounts.get(key);

  // Reset if window expired
  if (!existing || now > existing.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + window });
    return { success: true, remaining: limit - 1 };
  }

  // Increment count
  existing.count++;
  
  if (existing.count > limit) {
    return { success: false, remaining: 0 };
  }

  return { success: true, remaining: limit - existing.count };
}

/**
 * Create a rate limiter instance
 * 
 * @param requests - Number of requests allowed
 * @param window - Time window in seconds
 * @returns Rate limiter instance
 */
export function createRateLimit(requests: number, window: number) {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  const memoryLimit = async (identifier: string) => {
    const result = memoryRateLimit(identifier, requests, window * 1000);
    return {
      success: result.success,
      limit: requests,
      remaining: result.remaining,
      reset: Date.now() + window * 1000,
      pending: Promise.resolve(),
    };
  };

  // Use Upstash if credentials are available
  if (upstashUrl && upstashToken) {
    const redis = new Redis({ url: upstashUrl, token: upstashToken });
    const upstash = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(requests, `${window} s`),
      analytics: true,
      prefix: 'laws-safety-ratelimit',
    });

    // Wrap so a rate-limiter outage NEVER takes down the endpoint. If Upstash
    // is unreachable (DNS, bad creds, network blip) we fail over to the
    // in-memory counter instead of throwing a 500 from every protected route.
    return {
      limit: async (identifier: string) => {
        try {
          return await upstash.limit(identifier);
        } catch (err) {
          console.error('[rate-limit] Upstash unavailable, failing over to in-memory:', err instanceof Error ? err.message : String(err));
          return memoryLimit(identifier);
        }
      },
    };
  }

  // Fallback to in-memory rate limiting
  console.warn('⚠️  UPSTASH_REDIS credentials not found. Using in-memory rate limiting (not suitable for production with multiple instances).');
  return { limit: memoryLimit };
}

/**
 * Pre-configured rate limiters for different use cases
 */
export const rateLimiters = {
  // Strict: Form submissions (10 requests per 60 seconds)
  strict: createRateLimit(10, 60),
  
  // Standard: General API calls (30 requests per 60 seconds)
  standard: createRateLimit(30, 60),
  
  // Lenient: Read-only operations (100 requests per 60 seconds)
  lenient: createRateLimit(100, 60),
};

/**
 * Get client identifier from request
 * Uses IP address with fallback to a generic identifier
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = forwardedFor?.split(',')[0].trim() || realIp || cfConnectingIp;
  
  if (ip) {
    return ip;
  }

  // Fallback: use a combination of user-agent and a generic identifier
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `anonymous-${userAgent.slice(0, 50)}`;
}
