import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon, type IconName } from './Icon';
import s from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner, keeps the width, sets aria-busy and blocks clicks. */
  loading?: boolean;
  /** Full-width (thumb-friendly primary action on mobile). */
  block?: boolean;
  icon?: IconName;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, block = false, icon, className, children, disabled, onClick, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      // While loading, the button stays focusable but cannot submit or fire again.
      type={loading ? 'button' : type}
      className={cx(s.button, s[variant], size !== 'md' && s[size], block && s.block, loading && s.loading, className)}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? undefined : onClick}
      {...rest}
    >
      <span className={s.label}>
        {icon && <Icon name={icon} size={18} />}
        {children}
      </span>
      {loading && <span className={s.spinner} aria-hidden="true" />}
    </button>
  );
});

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible name (required: the button has no visible text). */
  label: string;
  icon: IconName;
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
  children?: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = 'ghost', size = 'md', className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cx(s.button, s.icon, s[variant], size === 'sm' && s.sm, className)}
      {...rest}
    >
      <Icon name={icon} size={size === 'sm' ? 18 : 22} />
    </button>
  );
});
