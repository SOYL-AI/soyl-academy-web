/**
 * Microsoft Entra access tokens for Azure resources WITHOUT @azure/identity (its msal-node pin is a
 * vulnerable dependency, see docs/platform/handoffs/2026-10-27-prod-readiness.md).
 *
 * - ManagedIdentityTokenProvider: the Azure Container Apps managed-identity endpoint
 *   (env IDENTITY_ENDPOINT + IDENTITY_HEADER, api-version 2019-08-01). With a user-assigned identity
 *   the `client_id` query parameter selects it (env AZURE_CLIENT_ID). Tokens are cached per resource
 *   until REFRESH_MARGIN_MS (5 min) before expiry; concurrent callers share one request; transient
 *   failures (network, 404 while the identity is still being attached, 429, 5xx) are retried with
 *   exponential backoff.
 * - AzureCliTokenProvider: local development fallback (`az account get-access-token`), never used in
 *   production: createTokenProvider refuses it when APP_ENV=prod.
 *
 * Usage:
 *   const tokens = createTokenProvider();                     // from process.env
 *   const { token } = await tokens.getToken(AZURE_RESOURCES.postgres);
 *
 * No runtime imports: this file only uses fetch/timers (node:child_process is imported lazily by the
 * CLI fallback), so @soyl/shared keeps its "zod only" dependency rule.
 */

/** Entra resource (audience) URIs used by the platform. */
export const AZURE_RESOURCES = {
  /** Azure Database for PostgreSQL (Entra auth): the token is the password. */
  postgres: 'https://ossrdbms-aad.database.windows.net',
  /** Azure Managed Redis (Entra auth): the token is the AUTH password, the username is the object id. */
  redis: 'https://redis.azure.com',
  /** Azure Communication Services (Email REST API bearer token). */
  communication: 'https://communication.azure.com',
  /** Azure Storage (Blob REST API bearer token). */
  storage: 'https://storage.azure.com',
} as const;

export interface AccessToken {
  token: string;
  /** Expiry, epoch milliseconds. */
  expiresOnTimestamp: number;
}

export interface TokenProvider {
  /** 'managed-identity' | 'azure-cli' | 'static' (tests). */
  readonly kind: string;
  /** A token for `resource` that is valid for at least REFRESH_MARGIN_MS (cached). */
  getToken(resource: string): Promise<AccessToken>;
}

/** Refresh this long before expiry (and never hand out a token closer to expiry than this). */
export const REFRESH_MARGIN_MS = 5 * 60_000;

export class TokenProviderError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly retryable = false,
  ) {
    super(message);
    this.name = 'TokenProviderError';
  }
}

type Env = Record<string, string | undefined>;
type Sleep = (ms: number) => Promise<void>;
const defaultSleep: Sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Strips a trailing `/.default` scope so callers may pass a scope or a resource. */
export function resourceOf(resourceOrScope: string): string {
  return resourceOrScope.replace(/\/\.default$/, '').replace(/\/+$/, '');
}

/**
 * Per-resource cache + single-flight around a fetcher. Shared by both providers so the behaviour
 * (refresh margin, de-duplication, no caching of failures) is identical.
 */
class TokenCache {
  private readonly cache = new Map<string, AccessToken>();
  private readonly inflight = new Map<string, Promise<AccessToken>>();

  constructor(
    private readonly fetchToken: (resource: string) => Promise<AccessToken>,
    private readonly now: () => number,
    private readonly marginMs: number,
  ) {}

  async get(resourceOrScope: string): Promise<AccessToken> {
    const resource = resourceOf(resourceOrScope);
    const cached = this.cache.get(resource);
    if (cached && cached.expiresOnTimestamp - this.now() > this.marginMs) return cached;
    let p = this.inflight.get(resource);
    if (!p) {
      p = this.fetchToken(resource)
        .then((t) => {
          this.cache.set(resource, t);
          return t;
        })
        .finally(() => this.inflight.delete(resource));
      this.inflight.set(resource, p);
    }
    return p;
  }

  clear(): void {
    this.cache.clear();
  }
}

export interface ManagedIdentityOptions {
  /** IDENTITY_ENDPOINT, e.g. http://localhost:42356/msi/token */
  endpoint: string;
  /** IDENTITY_HEADER (sent as X-IDENTITY-HEADER). */
  header: string;
  /** Client id of the user-assigned identity (AZURE_CLIENT_ID). Omit for a system-assigned identity. */
  clientId?: string;
  fetch?: typeof fetch;
  now?: () => number;
  sleep?: Sleep;
  /** Attempts per token request (default 5). */
  maxAttempts?: number;
  /** First backoff delay (default 500 ms, doubled per attempt, capped at 8 s). */
  baseDelayMs?: number;
  /** Per-request timeout (default 10 s). */
  timeoutMs?: number;
  refreshMarginMs?: number;
}

export class ManagedIdentityTokenProvider implements TokenProvider {
  readonly kind = 'managed-identity';
  private readonly cache: TokenCache;
  private readonly fetchImpl: typeof fetch;
  private readonly sleep: Sleep;
  private readonly now: () => number;

  constructor(private readonly o: ManagedIdentityOptions) {
    if (!o.endpoint || !o.header) throw new TokenProviderError('managed identity endpoint/header missing');
    this.fetchImpl = o.fetch ?? fetch;
    this.sleep = o.sleep ?? defaultSleep;
    this.now = o.now ?? Date.now;
    this.cache = new TokenCache((r) => this.request(r), this.now, o.refreshMarginMs ?? REFRESH_MARGIN_MS);
  }

  getToken(resource: string): Promise<AccessToken> {
    return this.cache.get(resource);
  }

  private async request(resource: string): Promise<AccessToken> {
    const attempts = Math.max(1, this.o.maxAttempts ?? 5);
    const base = this.o.baseDelayMs ?? 500;
    let last: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        return await this.once(resource);
      } catch (err) {
        last = err;
        const retryable = !(err instanceof TokenProviderError) || err.retryable;
        if (!retryable || i === attempts - 1) break;
        await this.sleep(Math.min(8000, base * 2 ** i));
      }
    }
    if (last instanceof TokenProviderError) throw last;
    throw new TokenProviderError(`managed identity token request failed: ${(last as Error)?.message ?? String(last)}`, undefined, true);
  }

  private async once(resource: string): Promise<AccessToken> {
    const url = new URL(this.o.endpoint);
    url.searchParams.set('api-version', '2019-08-01');
    url.searchParams.set('resource', resource);
    if (this.o.clientId) url.searchParams.set('client_id', this.o.clientId);
    const res = await this.fetchImpl(url, {
      headers: { 'X-IDENTITY-HEADER': this.o.header, Metadata: 'true' },
      signal: AbortSignal.timeout(this.o.timeoutMs ?? 10_000),
    });
    if (!res.ok) {
      // The body may name the identity or the resource; it is never logged or passed on.
      await res.body?.cancel().catch(() => {});
      const retryable = res.status === 404 || res.status === 408 || res.status === 429 || res.status >= 500;
      throw new TokenProviderError(`managed identity token request failed: HTTP ${res.status}`, res.status, retryable);
    }
    const body = (await res.json()) as { access_token?: unknown; expires_on?: unknown; expires_in?: unknown };
    if (typeof body.access_token !== 'string' || !body.access_token)
      throw new TokenProviderError('managed identity token response had no access_token', res.status, true);
    return { token: body.access_token, expiresOnTimestamp: expiresAt(body, this.now()) };
  }
}

/** `expires_on` is epoch seconds (string or number); some endpoints only send `expires_in`. */
function expiresAt(body: { expires_on?: unknown; expires_in?: unknown }, now: number): number {
  const on = Number(body.expires_on);
  if (Number.isFinite(on) && on > 0) return on * 1000;
  const inSec = Number(body.expires_in);
  if (Number.isFinite(inSec) && inSec > 0) return now + inSec * 1000;
  // Unknown expiry: assume a short lifetime so the token is refreshed soon.
  return now + 10 * 60_000;
}

export interface AzureCliOptions {
  /** Injectable for tests: runs `az` with args and returns stdout. */
  run?: (args: string[]) => Promise<string>;
  now?: () => number;
  refreshMarginMs?: number;
}

/** Local development only: tokens of the developer signed in with `az login`. */
export class AzureCliTokenProvider implements TokenProvider {
  readonly kind = 'azure-cli';
  private readonly cache: TokenCache;

  constructor(private readonly o: AzureCliOptions = {}) {
    this.cache = new TokenCache((r) => this.request(r), o.now ?? Date.now, o.refreshMarginMs ?? REFRESH_MARGIN_MS);
  }

  getToken(resource: string): Promise<AccessToken> {
    return this.cache.get(resource);
  }

  private async request(resource: string): Promise<AccessToken> {
    const run = this.o.run ?? runAz;
    let out: string;
    try {
      out = await run(['account', 'get-access-token', '--resource', resource, '--output', 'json']);
    } catch (err) {
      throw new TokenProviderError(`az account get-access-token failed (run "az login" first): ${(err as Error).message}`);
    }
    const j = JSON.parse(out) as { accessToken?: string; expires_on?: number | string; expiresOn?: string };
    if (!j.accessToken) throw new TokenProviderError('az account get-access-token returned no accessToken');
    const on = Number(j.expires_on);
    const expiresOnTimestamp = Number.isFinite(on) && on > 0 ? on * 1000 : j.expiresOn ? Date.parse(j.expiresOn) : Date.now() + 10 * 60_000;
    return { token: j.accessToken, expiresOnTimestamp };
  }
}

async function runAz(args: string[]): Promise<string> {
  const { execFile } = await import('node:child_process');
  const isWindows = typeof process !== 'undefined' && process.platform === 'win32';
  return new Promise((resolve, reject) => {
    execFile(isWindows ? 'az.cmd' : 'az', args, { timeout: 30_000, windowsHide: true, shell: isWindows }, (err, stdout) =>
      err ? reject(err) : resolve(String(stdout)),
    );
  });
}

/** Fixed tokens (tests, scripts). */
export class StaticTokenProvider implements TokenProvider {
  readonly kind = 'static';
  calls = 0;
  constructor(private readonly fn: (resource: string) => AccessToken | Promise<AccessToken>) {}
  async getToken(resource: string): Promise<AccessToken> {
    this.calls++;
    return this.fn(resourceOf(resource));
  }
}

/**
 * The provider for this process:
 * - IDENTITY_ENDPOINT + IDENTITY_HEADER present (Container Apps) → managed identity (AZURE_CLIENT_ID
 *   selects the user-assigned identity).
 * - otherwise, APP_ENV=prod → throws: production never falls back to a developer credential.
 * - otherwise → Azure CLI (local development against a dev resource).
 */
export function createTokenProvider(env: Env = typeof process !== 'undefined' ? process.env : {}, opts: { fetch?: typeof fetch } = {}): TokenProvider {
  if (env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER) {
    return new ManagedIdentityTokenProvider({
      endpoint: env.IDENTITY_ENDPOINT,
      header: env.IDENTITY_HEADER,
      clientId: env.AZURE_CLIENT_ID || undefined,
      fetch: opts.fetch,
    });
  }
  if ((env.APP_ENV ?? '').toLowerCase() === 'prod')
    throw new TokenProviderError('no managed identity endpoint (IDENTITY_ENDPOINT/IDENTITY_HEADER) and APP_ENV=prod: the developer credential fallback is disabled in production');
  return new AzureCliTokenProvider();
}

let processProvider: TokenProvider | null = null;
/** One provider per process (shared cache across Postgres, Redis, ACS and Blob). */
export function defaultTokenProvider(): TokenProvider {
  return (processProvider ??= createTokenProvider());
}
