/**
 * Probe endpoints for Container Apps (the worker app has no ingress, INFRA-7; probes reach the
 * container directly). Bodies never carry internal detail.
 *
 *   GET /healthz → 200 {"status":"ok"} once pg-boss has started, else 503 {"status":"starting"}
 *   GET /readyz  → 200 {"status":"ready"} if `SELECT 1` answers within 2 s, else 503 {"status":"not_ready"}
 *   anything else → 404 {"status":"not_found"}
 */
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import type pg from 'pg';
import { errorFields, type Logger } from './logger';

export const READY_TIMEOUT_MS = 2000;

/** Resolves true if the pool answers `SELECT 1` within `timeoutMs`; never rejects. */
export async function checkDatabase(pool: Pick<pg.Pool, 'query'>, timeoutMs = READY_TIMEOUT_MS): Promise<boolean> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<boolean>((resolve) => {
    timer = setTimeout(() => resolve(false), timeoutMs);
  });
  const query = pool.query('SELECT 1').then(
    () => true,
    () => false,
  );
  try {
    return await Promise.race([query, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

export interface HealthDeps {
  /** Liveness: the process is up and pg-boss has started. */
  isLive: () => boolean;
  /** Readiness: the database answers. */
  isReady: () => Promise<boolean>;
  log: Logger;
}

export interface HealthServer {
  server: Server;
  /** Starts listening; resolves with the bound port (0 → an ephemeral port). */
  listen(port: number, host?: string): Promise<number>;
  close(): Promise<void>;
}

function send(res: import('node:http').ServerResponse, status: number, body: { status: string }) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(json),
    'cache-control': 'no-store',
  });
  res.end(json);
}

export function createHealthServer(deps: HealthDeps): HealthServer {
  const server = createServer((req, res) => {
    const path = (req.url ?? '/').split('?')[0];
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 404, { status: 'not_found' });
    if (path === '/healthz') return send(res, deps.isLive() ? 200 : 503, { status: deps.isLive() ? 'ok' : 'starting' });
    if (path === '/readyz') {
      deps.isReady().then(
        (ok) => send(res, ok ? 200 : 503, { status: ok ? 'ready' : 'not_ready' }),
        (err: unknown) => {
          deps.log.warn('readiness check threw', { err: errorFields(err) });
          send(res, 503, { status: 'not_ready' });
        },
      );
      return;
    }
    send(res, 404, { status: 'not_found' });
  });
  server.keepAliveTimeout = 5000;

  let listening = false;
  return {
    server,
    listen: (port, host = '0.0.0.0') =>
      new Promise<number>((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, host, () => {
          server.off('error', reject);
          listening = true;
          resolve((server.address() as AddressInfo).port);
        });
      }),
    close: () =>
      new Promise<void>((resolve) => {
        if (!listening) return resolve();
        listening = false;
        server.close(() => resolve());
        server.closeAllConnections();
      }),
  };
}
