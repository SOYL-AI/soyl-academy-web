/**
 * The paint worker (ADR-033). Every p5.brush painting on the marketing site is painted here, off the main thread,
 * so the page stays responsive however heavy the watercolour is. One OffscreenCanvas holds the single WebGL2
 * context; paintings are painted one at a time, and after every slice of strokes the worker sends a copy of the
 * canvas (an ImageBitmap) to the page, which draws it into the painting's own 2D canvas.
 *
 * Messages in:  { type: 'paint', id, w, h, dpr, seed, art, options, bg, stepMs, instant } | { type: 'cancel', id }
 * Messages out: { type: 'frame', id, bitmap } | { type: 'done', id } | { type: 'unsupported' }
 */
import type * as BrushModule from 'p5.brush/standalone';
import { recipeFor, type ArtName, type ArtOptions } from './recipes';
import { seededRandom, type Brush } from './random';

interface PaintMessage {
  type: 'paint';
  id: number;
  w: number;
  h: number;
  dpr: number;
  seed: number;
  art: ArtName;
  options: ArtOptions[ArtName];
  bg: string;
  stepMs: number;
  instant: boolean;
}
type InMessage = PaintMessage | { type: 'cancel'; id: number };

// A dedicated worker's global scope, typed loosely (the app's TS lib is DOM, not WebWorker).
const scope = self as unknown as {
  postMessage(message: unknown, transfer?: Transferable[]): void;
  onmessage: ((e: MessageEvent<InMessage>) => void) | null;
  requestAnimationFrame?: (cb: (t: number) => void) => number;
};

// p5.brush schedules a "did you call render()?" reminder with requestAnimationFrame; not every worker has it.
if (typeof scope.requestAnimationFrame !== 'function') {
  scope.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16) as unknown as number;
}

const SLICE_MS = 12;
const queue: PaintMessage[] = [];
const cancelled = new Set<number>();
let running = false;
let currentId = 0;
let surface: OffscreenCanvas | null = null;
let brush: Brush | null = null;
let scaled = false;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getBrush(): Promise<Brush | null> {
  if (brush) return brush;
  try {
    surface = new OffscreenCanvas(2, 2);
    if (!surface.getContext('webgl2', { premultipliedAlpha: true, preserveDrawingBuffer: true })) return null;
    brush = (await import('p5.brush/standalone')) as typeof BrushModule as Brush;
    return brush;
  } catch {
    return null;
  }
}

async function pump() {
  if (running) return;
  running = true;
  try {
    while (queue.length) {
      const job = queue.shift()!;
      if (cancelled.delete(job.id)) continue;
      const b = await getBrush();
      if (!b || !surface) {
        scope.postMessage({ type: 'unsupported' });
        queue.length = 0;
        break;
      }
      currentId = job.id;
      await run(b, surface, job);
      currentId = 0;
    }
  } finally {
    running = false;
  }
}

async function run(b: Brush, s: OffscreenCanvas, job: PaintMessage) {
  const pw = Math.max(2, Math.round(job.w * job.dpr));
  const ph = Math.max(2, Math.round(job.h * job.dpr));
  s.width = pw;
  s.height = ph;
  b.load(s);
  if (!scaled) {
    // Built-in brushes are tuned for small canvases; this suits ~600 px logical artwork.
    b.scaleBrushes(2.4);
    scaled = true;
  }
  // p5.brush's pencils and wet edges are made for opaque paper: paint on the colour the artwork sits on.
  b.clear(job.bg);
  b.seed(job.seed);
  b.noiseSeed(job.seed);
  b.push();
  b.translate(-pw / 2, -ph / 2); // top-left origin
  b.scale(job.dpr, job.dpr); // logical (CSS pixel) units

  const send = async () => {
    b.render();
    const bitmap = await createImageBitmap(s);
    scope.postMessage({ type: 'frame', id: job.id, bitmap }, [bitmap]);
  };

  try {
    const steps = recipeFor(job.art, job.options)({ b, w: job.w, h: job.h, rand: seededRandom(job.seed) });
    let i = 0;
    while (i < steps.length) {
      if (cancelled.delete(job.id)) return;
      const start = performance.now();
      if (job.instant) {
        while (i < steps.length) steps[i++]();
      } else if (job.stepMs > 0) {
        steps[i++]();
      } else {
        while (i < steps.length && performance.now() - start < SLICE_MS) steps[i++]();
      }
      if (!job.instant || i >= steps.length) await send();
      if (!job.instant) await sleep(Math.max(0, job.stepMs - (performance.now() - start)));
    }
  } catch {
    // Decoration only: a failed painting leaves the paper blank.
  } finally {
    b.pop();
  }
  scope.postMessage({ type: 'done', id: job.id });
}

scope.onmessage = (e) => {
  const msg = e.data;
  if (msg.type === 'cancel') {
    if (queue.some((j) => j.id === msg.id) || currentId === msg.id) cancelled.add(msg.id);
    return;
  }
  queue.push(msg);
  void pump();
};
