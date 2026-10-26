/**
 * k6 version of the test-engine scenario (ARCHITECTURE §16), for the staging-sized load
 * environment (see ../README.md). Same flow as ../src/attempts.mjs:
 *
 *   sign in (email OTP via the load environment's OTP outbox; tagged setup, not in the thresholds)
 *   → start the test → autosave 1–3 changed answers every AUTOSAVE_S seconds for MINUTES → submit.
 *
 *   k6 run -e BASE=https://api-load.internal -e EDGE_SECRET=… -e VUS=5000 -e MINUTES=20 \
 *          -e TEST=t_cbse10sci_live_1 platform/load/k6/attempts.js
 *
 * Thresholds encode the budgets: p95 < 500 ms for autosave and submit, < 0.5 % failed requests.
 * k6 is not installed on the build machine; these scripts were written, not run here.
 */
import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import { Counter } from 'k6/metrics';

const BASE = __ENV.BASE || 'http://127.0.0.1:8787';
const EDGE = __ENV.EDGE_SECRET || 'local-dev-edge-secret-not-for-deployment-000000'; // gitleaks:allow (public dev placeholder)
const ORIGIN = __ENV.ORIGIN || 'http://localhost:3000';
const VUS = Number(__ENV.VUS || 1000);
const MINUTES = Number(__ENV.MINUTES || 3);
const RAMP_S = Number(__ENV.RAMP_S || 120);
const AUTOSAVE_S = Number(__ENV.AUTOSAVE_S || 10);
const TEST = __ENV.TEST || 't_cbse10math_ch01_short';
const RUN = __ENV.RUN_ID || `${Date.now()}`;

const closedEarly = new Counter('attempts_closed_early');

export const options = {
  scenarios: {
    students: {
      executor: 'per-vu-iterations',
      vus: VUS,
      iterations: 1,
      maxDuration: `${Math.ceil(MINUTES + RAMP_S / 60 + 10)}m`,
    },
  },
  thresholds: {
    'http_req_duration{name:autosave}': ['p(95)<500'],
    'http_req_duration{name:submit}': ['p(95)<500'],
    'http_req_duration{name:start}': ['p(95)<800'],
    'http_req_failed{phase:scenario}': ['rate<0.005'],
  },
  discardResponseBodies: false,
};

function headers(vu) {
  // The load environment trusts x-soyl-client-ip after edge auth, as the web proxy would set it (API-3).
  return {
    'content-type': 'application/json',
    'x-soyl-edge-auth': EDGE,
    'x-soyl-client-ip': `10.${(vu >> 16) & 255}.${(vu >> 8) & 255}.${(vu & 255) || 1}`,
    origin: ORIGIN,
  };
}

const pick = (xs) => xs[Math.floor(Math.random() * xs.length)];

function answerFor(q) {
  switch (q.type) {
    case 'mcq':
    case 'assertion-reason':
    case 'true-false':
    case 'multi-select':
      return q.options.length ? { option_ids: [pick(q.options).id] } : null;
    case 'numerical':
      return { value: Math.floor(Math.random() * 200) / 2 };
    case 'fill-blank':
      return { blanks: ['answer'] };
    case 'match':
      return q.options.length && q.match_right.length ? { pairs: q.options.map((o, i) => ({ left_id: o.id, right_id: q.match_right[i % q.match_right.length].id })) } : null;
    case 'ordering':
      return { order: q.options.map((o) => o.id).sort(() => Math.random() - 0.5) };
    case 'code-output':
      return { output: '42' };
    case 'case-based':
    case 'source-based': {
      const parts = (q.children || []).map((c) => ({ id: c.id, response: answerFor(c) })).filter((p) => p.response);
      return parts.length ? { parts } : null;
    }
    default:
      return { text: 'A load-test answer with a few words.' };
  }
}

export default function () {
  const vu = exec.vu.idInTest;
  const h = headers(vu);
  const email = `load.${RUN}.${vu}@example.com`;
  const jar = http.cookieJar();

  // Setup (not part of the thresholds).
  const setup = { tags: { phase: 'setup' }, headers: h };
  http.post(`${BASE}/v1/auth/email/send-otp`, JSON.stringify({ email }), { ...setup, tags: { phase: 'setup', name: 'send-otp' } });
  const outbox = http.get(`${BASE}/v1/dev/otp-outbox?to=${encodeURIComponent(email)}`, { ...setup, tags: { phase: 'setup', name: 'outbox' } });
  const code = outbox.status === 200 ? outbox.json('code') : null;
  if (!code) return;
  const verify = http.post(`${BASE}/v1/auth/email/verify`, JSON.stringify({ email, code }), { ...setup, tags: { phase: 'setup', name: 'verify' } });
  if (verify.status !== 200) return;
  void jar;

  // Stagger starts over the ramp, like students arriving at 10:00.
  sleep(Math.random() * RAMP_S);
  const params = (name) => ({ headers: h, tags: { phase: 'scenario', name } });
  // Body-less POSTs send no content type (as the web client does).
  const bare = Object.assign({}, h);
  delete bare['content-type'];
  const started = http.post(`${BASE}/v1/tests/${TEST}/attempts`, null, { ...params('start'), headers: bare });
  if (!check(started, { 'started': (r) => r.status === 200 || r.status === 201 })) return;
  const state = started.json();
  const items = state.items.map((it) => ({ id: it.itemId, q: it.question, seq: 0, time: 0 })).filter((it) => answerFor(it.q));
  const end = Date.now() + MINUTES * 60_000;
  while (Date.now() < end) {
    sleep(AUTOSAVE_S * (0.9 + Math.random() * 0.2));
    const changed = [...new Set([pick(items), pick(items), pick(items)].slice(0, 1 + Math.floor(Math.random() * 3)))];
    const body = {
      items: changed.map((it) => {
        it.seq += 1;
        it.time += AUTOSAVE_S;
        return { itemId: it.id, seq: it.seq, response: answerFor(it.q), timeSpentSec: it.time, changedAt: new Date().toISOString() };
      }),
    };
    const r = http.put(`${BASE}/v1/attempts/${state.attempt.id}/responses`, JSON.stringify(body), params('autosave'));
    check(r, { 'autosave ok': (x) => x.status === 200 });
    if (r.status === 409) {
      closedEarly.add(1);
      break;
    }
  }
  const sub = http.post(`${BASE}/v1/attempts/${state.attempt.id}/submit`, null, { ...params('submit'), headers: bare });
  check(sub, { 'submitted': (r) => r.status === 200 });
}
