'use client';

import dynamic from 'next/dynamic';

/**
 * <BrushArt>, loaded only when it actually renders. For artwork in the root layout's chrome (the footer), which
 * is skipped on learning-platform pages: there the painting code is never downloaded.
 */
export const LazyBrushArt = dynamic(() => import('./BrushArt').then((m) => m.BrushArt), { ssr: false });
