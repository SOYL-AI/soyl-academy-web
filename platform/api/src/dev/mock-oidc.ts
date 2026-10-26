/**
 * A tiny OpenID Connect provider standing in for Google in tests and local development (GEN-3: config
 * refuses any issuer but https://accounts.google.com in production). It implements what the API's
 * openid-client flow needs and checks what Google checks:
 *
 *   GET  /.well-known/openid-configuration   discovery
 *   GET  /jwks                               RS256 public key
 *   GET  /authorize                          validates client_id + exact redirect_uri, S256 PKCE challenge;
 *                                            shows a one-field form (email) unless `login_hint` or a
 *                                            queued test user is present, then 302s back with code + state
 *   POST /token                              authorization_code grant: client auth, single-use code,
 *                                            redirect_uri match, PKCE verifier check; returns a signed ID token
 *
 * Tests queue users with `nextUser()` and can tamper with the ID token (`tamper`).
 */
import { createHash, randomBytes } from 'node:crypto';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { exportJWK, generateKeyPair, SignJWT, type JWK } from 'jose';

export interface MockGoogleUser {
  sub: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  /** Google Workspace hosted domain. */
  hd?: string;
}

export interface Tamper {
  nonce?: string;
  aud?: string;
  iss?: string;
  expiresInSeconds?: number;
  /** Sign with a different key than the JWKS publishes. */
  wrongKey?: boolean;
}

interface CodeRecord {
  clientId: string;
  redirectUri: string;
  nonce?: string;
  challenge: string;
  user: MockGoogleUser;
  scope: string;
}

export interface MockOidcOptions {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  port?: number;
}

export class MockOidcServer {
  private server!: Server;
  private keys!: { privateKey: CryptoKey; publicJwk: JWK; otherKey: CryptoKey };
  private codes = new Map<string, CodeRecord>();
  private queue: MockGoogleUser[] = [];
  tamper: Tamper = {};
  issuer = '';
  tokenRequests = 0;

  constructor(private readonly o: MockOidcOptions) {}

  async start(): Promise<string> {
    const { privateKey, publicKey } = await generateKeyPair('RS256', { extractable: true });
    const other = await generateKeyPair('RS256');
    this.keys = { privateKey: privateKey as CryptoKey, otherKey: other.privateKey as CryptoKey, publicJwk: { ...(await exportJWK(publicKey)), kid: 'mock-1', alg: 'RS256', use: 'sig' } };
    this.server = createServer((req, res) => {
      this.handle(req, res).catch(() => {
        res.statusCode = 500;
        res.end();
      });
    });
    await new Promise<void>((resolve) => this.server.listen(this.o.port ?? 0, '127.0.0.1', resolve));
    this.issuer = `http://127.0.0.1:${(this.server.address() as AddressInfo).port}`;
    return this.issuer;
  }

  async stop(): Promise<void> {
    await new Promise<void>((resolve) => this.server.close(() => resolve()));
  }

  /** The next /authorize without login_hint signs in as this user. */
  nextUser(user: MockGoogleUser): void {
    this.queue.push(user);
  }

  private json(res: ServerResponse, status: number, body: unknown) {
    res.statusCode = status;
    res.setHeader('content-type', 'application/json');
    res.setHeader('cache-control', 'no-store');
    res.end(JSON.stringify(body));
  }

  private async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url ?? '/', this.issuer);
    if (url.pathname === '/.well-known/openid-configuration') {
      return this.json(res, 200, {
        issuer: this.issuer,
        authorization_endpoint: `${this.issuer}/authorize`,
        token_endpoint: `${this.issuer}/token`,
        jwks_uri: `${this.issuer}/jwks`,
        response_types_supported: ['code'],
        subject_types_supported: ['public'],
        id_token_signing_alg_values_supported: ['RS256'],
        scopes_supported: ['openid', 'email', 'profile'],
        token_endpoint_auth_methods_supported: ['client_secret_post', 'client_secret_basic'],
        code_challenge_methods_supported: ['S256'],
        claims_supported: ['sub', 'email', 'email_verified', 'name', 'picture', 'hd', 'nonce'],
      });
    }
    if (url.pathname === '/jwks') return this.json(res, 200, { keys: [this.keys.publicJwk] });
    if (url.pathname === '/authorize' && req.method === 'GET') return this.authorize(url, res);
    if (url.pathname === '/token' && req.method === 'POST') return this.token(req, res);
    res.statusCode = 404;
    res.end();
  }

  private authorize(url: URL, res: ServerResponse) {
    const p = url.searchParams;
    const redirectUri = p.get('redirect_uri') ?? '';
    if (p.get('client_id') !== this.o.clientId || !this.o.redirectUris.includes(redirectUri))
      return this.json(res, 400, { error: 'invalid_request', error_description: 'unknown client or redirect_uri' });
    if (p.get('response_type') !== 'code' || p.get('code_challenge_method') !== 'S256' || !p.get('code_challenge'))
      return this.json(res, 400, { error: 'invalid_request', error_description: 'code flow with S256 PKCE required' });
    const scope = p.get('scope') ?? '';
    if (!scope.split(' ').includes('openid')) return this.json(res, 400, { error: 'invalid_scope' });

    const hint = p.get('login_hint');
    let user = this.queue.shift();
    if (!user && hint) user = { sub: `mock-${createHash('sha256').update(hint).digest('hex').slice(0, 16)}`, email: hint, email_verified: true, name: hint.split('@')[0] };
    if (!user) {
      // Local development: a one-field form, no JavaScript.
      res.statusCode = 200;
      res.setHeader('content-type', 'text/html; charset=utf-8');
      const hidden = [...p.entries()].map(([k, v]) => `<input type="hidden" name="${escapeHtml(k)}" value="${escapeHtml(v)}">`).join('');
      return res.end(
        `<!doctype html><title>Mock Google sign-in</title><h1>Mock Google sign-in (local only)</h1><form method="get" action="/authorize">${hidden}<label>Email <input name="login_hint" value="google.student@example.com"></label> <button type="submit">Sign in</button></form>`,
      );
    }
    const code = randomBytes(24).toString('base64url');
    this.codes.set(code, { clientId: this.o.clientId, redirectUri, nonce: p.get('nonce') ?? undefined, challenge: p.get('code_challenge')!, user, scope });
    const back = new URL(redirectUri);
    back.searchParams.set('code', code);
    if (p.get('state')) back.searchParams.set('state', p.get('state')!);
    res.statusCode = 302;
    res.setHeader('location', back.toString());
    res.end();
  }

  private async token(req: IncomingMessage, res: ServerResponse) {
    this.tokenRequests++;
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    const form = new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
    let clientId = form.get('client_id');
    let clientSecret = form.get('client_secret');
    const basic = req.headers.authorization?.match(/^Basic (.+)$/)?.[1];
    if (basic) {
      const [id, secret] = Buffer.from(basic, 'base64').toString('utf8').split(':').map(decodeURIComponent);
      clientId = id ?? null;
      clientSecret = secret ?? null;
    }
    if (clientId !== this.o.clientId || clientSecret !== this.o.clientSecret) return this.json(res, 401, { error: 'invalid_client' });
    if (form.get('grant_type') !== 'authorization_code') return this.json(res, 400, { error: 'unsupported_grant_type' });
    const code = form.get('code') ?? '';
    const rec = this.codes.get(code);
    this.codes.delete(code); // single use
    if (!rec || rec.redirectUri !== form.get('redirect_uri')) return this.json(res, 400, { error: 'invalid_grant' });
    const verifier = form.get('code_verifier') ?? '';
    const challenge = createHash('sha256').update(verifier).digest('base64url');
    if (challenge !== rec.challenge) return this.json(res, 400, { error: 'invalid_grant', error_description: 'PKCE verification failed' });

    const t = this.tamper;
    const now = Math.floor(Date.now() / 1000);
    const claims: Record<string, unknown> = {
      email: rec.user.email,
      email_verified: rec.user.email_verified ?? true,
      name: rec.user.name,
      picture: rec.user.picture,
      ...(rec.user.hd ? { hd: rec.user.hd } : {}),
      ...(t.nonce ?? rec.nonce ? { nonce: t.nonce ?? rec.nonce } : {}),
    };
    const idToken = await new SignJWT(claims)
      .setProtectedHeader({ alg: 'RS256', kid: 'mock-1' })
      .setIssuer(t.iss ?? this.issuer)
      .setAudience(t.aud ?? rec.clientId)
      .setSubject(rec.user.sub)
      .setIssuedAt(now)
      .setExpirationTime(now + (t.expiresInSeconds ?? 3600))
      .sign(t.wrongKey ? this.keys.otherKey : this.keys.privateKey);
    return this.json(res, 200, { access_token: randomBytes(24).toString('base64url'), token_type: 'Bearer', expires_in: 3600, scope: rec.scope, id_token: idToken });
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
