'use client';

import './story.css';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A card that tilts towards the pointer in 3D (ADR-034), a few degrees at most. Mouse only (touch scrolls), off under
 * prefers-reduced-motion (story.css). Wrap a print or a card; the content stays a normal link or button.
 */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn('tilt-3d', className)}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`);
        ref.current.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--ry', '0deg');
        ref.current?.style.setProperty('--rx', '0deg');
      }}
    >
      {children}
    </div>
  );
}
