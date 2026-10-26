/**
 * Budget guard (ARCHITECTURE §8.2, §10 cost controls). Holds a per-run cap and a total cap in
 * paise. Every model call first reserves its worst-case cost; a reservation that would push spent
 * + reserved past either cap is refused with BudgetExceededError, so the call is never made.
 * After the call the reservation is settled with the actual cost (or released on failure).
 *
 * "Pause only that spending activity": the guard only refuses model calls. Callers catch
 * BudgetExceededError, stop scheduling further model calls for that activity (the pipeline marks
 * the run `paused_budget`), and keep doing everything that costs nothing (lint, coverage, status).
 */

export type BudgetScope = 'run' | 'total';

export class BudgetExceededError extends Error {
  constructor(
    readonly scope: BudgetScope,
    readonly capPaise: number,
    readonly committedPaise: number,
    readonly requestedPaise: number,
  ) {
    super(
      `${scope} budget would be exceeded: cap ₹${(capPaise / 100).toFixed(2)}, already committed ₹${(committedPaise / 100).toFixed(2)}, ` +
        `this call needs up to ₹${(requestedPaise / 100).toFixed(2)}`,
    );
    this.name = 'BudgetExceededError';
  }
}

export interface BudgetOptions {
  /** Cap for this run, in paise. Infinity = no cap. */
  runCapPaise: number;
  /** Cap across all runs, in paise. */
  totalCapPaise: number;
  /** Already spent in this run (when resuming). */
  spentRunPaise?: number;
  /** Already spent across all runs (from the ledger). */
  spentTotalPaise?: number;
}

export interface Reservation {
  readonly id: number;
  readonly paise: number;
}

export interface BudgetSnapshot {
  runCapPaise: number;
  totalCapPaise: number;
  spentRunPaise: number;
  spentTotalPaise: number;
  reservedPaise: number;
}

export class BudgetGuard {
  private spentRun: number;
  private spentTotal: number;
  private readonly reservations = new Map<number, number>();
  private nextId = 1;

  constructor(private readonly opts: BudgetOptions) {
    if (!(opts.runCapPaise >= 0) || !(opts.totalCapPaise >= 0)) throw new Error('budget caps must be non-negative');
    this.spentRun = opts.spentRunPaise ?? 0;
    this.spentTotal = opts.spentTotalPaise ?? 0;
  }

  static unlimited(): BudgetGuard {
    return new BudgetGuard({ runCapPaise: Infinity, totalCapPaise: Infinity });
  }

  private get reserved(): number {
    let sum = 0;
    for (const v of this.reservations.values()) sum += v;
    return sum;
  }

  /** Throws BudgetExceededError if `paise` more could exceed a cap. Does not reserve. */
  check(paise: number): void {
    const reserved = this.reserved;
    if (this.spentRun + reserved + paise > this.opts.runCapPaise)
      throw new BudgetExceededError('run', this.opts.runCapPaise, this.spentRun + reserved, paise);
    if (this.spentTotal + reserved + paise > this.opts.totalCapPaise)
      throw new BudgetExceededError('total', this.opts.totalCapPaise, this.spentTotal + reserved, paise);
  }

  reserve(paise: number): Reservation {
    if (!(paise >= 0)) throw new Error(`invalid reservation ${paise}`);
    this.check(paise);
    const id = this.nextId++;
    this.reservations.set(id, paise);
    return { id, paise };
  }

  /** Converts a reservation into actual spend. Actual may exceed the reservation slightly (estimates); it is recorded as is. */
  settle(reservation: Reservation, actualPaise: number): void {
    this.reservations.delete(reservation.id);
    this.record(actualPaise);
  }

  release(reservation: Reservation): void {
    this.reservations.delete(reservation.id);
  }

  /** Records spend that was not reserved (e.g. a batch fetched by a later process). */
  record(paise: number): void {
    this.spentRun += paise;
    this.spentTotal += paise;
  }

  snapshot(): BudgetSnapshot {
    return {
      runCapPaise: this.opts.runCapPaise,
      totalCapPaise: this.opts.totalCapPaise,
      spentRunPaise: this.spentRun,
      spentTotalPaise: this.spentTotal,
      reservedPaise: this.reserved,
    };
  }

  remainingPaise(): number {
    const reserved = this.reserved;
    return Math.max(0, Math.min(this.opts.runCapPaise - this.spentRun - reserved, this.opts.totalCapPaise - this.spentTotal - reserved));
  }
}
