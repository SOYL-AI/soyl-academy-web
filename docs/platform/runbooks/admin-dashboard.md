# Admin dashboard (`/admin`) for the owner

What it is: a private dashboard at **https://www.soylai.com/admin** that shows how the platform is doing: new sign-ups, active students, retention, AI use and cost, revenue (once payments are on), product interest and content health. Only accounts marked **superadmin** can open it.

**How staff sign in (owner decision 2026-10-29, [ADR-026](../adr/026-staff-email-sign-in.md)):** with the **email one-time code only**. No Google account and no authenticator app are needed. Anyone who can read the staff email inbox can open this dashboard, which shows children's data, so keep that inbox protected (a strong password and two-step sign-in on the mailbox itself, no shared or forwarded copies).

## Get access (once)

1. Sign up on www.soylai.com with your work email: **Log in → Email → Send code**, then type the 6-digit code from the email. (You can skip this: step 2 creates the account if it does not exist.)
2. Ask the Lead to run the superadmin step for your email (below). Running it signs you out everywhere.
3. Open **https://www.soylai.com/admin**, choose **Log in**, and sign in again with the email code. The dashboard opens straight away.

Next time: open `/admin` and sign in with the email code. A staff sign-in lasts at most 12 hours and ends after 60 minutes without activity.

### The superadmin step (the Lead runs it)

It is the `db admin bootstrap` CLI (`platform/db/src/seed/admin.ts`): idempotent, audit-logged (`admin.bootstrap`), and it works whether the account exists or not. In production it runs as the migrate Container Apps job with argument overrides. The owner's email goes only into this command, never into config or seeds:

```bash
export RG=rg-soyl-platform-prod MIGRATE_JOB=caj-soyl-migrate-prod OWNER_EMAIL='<the owner email>'
# The job must already run the migrate image of the integrated commit (pass A of update-dark-backend.md sets it).
# `az containerapp job start --args ... "--email" ...` does not work: the Azure CLI reads --email and --role as its
# own options ("unrecognized arguments"). Start the execution through the REST API instead, with the job's own
# container (image, env, identity, resources) and only the arguments replaced:
az containerapp job show -g $RG -n $MIGRATE_JOB -o json > job.json
node -e '
const fs = require("fs"); const j = require("./job.json"); const c = { ...j.properties.template.containers[0] };
c.args = ["/app/migrate-entrypoint.mjs", "admin", "bootstrap", "--email", process.env.OWNER_EMAIL, "--role", "superadmin"];
fs.writeFileSync("start.json", JSON.stringify({ containers: [c] }));'
EXEC=$(az rest --method post --url "https://management.azure.com$(node -p 'require("./job.json").id')/start?api-version=2024-03-01" \
  --body @start.json --query name -o tsv)
until s=$(az containerapp job execution show -g $RG -n $MIGRATE_JOB --job-execution-name $EXEC --query properties.status -o tsv); \
      [ "$s" = Succeeded ] || [ "$s" = Failed ]; do echo "$s"; sleep 10; done; echo "bootstrap: $s"
rm job.json start.json
```

Done this way in production on 2026-10-29 (`created superadmin …`). Expected log line (Log Analytics `ContainerAppConsoleLogs`, job `caj-soyl-migrate-prod`): `updated superadmin <email> (<uuid>); 1 session(s) revoked`, or `created superadmin <email> (<uuid>)` when there was no account, or `unchanged (already) superadmin …` on a re-run.

Locally: `cd platform && npm run db -w @soyl/db -- admin bootstrap --email you@example.com --role superadmin` against the dev database, then sign in at `/admin` with the email code (the local API keeps codes in its dev outbox).

Prerequisites in production:

- The API image must include ADR-026 (staff email sign-in). An older image refuses staff email sign-in with "Staff accounts sign in with Google."
- `AUTH_METHODS` includes `email` and email goes through Azure Communication Services (`EMAIL_PROVIDER=acs`), as today. Google (OA-05) and `ADMIN_GOOGLE_DOMAINS` are not needed.

To undo: the same command with `"--role" "admin"` (keeps staff, removes the dashboard), or set the role back to student with a database operation.

## Using it

- **Date range:** 7, 30 or 90 days, or Custom (up to 180 days). Days are Indian time. Tiles compare with the period just before.
- **Overview:** sign-ups, total students, active students, lessons, practice, tests, AI requests, AI spend, revenue.
- **Growth:** sign-ups by method and by week, consent status, board and class, schools added, guest progress merged.
- **Engagement:** daily/weekly/monthly active students, stickiness, lessons and practice, tests, top chapters and subjects, streaks.
- **Retention:** for each sign-up week, the share of students who came back 1, 7 and 30 days later.
- **AI and credits:** actions per day, credits given/spent/refunded (including learning bonuses), spend against the daily cap and when the safety brake acted, paywall views, moderation blocks.
- **Revenue:** plans page views, checkouts, subscriptions and MRR, revenue, refunds, Board Exam Pass, SOYL Coins. All zero while payments are off.
- **Interest:** what people look at (plans, store items, Ask AI, notes, flashcards). Page counts come only from visitors who accepted analytics in the cookie bar; nothing identifies a student.
- **Content:** published chapters per subject, open "report a mistake" items by age.
- **Users:** recent sign-ups with masked emails. **Reveal email** and **Summary** are recorded in the audit log with your account and the time. Use them for support only.
- **Reports:** the "report a mistake" queue.
- Every chart has **Show as table**, and every table has **Download CSV**.

## If something goes wrong

- "Staff accounts cannot sign in this way": staff sign in with the email code, not a phone code or Google.
- "Staff accounts sign in with Google": production runs an API older than ADR-026; ask the Lead to deploy the current API image.
- "You do not have access": your account is not a superadmin; ask the Lead to run the step again.
- Signed out after an hour: staff sessions end after 60 minutes without activity and after 12 hours in any case. Sign in again with the email code.
- Numbers look low: the dashboard counts only students (not staff) and only learning activity; page-interest counts need cookie-bar consent.
- Someone else may have read the staff inbox: ask the Lead to remove the superadmin capability at once (the same command with `"--role" "admin"`), change the mailbox password, then run the step again.

## Switching two-step verification or Google back on

A config change in `platform/shared/config/security.ts` (`STAFF_AUTH`) and an API deploy; no data migration (ADR-026):

- `secondFactor: 'totp'`: after the email code, `/admin` asks to **Set up authenticator** (scan the QR code with Google Authenticator or Microsoft Authenticator, type the 6-digit code) and shows **10 recovery codes once**; save them in a password manager. Next time it asks for the current code from the app. "Two-step verification is required" means: type the current code. Lost the phone and the recovery codes: ask the Lead for an MFA reset (a database operation, audit-logged).
- `signInMethods: ['google']`: staff sign in with **Continue with Google** from a domain in `ADMIN_GOOGLE_DOMAINS` (needs OA-05). Link Google to the account while it is still a normal account, before the superadmin step (AUTH-7 never attaches Google by email).
