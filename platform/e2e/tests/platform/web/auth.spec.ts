import {
  acceptAllCookies,
  ALLOWED_STORAGE_KEYS,
  expect,
  expectCleanUrl,
  openLoginFromHeader,
  otpFor,
  signInWithEmail,
  signInWithPhone,
  storageKeys,
  test,
  uniqueEmail,
  uniquePhone,
} from './fixtures';

/**
 * Auth flows (ARCHITECTURE §5, AGENTS §7 "Auth and accounts", green stand-in per D-010):
 * email OTP, phone OTP, Google (mock OIDC), logout (WEB-9), return-to (AUTH-13), WEB-5, WEB-12.
 */

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

test('email OTP: sign up → profile → logout → log in again', async ({ page }) => {
  const email = uniqueEmail('mail');
  await page.goto('/learn');
  await openLoginFromHeader(page);

  const verify = page.waitForResponse((r) => r.url().includes('/v1/auth/email/verify'));
  await signInWithEmail(page, email);
  const res = await verify;
  expect(res.status()).toBe(200);
  expect((await res.json()).isNewUser).toBe(true);
  // AUTH-8 (local http: non-__Host- name): HttpOnly, SameSite=Lax, Path=/.
  const setCookie = (await res.headersArray()).filter((h) => h.name.toLowerCase() === 'set-cookie').map((h) => h.value).join('\n');
  expect(setCookie).toMatch(/soyl_session=/);
  expect(setCookie).toMatch(/HttpOnly/i);
  expect(setCookie).toMatch(/SameSite=Lax/i);
  expect(page.url()).toMatch(/\/learn$/);

  // WEB-5: no tokens in browser storage.
  for (const key of await storageKeys(page)) expect(ALLOWED_STORAGE_KEYS).toContain(key);
  expect(await page.evaluate(() => document.cookie)).not.toContain('soyl_session');

  // Profile: display name, board, class.
  await page.getByTestId('profile-link').click();
  await expect(page).toHaveURL(/\/me$/);
  await page.getByLabel('Display name').fill('Asha');
  await page.getByLabel('Board').selectOption('cbse');
  await page.getByLabel('Class', { exact: true }).selectOption('10');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Profile saved')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Asha' })).toBeVisible();
  await expect(page.getByTestId('consent-flow')).toBeVisible();
  await expect(page.getByTestId('public-name-value')).toHaveText(/^[A-Z][a-z]+ [A-Z][a-z]+ [0-9]{3}$/);

  // Logout (WEB-9): API sign-out, session gone, member page left for /learn.
  await page.getByTestId('logout-button').click();
  await expect(page).toHaveURL(/\/learn$/);
  await expect(page.getByTestId('login-button')).toBeVisible();
  const session = await (await page.request.get('/api/platform/v1/session')).json();
  expect(session.authenticated).toBe(false);

  // Log in again: same account, profile kept.
  await openLoginFromHeader(page);
  const again = page.waitForResponse((r) => r.url().includes('/v1/auth/email/verify'));
  await signInWithEmail(page, email);
  expect((await (await again).json()).isNewUser).toBe(false);
  await page.goto('/me');
  await expect(page.getByRole('heading', { level: 1, name: 'Asha' })).toBeVisible();
  await expect(page.getByLabel('Board')).toHaveValue('cbse');
});

test('phone OTP: invalid number, wrong code, then sign up', async ({ page }) => {
  const national = uniquePhone();
  await page.goto('/learn');
  await openLoginFromHeader(page);
  const dialog = page.getByRole('dialog', { name: 'Log in to SOYL Academy' });

  // Client validation (AUTH-1): not a mobile number.
  await dialog.getByLabel(/Mobile number/).fill('12345');
  await dialog.getByRole('button', { name: 'Send code' }).click();
  await expect(dialog.getByText('A mobile number has 10 digits.')).toBeVisible();

  await dialog.getByLabel(/Mobile number/).fill(national);
  await dialog.getByRole('button', { name: 'Send code' }).click();
  await expect(dialog.getByText('We sent a 6-digit code to')).toBeVisible();
  await expect(dialog.getByText(/Resend code in \d+ s/)).toBeVisible(); // AUTH-5 cooldown
  const code = await otpFor(page.request, `+91${national}`);
  const wrong = code === '000000' ? '111111' : '000000';
  await dialog.getByLabel('Code', { exact: true }).fill(wrong);
  await expect(dialog.getByText('That code is not right. Check the SMS and try again.')).toBeVisible();
  expectCleanUrl(page, national, wrong, code);

  await dialog.getByLabel('Code', { exact: true }).fill(code);
  await expect(dialog).toBeHidden();
  await expect(page.getByTestId('profile-link')).toBeVisible();
  await page.goto('/me');
  await expect(page.getByText(`+91 ******${national.slice(-4)}`)).toBeVisible();
});

test('Google sign-in (mock OIDC) returns to the page it started from', async ({ page, watch }) => {
  watch.allowOrigins.push('http://127.0.0.1:8098');
  const start = '/learn/cbse/10/science';
  await page.goto(start);
  await openLoginFromHeader(page);
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(page.getByRole('heading', { name: 'Mock Google sign-in (local only)' })).toBeVisible();
  await page.getByLabel('Email').fill(uniqueEmail('google'));
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL((u) => u.pathname === start);
  await expect(page.getByTestId('profile-link')).toBeVisible();
  expect(page.url()).not.toContain('authError');
});

test('Google sign-in error is explained and removed from the URL', async ({ page }) => {
  await page.goto('/learn?authError=oauth_state');
  await expect(page.getByRole('dialog', { name: 'Log in to SOYL Academy' })).toBeVisible();
  await expect(page.getByText('Google sign-in took too long or was opened in another browser. Please try again.')).toBeVisible();
  await expect(page).toHaveURL(/\/learn$/);
});

test('login prompt returns to the original page (AUTH-13)', async ({ page }) => {
  const hub = '/learn/cbse/10/science/ch01';
  await page.goto(hub);
  await page.getByRole('button', { name: 'Log in to take tests' }).click();
  await expect(page.getByText('Log in to take chapter tests. They are free, and your results are saved.')).toBeVisible();
  await signInWithEmail(page, uniqueEmail('return'));
  await expect(page).toHaveURL(new RegExp(`${hub}$`));
  // M3: members get the subject's test series (the player shipped).
  await expect(page.getByTestId('chapter-tests-link')).toHaveAttribute('href', '/tests/series/cbse/10/science');
});

test('a hostile returnTo never leaves the platform (AUTH-13, WEB-8)', async ({ page }) => {
  await page.goto('/learn');
  for (const evil of ['//evil.example', 'https://evil.example/x', '/\\evil.example', 'javascript:alert(1)']) {
    const res = await page.request.get(`/api/platform/v1/auth/google/start?returnTo=${encodeURIComponent(evil)}`, { maxRedirects: 0 });
    expect(res.status()).toBe(302);
    const loc = new URL(res.headers()['location']!);
    // The state carries the return target; the API's callback applies safeReturnTo. Here: the redirect
    // goes to the IdP (local mock), never to the hostile URL.
    expect(loc.origin).toBe('http://127.0.0.1:8098');
    expect(decodeURIComponent(loc.toString())).not.toContain('evil.example');
  }
});
