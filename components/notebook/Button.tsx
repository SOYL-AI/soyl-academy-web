import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'inverse' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'press inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-[var(--radius-sm)] disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  // Cobalt is the single action colour.
  primary: 'bg-cobalt text-white hover:bg-cobalt-deep',
  secondary: 'border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  // For use on cobalt / dark blocks.
  inverse: 'bg-white text-ink hover:bg-highlighter',
  ghost: 'text-ink underline decoration-rule-strong underline-offset-4 hover:text-cobalt hover:decoration-current',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 px-6 text-base min-h-[52px]',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], variant === 'ghost' ? 'h-auto px-0' : sizes[size], className);
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
}

export function ButtonLink({ href, variant, size, arrow, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, cn(arrow && 'group', className));
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  // External links (the product app, WhatsApp) use a plain anchor.
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {inner}
    </Link>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
