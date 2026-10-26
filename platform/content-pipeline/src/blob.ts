/**
 * Blob storage for generated binary assets (narration audio now; images later).
 *
 * Keys are relative POSIX paths (`audio/<unit>/<deck>/<slide>-<hash>.ogg`), lower-case only so the
 * same key is valid on case-insensitive file systems and in Azure Blob Storage.
 *
 * - LocalBlobStore: files under platform/content-pipeline/out/blob (or CONTENT_BLOB_DIR); writes
 *   are atomic (temp file in <root>/.tmp, then rename).
 * - AzureBlobStore: Blob REST API (x-ms-version 2025-01-05) with a keyless Entra bearer token for
 *   https://storage.azure.com/.default (managed identity in Azure, `az login` locally). It is only
 *   chosen when CONTENT_BLOB_ACCOUNT_URL is set, so nothing touches Azure until infra provides it.
 *   The identity needs "Storage Blob Data Contributor" on the container.
 */
import { createHash, randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { HttpError, ProviderConfigError, withRetry, type Env, type RetryOptions, type TokenCredentialLike } from '@soyl/ai-core';
import { ManagedIdentityTokenProvider } from '@soyl/shared/azure/identity';
import { PACKAGE_DIR } from './paths';

export const STORAGE_SCOPE = 'https://storage.azure.com/.default';
export const BLOB_API_VERSION = '2025-01-05';

const KEY_RE = /^[a-z0-9][a-z0-9._/-]*$/;

export interface PutResult {
  key: string;
  bytes: number;
  /** Hex SHA-256 of the stored bytes. */
  sha256: string;
}

export interface BlobStore {
  readonly kind: 'local' | 'azure';
  put(key: string, bytes: Uint8Array, contentType: string): Promise<PutResult>;
  /** The stored bytes, or null when the key does not exist. */
  get(key: string): Promise<Uint8Array | null>;
  exists(key: string): Promise<boolean>;
  /** Every key starting with `prefix` (plain string prefix, as in Azure), sorted. */
  list(prefix: string): Promise<string[]>;
  describe(): string;
}

export class BlobKeyError extends Error {
  constructor(key: string, reason: string) {
    super(`invalid blob key ${JSON.stringify(key)}: ${reason}`);
    this.name = 'BlobKeyError';
  }
}

/**
 * Throws unless `key` is a relative POSIX path matching ^[a-z0-9][a-z0-9._/-]*$ with no `..`
 * segment. Also rejects `.` and empty segments and a trailing slash (they name no file and alias
 * other keys on disk).
 */
export function assertBlobKey(key: string): string {
  if (typeof key !== 'string' || key.length === 0) throw new BlobKeyError(String(key), 'empty');
  if (key.length > 1024) throw new BlobKeyError(key, 'longer than 1024 characters');
  if (key.startsWith('/')) throw new BlobKeyError(key, 'leading slash');
  if (!KEY_RE.test(key)) throw new BlobKeyError(key, 'must match ^[a-z0-9][a-z0-9._/-]*$ (lower-case, relative)');
  for (const segment of key.split('/')) {
    if (segment === '..') throw new BlobKeyError(key, '".." segment');
    if (segment === '.' || segment === '') throw new BlobKeyError(key, 'empty or "." segment');
  }
  return key;
}

/** A list prefix may be empty or a partial key; it must not climb out of the store. */
function assertPrefix(prefix: string): string {
  if (prefix === '') return prefix;
  if (prefix.startsWith('/') || !KEY_RE.test(prefix) || prefix.split('/').includes('..'))
    throw new BlobKeyError(prefix, 'invalid list prefix');
  return prefix;
}

export function sha256Hex(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

/** platform/content-pipeline/out/blob */
export function defaultBlobDir(): string {
  return path.join(PACKAGE_DIR, 'out', 'blob');
}

// ---------------------------------------------------------------------------------------------
// Local

export class LocalBlobStore implements BlobStore {
  readonly kind = 'local' as const;
  readonly rootDir: string;

  constructor(rootDir: string = defaultBlobDir()) {
    this.rootDir = path.resolve(rootDir);
  }

  private file(key: string): string {
    return path.join(this.rootDir, ...assertBlobKey(key).split('/'));
  }

  async put(key: string, bytes: Uint8Array, _contentType: string): Promise<PutResult> {
    const file = this.file(key);
    const tmpDir = path.join(this.rootDir, '.tmp'); // not a valid key, so never listed
    await fs.promises.mkdir(path.dirname(file), { recursive: true });
    await fs.promises.mkdir(tmpDir, { recursive: true });
    const tmp = path.join(tmpDir, `${process.pid}-${randomBytes(6).toString('hex')}`);
    try {
      await fs.promises.writeFile(tmp, bytes);
      await fs.promises.rename(tmp, file);
    } catch (error) {
      await fs.promises.rm(tmp, { force: true }).catch(() => undefined);
      throw error;
    }
    return { key, bytes: bytes.length, sha256: sha256Hex(bytes) };
  }

  async get(key: string): Promise<Uint8Array | null> {
    try {
      const buf = await fs.promises.readFile(this.file(key));
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT' || (error as NodeJS.ErrnoException).code === 'EISDIR') return null;
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return (await fs.promises.stat(this.file(key))).isFile();
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
      throw error;
    }
  }

  async list(prefix: string): Promise<string[]> {
    assertPrefix(prefix);
    // Walk only below the deepest directory the prefix names.
    const dirPart = prefix.includes('/') ? prefix.slice(0, prefix.lastIndexOf('/')) : '';
    const keys: string[] = [];
    const walk = async (rel: string): Promise<void> => {
      let entries: fs.Dirent[];
      try {
        entries = await fs.promises.readdir(rel ? path.join(this.rootDir, ...rel.split('/')) : this.rootDir, { withFileTypes: true });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT' || (error as NodeJS.ErrnoException).code === 'ENOTDIR') return;
        throw error;
      }
      for (const entry of entries) {
        const key = rel ? `${rel}/${entry.name}` : entry.name;
        if (!KEY_RE.test(key)) continue; // .tmp and anything foreign
        if (entry.isDirectory()) await walk(key);
        else if (entry.isFile() && key.startsWith(prefix)) keys.push(key);
      }
    };
    await walk(dirPart);
    return keys.sort();
  }

  describe(): string {
    return `local:${this.rootDir}`;
  }
}

// ---------------------------------------------------------------------------------------------
// Azure

/**
 * DefaultAzureCredential from the optional peer @azure/identity, loaded lazily (same convention as
 * @soyl/ai-core's factory). Shared by the blob store and the speech provider.
 */
export async function defaultAzureCredential(env: Env = process.env): Promise<TokenCredentialLike> {
  // In Azure Container Apps (e.g. the content-release job) use the managed-identity endpoint directly,
  // without @azure/identity (not shipped in the images; prod-readiness handoff 2026-10-27).
  if (env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER) {
    const mi = new ManagedIdentityTokenProvider({ endpoint: env.IDENTITY_ENDPOINT, header: env.IDENTITY_HEADER, clientId: env.AZURE_CLIENT_ID || undefined });
    return { getToken: (scope: string | string[]) => mi.getToken(Array.isArray(scope) ? scope[0]! : scope) };
  }
  const moduleName = '@azure/identity';
  try {
    const identity = (await import(/* @vite-ignore */ moduleName)) as { DefaultAzureCredential: new () => TokenCredentialLike };
    return new identity.DefaultAzureCredential();
  } catch (error) {
    throw new ProviderConfigError(
      `@azure/identity is not installed (optional peer dependency of @soyl/ai-core). Run "npm install @azure/identity -w @soyl/ai-core" from platform/. (${(error as Error).message})`,
    );
  }
}

/** Caches a bearer token per scope, refreshing 5 minutes before expiry (as the Azure OpenAI provider does). */
export class BearerTokenCache {
  private token: { value: string; expires: number } | null = null;
  private credential: Promise<TokenCredentialLike> | null;

  constructor(
    private readonly scope: string,
    credential: TokenCredentialLike | undefined,
    private readonly what: string,
  ) {
    this.credential = credential ? Promise.resolve(credential) : null;
  }

  async get(): Promise<string> {
    const now = Date.now();
    if (!this.token || this.token.expires - now < 5 * 60_000) {
      const credential = await (this.credential ??= defaultAzureCredential());
      const t = await credential.getToken(this.scope);
      if (!t) throw new Error(`${this.what}: credential returned no token`);
      this.token = { value: t.token, expires: t.expiresOnTimestamp };
    }
    return this.token.value;
  }
}

export interface AzureBlobStoreConfig {
  /** e.g. https://soylcontentdev.blob.core.windows.net (no container, no SAS). */
  accountUrl: string;
  container: string;
  /** Defaults to DefaultAzureCredential (lazily loaded). */
  credential?: TokenCredentialLike;
  fetch?: typeof fetch;
  retry?: Partial<RetryOptions>;
  timeoutMs?: number;
}

function xmlUnescape(s: string): string {
  return s.replace(/&(lt|gt|quot|apos|amp|#\d+|#x[0-9a-f]+);/gi, (m, e: string) => {
    switch (e.toLowerCase()) {
      case 'lt':
        return '<';
      case 'gt':
        return '>';
      case 'quot':
        return '"';
      case 'apos':
        return "'";
      case 'amp':
        return '&';
      default:
        return e[1] === 'x' || e[1] === 'X' ? String.fromCodePoint(parseInt(e.slice(2), 16)) : String.fromCodePoint(parseInt(e.slice(1), 10));
    }
  });
}

/** Blob names and the continuation marker from one List Blobs response page. */
export function parseListBlobs(xml: string): { names: string[]; nextMarker: string | null } {
  const names: string[] = [];
  // Only <Blob> entries (no delimiter is sent, so there are no <BlobPrefix> entries anyway).
  for (const blob of xml.matchAll(/<Blob>([\s\S]*?)<\/Blob>/g)) {
    const name = /<Name>([\s\S]*?)<\/Name>/.exec(blob[1]!);
    if (name) names.push(xmlUnescape(name[1]!));
  }
  const marker = /<NextMarker>([\s\S]*?)<\/NextMarker>/.exec(xml);
  const nextMarker = marker && marker[1]!.trim() ? xmlUnescape(marker[1]!.trim()) : null;
  return { names, nextMarker };
}

export class AzureBlobStore implements BlobStore {
  readonly kind = 'azure' as const;
  private readonly accountUrl: string;
  private readonly container: string;
  private readonly fetchImpl: typeof fetch;
  private readonly tokens: BearerTokenCache;

  constructor(private readonly config: AzureBlobStoreConfig) {
    if (!/^https:\/\/[^/?#]+\/?$/.test(config.accountUrl))
      throw new Error('AzureBlobStore: accountUrl must be an https URL with no path (e.g. https://<account>.blob.core.windows.net)');
    if (!/^(?!.*--)[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(config.container))
      throw new Error(`AzureBlobStore: invalid container name "${config.container}" (3-63 chars, lower-case letters, digits, single hyphens)`);
    this.accountUrl = config.accountUrl.replace(/\/+$/, '');
    this.container = config.container;
    this.fetchImpl = config.fetch ?? globalThis.fetch;
    this.tokens = new BearerTokenCache(STORAGE_SCOPE, config.credential, 'AzureBlobStore');
  }

  private blobUrl(key: string): string {
    return `${this.accountUrl}/${this.container}/${assertBlobKey(key).split('/').map(encodeURIComponent).join('/')}`;
  }

  /** One REST call with retries on 408/429/5xx/network errors. Statuses in `accept` are returned, not thrown. */
  private async call(method: string, url: string, init: { headers?: Record<string, string>; body?: Uint8Array } = {}, accept: number[] = []): Promise<Response> {
    return withRetry(async () => {
      const headers = new Headers(init.headers);
      headers.set('authorization', `Bearer ${await this.tokens.get()}`);
      headers.set('x-ms-version', BLOB_API_VERSION);
      headers.set('x-ms-date', new Date().toUTCString());
      headers.set('x-ms-client-request-id', crypto.randomUUID());
      const res = await this.fetchImpl(url, {
        method,
        headers,
        body: init.body as BodyInit | undefined,
        signal: AbortSignal.timeout(this.config.timeoutMs ?? 120_000),
      });
      if (!res.ok && !accept.includes(res.status)) {
        const text = await res.text().catch(() => '');
        const where = url.replace(/\?.*$/, '');
        throw new HttpError(res.status, `Azure Blob ${method} ${where} → HTTP ${res.status}: ${text.slice(0, 500)}`, res.headers, text);
      }
      return res;
    }, this.config.retry);
  }

  async put(key: string, bytes: Uint8Array, contentType: string): Promise<PutResult> {
    const sha256 = sha256Hex(bytes);
    const res = await this.call('PUT', this.blobUrl(key), {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'content-type': contentType,
        'x-ms-meta-sha256': sha256,
      },
      body: bytes,
    });
    await res.body?.cancel().catch(() => undefined);
    return { key, bytes: bytes.length, sha256 };
  }

  async get(key: string): Promise<Uint8Array | null> {
    const res = await this.call('GET', this.blobUrl(key), {}, [404]);
    if (res.status === 404) {
      await res.body?.cancel().catch(() => undefined);
      return null;
    }
    return new Uint8Array(await res.arrayBuffer());
  }

  async exists(key: string): Promise<boolean> {
    const res = await this.call('HEAD', this.blobUrl(key), {}, [404]);
    await res.body?.cancel().catch(() => undefined);
    return res.status !== 404;
  }

  async list(prefix: string): Promise<string[]> {
    assertPrefix(prefix);
    const keys: string[] = [];
    let marker: string | null = null;
    do {
      const qs = new URLSearchParams({ restype: 'container', comp: 'list', prefix });
      if (marker) qs.set('marker', marker);
      const res = await this.call('GET', `${this.accountUrl}/${this.container}?${qs.toString()}`);
      const page = parseListBlobs((await res.text()).replace(/^﻿/, ''));
      keys.push(...page.names);
      marker = page.nextMarker;
    } while (marker);
    return keys.sort();
  }

  describe(): string {
    return `azure:${this.accountUrl}/${this.container}`;
  }
}

// ---------------------------------------------------------------------------------------------
// Factory

export const BLOB_ENV = {
  accountUrl: 'CONTENT_BLOB_ACCOUNT_URL',
  container: 'CONTENT_BLOB_CONTAINER',
  dir: 'CONTENT_BLOB_DIR',
} as const;

/**
 * CONTENT_BLOB_ACCOUNT_URL (+ CONTENT_BLOB_CONTAINER, default "content") → AzureBlobStore;
 * otherwise LocalBlobStore at CONTENT_BLOB_DIR or out/blob.
 */
export function blobStoreFromEnv(
  env: Env = process.env,
  opts: { credential?: TokenCredentialLike; fetch?: typeof fetch; retry?: Partial<RetryOptions> } = {},
): BlobStore {
  const accountUrl = env[BLOB_ENV.accountUrl]?.trim();
  if (accountUrl) {
    return new AzureBlobStore({
      accountUrl,
      container: env[BLOB_ENV.container]?.trim() || 'content',
      credential: opts.credential,
      fetch: opts.fetch,
      retry: opts.retry,
    });
  }
  return new LocalBlobStore(env[BLOB_ENV.dir]?.trim() || defaultBlobDir());
}
