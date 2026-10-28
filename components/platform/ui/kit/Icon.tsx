import type { SVGProps } from 'react';

/** A small, dependency-free icon set (24 px grid, 2 px stroke, currentColor). Always decorative. */
const PATHS = {
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronRight: 'M9 5l7 7-7 7',
  chevronDown: 'M5 9l7 7 7-7',
  plus: 'M12 5v14M5 12h14',
  info: 'M12 11v6M12 7.5v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  alert: 'M12 8v5M12 16.5v.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z',
  spark: 'M13 2L4.5 13.5H12L11 22l8.5-11.5H12L13 2z',
  book: 'M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15zM4 20.5A2.5 2.5 0 016.5 23H20',
  speaker: 'M4 9.5h4l5-4v13l-5-4H4v-5zM16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5',
  clock: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  // M2 (web-platform): player, flashcards, practice, report.
  play: 'M7 4.5v15l12-7.5-12-7.5z',
  pause: 'M8 5v14M16 5v14',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  shuffle: 'M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  grip: 'M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01',
  rotate: 'M4 12a8 8 0 0114-5.3L20 9M20 4v5h-5M20 12a8 8 0 01-14 5.3L4 15M4 20v-5h5',
  lock: 'M6 11h12v10H6V11zM8.5 11V8a3.5 3.5 0 017 0v3',
  // M3/M4 (web-platform): tests, AI, plans, leaderboard.
  grid: 'M4 4h6v6H4V4zM14 4h6v6h-6V4zM4 14h6v6H4v-6zM14 14h6v6h-6v-6z',
  wifiOff: 'M3 3l18 18M8.5 16.5a5 5 0 017 0M5 12.5a10 10 0 015.2-2.8M19 12.5a10 10 0 00-2.4-1.7M2 8.8a15 15 0 014.3-2.6M22 8.8A15 15 0 0010.5 5M12 20h.01',
  trophy: 'M8 4h8v5a4 4 0 01-8 0V4zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8 21h8M9 17h6',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4V8zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z',
  send: 'M4 12l16-8-6 16-2.5-6.5L4 12z',
  stop: 'M7 7h10v10H7V7z',
  chat: 'M4 5h16v11H9l-5 4V5z',
  card: 'M3 6h18v12H3V6zM3 10h18M7 15h4',
  // SOYL Coins (ADR-021): coin, store, streak.
  coin: 'M12 21a9 9 0 100-18 9 9 0 000 18zM14.5 9.2A3 3 0 0012 8c-1.7 0-3 .9-3 2s1.3 1.6 3 2 3 .9 3 2-1.3 2-3 2a3 3 0 01-2.5-1.2M12 6.5V8M12 16v1.5',
  gift: 'M4 11h16v10H4V11zM3 7h18v4H3V7zM12 7v14M12 7c-1.5-3-5-4-5-1.5S10 7 12 7zM12 7c1.5-3 5-4 5-1.5S14 7 12 7z',
  flame: 'M12 22a7 7 0 007-7c0-3.5-2.5-6-4-9.5-1.5 2-2.5 3.5-2.5 5.5-1.2-.8-2-2-2.2-3.8C8 8.5 5 11.5 5 15a7 7 0 007 7z',
} as const;

export type IconName = keyof typeof PATHS;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
