import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'inverse' | 'outline-inverse' | 'ghost';
type Size = 'md' | 'lg';

// Brushed buttons (ADR-033): the uneven radius of a hand-drawn shape, ink on paper.
const base =
  'press btn-brush group/btn inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  // Ink is the action colour; ultramarine is its hover.
  primary: 'bg-ink text-sheet hover:bg-ultramarine',
  secondary: 'border-2 border-ink bg-transparent text-ink hover:bg-ochre-soft',
  // For use on ink / dark blocks.
  inverse: 'bg-sheet text-ink hover:bg-ochre',
  'outline-inverse': 'border-2 border-sheet/60 text-sheet hover:border-sheet hover:bg-sheet hover:text-ink',
  ghost: 'text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine hover:decoration-current',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-[52px] px-7 text-base',
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
  const classes = buttonClasses(variant, size, className);
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />}
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
