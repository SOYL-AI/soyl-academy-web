/**
 * Where an avatar image lives (the static route app/(platform)/me/avatars/[file]/route.ts). Tiny and import-free
 * apart from the version, so the top bar can show the student's avatar without loading any drawing code.
 */
export const AVATAR_IMAGE_VERSION = 1;
export const AVATAR_IMAGE_BASE = '/me/avatars';

export function avatarImageFile(id: string, version = AVATAR_IMAGE_VERSION): string {
  return `${id}.v${version}.svg`;
}

export function avatarSrc(id: string): string {
  return `${AVATAR_IMAGE_BASE}/${avatarImageFile(id)}`;
}

/** `giraffe.v1.svg` → `giraffe` (current version only); anything else → null. */
export function parseAvatarImageFile(file: string): string | null {
  const m = /^([a-z]{2,20})\.v(\d+)\.svg$/.exec(file);
  return m && Number(m[2]) === AVATAR_IMAGE_VERSION ? m[1]! : null;
}
