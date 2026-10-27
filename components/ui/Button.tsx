import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'inverse' | 'outline-inverse' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'press group/btn inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-full disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  // Ink is the action colour; cobalt is its hover.
  primary: 'bg-ink text-white hover:bg-cobalt',
  secondary: 'border border-ink/25 bg-white text-ink hover:border-highlighter hover:bg-highlighter',
  // For use on ink / dark blocks.
  inverse: 'bg-white text-ink hover:bg-highlighter',
  'outline-inverse': 'border border-white/45 text-white hover:border-white hover:bg-white hover:text-ink',
  ghost: 'text-ink underline decoration-rule-strong underline-offset-4 hover:text-cobalt hover:decoration-current',
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
