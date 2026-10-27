import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Ports and environment for the platform web e2e. Separate ports from `npm run dev` (3000/8787/8090) so a
 * developer's running servers never collide with the suite.
 */
export const WEB_PORT = Number(process.env.PW_WEB_PORT ?? 3320);
export const FLAG_OFF_PORT = Number(process.env.PW_FLAG_OFF_PORT ?? 3321);
export const API_PORT = Number(process.env.PW_API_PORT ?? 8797);
export const OIDC_PORT = Number(process.env.PW_OIDC_PORT ?? 8098);
/** M3/M4: the e2e API's control server (api-e2e.ts): Blob upload stand-in, Razorpay payments, time travel. */
export const CONTROL_PORT = Number(process.env.PW_CONTROL_PORT ?? 8799);
export const CONTROL_ORIGIN = `http://127.0.0.1:${CONTROL_PORT}`;

/** The API's PUBLIC_BASE_URL / allowed Origin must match exactly what the browser uses (AUTH-12). */
export const WEB_ORIGIN = `http://localhost:${WEB_PORT}`;
export const API_ORIGIN = `http://127.0.0.1:${API_PORT}`;

/** Public development secret, accepted only by an API with APP_ENV=local (ADR-005 "Local development"). */
export const LOCAL_EDGE_SECRET = 'local-dev-edge-secret-not-for-deployment-000000'; // gitleaks:allow (public local-only value, ADR-005)

/**
 * M2 listen mode: the e2e serves narration from a fake CDN origin (allowed by WEB-1 as "the CDN origin");
 * Playwright fulfils its requests from the mock-TTS blob directory below (learning.spec.ts).
 */
export const E2E_CDN_BASE = 'https://cdn.e2e.invalid/public';
export const AUDIO_DIR = fileURLToPath(new URL('../../../test-results/platform-web/audio/', import.meta.url));

export const WEB_ENV_ON = {
  NEXT_PUBLIC_CDN_BASE_URL: E2E_CDN_BASE,
  NEXT_PUBLIC_PLATFORM_ENABLED: 'true',
  PLATFORM_API_ORIGIN: API_ORIGIN,
  PLATFORM_EDGE_SECRET: LOCAL_EDGE_SECRET,
  // Photo-doubt uploads PUT straight to "Blob storage" (the control server): CSP connect-src on /ask (ADR-018).
  PLATFORM_UPLOAD_ORIGIN: CONTROL_ORIGIN,
  NEXT_TELEMETRY_DISABLED: '1',
};

export const API_ENV = {
  // dev-content publish merges out/<unit>/audio.json (mock TTS made by run.mjs, ADR-013 test note).
  CONTENT_PIPELINE_OUT_DIR: join(AUDIO_DIR, 'out'),
  PORT: String(API_PORT),
  MOCK_OIDC_PORT: String(OIDC_PORT),
  E2E_CONTROL_PORT: String(CONTROL_PORT),
  PUBLIC_BASE_URL: WEB_ORIGIN,
  LOG_LEVEL: 'warn',
};
