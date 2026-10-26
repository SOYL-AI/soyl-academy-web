import { describe, expect, it } from 'vitest';
import { createLogger, errorFields, memoryLogger, redactUrls } from '../src/logger';

describe('logger', () => {
  it('writes one JSON line per record with a UTC ISO timestamp and the service name', () => {
    const lines: string[] = [];
    const log = createLogger('info', (l) => lines.push(l));
    log.info('hello', { count: 3, at: new Date('2026-10-26T00:00:00Z') });
    expect(lines).toHaveLength(1);
    const rec = JSON.parse(lines[0]!);
    expect(rec).toMatchObject({ level: 'info', service: 'soyl-worker', msg: 'hello', count: 3, at: '2026-10-26T00:00:00.000Z' });
    expect(rec.time).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it('filters by level', () => {
    const log = memoryLogger('warn');
    log.debug('d');
    log.info('i');
    log.warn('w');
    log.error('e');
    expect(log.lines.map((l) => l.msg)).toEqual(['w', 'e']);
    const silent = memoryLogger('silent');
    silent.error('x');
    expect(silent.lines).toHaveLength(0);
  });

  it('redacts secret-looking keys and serialises errors without connection strings', () => {
    const log = memoryLogger();
    const err = Object.assign(new Error('connect to postgres://soyl:hunter2@db:5432/x failed'), { code: 'ECONNREFUSED' });
    log.child({ job: 'a.b' }).error('boom', {
      err,
      token: 'abc',
      nested: { password: 'p', ok: 1, list: [{ authToken: 't' }] },
      databaseUrl: 'postgres://x',
    });
    const rec = log.lines[0]!;
    expect(rec).toMatchObject({ job: 'a.b', token: '[redacted]', databaseUrl: '[redacted]', nested: { password: '[redacted]', ok: 1, list: [{ authToken: '[redacted]' }] } });
    expect(rec.err).toEqual({ name: 'Error', message: 'connect to postgres://***@db:5432/x failed', code: 'ECONNREFUSED' });
    expect(JSON.stringify(rec)).not.toContain('hunter2');
  });

  it('errorFields handles non-errors and redactUrls masks credentials', () => {
    expect(errorFields('plain')).toEqual({ message: 'plain' });
    expect(errorFields(new TypeError('t'))).toEqual({ name: 'TypeError', message: 't' });
    expect(redactUrls('postgresql://a:b@h/db and postgres://c@h')).toBe('postgresql://***@h/db and postgres://***@h');
  });
});
