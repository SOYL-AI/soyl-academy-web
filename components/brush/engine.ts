/**
 * The marketing site's paint client (ADR-033). Browser only.
 *
 * All painting happens in a Web Worker (`paint.worker.ts`) on an OffscreenCanvas, so p5.brush never blocks the
 * page: no long tasks, smooth scrolling, nothing in the way of input. The worker is started on the first painting
 * and loads p5.brush itself. This side only sizes each painting's 2D canvas and draws the bitmaps the worker sends.
 *
 * With prefers-reduced-motion, or under automation (stable screenshots), a painting arrives in one frame.
 */
import type { ArtName, ArtOptions } from './recipes';

export interface PaintJob<A extends ArtName = ArtName> {
  canvas: HTMLCanvasElement;
  w: number;
  h: number;
  art: A;
  options: ArtOptions[A];
  seed: number;
  /** Milliseconds between strokes while it draws itself (0 = as many as fit in a slice). */
  stepMs: number;
  /** Paint everything at once. */
  instant: boolean;
  /** The paper colour under the artwork (the section background). */
  bg: string;
  /** Called once the painting is finished. */
  onDone?: () => void;
}

const MAX_DPR = 2;

let worker: Worker | null = null;
let failed = false;
let nextId = 1;
const live = new Map<number, { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; onDone?: () => void }>();

/** True when this browser can paint off the main thread (Worker + OffscreenCanvas + WebGL2). Cached. */
let supported: boolean | null = null;
export function canPaint(): boolean {
  if (supported === null) {
    try {
      supported =
        typeof Worker !== 'undefined' &&
        typeof OffscreenCanvas !== 'undefined' &&
        typeof createImageBitmap === 'function' &&
        typeof WebGL2RenderingContext !== 'undefined';
    } catch {
      supported = false;
    }
  }
  return supported && !failed;
}

/** Screenshots and tests need the same picture every time and no animation. */
export function isAutomated(): boolean {
  return typeof navigator !== 'undefined' && navigator.webdriver === true;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function stop() {
  failed = true;
  worker?.terminate();
  worker = null;
  live.forEach((j) => j.onDone?.());
  live.clear();
}

function getWorker(): Worker | null {
  if (failed) return null;
  if (worker) return worker;
  try {
    worker = new Worker(new URL('./paint.worker.ts', import.meta.url), { type: 'module', name: 'soyl-paint' });
  } catch {
    failed = true;
    return null;
  }
  worker.onmessage = (e: MessageEvent<{ type: string; id?: number; bitmap?: ImageBitmap }>) => {
    const { type, id, bitmap } = e.data;
    if (type === 'unsupported') return stop();
    const target = id ? live.get(id) : undefined;
    if (type === 'frame' && bitmap) {
      if (target && target.canvas.isConnected) {
        target.ctx.clearRect(0, 0, target.canvas.width, target.canvas.height);
        target.ctx.drawImage(bitmap, 0, 0, target.canvas.width, target.canvas.height);
      }
      bitmap.close();
    } else if (type === 'done' && id) {
      target?.onDone?.();
      live.delete(id);
    }
  };
  worker.onerror = stop;
  return worker;
}

/** Queue a painting. Returns a function that cancels it. */
export function paint<A extends ArtName>(job: PaintJob<A>): () => void {
  const w = getWorker();
  const ctx = job.canvas.getContext('2d');
  if (!w || !ctx) return () => {};
  const dpr = Math.min(MAX_DPR, Math.max(1, window.devicePixelRatio || 1));
  job.canvas.width = Math.max(2, Math.round(job.w * dpr));
  job.canvas.height = Math.max(2, Math.round(job.h * dpr));
  const id = nextId++;
  live.set(id, { canvas: job.canvas, ctx, onDone: job.onDone });
  w.postMessage({ type: 'paint', id, w: job.w, h: job.h, dpr, seed: job.seed, art: job.art, options: job.options, bg: job.bg, stepMs: job.stepMs, instant: job.instant });
  return () => {
    if (!live.delete(id)) return;
    worker?.postMessage({ type: 'cancel', id });
  };
}
