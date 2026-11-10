import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import s from './ink.module.css';

interface WashProps {
  children: ReactNode;
  /** A paler wash, for long content. */
  soft?: boolean;
  /** Wipe in once along its brush direction when it first scrolls into view. Default true. */
  reveal?: boolean;
  delay?: number;
  className?: string;
  as?: 'div' | 'figure' | 'aside';
}

/**
 * The ragged painted wash a product moment lies on (plan §2.1: "washes under product moments"). The wash is a
 * layer behind the children and bleeds a little past them; the children stay sharp and never move.
 * Phase 1 has one wash (the indigo `panel` plate); door, ledger and report washes are painted in later phases.
 */
export function Wash({ children, soft, reveal = true, delay, className, as: Tag = 'div' }: WashProps) {
  const style = delay ? ({ '--d': `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag className={cn(s.wash, className)}>
      <span aria-hidden="true" data-reveal={reveal ? 'ink-wipe' : undefined} className={cn(s.washLayer, soft && s.washSoft)} style={style} />
      <div className={s.washContent}>{children}</div>
    </Tag>
  );
}
