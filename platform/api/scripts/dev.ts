/**
 * `npm run dev -w @soyl/api` — the API on http://localhost:8787 with everything local:
 * embedded PostgreSQL (migrated + catalog + fixture users), in-memory KV, mock SMS/email/consent
 * (consent flow auto-grants), a mock Google OIDC provider on http://127.0.0.1:8090, and the dev OTP
 * outbox (GET /v1/dev/otp-outbox?to=<test identifier>). Env vars you set win over these defaults.
 * Nothing here can run in production (APP_ENV=local; config refuses dev defaults elsewhere).
 */
import { DEV_DEFAULTS } from '../src/config';
import { MockOidcServer } from '../src/dev/mock-oidc';
import { main } from '../src/index';

const publicBase = process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000';
const apiPath = process.env.API_PUBLIC_PATH ?? '/api/platform';
const oidcPort = Number(process.env.MOCK_OIDC_PORT ?? 8090);

const oidc = new MockOidcServer({
  clientId: DEV_DEFAULTS.googleClientId,
  clientSecret: DEV_DEFAULTS.googleClientSecret,
  redirectUris: [`${publicBase}${apiPath}/v1/auth/google/callback`],
  port: oidcPort,
});
const issuer = await oidc.start();
console.log(`[dev] mock Google OIDC at ${issuer} (local only)`);

const env = {
  APP_ENV: 'local',
  HOST: '127.0.0.1',
  // 8080 (the container default, D-022) is often taken on developer machines.
  PORT: '8787',
  PLATFORM_ENABLED: 'true',
  PUBLIC_BASE_URL: publicBase,
  GOOGLE_ISSUER: issuer,
  DEV_OTP_OUTBOX: 'true',
  LOG_LEVEL: 'info',
  ...process.env,
};
// The mock issuer must win unless GOOGLE_ISSUER was set explicitly.
if (!process.env.GOOGLE_ISSUER) env.GOOGLE_ISSUER = issuer;

// main() owns shutdown (SIGINT/SIGTERM close the server, pools and the embedded database); the
// mock OIDC server ends with the process.
await main(env);
