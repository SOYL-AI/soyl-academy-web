/**
 * A link that looks like a Button (design language v3, ADR-032): for navigation ("Continue", "Start lesson",
 * "See all tests"). Server-safe. Use Button for actions that do not change the page.
 */
import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';
import type { ButtonSize, ButtonVariant } from './Button';
import { Icon, type IconName } from './Icon';
import s from './Button.module.css';

export interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  /** Leading icon. */
  icon?: IconName;
  /** Trailing icon (e.g. arrowRight for "See all"). */
  iconEnd?: IconName;
  prefetch?: boolean;
  children: ReactNode;
}

export function ButtonLink({ href, variant = 'primary', size = 'md', block, icon, iconEnd, className, children, prefetch, ...rest }: ButtonLinkProps) {
  return (
    <Link href={href} prefetch={prefetch} className={cx(s.button, s[variant], size !== 'md' && s[size], block && s.block, className)} {...rest}>
      <span className={s.label}>
        {icon && <Icon name={icon} size={18} />}
        {children}
        {iconEnd && <Icon name={iconEnd} size={18} />}
      </span>
    </Link>
  );
}
