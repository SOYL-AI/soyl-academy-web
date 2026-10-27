// CBSE 10 Mathematics ch14 Probability — practice bank. Every probability is re-solved by enumerating the
// sample space (coins, dice, the 52-card deck, numbered discs, bags) and counting favourable outcomes;
// fractions in solutions are checked in reduced form (and the unreduced count where it is written).
import { Q, caseQ, child, mk, r } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { range, die, dice2, coins, deck, bag, isPrime, isSquare, isCube, P, tex, texRaw } from './space.mjs';

const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
const R2 = (x) => Math.round(x * 100) / 100;
const heads = (s) => s.filter((c) => c === 'H').length;
const sum = ([a, b]) => a + b;

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'The probability of an impossible event is', opts: ['$0$', '$1$', r`$\dfrac12$`, '$-1$'], key: 'a', sol: r`An impossible event has no favourable outcomes: $P = \dfrac{0}{n} = 0$. A probability is never negative.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.which([0, 1, 0.5, -1], P(die, (x) => x > 6).v));
Q('m02', mk.mcq({ stem: 'Which of these cannot be the probability of an event?', opts: ['$1.2$', '$0.7$', r`$\dfrac23$`, '$0$'], key: 'a', sol: r`For every event, $0 \le P(E) \le 1$. $1.2 > 1$, so it cannot be a probability.`, d: 1, c: 'understanding', t: [1], time: 30 }), (C) => C.which([1.2, 0.7, 2 / 3, 0].map((v) => v < 0 || v > 1), true));
Q('m03', mk.mcq({ stem: r`If $P(E) = 0.35$, then $P(\text{not } E)$ is`, opts: ['$0.65$', '$0.35$', '$1.35$', '$0.065$'], key: 'a', sol: r`$P(\text{not } E) = 1 - P(E) = 1 - 0.35 = 0.65$.`, d: 1, c: 'understanding', t: [1], time: 30 }), (C) => C.which([0.65, 0.35, 1.35, 0.065], R2(1 - 0.35)));
Q('m04', mk.mcq({ stem: 'A die is thrown once. The probability of getting a number less than 3 is', opts: [r`$\dfrac13$`, r`$\dfrac12$`, r`$\dfrac16$`, r`$\dfrac23$`], key: 'a', sol: r`Favourable: $1, 2$ — two outcomes out of six. $P = \dfrac26 = \dfrac13$. Option (b) counts $1, 2, 3$ ("3 or less").`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => C.which([1 / 3, 1 / 2, 1 / 6, 2 / 3], P(die, (x) => x < 3).v));
Q('m05', mk.mcq({ stem: 'A die is thrown once. The probability of getting a prime number is', opts: [r`$\dfrac12$`, r`$\dfrac23$`, r`$\dfrac13$`, r`$\dfrac56$`], key: 'a', sol: r`Primes on a die: $2, 3, 5$. $P = \dfrac36 = \dfrac12$. Option (b) wrongly counts $1$ as a prime.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => C.which([1 / 2, 2 / 3, 1 / 3, 5 / 6], P(die, isPrime).v));
Q('m06', mk.mcq({ stem: 'A coin is tossed twice. The probability of getting at least one tail is', opts: [r`$\dfrac34$`, r`$\dfrac12$`, r`$\dfrac14$`, r`$\dfrac23$`], key: 'a', sol: r`Outcomes: HH, HT, TH, TT. At least one tail: HT, TH, TT. $P = \dfrac34$. Option (d) treats "two heads, one head, no head" as three equally likely outcomes, which they are not.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([3 / 4, 1 / 2, 1 / 4, 2 / 3], P(coins(2), (s) => s.includes('T')).v));
Q('m07', mk.mcq({ stem: 'A card is drawn at random from a well-shuffled deck of 52 cards. The probability that it is a red king is', opts: [r`$\dfrac{1}{26}$`, r`$\dfrac{1}{13}$`, r`$\dfrac{1}{52}$`, r`$\dfrac12$`], key: 'a', sol: r`There are $2$ red kings (hearts, diamonds). $P = \dfrac{2}{52} = \dfrac{1}{26}$. Option (b) counts all four kings.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => C.which([1 / 26, 1 / 13, 1 / 52, 1 / 2], P(deck, (c) => c.rank === 'K' && c.colour === 'red').v));
Q('m08', mk.mcq({ stem: 'A card is drawn at random from a deck of 52 cards. The probability that it is a face card is', opts: [r`$\dfrac{3}{13}$`, r`$\dfrac{4}{13}$`, r`$\dfrac14$`, r`$\dfrac{3}{52}$`], key: 'a', sol: r`Face cards are the jack, queen and king of each suit: $12$. $P = \dfrac{12}{52} = \dfrac{3}{13}$. Option (b) includes the aces.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => C.which([3 / 13, 4 / 13, 1 / 4, 3 / 52], P(deck, (c) => c.face).v));
Q('m09', mk.mcq({ stem: 'A bag has 4 red and 6 white balls. One ball is drawn at random. The probability that it is white is', opts: [r`$\dfrac35$`, r`$\dfrac25$`, r`$\dfrac16$`, r`$\dfrac32$`], key: 'a', sol: r`$P(\text{white}) = \dfrac{6}{10} = \dfrac35$. Option (d) divides white by red — and is more than $1$, so it cannot be a probability.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => C.which([3 / 5, 2 / 5, 1 / 6, 3 / 2], P(bag({ red: 4, white: 6 }), (b) => b === 'white').v));
Q('m10', mk.mcq({ stem: 'Discs numbered 1 to 25 are put in a box and one is drawn at random. The probability that its number is a multiple of 5 is', opts: [r`$\dfrac15$`, r`$\dfrac14$`, r`$\dfrac{4}{25}$`, r`$\dfrac{1}{25}$`], key: 'a', sol: r`Multiples of $5$: $5, 10, 15, 20, 25$ — five of them. $P = \dfrac{5}{25} = \dfrac15$. Option (c) forgets $25$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => C.which([1 / 5, 1 / 4, 4 / 25, 1 / 25], P(range(1, 25), (x) => x % 5 === 0).v));
Q('m11', mk.mcq({ stem: 'Two dice are thrown together. The probability that the sum of the numbers is 7 is', opts: [r`$\dfrac16$`, r`$\dfrac{7}{36}$`, r`$\dfrac{1}{11}$`, r`$\dfrac{5}{36}$`], key: 'a', sol: r`$36$ equally likely outcomes; sum $7$: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ — six. $P = \dfrac{6}{36} = \dfrac16$. Option (c) wrongly treats the eleven sums $2$–$12$ as equally likely.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => C.which([1 / 6, 7 / 36, 1 / 11, 5 / 36], P(dice2, (p) => sum(p) === 7).v));
Q('m12', mk.mcq({ stem: 'Two dice are thrown together. The probability of getting the same number on both (a doublet) is', opts: [r`$\dfrac16$`, r`$\dfrac{1}{36}$`, r`$\dfrac{1}{12}$`, r`$\dfrac13$`], key: 'a', sol: r`Doublets: $(1,1), (2,2), \ldots, (6,6)$ — six of $36$. $P = \dfrac16$. Option (b) counts only one doublet.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([1 / 6, 1 / 36, 1 / 12, 1 / 3], P(dice2, ([a, b]) => a === b).v));
Q('m13', mk.mcq({ stem: 'The sum of the probabilities of all the elementary events of an experiment is', opts: ['$1$', '$0$', r`$\dfrac12$`, 'the number of outcomes'], key: 'a', sol: r`The elementary events together cover every outcome exactly once, so their probabilities add to $\dfrac nn = 1$.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { C.assert(near(die.map((k) => P(die, (x) => x === k).v).reduce((s, v) => s + v, 0), 1), 'die sums to 1'); C.key('a'); });
Q('m14', mk.mcq({ stem: 'The probability of a sure (certain) event is', opts: ['$1$', '$0$', '$100$', r`$\dfrac12$`], key: 'a', sol: r`Every outcome is favourable: $P = \dfrac nn = 1$. (As a percentage, $100\%$ — but a probability is written as $1$.)`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.which([1, 0, 100, 0.5], P(die, (x) => x <= 6).v));
Q('m15', mk.mcq({ stem: 'Three coins are tossed together. The probability of getting exactly two heads is', opts: [r`$\dfrac38$`, r`$\dfrac14$`, r`$\dfrac12$`, r`$\dfrac34$`], key: 'a', sol: r`$8$ outcomes. Exactly two heads: HHT, HTH, THH. $P = \dfrac38$. Option (b) treats "0, 1, 2, 3 heads" as four equally likely outcomes.`, d: 3, c: 'application', t: [2], time: 75 }), (C) => C.which([3 / 8, 1 / 4, 1 / 2, 3 / 4], P(coins(3), (s) => heads(s) === 2).v));
Q('m16', mk.mcq({ stem: 'In a game of Ludo, a player needs a 6 to bring a piece out. The probability that she does NOT get a 6 on her next throw is', opts: [r`$\dfrac56$`, r`$\dfrac16$`, '$1$', r`$\dfrac12$`], key: 'a', sol: r`$P(\text{not } 6) = 1 - \dfrac16 = \dfrac56$.`, d: 2, c: 'understanding', t: [1, 2], time: 45 }), (C) => C.which([5 / 6, 1 / 6, 1, 1 / 2], P(die, (x) => x !== 6).v));
Q('m17', mk.mcq({ stem: 'A letter is chosen at random from the word INDEPENDENCE. The probability that it is a vowel is', opts: [r`$\dfrac{5}{12}$`, r`$\dfrac13$`, r`$\dfrac{7}{12}$`, r`$\dfrac57$`], key: 'a', sol: r`$12$ letters: I, N, D, E, P, E, N, D, E, N, C, E. Vowels: I and four E's — five. $P = \dfrac{5}{12}$. Option (d) compares vowels with consonants instead of with all letters.`, d: 3, c: 'application', t: [2], time: 75 }), (C) => C.which([5 / 12, 1 / 3, 7 / 12, 5 / 7], P([...'INDEPENDENCE'], (ch) => 'AEIOU'.includes(ch)).v));
Q('m18', mk.mcq({ stem: 'A card is drawn at random from a deck of 52 cards. The probability that it is neither a heart nor a king is', opts: [r`$\dfrac{9}{13}$`, r`$\dfrac{35}{52}$`, r`$\dfrac34$`, r`$\dfrac{4}{13}$`], key: 'a', sol: r`Hearts: $13$; kings that are not hearts: $3$. So $16$ cards are hearts or kings, and $52 - 16 = 36$ are neither. $P = \dfrac{36}{52} = \dfrac{9}{13}$. Option (b) subtracts $13 + 4 = 17$, counting the king of hearts twice.`, d: 4, c: 'analysis', t: [2], time: 90 }), (C) => C.which([9 / 13, 35 / 52, 3 / 4, 4 / 13], P(deck, (c) => c.suit !== 'hearts' && c.rank !== 'K').v));

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: r`For any event $E$, $P(\text{not } E) = 1 - P(E)$.`, r: r`$E$ and "not $E$" together include every outcome, with no outcome in both.`, key: 'a', sol: r`By R, the favourable outcomes of $E$ and of "not $E$" add up to all $n$ outcomes, so $P(E) + P(\text{not } E) = 1$. R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => { const e = P(die, isPrime), ne = P(die, (x) => !isPrime(x)); C.assert(near(e.v + ne.v, 1), 'complement'); C.key('a'); });
Q('ar2', mk.ar({ a: 'When a die is thrown, the probability of getting a number greater than 6 is 0.', r: 'The probability of a sure event is 1.', key: 'b', sol: r`A is true: no face shows more than $6$, so the event is impossible. R is true, but it is about sure events, not impossible ones, so it does not explain A.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(P(die, (x) => x > 6).v === 0, '0'); C.key('b'); });
Q('ar3', mk.ar({ a: r`Two coins are tossed together. The probability of getting two heads is $\dfrac14$.`, r: 'The three outcomes "two heads", "one head" and "no head" are equally likely.', key: 'c', sol: r`A: HH is one of the four equally likely outcomes HH, HT, TH, TT, so $P = \dfrac14$ — true. R is false: "one head" happens in two ways (HT, TH), so it is twice as likely as "two heads".`, d: 2, c: 'analysis', t: [2] }), (C) => { C.assert(P(coins(2), (s) => heads(s) === 2).v === 0.25 && P(coins(2), (s) => heads(s) === 1).v === 0.5, 'not equally likely'); C.key('c'); });
Q('ar4', mk.ar({ a: r`For some event $E$, $P(E) = 1.25$.`, r: r`For every event $E$, $0 \le P(E) \le 1$.`, key: 'd', sol: r`R is true: the number of favourable outcomes is between $0$ and $n$. So no probability can be $1.25$; A is false.`, d: 1, c: 'understanding', t: [1] }), (C) => C.key('d'));
Q('ar5', mk.ar({ a: r`A card is drawn from a deck of 52 cards. The probability that it is a red face card is $\dfrac{3}{26}$.`, r: 'A deck has 6 red face cards: the jack, queen and king of hearts and of diamonds.', key: 'a', sol: r`By R, $P = \dfrac{6}{52} = \dfrac{3}{26}$. R explains A.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(P(deck, (c) => c.face && c.colour === 'red').fav === 6, '6'); C.key('a'); });
Q('ar6', mk.ar({ a: r`A bag has 3 red and 5 black balls. The probability of drawing a red ball is $\dfrac35$.`, r: r`$P(E) = \dfrac{\text{number of outcomes favourable to } E}{\text{total number of outcomes}}$.`, key: 'd', sol: r`By R, $P(\text{red}) = \dfrac{3}{8}$: the total is $8$ balls, not $5$. A is false (it divides red by black); R is true.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(P(bag({ red: 3, black: 5 }), (b) => b === 'red').v === 3 / 8, '3/8'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: 'The probability of a sure event is 1.', key: 't', sol: 'All outcomes are favourable, so P = n/n = 1.', d: 1, c: 'recall', t: [1] }), (C) => C.key('t'));
Q('tf2', mk.tf({ stem: r`If $P(E) = 0.4$, then $P(\text{not } E) = 0.4$.`, key: 'f', sol: r`$P(\text{not } E) = 1 - 0.4 = 0.6$.`, d: 2, c: 'understanding', t: [1] }), (C) => C.key('f'));
Q('tf3', mk.tf({ stem: r`When a die is thrown, the probability of getting an odd number is $\dfrac12$.`, key: 't', sol: r`Odd numbers: $1, 3, 5$: $\dfrac36 = \dfrac12$.`, d: 1, c: 'understanding', t: [2] }), (C) => { C.assert(P(die, (x) => x % 2 === 1).v === 0.5, '1/2'); C.key('t'); });
Q('tf4', mk.tf({ stem: 'When two dice are thrown, each of the sums 2, 3, …, 12 is equally likely.', key: 'f', sol: r`Of the $36$ outcomes, the sum $7$ occurs in $6$ ways but the sum $2$ only in $1$ way ($1, 1$). The sums are not equally likely.`, d: 2, c: 'analysis', t: [2] }), (C) => { C.assert(P(dice2, (p) => sum(p) === 7).fav === 6 && P(dice2, (p) => sum(p) === 2).fav === 1, '6 vs 1'); C.key('f'); });
Q('tf5', mk.tf({ stem: 'A standard deck of 52 cards has 26 black cards.', key: 't', sol: 'Spades and clubs: 13 each, 26 in all.', d: 1, c: 'recall', t: [2] }), (C) => { C.assert(deck.filter((c) => c.colour === 'black').length === 26, '26'); C.key('t'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: r`For any event $E$, $P(E) + P(\text{not } E) =$ ___.`, acc: [['1']], sol: 'An event and its complement together cover all outcomes.', d: 1, c: 'recall', t: [1] }), (C) => C.blank(1));
Q('fb2', mk.fill({ stem: 'The probability of an event that cannot happen is ___.', acc: [['0']], sol: 'An impossible event has probability 0.', d: 1, c: 'recall', t: [1] }), (C) => C.blank(0));
Q('fb3', mk.fill({ stem: 'When two dice are thrown together, the total number of possible outcomes is ___.', acc: [['36']], sol: r`Each of $6$ outcomes of the first die pairs with $6$ of the second: $6 \times 6 = 36$.`, d: 2, c: 'understanding', t: [2] }), (C) => C.blank(dice2.length));
Q('fb4', mk.fill({ stem: 'A bag has 2 red, 3 green and 5 blue balls. The probability of drawing a red ball is ___.', acc: [['1/5', '0.2', '2/10']], sol: r`$\dfrac{2}{10} = \dfrac15$.`, d: 2, c: 'understanding', t: [2] }), (C) => C.blank(P(bag({ red: 2, green: 3, blue: 5 }), (b) => b === 'red').v));
Q('fb5', mk.fill({ stem: 'The number of face cards in a standard deck of 52 cards is ___.', acc: [['12']], sol: 'Jack, queen and king in each of the 4 suits: 12.', d: 1, c: 'recall', t: [2] }), (C) => C.blank(deck.filter((c) => c.face).length));

// =============================================================== Numerical
Q('n01', mk.num({ stem: 'Discs numbered 1 to 40 are placed in a box and one disc is drawn at random. Find the probability (as a decimal) that its number is divisible by 8.', value: 0.125, marks: 2, sol: r`**Step 1.** Multiples of $8$ up to $40$: $8, 16, 24, 32, 40$ — five.

**Step 2.** $P = \dfrac{5}{40} = \dfrac18 = 0.125$.`, scheme: [['5 favourable outcomes', 1], ['0.125', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { const p = P(range(1, 40), (x) => x % 8 === 0); C.val(p.v); C.sol([tex(p)]); });
Q('n02', mk.num({ stem: 'A bag has 7 red, 5 green and 8 white marbles. One marble is drawn at random. Find the probability (as a decimal) that it is green.', value: 0.25, marks: 2, sol: r`**Step 1.** Total $= 7 + 5 + 8 = 20$ marbles.

**Step 2.** $P(\text{green}) = \dfrac{5}{20} = \dfrac14 = 0.25$.`, scheme: [['Total 20', 1], ['0.25', 1]], d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { const p = P(bag({ red: 7, green: 5, white: 8 }), (b) => b === 'green'); C.val(p.v); C.sol([tex(p)]); });
Q('n03', mk.num({ stem: 'Two dice are thrown together. Find the probability that the sum of the numbers is 9. Give your answer as a decimal correct to two places.', value: 0.11, tol: 0.005, marks: 2, sol: r`**Step 1.** Sum $9$: $(3,6), (4,5), (5,4), (6,3)$ — four of the $36$ outcomes.

**Step 2.** $P = \dfrac{4}{36} = \dfrac19 \approx 0.11$.`, scheme: [['4 favourable of 36', 1], ['≈ 0.11', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), (C) => { const p = P(dice2, (q) => sum(q) === 9); C.val(R2(p.v), 0.005); C.sol([tex(p)]); });
Q('n04', mk.num({ stem: 'A card is drawn from a deck of 52 cards. Find the probability that it is a black card that is not a face card. Give your answer as a decimal correct to two places.', value: 0.38, tol: 0.005, marks: 2, sol: r`**Step 1.** Black cards: $26$; black face cards: $6$; so $20$ black non-face cards.

**Step 2.** $P = \dfrac{20}{52} = \dfrac{5}{13} \approx 0.38$.`, scheme: [['20 favourable', 1], ['5/13 ≈ 0.38', 1]], d: 3, c: 'understanding', t: [2], time: 120 }), (C) => { const p = P(deck, (c) => c.colour === 'black' && !c.face); C.val(R2(p.v), 0.005); C.sol([tex(p), 20]); });
Q('n05', mk.num({ stem: r`The probability that it will rain on a given day in Bengaluru is $0.08$. Find the probability that it will not rain on that day.`, value: 0.92, sol: r`$P(\text{no rain}) = 1 - 0.08 = 0.92$.`, scheme: [['0.92', 1]], d: 1, c: 'understanding', t: [1], time: 45 }), (C) => C.val(R2(1 - 0.08)));
Q('n06', mk.num({ stem: 'At a Diwali mela in Varanasi, 400 lucky-dip coupons are sold, of which 12 carry a prize. Sneha buys one coupon. Find the probability (as a decimal) that she wins a prize.', value: 0.03, marks: 2, sol: r`**Step 1.** Each coupon is equally likely to be hers: $400$ outcomes, $12$ favourable.

**Step 2.** $P = \dfrac{12}{400} = \dfrac{3}{100} = 0.03$.`, scheme: [['12/400', 1], ['0.03', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (C) => { const p = P(range(1, 400), (x) => x <= 12); C.val(p.v); C.sol([tex(p)]); });
Q('n07', mk.num({ stem: r`A bag has $6$ red balls and some blue balls. The probability of drawing a blue ball is $\dfrac35$. Find the number of blue balls.`, value: 9, marks: 2, sol: r`**Step 1.** With $b$ blue balls: $\dfrac{b}{6 + b} = \dfrac35 \Rightarrow 5b = 18 + 3b$.

**Step 2.** $2b = 18 \Rightarrow b = 9$. **Check:** $\dfrac{9}{15} = \dfrac35$ ✓.`, scheme: [['Equation', 1], ['9 blue balls', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => { let b = null; for (let k = 0; k <= 100; k++) if (near(P(bag({ red: 6, blue: k }), (x) => x === 'blue').v, 3 / 5)) b = k; C.val(b); C.sol([18]); });
Q('n08', mk.num({ stem: 'Three coins are tossed together. Find the probability (as a decimal) of getting at most one head.', value: 0.5, marks: 2, sol: r`**Step 1.** At most one head: TTT, HTT, THT, TTH — four of the $8$ outcomes.

**Step 2.** $P = \dfrac48 = \dfrac12 = 0.5$.`, scheme: [['4 favourable of 8', 1], ['0.5', 1]], d: 3, c: 'understanding', t: [2], time: 120 }), (C) => { const p = P(coins(3), (s) => heads(s) <= 1); C.val(p.v); C.sol([tex(p)]); });
Q('n09', mk.num({ stem: 'A number is chosen at random from 1 to 100. Find the probability (as a decimal) that it is a perfect square or a perfect cube.', value: 0.12, marks: 2, sol: r`**Step 1.** Squares: $1, 4, 9, \ldots, 100$ — ten. Cubes: $1, 8, 27, 64$ — four. Both: $1$ and $64$. So $10 + 4 - 2 = 12$ numbers.

**Step 2.** $P = \dfrac{12}{100} = 0.12$.`, scheme: [['12 favourable (overlap removed)', 1], ['0.12', 1]], d: 4, c: 'analysis', t: [2], time: 180 }), (C) => { const p = P(range(1, 100), (x) => isSquare(x) || isCube(x)); C.val(p.v); C.assert(p.fav === 12, '12'); });

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'A die is thrown once. Find the probability of getting (a) an even prime number (b) a number between 2 and 6.', model: r`(a) The only even prime is $2$: $P = \dfrac16$.

(b) Between $2$ and $6$: $3, 4, 5$: $P = \dfrac36 = \dfrac12$.`, sol: '"Between" excludes the end numbers 2 and 6.', scheme: [['(a) 1/6', 1], ['(b) 1/2', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { C.model([tex(P(die, (x) => x === 2 && isPrime(x))), tex(P(die, (x) => x > 2 && x < 6))]); });
Q('s202', mk.short({ marks: 2, stem: 'Two coins are tossed together. Write all the possible outcomes and find the probability of getting exactly one head.', model: r`Outcomes: HH, HT, TH, TT — four, equally likely.

Exactly one head: HT, TH. $P = \dfrac24 = \dfrac12$.`, sol: 'HT and TH are different outcomes.', scheme: [['Four outcomes listed', 1], ['1/2', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert(coins(2).length === 4, '4'); C.model([tex(P(coins(2), (s) => heads(s) === 1))]); });
Q('s203', mk.short({ marks: 2, stem: 'A card is drawn at random from a deck of 52 cards. Find the probability that it is a spade or an ace.', model: r`Spades: $13$; aces that are not spades: $3$. Favourable $= 16$.

$P = \dfrac{16}{52} = \dfrac{4}{13}$.`, sol: 'The ace of spades must be counted only once.', scheme: [['16 favourable', 1], ['4/13', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => { const p = P(deck, (c) => c.suit === 'spades' || c.rank === 'A'); C.assert(p.fav === 16, '16'); C.model([16, tex(p)]); });
Q('s204', mk.short({ marks: 2, stem: 'Arjun says: "When a die is thrown, either 6 comes up or it does not. So the probability of getting 6 is 1/2." Is he right? Explain.', model: r`No. The classical definition needs **equally likely** outcomes. "6" and "not 6" are not equally likely: "not 6" happens in $5$ of the $6$ equally likely outcomes.

Correctly, $P(6) = \dfrac16$ and $P(\text{not } 6) = \dfrac56$.`, sol: 'Two possible results do not mean each has probability one-half.', scheme: [['Equally likely condition explained', 1], ['P(6) = 1/6', 1]], d: 3, c: 'evaluation', t: [1], time: 120 }), (C) => { C.model([tex(P(die, (x) => x === 6)), tex(P(die, (x) => x !== 6))]); });
Q('s205', mk.short({ marks: 2, stem: 'A box has 4 red, 5 white and 6 green beads. One bead is taken out at random. Find the probability that it is (a) not green (b) neither red nor white.', model: r`Total $= 15$.

(a) $P(\text{not green}) = \dfrac{9}{15} = \dfrac35$.

(b) Neither red nor white means green: $P = \dfrac{6}{15} = \dfrac25$.`, sol: 'Check: 3/5 + 2/5 = 1.', scheme: [['(a) 3/5', 1], ['(b) 2/5', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { const B = bag({ red: 4, white: 5, green: 6 }); C.model([tex(P(B, (b) => b !== 'green')), tex(P(B, (b) => b !== 'red' && b !== 'white'))]); });
Q('s206', mk.short({ marks: 2, stem: 'Two dice are thrown together. Find the probability that the product of the numbers is 6.', model: r`Product $6$: $(1,6), (6,1), (2,3), (3,2)$ — four of $36$ outcomes.

$P = \dfrac{4}{36} = \dfrac19$.`, sol: 'Order matters: (2, 3) and (3, 2) are different outcomes.', scheme: [['4 favourable', 1], ['1/9', 1]], d: 3, c: 'understanding', t: [2], time: 120 }), (C) => { const p = P(dice2, ([a, b]) => a * b === 6); C.assert(p.fav === 4, '4'); C.model([tex(p)]); });
Q('s207', mk.short({ marks: 2, stem: r`The probability that Ravi's bus to Mangaluru is late on a given day is $\dfrac27$. Find the probability that it is not late, and say which is more likely.`, model: r`$P(\text{not late}) = 1 - \dfrac27 = \dfrac57$.

Since $\dfrac57 > \dfrac27$, the bus being on time is more likely.`, sol: 'Complementary events.', scheme: [['5/7', 1], ['Comparison', 1]], d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.assert(near(1 - 2 / 7, 5 / 7), '5/7'); C.model(['\\dfrac57']); });
Q('s208', mk.short({ marks: 2, stem: 'Tickets numbered 1 to 30 are put in a box. One ticket is drawn at random. Find the probability that the number on it is a prime.', model: r`Primes up to $30$: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29$ — ten.

$P = \dfrac{10}{30} = \dfrac13$.`, sol: '1 is not a prime number.', scheme: [['10 primes', 1], ['1/3', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { const p = P(range(1, 30), isPrime); C.assert(p.fav === 10, '10'); C.model([10, tex(p)]); });
Q('s209', mk.short({ marks: 2, stem: r`A jar has $24$ marbles, some green and the rest blue. The probability of picking a green marble is $\dfrac23$. Find the number of blue marbles.`, model: r`Green $= \dfrac23 \times 24 = 16$, so blue $= 24 - 16 = 8$.`, sol: r`Check: $P(\text{blue}) = \dfrac{8}{24} = \dfrac13 = 1 - \dfrac23$ ✓.`, scheme: [['Green 16', 1], ['Blue 8', 1]], d: 2, c: 'application', t: [2], time: 90 }), (C) => { const g = (2 / 3) * 24; C.assert(g === 16 && P(bag({ green: 16, blue: 8 }), (b) => b === 'blue').v === 1 / 3, 'values'); C.model([16, 8]); });

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: 'Two dice are thrown together. Find the probability that the sum of the numbers (a) is a perfect square (b) is less than 5.', model: r`$36$ equally likely outcomes.

(a) Square sums: $4$ in $3$ ways ($1{+}3, 2{+}2, 3{+}1$) and $9$ in $4$ ways ($3{+}6, 4{+}5, 5{+}4, 6{+}3$): $7$ outcomes. $P = \dfrac{7}{36}$.

(b) Sums $2, 3, 4$: $1 + 2 + 3 = 6$ outcomes. $P = \dfrac{6}{36} = \dfrac16$.`, sol: 'The only perfect squares between 2 and 12 are 4 and 9.', scheme: [['36 outcomes', 1], ['(a) 7/36', 1], ['(b) 1/6', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { C.model([tex(P(dice2, (q) => isSquare(sum(q)))), tex(P(dice2, (q) => sum(q) < 5))]); });
const deckNoRedFace = deck.filter((c) => !(c.face && c.colour === 'red'));
Q('s302', mk.short({ marks: 3, stem: 'All the red face cards are removed from a deck of 52 cards. A card is then drawn at random from the remaining cards. Find the probability that it is (a) a red card (b) a face card (c) a king.', model: r`$6$ red face cards are removed, leaving $46$ cards.

(a) Red cards left: $26 - 6 = 20$: $P = \dfrac{20}{46} = \dfrac{10}{23}$.

(b) Face cards left: the $6$ black ones: $P = \dfrac{6}{46} = \dfrac{3}{23}$.

(c) Kings left: the $2$ black kings: $P = \dfrac{2}{46} = \dfrac{1}{23}$.`, sol: 'Change the total first, then count what is left.', scheme: [['46 cards left', 1], ['(a) 10/23 and (b) 3/23', 1], ['(c) 1/23', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { C.assert(deckNoRedFace.length === 46, '46'); C.model([tex(P(deckNoRedFace, (c) => c.colour === 'red')), tex(P(deckNoRedFace, (c) => c.face)), tex(P(deckNoRedFace, (c) => c.rank === 'K'))]); });
Q('s303', mk.short({ marks: 3, stem: 'Three coins are tossed together. Find the probability of getting (a) at least two heads (b) no head (c) heads and tails alternately.', model: r`Outcomes: HHH, HHT, HTH, THH, HTT, THT, TTH, TTT — eight.

(a) At least two heads: HHH, HHT, HTH, THH: $P = \dfrac48 = \dfrac12$.

(b) No head: TTT: $P = \dfrac18$.

(c) Alternately: HTH, THT: $P = \dfrac28 = \dfrac14$.`, sol: 'List all 8 outcomes before counting.', scheme: [['8 outcomes', 1], ['(a) 1/2 and (b) 1/8', 1], ['(c) 1/4', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { const S = coins(3); C.model([tex(P(S, (s) => heads(s) >= 2)), tex(P(S, (s) => heads(s) === 0)), tex(P(S, (s) => s.join('') === 'HTH' || s.join('') === 'THT'))]); });
Q('s304', mk.short({ marks: 3, stem: r`A bag has $5$ red balls and $x$ blue balls. The probability of drawing a blue ball is twice that of drawing a red ball. (a) Find $x$. (b) If $3$ more red balls are added, find the new probability of drawing a red ball.`, model: r`(a) $\dfrac{x}{5 + x} = 2 \times \dfrac{5}{5 + x} \Rightarrow x = 10$.

(b) Now $8$ red and $10$ blue: $P(\text{red}) = \dfrac{8}{18} = \dfrac49$.`, sol: r`Check (a): $\dfrac{10}{15} = \dfrac23 = 2 \times \dfrac13$ ✓.`, scheme: [['Equation', 1], ['x = 10', 1], ['4/9', 1]], d: 3, c: 'application', t: [2], time: 240 }), (C) => { let x = null; for (let k = 0; k <= 100; k++) { const B = bag({ red: 5, blue: k }); if (near(P(B, (b) => b === 'blue').v, 2 * P(B, (b) => b === 'red').v)) x = k; } C.assert(x === 10, `x ${x}`); C.model([10, tex(P(bag({ red: 8, blue: 10 }), (b) => b === 'red'))]); });
Q('s305', mk.short({ marks: 3, stem: r`Riya says: "When two dice are thrown, the sum can be any of the 11 numbers 2, 3, …, 12, so the probability of a sum of 12 is $\dfrac{1}{11}$." Find her mistake, and find the correct probabilities of a sum of 12 and of a sum of 7.`, model: r`The eleven sums are **not equally likely**, so the classical formula cannot be applied to them. The equally likely outcomes are the $36$ ordered pairs.

Sum $12$: only $(6, 6)$: $P = \dfrac{1}{36}$.

Sum $7$: six pairs, $(1,6)$ to $(6,1)$: $P = \dfrac{6}{36} = \dfrac16$ — six times as likely.`, sol: 'Always use equally likely outcomes.', scheme: [['Identifies unequal likelihood', 1], ['P(12) = 1/36', 1], ['P(7) = 1/6', 1]], d: 3, c: 'evaluation', t: [1, 2], time: 240 }), (C) => { C.model([tex(P(dice2, (q) => sum(q) === 12)), tex(P(dice2, (q) => sum(q) === 7))]); });
const tickets = range(11, 60);
Q('s306', mk.short({ marks: 3, stem: 'Fifty tickets numbered 11 to 60 are placed in a box and one is drawn at random. Find the probability that the number on it (a) is a perfect square (b) is divisible by 7 (c) has digits adding up to 9.', model: r`(a) Squares: $16, 25, 36, 49$: $P = \dfrac{4}{50} = \dfrac{2}{25}$.

(b) Multiples of $7$: $14, 21, 28, 35, 42, 49, 56$: $P = \dfrac{7}{50}$.

(c) Digit sum $9$: $18, 27, 36, 45, 54$: $P = \dfrac{5}{50} = \dfrac{1}{10}$.`, sol: 'There are 60 − 11 + 1 = 50 tickets.', scheme: [['(a) 2/25', 1], ['(b) 7/50', 1], ['(c) 1/10', 1]], d: 3, c: 'understanding', t: [2], time: 240 }), (C) => { C.assert(tickets.length === 50, '50'); const ds = (n) => String(n).split('').reduce((s, c) => s + Number(c), 0); C.model([tex(P(tickets, isSquare)), tex(P(tickets, (n) => n % 7 === 0)), tex(P(tickets, (n) => ds(n) === 9))]); });
const spinner = range(1, 8);
Q('s307', mk.short({ marks: 3, stem: 'A spinner at a school fair in Mysuru has 8 equal sectors numbered 1 to 8. Find the probability that the arrow stops on (a) a number greater than 5 (b) an odd number (c) a factor of 8.', model: r`$8$ equally likely outcomes.

(a) $6, 7, 8$: $P = \dfrac38$.

(b) $1, 3, 5, 7$: $P = \dfrac48 = \dfrac12$.

(c) $1, 2, 4, 8$: $P = \dfrac48 = \dfrac12$.`, sol: 'Equal sectors make the outcomes equally likely.', scheme: [['(a) 3/8', 1], ['(b) 1/2', 1], ['(c) 1/2', 1]], d: 2, c: 'understanding', t: [2], time: 180 }), (C) => { C.model([tex(P(spinner, (n) => n > 5)), tex(P(spinner, (n) => n % 2 === 1)), tex(P(spinner, (n) => 8 % n === 0))]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: `Two dice, one blue and one grey, are thrown together.
(a) How many outcomes are possible?
(b) Find the probability that the sum is 8.
(c) Find the probability that the sum is at least 9.
(d) Find the probability that the difference of the numbers is 2.
(e) Find the probability of a doublet of even numbers.`, model: r`(a) $6 \times 6 = 36$ equally likely outcomes.

(b) Sum $8$: $(2,6), (3,5), (4,4), (5,3), (6,2)$: $P = \dfrac{5}{36}$.

(c) Sums $9, 10, 11, 12$: $4 + 3 + 2 + 1 = 10$ outcomes: $P = \dfrac{10}{36} = \dfrac{5}{18}$.

(d) Difference $2$: $(1,3), (3,1), (2,4), (4,2), (3,5), (5,3), (4,6), (6,4)$: $P = \dfrac{8}{36} = \dfrac29$.

(e) $(2,2), (4,4), (6,6)$: $P = \dfrac{3}{36} = \dfrac{1}{12}$.`, sol: 'Use the 6 × 6 table of outcomes; colour the dice so that (2, 6) and (6, 2) are clearly different.', scheme: [['36 outcomes', 1], ['(b) 5/36', 1], ['(c) 5/18', 1], ['(d) 2/9', 1], ['(e) 1/12', 1]], d: 3, c: 'understanding', t: [2], time: 600 }), (C) => { C.model([36, tex(P(dice2, (q) => sum(q) === 8)), tex(P(dice2, (q) => sum(q) >= 9)), tex(P(dice2, ([a, b]) => Math.abs(a - b) === 2)), tex(P(dice2, ([a, b]) => a === b && a % 2 === 0))]); });
Q('l02', mk.long({ stem: `A card is drawn at random from a well-shuffled deck of 52 playing cards. Find the probability that it is
(a) a black king
(b) neither a red card nor a queen
(c) a face card of spades
(d) not an ace
(e) a red card or a king.`, model: r`(a) $2$ black kings: $\dfrac{2}{52} = \dfrac{1}{26}$.

(b) Black cards that are not queens: $26 - 2 = 24$: $\dfrac{24}{52} = \dfrac{6}{13}$.

(c) J, Q, K of spades: $\dfrac{3}{52}$.

(d) $52 - 4 = 48$: $\dfrac{48}{52} = \dfrac{12}{13}$.

(e) $26$ red cards $+ 2$ black kings $= 28$: $\dfrac{28}{52} = \dfrac{7}{13}$.`, sol: 'For "or", count each card once; for "neither … nor", count what is left.', scheme: [['(a) 1/26', 1], ['(b) 6/13', 1], ['(c) 3/52', 1], ['(d) 12/13', 1], ['(e) 7/13', 1]], d: 3, c: 'understanding', t: [2], time: 600 }), (C) => { C.model([tex(P(deck, (c) => c.rank === 'K' && c.colour === 'black')), tex(P(deck, (c) => c.colour !== 'red' && c.rank !== 'Q')), tex(P(deck, (c) => c.face && c.suit === 'spades')), tex(P(deck, (c) => c.rank !== 'A')), tex(P(deck, (c) => c.colour === 'red' || c.rank === 'K'))]); });
Q('l03', mk.long({ stem: `Bag A has 4 red and 6 blue balls. Bag B has $x$ red and 12 blue balls.
(a) If the probability of drawing a red ball is the same for both bags, find $x$.
(b) Then 3 red balls are moved from bag B to bag A. Find the new probability of drawing a red ball from each bag.
(c) From which bag is a red ball now more likely? Justify.`, model: r`(a) $\dfrac{x}{x + 12} = \dfrac{4}{10} \Rightarrow 10x = 4x + 48 \Rightarrow x = 8$.

(b) Bag A: $7$ red, $6$ blue: $P = \dfrac{7}{13}$. Bag B: $5$ red, $12$ blue: $P = \dfrac{5}{17}$.

(c) $\dfrac{7}{13} \approx 0.54$ and $\dfrac{5}{17} \approx 0.29$, so bag A is now more likely to give a red ball.`, sol: r`Check (a): $\dfrac{8}{20} = \dfrac25 = \dfrac{4}{10}$ ✓.`, scheme: [['Equation', 1], ['x = 8', 1], ['Bag A 7/13', 1], ['Bag B 5/17', 1], ['Comparison with justification', 1]], d: 4, c: 'analysis', t: [2], time: 660 }), (C) => { let x = null; for (let k = 0; k <= 100; k++) if (near(P(bag({ red: k, blue: 12 }), (b) => b === 'red').v, 0.4)) x = k; C.assert(x === 8, `x ${x}`); C.model([8, tex(P(bag({ red: 7, blue: 6 }), (b) => b === 'red')), tex(P(bag({ red: 5, blue: 12 }), (b) => b === 'red')), 0.54, 0.29]); });
Q('l04', mk.long({ stem: `At a school fete in Kolkata, a stall runs this game: you throw a die once. You win ₹10 if it shows 6, ₹5 if it shows 4 or 5, and nothing otherwise.
(a) Find the probability of winning ₹10.
(b) Find the probability of winning ₹5.
(c) Find the probability of winning nothing.
(d) Show that the three probabilities add up to 1, and explain why they must.
(e) Find the probability of winning something.`, model: r`(a) $P(6) = \dfrac16$.

(b) $P(4 \text{ or } 5) = \dfrac26 = \dfrac13$.

(c) $P(1, 2 \text{ or } 3) = \dfrac36 = \dfrac12$.

(d) $\dfrac16 + \dfrac13 + \dfrac12 = \dfrac{1 + 2 + 3}{6} = 1$. The three events have no outcome in common and together cover all six outcomes.

(e) $P(\text{something}) = 1 - \dfrac12 = \dfrac12$ (or $\dfrac16 + \dfrac13$).`, sol: 'Complementary events: winning something and winning nothing.', scheme: [['(a) 1/6', 1], ['(b) 1/3', 1], ['(c) 1/2', 1], ['(d) sum 1 with reason', 1], ['(e) 1/2', 1]], d: 2, c: 'application', t: [1, 2], time: 540 }), (C) => { const a = P(die, (x) => x === 6), b = P(die, (x) => x === 4 || x === 5), c = P(die, (x) => x <= 3); C.assert(near(a.v + b.v + c.v, 1), 'sum 1'); C.model([tex(a), tex(b), tex(c)]); });
const discs80 = range(1, 80);
Q('l05', mk.long({ stem: `A box has 80 discs numbered 1 to 80. One disc is drawn at random. Find the probability that its number is
(a) a two-digit number
(b) a perfect square
(c) divisible by 5
(d) a prime number
(e) divisible by both 3 and 4.`, model: r`(a) $10$ to $80$: $71$ numbers: $\dfrac{71}{80}$.

(b) $1, 4, 9, 16, 25, 36, 49, 64$: $\dfrac{8}{80} = \dfrac{1}{10}$.

(c) $5, 10, \ldots, 80$: $16$ numbers: $\dfrac{16}{80} = \dfrac15$.

(d) Primes up to $80$: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79$ — $22$: $\dfrac{22}{80} = \dfrac{11}{40}$.

(e) Divisible by both $3$ and $4$ means divisible by $12$: $12, 24, 36, 48, 60, 72$ — $6$: $\dfrac{6}{80} = \dfrac{3}{40}$.`, sol: 'Count carefully; list where needed.', scheme: [['(a) 71/80', 1], ['(b) 1/10', 1], ['(c) 1/5', 1], ['(d) 11/40', 1], ['(e) 3/40', 1]], d: 4, c: 'understanding', t: [2], time: 660 }), (C) => { C.model([tex(P(discs80, (n) => n >= 10)), tex(P(discs80, isSquare)), tex(P(discs80, (n) => n % 5 === 0)), tex(P(discs80, isPrime)), tex(P(discs80, (n) => n % 3 === 0 && n % 4 === 0))]); C.assert(P(discs80, isPrime).fav === 22, '22 primes'); });
Q('l06', mk.long({ stem: `Asha, Bhaskar and Chitra play a game with three coins tossed together. Asha wins if all three coins show the same face. Bhaskar wins if exactly two coins show heads. Chitra wins in every other case.
(a) List the sample space.
(b) Find the probability of winning for each player.
(c) Is the game fair? Explain.
(d) Change only Asha's rule so that she and Bhaskar have equal chances, and check that the three probabilities still add up to 1.`, model: r`(a) HHH, HHT, HTH, THH, HTT, THT, TTH, TTT — eight equally likely outcomes.

(b) Asha (HHH, TTT): $\dfrac28 = \dfrac14$. Bhaskar (HHT, HTH, THH): $\dfrac38$. Chitra (exactly one head: HTT, THT, TTH): $\dfrac38$.

(c) Not fair: Asha's chance $\dfrac14$ is less than the others' $\dfrac38$.

(d) Let Asha win on **exactly two tails** (HTT, THT, TTH), and Chitra on the remaining outcomes (HHH, TTT). The new rule must not share outcomes with Bhaskar's. Then Asha $\dfrac38$, Bhaskar $\dfrac38$, Chitra $\dfrac14$, and $\dfrac38 + \dfrac38 + \dfrac14 = 1$ ✓.`, sol: 'A fair game gives every player the same probability of winning.', scheme: [['Sample space', 1], ['Asha 1/4, Bhaskar 3/8, Chitra 3/8', 1], ['Not fair, with reason', 1], ['A valid new rule', 1], ['Sum checked = 1', 1]], d: 5, c: 'evaluation', t: [1, 2], time: 720 }), (C) => { const S = coins(3); const a = P(S, (s) => heads(s) === 3 || heads(s) === 0), b = P(S, (s) => heads(s) === 2), c = P(S, (s) => heads(s) === 1), a2 = P(S, (s) => heads(s) === 1); C.assert(near(a.v + b.v + c.v, 1) && near(a2.v, b.v), 'values'); C.model([tex(a), tex(b), '\\dfrac38']); });

// =============================================================== Case-based
caseQ('c01', {
  passage: `Four friends in Guwahati play Ludo on a rainy afternoon. A player throws one die each turn, and needs a 6 to bring a new piece onto the board. In a variant they sometimes play, each player throws two dice together.`,
  d: 3, c: 'understanding',
  model: r`(a) Option (a): $\dfrac16$. (b) $\dfrac12$. (c) (i) $\dfrac{11}{36}$. Or (ii) $\dfrac{1}{36}$.`,
  sol: r`One die: $P(6) = \dfrac16$; odd: $\dfrac36 = \dfrac12$. Two dice: at least one $6$ in $11$ of $36$ outcomes; sum $12$ only for $(6,6)$.`,
  children: [
    child('a', mk.mcq({ stem: 'With one die, the probability of getting a 6 on a throw is', opts: [r`$\dfrac16$`, r`$\dfrac56$`, r`$\dfrac12$`, '$1$'], key: 'a', sol: r`One favourable face out of six: $\dfrac16$.`, d: 1, c: 'understanding', t: [2], time: 30 })),
    child('b', mk.fill({ stem: 'With one die, the probability of getting an odd number is ___.', acc: [['1/2', '0.5', '3/6']], sol: r`$1, 3, 5$: $\dfrac36 = \dfrac12$.`, d: 1, c: 'understanding', t: [2], time: 45 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** With two dice, find the probability that at least one die shows a 6.', model: r`Outcomes with no $6$: $5 \times 5 = 25$. So at least one $6$: $36 - 25 = 11$ outcomes. $P = \dfrac{11}{36}$.`, sol: 'Use the complement: no 6 at all.', scheme: [['11 favourable (via complement)', 1], ['11/36', 1]], d: 3, c: 'analysis', t: [1, 2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** With two dice, find the probability that the sum is 12, and explain why it is so small.', model: r`Only $(6, 6)$ gives $12$: $P = \dfrac{1}{36}$. Both dice must show $6$, which happens in just one of the $36$ equally likely outcomes.`, sol: 'One outcome out of 36.', scheme: [['1/36', 1], ['Explanation', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').which([1 / 6, 5 / 6, 1 / 2, 1], P(die, (x) => x === 6).v); C.child('b').blank(P(die, (x) => x % 2 === 1).v); C.child('c').model([tex(P(dice2, ([a, b]) => a === 6 || b === 6)), 25]); C.child('cii').model([tex(P(dice2, (q) => sum(q) === 12))]); });

const noHearts = deck.filter((c) => c.suit !== 'hearts');
caseQ('c02', {
  passage: 'At a school magic show in Jabalpur, the magician asks a volunteer to pick one card at random from a well-shuffled deck of 52 playing cards.',
  d: 3, c: 'understanding',
  model: r`(a) Option (b): $\dfrac14$. (b) $6$. (c) (i) $\dfrac{3}{26}$. Or (ii) $\dfrac23$.`,
  sol: r`Diamonds $\dfrac{13}{52}$; red face cards $6$, $\dfrac{6}{52} = \dfrac{3}{26}$. Without hearts, $39$ cards, $26$ black: $\dfrac{26}{39} = \dfrac23$.`,
  children: [
    child('a', mk.mcq({ stem: 'The probability that the card is a diamond is', opts: [r`$\dfrac{1}{13}$`, r`$\dfrac14$`, r`$\dfrac12$`, r`$\dfrac{1}{52}$`], key: 'b', sol: r`$\dfrac{13}{52} = \dfrac14$.`, d: 1, c: 'understanding', t: [2], time: 30 })),
    child('b', mk.num({ stem: 'How many red face cards are there in the deck?', value: 6, sol: 'J, Q, K of hearts and of diamonds: 6.', scheme: [['6', 1]], d: 1, c: 'recall', t: [2], time: 30 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the probability that the card is a red face card.', model: r`$\dfrac{6}{52} = \dfrac{3}{26}$.`, sol: '6 favourable of 52.', scheme: [['6/52', 1], ['3/26', 1]], d: 2, c: 'understanding', t: [2], time: 60 }), [
      mk.short({ marks: 2, stem: '**(ii)** Before the trick, the magician removes all the hearts. Find the probability that the volunteer now picks a black card.', model: r`$39$ cards remain, all $26$ black cards among them: $P = \dfrac{26}{39} = \dfrac23$.`, sol: 'New total 39.', scheme: [['39 cards', 1], ['2/3', 1]], d: 3, c: 'application', t: [2], time: 90 }),
    ]),
  ],
}, (C) => { C.child('a').which([1 / 13, 1 / 4, 1 / 2, 1 / 52], P(deck, (c) => c.suit === 'diamonds').v); C.child('b').val(deck.filter((c) => c.face && c.colour === 'red').length); C.child('c').model([tex(P(deck, (c) => c.face && c.colour === 'red'))]); C.child('cii').model([39, tex(P(noHearts, (c) => c.colour === 'black'))]); });

const dip = bag({ red: 10, green: 15, yellow: 25 });
caseQ('c03', {
  passage: 'A lucky-dip box at a Diwali mela in Ahmedabad has 10 red, 15 green and 25 yellow balls of the same size. A visitor takes out one ball without looking.',
  d: 3, c: 'understanding',
  model: r`(a) Option (c): $\dfrac{3}{10}$. (b) $0.5$. (c) (i) $\dfrac45$. Or (ii) $10$ red balls.`,
  sol: r`Total $50$. Green $\dfrac{15}{50}$; yellow $\dfrac{25}{50} = 0.5$; not red $\dfrac{40}{50}$. Adding $r$ red: $\dfrac{10 + r}{50 + r} = \dfrac13 \Rightarrow r = 10$.`,
  children: [
    child('a', mk.mcq({ stem: 'The probability that the ball is green is', opts: [r`$\dfrac{3}{5}$`, r`$\dfrac15$`, r`$\dfrac{3}{10}$`, r`$\dfrac{15}{35}$`], key: 'c', sol: r`$\dfrac{15}{50} = \dfrac{3}{10}$. Option (d) divides by the number of non-green balls.`, d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: 'Find the probability (as a decimal) that the ball is yellow.', value: 0.5, sol: r`$\dfrac{25}{50} = 0.5$.`, scheme: [['0.5', 1]], d: 1, c: 'understanding', t: [2], time: 45 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the probability that the ball is not red.', model: r`$P(\text{not red}) = 1 - \dfrac{10}{50} = \dfrac{40}{50} = \dfrac45$.`, sol: 'Complement.', scheme: [['1 − 1/5', 1], ['4/5', 1]], d: 2, c: 'understanding', t: [1, 2], time: 60 }), [
      mk.short({ marks: 2, stem: '**(ii)** How many red balls must be added so that the probability of a red ball becomes 1/3?', model: r`$\dfrac{10 + r}{50 + r} = \dfrac13 \Rightarrow 30 + 3r = 50 + r \Rightarrow r = 10$. Check: $\dfrac{20}{60} = \dfrac13$ ✓.`, sol: 'Both the red count and the total change.', scheme: [['Equation', 1], ['10 balls', 1]], d: 3, c: 'analysis', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').which([3 / 5, 1 / 5, 3 / 10, 15 / 35], P(dip, (b) => b === 'green').v); C.child('b').val(P(dip, (b) => b === 'yellow').v); C.child('c').model([tex(P(dip, (b) => b !== 'red'))]); let rr = null; for (let k = 0; k <= 100; k++) if (near(P(bag({ red: 10 + k, green: 15, yellow: 25 }), (b) => b === 'red').v, 1 / 3)) rr = k; C.child('cii').model([rr]); });

caseQ('c04', {
  passage: 'In a quiz round at a school in Shillong, the quizmaster tosses three coins together and asks the teams to predict the outcome before the coins land.',
  d: 3, c: 'understanding',
  model: r`(a) Option (d): $8$. (b) $0.375$. (c) (i) $\dfrac78$. Or (ii) $\dfrac12$.`,
  sol: r`$8$ outcomes. Exactly one tail: HHT, HTH, THH: $\dfrac38$. At least one head $= 1 - P(\text{TTT}) = \dfrac78$. More heads than tails: $2$ or $3$ heads: $\dfrac48$.`,
  children: [
    child('a', mk.mcq({ stem: 'The number of possible outcomes is', opts: ['$3$', '$4$', '$6$', '$8$'], key: 'd', sol: r`Each coin has $2$ faces: $2 \times 2 \times 2 = 8$.`, d: 1, c: 'understanding', t: [2], time: 30 })),
    child('b', mk.num({ stem: 'Find the probability (as a decimal) of getting exactly one tail.', value: 0.375, sol: r`HHT, HTH, THH: $\dfrac38 = 0.375$.`, scheme: [['0.375', 1]], d: 2, c: 'understanding', t: [2], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the probability of getting at least one head.', model: r`The only outcome with no head is TTT. $P = 1 - \dfrac18 = \dfrac78$.`, sol: 'Complement of "no head".', scheme: [['Complement idea', 1], ['7/8', 1]], d: 2, c: 'understanding', t: [1, 2], time: 90 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the probability of getting more heads than tails.', model: r`More heads than tails means $2$ or $3$ heads: HHT, HTH, THH, HHH: $P = \dfrac48 = \dfrac12$.`, sol: 'With three coins, there is never a tie.', scheme: [['4 favourable', 1], ['1/2', 1]], d: 3, c: 'analysis', t: [2], time: 90 }),
    ]),
  ],
}, (C) => { const S = coins(3); C.child('a').which([3, 4, 6, 8], S.length); C.child('b').val(P(S, (s) => heads(s) === 2).v); C.child('c').model([tex(P(S, (s) => heads(s) >= 1))]); C.child('cii').model([tex(P(S, (s) => heads(s) >= 2))]); });

caseQ('c05', {
  passage: 'Class 10 students in Ranchi design a board game in which a player throws two dice together and moves according to the sum and the product of the two numbers.',
  d: 3, c: 'understanding',
  model: r`(a) Option (b): $36$. (b) $0.08$. (c) (i) $\dfrac{5}{12}$. Or (ii) $\dfrac14$.`,
  sol: r`Sum $10$: $3$ outcomes, $\dfrac{3}{36} = \dfrac{1}{12} \approx 0.08$. Prime sums $2, 3, 5, 7, 11$: $1 + 2 + 4 + 6 + 2 = 15$, $\dfrac{15}{36} = \dfrac{5}{12}$. Odd product: both odd, $3 \times 3 = 9$, $\dfrac{9}{36} = \dfrac14$.`,
  children: [
    child('a', mk.mcq({ stem: 'The number of equally likely outcomes is', opts: ['$12$', '$36$', '$11$', '$6$'], key: 'b', sol: r`$6 \times 6 = 36$. Option (c) counts the possible sums, which are not equally likely.`, d: 1, c: 'understanding', t: [2], time: 30 })),
    child('b', mk.num({ stem: 'Find the probability that the sum is 10, as a decimal correct to two places.', value: 0.08, tol: 0.005, sol: r`$(4,6), (5,5), (6,4)$: $\dfrac{3}{36} = \dfrac{1}{12} \approx 0.08$.`, scheme: [['0.08', 1]], d: 2, c: 'understanding', t: [2], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the probability that the sum is a prime number.', model: r`Prime sums: $2$ (1 way), $3$ (2), $5$ (4), $7$ (6), $11$ (2): $15$ outcomes. $P = \dfrac{15}{36} = \dfrac{5}{12}$.`, sol: 'List the prime sums from 2 to 12.', scheme: [['15 favourable', 1], ['5/12', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** Find the probability that the product of the numbers is odd.', model: r`The product is odd only when both numbers are odd: $3 \times 3 = 9$ outcomes. $P = \dfrac{9}{36} = \dfrac14$.`, sol: 'One even factor makes the product even.', scheme: [['9 favourable', 1], ['1/4', 1]], d: 3, c: 'understanding', t: [2], time: 120 }),
    ]),
  ],
}, (C) => { C.child('a').which([12, 36, 11, 6], dice2.length); C.child('b').val(R2(P(dice2, (q) => sum(q) === 10).v), 0.005); C.child('c').model([15, tex(P(dice2, (q) => isPrime(sum(q))))]); C.child('cii').model([tex(P(dice2, ([a, b]) => (a * b) % 2 === 1))]); });
// =============================================================== added 2026-10-27 (assessment-designer)
// Recall/understanding written items for the board-paper competency balance (blueprint 54/24/22 Standard,
// 75/15/10 Basic). Appended after every existing item so earlier ids do not move.
Q('u301', mk.short({
  marks: 3,
  stem: r`A bag contains 6 red, 4 blue and 10 yellow balls of the same size. One ball is drawn at random. Find the probability that the ball drawn is (a) blue, (b) not yellow, (c) green.`,
  model: r`Total number of balls $= 6 + 4 + 10 = 20$; each is equally likely to be drawn.

(a) $P(\text{blue}) = \dfrac{4}{20} = \dfrac15$.

(b) Balls that are not yellow: $6 + 4 = 10$, so $P(\text{not yellow}) = \dfrac{10}{20} = \dfrac12$. (Or $1 - \dfrac{10}{20} = \dfrac12$.)

(c) There are no green balls, so $P(\text{green}) = \dfrac{0}{20} = 0$: an impossible event.`,
  sol: r`$P(E) = \dfrac{\text{number of favourable outcomes}}{\text{total number of outcomes}}$; an event with no favourable outcome has probability $0$.`,
  scheme: [['P(blue) = 1/5', 1], ['P(not yellow) = 1/2', 1], ['P(green) = 0, impossible event', 1]],
  d: 1, c: 'understanding', t: [1, 2], time: 180,
}), (C) => { const b = bag({ red: 6, blue: 4, yellow: 10 }); const pb = P(b, (x) => x === 'blue'), pny = P(b, (x) => x !== 'yellow'), pg = P(b, (x) => x === 'green'); C.assert(pb.num === 1 && pb.den === 5 && pny.num === 1 && pny.den === 2 && pg.fav === 0, 'probabilities'); C.model([r`\dfrac15`, r`\dfrac12`, 'impossible']); });
