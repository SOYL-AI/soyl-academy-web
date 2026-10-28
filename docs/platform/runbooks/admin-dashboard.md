# Admin dashboard (`/admin`) for the owner

What it is: a private dashboard at **https://www.soylai.com/admin** that shows how the platform is doing: new sign-ups, active students, retention, AI use and cost, revenue (once payments are on), product interest and content health. Only accounts marked **superadmin** can open it, and only after the two-step code from an authenticator app.

## Get access (once)

1. Make sure Google sign-in is switched on for staff (see "Blocked until" below).
2. Sign up on www.soylai.com with your work email. If you signed up with an email code, open your profile and **link Google** while you are still a normal account.
3. Ask the Lead to run the superadmin step for your email (it is in the handoff `docs/platform/handoffs/2026-10-28-backend-api-admin-analytics.md`). Running it signs you out everywhere.
4. Sign in again with **Continue with Google**, open `/admin`, choose **Set up authenticator**, scan the QR code with Google Authenticator or Microsoft Authenticator, and type the 6-digit code.
5. **Save the 10 recovery codes** in a password manager. They are shown once.

Next time: sign in with Google, open `/admin`, type the current code from the app.

**Blocked until:** production allows only email sign-in today, and staff accounts must use Google with your company domain (AUTH-11). The Lead needs the Google OAuth client (OA-05) and your company domain for `ADMIN_GOOGLE_DOMAINS` before step 4 works.

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

- "Two-step verification is required": type the current code from the authenticator app.
- Lost the phone and the recovery codes: ask the Lead for an MFA reset (a database operation, audit-logged).
- "You do not have access": your account is not a superadmin; ask the Lead to run the step again.
- Numbers look low: the dashboard counts only students (not staff) and only learning activity; page-interest counts need cookie-bar consent.
