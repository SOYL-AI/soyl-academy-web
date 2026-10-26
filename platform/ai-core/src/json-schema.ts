import { z } from 'zod/v4';
import type { Rng } from './rng';

const cache = new WeakMap<object, Record<string, unknown>>();

/**
 * JSON Schema for a zod schema, as sent in response_format. Uses the *input* shape so fields with
 * defaults are optional for the model. Refinements (superRefine) cannot be expressed in JSON Schema;
 * the client validates the parsed output with the zod schema itself, so they are still enforced.
 */
export function toJsonSchema(schema: z.ZodType): Record<string, unknown> {
  const hit = cache.get(schema);
  if (hit) return hit;
  const json = z.toJSONSchema(schema, { io: 'input', unrepresentable: 'any', target: 'draft-2020-12' }) as Record<string, unknown>;
  delete json.$schema;
  cache.set(schema, json);
  return json;
}

/** Parses model output as JSON, tolerating a ```json fence around it. */
export function parseJsonOutput(text: string): unknown {
  const trimmed = text.trim();
  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(trimmed);
  return JSON.parse(fenced ? fenced[1]! : trimmed);
}

type Json = Record<string, unknown>;

/**
 * Builds a minimal instance of a JSON Schema (used by the mock provider when no fixture is
 * registered for a request). Handles the subset zod emits: object/array/string/number/integer/
 * boolean/null, enum, const, anyOf/oneOf, $ref into $defs, min/max constraints. String patterns
 * are not synthesised; such schemas need a registered fixture.
 */
export function sampleFromJsonSchema(schema: Json, rng: Rng, root: Json = schema, depth = 0): unknown {
  if (depth > 20) return null;
  if (typeof schema.$ref === 'string') {
    const name = schema.$ref.replace(/^#\/(\$defs|definitions)\//, '');
    const defs = (root.$defs ?? root.definitions ?? {}) as Record<string, Json>;
    const target = schema.$ref === '#' ? root : defs[name];
    return target ? sampleFromJsonSchema(target, rng, root, depth + 1) : null;
  }
  if ('const' in schema) return schema.const;
  if (Array.isArray(schema.enum)) return rng.pick(schema.enum as unknown[]);
  const alternatives = (schema.anyOf ?? schema.oneOf) as Json[] | undefined;
  if (alternatives?.length) {
    const nonNull = alternatives.filter((a) => a.type !== 'null');
    return sampleFromJsonSchema(nonNull[0] ?? alternatives[0]!, rng, root, depth + 1);
  }
  if (Array.isArray(schema.allOf) && schema.allOf.length) {
    return Object.assign({}, ...schema.allOf.map((s) => sampleFromJsonSchema(s as Json, rng, root, depth + 1) as object));
  }
  const type = Array.isArray(schema.type) ? (schema.type as string[]).find((t) => t !== 'null') : (schema.type as string | undefined);
  switch (type) {
    case 'object': {
      const props = (schema.properties ?? {}) as Record<string, Json>;
      const out: Record<string, unknown> = {};
      for (const [key, sub] of Object.entries(props)) out[key] = sampleFromJsonSchema(sub, rng, root, depth + 1);
      return out;
    }
    case 'array': {
      if (Array.isArray(schema.prefixItems)) return (schema.prefixItems as Json[]).map((s) => sampleFromJsonSchema(s, rng, root, depth + 1));
      const n = Math.max(1, Number(schema.minItems ?? 1));
      const items = (schema.items ?? {}) as Json;
      return Array.from({ length: n }, () => sampleFromJsonSchema(items, rng, root, depth + 1));
    }
    case 'string': {
      const min = Number(schema.minLength ?? 0);
      const base = '[MOCK] placeholder';
      return base.length >= min ? base : base.padEnd(min, '.');
    }
    case 'integer':
    case 'number': {
      const min = typeof schema.minimum === 'number' ? schema.minimum : typeof schema.exclusiveMinimum === 'number' ? schema.exclusiveMinimum + 1 : 1;
      return type === 'integer' ? Math.ceil(min) : min;
    }
    case 'boolean':
      return false;
    case 'null':
      return null;
    default:
      return '[MOCK] placeholder';
  }
}
