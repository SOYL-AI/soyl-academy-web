import { acceptAllCookies, expect, openLoginFromHeader, signInWithEmail, test, uniqueEmail } from './fixtures';

/** Account deletion (ARCHITECTURE §5: deletes/anonymises personal data and revokes sessions). */
test('delete account: confirmation, sessions revoked, back to /learn', async ({ page }) => {
  await acceptAllCookies(page);
  await page.goto('/learn');
  await openLoginFromHeader(page);
  await signInWithEmail(page, uniqueEmail('delete'));
  await page.getByTestId('profile-link').click();
  await expect(page).toHaveURL(/\/me$/);

  await page.getByTestId('delete-account').click();
  const dialog = page.getByRole('dialog', { name: 'Delete your account?' });
  await expect(dialog).toBeVisible();
  const confirm = dialog.getByTestId('confirm-delete');
  await expect(confirm).toBeDisabled();
  await dialog.getByLabel('Type DELETE to confirm').fill('delete');
  await expect(confirm).toBeEnabled();
  const res = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/me') && r.request().method() === 'DELETE');
  await confirm.click();
  expect((await res).status()).toBe(200);

  await expect(page).toHaveURL(/\/learn$/);
  await expect(page.getByText('Your account is deleted')).toBeVisible();
  await expect(page.getByTestId('login-button')).toBeVisible();
  const session = await (await page.request.get('/api/platform/v1/session')).json();
  expect(session.authenticated).toBe(false);
  const me = await page.request.get('/api/platform/v1/me');
  expect(me.status()).toBe(401);
});

test('/me asks guests to log in and comes back to /me', async ({ page }) => {
  await acceptAllCookies(page);
  await page.goto('/me');
  await expect(page.getByRole('heading', { name: 'Log in to see your profile' })).toBeVisible();
  await page.getByRole('button', { name: 'Log in' }).last().click();
  await signInWithEmail(page, uniqueEmail('me'));
  await expect(page).toHaveURL(/\/me$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Profile' })).toBeVisible();
});
