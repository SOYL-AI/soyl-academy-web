/**
 * Stage-4 lint rules, each with passing and failing fixtures, including the XSS corpus for SVG,
 * markdown and KaTeX (AC-19, WEB-7: "a content release containing <svg onload> fails stage 4").
 */
import { describe, expect, it } from 'vitest';
import { checkSvg } from '../src/lint/svg';
import { checkTex, checkMhchem, checkSmiles, extractMath } from '../src/lint/math';
import { evaluate, parseExpr } from '../src/lint/expr';
import { checkLiterature, checkText } from '../src/lint/text';
import { checkVisual } from '../src/lint/visual';
import { checkBalance, ceBodies, parseFormula } from '../src/lint/chem';
import { lintBundle, type Finding } from '../src/lint/index';
import { mockBundle } from './helpers';

const NS = 'xmlns="http://www.w3.org/2000/svg"';
const ok = (inner: string, attrs = '') => `<svg ${NS} viewBox="0 0 100 100"${attrs}><title>t</title>${inner}</svg>`;

describe('SVG allow-list (XSS corpus)', () => {
  it('accepts a clean diagram', () => {
    const r = checkSvg(
      ok('<defs><marker id="d1-a" viewBox="0 0 10 10" refX="5" refY="5"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs><line x1="0" y1="0" x2="50" y2="50" stroke="currentColor" marker-end="url(#d1-a)"/><use href="#d1-a"/><text x="1" y="2" class="diagram-label">H₂O</text>'),
    );
    expect(r.errors).toEqual([]);
    expect(r.texts).toContain('H₂O');
  });

  const corpus: [string, string, RegExp][] = [
    ['<script>', ok('<script>alert(1)</script>'), /<script> is not allowed/],
    ['onload on root', `<svg ${NS} viewBox="0 0 1 1" onload="alert(1)"><title>t</title></svg>`, /event handler onload/],
    ['onclick on child', ok('<rect onclick="x()" width="1" height="1"/>'), /event handler onclick/],
    ['javascript: href', ok('<use href="javascript:alert(1)"/>'), /script\/data URL|must be a #fragment/],
    ['entity-encoded javascript:', ok('<use href="&#106;avascript:alert(1)"/>'), /script\/data URL/],
    ['xlink:href to http', `<svg ${NS} xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1 1"><use xlink:href="http://evil.example/x.svg#a"/></svg>`, /xlink|namespace declaration/],
    ['<foreignObject>', ok('<foreignObject><div>hi</div></foreignObject>'), /foreignObject/],
    ['<style> with url()', ok('<style>rect{fill:url(http://evil.example/x)}</style>'), /<style> is not allowed/],
    ['style attribute with url()', ok('<rect style="fill:url(http://x)" width="1" height="1"/>'), /style attribute/],
    ['fill url() to external', ok('<rect fill="url(http://evil.example/p#x)" width="1" height="1"/>'), /must be url\(#id\)/],
    ['<image>', ok('<image href="https://evil.example/x.png"/>'), /<image> is not allowed/],
    ['<a> link', ok('<a href="#x"><text>hi</text></a>'), /<a> is not allowed/],
    ['<set> rewriting href', ok('<set attributeName="href" to="javascript:alert(1)"/>'), /<set> is not allowed/],
    ['<animate>', ok('<animate attributeName="x" values="1;2"/>'), /animate/],
    ['<iframe>', ok('<iframe src="https://evil.example"/>'), /<iframe> is not allowed/],
    ['data: URI', ok('<use href="data:image/svg+xml;base64,PHN2Zz4="/>'), /script\/data URL|#fragment/],
    ['DOCTYPE entity expansion', `<!DOCTYPE svg [<!ENTITY lol "lol">]><svg ${NS} viewBox="0 0 1 1"><text>&lol;</text></svg>`, /DOCTYPE/],
    ['external entity (XXE)', `<!DOCTYPE svg [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><svg ${NS} viewBox="0 0 1 1"><text>&xxe;</text></svg>`, /DOCTYPE/],
    ['undefined entity', ok('<text>&nbsp;</text>'), /not well-formed/],
    ['processing instruction', `<?xml-stylesheet href="https://evil.example/x.css"?><svg ${NS} viewBox="0 0 1 1"/>`, /processing instruction/],
    ['CDATA', ok('<text><![CDATA[<script>]]></text>'), /CDATA/],
    ['not SVG namespace', '<svg viewBox="0 0 1 1"><rect/></svg>', /root element must be/],
    ['HTML namespace child', ok('<div xmlns="http://www.w3.org/1999/xhtml">x</div>'), /outside the SVG namespace/],
    ['unknown attribute', ok('<rect formaction="x" width="1" height="1"/>'), /attribute formaction/],
    ['page CSS class (UI redress)', ok('<rect class="fixed inset-0" width="1" height="1"/>'), /class "fixed" is not allowed/],
    ['missing viewBox', `<svg ${NS}><title>t</title></svg>`, /viewBox/],
    ['duplicate id', ok('<g id="a"/><g id="a"/>'), /used twice/],
    ['malformed XML', `<svg ${NS} viewBox="0 0 1 1"><g></svg>`, /not well-formed/],
    ['oversize', ok(`<text>${'x'.repeat(61_000)}</text>`), /bytes \(max/],
  ];
  for (const [name, svg, re] of corpus)
    it(`rejects ${name}`, () => {
      expect(checkSvg(svg).errors.join('\n')).toMatch(re);
    });

  it('warns on hard-coded colours and a missing <title>', () => {
    const r = checkSvg(`<svg ${NS} viewBox="0 0 1 1"><rect fill="#ff0000" width="1" height="1"/></svg>`);
    expect(r.errors).toEqual([]);
    expect(r.warnings.join('\n')).toMatch(/hard-coded colour/);
    expect(r.warnings.join('\n')).toMatch(/<title>/);
  });
});

describe('markdown and plain-text rules', () => {
  const rules = (s: string, kind: 'md' | 'plain' = 'md') => checkText(s, kind).map((i) => i.rule);
  it('passes ordinary content, including maths with < and >', () => {
    expect(rules('If $a < b$ and $b > c$, the **product** is $\\ce{H2O}$. Costs ₹250.')).toEqual([]);
  });
  it.each([
    ['<img src=x onerror=alert(1)>', 'banned.html'],
    ['<script>alert(1)</script>', 'banned.html'],
    ['<iframe src="https://x"></iframe>', 'banned.html'],
    ['Click <b>here</b>', 'banned.html'],
    ['<!-- hidden -->', 'banned.html'],
    ['[click](javascript:alert(1))', 'banned.url'],
    ['See [NCERT](https://ncert.nic.in/textbook.php)', 'banned.url'],
    ['Visit https://example.com for more', 'banned.url'],
    ['Visit www.example.com', 'banned.url'],
    ['![x](https://evil.example/pixel.png)', 'banned.url'],
    ['<https://example.com>', 'banned.url'],
    ['mail us at help@example.com', 'banned.contact'],
    ['call 98765 43210 now', 'banned.contact'],
    ['call +91 9876543210', 'banned.contact'],
    ['what the fuck', 'banned.profanity'],
  ])('flags %s', (text, rule) => {
    expect(rules(text)).toContain(rule);
  });
  it('does not flag scientific numbers as phone numbers', () => {
    expect(rules('Avogadro: 6.022 × 10^23; 602214076000000000000000 particles; 9.8 m/s²')).toEqual([]);
  });
});

describe('literature reproduction heuristic', () => {
  it('flags long quotations and verse-like runs', () => {
    const quote = `“${'word '.repeat(30).trim()}”`;
    expect(checkLiterature(quote).map((i) => i.rule)).toContain('literature.quote');
    expect(checkLiterature(`> ${'line of a poem '.repeat(8)}`).map((i) => i.rule)).toContain('literature.quote');
    const verse = ['The woods are lovely here', 'and the night is deep', 'I have far to go', 'before the morning light', 'and miles to walk'].join('\n');
    expect(checkLiterature(verse).map((i) => i.rule)).toContain('literature.verse');
  });
  it('passes summaries, short quotes and bullet lists', () => {
    expect(checkLiterature('The poet uses the phrase “miles to go” to show duty. The theme is responsibility.')).toEqual([]);
    expect(checkLiterature(['- theme one', '- theme two', '- theme three', '- theme four', '- theme five', '- theme six'].join('\n'))).toEqual([]);
  });
});

describe('KaTeX and mhchem', () => {
  it('parses valid maths and chemistry', () => {
    expect(checkTex('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', true).error).toBeNull();
    expect(checkTex('\\ce{CaCO3 ->[\\Delta] CaO + CO2 ^}', true).error).toBeNull();
    expect(checkMhchem('Zn(s) + 2HCl(aq) -> ZnCl2(aq) + H2(g)').error).toBeNull();
  });
  it('rejects invalid maths', () => {
    expect(checkTex('\\frac{1}{', false).error).not.toBeNull();
    expect(checkTex('\\notacommand{x}', false).error).not.toBeNull();
  });
  it.each(['\\href{javascript:alert(1)}{x}', '\\url{https://evil.example}', '\\htmlClass{x}{y}', '\\def\\a{\\a\\a}\\a', '\\includegraphics{x.png}', '\\newcommand{\\x}{y}'])('rejects %s', (tex) => {
    expect(checkTex(tex, false).error).toMatch(/forbidden command/);
  });
  it('extracts $..$ and $$..$$, honouring \\$ and code', () => {
    const r = extractMath('Price \\$5, inline $a+b$, display $$c^2$$ and `$not$`.');
    expect(r.spans).toEqual([
      { tex: 'a+b', display: false },
      { tex: 'c^2', display: true },
    ]);
    expect(extractMath('unclosed $a + b').error).toMatch(/unclosed/);
  });
  it('checks SMILES', () => {
    expect(checkSmiles('CC(=O)O')).toBeNull();
    expect(checkSmiles('CC(=O')).toMatch(/unbalanced/);
    expect(checkSmiles('<script>')).toMatch(/alphabet/);
  });
});

describe('plot expression parser (no eval)', () => {
  it.each([
    ['x^2 - 2x + 1', 3, 4],
    ['2sin(x) + 3', 0, 3],
    ['(x+1)(x-1)', 3, 8],
    ['2(x+1)', 1, 4],
    ['-x^2', 3, -9],
    ['2^3^2', 0, 512],
    ['sqrt(abs(x))', -4, 2],
    ['log(100) + ln(e)', 0, 3],
    ['pi', 0, Math.PI],
    ['3sin(pi/2)', 0, 3],
    ['floor(2.7) + ceil(2.1)', 0, 5],
  ])('%s at x=%d is %d', (expr, x, want) => {
    expect(evaluate(parseExpr(expr), x)).toBeCloseTo(want, 9);
  });
  it.each(['alert(1)', 'constructor', 'x.constructor', 'process.exit()', 'eval(x)', 'x; y', 'x = 1', '[1,2]', 'x ** 2', '"x"', 'sin x', '(x', 'x)', '', '1e3', 'x2', `${'('.repeat(30)}x${')'.repeat(30)}`])('rejects %j', (expr) => {
    expect(() => parseExpr(expr)).toThrow();
  });
});

describe('visual spec checks', () => {
  it('plot: an expression that is never finite is an error', () => {
    const r = checkVisual({ kind: 'plot', spec: { x: { min: -1, max: -0.1 }, y: { min: 0, max: 1 }, functions: [{ expr: 'sqrt(x)' }], points: [], series: [], grid: true }, alt: 'a plot of root x' });
    expect(r.issues.map((i) => i.message).join()).toMatch(/never finite/);
  });
  it('geometry: unknown points are errors', () => {
    const r = checkVisual({ kind: 'geometry', spec: { width: 10, height: 10, points: { A: [1, 1] }, segments: [{ from: 'A', to: 'B' }], lines: [], rays: [], circles: [], angles: [], polygons: [] }, alt: 'segment AB' });
    expect(r.issues.map((i) => i.message).join()).toMatch(/unknown point "B"/);
  });
  it('flow: edges must reference nodes', () => {
    const r = checkVisual({ kind: 'flow', spec: { direction: 'LR', nodes: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }], edges: [{ from: 'a', to: 'c' }] }, alt: 'flow a to c' });
    expect(r.issues.map((i) => i.rule)).toContain('visual.flow');
  });
  it('table: rows must match the header width', () => {
    const r = checkVisual({ kind: 'table', spec: { headers: ['a', 'b'], rows: [['1']] }, alt: 'a small table' });
    expect(r.issues.map((i) => i.rule)).toContain('visual.table');
  });
  it('chem: equations must parse in mhchem', () => {
    expect(checkVisual({ kind: 'chem', spec: { equation: '2H2 + O2 -> 2H2O' }, alt: 'water formation' }).issues).toEqual([]);
    expect(checkVisual({ kind: 'chem', spec: { equation: 'H2 + {O2' }, alt: 'broken equation' }).issues.length).toBeGreaterThan(0);
  });
});

describe('chemical equation balance', () => {
  it('parses formulae with groups and hydrates', () => {
    expect(parseFormula('Ca(OH)2')).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(parseFormula('CuSO4.5H2O')).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
    expect(parseFormula('[Cu(NH3)4]SO4')).toEqual({ Cu: 1, N: 4, H: 12, S: 1, O: 4 });
  });
  it('checks balance', () => {
    expect(checkBalance('2H2 + O2 -> 2H2O').kind).toBe('balanced');
    expect(checkBalance('Zn(s) + 2HCl(aq) -> ZnCl2(aq) + H2(g) ^').kind).toBe('balanced');
    expect(checkBalance('CaCO3 ->[heat] CaO + CO2').kind).toBe('balanced');
    expect(checkBalance('Pb(NO3)2 + 2KI -> PbI2 v + 2KNO3').kind).toBe('balanced');
    expect(checkBalance('Mg + O2 -> MgO')).toEqual({ kind: 'unbalanced', elements: ['O'] });
    expect(checkBalance('CuSO4.xH2O -> CuSO4 + xH2O').kind).toBe('skipped');
    expect(checkBalance('H2O').kind).toBe('skipped');
  });
  it('finds \\ce bodies', () => {
    expect(ceBodies('a $\\ce{H2 + Cl2 -> 2HCl}$ b $\\ce{Na^+}$')).toEqual(['H2 + Cl2 -> 2HCl', 'Na^+']);
  });
});

describe('lint engine on a unit', () => {
  const rules = (fs: Finding[], severity: 'error' | 'warning' = 'error') => fs.filter((f) => f.severity === severity).map((f) => f.rule);

  it('the mock unit is lint-clean (errors) and flagged as mock placeholder', async () => {
    const { bundle, ctx } = await mockBundle();
    const r = lintBundle(bundle, ctx);
    expect(r.findings.filter((f) => f.severity === 'error')).toEqual([]);
    expect(rules(r.findings, 'warning')).toContain('provenance.mock');
  });

  type Mutable = Record<string, any>;
  async function lintWith(mutate: (b: { deck: Mutable; notes: Mutable; flashcards: Mutable; questions: Mutable[] }) => void) {
    const { bundle, ctx } = await mockBundle();
    const b = { deck: bundle.decks[0]!.data as Mutable, notes: bundle.notes as Mutable, flashcards: bundle.flashcards as Mutable, questions: (bundle.questions as Mutable).questions as Mutable[] };
    mutate(b);
    return lintBundle(bundle, ctx).findings;
  }

  it.each([
    ['editorial.slides', (b: any) => (b.deck.slides = b.deck.slides.slice(0, 10).concat(b.deck.slides.slice(-1)))],
    ['editorial.summary', (b: any) => b.deck.slides.forEach((s: any) => s.layout === 'summary' && (s.layout = 'concept'))],
    ['editorial.exam-tips', (b: any) => b.deck.slides.forEach((s: any) => s.layout === 'exam-tips' && (s.layout = 'concept'))],
    ['editorial.checks', (b: any) => b.deck.slides.forEach((s: any) => s.layout === 'check' && ((s.layout = 'concept'), (s.check_question_id = null)))],
    ['editorial.examples', (b: any) => b.deck.slides.forEach((s: any) => s.layout === 'example' && (s.layout = 'concept'))],
    ['editorial.visual-cadence', (b: any) => b.deck.slides.forEach((s: any) => s.layout !== 'diagram' && (s.visual = null)) || b.deck.slides.forEach((s: any) => s.layout === 'diagram' && ((s.layout = 'concept'), (s.visual = null)))],
    ['editorial.flashcards', (b: any) => (b.flashcards.cards = b.flashcards.cards.slice(0, 10))],
    ['editorial.practice', (b: any) => b.questions.splice(20)],
    ['editorial.question-types', (b: any) => b.questions.forEach((q: any) => q.type !== 'mcq' && q.type !== 'short' && (b.questions[b.questions.indexOf(q)] = { ...b.questions[0], id: q.id }))],
    ['topics.unknown', (b: any) => (b.questions[5].topic_ids = ['cbse-10-science-ch02-t01'])],
    ['refs.check-question', (b: any) => (b.deck.slides.find((s: any) => s.layout === 'check').check_question_id = 'q_missing_001')],
    ['narration.symbols', (b: any) => (b.deck.slides[1].narration = 'Water is H2O and it is everywhere.')],
    ['narration.symbols', (b: any) => (b.deck.slides[1].narration = 'Say $x^2$ out loud.')],
    ['latex.backslash', (b: any) => (b.notes.sections[0].body_md = 'Formula: $ce{H2O}$ here')],
    ['latex.backslash', (b: any) => (b.notes.sections[0].body_md = 'Half is $\u000crac{1}{2}$')],
    ['math.katex', (b: any) => (b.notes.sections[0].body_md = 'Broken $\\frac{1}{$ maths')],
    ['chem.balance', (b: any) => (b.notes.sections[0].body_md = 'Rusting: $\\ce{Fe + O2 -> Fe2O3}$.')],
    ['svg.allowlist', (b: any) => (b.deck.slides.find((s: any) => s.visual?.kind === 'svg').visual.spec = `<svg ${NS} viewBox="0 0 1 1" onload="alert(1)"/>`)],
    ['banned.url', (b: any) => (b.flashcards.cards[0].back_md = 'Read more at https://example.com')],
    ['banned.html', (b: any) => (b.questions[0].solution_md = 'Step 1 <img src=x onerror=alert(1)>')],
    ['provenance.missing', (b: any) => delete b.notes.provenance],
    ['schema', (b: any) => (b.questions[0].marks = 7)],
  ])('flags %s', async (rule, mutate) => {
    expect(rules(await lintWith(mutate as never))).toContain(rule);
  });

  it('exempts deliberately skeletal equations and wrong options', async () => {
    const f1 = await lintWith((b) => (b.notes.sections[0].body_md = 'The skeletal equation $\\ce{Mg + O2 -> MgO}$ is not balanced yet.'));
    expect(rules(f1)).not.toContain('chem.balance');
    const f2 = await lintWith((b) => {
      const q = b.questions.find((x) => x.type === 'mcq')!;
      const wrong = q.options.find((o: Mutable) => !q.answer.option_ids.includes(o.id));
      wrong.text_md = '$\\ce{Mg + O2 -> MgO}$';
    });
    expect(rules(f2)).not.toContain('chem.balance');
  });

  it('requires objective questions behind check slides', async () => {
    const f = await lintWith((b) => {
      const id = b.deck.slides.find((s: Mutable) => s.layout === 'check').check_question_id;
      const q = b.questions.find((x) => x.id === id)!;
      Object.assign(q, { type: 'short', options: [], answer: { model_answer_md: 'x' } });
    });
    expect(f.some((x) => x.rule === 'refs.check-question' && /objective/.test(x.message))).toBe(true);
  });

  it('warns on competency and difficulty balance', async () => {
    const f = await lintWith((b) => b.questions.forEach((q) => ((q.competency = 'recall'), (q.difficulty = 2))));
    expect(rules(f, 'warning')).toEqual(expect.arrayContaining(['balance.competency', 'balance.difficulty']));
  });

  it('applies the literature heuristic only to literature chapters', async () => {
    const { bundle, ctx } = await mockBundle();
    (bundle.notes as Mutable).sections[0].body_md = `“${'word '.repeat(40).trim()}”`;
    expect(rules(lintBundle(bundle, ctx).findings)).not.toContain('literature.quote');
    expect(rules(lintBundle(bundle, { ...ctx, literature: true }).findings)).toContain('literature.quote');
  });

  it('requires Devanagari for Hindi content', async () => {
    const { bundle, ctx } = await mockBundle();
    expect(rules(lintBundle(bundle, { ...ctx, language: 'hi' }).findings)).toContain('language.script');
  });
});

describe('arithmetic inside solutions', () => {
  it('checks numeric = chains and skips variables, units and approximations', async () => {
    const { checkArithmetic, numericValue } = await import('../src/lint/arith');
    const r = String.raw;
    expect(checkArithmetic(r`\dfrac{3}{5} \times 12 = 7.2`)).toEqual([]);
    expect(checkArithmetic(r`\dfrac{3}{5} \times 12 = 7.5`)).toHaveLength(1);
    expect(checkArithmetic(r`x = 2 \times 3 = 6`)).toEqual([]);
    expect(checkArithmetic(r`x = 2 \times 3 = 7`)).toHaveLength(1);
    expect(checkArithmetic('2.4 + 1.6 = 4.0')).toEqual([]);
    expect(checkArithmetic(r`\dfrac{10}{3} \approx 3.3`)).toEqual([]);
    expect(checkArithmetic(r`AB = 4.5, \; BC = 6`)).toEqual([]);
    expect(checkArithmetic(r`\sqrt{16} + 2^3 = 12`)).toEqual([]);
    expect(checkArithmetic(r`1,20,000 \div 4 = 30,000`)).toEqual([]);
    expect(numericValue(r`12\text{ cm}`)).toBeNull();
    expect(numericValue(r`40^\circ`)).toBeNull();
    expect(numericValue('(2)(3)')).toBe(6);
  });

  it('flags a wrong number inside a worked solution, not only the key', async () => {
    const { bundle, ctx } = await mockBundle();
    const questions = (bundle.questions as Record<string, any>).questions as Record<string, any>[];
    // The mock question plan follows the chapter's blueprints, which may not ask for numericals;
    // turn an objective item into one so this test doesn't depend on catalog data.
    let q = questions.find((x) => x.type === 'numerical');
    if (!q) {
      q = questions.find((x) => x.type === 'mcq')!;
      Object.assign(q, { type: 'numerical', options: [], answer: { value: 24, tolerance: 0, unit: null } });
    }
    q.solution_md = String.raw`Step 1: new value $= 12 \times 2 = 26$. Step 2: answer 24.`;
    expect(lintBundle(bundle, ctx).findings.some((f) => f.rule === 'math.arithmetic')).toBe(true);
    q.solution_md = 'Step 1: double it. Step 2: done.';
    expect(lintBundle(bundle, ctx).findings.some((f) => f.rule === 'solution.answer' && f.severity === 'warning')).toBe(true);
  });
});

describe('geometry sanity', () => {
  const geo = (spec: Record<string, unknown>, caption?: string) =>
    checkVisual({ kind: 'geometry', spec: { width: 10, height: 10, segments: [], lines: [], rays: [], circles: [], angles: [], polygons: [], ...spec } as never, alt: 'a geometry figure', caption }).issues.map((i) => i.message);
  const tri = { A: [1, 1], B: [7, 1], C: [1, 9] } as const;

  it('accepts a correct right triangle with labels on one scale, and object-form points', () => {
    expect(geo({ points: { ...tri, X: { at: [5, 5], label: false, label_position: 'ne' } }, segments: [{ from: 'A', to: 'B', label: '6 cm' }, { from: 'A', to: 'C', label: '$8$ cm' }, { from: 'B', to: 'C', label: '10 cm', ticks: 1 }], angles: [{ at: 'A', from: 'B', to: 'C', right: true, arcs: 1 }], rays: [{ from: 'A', through: 'X' }] })).toEqual([]);
  });
  it('flags a right-angle mark that is not 90°', () => {
    expect(geo({ points: { A: [1, 1], B: [7, 1], C: [3, 9] }, angles: [{ at: 'A', from: 'B', to: 'C', right: true }] }).join()).toMatch(/marked right but measures/);
  });
  it('flags a degree label that does not match the drawing', () => {
    expect(geo({ points: tri, angles: [{ at: 'A', from: 'B', to: 'C', label: String.raw`$60^\circ$` }] }).join()).toMatch(/labelled 60° but measures 90/);
  });
  it('flags length labels off one scale, unless not to scale', () => {
    const spec = { points: tri, segments: [{ from: 'A', to: 'B', label: '6' }, { from: 'A', to: 'C', label: '5' }] };
    expect(geo(spec).join()).toMatch(/off the scale/);
    expect(geo({ ...spec, not_to_scale: true })).toEqual([]);
    expect(geo(spec, 'Not drawn to scale.')).toEqual([]);
    expect(geo({ ...spec, scale: { unit: 'cm', per_unit: 1 } }).join()).toMatch(/AC is labelled 5/);
  });
  it('flags points and circles outside the canvas and unknown references', () => {
    expect(geo({ points: { A: [11, 1] } }).join()).toMatch(/outside the canvas/);
    expect(geo({ points: { A: [1, 1] }, circles: [{ center: 'A', radius: 2 }] }).join()).toMatch(/leaves the canvas/);
    expect(geo({ points: tri, lines: [{ through: ['A', 'Z'] }] }).join()).toMatch(/unknown point "Z"/);
  });
});
