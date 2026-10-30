// Build CBSE 12 Computer Science ch05 Data Structure: Stack. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch05/src/build.mjs
// Every program output and stack state shown in decks, notes and flashcards is produced by pyOut() (Python 3).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch05', 'computer-science');
usePyCache(SRC);
const { F, code, ic, STACK_FNS, BAL_FN, POSTFIX_FN } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const rowsOf = (c) => JSON.parse(pyOut(c));

/**
 * Runs a list of stack operations in Python and returns [{label, stack, popped}] after each step.
 * ops: ['push 5', 'pop', 'peek'] etc.; values are pushed as given (strings or numbers).
 */
function runOps(ops) {
  const py = code(
    'import json',
    'stk, out = [], []',
    `for op in ${JSON.stringify(ops)}:`,
    '    parts = op.split(" ", 1)',
    '    got = None',
    '    if parts[0] == "push":',
    '        v = parts[1]',
    '        stk.append(int(v) if v.lstrip("-").isdigit() else v)',
    '    elif parts[0] == "pop":',
    '        got = stk.pop() if stk else "Underflow"',
    '    elif parts[0] == "peek":',
    '        got = stk[-1] if stk else None',
    '    out.append({"label": op, "stack": list(stk), "got": got})',
    'print(json.dumps(out))',
  );
  return rowsOf(py);
}
const show = (v) => (typeof v === 'string' ? `'${v}'` : String(v));
const pyList = (a) => `[${a.map(show).join(', ')}]`;

/** SVG of stack snapshots side by side; each snapshot is a column of boxes with the top marked. */
function stackSvg(steps, alt, caption) {
  const colW = 92;
  const box = 30;
  const maxH = Math.max(1, ...steps.map((s) => s.stack.length));
  const W = 30 + steps.length * colW;
  const base = 50 + maxH * box;
  const s = new Svg(W, base + 70);
  steps.forEach((st, i) => {
    const x = 20 + i * colW;
    s.line(x, base, x + colW - 18, base, { sw: 2 });
    st.stack.forEach((v, j) => {
      const y = base - (j + 1) * box;
      const top = j === st.stack.length - 1;
      s.rect(x + 6, y + 2, colW - 30, box - 4, { fill: top ? 'fill' : undefined, color: top ? 'accent' : undefined, sw: top ? 2 : 1.4, rx: 3 });
      s.text(x + 6 + (colW - 30) / 2, y + box / 2, String(v), { size: 13, bold: top });
    });
    if (!st.stack.length) s.text(x + (colW - 18) / 2, base - 14, 'empty', { size: 12, muted: true });
    s.text(x + (colW - 18) / 2, base + 18, st.label, { size: 12 });
    if (st.got !== null && st.got !== undefined) s.text(x + (colW - 18) / 2, base + 36, `→ ${st.got}`, { size: 12, color: 'accent' });
  });
  s.text(20, 22, 'Top of each stack is highlighted', { anchor: 'start', size: 12, muted: true });
  return s.visual(alt, caption);
}

// ---------------------------------------------------------------- Part 1 visuals
const vRoute1 = flow('LR', ['Data structures', 'Stack and LIFO', 'Push, pop, peek', 'Stack in a Python list', 'Underflow and overflow', 'Display and trace'], 'Route map of Part 1: data structures, the stack and LIFO, push pop and peek, a stack in a Python list, underflow and overflow, display and trace', 'Part 1 at a glance');
const vStructures = table(
  ['Structure', 'How items are added and removed', 'Everyday picture'],
  [
    ['List', 'At any position, by index', 'A numbered register'],
    ['Stack', 'Only at one end, the **top** (LIFO)', 'A pile of plates'],
    ['Queue', 'Added at the rear, removed from the front (FIFO)', 'A ticket-counter line'],
    ['Dictionary', 'By key', 'A phone directory'],
  ],
  'Table of four data structures: a list works by index, a stack adds and removes only at the top, a queue adds at the rear and removes from the front, and a dictionary works by key',
  'A data structure is a way of organising data so that it can be used efficiently.',
);
const OPS1 = ['push 10', 'push 20', 'push 30', 'pop', 'push 40', 'peek'];
const steps1 = runOps(OPS1);
const vPlates = stackSvg(steps1, `Six stack snapshots run in Python: push 10, push 20, push 30, then pop returns ${steps1[3].got}, then push 40, then peek returns ${steps1[5].got}; the final stack is ${pyList(steps1[5].stack)} with 40 on top`, 'Each column is the stack after one operation; arrows show the value returned.');
const vOps = table(
  ['Operation', 'Meaning', 'With a list `stk`'],
  [
    ['Push', 'Add an item at the top', '`stk.append(x)`'],
    ['Pop', 'Remove and return the top item', '`stk.pop()`'],
    ['Peek (top)', 'Read the top item without removing it', '`stk[-1]`'],
    ['isEmpty', 'Is the stack empty?', '`stk == []` or `len(stk) == 0`'],
    ['Size', 'Number of items', '`len(stk)`'],
  ],
  'Table of stack operations: push uses append, pop uses pop, peek reads index minus one, is-empty compares with an empty list, and size uses len',
);
const W1 = ['push A', 'push B', 'pop', 'push C', 'push D', 'pop', 'pop'];
const wSteps = runOps(W1);
const vTrace1 = table(
  ['Step', 'Operation', 'Stack (bottom → top)', 'Returned'],
  wSteps.map((s, i) => [String(i + 1), s.label, `\`${pyList(s.stack)}\``, s.got === null ? '—' : String(s.got)]),
  `Trace table run in Python for push A, push B, pop, push C, push D, pop, pop: the pops return ${wSteps.filter((s) => s.got !== null).map((s) => s.got).join(', ')} and the stack ends as ${pyList(wSteps[wSteps.length - 1].stack)}`,
  'Generated by running the operations in Python.',
);
const IMPL_DEMO = code(STACK_FNS, '', 'books = []', 'push(books, "Atlas")', 'push(books, "Diary")', 'print(peek(books), pop(books), pop(books), pop(books))', 'print(is_empty(books))');
const IMPL_OUT = pyOut(IMPL_DEMO);
const vImplOut = table(
  ['Call', 'Result'],
  [['`peek(books)`', 'Diary'], ['`pop(books)` three times', IMPL_OUT.split('\n')[0].split(' ').slice(1).join(', ')], ['`is_empty(books)`', IMPL_OUT.split('\n')[1]]],
  `Table of results from running the stack functions in Python: peek gives Diary, three pops give ${IMPL_OUT.split('\n')[0].split(' ').slice(1).join(', ')}, and is-empty then gives ${IMPL_OUT.split('\n')[1]}`,
  'The third pop finds the stack empty and returns the underflow message instead of crashing.',
);
const SAFE_POP = code('def pop(stk):', '    if stk == []:', '        return "Underflow"', '    return stk.pop()', '', 'print(pop([]))');
const ERR_EMPTY = pyErr(code('stk = []', 'stk.pop()'));
const vUnderOver = table(
  ['Condition', 'When it happens', 'What the program does'],
  [
    ['**Underflow**', 'Pop or peek on an **empty** stack', `Check \`stk == []\` first; otherwise Python stops with ${ic(ERR_EMPTY)}`],
    ['**Overflow**', 'Push on a **full** fixed-size stack', 'Check `len(stk) == capacity` first; a plain Python list grows, so it does not overflow in normal use'],
  ],
  'Table comparing underflow, popping or peeking an empty stack, which must be checked before calling pop, with overflow, pushing onto a full fixed-size stack, which a growing Python list does not suffer',
);
const vPushPopFlow = flow(
  'TB',
  ['Pop requested', 'Is the stack empty?', 'Yes: report Underflow and stop', 'No: x = stk.pop()', 'Return x'],
  'Flowchart of a safe pop: when pop is requested, test whether the stack is empty; if yes report underflow and stop, if no pop the top item and return it',
  'Safe pop',
  [{ from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n4', to: 'n5' }],
);
const DISPLAY_FN = code('def display(stk):', '    if stk == []:', '        print("Stack is empty")', '    else:', '        for i in range(len(stk) - 1, -1, -1):', '            print(stk[i])');
const DISP_RUN = code(DISPLAY_FN, '', 'display([3, 8, 5])', 'display([])');
const vDisplay = table(
  ['i (from top)', 'Printed'],
  rowsOf(code('import json', 'stk = [3, 8, 5]', 'print(json.dumps([[str(i), str(stk[i])] for i in range(len(stk) - 1, -1, -1)]))')),
  'Table of the display loop for the stack 3, 8, 5: index 2 prints 5, index 1 prints 8 and index 0 prints 3, so the top is printed first',
  'range(len(stk) - 1, -1, -1) counts down from the top index to 0.',
);
const PEEK_DEMO = code(STACK_FNS, '', 's = [6, 2]', 'print(peek(s), len(s))', 'print(pop(s), len(s))', 'print(is_empty(s), is_empty([]))');
const PEEK_OUT = pyOut(PEEK_DEMO).split('\n');
const vPeek = table(
  ['Statement', 'Output', 'Why'],
  [
    ['`print(peek(s), len(s))`', PEEK_OUT[0], 'Peek reads the top; size unchanged'],
    ['`print(pop(s), len(s))`', PEEK_OUT[1], 'Pop removes the top; size falls'],
    ['`print(is_empty(s), is_empty([]))`', PEEK_OUT[2], 'One item left; the new list is empty'],
  ],
  `Table of outputs from Python for s equal to 6 and 2: peek gives ${PEEK_OUT[0]}, pop gives ${PEEK_OUT[1]}, and is-empty gives ${PEEK_OUT[2]}`,
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Stack', 'LIFO: one open end, the top'],
    ['Push / pop', '`append(x)` / `pop()` at the end of the list'],
    ['Peek', '`stk[-1]`, no change in size'],
    ['Underflow', 'Check `stk == []` before `pop()`'],
    ['Overflow', 'Only for a fixed capacity'],
    ['Display', 'Top first: count down from `len(stk) - 1`'],
  ],
  'Summary table: a stack is last in first out with one open end; push and pop use append and pop; peek reads index minus one; check for an empty stack before popping; overflow applies only to a fixed capacity; display counts down from the top',
);
const vTips1 = table(
  ['Mistake', 'Correct idea'],
  [
    ['`stk.push(x)`', `Lists have no push(): ${ic(pyErr(code('stk = []', 'stk.push(1)')))}`],
    ['Popping without a check', `${ic(ERR_EMPTY)} on an empty list`],
    ['Printing bottom first in display', 'Start at the top index and count down'],
    ['Calling peek "pop"', 'Peek does not remove the item'],
  ],
  'Table of common mistakes: lists have no push method, popping an empty list raises an index error, display should start at the top, and peek does not remove the item',
);

// ---------------------------------------------------------------- Part 2 visuals
const vRoute2 = flow('LR', ['Where stacks are used', 'Reversing', 'Bracket matching', 'Function calls', 'Undo and back', 'Postfix', 'Board-style PUSH and POP'], 'Route map of Part 2: where stacks are used, reversing, bracket matching, function calls, undo and back buttons, postfix evaluation, and board-style push and pop programs', 'Part 2 at a glance');
const vApps = table(
  ['Application', 'What is pushed', 'Why LIFO fits'],
  [
    ['Reversing text', 'Each character', 'The last character comes out first'],
    ['Bracket checking', 'Each opening bracket', 'A closing bracket must match the latest open one'],
    ['Function calls', 'Each active call', 'The latest call finishes first'],
    ['Undo / Back', 'Each action or page', 'The latest action is undone first'],
    ['Postfix evaluation', 'Each operand', 'An operator uses the two latest operands'],
  ],
  'Table of stack applications: reversing text pushes characters, bracket checking pushes opening brackets, function calls push active calls, undo and back push actions or pages, and postfix evaluation pushes operands',
);
const REV_WORD = 'GOA';
const revSteps = runOps([...[...REV_WORD].map((c) => `push ${c}`), 'pop', 'pop', 'pop']);
const REV_RESULT = revSteps.filter((s) => s.got !== null).map((s) => s.got).join('');
const vReverse = stackSvg(revSteps, `Stack snapshots run in Python for reversing GOA: push G, push O, push A, then three pops return ${revSteps.filter((s) => s.got !== null).map((s) => s.got).join(', ')}, which spells ${REV_RESULT}`, `Popping every letter gives ${REV_RESULT}.`);
const BR_TEXT = '{a+[b*(c-d)]}';
const brRows = rowsOf(code(
  'import json',
  `text = ${JSON.stringify(BR_TEXT)}`,
  'pairs = {")": "(", "]": "[", "}": "{"}',
  'stk, rows = [], []',
  'for ch in text:',
  '    if ch in "([{":',
  '        stk.append(ch)',
  '        rows.append([ch, "push", "".join(stk)])',
  '    elif ch in ")]}":',
  '        top = stk.pop()',
  '        rows.append([ch, "pop " + top + (" matches" if top == pairs[ch] else " MISMATCH"), "".join(stk) or "empty"])',
  'rows.append(["end", "stack empty" if not stk else "left over", "-"])',
  'print(json.dumps(rows))',
));
const vBrackets = table(
  ['Bracket read', 'Action', 'Stack after'],
  brRows.map((r) => [ic(r[0]), r[1], r[2] === '-' || r[2] === 'empty' ? r[2] : ic(r[2])]),
  `Trace table run in Python for the expression ${BR_TEXT}: the three opening brackets are pushed, each closing bracket pops a matching opening bracket, and the stack ends empty, so the brackets are balanced`,
  'Only brackets change the stack; other characters are ignored.',
);
const BAD_TEXT = '(a[b)]';
const badRows = rowsOf(code(
  'import json',
  `text = ${JSON.stringify(BAD_TEXT)}`,
  'pairs = {")": "(", "]": "[", "}": "{"}',
  'stk, rows = [], []',
  'for ch in text:',
  '    if ch in "([{":',
  '        stk.append(ch)',
  '        rows.append([ch, "push", "".join(stk)])',
  '    elif ch in ")]}":',
  '        top = stk.pop()',
  '        ok = top == pairs[ch]',
  '        rows.append([ch, "pop " + top + (" matches" if ok else ": mismatch, stop"), "".join(stk) or "empty"])',
  '        if not ok:',
  '            break',
  'print(json.dumps(rows))',
));
const BAD_RESULT = pyOut(code(BAL_FN, `print(balanced(${JSON.stringify(BAD_TEXT)}))`));
const vBadTrace = table(
  ['Bracket read', 'Action', 'Stack after'],
  badRows.map((r) => [ic(r[0]), r[1], ic(r[2])]),
  `Trace table run in Python for the expression ${BAD_TEXT}, where round and square brackets are pushed, then the closing round bracket pops the square bracket, a mismatch, so the function returns ${BAD_RESULT}`,
  `balanced("${BAD_TEXT}") returns ${BAD_RESULT}.`,
);
const CALL_DEMO = code('def area(l, b):', '    print("  area starts")', '    return l * b', '', 'def plot_cost(l, b):', '    print(" plot_cost starts")', '    a = area(l, b)', '    print(" plot_cost ends")', '    return a * 150', '', 'print("main starts")', 'print("cost", plot_cost(12, 9))');
const vCalls = flow(
  'TB',
  ['main runs and calls plot_cost (pushed)', 'plot_cost calls area (pushed on top)', 'area returns first (popped)', 'plot_cost resumes, then returns (popped)', 'main resumes with the result'],
  'Flow of the call stack: main calls plot cost, which is pushed; plot cost calls area, pushed on top; area returns first and is popped; plot cost resumes and returns; main resumes with the result',
  'The call stack',
);
const PAGES = ['home', 'maths', 'videos', 'quiz'];
const backSteps = runOps([...PAGES.map((p) => `push ${p}`), 'pop', 'peek']);
const vBack = stackSvg(backSteps, `History stack snapshots run in Python: pages home, maths, videos and quiz are pushed; Back pops ${backSteps[4].got}; peek then shows ${backSteps[5].got} on screen`, 'Back pops the current page; the new top is shown.');
const PF = '4 5 + 2 *';
const pfRows = rowsOf(code(
  'import json',
  'stk, rows = [], []',
  `for tok in ${JSON.stringify(PF)}.split():`,
  '    if tok.isdigit():',
  '        stk.append(int(tok))',
  '        rows.append([tok, "push", str(stk)])',
  '    else:',
  '        b = stk.pop()',
  '        a = stk.pop()',
  '        r = a + b if tok == "+" else a * b',
  '        stk.append(r)',
  '        rows.append([tok, "pop " + str(b) + " and " + str(a) + ", push " + str(r), str(stk)])',
  'print(json.dumps(rows))',
));
const PF_VALUE = pyOut(code(POSTFIX_FN, `print(eval_postfix(${JSON.stringify(PF)}))`));
const vPostfix = table(
  ['Token', 'Action', 'Stack after'],
  pfRows.map((r) => [ic(r[0]), r[1], ic(r[2])]),
  `Trace table run in Python for the postfix expression ${PF}: 4 and 5 are pushed, plus replaces them with 9, 2 is pushed, and times replaces 9 and 2 with ${PF_VALUE}`,
  `Value: ${PF_VALUE}. Postfix writes the operator after its operands.`,
);
const BOARD = code(
  'def push_cities(towns, stk):',
  '    for name, pin in towns.items():',
  '        if pin % 2 == 1 and len(name) > 4:',
  '            stk.append(name)',
  '',
  'def pop_cities(stk):',
  '    while stk != []:',
  '        print(stk.pop(), end=" ")',
  '    print("| None left")',
  '',
  'towns = {"Shimla": 171001, "Ooty": 643001, "Kohima": 797002, "Madurai": 625003, "Bhuj": 370001}',
  'S = []',
  'push_cities(towns, S)',
  'print(S)',
  'pop_cities(S)',
);
const BOARD_OUT = pyOut(BOARD);
const vBoardTable = table(
  ['Town', 'PIN odd?', 'More than 4 letters?', 'Pushed?'],
  rowsOf(code('import json', 'towns = {"Shimla": 171001, "Ooty": 643001, "Kohima": 797002, "Madurai": 625003, "Bhuj": 370001}', 'print(json.dumps([[n, "yes" if p % 2 == 1 else "no", "yes" if len(n) > 4 else "no", "yes" if p % 2 == 1 and len(n) > 4 else "no"] for n, p in towns.items()]))')),
  'Table run in Python deciding which towns are pushed: Shimla and Madurai have odd PIN codes and more than four letters, so only they are pushed; Ooty and Bhuj are too short and Kohima has an even PIN',
  'Imagined task; PIN codes used only as sample numbers.',
);
const BIN_DEMO = code('n, stk = 11, []', 'while n > 0:', '    stk.append(n % 2)', '    n //= 2', 'print(stk)', 'print("".join(str(stk.pop()) for _ in range(len(stk))))');
const BIN_OUT = pyOut(BIN_DEMO).split('\n');
const vBinary = table(
  ['Stack after pushing remainders', 'Popped in order'],
  [[ic(BIN_OUT[0]), ic(BIN_OUT[1])]],
  `Table from Python for converting 11 to binary: the remainders pushed are ${BIN_OUT[0]} and popping them gives ${BIN_OUT[1]}`,
);
const vPattern = flow(
  'LR',
  ['Read the condition in the question', 'push: loop over the data, test, append', 'pop: loop while the stack is not empty', 'Print each popped item', 'Print the empty message at the end'],
  'Flow of the board-style pattern: read the condition, write a push function that loops, tests and appends, write a pop function that loops while the stack is not empty, prints each popped item and finally prints the empty message',
  'The two-function pattern',
);
const vSummary2 = table(
  ['Application', 'Key step'],
  [
    ['Reverse', 'Push all, pop all'],
    ['Brackets', 'Push opening; pop and compare on closing; empty at the end'],
    ['Calls', 'Latest call returns first'],
    ['Undo / Back', 'Pop the latest action or page'],
    ['Postfix', 'Operator pops two operands, pushes the result'],
    ['Board programs', 'push(condition) + pop(until empty, then message)'],
  ],
  'Summary table of applications: reverse by pushing and popping everything; brackets by pushing opening ones and comparing on closing ones; calls return latest first; undo and back pop the latest; postfix operators pop two operands and push the result; board programs pair a conditional push with a pop until empty',
);
const vTips2 = table(
  ['In the question', 'Make sure you'],
  [
    ['"push … meeting a condition"', 'Loop over the given list/dictionary and test before `append`'],
    ['"pop and display"', 'Loop until empty, then print the stated message'],
    ['A dictionary', 'Use keys or `items()` as asked (key vs value)'],
    ['Postfix', 'Pop the right operand first: `b = pop()`, then `a = pop()`'],
    ['Output', 'Popped items come out in **reverse** order of pushing'],
  ],
  'Table of exam tips: loop and test before appending, pop until empty then print the message, use keys or items as the question asks, pop the right operand first in postfix, and remember popped items come out in reverse order',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Data Structure: Stack — Part 1: The Stack and Its Operations',
  goals: [
    'Explain a stack as a last in, first out data structure with one open end, the top',
    'Perform push, pop and peek, and test for an empty stack, using a Python list',
    'Detect underflow and explain overflow for fixed-size stacks',
    'Trace the contents of a stack after a sequence of operations',
  ],
  slides: [
    sl('title', 'Data Structure: Stack', {
      b: 'Part 1 — what a **stack** is, its operations, and how to build one with a **Python list**.',
      v: vRoute1,
      n: 'Think of a pile of plates in the school canteen. A new plate goes on top, and the next person takes the plate on top. Nobody pulls a plate from the bottom. This simple rule, the last one in is the first one out, gives us one of the most useful data structures in programming: the stack. In this part we learn its operations and build it with a Python list.',
    }),
    sl('concept', 'Data structures', {
      b: 'A **data structure** organises data so that it can be stored and used efficiently. Each structure has its own rules for adding and removing items.',
      v: vStructures,
      n: 'A data structure is a planned way of organising data. You already know lists and dictionaries. A list lets you reach any position by its index. A dictionary finds a value by its key. A stack is stricter: items are added and removed at one end only. A queue, which you will meet later, adds at one end and removes from the other.',
    }),
    sl('diagram', 'A stack is LIFO', {
      b: 'In a **stack**, insertion and deletion happen at one end, the **top**. The item added **last** is removed **first**: **LIFO** (Last In, First Out).',
      v: vPlates,
      n: 'Here is a stack changing over six operations, worked out by running them in Python. Ten, twenty and thirty are pushed, each landing on top. A pop removes thirty, the item pushed last. Then forty is pushed, and peek simply reads the top item, forty, without removing it. Notice that ten, the first item in, is still waiting at the bottom.',
    }),
    sl('concept', 'Stack operations', {
      b: 'Five operations, and the list code for each.',
      v: vOps,
      n: 'These are the operations every stack offers. Push adds an item at the top, and pop removes and returns the top item. Peek, also called top, only reads the top item. Is empty tells us whether there is anything to pop, and size counts the items. With a Python list, the end of the list is the top, so append pushes and pop with no argument pops.',
    }),
    sl('check', 'Quick check: the push method', {
      b: 'Choose the correct option.',
      chk: 'm_push_method',
      n: 'Which list method adds a single item at the end of a list? That end is the top of our stack.',
    }),
    sl('example', 'Worked example 1: tracing a stack', {
      b: 'Start with an empty stack and apply: push A, push B, pop, push C, push D, pop, pop. Record the stack after each step.',
      bl: [
        'Step 1 — Write the stack as a list, **bottom on the left, top on the right**.',
        'Step 2 — Push: add on the right. Pop: remove the rightmost item and note it.',
        'Step 3 — Check: the popped items come out in reverse order of their pushes.',
      ],
      v: vTrace1,
      n: 'Let us trace this together. Write the stack as a list, with the bottom on the left and the top on the right. A and B go in. The pop removes B, the top. C and D go in on top of A. The next pop removes D, and the last pop removes C. Only A is left. The table was produced by running these steps in Python.',
    }),
    sl('concept', 'A stack with a Python list', {
      b: `The standard functions used in this chapter:\n\n${F(STACK_FNS)}`,
      v: vImplOut,
      n: 'Here are the four functions we will use throughout. Push appends to the list. Pop first checks whether the list is empty, and only then calls the list pop method. Peek returns the last item, or None for an empty stack. Is empty compares the list with an empty list. The table shows what happens when we push two books and pop three times: the third pop safely reports underflow.',
    }),
    sl('check', 'Quick check: predict the stack', {
      b: 'Predict the output, then check.',
      chk: 'co_seq',
      n: 'Trace each line, keeping the top on the right. Remember that a pop straight after a push removes the item you just added.',
    }),
    sl('concept', 'Underflow and overflow', {
      b: 'Two error conditions of a stack.',
      v: vUnderOver,
      n: 'Underflow means trying to pop or peek when the stack is empty. With a Python list this is a real danger, because the list pop method raises an index error on an empty list, so every pop function must check first. Overflow means pushing onto a stack that is already full. It applies to stacks of fixed size. A Python list simply grows, so in our programs overflow does not normally occur.',
    }),
    sl('two-column', 'Unsafe and safe pop', {
      cols: [
        `**Unsafe**\n\n${F('orders = []', 'orders.pop()')}\n\nStops with ${ic(ERR_EMPTY)}.`,
        `**Safe**\n\n${F(SAFE_POP)}\n\nOutput: ${ic(pyOut(SAFE_POP))}`,
      ],
      v: vPushPopFlow,
      n: 'On the left, pop is called on an empty list and the program stops with an index error. On the right, the function tests for an empty stack first and returns the message underflow instead. The flowchart shows the order of the steps: test, report and stop, or pop and return. Always test before you pop.',
    }),
    sl('example', 'Worked example 2: displaying a stack', {
      b: `Display the stack from the **top** down:\n\n${F(DISP_RUN)}\n\nOutput:\n\n${F(pyOut(DISP_RUN))}`,
      v: vDisplay,
      n: 'A display function must show the top first. The top is at the last index, which is the length minus one, so the loop counts down from there to zero. For the stack three, eight, five, it prints five, then eight, then three. If the stack is empty, the function prints a message instead. The output shown was produced by running the code.',
    }),
    sl('check', 'Quick check: underflow and overflow', {
      b: 'Fill in the blanks.',
      chk: 'fb_underflow',
      n: 'One condition happens when the stack is empty, the other when a fixed-size stack is full.',
    }),
    sl('concept', 'Peek and is empty', {
      b: `Using the functions above with \`s = [6, 2]\`:\n\n${F('print(peek(s), len(s))', 'print(pop(s), len(s))', 'print(is_empty(s), is_empty([]))')}`,
      v: vPeek,
      n: 'Peek and pop both look at the top, but only pop changes the stack. In this run, peek reads two and the size stays two. Pop then removes two, and the size drops to one. Is empty is false while one item remains, and true for a new empty list. These small functions keep the main program clear and safe.',
    }),
    sl('check', 'Quick check: writing peek', {
      b: 'Choose the correct option.',
      chk: 'm_peek_code',
      n: 'Peek must read the top item without changing the stack.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: a stack is last in, first out, with one open end called the top. In Python, append pushes and pop removes the top, which is the end of the list. Peek reads index minus one without removing anything. Always check for an empty stack before popping. Overflow only matters for a fixed capacity, and a display function prints from the top down.',
    }),
    sl('exam-tips', 'Exam tips', {
      b: 'Write every stack as a list with the **top on the right**, and test for an empty stack **before** `pop()`.',
      v: vTips1,
      n: 'A few habits earn easy marks. Lists have no push method, so always use append. Check for an empty stack before every pop, or the program stops with an index error. When asked to display a stack, start from the top. And keep the difference clear: peek reads the top item, pop removes it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Data Structure: Stack — Part 2: Applications and Board-Style Programs',
  goals: [
    'Use a stack to reverse data, check brackets and evaluate postfix expressions',
    'Explain how the call stack, undo and back buttons follow LIFO',
    'Write push and pop functions that move items meeting a condition into a stack and display them',
  ],
  slides: [
    sl('title', 'Stacks at work', {
      b: 'Part 2 — **applications** of stacks and the **push/pop programs** asked in board papers.',
      v: vRoute2,
      n: 'Stacks are everywhere in computing. Your browser uses one for the back button, your editor for undo, and Python itself for function calls. In this part we see why last in, first out suits each of these tasks, and then we practise the push and pop programs that appear in almost every board paper.',
    }),
    sl('concept', 'Where stacks are used', {
      b: 'Whenever the **most recent** item must be handled **first**, a stack fits.',
      v: vApps,
      n: 'Here are five common uses. To reverse text, push every character and pop them all. To check brackets, push each opening bracket and match it when its closing partner arrives. Python keeps active function calls on a stack. Undo and back buttons pop the latest action or page. And postfix expressions are evaluated by pushing numbers and letting each operator use the two latest ones.',
    }),
    sl('diagram', 'Reversing with a stack', {
      b: `Push every character of a word, then pop them all:\n\n${F('stk = []', `for ch in "${REV_WORD}":`, '    stk.append(ch)', 'rev = ""', 'while stk:', '    rev += stk.pop()', 'print(rev)')}`,
      v: vReverse,
      n: 'Reversing is the simplest application. The letters of the word Goa are pushed in order, so the last letter sits on top. Popping them one by one brings them out in the opposite order, and joining them gives the word reversed. The same idea reverses a list of numbers or the digits of a number.',
    }),
    sl('check', 'Quick check: reverse a city name', {
      b: 'Predict the output, then check.',
      chk: 'co_reverse_city',
      n: 'Each pop takes the last letter remaining. Also think about how many items are left at the end.',
    }),
    sl('concept', 'Bracket matching', {
      b: `Rule: push every **opening** bracket; for a **closing** bracket, pop and compare. The brackets are balanced if every pair matches **and** the stack is empty at the end.\n\nTrace for \`${BR_TEXT}\`:`,
      v: vBrackets,
      n: 'Compilers and calculators check brackets with a stack. Each opening bracket is pushed. When a closing bracket arrives, the top of the stack must be its matching opening bracket, so we pop and compare. At the end the stack must be empty. In this trace every closing bracket finds its partner on top, and nothing is left over, so the expression is balanced.',
    }),
    sl('example', 'Worked example 1: an unbalanced expression', {
      b: `Check \`${BAD_TEXT}\` with the function:\n\n${F(BAL_FN)}`,
      v: vBadTrace,
      n: 'Now an unbalanced case. The round bracket and the square bracket are pushed. When the closing round bracket is read, the top of the stack is a square bracket, which does not match, so the function stops and returns false. Notice that the count of brackets is equal; it is the order that is wrong, and only a stack catches that.',
    }),
    sl('check', 'Quick check: which is balanced?', {
      b: 'Choose the correct option.',
      chk: 'm_bracket',
      n: 'Trace each option with a stack in your head: push openings, pop on closings, and check that the stack ends empty.',
    }),
    sl('concept', 'Function calls use a stack', {
      b: `When a function calls another, the caller waits on the **call stack**:\n\n${F(CALL_DEMO)}\n\nOutput:\n\n${F(pyOut(CALL_DEMO))}`,
      v: vCalls,
      n: 'Python itself uses a stack for function calls. When the main program calls plot cost, that call is pushed. Plot cost then calls area, which goes on top. Area must finish first, and it is popped; then plot cost resumes, finishes and is popped, and finally the main program continues with the result. The latest call always finishes first.',
    }),
    sl('diagram', 'Undo and the back button', {
      b: 'Each page opened (or action done) is pushed; **Back** (or **Undo**) pops the latest one.',
      v: vBack,
      n: 'A learning app pushes every page you open: home, maths, videos and quiz. Pressing back pops quiz, and the new top, videos, is shown. Undo in an editor works the same way with actions instead of pages. In both cases the most recent item must be handled first, which is exactly what a stack gives us.',
    }),
    sl('check', 'Quick check: the back button', {
      b: 'Choose the correct option.',
      chk: 'm_browser_back',
      n: 'Each back press removes the page on screen. Count the pops carefully.',
    }),
    sl('concept', 'Evaluating postfix expressions', {
      b: `In **postfix** the operator comes after its operands: \`${PF}\` means (4 + 5) * 2. Push numbers; an operator pops two, applies itself and pushes the result.`,
      v: vPostfix,
      n: 'In postfix notation the operator is written after its two operands, so no brackets are needed. To evaluate it, read the tokens from left to right. Push every number. When an operator arrives, pop two numbers, apply the operator and push the result. At the end one number is left, and that is the value. Here the answer is eighteen.',
    }),
    sl('example', 'Worked example 2: a board-style push and pop', {
      b: `Push the names of towns whose PIN code is **odd** and whose name has **more than 4 letters**, then pop and display them.\n\n${F(BOARD)}\n\nOutput:\n\n${F(BOARD_OUT)}`,
      v: vBoardTable,
      n: 'This is the pattern board papers love. The push function loops over the dictionary and appends only the names that pass both tests. The table shows the decision for each imagined town: only Shimla and Madurai qualify. The pop function then pops until the stack is empty, so the names come out in reverse order, followed by the closing message.',
    }),
    sl('two-column', 'Decimal to binary with a stack', {
      cols: [
        `${F(BIN_DEMO)}`,
        `Output:\n\n${F(pyOut(BIN_DEMO))}\n\nRemainders are found **last digit first**; popping reverses them.`,
      ],
      v: vBinary,
      n: 'Converting a number to binary uses the same reversing idea. Divide by two repeatedly and push each remainder. The remainders appear from the last binary digit to the first, so popping them all gives the digits in the right order. For eleven, the remainders one, one, zero, one come out as one zero one one.',
    }),
    sl('concept', 'The two-function pattern', {
      b: 'Most board questions ask for a **push** function with a condition and a **pop** function that displays until the stack is empty.',
      v: vPattern,
      n: 'Here is a plan you can use for any such question. First underline the condition. The push function loops over the given list or dictionary, tests each item and appends only those that pass. The pop function loops while the stack is not empty, printing each popped item, and finally prints the message the question asks for, such as stack empty.',
    }),
    sl('check', 'Quick check: steps of a safe pop', {
      b: 'Put the steps in order.',
      chk: 'ord_pop_fn',
      n: 'Think about what must happen before the list pop method is called.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: a stack reverses anything pushed into it. Bracket checking pushes opening brackets and matches them on closing. Function calls, undo and back all handle the most recent item first. Postfix evaluation lets each operator use the two latest operands. And board programs pair a push with a condition and a pop that runs until the stack is empty.',
    }),
    sl('exam-tips', 'Exam tips', {
      b: 'In output questions, popped items appear in **reverse** order of pushing. In programs, follow the exact condition and message in the question.',
      v: vTips2,
      n: 'In programming questions, read the condition twice and test it before appending. Print exactly the message the question asks for when the stack becomes empty. With a dictionary, check whether keys or values are to be pushed. In postfix, the first pop gives the right-hand operand. And in output questions, remember that items come off a stack in reverse order.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Data Structure: Stack — Notes',
  sections: [
    {
      h: '1. Data structures and the stack',
      t: 1,
      b: 'A **data structure** is a way of organising data so it can be used efficiently (list, dictionary, stack, queue).\n\nA **stack** is a linear structure with **one open end, the top**. Items are added (**push**) and removed (**pop**) only at the top, so the item added last is removed first: **LIFO, Last In First Out**. Everyday examples: a pile of plates or books, bangles on a wrist, the undo history of an editor.',
      terms: [
        ['Data structure', 'An organised way of storing data so that it can be accessed and changed efficiently.'],
        ['Stack', 'A linear data structure where insertion and deletion happen at one end, the top.'],
        ['LIFO', 'Last In, First Out: the most recently added item is removed first.'],
      ],
      v: vStructures,
      vs: [vPlates],
    },
    {
      h: '2. Operations and a list implementation',
      t: 1,
      b: `| Operation | List code |\n|---|---|\n| Push x | \`stk.append(x)\` |\n| Pop | \`stk.pop()\` (removes and returns the last item) |\n| Peek / top | \`stk[-1]\` |\n| Is empty | \`stk == []\` or \`len(stk) == 0\` |\n| Size | \`len(stk)\` |\n\nThe **end of the list is the top**. Standard functions:\n\n${F(STACK_FNS)}\n\nRunning \`push\` twice and \`pop\` three times on a list of books gives ${ic(IMPL_OUT.split('\n')[0])}: the third pop reports underflow.`,
      terms: [
        ['Push', 'Adding an item at the top of the stack (append for a list).'],
        ['Pop', 'Removing and returning the top item (list pop with no argument).'],
        ['Peek', 'Reading the top item without removing it (index -1).'],
      ],
      v: vOps,
      vs: [vImplOut],
    },
    {
      h: '3. Underflow and overflow',
      t: 1,
      b: `**Underflow:** pop or peek on an **empty** stack. With a list, \`pop()\` on \`[]\` stops the program with ${ic(ERR_EMPTY)}, so test \`if stk == []:\` first and report "Underflow" (then **return**, so the pop line is not reached).\n\n**Overflow:** push on a **full** stack of fixed capacity, tested with \`len(stk) == capacity\`. A Python list grows as needed, so overflow does not occur in normal list programs; it matters when a size limit is set (a tray holder for four trays, the last 20 messages).`,
      terms: [
        ['Underflow', 'An attempt to pop or peek from an empty stack.'],
        ['Overflow', 'An attempt to push onto a full stack of fixed size.'],
      ],
      v: vUnderOver,
      vs: [vPushPopFlow],
    },
    {
      h: '4. Displaying and tracing a stack',
      t: 1,
      b: `Display from the **top** down by counting the index down:\n\n${F(DISPLAY_FN)}\n\nFor \`[3, 8, 5]\` it prints 5, 8 and 3 on separate lines.\n\n**Tracing:** write the stack as a list with the top on the right; push adds on the right, pop removes the rightmost item and returns it. Popped items always come out in reverse order of their pushes.`,
      terms: [['Trace (dry run)', 'Following a program by hand and writing the stack after every operation.']],
      v: vDisplay,
      vs: [vTrace1],
    },
    {
      h: '5. Applications',
      t: 1,
      b: `- **Reversing** text, a list or the digits of a number: push all, pop all.\n- **Bracket matching:** push opening brackets; for a closing one pop and compare; the stack must be empty at the end.\n- **Function calls:** Python keeps active calls on a call stack; the latest call returns first.\n- **Undo and back buttons:** push each action or page; undo or back pops the latest.\n- **Postfix evaluation:** push numbers; an operator pops the right operand, then the left, and pushes the result. \`${PF}\` evaluates to ${PF_VALUE}.\n- **Decimal to binary:** push remainders of division by 2; popping gives the binary digits (11 gives ${BIN_OUT[1]}).`,
      terms: [
        ['Postfix expression', 'An expression in which each operator follows its two operands, such as 4 5 + for 4 + 5.'],
        ['Call stack', 'The stack Python uses to keep track of functions that have been called but not yet finished.'],
      ],
      v: vApps,
      vs: [vBrackets, vPostfix],
    },
    {
      h: '6. Board-style push and pop programs',
      t: 1,
      b: `A typical question gives a list or dictionary and asks for two functions:\n\n1. **push**: loop over the data, test the stated condition, and \`append\` the items (or keys) that pass.\n2. **pop**: loop while the stack is not empty, pop and display each item, then print the message asked for (such as "Stack Empty").\n\n${F(BOARD)}\n\nOutput:\n\n${F(BOARD_OUT)}`,
      terms: [['Condition', 'The test in the question that decides which items are pushed.']],
      v: vBoardTable,
      vs: [vPattern],
    },
  ],
  tips: '**Common mistakes**\n- Using `stk.push(x)`: lists have no push method; use `append`.\n- Popping without checking for an empty stack (IndexError).\n- Printing a "Underflow" message but not returning, so the pop still runs.\n- Displaying the stack bottom first when the question asks for top first.\n- Forgetting that popped items come out in reverse order.\n- In postfix, popping the operands in the wrong order for `-` and `//`.\n\n**How marks are usually awarded**\n- Output questions: each correct line or value as stated.\n- Error-finding: ½ or 1 mark for each error found and corrected.\n- Push/pop programs (3–5 marks): loop and condition, push, underflow check, pop loop with display, message.\n- Theory: one point per mark, with an example.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a **stack**?', 'A linear data structure where items are added and removed only at one end, the **top**.', 'definition', 1],
  ['**LIFO** stands for', 'Last In, First Out.', 'definition', 1],
  ['Name the two basic stack operations', '**Push** (add at the top) and **pop** (remove from the top).', 'fact', 1],
  ['Push with a Python list', '`stk.append(x)`', 'fact', 1],
  ['Pop with a Python list', '`stk.pop()` — removes and returns the last item.', 'fact', 1],
  ['Peek with a Python list', '`stk[-1]` — reads the top without removing it.', 'fact', 1],
  ['Which end of the list is the top?', 'The **end** (last index), where append and pop work.', 'concept', 1],
  ['Test for an empty stack', '`stk == []` or `len(stk) == 0`.', 'fact', 1],
  ['**Underflow**', 'Popping or peeking an **empty** stack.', 'definition', 1],
  ['**Overflow**', 'Pushing onto a **full** stack of fixed size.', 'definition', 1],
  [ic('[].pop()'), ic(ERR_EMPTY), 'example', 1],
  [ic('stk.push(5)') + ' on a list', ic(pyErr(code('stk = []', 'stk.push(5)'))), 'exam-tip', 1],
  ['Why do list stacks rarely overflow?', 'A Python list **grows** as items are appended.', 'concept', 1],
  ['Peek vs pop', 'Peek **reads** the top; pop **removes** it. Peek leaves the size unchanged.', 'concept', 1],
  ['Display a stack top first', '`for i in range(len(stk) - 1, -1, -1): print(stk[i])`', 'fact', 1],
  ['Push 10, 20, 30 then pop', `Returns ${steps1[3].got}; the stack is ${ic(pyList(steps1[2].stack.slice(0, 2)))}.`, 'example', 1],
  ['Push 1, 2, 3 in order: which pop order is impossible?', '**3 1 2** (after 3, the top is 2).', 'exam-tip', 1],
  ['Reverse a string with a stack', 'Push every character, then pop them all into a new string.', 'concept', 1],
  ['Bracket matching rule', 'Push openings; on a closing bracket pop and compare; the stack must end **empty**.', 'concept', 1],
  [`Is ${ic(BAD_TEXT)} balanced?`, `**No** (${BAD_RESULT}): ) meets [ on top.`, 'example', 1],
  ['Function calls and stacks', 'Python keeps calls on a **call stack**; the latest call finishes first.', 'concept', 1],
  ['Undo and back buttons', 'Push each action or page; undo/back **pops** the latest.', 'concept', 1],
  ['What is a **postfix** expression?', 'One where each operator follows its operands, e.g. `4 5 +`.', 'definition', 1],
  [`Value of ${ic(PF)}`, `**${PF_VALUE}** — (4 + 5) * 2.`, 'example', 1],
  ['Postfix: which operand is popped first?', 'The **right** one: `b = pop()`, then `a = pop()`, push `a op b`.', 'exam-tip', 1],
  ['11 in binary using a stack', `Remainders ${ic(BIN_OUT[0])} popped give ${ic(BIN_OUT[1])}.`, 'example', 1],
  ['Board push function: three parts', 'Loop over the data, test the condition, append.', 'exam-tip', 1],
  ['Board pop function: what to print at the end', 'The exact message asked, e.g. "Stack Empty", after the loop.', 'exam-tip', 1],
  ['Printer jobs: stack or queue?', '**Queue** (FIFO) — jobs should print in arrival order.', 'concept', 1],
  ['After underflow is reported, what must the function do?', '**Return**, so that `pop()` is not called on the empty list.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests (cbse-12-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Data Structure: Stack',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_lifo', 'm_top_after', 'm_dict_push', 'ar_undo'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words (or code) and the 3-mark question in about 60 words (or code).', items: ['s_define', 's_err_pop', 's3_trace'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the output for the data given.', items: [{ attempt: 1, keys: ['l_push_toppers', 'l_books'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_browser'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Data Structure: Stack',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_underflow_def', 'm_overflow_def', 'm_peek_vs_pop', 'm_app_undo', 'm_reverse_word', 'm_pop_empty_err', 'm_not_possible', 'm_postfix', 'ar_overflow_list', 'ar_pop_none'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words (or code) and 3-mark questions in about 60 words (or code).', items: ['s_over_under', 's_apps', { attempt: 1, keys: ['s_err_push', 's_peek_fn'] }, 's3_reverse_fn', { attempt: 1, keys: ['s3_err_display', 's3_list_vs_fixed'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18. Show the output for the data or inputs given.', items: ['l_push_even_words', { attempt: 1, keys: ['l_menu', 'l_balanced'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_undo', 'cb_trays'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-12-computer-science-ch05 only (stack operations push, pop, peek, is-empty and size; implementation with a Python list; underflow and overflow; applications)',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused (D-036)',
    execution: 'every output and stack state in items, slides, notes and flashcards produced by running the code with Python 3 (runPy in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
