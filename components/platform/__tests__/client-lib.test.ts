import { describe, expect, it } from 'vitest';
import { ApiError } from '@/platform/shared/api-client';
import { chapterSlug, examFor, learnPath, parseBoard, parseChapterSlug, parseChapterView, parseClass, subjectIdFor, subjectSlug } from '../lib/catalog';
import { emailError, maskedPhone, nationalDigits, phoneError, toE164India } from '../lib/phone';
import { googleErrorMessage, problemMessage } from '../lib/problems';
import { currentReturnTo, googleStartUrl, safeReturnTo, takeAuthResult } from '../lib/return-to';

describe('return-to (AUTH-13, WEB-8)', () => {
  it.each(['//evil.com', '/\\evil.com', 'https://evil.com', 'javascript:alert(1)', '/%2F%2Fevil.com', '/about', '/learning', '', '/learn\u0000x'])(
    '%s → /learn',
    (raw) => {
      expect(safeReturnTo(raw)).toBe('/learn');
    },
  );
  it.each(['/learn', '/learn/cbse/10/science/ch01', '/me', '/tests/series/cbse/10/science?x=1'])('%s is kept', (raw) => {
    expect(safeReturnTo(raw)).toBe(raw);
  });
  it('the current page drops auth result params', () => {
    expect(currentReturnTo({ pathname: '/learn/cbse/10', search: '?authError=oauth_state&tab=2' })).toBe('/learn/cbse/10?tab=2');
    expect(currentReturnTo({ pathname: '/about', search: '' })).toBe('/learn');
  });
  it('Google start URL carries a safe returnTo only', () => {
    expect(googleStartUrl('/learn/cbse/10')).toBe('/api/platform/v1/auth/google/start?returnTo=%2Flearn%2Fcbse%2F10');
    expect(googleStartUrl('https://evil.com')).toBe('/api/platform/v1/auth/google/start?returnTo=%2Flearn');
    expect(googleStartUrl('/me', 'link')).toBe('/api/platform/v1/auth/google/start?returnTo=%2Fme&intent=link');
  });
  it('reads and strips Google results', () => {
    expect(takeAuthResult('http://x/learn?authError=oauth_state&a=1#h')).toEqual({ authError: 'oauth_state', linked: null, cleaned: '/learn?a=1#h' });
    expect(takeAuthResult('http://x/me?linked=google')).toEqual({ authError: null, linked: 'google', cleaned: '/me' });
    expect(takeAuthResult('http://x/learn?authError=%3Cscript%3E').authError).toBe('oauth_failed');
    expect(takeAuthResult('http://x/learn').cleaned).toBeNull();
  });
});

describe('phone and email input (AUTH-1)', () => {
  it.each([
    ['98765 43210', '+919876543210'],
    ['+91 98765-43210', '+919876543210'],
    ['919876543210', '+919876543210'],
    ['09876543210', '+919876543210'],
    ['5550001234', '+915550001234'],
  ])('%s → %s', (input, e164) => {
    expect(toE164India(input)).toBe(e164);
    expect(phoneError(input)).toBeNull();
  });
  it.each(['12345', '5876543210', '+1 4155550100', '98765432101', ''])('%s is refused', (input) => {
    expect(toE164India(input)).toBeNull();
    expect(phoneError(input)).not.toBeNull();
  });
  it('national digits strip prefixes', () => {
    expect(nationalDigits('+91 (987) 654-3210')).toBe('9876543210');
  });
  it('masks for display', () => {
    expect(maskedPhone('+919876543210')).toBe('+91 ******3210');
  });
  it('validates emails', () => {
    expect(emailError('a@example.com')).toBeNull();
    expect(emailError('nope')).not.toBeNull();
    expect(emailError(' ')).not.toBeNull();
  });
});

describe('problem messages', () => {
  const err = (code: string, retryAfterSeconds?: number) =>
    new ApiError(400, code, { type: 'about:blank', title: 't', status: 400, code, traceId: 'x', retryAfterSeconds });
  it('explains lockouts with the wait', () => {
    expect(problemMessage(err('otp_locked', 3600), 'phone')).toBe('Too many wrong codes. For your safety, try again in 1 hour.');
    expect(problemMessage(err('rate_limited', 30))).toBe('Too many attempts. Please wait 30 seconds and try again.');
    expect(problemMessage(err('rate_limited', 600))).toContain('10 minutes');
  });
  it('is channel-aware and never echoes server text', () => {
    expect(problemMessage(err('otp_invalid'), 'phone')).toContain('SMS');
    expect(problemMessage(err('otp_invalid'), 'email')).toContain('email');
    expect(problemMessage(new Error('SQL error at line 3'))).toBe('Something went wrong. Please try again.');
    expect(problemMessage(err('some_new_code'))).toBe('Something went wrong. Please try again.');
  });
  it('maps every Google authError code', () => {
    for (const code of ['oauth_state', 'oauth_failed', 'email_unverified', 'account_exists_link_required', 'identifier_unavailable', 'staff_domain_not_allowed', 'account_disabled', 'link_requires_fresh_session']) {
      expect(googleErrorMessage(code)).not.toBe('');
    }
    expect(googleErrorMessage('unknown')).toBe(googleErrorMessage('oauth_failed'));
  });
});

describe('catalog slugs', () => {
  it('parses URL segments strictly', () => {
    expect(parseBoard('cbse')).toBe('cbse');
    expect(parseBoard('icse')).toBeNull();
    expect(parseClass('10')).toBe(10);
    expect(parseClass('010')).toBeNull();
    expect(parseClass('6')).toBeNull();
    expect(parseChapterSlug('ch01')).toBe('ch01');
    expect(parseChapterSlug('ch1')).toBeNull();
    expect(parseChapterView('notes')).toBe('notes');
    expect(parseChapterView('quiz')).toBeNull();
  });
  it('derives the exam from the class for CISCE', () => {
    expect(examFor('cisce', 10)).toBe('icse');
    expect(examFor('cisce', 11)).toBe('isc');
    expect(subjectIdFor('cisce', 12, 'hindi')).toBe('isc-12-hindi');
    expect(subjectIdFor('cbse', 10, '../x')).toBeNull();
  });
  it('builds paths from ids', () => {
    expect(subjectSlug('icse-10-computer-applications')).toBe('computer-applications');
    expect(chapterSlug('cbse-10-science-ch06')).toBe('ch06');
    expect(learnPath('cbse', 10, 'cbse-10-science', 'cbse-10-science-ch06')).toBe('/learn/cbse/10/science/ch06');
  });
});
