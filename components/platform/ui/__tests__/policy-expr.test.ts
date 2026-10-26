import { describe, expect, it } from 'vitest';
import { safeImageSrc, safeLink } from '../render/policy';
import { chemToTex } from '../render/math';
import { splitChem } from '../render/remark-soyl';
import { ExprError, parseExpr, tryParseExpr } from '../visual/expr';
import { segmentNarration, sentenceOfWord, wordAtOffset } from '../slides/segment';

describe('safeLink', () => {
  it.each([
    ['/learn/cbse/10/science', '/learn/cbse/10/science'],
    ['/learn/../tests?x=1#y', '/tests?x=1#y'],
    ['#s03', '#s03'],
    ['mailto:help@soylai.com', 'mailto:help@soylai.com'],
    ['https://www.soylai.com/plans', 'https://www.soylai.com/plans'],
    ['https://cbseacademic.nic.in/curriculum_2027.html', 'https://cbseacademic.nic.in/curriculum_2027.html'],
  ])('allows %s', (input, href) => {
    expect(safeLink(input)?.href).toBe(href);
  });

  it.each([
    'javascript:alert(1)',
    ' javascript:alert(1)',
    'JAVASCRIPT:alert(1)',
    'java\nscript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:x',
    'file:///etc/passwd',
    'http://www.soylai.com/',
    'https://evil.example/',
    'https://www.soylai.com.evil.example/',
    'https://user@www.soylai.com/',
    'https://www.soylai.com:8443/',
    '//evil.example/x',
    '/\\evil.example',
    'relative/path',
    '#"><script>',
    '',
    42,
    null,
  ])('refuses %s', (input) => {
    expect(safeLink(input as string)).toBeNull();
  });

  it('marks off-site allow-listed links external, own site internal', () => {
    expect(safeLink('https://cisce.org/')?.external).toBe(true);
    expect(safeLink('https://www.soylai.com/learn')?.external).toBe(false);
  });
});

describe('safeImageSrc', () => {
  const cdn = 'https://cdn.soylai.com/content';
  it('allows only https URLs under the CDN base', () => {
    expect(safeImageSrc('https://cdn.soylai.com/content/a.png', cdn)).toBe('https://cdn.soylai.com/content/a.png');
    expect(safeImageSrc('https://cdn.soylai.com/other/a.png', cdn)).toBeNull();
    expect(safeImageSrc('https://cdn.soylai.com/content/../other/a.png', cdn)).toBeNull();
    expect(safeImageSrc('https://evil.example/content/a.png', cdn)).toBeNull();
    expect(safeImageSrc('http://cdn.soylai.com/content/a.png', cdn)).toBeNull();
    expect(safeImageSrc('data:image/png;base64,AAAA', cdn)).toBeNull();
    expect(safeImageSrc('/content/a.png', cdn)).toBeNull();
    expect(safeImageSrc('https://cdn.soylai.com/content/a.png', '')).toBeNull();
  });
});

describe('chemistry helpers', () => {
  it('wraps mhchem and refuses brace break-outs', () => {
    expect(chemToTex('2H2 + O2 -> 2H2O')).toBe('\\ce{2H2 + O2 -> 2H2O}');
    expect(chemToTex('H2O} \\href{javascript:x}{y')).toBeNull();
    expect(chemToTex('')).toBeNull();
  });

  it('splits bare \\ce{} out of text with balanced braces', () => {
    const parts = splitChem('Water \\ce{H2O} and \\ce{CO2^{}}, done');
    expect(parts.map((p) => p.type)).toEqual(['text', 'inlineMath', 'text', 'inlineMath', 'text']);
    expect(parts[1].value).toBe('\\ce{H2O}');
    expect(splitChem('broken \\ce{H2O').map((p) => p.type)).toEqual(['text']);
  });
});

describe('plot expression parser', () => {
  const at = (src: string, x: number) => parseExpr(src)(x);

  it('evaluates the agreed grammar', () => {
    expect(at('2x + 1', 3)).toBe(7);
    expect(at('2(x+1)', 1)).toBe(4);
    expect(at('(x+1)(x-1)', 3)).toBe(8);
    expect(at('-x^2', 3)).toBe(-9);
    expect(at('2^3^2', 0)).toBe(512);
    expect(at('2^-1', 0)).toBe(0.5);
    expect(at('3sin(x)', Math.PI / 2)).toBeCloseTo(3);
    expect(at('sqrt(x) + abs(-2) + ln(e) + log(100) + exp(0)', 4)).toBe(2 + 2 + 1 + 2 + 1);
    expect(at('floor(x) + ceil(x)', 1.5)).toBe(3);
    expect(at('asin(1) + acos(1) + atan(0)', 0)).toBeCloseTo(Math.PI / 2);
    expect(at('pi', 0)).toBeCloseTo(Math.PI);
    expect(at('πx', 1)).toBeCloseTo(Math.PI);
    expect(at('y = 0.5x − 2', 4)).toBe(0);
    expect(at('f(x) = x × 2', 4)).toBe(8);
    expect(at('1/x', 0)).toBe(Infinity);
  });

  it.each([
    'alert(1)',
    'constructor',
    'x.constructor',
    '__proto__',
    'this',
    'process.exit()',
    'eval("1")',
    'Function("return 1")()',
    '`1`',
    'x; 1',
    'x => x',
    'x[0]',
    'x ** 2',
    'x2',
    'e3',
    '(x+1)2',
    '1e3',
    '2.5.3',
    'sinx',
    'sin x',
    '2 +',
    '(x',
    ')',
    'y',
    '',
    'x'.repeat(201),
    '('.repeat(60) + 'x' + ')'.repeat(60),
  ])('rejects %s', (src) => {
    expect(() => parseExpr(src)).toThrow(ExprError);
    expect(tryParseExpr(src)).toBeNull();
  });
});

describe('narration segmentation', () => {
  it('splits English sentences and words with offsets', () => {
    const text = 'Plants make food. They use sunlight! Do you?';
    const sentences = segmentNarration(text);
    expect(sentences.map((s) => s.text.trim())).toEqual(['Plants make food.', 'They use sunlight!', 'Do you?']);
    expect(sentences.flatMap((s) => s.words.map((w) => w.text))).toEqual(['Plants', 'make', 'food.', 'They', 'use', 'sunlight!', 'Do', 'you?']);
    const w = sentences[1].words[2];
    expect(text.slice(w.start, w.end)).toBe('sunlight!');
    expect(wordAtOffset(sentences, text.indexOf('sunlight'))).toBe(5);
    expect(sentenceOfWord(sentences, 5)).toBe(1);
  });

  it('splits Hindi on the danda', () => {
    const sentences = segmentNarration('संज्ञा का मतलब है नाम। आइए इसके तीन भेद देखें।');
    expect(sentences).toHaveLength(2);
    expect(sentences[0].words.map((w) => w.text)).toEqual(['संज्ञा', 'का', 'मतलब', 'है', 'नाम।']);
  });

  it('handles text without final punctuation and empty input', () => {
    expect(segmentNarration('no full stop here')).toHaveLength(1);
    expect(segmentNarration('')).toEqual([]);
  });
});
