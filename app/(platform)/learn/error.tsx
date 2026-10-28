'use client';

/** Friendly error state when the catalog API cannot be reached (nothing is cached for this request). */
import { Button } from '@/components/platform/ui/kit/Button';
import { EmptyState } from '@/components/platform/ui/kit/Display';
import { EmptyIllustration } from '@/components/platform/ui/art/EmptyIllustration';
import shell from '@/components/platform/shell/shell.module.css';

export default function LearnError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={shell.page}>
      <h1 className="p-visually-hidden">Something went wrong</h1>
      <EmptyState
        title="We could not load this page"
        icon="alert"
        art={<EmptyIllustration kind="offline" />}
        headingLevel="h2"
        action={
          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>
        }
      >
        Check your connection and try again. Your progress on this device is safe.
      </EmptyState>
    </div>
  );
}
