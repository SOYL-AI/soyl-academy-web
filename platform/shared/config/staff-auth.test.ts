import { describe, expect, it } from 'vitest';
import { STAFF_AUTH, staffAuthProblems, type StaffAuthPolicy } from './security';

describe('staff sign-in policy (ADR-026)', () => {
  it('owner decision (2026-10-29): email one-time code only, no second factor', () => {
    expect(STAFF_AUTH).toEqual({ signInMethods: ['email'], secondFactor: 'none' });
    expect(staffAuthProblems(STAFF_AUTH)).toEqual([]);
  });

  it('the previous policies stay valid config (switching back is a config change)', () => {
    expect(staffAuthProblems({ signInMethods: ['email'], secondFactor: 'totp' })).toEqual([]);
    expect(staffAuthProblems({ signInMethods: ['google'], secondFactor: 'totp' })).toEqual([]);
    expect(staffAuthProblems({ signInMethods: ['email', 'google'], secondFactor: 'none' })).toEqual([]);
  });

  it('rejects an empty list, phone OTP, duplicates and unknown second factors', () => {
    expect(staffAuthProblems({ signInMethods: [], secondFactor: 'none' })).toEqual(['STAFF_AUTH.signInMethods must list at least one method']);
    // Phone OTP is never a staff method (the type forbids it; the runtime check covers untyped edits).
    const phone = { signInMethods: ['phone'], secondFactor: 'none' } as unknown as StaffAuthPolicy;
    expect(staffAuthProblems(phone).join('\n')).toMatch(/'phone' is not a staff sign-in method/);
    expect(staffAuthProblems({ signInMethods: ['email', 'email'], secondFactor: 'none' })).toEqual(['STAFF_AUTH.signInMethods lists a method twice']);
    const sms = { signInMethods: ['email'], secondFactor: 'sms' } as unknown as StaffAuthPolicy;
    expect(staffAuthProblems(sms)).toEqual(['STAFF_AUTH.secondFactor must be one of none, totp']);
  });
});
