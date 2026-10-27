import { acceptAllCookies, expect, openLoginFromHeader, signInWithEmail, test, uniqueEmail } from './fixtures';

/**
 * Guest mode (CONTEXT §5, ARCHITECTURE §3.2): progress kept on the device under soyl_guest_v1 merges into the
 * account on first sign-in (POST /v1/me/merge-guest), exactly once; since API M2 stores lesson positions as
 * well, the device copy is cleared after the merge.
 */

const now = new Date().toISOString();
const SEED = {
  v: 1,
  board: 'cbse',
  classLevel: 10,
  lessons: [
    { chapter: 'cbse-10-science-ch01', slide: 42, completed: true, updatedAt: now },
    { chapter: 'cbse-10-science-ch02', slide: 3, completed: false, updatedAt: now },
  ],
  practice: [
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_001', correct: true, answeredAt: now },
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_002', correct: false, answeredAt: now },
    { chapter: 'cbse-10-science-ch01', question: 'q_cbse10sci_ch01_003', correct: true, answeredAt: now },
  ],
  // Unknown keys and personal data must never be sent (WEB-5): the client drops them.
  name: 'Should Not Be Sent',
};

test('guest progress merges on first login, once', async ({ page }) => {
  await acceptAllCookies(page);
  await page.goto('/learn');
  await page.evaluate((seed) => window.localStorage.setItem('soyl_guest_v1', JSON.stringify(seed)), SEED);

  // Device progress is visible to the guest on the subject page.
  await page.goto('/learn/cbse/10/science');
  await expect(page.getByText('Lesson done · 2/3 practice correct')).toBeVisible();

  await openLoginFromHeader(page);
  const mergeReq = page.waitForRequest((r) => r.url().endsWith('/api/platform/v1/me/merge-guest') && r.method() === 'POST');
  const mergeRes = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/me/merge-guest'));
  await signInWithEmail(page, uniqueEmail('guest'));
  const body = (await mergeReq).postDataJSON();
  expect(body).not.toHaveProperty('name');
  expect(body.lessons).toHaveLength(2);
  expect(body.practice).toHaveLength(3);
  const res = await mergeRes;
  expect(res.status()).toBe(200);
  const merged = await res.json();
  expect(merged.merged).toBe(true);
  expect(merged.lessonsCompleted).toBe(1);
  expect(merged.profileUpdated).toBe(true);

  // API M2 stores positions too, so the whole device copy is cleared (backend-api M2 point 6).
  expect(merged.lessonsStored).toBe(2);
  await expect.poll(async () => page.evaluate(() => window.localStorage.getItem('soyl_guest_v1'))).toBeNull();

  // Board/class from the guest filled the empty profile.
  await page.goto('/me');
  await expect(page.getByLabel('Board')).toHaveValue('cbse');
  await expect(page.getByLabel('Class', { exact: true })).toHaveValue('10');
  const me = await (await page.request.get('/api/platform/v1/me')).json();
  expect(me.guestMergedAt).not.toBeNull();

  // Idempotent: a replay is reported as already merged and changes nothing.
  const replay = await page.request.post('/api/platform/v1/me/merge-guest', {
    headers: { origin: new URL(page.url()).origin, 'content-type': 'application/json' },
    data: { v: 1, lessons: [], practice: [] },
  });
  expect((await replay.json()).alreadyMerged).toBe(true);

  // Nothing mergeable left → the next page load sends no merge request.
  let sent = 0;
  page.on('request', (r) => {
    if (r.url().endsWith('/v1/me/merge-guest')) sent += 1;
  });
  await page.goto('/learn');
  await expect(page.getByTestId('profile-link')).toBeVisible();
  await page.waitForLoadState('networkidle');
  expect(sent).toBe(0);
});

test('broken or foreign guest data never breaks a page', async ({ page }) => {
  await page.goto('/learn');
  await page.evaluate(() => window.localStorage.setItem('soyl_guest_v1', '{not json'));
  await page.goto('/learn/cbse/10/science');
  await expect(page.getByRole('heading', { level: 1, name: 'Science' })).toBeVisible();
  await page.evaluate(() => window.localStorage.setItem('soyl_guest_v1', JSON.stringify({ v: 99, lessons: 'x' })));
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Science' })).toBeVisible();
  await openLoginFromHeader(page);
});
