/** A tiny promise semaphore: at most `concurrency` functions run at once, FIFO. */
export type Limiter = <T>(fn: () => Promise<T>) => Promise<T>;

export function createLimiter(concurrency: number): Limiter {
  if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error(`concurrency must be a positive integer, got ${concurrency}`);
  let active = 0;
  const queue: (() => void)[] = [];
  const next = () => {
    if (active >= concurrency) return;
    const start = queue.shift();
    if (start) {
      active++;
      start();
    }
  };
  return <T>(fn: () => Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      queue.push(() => {
        fn()
          .then(resolve, reject)
          .finally(() => {
            active--;
            next();
          });
      });
      next();
    });
}
