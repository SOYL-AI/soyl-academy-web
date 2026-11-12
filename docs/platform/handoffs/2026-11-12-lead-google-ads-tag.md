# Lead — Google Ads tag on marketing pages — 2026-11-12
Status: done (uncommitted; not deployed)
What changed: `components/legal/ConsentedGoogleTag.tsx` (new), `components/legal/consent.ts` (`advertising` field), `components/legal/CookieConsent.tsx` (Advertising checkbox, banner sentence), `app/layout.tsx` (renders the component), `app/privacy/page.tsx` (§3 advertising card, §5 Google provider, "Last updated: November 2026"), ADR-031 + ADR index.
How to verify:
- `npx tsc --noEmit -p .` and `npx eslint components/legal app/layout.tsx app/privacy/page.tsx`: clean.
- `npm run build`: passes; marketing first-load JS +1.9 KB gz per page.
- `npm run test:platform-web`: 470/470 passed.
- `npm run marketing:diff -w @soyl/e2e -- --base HEAD --lighthouse` (run from `platform/`): 46 passed, 4 expected diffs only (home first visit cookie bar, mobile + desktop; /privacy, mobile + desktop). Lighthouse within 5 points (median of 10: mobile /future-builders 86→85, /journal 93→91).
- Browser checks against `next start` (Playwright, Google requests stubbed): no tag before a choice, after "Essential only", or for consents saved before today; after "Accept all" and on /privacy with consent, one request to `gtag/js?id=GTM-WC7CFG2T` with Consent Mode defaults (ad_storage, ad_user_data granted; ad_personalization, analytics_storage denied); never on /learn; client-side navigation / → /learn does a full reload and leaves no tag; withdrawing consent reloads and removes the tag.
Tests added: none in the repo (the behaviour checks above were ad hoc).
Known gaps / follow-ups:
- `marketing:regression` against the stored baseline fails on almost every page because the baseline (2026-10-29) predates the Diwali / Future Builders work and has no `/future-builders/registered` image. Re-baselining is a separate, owner-approved step.
- GTM container: use Page View / form / URL triggers on marketing pages; avoid History Change triggers (ADR-031).
- Conversions inside the learning platform (student sign-up) cannot be tracked by design.
Decisions made: ADR-031.
Needs from owner: approval of the privacy-policy and cookie-bar wording; go-ahead to commit and deploy.
