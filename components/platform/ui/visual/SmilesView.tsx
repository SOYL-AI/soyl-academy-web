'use client';

/**
 * SMILES structure drawing. smiles-drawer (and chroma-js) load only when a structure is on screen,
 * in their own chunk. Input is validated against the SMILES character set first (same check as
 * pipeline stage 4); smiles-drawer builds SVG through DOM APIs, not innerHTML.
 */
import { useEffect, useRef, useState } from 'react';
import s from './visual.module.css';

const SMILES_RE = /^[A-Za-z0-9@+\-[\]()=#$:/\\.%*]{1,200}$/;

export function isPlausibleSmiles(smiles: string): boolean {
  return SMILES_RE.test(smiles);
}

type SmilesModule = typeof import('smiles-drawer');
let loader: Promise<SmilesModule['default']> | null = null;
const loadSmilesDrawer = () => (loader ??= import('smiles-drawer').then((m) => m.default));

/** Atom colours chosen for ≥ 3:1 against the light and dark surfaces; carbon follows the text colour. */
const THEMES = {
  light: { C: '#171717', O: '#c0392b', N: '#2f4fd8', F: '#1b6e44', CL: '#1b6e44', BR: '#9a4a12', I: '#6b3fa0', P: '#9a4a12', S: '#8a6d00', B: '#9a4a12', SI: '#9a4a12', H: '#55554f', BACKGROUND: 'transparent' },
  dark: { C: '#f1eee6', O: '#ff9b8f', N: '#9db0ff', F: '#7fd8a4', CL: '#7fd8a4', BR: '#f0b27a', I: '#d2b4f5', P: '#f0b27a', S: '#f2cf6b', B: '#f0b27a', SI: '#f0b27a', H: '#c4c1b7', BACKGROUND: 'transparent' },
};

function prefersDark(el: Element | null): boolean {
  const root = el?.closest('.soyl-platform');
  const forced = root?.getAttribute('data-theme');
  if (forced === 'dark') return true;
  if (forced === 'light') return false;
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

export function SmilesView({ smiles, alt, name }: { smiles: string; alt: string; name?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(isPlausibleSmiles(smiles) ? 'loading' : 'error');

  useEffect(() => {
    if (!isPlausibleSmiles(smiles)) return;
    let cancelled = false;
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    const draw = () => {
      loadSmilesDrawer()
        .then((SmilesDrawer) => {
          if (cancelled || !ref.current) return;
          const svg = ref.current;
          while (svg.firstChild) svg.removeChild(svg.firstChild);
          const drawer = new SmilesDrawer.SvgDrawer({ width: 320, height: 220, bondThickness: 1.4, fontSizeLarge: 12, fontSizeSmall: 8, padding: 16, themes: THEMES });
          SmilesDrawer.parse(
            smiles,
            (tree) => {
              if (cancelled) return;
              drawer.draw(tree, svg, prefersDark(svg) ? 'dark' : 'light');
              // The drawer sets pixel sizes; let CSS scale it instead.
              svg.removeAttribute('width');
              svg.removeAttribute('height');
              svg.style.removeProperty('width');
              svg.style.removeProperty('height');
              setStatus('ready');
            },
            () => !cancelled && setStatus('error'),
          );
        })
        .catch(() => !cancelled && setStatus('error'));
    };
    draw();
    media?.addEventListener?.('change', draw);
    return () => {
      cancelled = true;
      media?.removeEventListener?.('change', draw);
    };
  }, [smiles]);

  return (
    <div className={s.smiles} role="img" aria-label={alt} data-state={status} data-visual="chem-smiles">
      <svg ref={ref} aria-hidden="true" focusable="false" className={s.smilesSvg} viewBox="0 0 320 220" />
      {status === 'error' && <span className={s.smilesError}>Structure unavailable{name ? `: ${name}` : ''}</span>}
      {name && status !== 'error' && <span className={s.smilesName}>{name}</span>}
    </div>
  );
}
