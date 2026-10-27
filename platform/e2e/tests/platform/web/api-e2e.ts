/**
 * The local API for the platform web e2e (web-platform M3/M4; ADR-018 §6). Same as `npm run dev -w @soyl/api`
 * (scripts/dev.ts: embedded PostgreSQL, every authored chapter published, mock SMS/email/consent/Google,
 * the dev live mocks) with four e2e stand-ins wired in through the API's own injection points (AppDeps):
 *
 * 1. Razorpay: the in-memory RazorpayStub, plans synced at start-up, BILLING_ENABLED=true. The control server
 *    plays Razorpay's side of a payment and returns the signed webhooks, which the test then POSTs through
 *    the web proxy (so the proxy's byte-for-byte forwarding is exercised).
 * 2. AI: the deterministic MockProvider with the gateway fixtures, streaming slowly enough to watch, and
 *    failing before any output for messages containing E2E_FAIL_MARKER (refund path).
 * 3. Blob uploads: the memory store, but its signed upload URLs point at the control server over http, so the
 *    browser's PUT is a real cross-origin request (CSP connect-src = PLATFORM_UPLOAD_ORIGIN, CORS).
 * 4. Time travel for the test engine and live mocks: move an attempt's deadline, move the dev live mock.
 *
 * Run from platform/: `npx tsx e2e/tests/platform/web/api-e2e.ts` (playwright.config.ts does this).
 * Local only: APP_ENV=local, every provider a stand-in. Never deployed.
 */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { sql } from 'drizzle-orm';
import { createDb } from '@soyl/db';
import { MockProvider } from '@soyl/ai-core';
import { buildApp } from '../../../../api/src/app';
import { systemClock } from '../../../../api/src/clock';
import { DEV_DEFAULTS, loadConfig } from '../../../../api/src/config';
import { createKv } from '../../../../api/src/kv';
import { createProviders } from '../../../../api/src/providers';
import { loadAiConfig } from '../../../../api/src/ai/config';
import { createAiRuntime } from '../../../../api/src/ai/runtime';
import { registerGatewayFixtures } from '../../../../api/src/ai/fixtures';
import { MemoryBlobStore, type UploadTarget } from '../../../../api/src/ai/blob';
import { RazorpayStub, type SimEvent } from '../../../../api/src/billing/razorpay/stub';
import { signWebhook } from '../../../../api/src/billing/razorpay/webhook-simulator';
import { BILLING_DEV_DEFAULTS } from '../../../../api/src/billing/config';
import { syncPlans } from '../../../../api/src/billing/plans';
import { MockOidcServer } from '../../../../api/src/dev/mock-oidc';
import { startDevDatabase } from '../../../../api/src/dev/dev-db';
import { publishDevContent } from '../../../../api/scripts/dev-content';

export const E2E_FAIL_MARKER = 'E2E-FAIL-BEFORE-OUTPUT';

const ctlPort = Number(process.env.E2E_CONTROL_PORT ?? 8799);
const ctlOrigin = `http://127.0.0.1:${ctlPort}`;
const webOrigin = process.env.PUBLIC_BASE_URL ?? 'http://localhost:3000';
const oidcPort = Number(process.env.MOCK_OIDC_PORT ?? 8090);

const oidc = new MockOidcServer({
  clientId: DEV_DEFAULTS.googleClientId,
  clientSecret: DEV_DEFAULTS.googleClientSecret,
  redirectUris: [`${webOrigin}/api/platform/v1/auth/google/callback`],
  port: oidcPort,
});
const issuer = await oidc.start();

const env: Record<string, string | undefined> = {
  APP_ENV: 'local',
  HOST: '127.0.0.1',
  PORT: '8797',
  PLATFORM_ENABLED: 'true',
  DEV_OTP_OUTBOX: 'true',
  LOG_LEVEL: 'warn',
  BILLING_ENABLED: 'true',
  RAZORPAY_PROVIDER: 'stub',
  DEV_LIVE_IN: '120',
  ...process.env,
  PUBLIC_BASE_URL: webOrigin,
  GOOGLE_ISSUER: process.env.GOOGLE_ISSUER ?? issuer,
};
// dev-content reads DEV_LIVE_IN from process.env.
process.env.DEV_LIVE_IN = env.DEV_LIVE_IN;

const config = loadConfig(env);
const devDb = await startDevDatabase((m) => console.log(`[dev-db] ${m}`));
await publishDevContent(devDb.url);
const { db, close: closeDb } = createDb(devDb.url, { max: config.databasePoolMax });
const kv = createKv(config);
const providers = createProviders(config);

// 1. Razorpay stub with synced plans.
const razorpay = new RazorpayStub(BILLING_DEV_DEFAULTS.keyId);
await syncPlans(db, razorpay);

// 2. AI provider.
const provider = new MockProvider({
  env: { APP_ENV: 'test' },
  seed: 'soyl-gateway',
  streamDelayMs: 400,
  failOnCall: (_i, req) => (JSON.stringify(req.messages).includes(E2E_FAIL_MARKER) ? new Error('e2e: injected provider failure') : null),
});
registerGatewayFixtures(provider);

// 3. Blob uploads over http.
class HttpMemoryBlobStore extends MemoryBlobStore {
  override async createUploadUrl(container: string, key: string, opts: { contentType: string; expiresAt: Date }): Promise<UploadTarget> {
    const t = await super.createUploadUrl(container, key, opts);
    return { ...t, url: `${ctlOrigin}/blob?u=${encodeURIComponent(t.url)}` };
  }
}
const blob = new HttpMemoryBlobStore();

const aiConfig = loadAiConfig(config, env);
const aiRuntime = await createAiRuntime(config, aiConfig, { env });
const app = await buildApp({ config, db, kv, clock: systemClock, providers, billing: { razorpay }, ai: { config: aiConfig, runtime: { ...aiRuntime, provider, blob } } });
await app.listen({ port: config.port, host: config.host });
console.log(`[api-e2e] API ready on ${config.host}:${config.port}; control ${ctlOrigin}`);

// 4. The control server.
function read(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
function send(res: ServerResponse, status: number, body: unknown, extra: Record<string, string> = {}) {
  res.writeHead(status, { 'content-type': 'application/json', ...extra });
  res.end(body === null ? '' : JSON.stringify(body));
}
const cors = { 'access-control-allow-origin': webOrigin, 'access-control-allow-methods': 'PUT', 'access-control-allow-headers': 'content-type, x-ms-blob-type, x-real-ip', 'access-control-max-age': '60' };

function latest<T extends { created_at: number }>(m: Map<string, T>): T | null {
  return [...m.values()].sort((a, b) => b.created_at - a.created_at)[0] ?? null;
}
const signed = (events: SimEvent[]) => events.map((ev) => signWebhook(ev, BILLING_DEV_DEFAULTS.webhookSecret));

const control = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', ctlOrigin);
    if (url.pathname === '/blob') {
      if (req.method === 'OPTIONS') return send(res, 204, null, cors);
      if (req.method !== 'PUT') return send(res, 405, { error: 'method' }, cors);
      const target = url.searchParams.get('u') ?? '';
      const data = await read(req);
      const r = blob.acceptUpload(target, data, String(req.headers['content-type'] ?? ''));
      return send(res, r.ok ? 201 : r.status, r.ok ? { ok: true } : { error: 'sas' }, cors);
    }
    if (req.method !== 'POST') return send(res, 404, { error: 'not found' });
    const body = JSON.parse((await read(req)).toString('utf8') || '{}') as Record<string, unknown>;
    if (url.pathname === '/ctl/attempt-deadline') {
      const seconds = Number(body.inSeconds);
      await db.execute(sql`UPDATE attempts SET deadline_at = now() + make_interval(secs => ${seconds}) WHERE id = ${String(body.attemptId)}::uuid`);
      return send(res, 200, { ok: true });
    }
    if (url.pathname === '/ctl/live-shift') {
      const seconds = Number(body.startsInSeconds);
      await db.execute(sql`UPDATE live_events SET
          ends_at = now() + make_interval(secs => ${seconds}) + (ends_at - starts_at),
          registration_opens_at = least(registration_opens_at, now() + make_interval(secs => ${seconds}) - interval '1 minute'),
          starts_at = now() + make_interval(secs => ${seconds})
        WHERE key = ${String(body.eventId)} OR id::text = ${String(body.eventId)}`);
      return send(res, 200, { ok: true });
    }
    if (url.pathname === '/ctl/razorpay/pay-latest') {
      const sub = latest(razorpay.subscriptions);
      const order = latest(razorpay.orders);
      if (body.kind === 'order') return send(res, 200, order ? { id: order.id, webhooks: signed(razorpay.simulateOrderPayment(order.id)) } : { error: 'no order' });
      return send(res, 200, sub ? { id: sub.id, webhooks: signed(razorpay.simulateSubscriptionCheckout(sub.id)) } : { error: 'no subscription' });
    }
    return send(res, 404, { error: 'not found' });
  } catch (err) {
    console.error('[api-e2e] control error', err);
    return send(res, 500, { error: (err as Error).message });
  }
});
control.listen(ctlPort, '127.0.0.1');

let closing = false;
async function shutdown() {
  if (closing) return;
  closing = true;
  const timer = setTimeout(() => process.exit(1), 15_000);
  timer.unref();
  try {
    control.close();
    await app.close();
    await kv.close();
    await closeDb();
    await devDb.close();
  } finally {
    process.exit(0);
  }
}
process.on('SIGTERM', () => void shutdown());
process.on('SIGINT', () => void shutdown());
