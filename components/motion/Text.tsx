import { cn } from '@/lib/utils';

/**
 * A headline whose words rise in, one after another, on page load.
 * CSS only (see `.rise-word` in globals.css): the text is in the server HTML,
 * runs without JS, and is static under prefers-reduced-motion.
 */
export function RiseWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="rise-word" style={{ '--i': start + i } as React.CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

/**
 * A hand-drawn pen underline under a short phrase. It traces itself on page
 * load (`trigger="load"`) or when its `[data-reveal]` ancestor scrolls into view.
 * Without motion it is simply drawn.
 */
export function Drawn({
  children,
  trigger = 'reveal',
  className,
}: {
  children: React.ReactNode;
  trigger?: 'load' | 'reveal';
  className?: string;
}) {
  return (
    <span className={cn('drawn', className)} data-draw={trigger === 'load' ? 'load' : undefined}>
      {children}
      <svg viewBox="0 0 300 18" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path
          pathLength={1}
          d="M4 12 C 60 4, 110 15, 160 8 S 262 4, 296 9"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
