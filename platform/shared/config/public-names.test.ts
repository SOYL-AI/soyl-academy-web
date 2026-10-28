import { describe, expect, it } from 'vitest';
import { PUBLIC_NAME_ADJECTIVES, PUBLIC_NAME_ANIMALS, publicName } from './public-names';
import { BUILTIN_CONSENT, CONSENT_PROVIDERS, DISPLAY_NAME, RATE_LIMITS } from './security';

describe('public names (D-039)', () => {
  const id = '01900000-0000-7000-8000-000000000001';

  it('is stable for (id, seed) and changes with the seed', () => {
    expect(publicName(id)).toBe(publicName(id, 0));
    expect(publicName(id, 0)).toBe(publicName(id, 0));
    const names = new Set(Array.from({ length: 20 }, (_, i) => publicName(id, i)));
    expect(names.size).toBeGreaterThan(15);
  });

  it('looks like "Adjective Animal NNN": words from the lists, a 3-digit number, nothing that reads as a contact', () => {
    for (let i = 0; i < 500; i++) {
      const name = publicName(`01900000-0000-7000-8000-${String(i).padStart(12, '0')}`, i % 3);
      const m = /^([A-Z][a-z]+) ([A-Z][a-z]+) (\d{3})$/.exec(name);
      expect(m, name).not.toBeNull();
      expect(PUBLIC_NAME_ADJECTIVES).toContain(m![1]);
      expect(PUBLIC_NAME_ANIMALS).toContain(m![2]);
      expect(Number(m![3])).toBeGreaterThanOrEqual(100);
      expect(Number(m![3])).toBeLessThan(1000);
      expect(m![3]!.length).toBeLessThanOrEqual(DISPLAY_NAME.maxDigitRun);
    }
  });

  it('word lists are unique, single words and free of the blocked words', () => {
    for (const list of [PUBLIC_NAME_ADJECTIVES, PUBLIC_NAME_ANIMALS]) {
      expect(new Set(list).size).toBe(list.length);
      for (const w of list) {
        expect(w).toMatch(/^[A-Z][a-z]+$/);
        for (const bad of DISPLAY_NAME.blockedWords) expect(w.toLowerCase().includes(bad), `${w} contains ${bad}`).toBe(false);
      }
    }
    expect(PUBLIC_NAME_ADJECTIVES.length * PUBLIC_NAME_ANIMALS.length * 900).toBeGreaterThan(3_000_000);
  });
});

describe('built-in consent config (D-039)', () => {
  it('lists the providers and keeps the limits sane', () => {
    expect(CONSENT_PROVIDERS).toEqual(['mock', 'unavailable', 'builtin']);
    expect(BUILTIN_CONSENT.codeLength).toBe(6);
    expect(BUILTIN_CONSENT.maxAttemptsPerCode).toBeLessThanOrEqual(5);
    expect(BUILTIN_CONSENT.codeTtlSeconds).toBeLessThanOrEqual(72 * 3600);
    // Guessing budget: per-day failures across codes stay far below the code space.
    expect(BUILTIN_CONSENT.verifyFailures.limit / 10 ** BUILTIN_CONSENT.codeLength).toBeLessThan(1e-4);
    for (const group of Object.values(BUILTIN_CONSENT.send)) for (const w of group) expect(w.limit).toBeGreaterThan(0);
    expect(RATE_LIMITS['consent.parent.ip'].key).toBe('ip');
    expect(RATE_LIMITS['consent.write.user'].key).toBe('user');
  });
});
