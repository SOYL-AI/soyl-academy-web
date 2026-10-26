/**
 * Google sign-in (AUTH-6): OpenID Connect authorization code flow with PKCE (S256), state and nonce,
 * through openid-client (discovery, JWKS signature check, iss/aud/exp/nonce validation).
 *
 * - The issuer is configurable (GOOGLE_ISSUER) so local runs and tests use a mock OIDC provider;
 *   production config refuses anything but https://accounts.google.com (GEN-3).
 * - Redirect URI is fixed from config (API-1): `${PUBLIC_BASE_URL}${API_PUBLIC_PATH}/v1/auth/google/callback`.
 * - State is single use (KV `take`), expires in 10 min and is also bound to the browser by a signed,
 *   HttpOnly `__Host-soyl_oauth` cookie, so a callback URL cannot be replayed in another browser
 *   (login CSRF).
 * - Scopes: `openid email profile` only. Google is identified by `sub`; the email is used only when
 *   `email_verified` is true (enforced in IdentityService).
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import * as oidc from 'openid-client';
import { OAUTH } from '@soyl/shared/config/security';
import type { Clock } from '../clock';
import type { Config } from '../config';
import type { KeyValueStore } from '../kv';
import type { GoogleProfile } from './identity';

export interface OAuthStateRecord {
  verifier: string;
  nonce: string;
  returnTo: string;
  intent: 'signin' | 'link';
  /** For intent=link: the signed-in user who started the flow. */
  userId: string | null;
  createdAt: number;
}

export class OAuthFlowError extends Error {
  constructor(readonly reason: 'state_mismatch' | 'state_expired' | 'provider_error' | 'token_invalid') {
    super(reason);
    this.name = 'OAuthFlowError';
  }
}

export interface GoogleAuthOptions {
  /** Test/local only: allow http issuers. Never in stg/prod (config enforces https there). */
  allowInsecure?: boolean;
  fetch?: typeof fetch;
}

export class GoogleAuth {
  private configuration: Promise<oidc.Configuration> | null = null;
  private jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

  constructor(
    private readonly config: Pick<Config, 'google' | 'authSecret' | 'secureCookies'>,
    private readonly kv: KeyValueStore,
    private readonly clock: Clock,
    private readonly opts: GoogleAuthOptions = {},
  ) {}

  get stateCookieName(): string {
    return this.config.secureCookies ? OAUTH.stateCookieName : OAUTH.insecureStateCookieName;
  }

  private discover(): Promise<oidc.Configuration> {
    if (!this.configuration) {
      const options: oidc.DiscoveryRequestOptions = {};
      if (this.opts.allowInsecure) options.execute = [oidc.allowInsecureRequests];
      if (this.opts.fetch) options[oidc.customFetch] = this.opts.fetch as unknown as oidc.CustomFetch;
      this.configuration = oidc.discovery(
        new URL(this.config.google.issuer),
        this.config.google.clientId,
        this.config.google.clientSecret,
        undefined,
        options,
      );
      // Retry discovery on the next request if it failed.
      this.configuration.catch(() => {
        this.configuration = null;
      });
    }
    return this.configuration;
  }

  signState(state: string): string {
    return `${state}.${createHmac('sha256', this.config.authSecret).update(`oauth-state:${state}`).digest('base64url')}`;
  }

  /** The state from a signed cookie value, or null if the signature is wrong. */
  verifyStateCookie(value: string | null): string | null {
    if (!value) return null;
    const dot = value.lastIndexOf('.');
    if (dot < 1) return null;
    const state = value.slice(0, dot);
    const a = Buffer.from(value);
    const b = Buffer.from(this.signState(state));
    return a.length === b.length && timingSafeEqual(a, b) ? state : null;
  }

  /** Starts a flow: stores state + PKCE verifier + nonce and returns the authorization URL. */
  async start(input: { returnTo: string; intent: 'signin' | 'link'; userId: string | null }): Promise<{ url: string; state: string }> {
    const configuration = await this.discover();
    const verifier = oidc.randomPKCECodeVerifier();
    const challenge = await oidc.calculatePKCECodeChallenge(verifier);
    const state = randomBytes(24).toString('base64url');
    const nonce = randomBytes(24).toString('base64url');
    const record: OAuthStateRecord = { verifier, nonce, returnTo: input.returnTo, intent: input.intent, userId: input.userId, createdAt: this.clock.now() };
    await this.kv.set(`oauth:${state}`, JSON.stringify(record), OAUTH.stateTtlSeconds * 1000, this.clock.now());
    const url = oidc.buildAuthorizationUrl(configuration, {
      redirect_uri: this.config.google.redirectUri,
      response_type: 'code',
      scope: OAUTH.googleScopes,
      state,
      nonce,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      prompt: 'select_account',
    });
    return { url: url.toString(), state };
  }

  /**
   * Completes a flow. `query` is the callback's raw query string; `cookieState` the state from the
   * signed cookie. Returns the validated profile and the stored state record.
   */
  async callback(query: string, cookieState: string | null): Promise<{ profile: GoogleProfile; record: OAuthStateRecord }> {
    const params = new URLSearchParams(query);
    const state = params.get('state');
    if (!state || !cookieState || state.length !== cookieState.length || !timingSafeEqual(Buffer.from(state), Buffer.from(cookieState)))
      throw new OAuthFlowError('state_mismatch');
    const raw = await this.kv.take(`oauth:${state}`, this.clock.now());
    if (!raw) throw new OAuthFlowError('state_expired');
    const record = JSON.parse(raw) as OAuthStateRecord;
    if (params.get('error')) throw new OAuthFlowError('provider_error');

    const configuration = await this.discover();
    // API-1: the "current URL" is rebuilt from the configured redirect URI, never from Host.
    const currentUrl = new URL(this.config.google.redirectUri);
    currentUrl.search = params.toString();
    let claims: oidc.IDToken | undefined;
    try {
      const tokens = await oidc.authorizationCodeGrant(configuration, currentUrl, {
        pkceCodeVerifier: record.verifier,
        expectedState: state,
        expectedNonce: record.nonce,
        idTokenExpected: true,
      });
      claims = tokens.claims();
      // openid-client follows OIDC Core 3.1.3.7 and may skip the JWS check for ID tokens received
      // directly from the token endpoint over TLS. AUTH-6 asks for it anyway: verify against the JWKS.
      if (!tokens.id_token) throw new Error('no id_token');
      const meta = configuration.serverMetadata();
      this.jwks ??= createRemoteJWKSet(new URL(String(meta.jwks_uri)));
      await jwtVerify(tokens.id_token, this.jwks, { issuer: meta.issuer, audience: this.config.google.clientId, algorithms: ['RS256'] });
    } catch {
      throw new OAuthFlowError('token_invalid');
    }
    if (!claims || typeof claims.sub !== 'string' || typeof claims.email !== 'string') throw new OAuthFlowError('token_invalid');
    return {
      record,
      profile: {
        sub: claims.sub,
        email: claims.email.toLowerCase(),
        emailVerified: claims.email_verified === true,
        name: typeof claims.name === 'string' ? claims.name : undefined,
        picture: typeof claims.picture === 'string' ? claims.picture : undefined,
        hd: typeof claims.hd === 'string' ? claims.hd : undefined,
      },
    };
  }
}
