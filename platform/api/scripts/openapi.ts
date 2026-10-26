/**
 * `npm run openapi -w @soyl/api` → writes platform/api/openapi.json from the registered routes.
 * No database connection is made (the pool is lazy). web-platform generates its typed client from
 * the committed file; test/openapi.test.ts fails when the file is stale.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createDb } from '@soyl/db';
import { buildApp } from '../src/app';
import { systemClock } from '../src/clock';
import { loadConfig } from '../src/config';
import { MemoryKv } from '../src/kv';
import { MockEmailSender } from '../src/auth/senders/email';
import { MockSmsSender } from '../src/auth/senders/sms';
import { MockConsentProvider } from '../src/consent/mock';

export async function generateOpenApi(): Promise<string> {
  const config = loadConfig({ APP_ENV: 'local', PLATFORM_ENABLED: 'true', LOG_LEVEL: 'silent', PUBLIC_BASE_URL: 'https://www.soylai.com' });
  const { db, close } = createDb('postgres://openapi:unused@127.0.0.1:1/unused', { max: 1 });
  const app = await buildApp({
    config,
    db,
    kv: new MemoryKv(),
    clock: systemClock,
    providers: { sms: new MockSmsSender(), email: new MockEmailSender(), consent: new MockConsentProvider() },
  });
  const spec = app.swagger();
  await app.close();
  await close();
  return `${JSON.stringify(spec, null, 2)}\n`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = fileURLToPath(new URL('../openapi.json', import.meta.url));
  writeFileSync(out, await generateOpenApi());
  console.log(`wrote ${out}`);
}
