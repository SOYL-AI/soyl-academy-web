# ADR-031: Google Ads tag on marketing pages, behind consent

Status: accepted (Lead, 2026-11-12, owner request)
Related: D-014 (no third-party pixels for students), ADR-001 §8 / F-004 (no third-party analytics on platform routes), `components/legal/ConsentedAnalytics.tsx` (same pattern).

## Context

The owner is running Google Ads and asked for the Google tag `GTM-WC7CFG2T` to be installed. Google's instructions say to paste the snippet right after `<head>` on every page. That would:

1. load a third-party advertising script on the learning-platform pages, which D-014 forbids (students aged roughly 12–18; DPDP s.9(3) bans tracking and targeted advertising aimed at children);
2. set advertising cookies without asking, while the cookie bar says "cookieless analytics" and the privacy policy says students are never targeted with behavioural advertising.

The root layout (`app/layout.tsx`) is a shared file, so this needs an ADR.

## Options

1. **Paste the snippet into `<head>`.** Rejected for the reasons above.
2. **Reuse the existing `marketing` consent flag.** Rejected: that checkbox is labelled "Preferences (remember offers and form details)". Earlier "yes" answers to it are not consent to advertising cookies.
3. **A new `advertising` consent category and a client component that loads the tag only on marketing pages after opt-in** (chosen).

## Decision

- `CookiePreferences` gains `advertising` (missing in choices saved before today, so treated as `false`: earlier visitors are not opted in). The cookie bar gets an "Advertising (measure our Google ads)" checkbox. "Accept all" sets it and "Essential only" clears it. The bar's sentence mentions Google Ads cookies.
- `components/legal/ConsentedGoogleTag.tsx`, rendered next to `ConsentedAnalytics` in the root layout, injects Google's snippet with `next/script` (`afterInteractive`) only when `advertising === true` and the path is not a platform path (`isPlatformPath`).
- Consent Mode defaults are set before the tag loads: `ad_storage` and `ad_user_data` granted (conversion measurement), `ad_personalization` **denied** (no remarketing audiences), and `analytics_storage` denied (keeps the "cookieless analytics" promise if GA4 is added to the container).
- If the tag was loaded and the visitor then navigates client-side into a platform page or withdraws consent, the component sends a consent update that denies everything and then reloads the page, so the third-party script is unloaded.
- The privacy policy (§3 cookies, §5 providers) describes Google Ads measurement.

## Consequences

- Google Ads sees only visitors who opt in, so reported conversions will undercount. That is the cost of consent.
- Conversions that happen inside the learning platform (student sign-up) cannot be tracked by Google Ads. Track Future Builders registrations, demo/enquiry forms and other marketing-page events instead.
- Remarketing is off. Turning on `ad_personalization` would contradict the privacy policy and needs an owner + legal decision (OA-14) first.
- **GTM container rule:** do not add History Change triggers that could fire during the client-side navigation into a platform page (the reload happens just after it). Use Page View, Form Submission or specific-URL triggers for marketing pages.
- The cookie bar's first-visit screenshot and the `/privacy` screenshot change, so the marketing regression baseline needs re-accepting for those two shots.
- Rollback: remove `<ConsentedGoogleTag />` from `app/layout.tsx`.
