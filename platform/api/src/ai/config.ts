/**
 * AI gateway configuration (ARCHITECTURE §19 names). Read once at start-up from the environment and
 * validated; invalid values stop the server, like the rest of config.ts.
 *
 *   AI_PROVIDER                 mock | azure | disabled   (default: mock in local/test, disabled elsewhere)
 *   AI_EMBEDDINGS               mock | azure | disabled   (default: follows AI_PROVIDER)
 *   AI_DAILY_SPEND_CAP_INR      global daily AI spend cap in rupees (default 2000, owner's figure)
 *   CONTENT_SAFETY_PROVIDER     local | azure | disabled  (default: local in local/test, disabled elsewhere)
 *   AZURE_CONTENT_SAFETY_ENDPOINT  https://<name>.cognitiveservices.azure.com
 *   BLOB_PROVIDER               memory | azure | disabled (default: memory in local/test, disabled elsewhere)
 *   BLOB_ACCOUNT_URL            https://<account>.blob.core.windows.net (or Azurite's URL locally)
 *   BLOB_ACCOUNT_KEY            Azurite/local only: shared-key signing. Production uses user-delegation SAS (keyless).
 *
 * GEN-3: mock/local stand-ins refuse APP_ENV=prod. "disabled" is the fail-closed default outside
 * local/test: AI answers 503 until the real service is configured (F-027, D-031).
 */
import { z } from 'zod/v4';
import { AI_SPEND } from '@soyl/shared/config/credits';
import type { Config } from '../config';
import { ConfigError } from '../config';

export interface AiConfig {
  provider: 'mock' | 'azure' | 'disabled';
  embeddings: 'mock' | 'azure' | 'disabled';
  dailySpendCapPaise: number;
  contentSafety: { provider: 'local' | 'azure' | 'disabled'; endpoint?: string };
  blob: { provider: 'memory' | 'azure' | 'disabled'; accountUrl?: string; accountKey?: string };
}

const AiEnv = z.object({
  AI_PROVIDER: z.enum(['mock', 'azure', 'disabled']).optional(),
  AI_EMBEDDINGS: z.enum(['mock', 'azure', 'disabled']).optional(),
  AI_DAILY_SPEND_CAP_INR: z.coerce.number().min(0).max(10_000_000).optional(),
  CONTENT_SAFETY_PROVIDER: z.enum(['local', 'azure', 'disabled']).optional(),
  AZURE_CONTENT_SAFETY_ENDPOINT: z.url().optional(),
  BLOB_PROVIDER: z.enum(['memory', 'azure', 'disabled']).optional(),
  BLOB_ACCOUNT_URL: z.url().optional(),
  BLOB_ACCOUNT_KEY: z.string().optional(),
});

export function loadAiConfig(config: Pick<Config, 'isLocal' | 'isProduction' | 'appEnv'>, env: Record<string, string | undefined> = process.env): AiConfig {
  const parsed = AiEnv.safeParse(env);
  if (!parsed.success) throw new ConfigError(parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`));
  const e = parsed.data;
  const problems: string[] = [];
  const provider = e.AI_PROVIDER ?? (config.isLocal ? 'mock' : 'disabled');
  const embeddings = e.AI_EMBEDDINGS ?? (provider === 'azure' ? 'azure' : provider === 'mock' ? 'mock' : 'disabled');
  const safety = e.CONTENT_SAFETY_PROVIDER ?? (config.isLocal ? 'local' : 'disabled');
  const blob = e.BLOB_PROVIDER ?? (config.isLocal ? 'memory' : 'disabled');
  if (config.isProduction) {
    if (provider === 'mock') problems.push('AI_PROVIDER=mock cannot run with APP_ENV=prod (GEN-3)');
    if (embeddings === 'mock') problems.push('AI_EMBEDDINGS=mock cannot run with APP_ENV=prod (GEN-3)');
    if (safety === 'local') problems.push('CONTENT_SAFETY_PROVIDER=local is a stand-in and cannot run with APP_ENV=prod (GEN-3)');
    if (blob === 'memory') problems.push('BLOB_PROVIDER=memory cannot run with APP_ENV=prod (GEN-3)');
    if (e.BLOB_ACCOUNT_KEY) problems.push('BLOB_ACCOUNT_KEY is for Azurite/local only; production uses keyless user-delegation SAS');
  }
  if (safety === 'azure' && !e.AZURE_CONTENT_SAFETY_ENDPOINT) problems.push('AZURE_CONTENT_SAFETY_ENDPOINT is required for CONTENT_SAFETY_PROVIDER=azure');
  if (safety === 'azure' && e.AZURE_CONTENT_SAFETY_ENDPOINT && !e.AZURE_CONTENT_SAFETY_ENDPOINT.startsWith('https://'))
    problems.push('AZURE_CONTENT_SAFETY_ENDPOINT must be https');
  if (blob === 'azure' && !e.BLOB_ACCOUNT_URL) problems.push('BLOB_ACCOUNT_URL is required for BLOB_PROVIDER=azure');
  if (blob === 'azure' && e.BLOB_ACCOUNT_URL && !config.isLocal && !e.BLOB_ACCOUNT_URL.startsWith('https://')) problems.push('BLOB_ACCOUNT_URL must be https outside local/test');
  if (problems.length) throw new ConfigError(problems);
  return {
    provider,
    embeddings,
    dailySpendCapPaise: Math.round((e.AI_DAILY_SPEND_CAP_INR ?? AI_SPEND.dailyCapInrDefault) * 100),
    contentSafety: { provider: safety, endpoint: e.AZURE_CONTENT_SAFETY_ENDPOINT },
    blob: { provider: blob, accountUrl: e.BLOB_ACCOUNT_URL, accountKey: e.BLOB_ACCOUNT_KEY },
  };
}
