import type { Page } from '@playwright/test';

/**
 * Everything that makes a marketing screenshot deterministic. The site uses no animation
 * library (no GSAP, Lenis or Framer Motion; checked in REPO_MAP section 2), only CSS
 * transitions and keyframes, scroll reveals (RevealObserver, off under the reducedMotion
 * the config sets), a client-side cookie bar, a dismissible banner, lazy-loaded next/image
 * images, (optionally) autoplaying <video> loops, and `content-visibility: auto` on every
 * section after the first (globals.css). Unrendered sections keep a 900px placeholder and
 * paint blank in a full-page shot, depending on timing, so FREEZE_CSS renders them all.
 */

/** Fixed client clock. Server-rendered dates come from the build (see REPO_MAP section 9.4). */
export const FIXED_TIME = new Date('2026-10-25T06:30:00.000Z');

const CONSENT_KEY = 'soyl_cookie_consent_v1';

const FREEZE_CSS = `
*, *::before, *::after {
  animation: none !important;
  transition: none !important;
  caret-color: transparent !important;
  scroll-behavior: auto !important;
  content-visibility: visible !important;
}
`;

export interface PrepareOptions {
  /** Store an "Essential only" cookie choice before load: hides the cookie bar, keeps analytics off. */
  consent: boolean;
}

/** Call before page.goto(). */
export async function preparePage(page: Page, { consent }: PrepareOptions): Promise<void> {
  // Date only; timers keep running so React/Next behave normally.
  await page.clock.setFixedTime(FIXED_TIME);

  if (consent) {
    await page.addInitScript(
      ([key, value]) => {
        try {
          window.localStorage.setItem(key, value);
        } catch {
          /* storage blocked: the cookie bar will show and the diff will say so */
        }
      },
      [
        CONSENT_KEY,
        JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: FIXED_TIME.toISOString() }),
      ] as const
    );
  }

  // Video loops would screenshot at an arbitrary frame; without the MP4 the poster still shows.
  await page.route(/\.(mp4|webm)(\?|$)/i, (route) => route.abort());
  // Vercel Analytics / Speed Insights never load without consent, but block them defensively.
  await page.route(/\/_vercel\/(insights|speed-insights)\//, (route) => route.abort());
}

/** Call after page.goto(): settles fonts, images and layout before the screenshot. */
export async function stabilisePage(page: Page): Promise<void> {
  await page.addStyleTag({ content: FREEZE_CSS });

  await page.evaluate(async () => {
    // next/image renders below-the-fold images with loading="lazy"; a full-page shot needs them all.
    for (const img of Array.from(document.images)) {
      if (img.loading === 'lazy') img.loading = 'eager';
    }
    // Trigger anything scroll-driven, then return to the top.
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    window.scrollTo(0, 0);

    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete
          ? img.decode().catch(() => undefined)
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            })
      )
    );
    await document.fonts.ready;
    for (const video of Array.from(document.querySelectorAll('video'))) {
      video.pause();
    }
  });

  await page.waitForLoadState('networkidle');
  // Two frames so layout after the last image decode is painted.
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null))))
  );
}
