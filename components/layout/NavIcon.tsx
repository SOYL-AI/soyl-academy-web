import type { NavIconName } from '@/lib/site';

/**
 * The small line icons used by the header menus and the footer (ADR-025). Inline SVG, 24×24 grid, drawn
 * for SOYL: no icon dependency, no external requests. Decorative: always aria-hidden; the link text names
 * the destination.
 */
type IconName = NavIconName | 'instagram' | 'chevron' | 'arrow' | 'external';

const PATHS: Record<IconName, React.ReactNode> = {
  school: (
    <>
      <path d="M3 10.5 12 5l9 5.5" />
      <path d="M5 9.5V19h14V9.5" />
      <path d="M10 19v-4.5h4V19" />
      <path d="M3 19h18" />
    </>
  ),
  teacher: (
    <>
      <rect x="3" y="4" width="18" height="11" rx="1.5" />
      <path d="M7 8.5h6M7 11.5h4" />
      <circle cx="16.5" cy="18" r="2" />
      <path d="M8 20l2-5" />
    </>
  ),
  parent: (
    <>
      <circle cx="8.5" cy="7" r="2.6" />
      <circle cx="16.5" cy="10" r="2" />
      <path d="M3.5 19.5c0-3.2 2.2-5.5 5-5.5s5 2.3 5 5.5" />
      <path d="M13.5 15.2c.8-.8 1.8-1.2 3-1.2 2.2 0 4 1.9 4 4.5" />
    </>
  ),
  student: (
    <>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6.5 10.5v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5" />
      <path d="M21.5 8.5V14" />
    </>
  ),
  method: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c2.5-1 4.5-1 5-.5s.5 2.5-.5 5l-6 6-4-4 5.5-6.5Z" />
      <path d="M9 11 5.5 10.5 3.5 13l4 .5M13 15l.5 3.5L11 20.5l-.5-4" />
      <circle cx="15.5" cy="8.5" r="1.3" />
      <path d="M6 18c-1 .5-2 .5-2 .5s0-1 .5-2" />
    </>
  ),
  shapes: (
    <>
      <circle cx="7.5" cy="7.5" r="3.5" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
      <path d="M16.5 3.5 20.5 10h-8l4-6.5Z" />
      <path d="M4 20l7-7" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5c-1.8-1.3-4.5-2-8-2v13c3.5 0 6.2.7 8 2 1.8-1.3 4.5-2 8-2v-13c-3.5 0-6.2.7-8 2Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  tests: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 3.5V5h6V3.5" />
      <path d="m8.5 11 1.5 1.5 3-3M8.5 16h7" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h16v10H10l-4.5 4v-4H4v-10Z" />
      <path d="M8.5 9.5h7M8.5 12h4.5" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" />
    </>
  ),
  journal: (
    <>
      <path d="M5 4.5h11a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2v-13Z" />
      <path d="M5 17.5a2 2 0 0 1 2-2h11" />
      <path d="M9 8.5h5.5M9 11h3.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m9 14.5 2 2 4-4" />
    </>
  ),
  team: (
    <>
      <circle cx="12" cy="8" r="3" />
      <circle cx="5.5" cy="10" r="2.2" />
      <circle cx="18.5" cy="10" r="2.2" />
      <path d="M6.5 19.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5M2.5 18c0-2 1.3-3.6 3-4M21.5 18c0-2-1.3-3.6-3-4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="12.5" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </>
  ),
  chevron: <path d="m7 10 5 5 5-5" />,
  arrow: <path d="M5 12h13M13 7l5 5-5 5" />,
  external: <path d="M8 16 16.5 7.5M9.5 7.5h7v7" />,
};

export function NavIcon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
