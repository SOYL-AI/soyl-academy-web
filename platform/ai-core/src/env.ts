/**
 * GEN-3: mock providers cannot run in production. Production is NODE_ENV=production or
 * APP_ENV=prod|production (the platform's environment name, see security requirements).
 */
export type Env = Record<string, string | undefined>;

export function isProductionEnv(env: Env = process.env): boolean {
  const app = env.APP_ENV?.toLowerCase();
  return env.NODE_ENV === 'production' || app === 'prod' || app === 'production';
}

export class MockInProductionError extends Error {
  constructor(what: string) {
    super(`${what} refuses to start in production (GEN-3). Configure the real provider, or pass the explicit test flag in a test.`);
    this.name = 'MockInProductionError';
  }
}

export function assertMockAllowed(what: string, env: Env, unsafeAllowInProduction = false): void {
  if (isProductionEnv(env) && !unsafeAllowInProduction) throw new MockInProductionError(what);
}
