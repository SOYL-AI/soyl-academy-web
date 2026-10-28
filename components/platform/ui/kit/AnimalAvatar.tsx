/**
 * A student's animal avatar (design-system, 2026-10-29; config platform/shared/config/avatars.ts): the picked
 * background theme (`--p-avatar-<bg>`) in a circle with the animal drawing as a static image
 * (`/me/avatars/<id>.v<n>.svg`), so showing an avatar costs no JavaScript beyond this component. The full set
 * of drawings (inline SVG) only loads with the avatar picker.
 *
 * - Sizes are any pixel value; 24 px is the smallest designed size.
 * - `ring` adds a tier ring (league tier or card tier) drawn with the kit's tier tokens.
 * - Accessible name: "Giraffe avatar" (or `label`); decorative when a name is printed next to it.
 * - No avatar (a student without a public name, D-039): a neutral silhouette.
 */
import type { CSSProperties } from 'react';
import { cx } from '../cx';
import { avatarSrc } from '../art/avatar-src';
import { Icon } from './Icon';
import s from './AnimalAvatar.module.css';

export type AvatarRing = 'bronze' | 'silver' | 'gold' | 'sapphire' | 'diamond' | 'elite' | 'accent';

export interface AvatarValue {
  id: string;
  bg: string;
}

/** "giraffe" → "Giraffe" (ids are the lower-case animal names). */
export function animalName(id: string): string {
  return id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Animal';
}

export function avatarLabel(id: string): string {
  return `${animalName(id)} avatar`;
}

export interface AnimalAvatarProps {
  avatar: AvatarValue | null | undefined;
  /** Pixels (default 40). */
  size?: number;
  ring?: AvatarRing;
  /** Decorative when a name is printed next to it. */
  decorative?: boolean;
  /** Accessible name; defaults to "Giraffe avatar". */
  label?: string;
  className?: string;
}

export function AnimalAvatar({ avatar, size = 40, ring, decorative = false, label, className }: AnimalAvatarProps) {
  const style = { width: size, height: size, ...(avatar ? { '--av-bg': `var(--p-avatar-${avatar.bg})` } : {}) } as CSSProperties;
  const a11y = decorative ? { 'aria-hidden': true as const } : { role: 'img' as const, 'aria-label': label ?? (avatar ? avatarLabel(avatar.id) : 'Student') };
  return (
    <span className={cx(s.avatar, !avatar && s.empty, className)} style={style} data-ring={ring} data-avatar={avatar?.id} data-bg={avatar?.bg} {...a11y}>
      {avatar ? (
        // A same-origin static SVG with a fixed size: next/image would add nothing (no optimisation for SVG).
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarSrc(avatar.id)} alt="" width={size} height={size} decoding="async" draggable={false} className={s.img} />
      ) : (
        <Icon name="user" size={Math.max(14, Math.round(size * 0.55))} />
      )}
    </span>
  );
}
