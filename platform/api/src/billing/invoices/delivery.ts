/**
 * Invoice delivery dependencies for processes other than the API (the worker's `billing.invoices` sweep),
 * built from the same environment variables the API uses (ADR-024):
 *
 *   BLOB_PROVIDER / BLOB_ACCOUNT_URL / BLOB_ACCOUNT_KEY   as for AI uploads (ai/config.ts); PDFs go to the
 *                                                        private `invoices` container
 *   EMAIL_PROVIDER=acs + ACS_ENDPOINT + EMAIL_FROM       as for sign-in emails (config.ts); managed identity
 *
 * Without ACS settings the sweep issues and renders but sends nothing (the email waits; nothing is lost).
 */
import { AZURE_RESOURCES, defaultTokenProvider } from '@soyl/shared/azure/identity';
import { loadAiConfig } from '../../ai/config';
import { AzureBlobStore, DisabledBlobStore, MemoryBlobStore, type BlobStore } from '../../ai/blob';
import { managedIdentityCredential } from '../../ai/runtime';
import { AcsEmailSender, MockEmailSender, type EmailSender } from '../../auth/senders/email';
import type { Config } from '../../config';

export type { EmailSender };
export { MockEmailSender };

export interface DeliveryEnv {
  appEnv: string;
  env: Record<string, string | undefined>;
}

const flags = (appEnv: string) => ({ isLocal: appEnv === 'local' || appEnv === 'test', isProduction: appEnv === 'prod', appEnv: appEnv as Config['appEnv'] });

export function invoiceBlobStore({ appEnv, env }: DeliveryEnv, now: () => number = Date.now): BlobStore {
  const blob = loadAiConfig(flags(appEnv), env).blob;
  if (blob.provider === 'azure') return new AzureBlobStore({ accountUrl: blob.accountUrl!, accountKey: blob.accountKey, credential: blob.accountKey ? undefined : managedIdentityCredential(), now });
  if (blob.provider === 'memory') return new MemoryBlobStore(now);
  return new DisabledBlobStore();
}

export function invoiceEmailSender({ appEnv, env }: DeliveryEnv): EmailSender | null {
  const endpoint = env.ACS_ENDPOINT ?? env.ACS_EMAIL_ENDPOINT;
  if (env.EMAIL_PROVIDER === 'acs' && endpoint?.startsWith('https://')) {
    const tokens = defaultTokenProvider();
    return new AcsEmailSender({ endpoint, from: env.EMAIL_FROM ?? 'SOYL Academy <noreply@soylai.com>', getToken: async () => (await tokens.getToken(AZURE_RESOURCES.communication)).token });
  }
  // Local development: an in-memory outbox (GEN-3: never outside local/test).
  return flags(appEnv).isLocal ? new MockEmailSender() : null;
}
