import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import s from './ink.module.css';

/**
 * The one action shape of "Ink and wash" (plan §2): a soft rectangle, never a pill. Indigo is the action by day,
 * mint at night (on slate). `quiet` is a text action with an underline, for the second choice next to a primary.
 */
export type InkButtonVariant = 'primary' | 'secondary' | 'quiet' | 'night' | 'night-secondary';
export type InkButtonSize = 'md' | 'lg';

const VARIANT: Record<InkButtonVariant, string> = {
  primary: s.primary,
  secondary: s.secondary,
  quiet: s.quiet,
  night: s.night,
  'night-secondary': s.nightSecondary,
};

export function inkButtonClasses(variant: InkButtonVariant = 'primary', size: InkButtonSize = 'md', className?: string) {
  return cn(s.button, VARIANT[variant], size === 'lg' && variant !== 'quiet' && s.lg, className);
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface CommonProps {
  variant?: InkButtonVariant;
  size?: InkButtonSize;
  /** Trailing arrow that nudges on hover (fine pointers only). */
  arrow?: boolean;
}

type InkLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** A link that looks like a button. External URLs (the teacher app, WhatsApp, mail) get a plain anchor. */
export function InkLink({ href, variant, size, arrow, className, children, ...rest }: InkLinkProps) {
  const classes = inkButtonClasses(variant, size, className);
  const inner = (
    <>
      {children}
      {arrow ? <Arrow /> : null}
    </>
  );
  if (/^(https?:|mailto:|tel:)/.test(href)) {
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

type InkButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function InkButton({ variant, size, arrow, className, children, type = 'button', ...rest }: InkButtonProps) {
  return (
    <button type={type} className={inkButtonClasses(variant, size, className)} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
