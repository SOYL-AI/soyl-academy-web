# Personal-data inventory (DB-5)

Every column that holds personal data, how long it is kept, and what account deletion does to it.
`test/schema.test.ts` fails when a column whose name contains `email`, `phone`, `name`, `ip`,
`address`, `dob`, `birth`, `token`, `password` or `user_agent` is missing from this file, so add new
columns here in the same PR. Retention values follow ARCHITECTURE §15 and are **pending the owner's
sign-off (F-015)**; payment-record retention is a legal question (OA-14).

## Data minimisation (D-039)

What an account holds is kept to what the product needs:

- **Sign-up needs an email address only.** No name is required (`users.name` is the placeholder
  "SOYL learner" for every sign-up method; Google's name and picture are not stored), no phone in
  production (`AUTH_METHODS=email`), no school or city at sign-up, no date of birth.
- **School (optional, 0013, D-014):** a student whose consent is `granted` may save a school
  (`PATCH /v1/me` `school`); otherwise it is refused (403 `consent_required`) and never returned. A school
  is PII-adjacent for a minor (with class and city it narrows a child down), so: only the school row id is
  linked from the profile, `profiles.city` mirrors the school's city, both are cleared when consent leaves
  `granted` and at account deletion, and school names typed by students are screened (no contact details,
  links or blocked words) and shown to other students in search only once two accounts picked the school.
- **Age:** a self-declared band only (`consent_records.age_band`: 18 or older / under 18).
- **Parents:** the parent's email address is used once, to send the approval code, and never stored:
  only a keyed hash (rate limits, noticing a change of parent) and a masked hint ("p•••@gmail.com").
- **Public names:** other students only ever see an auto-generated name ("Brave Otter 417") derived from
  the account id and `profiles.public_name_seed`; display names stay on the student's own screens.
- **Analytics:** `analytics_events` has no user, device or IP column; no third-party analytics, pixels or
  Vercel Analytics on platform routes (D-014, WEB-1).

## Consent withdrawal (built-in provider, D-039)

When consent leaves `granted` (the student withdraws, the parent's link withdraws, or an 18+ account
re-declares as under 18), the API deletes the **AI data** at once: `ai_conversations` (cascades
`ai_messages`) and the user's uploads with both blobs, by the same path as account deletion below
(rows marked `deleted` in the transaction, then blobs and rows; the worker's `uploads.purge-deleted`
retries failures). In the same transaction the profile's school and city are cleared (D-014: school/city
are off without consent). An `audit_log` row (action "consent.ai_data_deleted") records the counts only
(conversations, uploads, schoolCleared).
Learning records (progress, practice, attempts, XP) are not AI data and stay.

## Account deletion (`DELETE /v1/me`)

Two steps, implemented by backend-api:

1. **Immediately (anonymise + revoke):** delete the user's `sessions`, `accounts` and `verifications`
   (by identifier = their email/phone), `consent_status`, `consent_records`, `guardian_links` (both directions), `user_mfa`,
   `ai_conversations` (cascades `ai_messages`), and the user's uploads with their blobs (S6-M02: in the
   transaction the `uploads` rows are marked `deleted`, so they are unusable at once; right after it the API
   deletes each upload's quarantine original (`uploads-quarantine/<blob_key>`) and cleaned copy
   (`uploads/<processed_key>`) and then the row, writing an `audit_log` row (action "account.uploads_purged") with ids and
   counts only; whatever fails is retried by the worker's `uploads.purge-deleted` job every 5 minutes, and an
   upload still being processed is never resurrected). Overwrite the `users` row:
   `name = 'Deleted user'`, `email = 'deleted+<id>@deleted.soyl.invalid'`, `phone_number = NULL`,
   `image = NULL`, `ban_reason = NULL`, `deleted_at = now()`; null the personal `profiles` fields
   (school, city and weekly goal included). Schools the account added (0013): an unverified one no other
   profile uses is deleted (a typed name could identify the child); the others stay as shared school
   records with `created_by_user_id` set to NULL.
   The generated `email_normalized` / `phone_e164` become NULL automatically.
   SOYL Coins (ADR-021): erase every `coin_redemptions` shipping address and tracking reference, cancel
   open merch redemptions (coins refunded to the ledger) and unequip digital items.
2. **Purge (≤ 30 days later, worker job):** `DELETE FROM users WHERE deleted_at < now() - interval '30 days'`.
   Foreign keys do the rest: `ON DELETE CASCADE` removes every per-user learning, AI, credit and
   gamification row; `ON DELETE SET NULL` detaches rows kept for a stated reason (billing, audit,
   content reports). Cascades run with the table owner's rights, so they work even on append-only tables.

Backups: PITR keeps deleted data for up to 14 days after the purge (F-015, threat model §5.5).

Legend for **On deletion**: *delete* = removed in step 1; *anonymise* = overwritten in step 1;
*cascade* = removed by the purge; *detach* = kept, user link set to NULL by the purge; *retain* = kept with reason.

## Inventory

| Column | What it holds | Retention | On deletion |
|---|---|---|---|
| `users.name` | Placeholder "SOYL learner" for every sign-up (D-039: Google's name is not stored; older Google accounts may hold it) | life of account | anonymise |
| `users.email` | Email as given (display, sign-in) | life of account | anonymise |
| `users.email_normalized` | Generated from `email` (DB-3) | follows `email` | anonymise (generated → NULL) |
| `users.email_verified` | Whether the email is verified | life of account | cascade |
| `users.image` | Not set since D-039 (older Google accounts may hold a picture URL) | life of account | anonymise |
| `users.phone_number` | Phone as given (OTP sign-in) | life of account | anonymise |
| `users.phone_e164` | Generated from `phone_number` (DB-3) | follows `phone_number` | anonymise (generated → NULL) |
| `users.phone_number_verified` | Whether the phone is verified | life of account | cascade |
| `users.ban_reason` | Admin note on a ban | life of account | anonymise |
| `users.deleted_at` | Deletion request time | until purge | cascade |
| `sessions.token` | Session token (DB-4: see README "Session tokens") | session lifetime | delete |
| `sessions.ip_address` | Client IP at sign-in | session lifetime | delete |
| `sessions.user_agent` | Browser user agent | session lifetime | delete |
| `sessions.impersonated_by` | Admin who impersonated | session lifetime | delete |
| `sessions.mfa_verified_at` | When the session passed the staff second factor (AUTH-11) | session lifetime | delete |
| `accounts.account_id` | Provider subject id (e.g. Google `sub`) | life of account | delete |
| `accounts.access_token` | OAuth access token | until refreshed/revoked | delete |
| `accounts.refresh_token` | OAuth refresh token | until revoked | delete |
| `accounts.id_token` | OIDC id token (contains email, name) | until refreshed | delete |
| `accounts.access_token_expires_at` | Token expiry | with token | delete |
| `accounts.refresh_token_expires_at` | Token expiry | with token | delete |
| `accounts.password` | Unused (no passwords); Better Auth core column | — | delete |
| `verifications.identifier` | `otp:<purpose>:<channel>:<HMAC(identifier)>` — a keyed hash of the email/phone, not the raw value (AUTH-4) | until expiry (minutes); swept daily | delete |
| `verifications.value` | OTP (hashed, DB-4 / AUTH-4) | until expiry | delete |
| `profiles.display_name` | Optional name shown on the student's own screens only (D-039: never to other students) | life of account | anonymise |
| `profiles.public_name_seed` | Seed of the auto-generated public name ("Brave Otter 417", D-039); not personal | life of account | anonymise (reset to 0) |
| `profiles.board`, `profiles.class_level` | Board and class | life of account | anonymise |
| `profiles.school_id` | The student's school (PII-adjacent for a minor). Saved only with consent `granted` (D-014, `PATCH /v1/me` `school`), shown only while granted; for the dashboard now and a school leaderboard later | life of account; cleared when consent leaves `granted` | anonymise |
| `profiles.city` | The chosen school's city (mirrored; never entered on its own) | as `school_id` | anonymise |
| `profiles.weekly_goal` | Dashboard goal (questions per week); not personal | life of account | anonymise |
| `schools.name_normalized`, `schools.city_normalized` | Dedupe/search keys of the school name and city (not personal; see `schools.name` below) | life of row | — |
| `schools.created_by_user_id` | The account that added a student-sourced school (0013), for the per-day add limit and erasure | life of account | delete (unverified + unused by others: row deleted) or detach (set NULL) in step 1 |
| `profiles.locale` | Language preference | life of account | cascade |
| `guardian_links.parent_user_id`, `guardian_links.student_user_id` | Parent–child relationship | while linked | delete |
| `consent_status.provider_ref` | Id in the owner's consent system | life of account | delete |
| `consent_status.status` | Consent state (the gate's cache) | life of account | delete |
| `consent_records.age_band`, `consent_records.status`, `consent_records.method`, `consent_records.policy_version`, `consent_records.declared_at`, `consent_records.granted_at`, `consent_records.revoked_at`, `consent_records.revoked_by` | Built-in consent (D-039): self-declared age band, consent state, how and when it was given or withdrawn, notice version | life of account | delete (the `audit_log` rows of each transition keep ids and states only) |
| `consent_records.parent_email_hash` | Keyed HMAC of the parent's normalised email (never the address) | life of account | delete |
| `consent_records.parent_email_hint` | Masked parent email, e.g. "p•••@gmail.com", shown to the student only | life of account | delete |
| `consent_records.code_hash`, `consent_records.code_expires_at`, `consent_records.code_attempts`, `consent_records.code_sent_at`, `consent_records.revoke_generation` | Keyed hash of the live approval code (48 h, 5 tries), withdraw-link generation | until used/expired (code); life of account | delete |
| `attempts.*`, `responses.answer`, `evaluations.feedback` | Test attempts, answers, marks | life of account | cascade |
| `attempts.auto_score`, `attempts.self_score`, `attempts.time_taken_sec`, `attempts.counts_for_stats`, `attempts.graded_at`, `attempts.tab_switch_count`, `responses.client_seq`, `responses.client_saved_at`, `responses.time_spent_sec` | Attempt marks split (auto/self), time taken, percentile flag, tab switches, autosave sequence and advisory client times (0007, ADR-012) | life of account | cascade |
| `test_score_buckets.*` | Per-test score distribution: counts per half-mark bucket, no user link | life of test | retain (aggregate, not personal) |
| KV `lb:live:<event>` sorted sets | Live-mock provisional ranks: user id → auto score (no names) | until the event's results are published + 30 days (key TTL) | delete (`DELETE /v1/me` removes the member) |
| `live_registrations.*` | Live-mock registration, rank, score | life of account | cascade |
| `xp_events.*`, `streaks.*`, `user_badges.*`, `league_memberships.*` | Progress and gamification (memberships: league, tier, week XP, final rank, outcome; 0010) | life of account | cascade |
| `leagues.*` | Weekly league divisions: week, cohort (e.g. `cbse-10`), tier, division number; no user link | life of the platform | retain (not personal) |
| `content_reports` with `content_type = ai_answer` | Report of an AI answer: `content_id` = the `ai_messages` id, `item_ref` = `conv:<conversation id>` (no message text is copied) | 1 year | detach |
| `lesson_progress.*` | Lesson position per chapter/deck part, read/listen mode, first completion time | life of account | cascade |
| `practice_answers.*`, `practice_answers.response` | Practice answers: the response (may include the student's own written text), outcome, marks, time | life of account | cascade |
| `user_mfa.totp_secret_enc` | Staff TOTP secret, AES-256-GCM encrypted (key in Key Vault, not in the database) | while enrolled | delete |
| `user_mfa.recovery_code_hashes`, `user_mfa.last_used_step`, `user_mfa.confirmed_at` | HMACs of unused staff recovery codes; last accepted TOTP step | while enrolled | delete |
| `leaderboard_snapshots.entries` | Auto-generated public names (D-039), XP, rank (opaque handles) | 1 year | retain (no ids; no real names) |
| `credit_ledger.*` | AI credit grants and spend | life of account | cascade |
| `ai_requests.*` | AI usage metering (no prompt text) | 30 days per user, then aggregates only | cascade |
| `ai_conversations.title` | Conversation title (may quote the student) | 30 days | delete |
| `ai_messages.content` | Prompts and answers | 30 days (ARCHITECTURE §10) | delete |
| `uploads.blob_key` | Uploaded photo/paper (the file is in Blob) | 30 days (`expires_at`) | delete (blob in `uploads-quarantine`, then row; S6-M02) |
| `uploads.processed_key` | Cleaned derivative of the upload (re-encoded, EXIF/GPS stripped) in the `uploads` container | 30 days (`expires_at`; Blob lifecycle rule as backstop) | delete (blob in `uploads`, then row; S6-M02) |
| `credit_wallets.*` | Per-student lock row for credit operations: plan of the last daily grant, its IST day | life of account | cascade |
| `ai_jobs.*` | Queued AI work (ids of the attempt/upload/items, status, result: AI marks and feedback, or a paper blueprint without school questions) | 30 days (worker job ai.retention) | cascade |
| `ai_spend_daily.*` | Total AI spend per IST day (all students / free tier), no user link | 1 year | retain (aggregate, not personal) |
| `tests.created_by_user_id` | Custom test owner | life of account | cascade |
| `content_reports.message` | Free-text report (may contain anything) | 1 year | detach |
| `content_reports.user_id`, `content_reports.resolved_by_user_id` | Reporter / resolver | 1 year | detach |
| `content_status_events.actor_user_id` | Reviewer who changed content status | life of content | detach |
| `audit_log.actor_user_id`, `audit_log.target_id`, `audit_log.before`, `audit_log.after` | Admin actions (ids only, DB-8) | 2 years | detach |
| `feature_flags.updated_by_user_id`, `config_values.updated_by_user_id` | Admin who changed a value | life of row | detach |
| `subscriptions.user_id`, `orders.user_id`, `payments.user_id` | Purchaser link | 8 years (tax records; pending OA-14) | detach |
| `subscriptions.razorpay_subscription_id`, `orders.razorpay_order_id`, `orders.receipt`, `payments.razorpay_payment_id`, `payments.method` | Payment references | 8 years | retain |
| `entitlements.*` | Plan entitlement | life of account | cascade |
| `webhook_events.payload` | Razorpay event, includes payer contact (email/phone) | 8 years with payment records (pending OA-14) | retain |
| `coin_ledger.*` | SOYL Coins earned/redeemed/refunded (amounts, sources, ids such as test or chapter keys; no names) | life of account | cascade |
| `coin_wallets.*` | Coins lock row: check-in streak, last check-in day, equipped frame/theme | life of account | cascade |
| `coin_redemptions.user_id`, `coin_redemptions.item_key`, `coin_redemptions.status` | Store redemption and its state (kept detached for stock counts) | life of account, then detached | detach |
| `coin_redemptions.address_enc` | Merch shipping address (recipient name, address, PIN, courier phone), AES-256-GCM encrypted (HKDF subkey of the Key Vault MFA key; never in the database) | until shipped + 30 days (`COIN_STORE.addressRetentionDaysAfterFulfilment`, the coins housekeeping worker job); erased at once on cancel/reject | delete |
| `coin_redemptions.address_submitted_at`, `coin_redemptions.address_erased_at` | When the address was given / erased | life of row | detach |
| `coin_redemptions.tracking_ref` | Courier tracking reference (links to the delivery address at the courier) | life of account | delete |
| `coin_redemptions.reviewed_by` | Staff member who approved/shipped/rejected | life of row | detach |

## Not personal data

Columns that match the name pattern but hold no personal data:
`boards.name`, `classes.name`, `subjects.name`, `schools.name`, `badges.name`, `plans.name`
(catalog/reference names; a student-added school name is screened for contact details and kept off other
students' search until two accounts picked it, and deleted with its creator's account while unverified
and unused), `analytics_events.name` (event name such as `lesson_completed`), `pipeline_items.input_tokens`, `pipeline_items.cached_input_tokens`,
`pipeline_items.output_tokens`, `content_budget_ledger.input_tokens`, `content_budget_ledger.cached_input_tokens`,
`content_budget_ledger.output_tokens`, `ai_requests.input_tokens`, `ai_requests.cached_input_tokens`,
`ai_requests.output_tokens`, `ai_requests.reasoning_tokens`, `content_chunks.tokens` (model token counts).

`analytics_events` deliberately has no user, device or IP column (D-014).
