/**
 * Sanity CMS Client
 *
 * Gracefully handles missing credentials — the site works
 * without Sanity by falling back to local content files.
 */

interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
}

function getSanityConfig(): SanityConfig | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId) {
    return null;
  }

  return {
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
  };
}

export function isSanityConfigured(): boolean {
  return getSanityConfig() !== null;
}

/**
 * Fetch content from Sanity.
 * Returns null if Sanity is not configured.
 */
export async function fetchFromSanity<T>(
  query: string,
  params?: Record<string, string>
): Promise<T | null> {
  const config = getSanityConfig();
  if (!config) {
    return null;
  }

  try {
    const searchParams = new URLSearchParams({
      query,
      ...params,
    });

    const url = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/data/query/${config.dataset}?${searchParams}`;

    const headers: Record<string, string> = {};
    if (config.token) {
      headers['Authorization'] = `Bearer ${config.token}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Sanity fetch failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.result as T;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
