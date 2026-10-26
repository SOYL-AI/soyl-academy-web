/**
 * Minimal structured logger: one JSON object per line on stdout, UTC ISO-8601 timestamps (GEN-6).
 * Values are JSON-encoded (no log injection). Keys that look like secrets are replaced, and errors are
 * reduced to name + message (+ code), never connection strings or SQL parameters. Jobs log counts and
 * ids of queues, never personal data (DB-8, PII.md).
 */
import type { LogLevel } from './config';

export interface Logger {
  error(msg: string, fields?: Record<string, unknown>): void;
  warn(msg: string, fields?: Record<string, unknown>): void;
  info(msg: string, fields?: Record<string, unknown>): void;
  debug(msg: string, fields?: Record<string, unknown>): void;
  child(bindings: Record<string, unknown>): Logger;
}

const ORDER: Record<LogLevel, number> = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60, silent: 100 };

const SENSITIVE_KEY = /^(otp|code|token|secret|password|key|cookie|authorization|connectionstring|url|databaseurl)$|(token|secret|password|otp|pepper)$/i;

/** Error → loggable object without stack traces of user input or connection details. */
export function errorFields(err: unknown): Record<string, unknown> {
  if (err instanceof Error) {
    const out: Record<string, unknown> = { name: err.name, message: redactUrls(err.message) };
    const code = (err as { code?: unknown }).code;
    if (typeof code === 'string') out.code = code;
    return out;
  }
  return { message: redactUrls(String(err)) };
}

/** Masks credentials in any postgres:// URL inside a string. */
export function redactUrls(s: string): string {
  return s.replace(/(postgres(?:ql)?:\/\/)[^@\s/]+@/gi, '$1***@');
}

function scrub(value: unknown, depth = 0): unknown {
  if (value instanceof Error) return errorFields(value);
  if (value instanceof Date) return value.toISOString();
  if (depth > 5 || value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.slice(0, 50).map((v) => scrub(v, depth + 1));
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) out[k] = SENSITIVE_KEY.test(k) ? '[redacted]' : scrub(v, depth + 1);
  return out;
}

export function createLogger(
  level: LogLevel = 'info',
  write: (line: string) => void = (line) => process.stdout.write(line + '\n'),
  bindings: Record<string, unknown> = { service: 'soyl-worker' },
): Logger {
  const min = ORDER[level];
  const emit = (lvl: Exclude<LogLevel, 'silent' | 'trace' | 'fatal'>, msg: string, fields?: Record<string, unknown>) => {
    if (ORDER[lvl] < min) return;
    const record = { time: new Date().toISOString(), level: lvl, ...bindings, msg, ...(fields ? (scrub(fields) as object) : {}) };
    write(JSON.stringify(record));
  };
  return {
    error: (msg, fields) => emit('error', msg, fields),
    warn: (msg, fields) => emit('warn', msg, fields),
    info: (msg, fields) => emit('info', msg, fields),
    debug: (msg, fields) => emit('debug', msg, fields),
    child: (more) => createLogger(level, write, { ...bindings, ...more }),
  };
}

/** A logger that records lines in memory (tests). */
export function memoryLogger(level: LogLevel = 'debug'): Logger & { lines: Array<Record<string, unknown>> } {
  const lines: Array<Record<string, unknown>> = [];
  const log = createLogger(level, (line) => lines.push(JSON.parse(line) as Record<string, unknown>));
  return Object.assign(log, { lines });
}
