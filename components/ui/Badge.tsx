import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center text-xs font-semibold tracking-widest uppercase',
  {
    variants: {
      variant: {
        default: 'text-ink',
        cobalt: 'text-cobalt',
        white: 'text-white',
      },
      accent: {
        true: 'pl-3 border-l-[1.5px]',
        false: '',
      }
    },
    compoundVariants: [
      { variant: 'default', accent: true, className: 'border-cobalt' },
      { variant: 'cobalt', accent: true, className: 'border-cobalt' },
      { variant: 'white', accent: true, className: 'border-white' },
    ],
    defaultVariants: {
      variant: 'default',
      accent: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  accent?: boolean;
}

export function Badge({ className, variant, accent, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, accent }), className)} {...props} />
  );
}
