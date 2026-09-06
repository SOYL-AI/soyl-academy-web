import * as React from 'react';
import { cn } from '@/lib/utils';

interface MediaPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | 'auto';
}

export function MediaPlaceholder({
  label = 'Media Placeholder',
  aspectRatio = '16/9',
  className,
  ...props
}: MediaPlaceholderProps) {
  const aspectRatioClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    'auto': 'aspect-auto aspect-video', // Fallback to video aspect if auto with no content
  }[aspectRatio];

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-[#F4F0E7] text-ink/40 text-sm font-medium uppercase tracking-widest',
        aspectRatioClass,
        className
      )}
      {...props}
    >
      {label}
    </div>
  );
}
