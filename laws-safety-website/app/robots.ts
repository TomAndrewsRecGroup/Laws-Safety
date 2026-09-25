import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/site';

/**
 * Crawl policy. The AI crawlers are named explicitly so the site is
 * unambiguously available to answer engines (this is what llms.txt and the
 * speakable FAQ markup are for). /api/og is allowed because it renders the
 * Open Graph cards every page references.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og', '/api/og/'],
        disallow: ['/api/', '/_next/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'CoherePBot', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
      { userAgent: 'MistralAI-User', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
