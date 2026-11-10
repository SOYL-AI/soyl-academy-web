import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import s from './ink.module.css';

interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> {
  /** Whether this choice is the selected one (rendered as aria-pressed). */
  pressed: boolean;
  /** On slate (the night ground). */
  night?: boolean;
}

/**
 * One choice in a small set (board, class): a toggle button, at least 44 x 44 px, outlined until chosen, then
 * filled with ink (chalk at night). The parent owns the state; a group of chips sits in an element with a label
 * (for example `role="group" aria-label="Class"`).
 */
export function Chip({ pressed, night, className, type = 'button', ...rest }: ChipProps) {
  return <button type={type} aria-pressed={pressed} className={cn(s.chip, night && s.chipNight, className)} {...rest} />;
}
