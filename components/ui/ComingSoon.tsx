import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ComingSoonProps {
  title: React.ReactNode;
  /** One line on what is coming. */
  line: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
}

/**
 * The editorial "coming soon" state for anything not ready yet: never a TODO
 * frame or an empty slot. CTAs go to the existing flows (contact form → Google
 * Sheets, book a demo, or the Future Builders waitlist).
 */
export function ComingSoon({
  title,
  line,
  primary = { label: 'Register your interest', href: '/contact' },
  secondary = { label: 'Book a demo', href: '/book-a-demo' },
  className,
}: ComingSoonProps) {
  return (
    <div
      className={cn('leaf tape relative grid-12 items-end gap-y-8 px-6 py-10 md:px-12 md:py-14', className)}
      data-reveal
    >
      <div className="col-span-12 lg:col-span-7">
        <p className="hand inline-flex items-center gap-2.5 text-[1.3rem] text-vermilion-ink">
          <span aria-hidden="true" className="h-2.5 w-2.5 animate-pulse rounded-full bg-vermilion" />
          Coming soon
        </p>
        <h2 className="t-headline mt-4 max-w-[16ch]">{title}</h2>
        <p className="t-lead mt-5 max-w-[48ch] text-graphite">{line}</p>
      </div>
      <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
        <ButtonLink href={primary.href} size="lg" arrow>
          {primary.label}
        </ButtonLink>
        {secondary && (
          <ButtonLink href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
