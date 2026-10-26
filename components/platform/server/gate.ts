/**
 * GEN-4: every platform page and layout calls this first. With the flag off it renders the marketing
 * 404 (status 404), and no platform data is fetched.
 */
import { notFound } from 'next/navigation';
import { readFlags } from '@/platform/shared/config/flags';

export function requirePlatform(): void {
  if (!readFlags().platformEnabled) notFound();
}

/**
 * For generateMetadata / generateStaticParams, which Next may run before (or without) the layout: return
 * early (no API call) when the platform is off, so a flag-off request is a clean 404, never a 500.
 */
export function platformOn(): boolean {
  return readFlags().platformEnabled;
}
