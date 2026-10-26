'use client';

/**
 * REVIEWED RENDERER (WEB-6/WEB-7): raw SVG diagrams. The only HTML injected here is the output of
 * sanitize-svg.ts. DOMPurify is loaded lazily on the client, so the server (and first paint)
 * renders an accessible placeholder sized like a diagram; there is no unsanitised path.
 */
import { useEffect, useState } from 'react';
import { loadBrowserSvgSanitizer } from './sanitize-svg';
import s from './render.module.css';

export interface SvgDiagramProps {
  spec: string;
  /** Accessible name (the visual's alt). */
  alt: string;
}

type State = { status: 'loading' } | { status: 'ready'; svg: string } | { status: 'refused'; error: string };

export function SvgDiagram({ spec, alt }: SvgDiagramProps) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    loadBrowserSvgSanitizer()
      .then((sanitize) => {
        if (cancelled) return;
        const result = sanitize(spec);
        if (result.svg) setState({ status: 'ready', svg: result.svg });
        else setState({ status: 'refused', error: result.error ?? 'refused' });
        if (result.removed.length > 0 && process.env.NODE_ENV !== 'production') {
          console.warn('[SvgDiagram] sanitiser removed:', result.removed);
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'refused', error: 'sanitiser failed to load' });
      });
    return () => {
      cancelled = true;
    };
  }, [spec]);

  if (state.status === 'ready') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={s.svgHost}
        data-state="ready"
        dangerouslySetInnerHTML={{ __html: state.svg }}
      />
    );
  }
  return (
    <div role="img" aria-label={alt} className={s.svgPlaceholder} data-state={state.status} aria-busy={state.status === 'loading' || undefined}>
      {state.status === 'refused' && <span className={s.svgRefused}>Diagram unavailable: {alt}</span>}
    </div>
  );
}
