import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CONSENT_STEPS, SAFETY } from '@/content/parents';

const read = (file: string) => readFileSync(resolve(process.cwd(), file), 'utf8');

/** Source without comments, so a doc comment may show an example price. */
const code = (file: string) =>
  read(file)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');

describe('/parents consent copy follows the consent system', () => {
  it('names every feature that a parent’s approval switches on (ConsentFlow UNLOCKS)', () => {
    const unlocks = /export const UNLOCKS = \[([^\]]+)\]/.exec(read('components/platform/consent/ConsentFlow.tsx'))?.[1];
    expect(unlocks, 'UNLOCKS in ConsentFlow.tsx').toBeTruthy();
    const step = CONSENT_STEPS[1].line.toLowerCase();
    // UNLOCKS: AI tutor and AI marking; photo doubts; leaderboards, leagues and SOYL Coins rewards.
    for (const word of ['ai', 'photo doubts', 'leaderboards', 'rewards']) expect(step).toContain(word);
    for (const word of ['AI', 'Photo doubts', 'Leaderboards', 'rewards']) expect(unlocks).toContain(word);
  });

  it('is plain: no dashes, no guarantees, no figures beyond the age of consent', () => {
    const all = [...CONSENT_STEPS.flatMap((s) => [s.title, s.line]), ...SAFETY].join(' ');
    expect(all).not.toMatch(/[—–]/);
    expect(all).not.toMatch(/guarantee|100%|always safe|completely safe|never see/i);
    expect(all.match(/\d+/g) ?? []).toEqual(['18']);
  });
});

describe('no price or allowance is written into the phase 3 pages and components', () => {
  const files = [
    'app/parents/page.tsx',
    'app/(platform)/plans/page.tsx',
    'components/platform/plans/PlansGuide.tsx',
    'components/ink/PerDay.tsx',
    'components/ink/CreditsMeter.tsx',
    'components/ink/LedgerColumns.tsx',
    'components/ink/ReportSample.tsx',
    'content/parents.ts',
  ];

  it.each(files)('%s', (file) => {
    const src = code(file);
    expect(src, 'a rupee figure').not.toMatch(/₹\s?\d/);
    expect(src, 'an allowance').not.toMatch(/\b\d+\s*(free\s*)?(AI\s*)?credits?\b/i);
    expect(src, 'a per-day figure').not.toMatch(/\b\d+(\.\d+)?\s*a day\b/i);
  });
});
