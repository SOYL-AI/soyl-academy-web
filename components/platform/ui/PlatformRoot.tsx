import type { HTMLAttributes, ReactNode } from 'react';
import './styles/tokens.css';
import { cx } from './cx';

export interface PlatformRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Force a theme; omit to follow prefers-color-scheme. */
  theme?: 'light' | 'dark';
}

/**
 * The scope for every platform token and component style. Put it on the outermost platform
 * element (the (platform) layout does this). Importing this module is what loads tokens.css,
 * so marketing routes never receive it.
 */
export function PlatformRoot({ children, theme, className, ...rest }: PlatformRootProps) {
  return (
    <div {...rest} className={cx('soyl-platform', className)} data-theme={theme}>
      {children}
    </div>
  );
}
