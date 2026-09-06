'use client';

import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-sm font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-white hover:bg-cobalt',
        secondary: 'border border-border-dark text-ink hover:border-ink hover:bg-ink hover:text-white',
        ghost: 'text-ink hover:underline underline-offset-4',
        'cobalt-outline': 'border border-cobalt text-cobalt hover:bg-cobalt hover:text-white',
      },
      size: {
        sm: 'h-10 px-4 text-[14px]',
        md: 'h-12 px-6 text-[15px]',
        lg: 'h-14 px-8 text-[17px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  showArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, showArrow, children, ...props }, ref) => {
    const content = (
      <>
        {children}
        {showArrow && (
          <svg
            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </>
    );

    const classes = cn(buttonVariants({ variant, size, className }), showArrow && 'group');

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';
