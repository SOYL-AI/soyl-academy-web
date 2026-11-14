/**
 * The marketing film (ADR-034): the owner's 36-second teaser of SOYL missions (16:9, 1920x1080, H.264 with a
 * soundtrack; supplied 2026-11-14). The poster is the "Build it. Test it. Record it." frame at 12.6 s. To swap it:
 * drop the file in public/video/, set `src`, `poster` (a 16:9 still) and `duration`. Add captions as a WebVTT file
 * in `captions` if a future cut has speech.
 */
export const film = {
  src: '/video/soyl-academy-teaser.mp4',
  poster: '/video/soyl-academy-teaser-poster.jpg',
  title: 'SOYL missions: a first look',
  duration: '0:36',
  /** True while the real film is not in yet: the trigger says "Preview" instead of the running time. */
  placeholder: false,
  captions: null as string | null,
} as const;
