import './story.css';
import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Kinetic type (ADR-034): a line whose words rise out of the paper one after another. A server component: the text
 * is split into word spans here, CSS does the motion. `load` plays it on page load (hero); otherwise it plays when
 * it scrolls in (the existing `[data-reveal]` observer). Screen readers get the plain sentence.
 *
 * Pass `children` instead of `text` to mix marks into the line: put each word or phrase in its own <Kinetic.Word>.
 */
interface KineticProps {
  as?: ElementType;
  text?: string;
  load?: boolean;
  /** Delay before the first word, in ms. */
  delay?: number;
  className?: string;
  children?: ReactNode;
  id?: string;
}

export function Kinetic({ as: Tag = 'p', text, load, delay = 0, className, children, id }: KineticProps) {
  const words = text ? text.split(/(\s+)/).filter((w) => w.length) : [];
  let wi = 0;
  return (
    <Tag
      id={id}
      className={cn(load ? 'kinetic-load' : 'kinetic', className)}
      data-reveal={load ? undefined : 'fade'}
      style={{ '--kd': `${delay}ms` } as CSSProperties}
    >
      {text ? (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((w, i) =>
              /^\s+$/.test(w) ? (
                <Fragment key={i}>{w}</Fragment>
              ) : (
                <span key={i} className="kw" style={{ '--wi': wi++ } as CSSProperties}>
                  {w}
                </span>
              )
            )}
          </span>
        </>
      ) : (
        children
      )}
    </Tag>
  );
}

/** One word (or phrase) of a children-mode Kinetic line; `i` is its order. */
function Word({ i, children, className }: { i: number; children: ReactNode; className?: string }) {
  return (
    <span className={cn('kw', className)} style={{ '--wi': i } as CSSProperties}>
      {children}
    </span>
  );
}
Kinetic.Word = Word;
