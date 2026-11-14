/**
 * The marketing film (ADR-034). The owner will supply the real video; until then this points at the 10-second
 * brand loop. To swap it: drop the file in public/video/, set `src` (and `poster`, a 16:9 still), update
 * `duration`, and set `placeholder` to false. Add captions as a WebVTT file in `captions` when the film has speech.
 */
export const film = {
  src: '/video/soyl-loop.mp4',
  poster: '/video/soyl-loop-poster.jpg',
  title: 'A mission, from both sides',
  duration: '0:10',
  /** True while the real film is not in yet: the trigger says "Preview" instead of the running time. */
  placeholder: true,
  captions: null as string | null,
} as const;
