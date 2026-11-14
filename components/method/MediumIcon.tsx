import type { MediumIcon as IconName } from '@/content/method';

const P = { stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

/** Small hand-drawn line drawings for the four ways a pupil can work. Decorative. */
export function MediumIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      {name === 'voice' && (
        <>
          <path {...P} d="M24 7.5 C 20 7.4, 18.3 10, 18.4 13 L 18.6 24 C 18.7 27.5, 21 29.6, 24.2 29.5 C 27.4 29.4, 29.5 27.2, 29.4 24 L 29.3 12.8 C 29.2 9.6, 27.3 7.6, 24 7.5 Z" />
          <path {...P} d="M13.5 22.5 C 13.8 30, 18 34.6, 24 34.8 C 30.3 34.9, 34.4 30.2, 34.6 22.6" />
          <path {...P} d="M24.1 35 L 23.9 41.5 M 17.5 41.6 C 21.5 41.2, 26.5 41.8, 30.5 41.4" />
        </>
      )}
      {name === 'type' && (
        <>
          <path {...P} d="M6.5 14.5 C 18 13.8, 30 14.6, 41.6 14.2 L 41.4 34.4 C 30 34.9, 18 34.3, 6.7 34.6 Z" />
          <path {...P} d="M11.5 20.5 h1 M17.5 20.4 h1 M23.5 20.6 h1 M29.5 20.4 h1 M35.5 20.5 h1 M11.5 25.6 h1 M17.5 25.5 h1 M23.5 25.4 h1 M29.5 25.6 h1 M35.5 25.5 h1" />
          <path {...P} d="M15.5 30 C 21 29.6, 27 30.3, 32.5 29.8" />
        </>
      )}
      {name === 'paper' && (
        <>
          <path {...P} d="M9.5 8.4 C 17 8, 25 8.6, 31.4 8.2 L 31.6 39.6 C 24 40, 16.5 39.4, 9.6 39.8 Z" />
          <path {...P} d="M14 15.5 C 18 15.2, 22 15.8, 26.5 15.4 M 14 21.5 C 19 21.2, 22 21.7, 25 21.4 M 14 27.4 C 17 27.1, 20 27.6, 22.5 27.3" />
          <path {...P} d="M27.6 28.5 C 30 28.3, 31.5 26.7, 33 26.8 L 37 26.7 C 38.4 26.8, 39.6 28.4, 41.4 28.4 L 41.3 39.5 L 27.8 39.6 Z" />
          <path {...P} d="M34.5 30.6 C 32.4 30.6, 31.4 32.2, 31.5 33.8 C 31.6 35.6, 33 36.6, 34.6 36.5 C 36.4 36.4, 37.4 35, 37.3 33.5 C 37.2 31.8, 36 30.6, 34.5 30.6 Z" />
        </>
      )}
      {name === 'sim' && (
        <>
          <path {...P} d="M8.6 30.5 C 8.5 20, 15.5 12.4, 24 12.5 C 32.6 12.6, 39.5 20.2, 39.4 30.6" />
          <path {...P} d="M8.5 30.6 C 18 30.2, 30 30.8, 39.5 30.5" />
          <path {...P} d="M24 30.3 L 31.5 18.6" />
          <path {...P} d="M13.5 24 l 2 1.2 M 18.5 18.2 l 1.4 1.8 M 24 16 v 2.2 M 29.8 18 l -1.3 1.9" />
          <path {...P} d="M15.5 36.5 C 20.5 36.2, 27.5 36.7, 32.5 36.4" />
        </>
      )}
    </svg>
  );
}
