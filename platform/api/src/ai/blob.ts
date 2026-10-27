/**
 * Blob storage for AI uploads (ARCHITECTURE §10, D-018, F-013, AC-16; ADR-013).
 *
 * Browsers upload directly to the `uploads-quarantine` container with a short-lived (≤ 5 min),
 * write-only (create + write), single-blob SAS that the API issues after the quota check. Uploads
 * never pass through the web proxy or the API body parser. The worker/API job then validates the
 * blob, writes a cleaned derivative to `uploads`, and deletes the quarantine copy.
 *
 * Implementations:
 * - AzureBlobStore: Blob REST API (x-ms-version 2022-11-02).
 *     production: keyless. REST calls use a managed-identity bearer token (scope storage); SAS URLs
 *       are user-delegation SAS signed with a user delegation key (Get User Delegation Key).
 *     Azurite/local: BLOB_ACCOUNT_KEY signs service SAS tokens, which also authorise the REST calls.
 *   Unverified against a live account until infra creates it (D-010); the signing code follows the
 *   2020-12-06+ string-to-sign layouts and has unit tests over its canonical strings.
 * - MemoryBlobStore: in-process stand-in for tests and local development. Its upload URLs are
 *   `memory://` URLs with an HMAC signature and expiry, checked by `acceptUpload` exactly like a SAS.
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { TokenCredentialLike } from '@soyl/ai-core';

export interface UploadTarget {
  url: string;
  method: 'PUT';
  /** Headers the browser must send with the PUT. */
  headers: Record<string, string>;
  expiresAt: Date;
}

export interface BlobInfo {
  bytes: number;
  contentType: string | null;
}

export interface BlobStore {
  readonly name: string;
  createUploadUrl(container: string, key: string, opts: { contentType: string; expiresAt: Date }): Promise<UploadTarget>;
  createReadUrl(container: string, key: string, opts: { expiresAt: Date; filename: string; contentType: string }): Promise<string>;
  head(container: string, key: string): Promise<BlobInfo | null>;
  /** Reads a blob; refuses (throws BlobTooLargeError) beyond `maxBytes` without buffering it all. */
  get(container: string, key: string, maxBytes: number): Promise<Buffer>;
  put(container: string, key: string, data: Buffer, contentType: string): Promise<void>;
  delete(container: string, key: string): Promise<void>;
}

export class BlobTooLargeError extends Error {
  constructor(readonly limit: number) {
    super(`blob larger than ${limit} bytes`);
    this.name = 'BlobTooLargeError';
  }
}

export class BlobUnavailableError extends Error {
  constructor(cause?: unknown) {
    super('blob storage unavailable', { cause });
    this.name = 'BlobUnavailableError';
  }
}

/* ---------------------------------------------------------------------------------------------- */
/* In-memory stand-in                                                                              */
/* ---------------------------------------------------------------------------------------------- */

export class MemoryBlobStore implements BlobStore {
  readonly name = 'memory';
  private readonly blobs = new Map<string, { data: Buffer; contentType: string }>();
  private readonly secret = randomBytes(32);
  /** Clock for SAS expiry (tests share the app's fake clock). */
  constructor(private readonly now: () => number = Date.now) {}
  failing = false;

  private check() {
    if (this.failing) throw new BlobUnavailableError(new Error('memory blob: injected failure'));
  }

  private sign(container: string, key: string, perms: string, exp: number): string {
    return createHmac('sha256', this.secret).update(`${perms}\n${exp}\n${container}/${key}`).digest('base64url');
  }

  async createUploadUrl(container: string, key: string, opts: { contentType: string; expiresAt: Date }): Promise<UploadTarget> {
    this.check();
    const exp = opts.expiresAt.getTime();
    const sig = this.sign(container, key, 'cw', exp);
    return {
      url: `memory://${container}/${key}?sp=cw&se=${exp}&sig=${sig}`,
      method: 'PUT',
      headers: { 'x-ms-blob-type': 'BlockBlob', 'content-type': opts.contentType },
      expiresAt: opts.expiresAt,
    };
  }

  async createReadUrl(container: string, key: string, opts: { expiresAt: Date }): Promise<string> {
    this.check();
    const exp = opts.expiresAt.getTime();
    return `memory://${container}/${key}?sp=r&se=${exp}&sig=${this.sign(container, key, 'r', exp)}`;
  }

  /** What the browser's PUT does: verifies the URL like Azure verifies a SAS, then stores the bytes. */
  acceptUpload(url: string, data: Buffer, contentType: string): { ok: true } | { ok: false; status: 403 } {
    const u = new URL(url);
    const container = u.host;
    const key = decodeURIComponent(u.pathname.replace(/^\//, ''));
    const sp = u.searchParams.get('sp') ?? '';
    const exp = Number(u.searchParams.get('se'));
    const sig = Buffer.from(u.searchParams.get('sig') ?? '');
    const want = Buffer.from(this.sign(container, key, sp, exp));
    if (!sp.includes('w') || !(exp > this.now()) || sig.length !== want.length || !timingSafeEqual(sig, want)) return { ok: false, status: 403 };
    this.blobs.set(`${container}/${key}`, { data, contentType });
    return { ok: true };
  }

  async head(container: string, key: string): Promise<BlobInfo | null> {
    this.check();
    const b = this.blobs.get(`${container}/${key}`);
    return b ? { bytes: b.data.length, contentType: b.contentType } : null;
  }

  async get(container: string, key: string, maxBytes: number): Promise<Buffer> {
    this.check();
    const b = this.blobs.get(`${container}/${key}`);
    if (!b) throw new Error('blob not found');
    if (b.data.length > maxBytes) throw new BlobTooLargeError(maxBytes);
    return b.data;
  }

  async put(container: string, key: string, data: Buffer, contentType: string): Promise<void> {
    this.check();
    this.blobs.set(`${container}/${key}`, { data, contentType });
  }

  async delete(container: string, key: string): Promise<void> {
    this.check();
    this.blobs.delete(`${container}/${key}`);
  }

  has(container: string, key: string): boolean {
    return this.blobs.has(`${container}/${key}`);
  }
}

/* ---------------------------------------------------------------------------------------------- */
/* Azure Blob REST + SAS                                                                           */
/* ---------------------------------------------------------------------------------------------- */

export const BLOB_API_VERSION = '2022-11-02';
export const STORAGE_SCOPE = 'https://storage.azure.com/.default';

/** SAS time format: ISO 8601 without milliseconds. */
export const sasTime = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, 'Z');

export interface SasFields {
  permissions: string;
  start?: string;
  expiry: string;
  /** /blob/{account}/{container}/{blob} */
  canonicalizedResource: string;
  protocol?: string;
  version?: string;
  resource?: 'b' | 'c';
  contentDisposition?: string;
  contentType?: string;
}

/** Service SAS string-to-sign (version 2020-12-06 and later). */
export function serviceSasStringToSign(f: SasFields): string {
  return [
    f.permissions,
    f.start ?? '',
    f.expiry,
    f.canonicalizedResource,
    '', // signedIdentifier
    '', // signedIP
    f.protocol ?? '',
    f.version ?? BLOB_API_VERSION,
    f.resource ?? 'b',
    '', // signedSnapshotTime
    '', // signedEncryptionScope
    '', // rscc
    f.contentDisposition ?? '', // rscd
    '', // rsce
    '', // rscl
    f.contentType ?? '', // rsct
  ].join('\n');
}

export interface UserDelegationKey {
  signedOid: string;
  signedTid: string;
  signedStart: string;
  signedExpiry: string;
  signedService: string;
  signedVersion: string;
  /** base64 */
  value: string;
}

/** User delegation SAS string-to-sign (version 2020-12-06 and later). */
export function userDelegationSasStringToSign(f: SasFields, k: UserDelegationKey): string {
  return [
    f.permissions,
    f.start ?? '',
    f.expiry,
    f.canonicalizedResource,
    k.signedOid,
    k.signedTid,
    k.signedStart,
    k.signedExpiry,
    k.signedService,
    k.signedVersion,
    '', // signedAuthorizedUserObjectId
    '', // signedUnauthorizedUserObjectId
    '', // signedCorrelationId
    '', // signedIP
    f.protocol ?? '',
    f.version ?? BLOB_API_VERSION,
    f.resource ?? 'b',
    '', // signedSnapshotTime
    '', // signedEncryptionScope
    '', // rscc
    f.contentDisposition ?? '',
    '', // rsce
    '', // rscl
    f.contentType ?? '',
  ].join('\n');
}

export function signSas(stringToSign: string, base64Key: string): string {
  return createHmac('sha256', Buffer.from(base64Key, 'base64')).update(stringToSign, 'utf8').digest('base64');
}

export interface AzureBlobOptions {
  /** https://{account}.blob.core.windows.net, or Azurite's http://127.0.0.1:10000/devstoreaccount1 */
  accountUrl: string;
  /** Azurite/local: shared key (base64). Production: omit and pass `credential`. */
  accountKey?: string;
  credential?: TokenCredentialLike;
  fetch?: typeof fetch;
  now?: () => number;
}

export class AzureBlobStore implements BlobStore {
  readonly name = 'azure';
  private readonly base: string;
  private readonly account: string;
  private readonly fetchImpl: typeof fetch;
  private readonly now: () => number;
  private udk: UserDelegationKey | null = null;

  constructor(private readonly opts: AzureBlobOptions) {
    if (!opts.accountKey && !opts.credential) throw new Error('AzureBlobStore needs a credential (managed identity) or, for Azurite, an account key');
    this.base = opts.accountUrl.replace(/\/+$/, '');
    const u = new URL(this.base);
    // Path-style (Azurite) URLs carry the account in the path; production in the host name.
    this.account = u.pathname.length > 1 ? u.pathname.split('/')[1]! : u.hostname.split('.')[0]!;
    this.fetchImpl = opts.fetch ?? globalThis.fetch;
    this.now = opts.now ?? Date.now;
  }

  private blobUrl(container: string, key: string): string {
    return `${this.base}/${container}/${key.split('/').map(encodeURIComponent).join('/')}`;
  }

  private async userDelegationKey(): Promise<UserDelegationKey> {
    const now = this.now();
    if (this.udk && Date.parse(this.udk.signedExpiry) - now > 60 * 60_000) return this.udk;
    const token = await this.opts.credential!.getToken(STORAGE_SCOPE);
    if (!token) throw new BlobUnavailableError(new Error('no storage token'));
    const start = sasTime(new Date(now - 5 * 60_000));
    const expiry = sasTime(new Date(now + 24 * 60 * 60_000));
    const res = await this.fetchImpl(`${this.base}/?restype=service&comp=userdelegationkey`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token.token}`, 'x-ms-version': BLOB_API_VERSION, 'content-type': 'application/xml' },
      body: `<?xml version="1.0" encoding="utf-8"?><KeyInfo><Start>${start}</Start><Expiry>${expiry}</Expiry></KeyInfo>`,
    });
    if (!res.ok) throw new BlobUnavailableError(new Error(`user delegation key → HTTP ${res.status}`));
    const xml = await res.text();
    const tag = (name: string) => xml.match(new RegExp(`<${name}>([^<]*)</${name}>`))?.[1] ?? '';
    this.udk = {
      signedOid: tag('SignedOid'),
      signedTid: tag('SignedTid'),
      signedStart: tag('SignedStart'),
      signedExpiry: tag('SignedExpiry'),
      signedService: tag('SignedService'),
      signedVersion: tag('SignedVersion'),
      value: tag('Value'),
    };
    return this.udk;
  }

  /** A SAS query string for one blob. */
  async sas(container: string, key: string, f: { permissions: string; expiresAt: Date; contentDisposition?: string; contentType?: string }): Promise<string> {
    const fields: SasFields = {
      permissions: f.permissions,
      start: sasTime(new Date(this.now() - 60_000)),
      expiry: sasTime(f.expiresAt),
      canonicalizedResource: `/blob/${this.account}/${container}/${key}`,
      protocol: this.base.startsWith('https://') ? 'https' : 'https,http',
      version: BLOB_API_VERSION,
      resource: 'b',
      contentDisposition: f.contentDisposition,
      contentType: f.contentType,
    };
    const q = new URLSearchParams({ sv: BLOB_API_VERSION, st: fields.start!, se: fields.expiry, sr: 'b', sp: f.permissions, spr: fields.protocol! });
    if (f.contentDisposition) q.set('rscd', f.contentDisposition);
    if (f.contentType) q.set('rsct', f.contentType);
    if (this.opts.accountKey) {
      q.set('sig', signSas(serviceSasStringToSign(fields), this.opts.accountKey));
    } else {
      const k = await this.userDelegationKey();
      q.set('skoid', k.signedOid);
      q.set('sktid', k.signedTid);
      q.set('skt', k.signedStart);
      q.set('ske', k.signedExpiry);
      q.set('sks', k.signedService);
      q.set('skv', k.signedVersion);
      q.set('sig', signSas(userDelegationSasStringToSign(fields, k), k.value));
    }
    return q.toString();
  }

  private async call(method: string, container: string, key: string, perms: string, init: { body?: Buffer; headers?: Record<string, string> } = {}): Promise<Response> {
    const headers: Record<string, string> = { 'x-ms-version': BLOB_API_VERSION, ...init.headers };
    let url = this.blobUrl(container, key);
    if (this.opts.accountKey) {
      url += `?${await this.sas(container, key, { permissions: perms, expiresAt: new Date(this.now() + 5 * 60_000) })}`;
    } else {
      const token = await this.opts.credential!.getToken(STORAGE_SCOPE);
      if (!token) throw new BlobUnavailableError(new Error('no storage token'));
      headers.authorization = `Bearer ${token.token}`;
      headers['x-ms-date'] = new Date(this.now()).toUTCString();
    }
    try {
      return await this.fetchImpl(url, { method, headers, body: init.body as BodyInit | undefined, signal: AbortSignal.timeout(30_000) });
    } catch (error) {
      throw new BlobUnavailableError(error);
    }
  }

  async createUploadUrl(container: string, key: string, opts: { contentType: string; expiresAt: Date }): Promise<UploadTarget> {
    // Create + write only: the browser cannot read, list or delete anything (AC-16).
    const q = await this.sas(container, key, { permissions: 'cw', expiresAt: opts.expiresAt });
    return { url: `${this.blobUrl(container, key)}?${q}`, method: 'PUT', headers: { 'x-ms-blob-type': 'BlockBlob', 'content-type': opts.contentType }, expiresAt: opts.expiresAt };
  }

  async createReadUrl(container: string, key: string, opts: { expiresAt: Date; filename: string; contentType: string }): Promise<string> {
    // Served as an attachment with its exact type, never inline on our origin (AC-16).
    const q = await this.sas(container, key, { permissions: 'r', expiresAt: opts.expiresAt, contentDisposition: `attachment; filename="${opts.filename.replace(/[^\w.-]/g, '_')}"`, contentType: opts.contentType });
    return `${this.blobUrl(container, key)}?${q}`;
  }

  async head(container: string, key: string): Promise<BlobInfo | null> {
    const res = await this.call('HEAD', container, key, 'r');
    if (res.status === 404) return null;
    if (!res.ok) throw new BlobUnavailableError(new Error(`HEAD → HTTP ${res.status}`));
    return { bytes: Number(res.headers.get('content-length') ?? 0), contentType: res.headers.get('content-type') };
  }

  async get(container: string, key: string, maxBytes: number): Promise<Buffer> {
    const info = await this.head(container, key);
    if (!info) throw new Error('blob not found');
    if (info.bytes > maxBytes) throw new BlobTooLargeError(maxBytes);
    const res = await this.call('GET', container, key, 'r', { headers: { 'x-ms-range': `bytes=0-${maxBytes}` } });
    if (!res.ok) throw new BlobUnavailableError(new Error(`GET → HTTP ${res.status}`));
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > maxBytes) throw new BlobTooLargeError(maxBytes);
    return buf;
  }

  async put(container: string, key: string, data: Buffer, contentType: string): Promise<void> {
    const res = await this.call('PUT', container, key, 'cw', { body: data, headers: { 'x-ms-blob-type': 'BlockBlob', 'content-type': contentType } });
    if (!res.ok) throw new BlobUnavailableError(new Error(`PUT → HTTP ${res.status}`));
  }

  async delete(container: string, key: string): Promise<void> {
    const res = await this.call('DELETE', container, key, 'd');
    if (!res.ok && res.status !== 404) throw new BlobUnavailableError(new Error(`DELETE → HTTP ${res.status}`));
  }
}

/** BLOB_PROVIDER=disabled: uploads refused with 503. */
export class DisabledBlobStore implements BlobStore {
  readonly name = 'disabled';
  private fail(): never {
    throw new BlobUnavailableError(new Error('blob storage is not configured'));
  }
  async createUploadUrl(): Promise<UploadTarget> {
    this.fail();
  }
  async createReadUrl(): Promise<string> {
    this.fail();
  }
  async head(): Promise<BlobInfo | null> {
    this.fail();
  }
  async get(): Promise<Buffer> {
    this.fail();
  }
  async put(): Promise<void> {
    this.fail();
  }
  async delete(): Promise<void> {
    this.fail();
  }
}
