/**
 * 404 inside the platform app shell (ADR-023), for notFound() from platform pages (unknown board, class,
 * subject, chapter). With the flag off the layout itself 404s and the marketing 404 renders instead (GEN-4).
 */
import Link from 'next/link';
import { EmptyState } from '@/components/platform/ui/kit/Display';
import shell from '@/components/platform/shell/shell.module.css';

export default function PlatformNotFound() {
  return (
    <div className={shell.page}>
      <h1 className={shell.title}>Page not found</h1>
      <EmptyState
        title="We could not find that page"
        headingLevel="h2"
        icon="search"
        action={
          <Link href="/learn" data-testid="not-found-learn">
            Go to Learn
          </Link>
        }
      >
        The link may be old, or this subject or chapter is not on SOYL Academy yet.
      </EmptyState>
    </div>
  );
}
