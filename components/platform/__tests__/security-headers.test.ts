// @vitest-environment node
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { CONSENT_BOOT_SCRIPT } from '@/components/legal/consent';
import { buildCsp, CONSENT_BOOT_SCRIPT_HASH, createNonce, securityHeaders, summariseCspReport, usesNonce } from '../server/security-headers';
import { config } from '../../../proxy';

describe('CSP (WEB-3)', () => {
  it('static policy: self + inline (F-010 exception), never a third-party host', () => {
    const csp = buildCsp({ https: true });
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).not.toContain('unsafe-eval');
    for (const d of ["default-src 'self'", "object-src 'none'", "base-uri 'none'", "frame-ancestors 'none'", "form-action 'self'", "connect-src 'self'", "font-src 'self'", "style-src 'self' 'unsafe-inline'", 'upgrade-insecure-requests', 'report-to csp']) {
      expect(csp).toContain(d);
    }
    expect(csp).not.toMatch(/https?:\/\//);
  });
  it('nonce policy: nonce + strict-dynamic + the consent boot script hash, no unsafe-inline', () => {
    const csp = buildCsp({ nonce: 'abc' });
    expect(csp).toContain("script-src 'self' 'nonce-abc' 'strict-dynamic'");
    expect(csp).toContain(CONSENT_BOOT_SCRIPT_HASH);
    expect(csp).not.toContain("'unsafe-inline' 'unsafe-eval'");
    expect(csp.split('; ').find((d) => d.startsWith('script-src'))).not.toContain('unsafe-inline');
    expect(csp).not.toContain('upgrade-insecure-requests');
  });
  it('hash matches the root layout inline script', () => {
    expect(CONSENT_BOOT_SCRIPT_HASH).toBe(`'sha256-${createHash('sha256').update(CONSENT_BOOT_SCRIPT).digest('base64')}'`);
  });
  it('dev adds unsafe-eval; CDN origin only when https', () => {
    expect(buildCsp({ dev: true })).toContain("'unsafe-eval'");
    expect(buildCsp({ cdnBaseUrl: 'https://cdn.soylai.com/assets/' })).toContain("img-src 'self' data: blob: https://cdn.soylai.com");
    expect(buildCsp({ cdnBaseUrl: 'http://cdn.example' })).not.toContain('cdn.example');
  });
  it('nonces are fresh and long enough', () => {
    const a = createNonce();
    expect(a).not.toBe(createNonce());
    expect(Buffer.from(a, 'base64')).toHaveLength(16);
  });
  it('nonce routes are the logged-in dynamic ones', () => {
    expect(usesNonce('/me')).toBe(true);
    expect(usesNonce('/tests/attempt/1')).toBe(true);
    expect(usesNonce('/learn/cbse/10')).toBe(false);
    expect(usesNonce('/media')).toBe(false);
  });
});

describe('WEB-4 headers', () => {
  it('sets the full set, HSTS only over https', () => {
    const h = securityHeaders({ https: true, origin: 'https://www.soylai.com' });
    expect(h).toMatchObject({
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'permissions-policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
      'cross-origin-opener-policy': 'same-origin',
      'strict-transport-security': 'max-age=63072000; includeSubDomains',
      'reporting-endpoints': 'csp="https://www.soylai.com/api/platform/csp-report"',
    });
    expect(securityHeaders({ origin: 'http://localhost:3000' })['strict-transport-security']).toBeUndefined();
  });
});

describe('proxy.ts matcher (ARCHITECTURE §17.5)', () => {
  it('lists only platform prefixes', () => {
    const marketing = ['/', '/about', '/students', '/journal', '/api/enroll', '/og', '/sitemap.xml'];
    for (const m of config.matcher) {
      expect(m.startsWith('/learn') || m.startsWith('/me') || m.startsWith('/tests') || m.startsWith('/ask') || m.startsWith('/plans') || m.startsWith('/leaderboard') || m.startsWith('/admin')).toBe(true);
      for (const page of marketing) expect(m === page).toBe(false);
    }
  });
});

describe('summariseCspReport', () => {
  it('keeps directive, blocked origin and page path only', () => {
    const legacy = JSON.stringify({ 'csp-report': { 'document-uri': 'https://www.soylai.com/me?phone=9999999999', 'effective-directive': 'script-src-elem', 'blocked-uri': 'https://evil.example/x.js?token=1' } });
    expect(summariseCspReport(legacy)).toEqual([{ directive: 'script-src-elem', blocked: 'https://evil.example', page: '/me' }]);
    const modern = JSON.stringify([{ type: 'csp-violation', body: { documentURL: 'https://www.soylai.com/learn', effectiveDirective: 'script-src', blockedURL: 'inline' } }, { type: 'deprecation', body: {} }]);
    expect(summariseCspReport(modern)).toEqual([{ directive: 'script-src', blocked: 'inline', page: '/learn' }]);
    expect(summariseCspReport('not json')).toEqual([]);
  });
});
