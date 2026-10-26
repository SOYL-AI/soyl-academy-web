import { chromium } from '@playwright/test';
const out = process.env.OUT;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => { try { localStorage.setItem('soyl_cookie_consent_v1', JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() })); } catch {} });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 300)));
const shots = JSON.parse(process.env.SHOTS);
for (const [name, url, steps] of shots) {
  if (url) await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle', timeout: 240000 });
  for (const st of steps ?? []) {
    if (st.click) await page.locator(st.click).first().click();
    if (st.fill) await page.locator(st.fill[0]).first().fill(st.fill[1]);
    if (st.key) await page.keyboard.press(st.key);
    if (st.wait) await page.waitForTimeout(st.wait);
    if (st.waitFor) await page.locator(st.waitFor).first().waitFor({ timeout: 60000 });
  }
  await page.waitForTimeout(600);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  console.log(name, 'scrollWidth', sw);
}
console.log('errors:', errors.join('\n'));
await browser.close();
