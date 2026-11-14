'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { platformChromeActive } from '@/components/platform/shell/chrome';
import type { StoryNavProps } from './StoryNav';

/**
 * The root layout loads this on every route, including the learning platform's, so it is kept tiny (ADR-033/034):
 * the header's behaviour (`StoryNav`) is a separate chunk that is only fetched, and server-rendered, on marketing
 * pages. Platform pages never download it and so stay inside their JS budget (ARCHITECTURE §16).
 */
const StoryNav = dynamic(() => import('./StoryNav').then((m) => m.StoryNav));

export function NavGate(props: StoryNavProps) {
  const pathname = usePathname() ?? '/';
  if (platformChromeActive(pathname)) return null;
  return <StoryNav {...props} />;
}
