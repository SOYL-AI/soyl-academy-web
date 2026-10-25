/**
 * Feature flags. Both default to OFF: production stays dark until the owner switches them on.
 * Read from the environment so the same build can run with different flags per environment.
 */

type Env = Record<string, string | undefined>;

function isOn(value: string | undefined): boolean {
  return value === 'true' || value === '1';
}

export interface PlatformFlags {
  /** Platform routes and marketing entry points are visible. */
  platformEnabled: boolean;
  /** Purchase buttons are live and billing endpoints accept new purchases. */
  billingEnabled: boolean;
}

/**
 * Server-side flags. The web app reads NEXT_PUBLIC_PLATFORM_ENABLED (it must be inlined into
 * client bundles); the API reads PLATFORM_ENABLED. Either spelling is accepted on the server.
 */
export function readFlags(env: Env = process.env): PlatformFlags {
  return {
    platformEnabled: isOn(env.PLATFORM_ENABLED) || isOn(env.NEXT_PUBLIC_PLATFORM_ENABLED),
    billingEnabled: isOn(env.BILLING_ENABLED) || isOn(env.NEXT_PUBLIC_BILLING_ENABLED),
  };
}
