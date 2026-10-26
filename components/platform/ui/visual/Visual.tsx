/**
 * Visual dispatcher: renders every kind in platform/shared/content/visual.ts inside a <figure>.
 * Every visual's `alt` is its accessible name; `caption` is shown as a <figcaption>.
 *
 *   svg       → SvgDiagram (sanitised, DOMPurify lazy-loaded on the client)
 *   plot      → PlotVisual (server SVG, safe expression parser)
 *   geometry  → GeometryVisual (server SVG)
 *   chem      → equation: KaTeX mhchem (server); smiles: SmilesView (smiles-drawer lazy, client)
 *   table     → TableVisual (HTML table)
 *   flow      → FlowVisual (server SVG, deterministic layout)
 *
 * No 'use client': server-render it; only svg and smiles become client islands.
 */
import type { Visual as VisualData } from '@/platform/shared/content/visual';
import { cx } from '../cx';
import { MathBlock } from '../render/MathBlock';
import { chemToTex } from '../render/math';
import { SvgDiagram } from '../render/SvgDiagram';
import { FlowVisual } from './FlowVisual';
import { GeometryVisual } from './GeometryVisual';
import { PlotVisual } from './PlotVisual';
import { SmilesView } from './SmilesView';
import s from './visual.module.css';

export interface VisualProps {
  visual: VisualData;
  className?: string;
  /** Drop the frame (e.g. inside a slide that already has one). */
  bare?: boolean;
}

export function TableVisual({ spec, alt, caption }: { spec: Extract<VisualData, { kind: 'table' }>['spec']; alt: string; caption?: string }) {
  const headers = spec.headers ?? [];
  return (
    <div className={s.tableWrap} role="region" aria-label={alt} tabIndex={0}>
      <table className={s.table}>
        <caption className={caption ? s.tableCaption : 'p-visually-hidden'}>{caption ?? alt}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(spec.rows ?? []).map((row, r) => (
            <tr key={r}>
              {headers.map((_, c) =>
                c === 0 ? (
                  <th key={c} scope="row">
                    {row[c] ?? ''}
                  </th>
                ) : (
                  <td key={c}>{row[c] ?? ''}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChemEquation({ equation, alt }: { equation: string; alt: string }) {
  const tex = chemToTex(equation);
  if (!tex) return <p className={s.error}>Equation unavailable. {alt}</p>;
  return (
    <div role="group" aria-label={alt} className={s.chemEquation} data-visual="chem-equation">
      <MathBlock tex={tex} />
    </div>
  );
}

function body(v: VisualData) {
  switch (v.kind) {
    case 'svg':
      return <SvgDiagram spec={v.spec} alt={v.alt} />;
    case 'plot':
      return <PlotVisual spec={v.spec} alt={v.alt} />;
    case 'geometry':
      return <GeometryVisual spec={v.spec} alt={v.alt} />;
    case 'chem':
      return 'smiles' in v.spec ? <SmilesView smiles={v.spec.smiles} name={v.spec.name} alt={v.alt} /> : <ChemEquation equation={v.spec.equation} alt={v.alt} />;
    case 'table':
      return <TableVisual spec={v.spec} alt={v.alt} />;
    case 'flow':
      return <FlowVisual spec={v.spec} alt={v.alt} />;
    default:
      return <p className={s.error}>Unsupported visual.</p>;
  }
}

export function Visual({ visual, className, bare }: VisualProps) {
  if (!visual || typeof visual !== 'object') return null;
  // Tables carry the caption in <caption>; other kinds use <figcaption>.
  const caption = visual.kind === 'table' ? undefined : visual.caption;
  return (
    <figure className={cx(s.figure, bare && s.bare, className)} data-kind={visual.kind}>
      {visual.kind === 'table' ? <TableVisual spec={visual.spec} alt={visual.alt} caption={visual.caption} /> : body(visual)}
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );
}
