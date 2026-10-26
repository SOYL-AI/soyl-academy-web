# ADR-005: Same-domain API proxy and edge-to-origin authentication

- **Status:** Accepted (API side implemented in M1; the web side is web-platform's M1 task)
- **Date:** 2026-10-26
- **Author:** backend-api
- **Related:** ARCHITECTURE §1, §3.2, §13; DECISIONS D-016, D-018; ADR-001 item 5; security requirements API-1, API-2, API-3, API-4, AUTH-8, AUTH-12, WEB-2, WEB-11; threat model AC-04, AC-05, AC-21; findings F-005, F-013, F-024

## Context

The browser only talks to `www.soylai.com`. Platform API calls go to `/api/platform/*` on that origin, so cookies stay first-party and no CORS is needed (ARCHITECTURE §1). The API runs on Azure Container Apps with a public FQDN. Without an extra check, anyone can call the FQDN directly. That bypasses the web tier and lets the caller set any `X-Forwarded-For` (defeating IP rate limits) and any `Host` header (AC-05). D-016 requires a shared edge secret on every `/v1/*` request. D-018 picked a Next.js **route handler** as the forwarder, because a `next.config.ts` rewrite cannot add a server-only header.

This ADR is the contract between the two sides. backend-api implements and tests the API side. web-platform implements the route handler against it.

## Options considered

1. **`next.config.ts` rewrite.** Cannot add or overwrite request headers, so it fails D-016/WEB-2. It also changes a shared marketing file. Rejected.
2. **Next 16 `proxy.ts` (middleware) with a matcher on `/api/platform/:path*`.** Can add headers, but it adds a root shared file that runs in front of routing (ADR-001 item 6), and streaming plus large bodies are awkward there. Rejected.
3. **Route handler `app/(platform)/api/platform/[...path]/route.ts` (chosen, D-018).** Lives inside the platform route group, needs no shared-file change, can stream responses (SSE in M4), and can return 404 when the platform is off.
4. **Front Door + WAF in front of a private ACA origin.** Stronger, but it is new infrastructure and deployment is out of scope (D-025). Revisit in M6 as defence in depth; it does not replace the secret.

## Decision

### Headers (exact names)

| Header | Set by | Meaning |
|---|---|---|
| `x-soyl-edge-auth` | web route handler, from server-only env `PLATFORM_EDGE_SECRET` | Edge secret. **Overwrite** any client-supplied value. Never `NEXT_PUBLIC_` (WEB-11). |
| `x-soyl-client-ip` | web route handler, from Vercel's `x-real-ip` | The browser's IP. **Overwrite** any client-supplied value. The API trusts it only after edge auth passed (API-3). The header name is configurable on the API (`CLIENT_IP_HEADER`). |
| `origin` | browser | Forwarded **unchanged**. The API's CSRF check (AUTH-12) compares it exactly with `ALLOWED_ORIGINS`. |
| `cookie` | browser | Forwarded unchanged. Carries `__Host-soyl_session` and, during Google sign-in, `__Host-soyl_oauth`. |

### API side (implemented in `platform/api`, tested in `test/http-pipeline.test.ts`)

- **Edge auth (API-2).** Every path under `/v1` requires `x-soyl-edge-auth` equal to one of `EDGE_SECRETS` (comma-separated, at most two, each at least 32 characters). Both sides are hashed with SHA-256 and compared with `timingSafeEqual`, and every configured secret is checked, so the timing does not reveal which one matched. A missing or wrong secret gets **403** problem+json (`code: edge_auth_failed`) and a `security=true` log event `edge_auth_failed`. The access log records which secret matched (`res.edge`: 0 or 1), never the secret itself.
- **Exempt:** `GET /healthz` and `GET /readyz` (probes). They return only `{"status": ...}`. No other path exists outside `/v1`.
- **Flag off (GEN-4).** With `PLATFORM_ENABLED=false`, everything except health returns 404 **before** the edge check, so a scanner learns nothing.
- **Client IP (API-3).** Fastify `trustProxy` is off, so `X-Forwarded-For`, `Forwarded` and `X-Real-IP` are ignored. After edge auth, `x-soyl-client-ip` is used if it parses as an IP literal. Otherwise the socket address is used.
- **Fixed base URL (API-1).** Absolute URLs (the Google `redirect_uri`, post-login redirects) come from `PUBLIC_BASE_URL` + `API_PUBLIC_PATH` (default `/api/platform`), never from `Host` or `X-Forwarded-Host`.
- **No CORS (API-4).** No `Access-Control-*` headers are ever sent.

### Web side (contract for `app/(platform)/api/platform/[...path]/route.ts`)

1. **Off switch.** Return 404 (marketing 404 page or empty) when the platform flag is off or `PLATFORM_API_ORIGIN` is unset.
2. **Path allowlist.** Forward only paths matching `^v1/[A-Za-z0-9/_\-.:]*$` to `${PLATFORM_API_ORIGIN}/${path}${search}`. Reject `..`, encoded slashes and backslashes with 404. Health is not proxied.
3. **Methods.** GET, POST, PUT, PATCH, DELETE. HEAD and OPTIONS return 405. There is no CORS preflight, because the app is same-origin.
4. **Request headers.** Build a fresh `Headers` with only this allowlist from the incoming request: `accept`, `accept-language`, `content-type`, `content-length` (or let fetch set it), `cookie`, `origin`, `user-agent`, `if-none-match`. Then **set** `x-soyl-edge-auth` and `x-soyl-client-ip`. Everything else is dropped, notably `host`, `x-forwarded-*`, `forwarded`, `x-real-ip` and any client-sent `x-soyl-*`.
5. **Request body.** Stream it (`body: request.body, duplex: 'half'`) for methods with a body. The API enforces size limits (64 KB, 256 KB for `/v1/me/merge-guest`). Uploads never go through the proxy (D-018, F-013).
6. **Upstream fetch.** `redirect: 'manual'`, so 302s from the Google start and callback reach the browser. Use `cache: 'no-store'` and a 30 s timeout (`AbortSignal.timeout`); M4 SSE routes will need longer. The route is `export const dynamic = 'force-dynamic'` and runs in the `bom1` region (AC-24).
7. **Response.** Same status. The body is streamed through unchanged (`new Response(upstream.body, …)`), which works for JSON, problem+json and SSE. Pass through only these headers: `content-type`, `cache-control`, `etag`, `location`, `retry-after`, `clear-site-data`, `x-trace-id`, and **every** `set-cookie` (use `upstream.headers.getSetCookie()` and append each). Do not rewrite cookie attributes. The API already sets `__Host-` names with `Path=/`, no `Domain`, and `Secure` on https.
8. **Errors.** If the upstream is unreachable, return 502 with a small problem+json body (`code: upstream_unavailable`). Never return the upstream error text.
9. **Caching.** Never cache responses that carry `set-cookie` or `cache-control: no-store`. Catalog responses carry `public, max-age=300, s-maxage=3600, stale-while-revalidate=86400` with an ETag. They are the same for every user, so the CDN may cache them. The API sends `no-store` whenever the request had a session.

### Secret rotation (two valid at a time)

1. Generate a new secret (at least 32 random bytes, base64url).
2. API: set `EDGE_SECRETS="<current>,<new>"`. Both are now accepted. Deploy.
3. Web: set `PLATFORM_EDGE_SECRET=<new>` in Vercel (server-only) and redeploy.
4. Watch the API access logs until every request shows `res.edge = 1`, which means the new secret is in use.
5. API: set `EDGE_SECRETS="<new>"` and deploy. Next time, the order is the same: current first, next second.

Rotate every 90 days and immediately on suspicion (AC-21). The secret lives in Key Vault for the API and in Vercel server env for the web. This is the one secret in Vercel; F-024 records it as an exception.

### Local development

The API (`npm run dev -w @soyl/api`, port 8787) accepts the public development secret `local-dev-edge-secret-not-for-deployment-000000` when `APP_ENV=local`. Config refuses this value in every other environment. The web's local `.env` sets `PLATFORM_API_ORIGIN=http://localhost:8787` and `PLATFORM_EDGE_SECRET` to the same value. `PUBLIC_BASE_URL` defaults to `http://localhost:3000`, so cookies are the non-`__Host-` names `soyl_session` / `soyl_oauth` without `Secure` (browsers reject `__Host-` on http).

## Consequences

- The API is unusable without the web tier (or the secret). Direct calls to the ACA FQDN get 403 on `/v1/*` (INFRA-7 test).
- Rate limits and auth logs see the real client IP only if the route handler sets `x-soyl-client-ip` from a value Vercel controls. **To verify on the first staging deploy (API-3 spike):** a request with a spoofed `X-Forwarded-For` / `X-Real-IP` through `www` must still log the true IP. If Vercel's `x-real-ip` turns out to be client-influenced, switch to `x-vercel-forwarded-for` (first entry). The API needs no change.
- One extra hop (Vercel function to ACA) per API call. Keep the function in `bom1` next to Central India.
- If the secret leaks, rotate as above. A leak lets an attacker bypass IP attribution, but not authentication: sessions, CSRF and all per-user limits still apply.
