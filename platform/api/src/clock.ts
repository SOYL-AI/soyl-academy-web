/** Injectable clock so tests can time-travel (session lifetimes, OTP expiry, rate-limit windows). */
export interface Clock {
  now(): number;
}

export const systemClock: Clock = { now: () => Date.now() };

export class FakeClock implements Clock {
  constructor(private t: number = Date.UTC(2026, 9, 26, 6, 30)) {}
  now(): number {
    return this.t;
  }
  advance(ms: number): void {
    this.t += ms;
  }
  set(ms: number): void {
    this.t = ms;
  }
}
