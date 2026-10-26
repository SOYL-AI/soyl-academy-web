/**
 * Safe maths-expression parser for plot functions (no eval, no new Function, no property access).
 * Grammar (agreed with pipeline-engineer for ADR-007 stage 4):
 *
 *   expr    := term (('+' | '-') term)*
 *   term    := unary (('*' | '/') unary | <implicit ×> power)*      2x, 2(x+1), (x+1)(x-1), 3sin(x)
 *   unary   := ('-' | '+') unary | power
 *   power   := primary ('^' unary)?                                  right-associative; -x^2 = -(x^2)
 *   primary := number | 'x' | 'pi' | 'π' | 'e' | func '(' expr ')' | '(' expr ')'
 *   func    := sin cos tan asin acos atan sqrt abs ln log exp floor ceil      (log = log10)
 *
 * Limits: 200 characters, 200 nodes, depth 40. Anything else is a ParseError.
 */

export class ExprError extends Error {}

type Node =
  | { t: 'num'; v: number }
  | { t: 'x' }
  | { t: 'neg'; a: Node }
  | { t: 'bin'; op: '+' | '-' | '*' | '/' | '^'; a: Node; b: Node }
  | { t: 'fn'; f: FnName; a: Node };

const FUNCTIONS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sqrt: Math.sqrt,
  abs: Math.abs,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
  floor: Math.floor,
  ceil: Math.ceil,
} as const;
type FnName = keyof typeof FUNCTIONS;
const FN_NAMES = Object.keys(FUNCTIONS) as FnName[];

const MAX_LENGTH = 200;
const MAX_NODES = 200;
const MAX_DEPTH = 40;

type Token = { k: 'num'; v: number } | { k: 'id'; v: string } | { k: 'op'; v: string };

function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === ' ' || c === '\t') {
      i++;
    } else if (/[0-9.]/.test(c)) {
      const m = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(src.slice(i));
      if (!m) throw new ExprError(`bad number at ${i}`);
      // "2e" would swallow Euler's e as an exponent marker only when digits follow, so "2e" = 2·e.
      out.push({ k: 'num', v: Number(m[0]) });
      i += m[0].length;
    } else if (/[A-Za-z]/.test(c)) {
      const m = /^[A-Za-z]+/.exec(src.slice(i))!;
      out.push({ k: 'id', v: m[0] });
      i += m[0].length;
    } else if (c === 'π') {
      out.push({ k: 'id', v: 'pi' });
      i++;
    } else if ('+-*/^()'.includes(c)) {
      if (c === '*' && src[i + 1] === '*') throw new ExprError('use ^ for powers');
      out.push({ k: 'op', v: c });
      i++;
    } else if (c === '−') {
      out.push({ k: 'op', v: '-' }); // Unicode minus
      i++;
    } else if (c === '×' || c === '·') {
      out.push({ k: 'op', v: '*' });
      i++;
    } else {
      throw new ExprError(`unexpected "${c}"`);
    }
  }
  return out;
}

export interface CompiledExpr {
  (x: number): number;
  source: string;
}

export function parseExpr(source: string): CompiledExpr {
  if (typeof source !== 'string' || source.trim() === '') throw new ExprError('empty expression');
  if (source.length > MAX_LENGTH) throw new ExprError('expression too long');
  // Accept a leading "y =" / "f(x) =" for author convenience.
  const body = source.replace(/^\s*(?:y|f\s*\(\s*x\s*\))\s*=\s*/, '');
  const tokens = tokenize(body);
  let pos = 0;
  let nodes = 0;
  let depth = 0;

  const peek = () => tokens[pos];
  const isOp = (v: string) => peek()?.k === 'op' && peek()!.v === v;
  const make = <T extends Node>(n: T): T => {
    if (++nodes > MAX_NODES) throw new ExprError('expression too complex');
    return n;
  };
  const enter = () => {
    if (++depth > MAX_DEPTH) throw new ExprError('expression nested too deeply');
  };
  const leave = () => {
    depth--;
  };

  function expr(): Node {
    enter();
    let left = term();
    while (isOp('+') || isOp('-')) {
      const op = (tokens[pos++] as { v: '+' | '-' }).v;
      left = make({ t: 'bin', op, a: left, b: term() });
    }
    leave();
    return left;
  }

  function startsPrimary(): boolean {
    const t = peek();
    return !!t && (t.k === 'num' || t.k === 'id' || (t.k === 'op' && t.v === '('));
  }

  function term(): Node {
    let left = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = (tokens[pos++] as { v: '*' | '/' }).v;
        left = make({ t: 'bin', op, a: left, b: unary() });
      } else if (startsPrimary()) {
        left = make({ t: 'bin', op: '*', a: left, b: power() });
      } else {
        return left;
      }
    }
  }

  function unary(): Node {
    enter();
    let result: Node;
    if (isOp('-')) {
      pos++;
      result = make({ t: 'neg', a: unary() });
    } else if (isOp('+')) {
      pos++;
      result = unary();
    } else {
      result = power();
    }
    leave();
    return result;
  }

  function power(): Node {
    const base = primary();
    if (isOp('^')) {
      pos++;
      return make({ t: 'bin', op: '^', a: base, b: unary() });
    }
    return base;
  }

  function primary(): Node {
    const t = tokens[pos++];
    if (!t) throw new ExprError('unexpected end');
    if (t.k === 'num') {
      if (!Number.isFinite(t.v)) throw new ExprError('bad number');
      return make({ t: 'num', v: t.v });
    }
    if (t.k === 'op' && t.v === '(') {
      const inner = expr();
      if (!isOp(')')) throw new ExprError('missing )');
      pos++;
      return inner;
    }
    if (t.k === 'id') {
      const id = t.v;
      if (id === 'x') return make({ t: 'x' });
      if (id === 'pi') return make({ t: 'num', v: Math.PI });
      if (id === 'e') return make({ t: 'num', v: Math.E });
      if ((FN_NAMES as string[]).includes(id)) {
        if (!isOp('(')) throw new ExprError(`${id} needs brackets: ${id}(x)`);
        pos++;
        const arg = expr();
        if (!isOp(')')) throw new ExprError('missing )');
        pos++;
        return make({ t: 'fn', f: id as FnName, a: arg });
      }
      throw new ExprError(`unknown name "${id}"`);
    }
    throw new ExprError(`unexpected "${t.v}"`);
  }

  const ast = expr();
  if (pos !== tokens.length) throw new ExprError(`unexpected "${(tokens[pos] as { v: unknown }).v}"`);

  const evaluate = (n: Node, x: number): number => {
    switch (n.t) {
      case 'num':
        return n.v;
      case 'x':
        return x;
      case 'neg':
        return -evaluate(n.a, x);
      case 'fn':
        return FUNCTIONS[n.f](evaluate(n.a, x));
      case 'bin': {
        const a = evaluate(n.a, x);
        const b = evaluate(n.b, x);
        switch (n.op) {
          case '+':
            return a + b;
          case '-':
            return a - b;
          case '*':
            return a * b;
          case '/':
            return a / b;
          case '^':
            return Math.pow(a, b);
        }
      }
    }
  };

  const fn = ((x: number) => evaluate(ast, x)) as CompiledExpr;
  fn.source = source;
  return fn;
}

/** parseExpr that returns null instead of throwing (renderers use this). */
export function tryParseExpr(source: string): CompiledExpr | null {
  try {
    return parseExpr(source);
  } catch {
    return null;
  }
}
