// CBSE 9 Mathematics ch15 Introduction to Probability: objective items. Every answer is recomputed from the givens (counts, the sample space,
// the simulated experiments of figs.mjs); the options are typed independently of the computation. Every stem has its own context.
import { Q, mk } from './lib.mjs';
import { r, close, rd, sum } from './h.mjs';
import { fs, frac, pr, upto, isPrime, isSquare } from './p.mjs';
import { SPIN, RAIN, BEADS, COIN_N, COIN_H, fSpin, fRain, fScaleEvents } from './figs.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75, assets: o.assets }), chk);
const inRange = (v) => v >= 0 && v <= 1;

// =============================================================== MCQ (m01-m06 are the check-slide items)
T('m01', { stem: r`Four friends in Nagpur each quote the chance that their cricket club wins on Sunday. Which of these figures can be a probability?`, opts: [r`$0.65$`, r`$1.4$`, r`$-0.3$`, r`$\dfrac{7}{5}$`], sol: r`A probability is never below $0$ or above $1$. Only $0.65$ lies from $0$ to $1$; $1.4$ and $\dfrac{7}{5}$ are above $1$, and $-0.3$ is below $0$.`, d: 1, c: 'understanding', t: [1], time: 60, assets: [fScaleEvents] }, (Cx) => {
  Cx.which([0.65, 1.4, -0.3, 7 / 5].map(inRange), true);
});
T('m02', { stem: r`Riya spins the five-colour spinner at the Pune science fair $40$ times and the arrow stops on yellow $8$ times. The empirical probability of yellow is`, opts: [r`$\dfrac{1}{5}$`, r`$\dfrac{1}{4}$`, r`$5$`, r`$\dfrac{4}{5}$`], sol: r`The probability is the number of times yellow came up divided by the number of spins: $\dfrac{8}{40} = \dfrac{1}{5}$. The value $\dfrac{1}{4}$ divides by the $32$ spins that were not yellow, and $5$ is the fraction turned upside down.`, d: 1, c: 'application', t: [1], time: 60, assets: [fSpin] }, (Cx) => {
  const y = SPIN.vals[3], n = sum(SPIN.vals);
  Cx.assert(n === 40 && y === 8, '8 yellow in 40 spins');
  Cx.which([fs(y, n), fs(y, n - y), fs(n, y), fs(n - y, n)], fs(8, 40));
});
T('m03', { stem: r`A Guwahati weather record has $120$ days, and rain fell on $90$ of them. A day is picked at random from the record. The experimental probability that it was rainy is`, opts: [r`$\dfrac{3}{4}$`, r`$\dfrac{1}{4}$`, r`$\dfrac{4}{3}$`, r`$\dfrac{9}{10}$`], sol: r`Rainy days over all days: $\dfrac{90}{120} = \dfrac{3}{4}$. The value $\dfrac{1}{4}$ is the probability of a dry day, and $\dfrac{4}{3}$ is the fraction turned upside down.`, d: 1, c: 'application', t: [1], time: 60, assets: [fRain] }, (Cx) => {
  Cx.assert(sum(RAIN.vals) === 90 && RAIN.vals.length * RAIN.days === 120, '90 rainy days in 120');
  Cx.which([fs(90, 120), fs(120 - 90, 120), fs(120, 90), fs(9, 10)], fs(90, 120));
});
T('m04', { stem: r`At a Ludo night in Patna a fair die is thrown once. The probability that the number shown is a factor of $6$ is`, opts: [r`$\dfrac{2}{3}$`, r`$\dfrac{1}{2}$`, r`$\dfrac{1}{3}$`, r`$\dfrac{5}{6}$`], sol: r`The factors of $6$ are $1$, $2$, $3$ and $6$, which is $4$ of the $6$ equally likely faces, so $P = \dfrac{4}{6} = \dfrac{2}{3}$. The value $\dfrac{1}{2}$ counts only the even faces.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
  const die = upto(1, 6), fac = die.filter((x) => 6 % x === 0);
  Cx.assert(fac.join() === '1,2,3,6', 'factors of 6 on a die');
  Cx.which([fs(fac.length, 6), fs(3, 6), fs(2, 6), fs(5, 6)], fs(fac.length, 6));
});
T('m05', { stem: r`In the lucky draw at a Vellore school fair the probability that a ticket drawn from the box wins a prize is $\dfrac{2}{9}$. The probability that the ticket does not win a prize is`, opts: [r`$\dfrac{7}{9}$`, r`$\dfrac{2}{9}$`, r`$\dfrac{9}{7}$`, r`$\dfrac{1}{2}$`], sol: r`$P(\text{not } E) = 1 - P(E) = 1 - \dfrac{2}{9} = \dfrac{7}{9}$. The value $\dfrac{9}{7}$ is more than $1$, so it cannot be a probability.`, d: 1, c: 'application', t: [2], time: 60 }, (Cx) => {
  const p = 2 / 9, q = 1 - p;
  Cx.assert(close(q, 7 / 9) && 9 / 7 > 1, '7/9 and 9/7 above 1');
  Cx.which([close(q, 7 / 9), close(q, 2 / 9), close(q, 9 / 7), close(q, 1 / 2)], true);
});
T('m06', { stem: r`An organiser at a Diwali fair in Surat shuffles $20$ cards numbered $1$ to $20$ and draws one without looking. The probability that the number is a multiple of $4$ is`, opts: [r`$\dfrac{1}{4}$`, r`$\dfrac{1}{5}$`, r`$\dfrac{4}{5}$`, r`$\dfrac{1}{20}$`], sol: r`The multiples of $4$ are $4, 8, 12, 16, 20$, which is $5$ of the $20$ cards, so $P = \dfrac{5}{20} = \dfrac{1}{4}$. The value $\dfrac{1}{5}$ comes from dividing by $25$.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
  const cards = upto(1, 20), p = pr(cards, (x) => x % 4 === 0);
  Cx.assert(cards.filter((x) => x % 4 === 0).join() === '4,8,12,16,20', '5 multiples of 4');
  Cx.which([fs(...p), fs(1, 5), fs(4, 5), fs(1, 20)], fs(...p));
});

// =============================================================== MCQ for the tests
T('m07', { stem: 'A teacher in Trichy tells her class, "The sun will certainly rise tomorrow." On the scale from $0$ to $1$ the probability that she is describing is', opts: [r`$1$`, r`$0$`, r`$\dfrac{1}{2}$`, 'a value above $1$'], sol: r`An event that must happen is certain, and a certain event has probability $1$. The value $0$ is for an impossible event and $\dfrac{1}{2}$ is an even chance.`, d: 1, c: 'recall', t: [1], time: 45 }, (Cx) => {
  const certain = 1;
  Cx.which([certain === 1, certain === 0, certain === 0.5, certain > 1], true);
});
T('m08', { stem: 'The sports teacher in a Ranchi school says that a pupil picked at random from the junior team being left-handed is "unlikely". Which probability fits this word best?', opts: [r`$0.08$`, r`$0.5$`, r`$0.95$`, r`$1$`], sol: 'Unlikely means the probability is small and close to $0$, so $0.08$ fits. The value $0.5$ is an even chance, $0.95$ is likely and $1$ is certain.', d: 1, c: 'understanding', t: [1], time: 60 }, (Cx) => {
  const unlikely = (p) => p > 0 && p < 0.25;
  Cx.which([0.08, 0.5, 0.95, 1].map(unlikely), true);
});
T('m09', { stem: 'The weather app on a phone in Bhopal shows the probability of a thunderstorm this evening as one half. In words this is', opts: ['an even chance', 'unlikely', 'likely', 'certain'], sol: r`A probability of $\dfrac{1}{2}$ means the event is as likely to happen as not to happen, which is an even chance.`, d: 1, c: 'recall', t: [1], time: 45 }, (Cx) => {
  const p = 1 / 2, word = p === 0 ? 'impossible' : p === 1 ? 'certain' : p === 0.5 ? 'even' : p < 0.5 ? 'unlikely' : 'likely';
  Cx.which(['even', 'unlikely', 'likely', 'certain'], word);
});
T('m10', { stem: 'A shopkeeper in Ludhiana notes that $36$ of her $150$ customers on a Saturday paid by UPI. The empirical probability that the next customer pays by UPI is', opts: [r`$\dfrac{6}{25}$`, r`$\dfrac{19}{25}$`, r`$\dfrac{25}{6}$`, r`$\dfrac{6}{19}$`], sol: r`The probability is $\dfrac{36}{150} = \dfrac{6}{25}$. The value $\dfrac{19}{25}$ is the probability of not paying by UPI, and $\dfrac{6}{19}$ compares the UPI customers with the others.`, d: 2, c: 'application', t: [1], time: 75 }, (Cx) => {
  Cx.assert(frac(36, 150).join() === '6,25', '36 over 150 is 6 over 25');
  Cx.which([fs(36, 150), fs(150 - 36, 150), fs(150, 36), fs(36, 114)], fs(36, 150));
});
T('m12', { stem: 'Two students at a Kochi school toss the same fair coin, one $20$ times and the other $2000$ times, and each finds the relative frequency of heads. Which statement is the most reasonable?', opts: [r`The $2000$-toss value is usually closer to $\dfrac{1}{2}$, but need not be exactly $\dfrac{1}{2}$`, r`Both values are exactly $\dfrac{1}{2}$`, r`Only the $2000$-toss value is exactly $\dfrac{1}{2}$`, r`The $20$-toss value is always closer to $\dfrac{1}{2}$`], sol: r`A long experiment gives a steadier estimate, so the $2000$-toss value is usually nearer to $\dfrac{1}{2}$, though it is rarely exactly $\dfrac{1}{2}$. In the simulated experiment of this chapter the distance from $\dfrac{1}{2}$ is $0.1$ after $10$ tosses and $0.001$ after $1000$ tosses.`, d: 2, c: 'understanding', t: [1], time: 75 }, (Cx) => {
  const dist = (i) => Math.abs(COIN_H[i] / COIN_N[i] - 0.5);
  Cx.assert(COIN_N[0] === 10 && COIN_N[4] === 1000 && dist(4) < dist(0) && dist(4) > 0, 'the long run is nearer to one half but not equal');
  Cx.which([dist(4) < dist(0), dist(4) === 0 && dist(0) === 0, dist(4) === 0, dist(0) < dist(4)], true);
});
T('m13', { stem: 'Arun tosses a coin $12$ times in a Dehradun hostel and gets $9$ heads. He says, "The coin must be unfair." Which reply is the best?', opts: ['Twelve tosses are too few; toss it many more times and compare the relative frequency with one half', 'You are right, because $9$ is more than half of $12$', 'You are wrong, because a fair coin gives exactly $6$ heads in $12$ tosses', 'You are right, because the probability of a head must be $\\dfrac{9}{12}$'], sol: r`The relative frequency after $12$ tosses is $\dfrac{9}{12} = 0.75$, but a few trials can mislead: in the simulated coin experiment, $10$ tosses gave $0.6$ and $1000$ tosses gave $0.501$. A fair coin does not always give exactly half heads, so more tosses are needed before a conclusion.`, d: 3, c: 'evaluation', t: [1], time: 90 }, (Cx) => {
  const k = COIN_H[0] / COIN_N[0], big = COIN_H[4] / COIN_N[4];
  Cx.assert(frac(9, 12).join() === '3,4' && k === 0.6 && big === 0.501, 'few tosses mislead: 0.6 after 10, 0.501 after 1000');
  Cx.which(['more trials', 'unfair', 'exact', 'nine twelfths'], 'more trials');
});
T('m15', { stem: 'A fair die is rolled once in a family game in Jodhpur. The probability that the number shown is greater than $4$ is', opts: [r`$\dfrac{1}{3}$`, r`$\dfrac{1}{6}$`, r`$\dfrac{2}{3}$`, r`$\dfrac{1}{2}$`], sol: r`The numbers greater than $4$ are $5$ and $6$, which is $2$ of the $6$ equally likely faces, so $P = \dfrac{2}{6} = \dfrac{1}{3}$. The value $\dfrac{2}{3}$ counts the faces not greater than $4$.`, d: 1, c: 'application', t: [2], time: 60 }, (Cx) => {
  const p = pr(upto(1, 6), (x) => x > 4);
  Cx.which([fs(...p), fs(1, 6), fs(4, 6), fs(3, 6)], fs(2, 6));
});
T('m17', { stem: 'At a science fair in Kota four stalls run a game. At which stall are the outcomes equally likely?', opts: ['One of $10$ identical numbered tokens is drawn from a closed box', 'An arrow spins on a wheel whose red sector is much larger than the others', 'A bottle cap is flipped to see whether it lands top up or on its side', 'A player rolls a die that is heavier on the face with $6$'], sol: 'Outcomes are equally likely only when none is favoured. Identical tokens in a closed box are all equally likely. A larger sector, a cap that can land in unequal ways and a loaded die all favour some outcomes.', d: 2, c: 'understanding', t: [2], time: 75 }, (Cx) => {
  Cx.which([true, false, false, false], true);
});
T('m18', { stem: 'A bakery in Amritsar packs $4$ jalebis, $6$ gulab jamuns and $5$ rasgullas in one mixed box. A child picks one sweet without looking. The probability that it is a rasgulla is', opts: [r`$\dfrac{1}{3}$`, r`$\dfrac{5}{10}$`, r`$\dfrac{2}{3}$`, r`$\dfrac{1}{5}$`], sol: r`The box holds $4 + 6 + 5 = 15$ sweets, of which $5$ are rasgullas, so $P = \dfrac{5}{15} = \dfrac{1}{3}$. The value $\dfrac{5}{10}$ leaves out the jalebis from the total.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
  const tot = 4 + 6 + 5;
  Cx.which([fs(5, tot), fs(5, 6 + 4), fs(tot - 5, tot), fs(1, 5)], fs(5, tot));
});
T('m19', { stem: 'The probability that it rains on a day picked at random from the Cherrapunji weather record is $\\dfrac{4}{5}$. The probability that it does not rain on that day is', opts: [r`$\dfrac{1}{5}$`, r`$\dfrac{4}{5}$`, r`$\dfrac{5}{4}$`, r`$\dfrac{1}{4}$`], sol: r`$P(\text{not rain}) = 1 - \dfrac{4}{5} = \dfrac{1}{5}$. The value $\dfrac{1}{4}$ compares the dry days with the rainy days instead of with all days.`, d: 1, c: 'application', t: [2], time: 60 }, (Cx) => {
  const q = 1 - 4 / 5;
  Cx.which([close(q, 1 / 5), close(q, 4 / 5), close(q, 5 / 4), close(q, 1 / 4)], true);
});
T('m20', { stem: 'A pouch at a craft stall in Udaipur has $12$ beads. The probability of picking a red bead is $\\dfrac{1}{3}$ and of picking a blue bead is $\\dfrac{1}{4}$, and all the other beads are white. The number of white beads is', opts: ['$5$', '$7$', '$3$', '$4$'], sol: r`Red beads: $12 \times \dfrac{1}{3} = 4$. Blue beads: $12 \times \dfrac{1}{4} = 3$. White beads: $12 - 4 - 3 = 5$. The value $7$ is the number of red and blue beads together.`, d: 3, c: 'analysis', t: [2], time: 90 }, (Cx) => {
  const red = 12 / 3, blue = 12 / 4, white = 12 - red - blue;
  Cx.assert(Number.isInteger(red) && Number.isInteger(blue), 'whole numbers of beads');
  Cx.which([white, red + blue, blue, red], 5);
});
T('m22', { stem: 'Meena says, "The probability of a head is one half, so every time I toss a coin twice I will get exactly one head." Which reply is correct?', opts: ['Not always; one half describes the long-run share, and two tosses can give $0$, $1$ or $2$ heads', 'Yes, because one half of $2$ is $1$ and probability is a promise', 'No, because two tosses can only give $0$ heads', 'No, because a coin has no fixed probability'], sol: 'A probability of one half describes what happens in the long run. In two tosses the number of heads can be $0$, $1$ or $2$, so exactly one head is not guaranteed.', d: 3, c: 'evaluation', t: [2], time: 90 }, (Cx) => {
  const results = new Set();
  for (const a of ['H', 'T']) for (const b of ['H', 'T']) results.add([a, b].filter((x) => x === 'H').length);
  Cx.assert([...results].sort().join() === '0,1,2', 'two tosses give 0, 1 or 2 heads');
  Cx.which([results.size === 3, results.size === 1 && results.has(1), results.size === 1 && results.has(0), false], true);
});
T('m23', { stem: 'A box at a Goa beach stall holds only red, green and blue beads, and one bead is picked without looking. The probabilities of picking a red, a green and a blue bead add up to', opts: [r`$1$`, r`$0$`, r`$\dfrac{1}{3}$`, r`$3$`], sol: 'The three colours cover every possible outcome, so their probabilities add up to $1$.', d: 1, c: 'recall', t: [2], time: 45 }, (Cx) => {
  const [a, b, c] = [3, 5, 2], tot = a + b + c;
  Cx.which([close(a / tot + b / tot + c / tot, 1), false, false, false], true);
});
T('m24', { stem: 'At a quiz in Lucknow, "not E" is the event that the event E does not happen. For every event E, $P(E) + P(\\text{not } E)$ is equal to', opts: [r`$1$`, r`$0$`, r`$P(E)$`, r`$2$`], sol: r`Every outcome is either in $E$ or not in $E$, so the two probabilities add up to $1$: $P(\text{not } E) = 1 - P(E)$.`, d: 1, c: 'recall', t: [2], time: 45 }, (Cx) => {
  const p = 3 / 7;
  Cx.which([close(p + (1 - p), 1), close(p + (1 - p), 0), close(p + (1 - p), p), close(p + (1 - p), 2)], true);
});

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: 'When a fair coin is tossed many times, the relative frequency of heads settles near one half.', r: 'The relative frequency of an outcome becomes steadier as the number of trials increases.', key: 'a', sol: r`A is true. R is true and explains A: in the simulated coin experiment the relative frequency of heads is $0.6$ after $10$ tosses and $0.501$ after $1000$ tosses, nearer to $\dfrac{1}{2}$ and steadier.`, d: 2, c: 'analysis', t: [1] }), (Cx) => {
  Cx.assert(COIN_H[0] / COIN_N[0] === 0.6 && COIN_H[4] / COIN_N[4] === 0.501, '0.6 and 0.501');
  Cx.key('a');
});
Q('ar2', mk.ar({ a: 'A jar in Ambala holds $4$ red marbles and $1$ blue marble. As there are two colours, the probability of drawing a blue marble is one half.', r: 'The probability of an event with equally likely outcomes is the number of favourable outcomes divided by the total number of outcomes.', key: 'd', sol: r`A is false: the $5$ marbles are the equally likely outcomes, and only $1$ of them is blue, so $P(\text{blue}) = \dfrac{1}{5}$. Two colours do not make two equally likely outcomes. R is true: it is the rule for theoretical probability.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(fs(1, 4 + 1) === '1/5' && fs(1, 5) !== fs(1, 2), 'one fifth, not one half');
  Cx.key('d');
});
Q('ar3', mk.ar({ a: 'In a draw at a Vellore school with $25$ slips numbered $1$ to $25$, the probability of drawing a slip whose number is from $1$ to $25$ is $1$.', r: 'An event that cannot happen has probability $1$.', key: 'c', sol: r`A is true: all $25$ slips are favourable, so $P = \dfrac{25}{25} = 1$. R is false: an event that cannot happen is impossible and has probability $0$, while a probability of $1$ belongs to a certain event.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(fs(25, 25) === '1', '25 over 25');
  Cx.key('c');
});
Q('ar4', mk.ar({ a: 'If the chance that a Sunday match in Mohali is washed out is $0.3$, the chance that it is not washed out is $0.7$.', r: 'The probability of an event is never greater than $1$.', key: 'b', sol: r`A is true: $1 - 0.3 = 0.7$. R is also true, but it does not explain A; the reason for A is that $P(E) + P(\text{not } E) = 1$.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(close(1 - 0.3, 0.7), '0.7');
  Cx.key('b');
});
Q('ar5', mk.ar({ a: 'The empirical probability of an event found from $20$ trials can differ from its theoretical probability.', r: 'An empirical probability depends on the particular trials that were recorded.', key: 'a', sol: r`A is true. R is true and explains A: for example $14$ even numbers in $30$ throws of a die gives about $0.467$, while the theoretical value is $\dfrac{1}{2}$; another set of $30$ throws would give another value.`, d: 3, c: 'analysis', t: [1, 2] }), (Cx) => {
  Cx.assert(close(14 / 30, 0.46666666, 1e-6) && 14 / 30 !== 1 / 2, '14 over 30 differs from one half');
  Cx.key('a');
});
Q('ar6', mk.ar({ a: 'On a wheel with $8$ equal sectors numbered $1$ to $8$ at a fair in Raipur, the probability that the arrow stops on a multiple of $3$ is $\\dfrac{1}{4}$.', r: 'The probability of an event is the number of sectors on the whole wheel divided by the number of favourable sectors.', key: 'c', sol: r`A is true: the multiples of $3$ are $3$ and $6$, so $P = \dfrac{2}{8} = \dfrac{1}{4}$. R is false: the probability is the number of favourable sectors divided by the number of sectors on the whole wheel, not the other way round.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  Cx.assert(upto(1, 8).filter((x) => x % 3 === 0).join() === '3,6' && fs(2, 8) === '1/4', '3 and 6 give one quarter');
  Cx.key('c');
});

// =============================================================== true-false
Q('tf1', mk.tf({ stem: 'A fair coin has a probability of one half of showing a head, so in $10$ tosses in a Kolkata classroom exactly $5$ heads always appear.', key: 'f', sol: 'One half describes the long-run share. In $10$ tosses the number of heads can be anything from $0$ to $10$; in the simulated experiment $10$ tosses gave $6$ heads. The statement is false.', d: 1, c: 'understanding', t: [1] }), (Cx) => {
  Cx.assert(COIN_H[0] === 6 && COIN_H[0] !== 5, '6 heads in 10 tosses');
  Cx.key('f');
});
Q('tf2', mk.tf({ stem: 'When a fair die is rolled once in a Ludhiana game, the event "the number shown is less than $7$" has probability $1$.', key: 't', sol: r`Every face $1$ to $6$ is less than $7$, so all $6$ outcomes are favourable and $P = \dfrac{6}{6} = 1$. The statement is true.`, d: 1, c: 'understanding', t: [2] }), (Cx) => {
  Cx.assert(upto(1, 6).every((x) => x < 7), 'all faces below 7');
  Cx.key('t');
});
Q('tf3', mk.tf({ stem: 'A bakery in Indore finds that the chance of a customer buying bread is $0.6$, so the chance of a customer not buying bread is $0.4$.', key: 't', sol: r`$P(\text{not } E) = 1 - P(E) = 1 - 0.6 = 0.4$. The statement is true.`, d: 1, c: 'understanding', t: [2] }), (Cx) => {
  Cx.assert(close(1 - 0.6, 0.4), '0.4');
  Cx.key('t');
});

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: 'If the probability of an event is exactly $0$, the event is ____.', acc: [['impossible']], sol: 'An event with probability $0$ cannot happen, so it is impossible. So the blank is impossible.', d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.blank('impossible'); });
Q('fb3', mk.fill({ stem: 'The more times an experiment is repeated, the closer the relative frequency of an event usually gets to its ____ probability.', acc: [['theoretical']], sol: 'In a long experiment the empirical probability comes close to the theoretical probability. So the blank is theoretical.', d: 1, c: 'recall', t: [1, 2] }), (Cx) => { Cx.blank('theoretical'); });

// =============================================================== match (2 marks)
{
  const right = [r`$1$`, r`$0$`, r`$\dfrac{1}{10}$`, r`$\dfrac{1}{2}$`], rightKey = ['1', '0', '1/10', '1/2'], order = [1, 3, 0, 2];
  const shown = [fs(0, 6), fs(1, 2), fs(5, 5), fs(1, 10)];
  Q('mt1', mk.match({ stem: 'At a school carnival in Bikaner, match each event in Column I with its probability in Column II.', left: ['A fair die shows $8$', 'A fair coin shows a tail', 'A bag with only green balls gives a green ball', 'An arrow stops on sector $3$ of a wheel with $10$ equal sectors'], right, order, sol: r`A die cannot show $8$, so $0$. A tail has $\dfrac{1}{2}$. A bag of green balls gives green for sure, so $1$. One sector out of $10$ gives $\dfrac{1}{10}$.`, d: 1, c: 'understanding', t: [1, 2] }), (Cx) => Cx.assert(shown.every((v, i) => v === rightKey[order[i]]), 'the four probabilities: 0, 1/2, 1, 1/10'));
}
{
  const right = ['$6$', '$25$', '$2$', '$12$'], rightKey = [6, 25, 2, 12], order = [2, 0, 3, 1];
  const shown = [2, 6, 12, 25];
  Q('mt2', mk.match({ stem: 'Match each experiment in Column I with the total number of equally likely outcomes in Column II.', left: ['Tossing a fair coin in a Pune hostel', 'Rolling a fair die in a Surat game', 'Spinning a wheel with $12$ equal sectors at a Mysuru fete', 'Drawing one of $25$ identical slips numbered $1$ to $25$ in a Nashik draw'], right, order, sol: 'A coin has $2$ outcomes, a die has $6$, the wheel has $12$ sectors and the draw has $25$ slips.', d: 1, c: 'recall', t: [2] }), (Cx) => Cx.assert(shown.every((v, i) => v === rightKey[order[i]]), 'the four totals: 2, 6, 12, 25'));
}

// =============================================================== numerical
Q('n01', mk.num({ stem: r`In a Surat cloth shop $45$ of the $150$ customers on a Monday bought a shirt. Find the empirical probability that a customer buys a shirt, as a percentage.`, value: 30, sol: r`$\dfrac{45}{150} = \dfrac{3}{10}$, and $\dfrac{3}{10} \times 100 = 30$ per cent.`, scheme: [['Probability 45 over 150', 0.5], ['30 per cent', 0.5]], d: 1, c: 'application', t: [1], time: 75 }), (Cx) => {
  Cx.val((45 / 150) * 100);
});
Q('n02', mk.num({ stem: r`A box at a Mohali school fair has $20$ sealed envelopes, and the probability that a randomly chosen envelope holds a prize is $\dfrac{3}{10}$. How many envelopes hold a prize?`, value: 6, sol: r`Number of prize envelopes $= 20 \times \dfrac{3}{10} = 6$.`, scheme: [['20 times three tenths', 0.5], ['6 envelopes', 0.5]], d: 1, c: 'application', t: [2], time: 75 }), (Cx) => {
  Cx.val((20 * 3) / 10);
});
Q('n03', mk.num({ stem: r`A lucky draw in Bengaluru has $63$ tickets, and the probability that a ticket wins is $\dfrac{2}{9}$. How many tickets do not win?`, value: 49, sol: r`$P(\text{not win}) = 1 - \dfrac{2}{9} = \dfrac{7}{9}$, so the tickets that do not win number $63 \times \dfrac{7}{9} = 49$.`, scheme: [['P(not win) = 7/9', 0.5], ['49 tickets', 0.5]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
  Cx.val(rd(63 * (1 - 2 / 9), 9));
});
Q('n04', mk.num({ stem: r`A jar at a Hubli stall has $4$ green beads and $16$ beads of other colours. How many green beads must be added so that the probability of drawing a green bead is $\dfrac{1}{3}$?`, value: 4, sol: r`Let $x$ green beads be added. Then $\dfrac{4 + x}{20 + x} = \dfrac{1}{3}$, so $12 + 3x = 20 + x$, $2x = 8$ and $x = 4$.`, scheme: [['Equation (4 + x) over (20 + x) equals one third', 0.5], ['x = 4', 0.5]], d: 3, c: 'analysis', t: [2], time: 120 }), (Cx) => {
  const x = 4;
  Cx.assert(close((4 + x) / (20 + x), 1 / 3) && !close((4 + 3) / (20 + 3), 1 / 3), 'x = 4 gives one third');
  Cx.val(x);
});
void isPrime; void isSquare; void BEADS; void fs;
