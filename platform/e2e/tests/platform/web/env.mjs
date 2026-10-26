/**
 * Ports and environment for the platform web e2e. Separate ports from `npm run dev` (3000/8787/8090) so a
 * developer's running servers never collide with the suite.
 */
export const WEB_PORT = Number(process.env.PW_WEB_PORT ?? 3320);
export const FLAG_OFF_PORT = Number(process.env.PW_FLAG_OFF_PORT ?? 3321);
export const API_PORT = Number(process.env.PW_API_PORT ?? 8797);
export const OIDC_PORT = Number(process.env.PW_OIDC_PORT ?? 8098);

/** The API's PUBLIC_BASE_URL / allowed Origin must match exactly what the browser uses (AUTH-12). */
export const WEB_ORIGIN = `http://localhost:${WEB_PORT}`;
export const API_ORIGIN = `http://127.0.0.1:${API_PORT}`;

/** Public development secret, accepted only by an API with APP_ENV=local (ADR-005 "Local development"). */
export const LOCAL_EDGE_SECRET = 'local-dev-edge-secret-not-for-deployment-000000'; // gitleaks:allow (public local-only value, ADR-005)

export const WEB_ENV_ON = {
  NEXT_PUBLIC_PLATFORM_ENABLED: 'true',
  PLATFORM_API_ORIGIN: API_ORIGIN,
  PLATFORM_EDGE_SECRET: LOCAL_EDGE_SECRET,
  NEXT_TELEMETRY_DISABLED: '1',
};

export const API_ENV = {
  PORT: String(API_PORT),
  MOCK_OIDC_PORT: String(OIDC_PORT),
  PUBLIC_BASE_URL: WEB_ORIGIN,
  LOG_LEVEL: 'warn',
};
