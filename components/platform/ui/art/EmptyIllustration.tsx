/** An empty-state illustration (empty-art.ts), always decorative. Pass it as `art` to the kit's EmptyState. */
import { emptyArt, type EmptyArtKind } from './empty-art';
import { SvgTree } from './SvgTree';

export function EmptyIllustration({ kind, width = 132, className }: { kind: EmptyArtKind; width?: number; className?: string }) {
  return (
    <span style={{ display: 'block', width, maxWidth: '100%', aspectRatio: '120 / 96' }} className={className}>
      <SvgTree nodes={emptyArt(kind)} viewBox="0 0 120 96" data-art={`empty-${kind}`} />
    </span>
  );
}
