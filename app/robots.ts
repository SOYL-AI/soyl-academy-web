import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/config';

/**
 * AI answer-engine and search crawlers that are explicitly welcome.
 * Being listed by name makes the policy unambiguous for generative engines
 * (ChatGPT search, Perplexity, Claude, Gemini, Apple Intelligence, etc.).
 * Remove a name from this list to opt that crawler out.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
  'meta-externalagent',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
