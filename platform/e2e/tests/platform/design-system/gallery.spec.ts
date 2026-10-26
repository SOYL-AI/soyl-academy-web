import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/**
 * Design-system gallery (/dev/ui): accessibility, 360 px layout, Devanagari font and the XSS
 * corpus in real Chromium. The gallery renders every component, visual kind and slide layout.
 */

const SHOTS = resolve(import.meta.dirname, '../../../test-results/design-system/screenshots');

interface Watch {
  dialogs: string[];
  pageErrors: string[];
  foreignRequests: string[];
}

async function openGallery(page: Page, baseURL: string): Promise<Watch> {
  const watch: Watch = { dialogs: [], pageErrors: [], foreignRequests: [] };
  const origin = new URL(baseURL).origin;
  page.on('dialog', async (d) => {
    watch.dialogs.push(d.message());
    await d.dismiss();
  });
  page.on('pageerror', (e) => watch.pageErrors.push(e.message));
  page.on('request', (r) => {
    const url = r.url();
    if (!url.startsWith(origin) && !url.startsWith('data:') && !url.startsWith('blob:')) watch.foreignRequests.push(url);
  });
  const res = await page.goto('/dev/ui', { waitUntil: 'networkidle' });
  expect(res?.status()).toBe(200);
  await expect(page.getByTestId('ui-gallery')).toBeVisible();
  // Client islands: raw SVGs sanitised (DOMPurify chunk) and SMILES drawn (smiles-drawer chunk).
  await expect(page.locator('[data-state="loading"]')).toHaveCount(0, { timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  return watch;
}

async function seriousViolations(page: Page, include = '[data-testid="ui-gallery"]') {
  const results = await new AxeBuilder({ page }).include(include).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
  return results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')) }));
}

test.describe('design-system gallery', () => {
  test('renders every visual kind and slide layout, with nothing executable from the XSS corpus', async ({ page, baseURL }) => {
    const watch = await openGallery(page, baseURL!);

    for (const layout of ['title', 'concept', 'two-column', 'diagram', 'example', 'check', 'summary', 'exam-tips']) {
      await expect(page.locator(`#slides article[data-layout="${layout}"]`).first()).toBeVisible();
    }
    for (const kind of ['plot', 'geometry', 'flow']) await expect(page.locator(`#visuals svg[data-visual="${kind}"]:visible`).first()).toBeVisible();
    await expect(page.locator('#visuals [data-kind="svg"] [data-state="ready"] svg')).toBeVisible();
    await expect(page.locator('#visuals [data-visual="chem-smiles"][data-state="ready"] svg *').first()).toBeAttached();
    await expect(page.locator('#visuals [data-visual="chem-equation"] .katex').first()).toBeVisible();
    await expect(page.locator('#visuals table').first()).toBeVisible();
    await expect(page.locator('#exemplar article[aria-roledescription="slide"]')).toHaveCount(21);
    await expect(page.locator('#maths svg[data-visual="geometry"]')).toHaveCount(24);

    // Hostile content: every payload rendered, nothing ran, nothing was fetched from elsewhere.
    await expect(page.getByTestId('hostile-svg').locator('[role="img"]')).toHaveCount(32);
    const hostile = await page.evaluate(() => {
      const root = document.querySelector('#hostile')!;
      const bad: string[] = [];
      for (const el of Array.from(root.querySelectorAll('*'))) {
        if (/^(script|iframe|object|embed|foreignobject|image|img|style|form|base|meta)$/i.test(el.localName)) bad.push(el.localName);
        for (const a of Array.from(el.attributes)) {
          if (a.name.startsWith('on')) bad.push(`${el.localName}[${a.name}]`);
          if (/javascript:|evil\.example/i.test(a.value)) bad.push(`${el.localName}[${a.name}=${a.value}]`);
        }
      }
      return { bad, xss: (window as unknown as { __xss?: unknown }).__xss ?? null };
    });
    expect(hostile.bad).toEqual([]);
    expect(hostile.xss).toBeNull();
    expect(watch.dialogs).toEqual([]);
    expect(watch.foreignRequests).toEqual([]);
    expect(watch.pageErrors).toEqual([]);
  });

  test('has zero serious/critical axe violations (page, open dialog, open sheet)', async ({ page, baseURL }) => {
    await openGallery(page, baseURL!);
    expect(await seriousViolations(page)).toEqual([]);

    await page.getByTestId('open-dialog').click();
    await expect(page.getByRole('dialog', { name: 'Log in to start this test' })).toBeVisible();
    expect(await seriousViolations(page, 'dialog[open]')).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByTestId('open-dialog')).toBeFocused();

    await page.getByTestId('open-sheet').click();
    await expect(page.getByRole('dialog', { name: 'Jump to slide' })).toBeVisible();
    expect(await seriousViolations(page, 'dialog[open]')).toEqual([]);
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByTestId('open-sheet')).toBeFocused();
  });

  test('fits the viewport (no horizontal scroll) and keeps touch targets at 44 px', async ({ page, baseURL }, info) => {
    await openGallery(page, baseURL!);
    const overflow = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, width: window.innerWidth }));
    expect(overflow.scroll).toBeLessThanOrEqual(overflow.width);

    const small = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-testid="ui-gallery"] button, [data-testid="ui-gallery"] [role="tab"]'))
        .filter((el) => el.offsetParent !== null && !el.closest('#hostile'))
        .map((el) => {
          const r = el.getBoundingClientRect();
          const after = getComputedStyle(el, '::after');
          // Small buttons extend their hit area with an ::after inset of -4px.
          const extra = after.content !== 'none' && after.position === 'absolute' ? 8 : 0;
          return { label: el.getAttribute('aria-label') ?? el.textContent?.trim().slice(0, 30), h: r.height + extra, w: r.width };
        })
        .filter((b) => b.h < 44 || b.w < 44),
    );
    expect(small).toEqual([]);

    mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({ path: resolve(SHOTS, `gallery-${info.project.name}-full.png`), fullPage: true });
    await page.locator('#slides').screenshot({ path: resolve(SHOTS, `slides-${info.project.name}.png`) });
    await page.locator('#visuals').screenshot({ path: resolve(SHOTS, `visuals-${info.project.name}.png`) });
    await page.locator('#hindi').screenshot({ path: resolve(SHOTS, `hindi-${info.project.name}.png`) });
    await page.locator('#maths').screenshot({ path: resolve(SHOTS, `maths-geometry-${info.project.name}.png`) });
    await page.locator('#dark').screenshot({ path: resolve(SHOTS, `dark-${info.project.name}.png`) });
  });

  test('renders Devanagari with Noto Sans Devanagari when --font-noto-devanagari is set', async ({ page, baseURL }) => {
    await openGallery(page, baseURL!);
    const sample = page.getByTestId('devanagari-sample');
    const variable = await sample.evaluate((el) => getComputedStyle(el).getPropertyValue('--font-noto-devanagari'));
    expect(variable).toMatch(/Noto Sans Devanagari/);

    const cdp = await page.context().newCDPSession(page);
    await cdp.send('DOM.enable');
    await cdp.send('CSS.enable');
    const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '[data-testid="devanagari-sample"]' });
    const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
    const families = fonts.map((f) => f.familyName);
    expect(families.some((f) => /Noto Sans Devanagari/i.test(f))).toBe(true);

    // Hindi slides carry lang="hi" and the Devanagari line-height.
    const hindi = page.locator('#hindi article[lang="hi"]').first();
    await expect(hindi).toBeVisible();
    const lineHeight = await hindi.locator('p').first().evaluate((el) => parseFloat(getComputedStyle(el).lineHeight) / parseFloat(getComputedStyle(el).fontSize));
    expect(lineHeight).toBeGreaterThanOrEqual(1.7);
  });

  test('keyboard: tabs move with arrow keys; OTP accepts pasted codes', async ({ page, baseURL }) => {
    await openGallery(page, baseURL!);
    const tab = page.getByRole('tab', { name: 'Lesson' });
    await tab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Notes' })).toBeFocused();
    await expect(page.getByRole('tab', { name: 'Notes' })).toHaveAttribute('aria-selected', 'true');

    const otp = page.getByLabel('Verification code');
    await expect(otp).toHaveAttribute('autocomplete', 'one-time-code');
    await expect(otp).toHaveAttribute('inputmode', 'numeric');
    await otp.focus();
    await page.evaluate(() => {
      const input = document.activeElement as HTMLInputElement;
      const data = new DataTransfer();
      data.setData('text/plain', 'Your code is 482 913');
      input.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    });
    await expect(otp).toHaveValue('482913');
    await expect(page.getByText('Code complete: 482913')).toBeVisible();
  });
});
