// Build CBSE 10 Mathematics ch14 Probability. Run from platform/:
//   npx tsx content/authored/maths/cbse-10-mathematics-ch14/src/build.mjs
// Probabilities quoted in the decks are asserted against enumerated sample spaces (space.mjs).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r, Svg, polar } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { range, die, dice2, coins, deck as cards, bag, isPrime, isSquare, P, tex } from './space.mjs';

setUnit('cbse-10-mathematics-ch14');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example values (asserted)
const must = (p, want, msg) => { if (tex(p) !== want) throw new Error(`worked example ${msg}: got ${tex(p)}, want ${want}`); };
const heads = (s) => s.filter((c) => c === 'H').length;
must(P(die, isPrime), '\\dfrac12', 'prime on a die');
must(P(die, (x) => x > 4), '\\dfrac13', 'greater than 4');
must(P(die, (x) => x % 7 === 0), '0', 'multiple of 7');
must(P(die, (x) => x !== 6), '\\dfrac56', 'not 6');
must(P(range(1, 20), (x) => x % 3 !== 0), '\\dfrac{7}{10}', 'not multiple of 3');
const B = bag({ red: 5, blue: 3, green: 2 });
must(P(B, (b) => b === 'red'), '\\dfrac12', 'red'); must(P(B, (b) => b !== 'green'), '\\dfrac45', 'not green'); must(P(B, (b) => b === 'blue'), '\\dfrac{3}{10}', 'blue'); must(P(B, (b) => b === 'green'), '\\dfrac15', 'green');
must(P(coins(2), (s) => heads(s) >= 1), '\\dfrac34', 'at least one head'); must(P(coins(3), (s) => heads(s) === 2), '\\dfrac38', 'two heads of three');
must(P(dice2, ([a, b]) => a + b === 8), '\\dfrac{5}{36}', 'sum 8'); must(P(dice2, ([a, b]) => a === b), '\\dfrac16', 'doublet'); must(P(dice2, ([a, b]) => a + b >= 10), '\\dfrac16', 'sum ≥ 10');
must(P(dice2, ([a, b]) => (a * b) % 2 === 0), '\\dfrac34', 'product even'); must(P(dice2, ([a, b]) => isSquare(a * b)), '\\dfrac29', 'product square');
must(P(cards, (c) => c.colour === 'red' && c.rank === 'K'), '\\dfrac{1}{26}', 'red king'); must(P(cards, (c) => c.face), '\\dfrac{3}{13}', 'face'); must(P(cards, (c) => c.suit !== 'spades'), '\\dfrac34', 'not spade'); must(P(cards, (c) => c.rank === 'A' && c.suit === 'hearts'), '\\dfrac{1}{52}', 'ace of hearts');
const noJacks = cards.filter((c) => c.rank !== 'J');
must(P(noJacks, (c) => c.suit === 'hearts'), '\\dfrac14', 'heart without jacks'); must(P(noJacks, (c) => c.face), '\\dfrac16', 'face without jacks');
must(P(range(1, 50), isSquare), '\\dfrac{7}{50}', 'square up to 50'); must(P(range(1, 50), (x) => x % 12 === 0), '\\dfrac{2}{25}', 'multiple of 12');

// ---------------------------------------------------------------- figures
const scale = (() => {
  const S = new Svg(11, 3), y = 1.6, x0 = 1.0, x1 = 10.0;
  S.line([x0, y], [x1, y], { sw: 2.5 });
  const marks = [[0, '0', 'impossible', 'a 7 on a die'], [1 / 6, '1/6', 'unlikely', 'a 6 on a die'], [0.5, '1/2', 'even chance', 'head on a coin'], [5 / 6, '5/6', 'likely', 'not a 6'], [1, '1', 'certain', 'a number ≤ 6']];
  marks.forEach(([p, lab, word, ex], i) => {
    const x = x0 + p * (x1 - x0), up = i % 2 === 1;
    S.line([x, y - 0.18], [x, y + 0.18], { sw: 2 }).text([x, up ? y + 0.5 : y - 0.45], lab, { size: 13, bold: true }).text([x, up ? y + 0.9 : y - 0.85], word, { size: 11 }).text([x, up ? y + 1.25 : y - 1.2], ex, { size: 10, muted: true });
  });
  return S.visual('A probability scale from 0 to 1. At 0, impossible, such as a 7 on a die; at one sixth, unlikely, a 6 on a die; at one half, an even chance, a head on a coin; at five sixths, likely, not getting a 6; at 1, certain, a number up to 6 on a die.', 'Every probability lies between $0$ (impossible) and $1$ (certain).');
})();
const spinners = (() => {
  const S = new Svg(8.4, 4), c1 = [2, 2], c2 = [6.4, 2], R = 1.6;
  const fills = ['var(--diagram-blue)', 'var(--diagram-green)', 'var(--diagram-yellow)', 'var(--diagram-red)'];
  [0, 90, 180, 270].forEach((a, i) => S.sector(c1, R, a, a + 90, { fill: fills[i], sw: 1.2 }));
  [[0, 180], [180, 270], [270, 330], [330, 360]].forEach(([a, b], i) => S.sector(c2, R, a, b, { fill: fills[i], sw: 1.2 }));
  S.line(c1, polar(c1, 1.2, 60), { sw: 2.5 }).line(c2, polar(c2, 1.2, 60), { sw: 2.5 }).dot(c1, 0.09).dot(c2, 0.09);
  S.text([2, 0.15], 'equal sectors', { size: 12 }).text([6.4, 0.15], 'unequal sectors', { size: 12 });
  return S.visual('Two spinners. The left spinner has four equal sectors in four colours, so each colour is equally likely. The right spinner has four unequal sectors, one of them half the circle, so the colours are not equally likely.', 'Left: four equally likely outcomes. Right: four outcomes, not equally likely.');
})();
const bagFig = (() => {
  const S = new Svg(6, 4.2);
  S.path([['M', [0.8, 3.6]], ['L', [1.2, 0.5]], ['L', [4.8, 0.5]], ['L', [5.2, 3.6]]], { sw: 2 });
  const cols = [...Array(5).fill('var(--diagram-red)'), ...Array(3).fill('var(--diagram-blue)'), ...Array(2).fill('var(--diagram-green)')];
  cols.forEach((col, i) => S.circle([1.75 + (i % 5) * 0.62, 1.15 + Math.floor(i / 5) * 0.75], 0.27, { fill: col, sw: 1 }));
  S.text([3, 3.0], '5 red, 3 blue, 2 green', { size: 12 });
  return S.visual('A bag holding ten balls of the same size: five red, three blue and two green.', 'Ten equally likely balls.');
})();
const sampleTable = table(['Experiment', 'Outcomes', 'Number'], [['Toss a coin', 'H, T', '$2$'], ['Throw a die', '$1, 2, 3, 4, 5, 6$', '$6$'], ['Draw a disc numbered $1$–$20$', '$1, 2, \\ldots, 20$', '$20$'], ['Draw a card', '$52$ cards', '$52$']], 'Table of experiments: tossing a coin has 2 outcomes, throwing a die 6, drawing a disc numbered 1 to 20 has 20, and drawing a card from a deck 52.', 'List the outcomes before counting.');
const dieTable = table(['Event (one die)', 'Favourable outcomes', 'Probability'], [['prime number', '$2, 3, 5$', '$\\dfrac36 = \\dfrac12$'], ['greater than $4$', '$5, 6$', '$\\dfrac26 = \\dfrac13$'], ['multiple of $7$', 'none', '$0$'], ['less than $7$', 'all six', '$1$']], 'Table of events for one die: a prime number has favourable outcomes 2, 3 and 5, probability one half; greater than 4 has 5 and 6, one third; a multiple of 7 has none, probability 0; less than 7 has all six, probability 1.', '$P(E) = \\dfrac{\\text{favourable}}{\\text{total}}$.');
const compTable = table(['Event $E$', '$P(E)$', '$P(\\text{not } E)$', 'Sum'], [['a $6$ on a die', '$\\dfrac16$', '$\\dfrac56$', '$1$'], ['multiple of $3$ (discs $1$–$20$)', '$\\dfrac{3}{10}$', '$\\dfrac{7}{10}$', '$1$'], ['rain tomorrow', '$0.08$', '$0.92$', '$1$']], 'Table of complementary events: a 6 on a die has probability one sixth and its complement five sixths; a multiple of 3 among discs 1 to 20 has three tenths and its complement seven tenths; rain tomorrow 0.08 and no rain 0.92; each pair sums to 1.', '$P(E) + P(\\text{not } E) = 1$.');
const bagTable = table(['Ball', 'Number', 'Probability'], [['red', '$5$', '$\\dfrac{5}{10} = \\dfrac12$'], ['blue', '$3$', '$\\dfrac{3}{10}$'], ['green', '$2$', '$\\dfrac{2}{10} = \\dfrac15$'], ['Total', '$10$', '$1$']], 'Table for the bag: red 5 balls, probability one half; blue 3, three tenths; green 2, one fifth; the probabilities add to 1.', 'Probabilities of all elementary events add up to $1$.');
const coinTree = flow('TB', [['s', 'start'], ['h', 'H'], ['t', 'T'], ['hh', 'HH'], ['ht', 'HT'], ['th', 'TH'], ['tt', 'TT'], ['hhh', 'HHH'], ['hht', 'HHT'], ['hth', 'HTH'], ['htt', 'HTT'], ['thh', 'THH'], ['tht', 'THT'], ['tth', 'TTH'], ['ttt', 'TTT']], [['s', 'h', 'coin 1'], ['s', 't'], ['h', 'hh', 'coin 2'], ['h', 'ht'], ['t', 'th'], ['t', 'tt'], ['hh', 'hhh', 'coin 3'], ['hh', 'hht'], ['ht', 'hth'], ['ht', 'htt'], ['th', 'thh'], ['th', 'tht'], ['tt', 'tth'], ['tt', 'ttt']], 'Tree diagram for tossing three coins: each coin branches into heads or tails, giving 2, then 4, then 8 outcomes: HHH, HHT, HTH, HTT, THH, THT, TTH and TTT.', 'Three coins: $2 \\times 2 \\times 2 = 8$ equally likely outcomes.');
const diceGrid = table(['Sum', '$1$', '$2$', '$3$', '$4$', '$5$', '$6$'], die.map((a) => [`$${a}$`, ...die.map((b) => `$${a + b}$`)]), 'Six by six table of sums for two dice: rows give the first die from 1 to 6, columns the second die from 1 to 6, and each cell the sum, from 2 in the top left corner to 12 in the bottom right; each of the 36 cells is equally likely.', 'Two dice: $36$ equally likely outcomes. Sum $7$ appears $6$ times; sums $2$ and $12$ once each.');
const deckTable = table(['Suit', 'Colour', 'Cards', 'Face cards'], [['Spades ♠', 'black', '$13$', 'J, Q, K'], ['Clubs ♣', 'black', '$13$', 'J, Q, K'], ['Hearts ♥', 'red', '$13$', 'J, Q, K'], ['Diamonds ♦', 'red', '$13$', 'J, Q, K'], ['Total', '$26$ red, $26$ black', '$52$', '$12$']], 'Table of a standard deck: four suits of 13 cards each, spades and clubs black, hearts and diamonds red, each with three face cards, the jack, queen and king; in all 52 cards, 26 red, 26 black and 12 face cards. Each suit also has an ace and the numbers 2 to 10.', 'Each suit: A, 2–10, J, Q, K. Aces are not face cards.');
const slipsTable = table(['Slip', 'Correct thinking'], [['"6 or not 6, so $\\frac12$"', 'outcomes must be **equally likely**: $P(6) = \\frac16$'], ['sums $2$–$12$ as $11$ outcomes', 'use the $36$ ordered pairs'], ['"spade or ace" $= 13 + 4$', 'the ace of spades is counted once: $16$'], ['answer $\\frac{6}{4}$', 'a probability is never more than $1$']], 'Table of common slips: treating 6 and not 6 as equally likely; treating the eleven sums of two dice as equally likely; double counting the ace of spades in spade or ace; and an answer greater than 1.', 'Check: equally likely outcomes, no double counting, and $0 \\le P \\le 1$.');
const sum1 = table(['Idea', 'Rule'], [['Theoretical probability', '$P(E) = \\dfrac{\\text{favourable}}{\\text{total}}$, outcomes equally likely'], ['Range', '$0 \\le P(E) \\le 1$'], ['Impossible / sure', '$0$ / $1$'], ['Complement', '$P(\\text{not } E) = 1 - P(E)$'], ['All elementary events', 'probabilities add to $1$']], 'Summary table of part one: theoretical probability is favourable over total for equally likely outcomes; it lies between 0 and 1; impossible events have 0 and sure events 1; the complement is 1 minus P of E; elementary events add to 1.', 'Five rules of probability.');
const sum2 = table(['Experiment', 'Outcomes', 'Tip'], [['Two coins / three coins', '$4$ / $8$', 'list them or draw a tree'], ['Two dice', '$36$', 'use the $6 \\times 6$ table'], ['One card', '$52$', 'suits, colours, face cards'], ['Discs / tickets $a$ to $b$', '$b - a + 1$', 'list multiples, squares, primes'], ['Bag of balls', 'total balls', 'changes when balls are added or removed']], 'Summary table of part two: two coins have 4 outcomes and three coins 8; two dice 36, best seen in a 6 by 6 table; a deck 52; discs from a to b have b minus a plus 1; a bag has as many outcomes as balls, which changes when balls are added or removed.', 'Count equally likely outcomes in every experiment.');

const d1 = deck({
  part: 1,
  title: 'Probability — Part 1: The classical definition',
  goals: ['Describe outcomes, sample spaces and events', 'Recognise equally likely outcomes', 'Find the theoretical probability of an event', 'Use 0 ≤ P(E) ≤ 1 and P(E) + P(not E) = 1'],
  slides: [
    sl('title', 'Probability, Part 1: How likely is it?', { b: 'From "impossible" to "certain", every chance is a number between $0$ and $1$.', v: scale, n: 'Welcome to Probability. Will you get a six on your next throw in Ludo? Will a coin show heads? Probability measures how likely something is, with a number from zero to one. Zero means impossible, one means certain, and one half means an even chance. In this part we learn how to calculate that number.' }),
    sl('concept', 'What you will be able to do', { ul: ['Name the **outcomes** of an experiment', 'Decide whether outcomes are **equally likely**', 'Use $P(E) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}$', 'Know that $0 \\le P(E) \\le 1$', 'Use $P(E) + P(\\text{not } E) = 1$'], n: 'These are your goals for part one. This chapter uses the theoretical, or classical, idea of probability. We do not need to toss a coin a thousand times; we reason from the outcomes, as long as they are equally likely.' }),
    sl('diagram', 'Experiments and outcomes', { b: 'An **experiment** has well-defined **outcomes**. An **event** is a set of outcomes, for example "an even number" when a die is thrown.', v: sampleTable, n: 'Tossing a coin, throwing a die and drawing a card are experiments. Each has a list of possible outcomes: two for a coin, six for a die, fifty two for a deck of cards. An event is any collection of outcomes that we are interested in, like getting an even number, which is the outcomes two, four and six.' }),
    sl('diagram', 'Equally likely outcomes', { b: 'The classical formula works only when every outcome has the **same chance**: a fair coin, a fair die, a well-shuffled deck, balls of the same size.', v: spinners, n: 'Look at the two spinners. On the left, the four sectors are equal, so each colour is equally likely. On the right, the blue sector is half the circle, so blue is far more likely than red. Our formula needs equally likely outcomes. That is why questions say a fair die, a well-shuffled deck, or balls of the same size.' }),
    sl('concept', 'Theoretical probability', { b: 'For equally likely outcomes,', m: ['P(E) = \\frac{\\text{number of outcomes favourable to } E}{\\text{total number of possible outcomes}}'], v: dieTable, n: 'Here is the definition. Count the outcomes that make the event happen, the favourable ones. Divide by the total number of outcomes. For a die, three of the six faces are prime, so the probability of a prime is three sixths, one half. Always reduce the fraction at the end.' }),
    sl('example', 'Worked example 1: one die', { b: 'A fair die is thrown once. Find the probability of getting (a) a prime number (b) a number greater than $4$ (c) a multiple of $7$.', ul: ['**Step 1 —** $6$ equally likely outcomes: $1, 2, 3, 4, 5, 6$.', '**(a)** Primes $2, 3, 5$: $P = \\dfrac36 = \\dfrac12$. (Remember: $1$ is not prime.)', '**(b)** $5, 6$: $P = \\dfrac26 = \\dfrac13$.', '**(c)** No face is a multiple of $7$: $P = 0$, an **impossible** event.'], v: dieTable, n: 'List the six outcomes first. Then count. For primes, be careful: one is not a prime number, so only two, three and five count. Greater than four means five and six only. And no face is a multiple of seven, so that event is impossible, with probability zero. Write each answer as a fraction in its lowest terms.' }),
    sl('check', 'Quick check: one die', { b: 'Count the favourable faces.', chk: 'm04', n: 'Which faces are less than three? How many faces are there in all?' }),
    sl('diagram', 'The probability scale', { b: 'Favourable outcomes are between $0$ and $n$, so $0 \\le P(E) \\le 1$. An **impossible** event has $P = 0$; a **sure** event has $P = 1$.', v: scale, n: 'Since the number of favourable outcomes is between zero and the total, every probability lies between zero and one. Zero means the event can never happen. One means it always happens, like getting a number up to six on a die. An answer greater than one, or negative, is a sure sign of a mistake.' }),
    sl('concept', 'Complementary events', { b: 'The event "not $E$" happens exactly when $E$ does not. Together they cover every outcome, with no overlap:', m: ['P(E) + P(\\text{not } E) = 1'], v: compTable, n: 'Every outcome either belongs to E or to not E, never both. So their probabilities add up to one. This gives a powerful shortcut: when it is easier to count what you do not want, find that probability and subtract it from one. Questions with the words not, at least, or at most often use this idea.' }),
    sl('example', 'Worked example 2: using the complement', { b: '(a) In Ludo, find the probability of **not** getting a $6$. (b) Discs numbered $1$ to $20$ are in a box; find the probability that the disc drawn is **not** a multiple of $3$.', ul: ['**(a)** $P(6) = \\dfrac16$, so $P(\\text{not } 6) = 1 - \\dfrac16 = \\dfrac56$.', '**(b)** Multiples of $3$: $3, 6, 9, 12, 15, 18$ — six.', '$P(\\text{multiple of } 3) = \\dfrac{6}{20} = \\dfrac{3}{10}$.', '$P(\\text{not}) = 1 - \\dfrac{3}{10} = \\dfrac{7}{10}$.'], v: compTable, n: 'In the first part, counting the five faces that are not six is easy too, but the complement is quicker. In the second part, the multiples of three are only six numbers, while the others are fourteen. Count the smaller set and subtract from one: seven tenths. Both ways give the same answer.' }),
    sl('check', 'Quick check: complement', { b: 'Subtract from $1$.', chk: 'm03', n: 'If the probability of an event is zero point three five, what is left for the event not happening?' }),
    sl('example', 'Worked example 3: a bag of balls', { b: 'A bag has $5$ red, $3$ blue and $2$ green balls of the same size. One ball is drawn at random. Find $P(\\text{red})$, $P(\\text{blue})$ and $P(\\text{not green})$.', ul: ['**Step 1 —** Total $= 10$ equally likely balls.', '**Step 2 —** $P(\\text{red}) = \\dfrac{5}{10} = \\dfrac12$; $P(\\text{blue}) = \\dfrac{3}{10}$.', '**Step 3 —** $P(\\text{not green}) = 1 - \\dfrac{2}{10} = \\dfrac45$.', '**Trap —** $\\dfrac53$ (red ÷ blue) is not a probability.'], v: bagFig, n: 'Each ball is equally likely to be picked, because they are the same size. So the total is ten. Red has five of the ten, one half. Blue has three tenths. For not green, either count the eight non-green balls or subtract green from one: four fifths. Never divide one colour by another colour.' }),
    sl('concept', 'All the elementary events add up to 1', { b: 'Each single outcome (or each colour in a bag) is an **elementary event**. Their probabilities always add to $1$.', v: bagTable, n: 'For the bag, red, blue and green have probabilities one half, three tenths and one fifth. Add them: five tenths, three tenths and two tenths make one. This is always true for elementary events, and it is a quick check on your work. If your probabilities add to more than one, something was counted twice.' }),
    sl('check', 'Quick check: impossible event', { b: 'What is the smallest possible probability?', chk: 'm01', n: 'If no outcome is favourable, what is the numerator of the fraction?' }),
    sl('summary', 'Summary', { ul: ['$P(E) = \\dfrac{\\text{favourable}}{\\text{total}}$ — outcomes must be equally likely', '$0 \\le P(E) \\le 1$', 'Impossible event: $0$; sure event: $1$', '$P(\\text{not } E) = 1 - P(E)$', 'Elementary events add up to $1$'], v: sum1, n: 'To sum up part one. List the equally likely outcomes, count the favourable ones, and divide. Every probability is between zero and one. Impossible events have zero and sure events one. The complement rule, one minus P of E, is a quick way to handle not and at least questions.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**1-mark items:** give the fraction in lowest terms', '**2-mark items:** total outcomes 1 + favourable count and answer 1', '**Mistake:** treating unequal outcomes as equally likely', '**Mistake:** counting $1$ as a prime', '**Mistake:** dividing one colour by another', '**Mistake:** an answer above $1$ or below $0$'], n: 'Write the total number of outcomes and the favourable outcomes separately; each line can earn a mark. List them when the numbers are small. Reduce the fraction. Before moving on, check that your answer is between zero and one, and for complements, that the two probabilities add to one.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Probability — Part 2: Coins, dice, cards and discs',
  goals: ['List outcomes for two and three coins', 'Use the 36 outcomes of two dice', 'Find probabilities with a deck of 52 cards', 'Solve problems on numbered discs, tickets and bags'],
  slides: [
    sl('title', 'Probability, Part 2: Coins, dice, cards and discs', { b: 'Two dice give $36$ equally likely outcomes, not $11$.', v: diceGrid, n: 'Welcome to part two. Now the experiments get richer: several coins, two dice, a full deck of cards. The key skill is to list or count the equally likely outcomes correctly. Look at this table of two dice: thirty six cells, each equally likely. The sum seven appears six times, but the sum twelve only once.' }),
    sl('concept', 'What you will be able to do', { ul: ['List outcomes of **two and three coins**', 'Use the **$6 \\times 6$ table** for two dice', 'Use the structure of a **deck of 52 cards**', 'Count **numbered discs** and **bags** correctly', 'Avoid double counting'], n: 'These are your goals for part two. Every question still uses the same formula, favourable over total. What changes is how carefully we count. Tables and tree diagrams make the counting reliable.' }),
    sl('diagram', 'Two and three coins', { b: 'Each coin doubles the number of outcomes: one coin $2$, two coins $4$, three coins $8$. A tree diagram lists them all.', v: coinTree, n: 'With two coins, the outcomes are head head, head tail, tail head and tail tail. Head tail and tail head are different outcomes, because the coins are different. With three coins there are eight outcomes. The tree shows how each coin splits every branch into two. Counting heads is then easy.' }),
    sl('example', 'Worked example 1: coins', { b: '(a) Two coins are tossed: find $P(\\text{at least one head})$. (b) Three coins are tossed: find $P(\\text{exactly two heads})$.', ul: ['**(a)** Outcomes HH, HT, TH, TT. At least one head: HH, HT, TH. $P = \\dfrac34$.', '**Or:** $1 - P(\\text{TT}) = 1 - \\dfrac14 = \\dfrac34$.', '**(b)** Exactly two heads: HHT, HTH, THH. $P = \\dfrac38$.', '**Trap —** "$0, 1, 2$ heads" are not equally likely, so $\\dfrac13$ is wrong.'], v: coinTree, n: 'At least one head means one or two heads, which is everything except tail tail. So the complement gives three quarters quickly. For three coins, read the tree: three outcomes have exactly two heads, out of eight. A common trap is to think zero, one and two heads are equally likely. They are not.' }),
    sl('check', 'Quick check: two coins', { b: 'List all four outcomes.', chk: 'm06', n: 'Write the four outcomes. Which of them contain at least one tail?' }),
    sl('diagram', 'Two dice: the 6 by 6 table', { b: 'Each of the $6$ results of the first die pairs with each of the $6$ of the second: $36$ equally likely ordered pairs. $(2, 5)$ and $(5, 2)$ are different outcomes.', v: diceGrid, n: 'For two dice, use a six by six table. Rows are the first die, columns the second. Each cell is one outcome, and all thirty six are equally likely. Notice that two then five and five then two are different cells. Fill in the sums, or the products, and simply count the cells you need.' }),
    sl('example', 'Worked example 2: sums of two dice', { b: 'Two dice are thrown. Find the probability that (a) the sum is $8$ (b) both show the same number (c) the sum is at least $10$.', ul: ['**(a)** $(2,6), (3,5), (4,4), (5,3), (6,2)$: $P = \\dfrac{5}{36}$.', '**(b)** Doublets $(1,1), \\ldots, (6,6)$: $P = \\dfrac{6}{36} = \\dfrac16$.', '**(c)** Sums $10, 11, 12$: $3 + 2 + 1 = 6$ outcomes: $P = \\dfrac16$.', '**Check —** In the table, sum $8$ lies on one diagonal of $5$ cells.'], v: diceGrid, n: 'Use the table. The sum eight appears on a diagonal of five cells, so five thirty-sixths. Doublets are the six cells on the main diagonal, one sixth. For at least ten, count sums ten, eleven and twelve: three, two and one cells, six in all, so again one sixth.' }),
    sl('example', 'Worked example 3: products of two dice', { b: 'Two dice are thrown. Find the probability that the product of the numbers is (a) even (b) a perfect square.', ul: ['**(a)** The product is odd only if both are odd: $3 \\times 3 = 9$ outcomes. $P(\\text{even}) = 1 - \\dfrac{9}{36} = \\dfrac34$.', '**(b)** Squares: $1$ $(1,1)$; $4$ $(1,4), (4,1), (2,2)$; $9$ $(3,3)$; $16$ $(4,4)$; $25$ $(5,5)$; $36$ $(6,6)$.', 'That is $8$ outcomes: $P = \\dfrac{8}{36} = \\dfrac29$.', '**Tip —** Use the complement when the "bad" case is easier.'], v: table(['Product square', 'Outcomes'], [['$1$', '$(1,1)$'], ['$4$', '$(1,4), (4,1), (2,2)$'], ['$9$', '$(3,3)$'], ['$16, 25, 36$', '$(4,4), (5,5), (6,6)$']], 'Table of products of two dice that are perfect squares: 1 from one pair, 4 from three pairs, 9 from one pair, and 16, 25 and 36 from one pair each, eight outcomes in all.', '$8$ of $36$ products are perfect squares.'), n: 'For an even product, it is easier to count the odd products: both dice must be odd, three choices each, nine outcomes. So the even product has probability one minus nine thirty-sixths, three quarters. For perfect squares, list them carefully: four can come from one and four, four and one, or two and two. Eight outcomes in all.' }),
    sl('check', 'Quick check: two dice', { b: 'Count cells in the $6 \\times 6$ table.', chk: 'm11', n: 'How many cells in the table have the sum seven? How many cells are there in all?' }),
    sl('diagram', 'A deck of 52 cards', { b: '$4$ suits of $13$: spades and clubs (black), hearts and diamonds (red). Each suit: ace, $2$–$10$, jack, queen, king. **Face cards:** J, Q, K — $12$ in all.', v: deckTable, n: 'Know the deck well. Four suits of thirteen cards. Two suits are black and two are red, so twenty six of each colour. Each suit has an ace, the numbers two to ten, and three face cards: jack, queen and king. So there are twelve face cards, four of each rank, and four aces. Aces are not face cards.' }),
    sl('example', 'Worked example 4: one card', { b: 'A card is drawn from a well-shuffled deck. Find the probability that it is (a) a red king (b) a face card (c) not a spade (d) the ace of hearts.', ul: ['**(a)** $2$ red kings: $\\dfrac{2}{52} = \\dfrac{1}{26}$.', '**(b)** $12$ face cards: $\\dfrac{12}{52} = \\dfrac{3}{13}$.', '**(c)** $52 - 13 = 39$: $\\dfrac{39}{52} = \\dfrac34$.', '**(d)** Only one: $\\dfrac{1}{52}$.'], v: deckTable, n: 'Use the structure of the deck. There are two red kings, the king of hearts and the king of diamonds. Twelve face cards. Not a spade means any of the other thirty nine cards, three quarters. And the ace of hearts is a single card, one fifty-second. Always reduce: twelve fifty-seconds is three thirteenths.' }),
    sl('example', 'Worked example 5: cards removed', { b: 'All four jacks are removed from a deck, and a card is drawn from the rest. Find the probability that it is (a) a heart (b) a face card.', ul: ['**Step 1 —** $52 - 4 = 48$ cards remain: the new total.', '**(a)** Hearts left: $13 - 1 = 12$: $\\dfrac{12}{48} = \\dfrac14$.', '**(b)** Face cards left: queens and kings, $8$: $\\dfrac{8}{48} = \\dfrac16$.', '**Trap —** keeping the total as $52$.'], v: deckTable, n: 'When cards are removed, the total changes first: forty eight cards are left. Then count what remains. One jack of hearts has gone, so twelve hearts remain: one quarter. The face cards left are the four queens and four kings, eight in all: one sixth. Keeping fifty two as the total is the classic mistake.' }),
    sl('check', 'Quick check: cards', { b: 'Use the counts in the deck table.', chk: 'm08', n: 'How many face cards are there? Are aces face cards?' }),
    sl('example', 'Worked example 6: numbered discs', { b: 'Discs numbered $1$ to $50$ are in a box. One is drawn at random. Find the probability that its number is (a) a perfect square (b) divisible by both $4$ and $6$.', ul: ['**(a)** $1, 4, 9, 16, 25, 36, 49$: $7$ numbers. $P = \\dfrac{7}{50}$.', '**(b)** Divisible by both $4$ and $6$ means divisible by their LCM, $12$: $12, 24, 36, 48$.', '$P = \\dfrac{4}{50} = \\dfrac{2}{25}$.', '**Tip —** "Both" means the common multiples, not all multiples of $4$ and of $6$.'], v: table(['Event', 'Numbers', 'Count'], [['perfect square', '$1, 4, 9, 16, 25, 36, 49$', '$7$'], ['divisible by $4$ and $6$', '$12, 24, 36, 48$', '$4$']], 'Table for discs 1 to 50: the perfect squares are 1, 4, 9, 16, 25, 36 and 49, seven numbers; the numbers divisible by both 4 and 6 are the multiples of 12, namely 12, 24, 36 and 48, four numbers.', 'List the favourable numbers explicitly.'), n: 'For numbered discs, list the favourable numbers. There are seven perfect squares up to fifty. Divisible by both four and six means divisible by twelve, the lowest common multiple, so twelve, twenty four, thirty six and forty eight. That is four out of fifty, two twenty-fifths.' }),
    sl('diagram', 'Common slips and how to avoid them', { b: 'Most lost marks come from counting, not from the formula.', v: slipsTable, n: 'Here are the slips examiners see most often. Treating outcomes that are not equally likely as if they were. Counting the eleven sums of two dice instead of thirty six pairs. Counting a card twice in an or question, like the ace of spades in spade or ace. And answers bigger than one, which can never be probabilities.' }),
    sl('summary', 'Summary', { ul: ['Two coins: $4$ outcomes; three coins: $8$ — draw a tree', 'Two dice: $36$ ordered pairs — use the $6 \\times 6$ table', 'Deck: $52$ cards, $26$ red, $12$ face cards, $4$ aces', 'Removed cards or added balls: change the total first', '"Or": count each outcome once; "both": common outcomes only'], v: sum2, n: 'To sum up part two. Coins double the outcomes each time, and two dice give thirty six ordered pairs. Know the deck: fifty two cards, twenty six of each colour, twelve face cards. When cards are removed or balls added, update the total first. And in or questions, never count an outcome twice.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**3-mark items:** sample space or total 1 + each part with favourable count 1', '**Show** the favourable outcomes as a list when there are few', '**Mistake:** $(2, 5)$ and $(5, 2)$ counted as one outcome', '**Mistake:** total unchanged after cards are removed', '**Mistake:** "spade or ace" counted as $17$', '**Mistake:** fractions not in lowest terms'], n: 'In longer questions, state the total number of outcomes once, clearly. For each part, write the favourable outcomes or their count, then the probability in lowest terms. Lists are worth the time when the numbers are small. Keep the classic slips in mind: ordered pairs, changed totals, and double counting.' }),
  ],
});

const notes = {
  unit: 'cbse-10-mathematics-ch14', version: 1, title: 'Probability — chapter notes', language: 'en',
  sections: [
    { heading: '1. Experiments, outcomes and events', body_md: r`An **experiment** (tossing a coin, throwing a die, drawing a card) has a set of possible **outcomes**. An **event** is a collection of outcomes, e.g. "an even number" $= \{2, 4, 6\}$ for a die. An **elementary event** has exactly one outcome.

Outcomes are **equally likely** when each has the same chance: a fair coin or die, a well-shuffled deck, balls of the same size drawn without looking. The classical definition of probability needs equally likely outcomes.`, key_terms: [{ term: 'Outcome', definition_md: 'A possible result of an experiment.' }, { term: 'Event', definition_md: 'A collection of outcomes of an experiment.' }, { term: 'Equally likely', definition_md: 'Every outcome has the same chance of occurring.' }], formulas: [], visual: sampleTable, visuals: [spinners], topic_ids: [topic(1)] },
    { heading: '2. Theoretical (classical) probability', body_md: r`For an experiment with equally likely outcomes,

$$P(E) = \frac{\text{number of outcomes favourable to } E}{\text{total number of possible outcomes}}.$$

- $0 \le P(E) \le 1$; an **impossible** event has $P = 0$, a **sure** event $P = 1$.
- The probabilities of all elementary events add up to $1$.

*Example:* one die: $P(\text{prime}) = \dfrac36 = \dfrac12$; $P(\text{greater than } 4) = \dfrac13$; $P(\text{multiple of } 7) = 0$.`, key_terms: [{ term: 'Impossible event', definition_md: 'An event with no favourable outcomes; probability $0$.' }, { term: 'Sure event', definition_md: 'An event containing every outcome; probability $1$.' }], formulas: [{ latex: 'P(E) = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}', label: 'Theoretical probability' }, { latex: '0 \\le P(E) \\le 1', label: 'Range' }], visual: dieTable, visuals: [scale], topic_ids: [topic(1)] },
    { heading: '3. Complementary events', body_md: r`"Not $E$" happens exactly when $E$ does not. So

$$P(E) + P(\text{not } E) = 1, \qquad P(\text{not } E) = 1 - P(E).$$

Use it for "not", "at least one", "at most": e.g. at least one head with two coins $= 1 - P(\text{TT}) = \dfrac34$; at least one 6 with two dice $= 1 - \dfrac{25}{36} = \dfrac{11}{36}$.`, key_terms: [{ term: 'Complementary event', definition_md: 'The event "not $E$", consisting of all outcomes not in $E$.' }], formulas: [{ latex: 'P(\\text{not } E) = 1 - P(E)', label: 'Complement' }], visual: compTable, topic_ids: [topic(1)] },
    { heading: '4. Coins and dice', body_md: r`- **Coins:** $n$ coins give $2^n$ outcomes: $2$, $4$, $8$. HT and TH are different. A tree diagram lists them.
- **One die:** $6$ outcomes.
- **Two dice:** $36$ ordered pairs $(a, b)$; use a $6 \times 6$ table. Sums are **not** equally likely: sum $7$ in $6$ ways, sums $2$ and $12$ in $1$ way each.

*Examples:* $P(\text{sum } 8) = \dfrac{5}{36}$; $P(\text{doublet}) = \dfrac16$; $P(\text{even product}) = \dfrac34$; three coins, $P(\text{exactly two heads}) = \dfrac38$.`, key_terms: [{ term: 'Doublet', definition_md: 'The same number on both dice.' }], formulas: [], visual: diceGrid, visuals: [coinTree], topic_ids: [topic(2)] },
    { heading: '5. Playing cards', body_md: r`A deck has $52$ cards in $4$ suits of $13$: spades ♠ and clubs ♣ (black), hearts ♥ and diamonds ♦ (red). Each suit has an ace, $2$–$10$, and the **face cards** jack, queen, king. So: $26$ red, $26$ black, $12$ face cards, $4$ of each rank.

- "$A$ or $B$": count each card once (spade or ace: $13 + 3 = 16$).
- Cards removed: recount the total first (no jacks: $48$ cards).

*Examples:* $P(\text{red king}) = \dfrac{1}{26}$; $P(\text{face card}) = \dfrac{3}{13}$; $P(\text{neither heart nor king}) = \dfrac{36}{52} = \dfrac{9}{13}$.`, key_terms: [{ term: 'Face cards', definition_md: 'Jack, queen and king — 12 in a deck.' }], formulas: [], visual: deckTable, topic_ids: [topic(2)] },
    { heading: '6. Discs, tickets and bags', body_md: r`- **Discs or tickets numbered $a$ to $b$:** $b - a + 1$ outcomes. List multiples, squares or primes explicitly ($1$ is not prime). "Divisible by both $4$ and $6$" means divisible by $12$.
- **Bags:** each ball is an outcome (balls of the same size). $P(\text{colour}) = \dfrac{\text{balls of that colour}}{\text{total balls}}$. Adding or removing balls changes the total; unknown numbers lead to a simple equation.

*Examples:* discs $1$–$50$: $P(\text{square}) = \dfrac{7}{50}$; bag of $6$ red and $b$ blue with $P(\text{blue}) = \dfrac35$ gives $b = 9$.`, key_terms: [], formulas: [], visual: bagFig, visuals: [bagTable, slipsTable], topic_ids: [topic(2)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *1 mark:* the probability as a fraction in lowest terms.
- *2–3 marks:* total outcomes 1; favourable outcomes (listed or counted) 1 per part; answer 1.

**Common mistakes**
1. Outcomes not equally likely (6 or not 6; sums of two dice).
2. $(2, 5)$ and $(5, 2)$ counted as one.
3. Double counting in "or" questions.
4. Total not updated after removing cards or adding balls.
5. $1$ counted as a prime; aces counted as face cards.
6. Answers greater than $1$ or not reduced.`,
  status: 'draft', provenance: d1.provenance,
};

const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-10-mathematics-ch14', version: 1, language: 'en',
  cards: [
    fc('f01', 'Theoretical probability of an event $E$?', '$P(E) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}$, outcomes equally likely.', 'formula', 1),
    fc('f02', 'Range of a probability?', '$0 \\le P(E) \\le 1$', 'fact', 1),
    fc('f03', 'Probability of an impossible event?', '$0$', 'fact', 1),
    fc('f04', 'Probability of a sure event?', '$1$', 'fact', 1),
    fc('f05', '$P(E) + P(\\text{not } E) = $?', '$1$', 'formula', 1),
    fc('f06', 'What are **equally likely** outcomes?', 'Outcomes that each have the same chance of happening.', 'definition', 1),
    fc('f07', 'What is an **elementary event**?', 'An event with exactly one outcome.', 'definition', 1),
    fc('f08', 'Sum of the probabilities of all elementary events?', '$1$', 'fact', 1),
    fc('f09', '"6 or not 6, so $P(6) = \\frac12$." Error?', 'The two results are not equally likely; $P(6) = \\dfrac16$.', 'exam-tip', 1),
    fc('f10', 'Can a probability be $1.2$ or $-0.1$?', 'No — it must lie between $0$ and $1$.', 'concept', 1),
    fc('f11', 'Picture: a spinner with unequal sectors. Equally likely?', 'No — larger sectors are more likely.', 'diagram', 1),
    fc('f12', 'Outcomes for two coins? Three coins?', '$4$ and $8$.', 'fact', 2),
    fc('f13', 'Two coins: $P(\\text{at least one head})$?', '$\\dfrac34$', 'example', 2),
    fc('f14', 'Three coins: $P(\\text{exactly two heads})$?', '$\\dfrac38$', 'example', 2),
    fc('f15', 'Number of outcomes for two dice?', '$36$ ordered pairs.', 'fact', 2),
    fc('f16', 'Two dice: $P(\\text{sum } 7)$?', '$\\dfrac{6}{36} = \\dfrac16$ — the most likely sum.', 'example', 2),
    fc('f17', 'Two dice: $P(\\text{doublet})$?', '$\\dfrac16$', 'example', 2),
    fc('f18', 'Two dice: $P(\\text{sum } 12)$?', '$\\dfrac{1}{36}$', 'example', 2),
    fc('f19', 'Two dice: when is the product odd?', 'Only when both numbers are odd: $9$ of $36$.', 'concept', 2),
    fc('f20', 'Cards in a deck; red cards; face cards?', '$52$; $26$; $12$.', 'fact', 2),
    fc('f21', 'Which cards are face cards?', 'Jack, queen and king (not the ace).', 'definition', 2),
    fc('f22', '$P(\\text{red king})$ from a deck?', '$\\dfrac{2}{52} = \\dfrac{1}{26}$', 'example', 2),
    fc('f23', 'Spade or ace: how many cards?', '$16$ (the ace of spades counted once).', 'exam-tip', 2),
    fc('f24', 'All jacks removed. New total?', '$48$', 'example', 2),
    fc('f25', 'Discs numbered $a$ to $b$: total?', '$b - a + 1$', 'formula', 2),
    fc('f26', '"Divisible by both 4 and 6" means divisible by…', '$12$, their LCM.', 'concept', 2),
    fc('f27', 'Primes up to $30$: how many?', '$10$ ($2, 3, 5, 7, 11, 13, 17, 19, 23, 29$).', 'fact', 2),
    fc('f28', 'Bag: $6$ red, $b$ blue, $P(\\text{blue}) = \\frac35$. Find $b$.', '$b = 9$', 'example', 2),
    fc('f29', 'Balls added to a bag: what changes?', 'Both the favourable count (if that colour) and the total.', 'exam-tip', 2),
    fc('f30', 'Picture: $6 \\times 6$ table of sums. Which sum fills the longest diagonal?', '$7$ ($6$ cells).', 'diagram', 2),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-10-mathematics-ch14', version: 1, academic_year: '2026-27', created_at: '2026-10-27T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t02 only (classical probability, 0 ≤ P ≤ 1, complements; coins, dice, playing cards, numbered discs and bags); no removed topics in this chapter. Every probability re-solved by enumerating the sample space (space.mjs): 2–3 coins, 36 ordered pairs of dice, the 52-card deck, discs and bags.' } },
};
const tests = chapterTests('Probability', {
  A: ['m02', 'm07', 'ar5', 'tf3'],
  B: ['s202', 's205', 's303'],
  C: ['l01', 'l04'],
  D: ['c03'],
}, {
  A: ['m04', 'm05', 'm06', 'm08', 'm10', 'm11', 'm15', 'm18', 'ar3', 'ar6'],
  B: ['s201', 's203', ['s204', 's206'], 's301', ['s302', 's305']],
  C: ['l02', ['l03', 'l06']],
  D: ['c02', 'c05'],
});
build({ dir: DIR, release, testsSpec: tests });
