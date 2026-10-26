/**
 * JSON body parsing (API-5): Fastify's secure parser (prototype-poisoning protection), then a depth
 * and array-length check before any zod work. Only application/json is accepted; every other
 * content type gets 415 (AUTH-12: form posts cannot reach handlers).
 */
import type { FastifyInstance } from 'fastify';
import { BODY_LIMITS } from '@soyl/shared/config/security';
import { ApiProblem } from '../errors';

export function jsonShapeProblem(value: unknown, maxDepth: number = BODY_LIMITS.maxJsonDepth, maxArray: number = BODY_LIMITS.maxJsonArrayLength): string | null {
  const stack: [unknown, number][] = [[value, 1]];
  while (stack.length) {
    const [v, d] = stack.pop()!;
    if (v === null || typeof v !== 'object') continue;
    if (d > maxDepth) return `JSON nesting deeper than ${maxDepth}`;
    if (Array.isArray(v)) {
      if (v.length > maxArray) return `array longer than ${maxArray}`;
      for (const x of v) stack.push([x, d + 1]);
    } else {
      for (const x of Object.values(v)) stack.push([x, d + 1]);
    }
  }
  return null;
}

export function registerJsonParser(app: FastifyInstance): void {
  app.removeAllContentTypeParsers();
  const parse = app.getDefaultJsonParser('error', 'error');
  app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    parse(req, String(body), (err, parsed) => {
      if (err) return done(new ApiProblem('bad_request', { detail: 'Body is not valid JSON.' }), undefined);
      const problem = jsonShapeProblem(parsed);
      if (problem) return done(new ApiProblem('bad_request', { detail: `Body rejected: ${problem}.` }), undefined);
      done(null, parsed);
    });
  });
}
