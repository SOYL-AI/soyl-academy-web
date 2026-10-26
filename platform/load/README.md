# Load tests (`@soyl/load`)

Budgets (ARCHITECTURE §16): API p95 < 500 ms for autosave and submit under load; an All-India live
mock must carry **5,000 concurrent test-takers** with autosave traffic at an error rate < 0.5 %.

Two drivers run the same scenario:

| Driver | Where | Use |
|---|---|---|
| `src/attempts.mjs` (Node + undici) | anywhere Node 24 runs, incl. the build machine | local runs (M3 exit), quick regressions |
| `k6/attempts.js` | a load machine with [k6](https://k6.io) | staging-sized runs, thresholds in CI |

**Scenario per virtual student:** sign in (email OTP through the OTP outbox; setup, not measured) →
start the test (`POST /v1/tests/:id/attempts`, starts staggered over the ramp) → every 10 s (±10 %)
autosave 1–3 changed answers (`PUT /v1/attempts/:id/responses`, per-item sequence numbers and client
change times, as the web player does) → after N minutes submit (`POST /v1/attempts/:id/submit`) →
optionally read the result. Each student has its own client IP (`x-soyl-client-ip`), as the web
proxy sends it, so per-IP limits behave as in production.

## Local run (what M3 recorded)

```
cd platform
npm run dev -w @soyl/api                      # embedded Postgres, memory KV, OTP outbox; :8787 (PORT=… to change)
npm run attempts -w @soyl/load -- --base http://127.0.0.1:8787 --users 1000 --minutes 3 --ramp 60 --result
```

Options: `--users`, `--minutes` (answering time per student), `--interval` (autosave seconds, default
10), `--ramp` (seconds over which students start), `--test` (default `t_cbse10math_ch01_short`),
`--result` (also fetch the result), `--connections` (HTTP connections, default 256), `--label`.
Results go to `load/results/<time>-<users>vu.json` (latency percentiles, status counts, error kinds, machine).

**Caveat:** locally the harness, the API (one Node process), embedded PostgreSQL and the in-memory KV
share one laptop. The numbers show the code's cost per request and that nothing breaks at 1,000
students; they are not a capacity figure for Azure. See the M3 handoff for the recorded run.

## 5,000-user live-mock run (staging, later)

Run it against a **dedicated load environment** with production SKUs (Container Apps API replicas,
Azure Database for PostgreSQL Flexible Server, Azure Managed Redis), never against production:

1. Deploy the API there with `APP_ENV=test`, mock SMS/email/consent, `DEV_OTP_OUTBOX=true` (the
   config only allows the outbox in local/test), `DATABASE_POOL_MAX` sized to replicas × pool ≤ the
   server's connection limit (e.g. 4 replicas × 25), `REDIS_URL` set (ranks and limits in Redis).
   Run the worker too (auto-submit and final ranks).
2. Seed and publish content (`npm run db -- migrate up`, `seed catalog`, `npm run content -- publish`),
   then schedule a live sitting that opens in a few minutes:
   `npm run live -w @soyl/api -- schedule --subject cbse-10-science --dev-in 10 --allow-practice-pool --fallback unit-test`
   (the practice-pool and repeat flags are refused when `APP_ENV=prod`).
3. From a load machine in Central India (or two, splitting `VUS`), once the event is `live`:
   ```
   k6 run -e BASE=https://<load-api-fqdn> -e EDGE_SECRET=<load edge secret> -e VUS=5000 -e RAMP_S=120 \
          -e MINUTES=20 -e TEST=t_cbse10sci_live_dev platform/load/k6/attempts.js
   ```
   or the Node driver with `--users 5000 --ramp 120 --minutes 20 --test t_cbse10sci_live_dev`.
   5,000 students saving every 10 s is ~500 autosaves/s plus the start burst; submits cluster at the deadline.
4. Pass criteria: k6 thresholds green (autosave/submit p95 < 500 ms, failed < 0.5 %), no 5xx, Postgres
   CPU < 70 % and no connection saturation, Redis latency flat, worker `live.finalize` publishes ranks
   within 10 minutes of the window. Record the run in the handoff.

Calling the API directly with the edge secret skips Vercel. That is deliberate: the proxy adds its own
latency and a single load machine would look like one IP to the per-IP limits. Test the proxy hop
separately with a smaller run through the web origin.
