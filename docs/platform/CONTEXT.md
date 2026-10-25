# SOYL Academy Learning Platform — Product Context

> Location in repo: `docs/platform/CONTEXT.md`
> Read this before any task. It defines **what** we are building, for **whom**, and the **business rules**.
> Technical design → `docs/platform/ARCHITECTURE.md`. How agents work together → `AGENTS.md`. Operating rules → `CLAUDE.md`.
>
> Last updated: 25 Oct 2026 · Owner: Founder (product owner) · Stage: building toward public **beta**

---

## 1. Mission

Democratize access to quality school education in India. Every student in **Classes 7–12** on the **CBSE** and **CISCE (ICSE/ISC)** boards gets the complete syllabus, practice and tests **free**. Only AI features cost money, and even those come with a free daily allowance.

## 2. What we are building

A learning platform built **inside the existing SOYL Academy marketing website repository**, served from the same domain, with its backend on **Microsoft Azure**. The marketing website must keep working exactly as it does today.

The product has five pillars:

1. **Visual lessons** — every chapter as a slide-style deck: one idea per slide, clean diagrams, worked examples, read-along text and optional narration audio. This is our wedge: YouTube-lecture platforms (e.g. Physics Wallah) serve students who learn by listening to long videos; we serve students who prefer to **read, see and listen** in short, visual steps.
2. **Notes, flashcards and practice** — chapter notes, quick-revision flashcards, and a large practice bank in every board question format.
3. **Tests and test series** — chapter tests, unit tests, full-length mock papers in exact board pattern, scheduled All-India mocks with ranks. **Free.**
4. **AI features (credits)** — AI tutor, photo doubts, AI evaluation of written answers, "papers like my school's" from an uploaded sample paper, "explain this slide". Free daily credits; more with a subscription.
5. **Gamification** — XP, streaks, levels, badges, leagues, shareable rank cards.

## 3. Users

| User | Who | Notes |
|---|---|---|
| Student (primary) | Classes 7–12, CBSE / ICSE / ISC | Mostly mid/low-end Android phones on patchy mobile data. Mostly English-medium; comfortable with Hinglish. Preparing for unit tests, term exams and board exams. |
| Guest | Anyone not logged in | Can learn freely; prompted to log in for tests, progress and AI. |
| Parent | Linked to a student | Pays for subscriptions. Parental consent is **already handled by the owner's existing system** — integrate with it, do not rebuild it. |
| Reviewer / Admin (internal) | SOYL Academy team | Reviews content in parallel after launch, fixes reported errors, manages config. |

## 4. Scope for beta launch

**Boards**
- **CBSE** — Classes 7–12.
- **CISCE** — ICSE curriculum for Classes 7–10, ISC for Classes 11–12.

**Classes:** 7, 8, 9, 10, 11, 12.

**Subjects:** **every subject** in each board's official 2026–27 scheme of studies for each class — core subjects, electives and **language subjects including Hindi** (and other languages the board offers). For practical or performing subjects (music, art, physical education practicals, lab work) we cover the theory component only.
The `curriculum-architect` agent produces the definitive subject list in `platform/catalog/subjects.yaml` from official board documents. Nothing is excluded; the waves below set **order**, not scope.

**Academic year:** 2026–27 syllabus. All catalog data is versioned by academic year so 2027–28 can be added without breaking anything.

**Language:** English for all subjects except language subjects, which are taught in their own language (Hindi in Devanagari). Hindi-medium versions of other subjects are **out of scope** for beta.

### Build waves (all three must be live at beta)

| Wave | Classes | Why first | Required at beta |
|---|---|---|---|
| 1 — Exam season | **10 and 12**, all subjects, all boards | Board exams start in February | Lessons, notes, flashcards, practice for every chapter **+ full test series** |
| 2 | 9 and 11 | Next-year board prep | Lessons, notes, flashcards, practice, chapter + unit tests, ≥2 term papers per subject |
| 3 | 7 and 8 | Foundation | Same as Wave 2 |

Within each wave: core subjects and Hindi first, then electives.

**Beta launch target:** 15 January 2027 (board theory exams typically begin mid-February). Owner to confirm.

**Quality posture for beta:** speed over perfection. Content ships labelled **"Beta"** after passing automated checks; human review happens **in parallel after launch**. Every content page has a **"Report a mistake"** button, and reported errors on Wave 1 content are fixed within 24 hours.

## 5. Access model

| Capability | Guest | Logged in (free) | Subscriber |
|---|---|---|---|
| Browse catalog; read lessons, notes, flashcards; listen to narration | ✅ | ✅ | ✅ |
| Practice questions with instant check (objective types) | ✅ (progress kept on device only) | ✅ saved | ✅ |
| Chapter tests, unit tests, test series, mock papers, All-India mocks | 🔒 prompt login | ✅ **free** | ✅ |
| Custom test builder (pick chapters → paper from question bank) | 🔒 prompt login | ✅ **free** | ✅ |
| Results, analytics, XP, streaks, leaderboards, rank cards | — | ✅ | ✅ |
| Self-evaluation of written answers using the official-style marking scheme | — | ✅ **free** | ✅ |
| AI features (tutor, photo doubts, AI evaluation, paper-from-upload, explain-this-slide) | 🔒 prompt login | ✅ 25 credits/day | ✅ plan credits |

**Rules**
- Learning content and tests are **never paywalled** during beta. Only AI consumes credits. No other payments for at least the first 2–3 months.
- Login prompts are a friendly modal that explains the benefit; after login the student returns exactly where they were. Guest progress (stored on device) **merges** into the new account.

## 6. AI credits

Credits are how students see AI usage. Internally, **1 credit = ₹0.10 of AI budget**.

| Plan | Credits per day | ≈ AI budget per day |
|---|---|---|
| Free (logged in) | 25 | ₹2.50 |
| Plus | 40 | ₹4.00 |
| Pro / Board Exam Pass | 60 | ₹6.00 |

- Credits reset at **00:00 IST**. No rollover.
- The cost of an action is shown **before** the student confirms it. The balance is always visible in the header.
- Credits are **reserved** when an action starts, **charged** when it succeeds, and **refunded** if it fails.
- When credits run out: show the remaining-time-to-reset and the plans (paywall). Never block non-AI features.

### Credit price per action (initial values — all in config)

| Action | Model tier | Est. real cost | Credits |
|---|---|---|---|
| Quick doubt (text) | small (GPT-6 Luna) | ₹0.03 | 1 |
| Explain this slide / simplify | small | ₹0.03 | 1 |
| Hard doubt, step by step | mid (GPT-6.1 Sol) | ₹0.53 | 6 |
| Photo doubt (image of a question) | mid + vision | ₹0.89 | 10 |
| AI evaluation of one written answer | mid | ₹0.56 | 6 |
| AI evaluation of a full paper | mid | per answer, capped | max 40 |
| "Papers like my school's" (from uploaded sample paper) | mid | ₹6.10 | 60 (paid plans only in practice) |

**Guardrail:** the system meters the real INR cost of every AI request. If any action's 7-day average real cost exceeds 80% of its credit price, alert the owner.

## 7. Plans and pricing (AI only)

All prices INR, GST-inclusive, stored in `platform/shared/config/plans.ts`. **Owner to confirm final prices** — change config only, never code.

| Plan | Monthly | Yearly | Includes |
|---|---|---|---|
| Free | ₹0 | — | 25 credits/day |
| Plus | ₹199 | ₹1,499 | 40 credits/day, paper-from-upload |
| Pro | ₹299 | ₹2,499 | 60 credits/day, everything in Plus, priority AI evaluation, parent weekly report |
| Board Exam Pass | ₹499 one-time | — | Pro benefits until 31 March 2027 |

- **Payments: Razorpay only** (Subscriptions for monthly/yearly with UPI AutoPay and cards; one-time Orders for Board Exam Pass).
- A feature flag `BILLING_ENABLED` controls whether purchase buttons are live.

## 8. Content standards (apply to every piece of content)

**Originality (non-negotiable)**
- Write original explanations, examples and questions. **Never reproduce text from NCERT, CISCE-prescribed or any publisher's textbooks**, or from past papers.
- **Literature chapters** (English, Hindi and other languages): write summaries, themes, character sketches, literary devices, word meanings and questions. **Do not reproduce poems, stories or play text**; tell the student to read the text in their own textbook.
- Use official board documents (curriculum, sample papers, marking schemes) only to learn **scope and pattern**, never to copy questions.

**Accuracy and alignment**
- Aligned to the 2026–27 syllabus; topics removed from the syllabus are excluded.
- Question types, marks, word limits and internal choice match the board pattern.
- Every question has: correct answer, step-by-step solution, marking scheme with step marks, topic tags, difficulty (1–5), competency type, marks, expected time.

**Visual lesson rules**
- 12–25 slides per chapter deck (split long chapters into parts). One idea per slide.
- A diagram or visual at least every 3 slides where the subject allows.
- Every deck includes: learning goals, concept slides, at least 2 worked examples (where applicable), 3–5 check-your-understanding questions, a summary slide, and an **exam tips** slide (common mistakes, how marks are awarded).
- Every slide has **narration text** (≤ 90 words, plain spoken language). Narration audio is generated by text-to-speech: Indian English voice; Hindi voice for Hindi content.
- **Diagrams are drawn as code** (SVG or a renderable spec), never AI-generated raster images when labels or numbers matter.
- Maths in LaTeX (rendered with KaTeX). Chemistry formulas and equations correctly formatted. SI units.
- Reading level fits the class: simple sentences for Class 7; precise terminology for Class 12. Use Indian contexts in examples.

## 9. Exam patterns to encode (verify every detail against official sources)

**CBSE (2026–27)**
- Class 10: **two board exams** a year — main exam in February, optional second exam in May.
- Board papers are about **50% competency-based** (case-based, source-based, integrated), **20% MCQ**, **30% constructed response**; most subjects are 80 marks theory + 20 internal assessment.
- Source of truth: CBSE sample question papers and marking schemes for 2026–27 (cbseacademic.nic.in).

**CISCE**
- ICSE (Class 10) and ISC (Class 12) patterns differ by subject. Source of truth: CISCE specimen question papers for 2027 (cisce.org).

**School exams (Classes 7, 8, 9, 11)**
- Unit tests, half-yearly/term and annual papers. Use a generic blueprint per board and subject, stored as editable config.

If official documents cannot be fetched (no network), the agent asks the owner to place the PDFs in `platform/catalog/sources/`.

## 10. Test series

| Classes | What every subject gets |
|---|---|
| **10 and 12** (CBSE, ICSE, ISC) | Chapter tests for every chapter (short + long); 3 unit / half-syllabus tests; **≥ 6 full-length mock papers** in board pattern; **2 scheduled All-India Mocks** before the boards with live rank and percentile. CBSE Class 10 also gets a **second-exam (May) track**. |
| 7, 8, 9, 11 | Chapter tests for every chapter; unit tests; ≥ 2 term-style papers. |
| All | Custom test builder (free, from the question bank). Paper-from-upload (AI, credits). |

Objective questions are auto-graded. Written answers can be **self-evaluated** with the marking scheme (free) or **AI-evaluated** (credits).

## 11. Gamification

- XP for lessons completed, practice, tests; daily streaks; levels; badges.
- Weekly leagues by class, school (opt-in) and city.
- Shareable test-series rank cards (first name + rank only, opt-in).
- Leaderboards show first name + last initial only.

## 12. Privacy and child safety

Parental consent is already solved by the owner; the platform must **integrate** with the existing consent system. Beyond consent:
- No third-party advertising or tracking pixels on platform pages. First-party analytics only.
- No open chat between students.
- AI moderation on every prompt and response; age-appropriate tone; refuse harmful or off-topic requests.
- All data stored in Azure **Central India**.

## 13. Beta success metrics (first 60 days)

- Weekly active students; lessons completed per active student; tests submitted.
- Day-7 and day-30 retention.
- Guest → logged-in conversion rate.
- AI credit exhaustion rate; free → paid conversion.
- Content error reports per 1,000 views; median time to fix.
- AI cost per active student per day (target ≤ ₹1.5 average).

## 14. Out of scope for beta

Career advisor (later phase) · video lectures · teacher/school dashboards · Hindi-medium versions of non-language subjects · native mobile apps · full offline mode.

## 15. Glossary

| Term | Meaning |
|---|---|
| Board | CBSE or CISCE (ICSE for ≤ Class 10, ISC for 11–12) |
| Unit (content) | One board × class × subject × chapter |
| Blueprint | Machine-readable paper pattern: sections, marks, question types, internal choice |
| Credit | 1 credit = ₹0.10 of AI budget |
| Wave | Build order group of classes (see §4) |
| Beta | Public launch with automated-check content, human review in parallel |
