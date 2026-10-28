/**
 * Inline avatar drawings (the picker, the art sheet): the full set of 64 animals. Import this module only from
 * lazily loaded chunks; everywhere else use the kit's `AnimalAvatar`, which shows a static image.
 */
import type { CSSProperties } from 'react';
import { cx } from '../cx';
import { animalName } from '../kit/AnimalAvatar';
import { avatarArt } from './avatar-art';
import { SvgTree } from './SvgTree';
import s from '../kit/AnimalAvatar.module.css';

export function AvatarArt({ id, size = '100%', title }: { id: string; size?: number | string; title?: string }) {
  const nodes = avatarArt(id);
  if (!nodes) return null;
  return <SvgTree nodes={nodes} size={size} title={title} data-art={id} />;
}

/** The same circle as `AnimalAvatar`, with the drawing inline (no image request). */
export function InlineAvatar({ id, bg, size = 64, decorative = true, className }: { id: string; bg: string; size?: number; decorative?: boolean; className?: string }) {
  const style = { width: size, height: size, '--av-bg': `var(--p-avatar-${bg})` } as CSSProperties;
  return (
    <span className={cx(s.avatar, className)} style={style} data-avatar={id} data-bg={bg} {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': `${animalName(id)} avatar` })}>
      <AvatarArt id={id} size={size} />
    </span>
  );
}
