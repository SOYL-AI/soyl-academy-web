'use client';

import dynamic from 'next/dynamic';

/**
 * <BrushArt>, loaded only when it actually renders. For artwork in the root layout's chrome (the footer), which
 * is skipped on learning-platform pages: there the painting code is never downloaded.
 *
 * Until the chunk arrives it renders a hidden data-paint="wait" marker (server-rendered too), so screenshot tests
 * that wait for every painting to be done also wait for this one to exist; without it the wait passed before the
 * footer's painting had mounted, and captures came out with or without it at random.
 */
export const LazyBrushArt = dynamic(() => import('./BrushArt').then((m) => m.BrushArt), {
  ssr: false,
  loading: () => <span data-paint="wait" hidden />,
});
