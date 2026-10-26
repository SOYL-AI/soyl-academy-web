/**
 * MockConsentProvider (GEN-3: refuses production). Every user starts at `defaultStatus`
 * (MOCK_CONSENT_DEFAULT, default `required`); tests and local dev change a user's state with
 * setStatus(). startFlow() moves a `required`/`revoked` user to `pending`, or straight to `granted`
 * when `autoGrant` is on (local e2e). `failing = true` simulates an outage (API-16).
 */
import type { ConsentState } from '@soyl/shared/config/security';
import { ConsentUnavailableError, type ConsentFlow, type ConsentProvider, type ConsentStatus } from './provider';

export class MockConsentProvider implements ConsentProvider {
  readonly name = 'mock';
  readonly isMock = true;
  private readonly states = new Map<string, ConsentState>();
  failing = false;
  calls = { getStatus: 0, startFlow: 0 };

  constructor(
    public defaultStatus: ConsentState = 'required',
    public autoGrant = false,
  ) {}

  setStatus(userId: string, status: ConsentState): void {
    this.states.set(userId, status);
  }

  async getStatus(userId: string): Promise<ConsentStatus> {
    this.calls.getStatus++;
    if (this.failing) throw new ConsentUnavailableError(new Error('mock consent outage'));
    const status = this.states.get(userId) ?? this.defaultStatus;
    return { status, providerRef: `mock-${userId}`, grantedAt: status === 'granted' ? new Date() : null };
  }

  async startFlow(userId: string): Promise<ConsentFlow> {
    this.calls.startFlow++;
    if (this.failing) throw new ConsentUnavailableError(new Error('mock consent outage'));
    const current = this.states.get(userId) ?? this.defaultStatus;
    const next: ConsentState = current === 'granted' ? 'granted' : this.autoGrant ? 'granted' : 'pending';
    this.states.set(userId, next);
    return { status: next, redirectUrl: null };
  }
}
