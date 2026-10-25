import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** Mark diameter in px. The wordmark scales with it. */
  size?: number;
  className?: string;
  /** Render as a home link (default) or as plain content. */
  href?: string | null;
}

/**
 * The one SOYL lock-up: circular mark + "SOYL Academy" in Inter 600.
 * Used in the header, footer and anywhere else the brand appears.
 */
export function Logo({ size = 32, className, href = '/' }: LogoProps) {
  const content = (
    <>
      <Image
        src={size > 64 ? '/brand/soyl-mark-512.png' : '/brand/soyl-mark-128.png'}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full"
        priority={size <= 64}
      />
      <span
        className="font-semibold tracking-[-0.015em] text-ink"
        style={{ fontSize: Math.max(15, Math.round(size * 0.56)) }}
      >
        SOYL Academy
      </span>
    </>
  );

  const classes = cn('inline-flex items-center gap-2.5', className);

  if (href === null) return <span className={classes}>{content}</span>;
  return (
    <Link href={href} className={classes} aria-label="SOYL Academy home">
      {content}
    </Link>
  );
}
