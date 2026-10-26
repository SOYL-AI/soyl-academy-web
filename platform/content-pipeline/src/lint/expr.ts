/**
 * Safe parser for plot expressions (no eval, no Function). The grammar is agreed with
 * design-system's renderer (components/platform/ui/visual/expr.ts) so anything that passes here
 * renders there:
 *
 *   expr    := sum
 *   sum     := product (('+' | '-') product)*
 *   product := unary (('*' | '/') unary | implicit)*      implicit multiplication: 2x, 2(x+1), (x+1)(x-1), 3sin(x)
 *   unary   := ('-' | '+') unary | power
 *   power   := atom ('^' unary)?                          right-associative
 *   atom    := number | 'x' | 'pi' | 'e' | func '(' expr ')' | '(' expr ')'
 *   func    := sin cos tan asin acos atan sqrt abs ln log exp floor ceil   (log = log10, ln = natural)
 */

export type Node =
  | { t: 'num'; v: number }
  | { t: 'var' }
  | { t: 'const'; name: 'pi' | 'e' }
  | { t: 'neg'; a: Node }
  | { t: 'bin'; op: '+' | '-' | '*' | '/' | '^'; a: Node; b: Node }
  | { t: 'call'; fn: FuncName; a: Node };

export const FUNCTIONS = {
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
export type FuncName = keyof typeof FUNCTIONS;

export class ExprError extends Error {
  constructor(
    message: string,
    readonly pos: number,
  ) {
    super(message);
    this.name = 'ExprError';
  }
}

type Tok = { k: 'num'; v: number; p: number } | { k: 'id'; v: string; p: number } | { k: 'op'; v: string; p: number };

const MAX_LENGTH = 200;

function tokenize(src: string): Tok[] {
  if (src.length > MAX_LENGTH) throw new ExprError(`expression longer than ${MAX_LENGTH} characters`, 0);
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i]!;
    if (c === ' ' || c === '\t') {
      i++;
      continue;
    }
    const num = /^(\d+(\.\d*)?|\.\d+)/.exec(src.slice(i));
    if (num) {
      out.push({ k: 'num', v: Number(num[0]), p: i });
      i += num[0].length;
      continue;
    }
    const id = /^[a-z]+/.exec(src.slice(i));
    if (id) {
      // Split runs like "xsin" or "pix" greedily into known names.
      let word = id[0];
      let p = i;
      while (word) {
        const name = ['asin', 'acos', 'atan', 'sqrt', 'floor', 'ceil', 'sin', 'cos', 'tan', 'abs', 'exp', 'log', 'ln', 'pi', 'x', 'e'].find((n) => word.startsWith(n));
        if (!name) throw new ExprError(`unknown name "${word}"`, p);
        out.push({ k: 'id', v: name, p });
        word = word.slice(name.length);
        p += name.length;
      }
      i += id[0].length;
      continue;
    }
    if ('+-*/^()'.includes(c)) {
      out.push({ k: 'op', v: c, p: i });
      i++;
      continue;
    }
    throw new ExprError(`unexpected character "${c}"`, i);
  }
  return out;
}

export function parseExpr(src: string): Node {
  const toks = tokenize(src);
  let i = 0;
  let depth = 0;
  const peek = () => toks[i];
  const isOp = (v: string) => peek()?.k === 'op' && peek()!.v === v;
  const pos = () => peek()?.p ?? src.length;

  const sum = (): Node => {
    let a = product();
    while (isOp('+') || isOp('-')) {
      const op = (toks[i++] as { v: '+' | '-' }).v;
      a = { t: 'bin', op, a, b: product() };
    }
    return a;
  };
  const startsAtom = () => {
    const t = peek();
    return !!t && (t.k === 'num' || t.k === 'id' || (t.k === 'op' && t.v === '('));
  };
  const product = (): Node => {
    let a = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = (toks[i++] as { v: '*' | '/' }).v;
        a = { t: 'bin', op, a, b: unary() };
      } else if (startsAtom()) {
        a = { t: 'bin', op: '*', a, b: power() };
      } else return a;
    }
  };
  const unary = (): Node => {
    if (isOp('-')) {
      i++;
      return { t: 'neg', a: unary() };
    }
    if (isOp('+')) {
      i++;
      return unary();
    }
    return power();
  };
  const power = (): Node => {
    const base = atom();
    if (isOp('^')) {
      i++;
      return { t: 'bin', op: '^', a: base, b: unary() };
    }
    return base;
  };
  const atom = (): Node => {
    const t = peek();
    if (!t) throw new ExprError('unexpected end of expression', src.length);
    if (t.k === 'num') {
      i++;
      return { t: 'num', v: t.v };
    }
    if (t.k === 'id') {
      i++;
      if (t.v === 'x') return { t: 'var' };
      if (t.v === 'pi' || t.v === 'e') return { t: 'const', name: t.v };
      if (!isOp('(')) throw new ExprError(`function ${t.v} needs parentheses`, pos());
      i++;
      if (++depth > 20) throw new ExprError('expression nested too deeply', pos());
      const a = sum();
      depth--;
      if (!isOp(')')) throw new ExprError('missing ")"', pos());
      i++;
      return { t: 'call', fn: t.v as FuncName, a };
    }
    if (t.v === '(') {
      i++;
      if (++depth > 20) throw new ExprError('expression nested too deeply', pos());
      const a = sum();
      depth--;
      if (!isOp(')')) throw new ExprError('missing ")"', pos());
      i++;
      return a;
    }
    throw new ExprError(`unexpected "${t.v}"`, t.p);
  };

  if (!toks.length) throw new ExprError('empty expression', 0);
  const node = sum();
  if (i < toks.length) throw new ExprError(`unexpected "${String(toks[i]!.v)}"`, toks[i]!.p);
  return node;
}

export function evaluate(node: Node, x: number): number {
  switch (node.t) {
    case 'num':
      return node.v;
    case 'var':
      return x;
    case 'const':
      return node.name === 'pi' ? Math.PI : Math.E;
    case 'neg':
      return -evaluate(node.a, x);
    case 'call':
      return FUNCTIONS[node.fn](evaluate(node.a, x));
    case 'bin': {
      const a = evaluate(node.a, x);
      const b = evaluate(node.b, x);
      switch (node.op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return a / b;
        case '^':
          return a ** b;
      }
    }
  }
}
