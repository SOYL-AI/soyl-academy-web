'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { platformChromeActive } from '@/components/platform/shell/chrome';
import type { BrushNavProps } from './BrushNav';

/**
 * The root layout loads this on every route, including the learning platform's, so it is kept tiny (ADR-033):
 * the header itself (`BrushNav`, with the Index) is a separate chunk that is only fetched, and server-rendered,
 * on marketing pages. Platform pages never download it and so stay inside their JS budget (ARCHITECTURE §16).
 */
const BrushNav = dynamic(() => import('./BrushNav').then((m) => m.BrushNav));

export function BrushNavGate(props: BrushNavProps) {
  const pathname = usePathname() ?? '/';
  if (platformChromeActive(pathname)) return null;
  return <BrushNav {...props} />;
}
