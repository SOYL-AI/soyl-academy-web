/**
 * `flow` visual: boxes and arrows with a deterministic layered layout. A left-to-right flow with
 * more than three steps would be unreadably small at 360 px, so a top-to-bottom version is also
 * rendered and a container query picks one (no JS). Server-renderable SVG.
 */
import type { Visual } from '@/platform/shared/content/visual';
import { layoutFlow, type FlowLayout } from './flow-layout';
import { hashId, LABEL_PROPS, round } from './svg-utils';
import s from './visual.module.css';

export type FlowSpec = Extract<Visual, { kind: 'flow' }>['spec'];

function FlowSvg({ layout, alt, markerId, className }: { layout: FlowLayout; alt: string; markerId: string; className?: string }) {
  return (
    <svg viewBox={`0 0 ${round(layout.width)} ${round(layout.height)}`} role="img" aria-label={alt} className={className} data-visual="flow" style={{ maxWidth: round(layout.width * 1.25) }}>
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="currentColor" />
        </marker>
      </defs>
      <g aria-hidden="true">
        {layout.edges.map((e, i) => (
          <line
            key={`e${i}`}
            x1={round(e.x1)}
            y1={round(e.y1)}
            x2={round(e.x2)}
            y2={round(e.y2)}
            stroke="currentColor"
            strokeWidth={1.75}
            strokeDasharray={e.back ? '5 4' : undefined}
            markerEnd={`url(#${markerId})`}
          />
        ))}
        {layout.nodes.map((n) => (
          <g key={n.id}>
            <rect x={round(n.x)} y={round(n.y)} width={n.w} height={n.h} rx={8} fill="var(--diagram-fill)" stroke="var(--diagram-accent)" strokeWidth={1.75} />
            <text x={round(n.x + n.w / 2)} y={round(n.y + 12 + 13)} textAnchor="middle" fontSize={13} fill="currentColor">
              {n.lines.map((line, j) => (
                <tspan key={j} x={round(n.x + n.w / 2)} dy={j === 0 ? 0 : 17}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}
        {layout.edges.map((e, i) =>
          e.label ? (
            <text key={`el${i}`} {...LABEL_PROPS} fontSize={12} x={round((e.x1 + e.x2) / 2)} y={round((e.y1 + e.y2) / 2 - 4)} textAnchor="middle">
              {e.label}
            </text>
          ) : null,
        )}
      </g>
    </svg>
  );
}

export function FlowVisual({ spec, alt }: { spec: FlowSpec; alt: string }) {
  if (!spec.nodes || spec.nodes.length === 0) return <p className={s.error}>Flow unavailable. {alt}</p>;
  const direction = spec.direction ?? 'LR';
  const primary = layoutFlow(spec, direction);
  const markerId = hashId('flow-arrow-', spec);
  if (direction === 'TB' || primary.ranks <= 3) {
    return (
      <div className={s.flow}>
        <FlowSvg layout={primary} alt={alt} markerId={markerId} className={s.svg} />
      </div>
    );
  }
  const narrow = layoutFlow(spec, 'TB');
  return (
    <div className={s.flow}>
      <FlowSvg layout={primary} alt={alt} markerId={markerId} className={`${s.svg} ${s.flowWide}`} />
      <FlowSvg layout={narrow} alt={alt} markerId={`${markerId}-n`} className={`${s.svg} ${s.flowNarrow}`} />
    </div>
  );
}
