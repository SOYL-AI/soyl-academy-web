#!/usr/bin/env node
/**
 * Test-engine load harness (ARCHITECTURE §16: p95 < 500 ms for autosave/submit; 5,000 concurrent
 * live-mock users). Runs here, against a local API (`npm run dev -w @soyl/api`), with undici.
 *
 *   npm run attempts -w @soyl/load -- --base http://127.0.0.1:8791 --users 1000 --minutes 3
 *
 * Scenario per virtual user (VU), after a setup phase that signs every VU in through email OTP and
 * the local dev OTP outbox (not measured):
 *   1. start the test (POST /v1/tests/:id/attempts), staggered over --ramp seconds;
 *   2. every --interval seconds (±10 % jitter) autosave 1–3 changed answers
 *      (PUT /v1/attempts/:id/responses, per-item sequence numbers, client change times);
 *   3. after --minutes, submit (POST /v1/attempts/:id/submit) and, with --result, read the result.
 * Each VU has its own client IP (x-soyl-client-ip, as the web proxy sends it), like real students.
 *
 * Output: latency percentiles and error counts per request type, the overall error rate, and the
 * machine it ran on; also written to load/results/<timestamp>-<users>vu.json.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { Pool } from 'undici';

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : fallback;
};
const has = (name) => argv.includes(`--${name}`);

const cfg = {
  base: opt('base', process.env.LOAD_BASE ?? 'http://127.0.0.1:8787'),
  users: Number(opt('users', 100)),
  test: opt('test', 't_cbse10math_ch01_short'),
  minutes: Number(opt('minutes', 3)),
  interval: Number(opt('interval', 10)),
  ramp: Number(opt('ramp', 60)),
  connections: Number(opt('connections', 256)),
  setupConcurrency: Number(opt('setup-concurrency', 40)),
  result: has('result'),
  edgeSecret: process.env.PLATFORM_EDGE_SECRET ?? 'local-dev-edge-secret-not-for-deployment-000000', // gitleaks:allow (public dev placeholder)
  origin: process.env.LOAD_ORIGIN ?? 'http://localhost:3000',
  label: opt('label', ''),
};

const pool = new Pool(cfg.base, { connections: cfg.connections, pipelining: 1, keepAliveTimeout: 60_000, headersTimeout: 60_000, bodyTimeout: 60_000 });
const runId = Date.now().toString(36);
const metrics = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (n) => Math.floor(Math.random() * n);
const pick = (xs) => xs[rand(xs.length)];

function record(name, ms, status, error) {
  let m = metrics.get(name);
  if (!m) metrics.set(name, (m = { times: [], ok: 0, errors: 0, statuses: {}, errorKinds: {} }));
  m.times.push(ms);
  m.statuses[status] = (m.statuses[status] ?? 0) + 1;
  if (status >= 200 && status < 300) m.ok++;
  else {
    m.errors++;
    const k = error ?? String(status);
    m.errorKinds[k] = (m.errorKinds[k] ?? 0) + 1;
  }
}

async function call(vu, method, pathName, body, metric) {
  const headers = { 'x-soyl-edge-auth': cfg.edgeSecret, 'x-soyl-client-ip': vu.ip, origin: cfg.origin, 'user-agent': 'soyl-load/1.0' };
  if (vu.cookies.size) headers.cookie = [...vu.cookies].map(([k, v]) => `${k}=${v}`).join('; ');
  let payload;
  if (body !== undefined) {
    headers['content-type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  const t0 = performance.now();
  try {
    const res = await pool.request({ method, path: pathName, headers, body: payload });
    const text = await res.body.text();
    const ms = performance.now() - t0;
    const set = res.headers['set-cookie'];
    for (const c of Array.isArray(set) ? set : set ? [set] : []) {
      const [pair] = String(c).split(';');
      const i = pair.indexOf('=');
      const name = pair.slice(0, i).trim();
      const value = pair.slice(i + 1).trim();
      if (!value) vu.cookies.delete(name);
      else vu.cookies.set(name, value);
    }
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      /* not JSON */
    }
    const code = json && typeof json === 'object' && 'code' in json ? json.code : undefined;
    if (metric) record(metric, ms, res.statusCode, res.statusCode >= 300 ? `${res.statusCode}${code ? ` ${code}` : ''}` : undefined);
    return { status: res.statusCode, json };
  } catch (err) {
    if (metric) record(metric, performance.now() - t0, 0, err.code ?? err.name ?? 'network');
    return { status: 0, json: null };
  }
}

/* ---- answers ----------------------------------------------------------------------------------- */

function answerFor(q) {
  switch (q.type) {
    case 'mcq':
    case 'assertion-reason':
    case 'true-false':
    case 'multi-select':
      return q.options.length ? { option_ids: [pick(q.options).id] } : null;
    case 'numerical':
      return { value: rand(200) / 2 };
    case 'fill-blank':
      return { blanks: ['answer'] };
    case 'match':
      return q.options.length && q.match_right.length ? { pairs: q.options.map((o, i) => ({ left_id: o.id, right_id: q.match_right[i % q.match_right.length].id })) } : null;
    case 'ordering':
      return { order: [...q.options.map((o) => o.id)].sort(() => Math.random() - 0.5) };
    case 'code-output':
      return { output: String(rand(100)) };
    case 'case-based':
    case 'source-based': {
      const parts = (q.children ?? []).map((c) => ({ id: c.id, response: answerFor(c) })).filter((p) => p.response);
      return parts.length ? { parts } : null;
    }
    default:
      return { text: 'A load-test answer with a few words. '.repeat(1 + rand(6)) };
  }
}

/* ---- setup: sign in -------------------------------------------------------------------------- */

async function signIn(i) {
  const vu = { i, ip: `10.${(i >> 16) & 255}.${(i >> 8) & 255}.${(i & 255) || 1}`, cookies: new Map(), email: `load.${runId}.${i}@example.com` };
  const sent = await call(vu, 'POST', '/v1/auth/email/send-otp', { email: vu.email }, 'setup.send-otp');
  if (sent.status !== 200) return null;
  const outbox = await call(vu, 'GET', `/v1/dev/otp-outbox?to=${encodeURIComponent(vu.email)}`, undefined, 'setup.outbox');
  const code = outbox.json?.code;
  if (!code) return null;
  const verified = await call(vu, 'POST', '/v1/auth/email/verify', { email: vu.email, code }, 'setup.verify');
  return verified.status === 200 ? vu : null;
}

async function inBatches(n, limit, fn) {
  const out = new Array(n);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, n) }, async () => {
      while (next < n) {
        const i = next++;
        out[i] = await fn(i);
      }
    }),
  );
  return out;
}

/* ---- scenario -------------------------------------------------------------------------------- */

async function runVu(vu, t0) {
  await sleep(Math.max(0, t0 + (vu.i / Math.max(1, cfg.users)) * cfg.ramp * 1000 - Date.now()));
  const started = await call(vu, 'POST', `/v1/tests/${cfg.test}/attempts`, undefined, 'start');
  if (started.status !== 200 && started.status !== 201) return;
  const attemptId = started.json.attempt.id;
  const items = started.json.items.map((it) => ({ id: it.itemId, q: it.question, seq: 0, time: 0 })).filter((it) => answerFor(it.q));
  const end = Date.now() + cfg.minutes * 60_000;
  let saves = 0;
  while (Date.now() < end) {
    await sleep(cfg.interval * 1000 * (0.9 + Math.random() * 0.2));
    const changed = Array.from({ length: 1 + rand(3) }, () => pick(items));
    const entries = [...new Set(changed)].map((it) => {
      it.seq += 1;
      it.time += cfg.interval;
      return { itemId: it.id, seq: it.seq, response: answerFor(it.q), timeSpentSec: it.time, changedAt: new Date().toISOString() };
    });
    const r = await call(vu, 'PUT', `/v1/attempts/${attemptId}/responses`, { items: entries, tabSwitchCount: rand(3) }, 'autosave');
    saves++;
    if (r.status === 409) break;
  }
  await call(vu, 'POST', `/v1/attempts/${attemptId}/submit`, undefined, 'submit');
  if (cfg.result) await call(vu, 'GET', `/v1/attempts/${attemptId}/result`, undefined, 'result');
  vu.saves = saves;
}

/* ---- report ---------------------------------------------------------------------------------- */

const pct = (sorted, p) => (sorted.length ? sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)] : 0);
const r1 = (x) => Math.round(x * 10) / 10;

function summary(durationSec) {
  const rows = {};
  for (const [name, m] of [...metrics.entries()].sort()) {
    const s = [...m.times].sort((a, b) => a - b);
    rows[name] = {
      requests: s.length,
      errors: m.errors,
      errorRate: s.length ? r1((100 * m.errors) / s.length) : 0,
      p50: r1(pct(s, 50)),
      p95: r1(pct(s, 95)),
      p99: r1(pct(s, 99)),
      max: r1(s[s.length - 1] ?? 0),
      mean: r1(s.reduce((a, b) => a + b, 0) / Math.max(1, s.length)),
      statuses: m.statuses,
      errorKinds: m.errorKinds,
    };
  }
  const scenario = ['start', 'autosave', 'submit', 'result'].filter((k) => rows[k]);
  const total = scenario.reduce((n, k) => n + rows[k].requests, 0);
  const errors = scenario.reduce((n, k) => n + rows[k].errors, 0);
  return {
    at: new Date().toISOString(),
    label: cfg.label,
    config: { ...cfg, edgeSecret: '***' },
    machine: { platform: `${os.type()} ${os.release()}`, cpus: os.cpus().length, cpuModel: os.cpus()[0]?.model, memoryGb: r1(os.totalmem() / 2 ** 30), node: process.version },
    durationSec: r1(durationSec),
    scenario: { requests: total, errors, errorRate: total ? r1((100 * errors) / total) : 0, rps: r1(total / Math.max(1, durationSec)) },
    endpoints: rows,
  };
}

async function main() {
  console.log(`[load] ${cfg.users} VUs against ${cfg.base}, test ${cfg.test}, ${cfg.minutes} min answering, autosave every ${cfg.interval} s, ramp ${cfg.ramp} s`);
  const s0 = Date.now();
  const vus = (await inBatches(cfg.users, cfg.setupConcurrency, signIn)).filter(Boolean);
  console.log(`[load] setup: ${vus.length}/${cfg.users} signed in in ${Math.round((Date.now() - s0) / 1000)} s`);
  if (!vus.length) {
    console.error('[load] nobody could sign in: is the API running with DEV_OTP_OUTBOX (npm run dev -w @soyl/api)?');
    process.exit(1);
  }
  for (const k of [...metrics.keys()]) if (!k.startsWith('setup.')) metrics.delete(k);
  const t0 = Date.now();
  const timer = setInterval(() => {
    const a = metrics.get('autosave');
    console.log(`[load] +${Math.round((Date.now() - t0) / 1000)} s: start ${metrics.get('start')?.times.length ?? 0}, autosave ${a?.times.length ?? 0} (${a?.errors ?? 0} err), submit ${metrics.get('submit')?.times.length ?? 0}`);
  }, 15_000);
  await Promise.all(vus.map((vu) => runVu(vu, t0)));
  clearInterval(timer);
  const out = summary((Date.now() - t0) / 1000);
  await pool.close();
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'results');
  mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${out.at.replace(/[:.]/g, '-')}-${cfg.users}vu${cfg.label ? `-${cfg.label}` : ''}.json`);
  writeFileSync(file, JSON.stringify(out, null, 2));
  console.log('\nendpoint        requests  errors   p50 ms   p95 ms   p99 ms   max ms');
  for (const [k, v] of Object.entries(out.endpoints))
    console.log(`${k.padEnd(15)} ${String(v.requests).padStart(8)} ${String(v.errors).padStart(7)} ${String(v.p50).padStart(8)} ${String(v.p95).padStart(8)} ${String(v.p99).padStart(8)} ${String(v.max).padStart(8)}`);
  console.log(`\nscenario: ${out.scenario.requests} requests, error rate ${out.scenario.errorRate} %, ${out.scenario.rps} req/s over ${out.durationSec} s`);
  for (const [k, v] of Object.entries(out.endpoints)) if (v.errors) console.log(`  ${k} errors: ${JSON.stringify(v.errorKinds)}`);
  console.log(`machine: ${out.machine.cpuModel} × ${out.machine.cpus}, ${out.machine.memoryGb} GB, ${out.machine.platform}, node ${out.machine.node}`);
  console.log(`written ${path.relative(process.cwd(), file)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
