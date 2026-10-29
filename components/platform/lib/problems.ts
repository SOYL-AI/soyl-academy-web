/**
 * Friendly text for API problem codes (backend-api M1 handoff list). Never shows server error text.
 */
import { isApiError } from '@/platform/shared/api-client';

function duration(seconds: number | undefined): string {
  if (!seconds || seconds <= 0) return 'a little while';
  if (seconds < 90) return `${Math.max(1, Math.round(seconds))} seconds`;
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m} minutes`;
  const h = Math.round(m / 60);
  return `${h} hour${h === 1 ? '' : 's'}`;
}

const GOOGLE_ERRORS: Record<string, string> = {
  oauth_state: 'Google sign-in took too long or was opened in another browser. Please try again.',
  oauth_failed: 'Google sign-in did not finish. Please try again, or use your phone or email.',
  email_unverified: 'Your Google account email is not verified. Use your phone or email instead.',
  account_exists_link_required: 'An account already uses this email. Log in with an email code first, then connect Google from your profile.',
  identifier_unavailable: 'This Google account cannot be used here. Try your phone or email.',
  staff_domain_not_allowed: 'Staff accounts must use the approved work domain.',
  staff_sign_in_method_not_allowed: 'Staff accounts cannot sign in with Google. Use the email code instead.',
  account_disabled: 'This account is disabled. Contact SOYL Academy support.',
  link_requires_fresh_session: 'For your safety, log in again and then connect Google.',
};

export function googleErrorMessage(code: string): string {
  return GOOGLE_ERRORS[code] ?? GOOGLE_ERRORS.oauth_failed!;
}

export function problemMessage(err: unknown, channel: 'phone' | 'email' | 'generic' = 'generic'): string {
  if (!isApiError(err)) return 'Something went wrong. Please try again.';
  const wait = duration(err.retryAfterSeconds);
  switch (err.code) {
    case 'otp_invalid':
      return channel === 'phone' ? 'That code is not right. Check the SMS and try again.' : 'That code is not right. Check the email and try again.';
    case 'otp_expired':
      return 'This code has expired. Ask for a new one.';
    case 'otp_locked':
      return `Too many wrong codes. For your safety, try again in ${wait}.`;
    case 'rate_limited':
      return `Too many attempts. Please wait ${wait} and try again.`;
    case 'phone_otp_paused':
      return 'SMS codes are paused for a short while. Please use email or Google instead.';
    case 'validation_failed':
      if (channel === 'phone') return 'Check the mobile number: it should be a 10-digit Indian mobile.';
      if (channel === 'email') return 'Check the email address, or use a different one (temporary inboxes are not allowed).';
      return 'Please check what you entered.';
    case 'identifier_unavailable':
      return channel === 'phone' ? 'This number cannot be used. Try email or Google.' : 'This email cannot be used. Try your phone or Google.';
    case 'account_disabled':
      return 'This account is disabled. Contact SOYL Academy support.';
    case 'staff_sign_in_requires_google':
      return 'Staff accounts sign in with Google.';
    case 'staff_sign_in_method_not_allowed':
      return channel === 'phone' ? 'Staff accounts cannot sign in with a phone code. Use the email code instead.' : 'Staff accounts cannot sign in this way.';
    case 'unauthenticated':
      return 'Please log in again.';
    case 'fresh_session_required':
      return 'For your safety, please log in again to do this.';
    case 'consent_required':
      return 'This needs approval first: a parent’s if you are under 18, or your own if you are 18 or older.';
    // Built-in consent flow (D-039).
    case 'consent_code_invalid':
      return 'That approval code is not right. Check the code your parent gave you and try again.';
    case 'consent_code_expired':
      return 'That approval code has expired or was replaced. Send a new one to your parent.';
    case 'age_band_required':
      return 'Tell us your age group first.';
    case 'age_band_locked':
      return 'Your age group cannot be changed here. If it is wrong, contact SOYL Academy support.';
    case 'consent_link_invalid':
      return 'This link is not valid any more. A newer email may have replaced it.';
    case 'consent_flow_unavailable':
      return 'Approval works differently here. Please check your profile page.';
    case 'consent_unavailable':
    case 'service_unavailable':
    case 'upstream_unavailable':
    case 'upstream_timeout':
    case 'network_error':
      return 'We could not reach SOYL Academy. Check your connection and try again.';
    case 'origin_not_allowed':
      return 'This page is out of date. Reload it and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
