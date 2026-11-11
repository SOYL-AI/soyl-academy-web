import { formatArticleDate, formatReadingTime } from '@/content/journal';
import { cn } from '@/lib/utils';

/** Category, date and reading time of a journal article, on one quiet line (sentence case, no small capitals). */
export function ArticleMeta({ date, readingTime, category, className }: { date: string; readingTime: number; category: string; className?: string }) {
  return (
    <p className={cn('flex flex-wrap items-center gap-x-2 text-[0.9375rem] leading-[1.5] text-muted', className)}>
      <span className="font-medium text-ink">{category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{formatArticleDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{formatReadingTime(readingTime)}</span>
    </p>
  );
}
