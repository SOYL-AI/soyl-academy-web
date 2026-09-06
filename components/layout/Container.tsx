import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8 w-full',
  {
    variants: {
      size: {
        narrow: 'max-w-3xl',
        default: 'max-w-7xl',
        wide: 'max-w-[1440px]',
        full: 'max-w-full px-0 sm:px-0 lg:px-0',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ className, size, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
