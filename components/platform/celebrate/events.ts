/**
 * Small celebrations (design-system, 2026-10-29): a page asks for one with `celebrate()`, the app shell's
 * `CelebrationHost` shows it. The visuals are decorative (aria-hidden) and never take focus; the words are
 * announced by the toast that goes with them. Import-free so any page can call it without loading the visuals.
 */
export type Celebration =
  | { kind: 'level'; level: number }
  | { kind: 'badge'; badge: string; name: string }
  | { kind: 'goal'; credits: number }
  | { kind: 'bonus'; credits: number };

export const CELEBRATE_EVENT = 'soyl:celebrate';

export function celebrate(c: Celebration): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<Celebration>(CELEBRATE_EVENT, { detail: c }));
}
