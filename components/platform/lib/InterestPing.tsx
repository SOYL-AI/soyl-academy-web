'use client';

/**
 * Counts one product-interest view when it mounts (D-045). Renders nothing. Lets Server Components
 * (notes, flashcards) count a view without becoming client components. No-op without analytics consent.
 */
import { useEffect } from 'react';
import type { AnalyticsEventName } from '@/platform/shared/config/analytics';
import { trackInterest } from './interest';

export function InterestPing({ name, dimension }: { name: AnalyticsEventName; dimension?: string }) {
  useEffect(() => {
    trackInterest(name, dimension);
  }, [name, dimension]);
  return null;
}
