/** A subject's glyph (subject-art.ts), always decorative: the subject's name is printed next to it. */
import { subjectArt, type SubjectArtKind } from './subject-art';
import { SvgTree } from './SvgTree';

export function SubjectGlyph({ kind, size = 28, className }: { kind: SubjectArtKind; size?: number; className?: string }) {
  return <SvgTree nodes={subjectArt(kind)} viewBox="0 0 48 48" size={size} className={className} data-art={`subject-${kind}`} />;
}
