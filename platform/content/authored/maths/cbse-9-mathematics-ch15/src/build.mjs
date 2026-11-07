// Build CBSE 9 Mathematics ch15 Introduction to Probability. Run from platform/:
//   npx tsx content/_stage/maths/cbse-9-mathematics-ch15/src/build.mjs
// Every probability quoted is computed from counts or from the sample space (p.mjs reduces the fractions); the coin and die experiments are
// simulated with a seeded generator and their counts are asserted (figs.mjs); every figure is drawn from computed values.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, must, rd, sum } from './h.mjs';
import { frac, fs, ft, pr, upto, isPrime, isSquare } from './p.mjs';
import { COIN_N, COIN_H, DIE_N, DIE_C, SIX, EVEN, SPIN, RAIN, BEADS, fScale, fScaleEvents, fCoinRun, fSpin, fRain, fBeads, fDieBars, fDieRun } from './figs.mjs';

setUnit('cbse-9-mathematics-ch15', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
await import('./questions.mjs');
await import('./questions2.mjs');
await import('./questions3.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TF = (n, d) => `$${ft(n, d)}$`;
/** Decimal text of n over d, joined with an approximation sign when it is rounded. */
const dec = (n, d, k = 3) => {
  const v = n / d, x = rd(v, k);
  return Math.abs(v - x) < 1e-12 ? `$${x}$` : String.raw`$\approx ${x}$`;
};

// ================================================================ tables and checks, deck 1
const DIE = upto(1, 6);
const evDie = [['A fair die shows $7$', (x) => x === 7, 'Impossible'], ['A fair die shows a $6$', (x) => x === 6, 'Unlikely'], ['A fair die shows an even number', (x) => x % 2 === 0, 'Even chance'], ['A fair die shows a number less than $6$', (x) => x < 6, 'Likely'], ['A fair die shows a number from $1$ to $6$', (x) => x >= 1 && x <= 6, 'Certain']];
const evP = evDie.map(([, f]) => frac(DIE.filter(f).length, 6));
must(evP.map((p) => p.join('/')).join() === '0/1,1/6,1/2,5/6,1/1', 'placing events: 0, 1/6, 1/2, 5/6, 1');
const setOf = (f) => { const s = DIE.filter(f); return s.length ? `$\\{${s.join(', ')}\\}$` : 'no outcome'; };
const tLike = table(['Word', 'Meaning', 'Probability', 'Example'], [
  ['Impossible', 'Cannot happen', '$0$', 'A fair die shows a $9$'],
  ['Unlikely', 'Could happen, but probably will not', r`Close to $0$`, 'A team that has lost every match this season wins the final'],
  ['Even chance', 'As likely to happen as not to happen', r`$\dfrac{1}{2}$`, 'A fair coin lands showing a head'],
  ['Likely', 'Will probably happen', r`Close to $1$`, 'A bus that is on time on most days is on time today'],
  ['Certain', 'Must happen', '$1$', 'The next day of the week after Sunday is Monday'],
], 'Table of words for chance. Impossible means it cannot happen and the probability is 0, for example a fair die showing a 9. Unlikely is close to 0. Even chance is one half, for example a fair coin showing a head. Likely is close to 1. Certain means it must happen and the probability is 1.', 'Five words for chance and the numbers they match.');
const tPlace = table(['Event', 'Favourable outcomes', 'Probability', 'In words'], evDie.map(([name, f, w], i) => [name, setOf(f), TF(...evP[i]), w]),
  'Table of five events of one throw of a fair die. A 7 has no favourable outcome and probability 0, impossible. A 6 has one favourable outcome and probability one sixth, unlikely. An even number has three outcomes and probability one half, an even chance. A number less than 6 has five outcomes and probability five sixths, likely. A number from 1 to 6 has six outcomes and probability 1, certain.', 'Count the favourable outcomes out of 6 and choose the word.');
const tTerms = table(['Term', 'Meaning', 'Example'], [
  ['Experiment', 'An activity whose result we observe', 'Tossing a coin'],
  ['Trial', 'One performance of the experiment', 'One toss of the coin'],
  ['Outcome', 'One possible result of a trial', 'A head'],
  ['Event', 'An outcome, or a group of outcomes, that we are interested in', 'Getting a number greater than $4$ when a die is thrown'],
], 'Table of terms. An experiment is an activity whose result we observe, such as tossing a coin. A trial is one performance of it, one toss. An outcome is one possible result, a head. An event is an outcome or a group of outcomes we are interested in, such as getting a number greater than 4 when a die is thrown.', 'An event is made of outcomes; a trial gives one outcome.');
const CAP = { up: 31, not: 19 };
must(CAP.up + CAP.not === 50 && fs(31, 50) === '31/50' && fs(19, 50) === '19/50', 'bottle cap: 31 and 19 of 50');
const tCap = table(['Result', 'Number of trials', 'Empirical probability'], [['Lands top up', `$${CAP.up}$`, TF(CAP.up, 50)], ['Does not land top up', `$${CAP.not}$`, TF(CAP.not, 50)], ['All trials', '$50$', '$1$']],
  'Table of a bottle cap flipped 50 times in a playground in Surat: it landed top up in 31 trials and not top up in 19 trials. The empirical probabilities are 31 over 50 and 19 over 50, and together they make 1.', 'Empirical probability = trials in which the event happens divided by all trials.');
must((SPIN.vals[0] + SPIN.vals[1]) === 15 && fs(15, 40) === '3/8' && fs(40 - SPIN.vals[4], 40) === '17/20' && fs(SPIN.vals[2], 40) === '11/40', 'spinner readings');
const tSpin = table(['Colour', 'Times the arrow stopped', 'Empirical probability'], [...SPIN.cats.map((c, i) => [c, `$${SPIN.vals[i]}$`, TF(SPIN.vals[i], 40)]), ['All spins', '$40$', '$1$']],
  'Table of 40 spins of a five-colour spinner at a science fair. Red 9 times, probability 9 over 40; blue 6 times, 3 over 20; green 11 times, 11 over 40; yellow 8 times, one fifth; white 6 times, 3 over 20. The total is 40 spins, probability 1.', 'The empirical probabilities of all the colours add up to 1.');
const tCoin = table(['Tosses $n$', 'Heads', 'Relative frequency', 'Distance from $\\tfrac{1}{2}$'], COIN_N.map((n, i) => [`$${n}$`, `$${COIN_H[i]}$`, dec(COIN_H[i], n), `$${rd(Math.abs(COIN_H[i] / n - 0.5), 3)}$`]),
  'Table of a simulated coin experiment. After 10 tosses there are 6 heads, relative frequency 0.6; after 50 tosses 28 heads, 0.56; after 100 tosses 48 heads, 0.48; after 500 tosses 262 heads, about 0.524; after 1000 tosses 501 heads, 0.501. The distance from one half is 0.1, 0.06, 0.02, 0.024 and 0.001.', 'The relative frequency is nearest to one half after the most tosses.');
must(COIN_N.map((n, i) => rd(Math.abs(COIN_H[i] / n - 0.5), 3)).join() === '0.1,0.06,0.02,0.024,0.001', 'distances from one half');
const BULB = { fail: 14, ok: 386 };
must(BULB.fail + BULB.ok === 400 && fs(14, 400) === '7/200' && fs(386, 400) === '193/200', 'bulbs: 7/200 and 193/200');
const tBulb = table(['Result of the test', 'Number of bulbs', 'Empirical probability'], [['Fails before $1000$ hours', `$${BULB.fail}$`, TF(14, 400)], ['Lasts $1000$ hours', `$${BULB.ok}$`, TF(386, 400)], ['All bulbs tested', '$400$', '$1$']],
  'Table of 400 LED bulbs tested in a lab in Rajkot for 1000 hours of use. 14 bulbs fail, probability 7 over 200, and 386 last, probability 193 over 200.', 'The two probabilities add up to 1.');
must(sum(RAIN.vals) === 90 && fs(24, 30) === '4/5' && fs(27, 30) === '9/10' && fs(21, 30) === '7/10' && fs(18, 30) === '3/5' && fs(120 - 90, 120) === '1/4', 'rain table');
const tRain = table(['Period', 'Rainy days', 'Days', 'Fraction rainy'], [...RAIN.cats.map((c, i) => [c, `$${RAIN.vals[i]}$`, '$30$', TF(RAIN.vals[i], 30)]), ['All four periods', '$90$', '$120$', TF(90, 120)]],
  'Table of the rainy days in four periods of 30 days in a Guwahati record: 24, 27, 21 and 18 rainy days, fractions four fifths, nine tenths, seven tenths and three fifths. In all, 90 rainy days out of 120, which is three quarters.', 'Add the rainy days of the periods, and divide by the total number of days.');
const goal1 = flow('LR', [['a', 'Words for chance'], ['b', 'Probability scale from 0 to 1'], ['c', 'Experiments and trials'], ['d', 'Empirical probability'], ['e', 'More trials, steadier value']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of Part 1: words for chance, the probability scale from 0 to 1, experiments and trials, empirical probability and the steadier value that comes from more trials.', 'Part 1 road map.');
const sum1 = flow('LR', [['a', 'Chance words and the scale 0 to 1'], ['b', 'Empirical probability = successes / trials'], ['c', 'More trials, steadier estimate'], ['d', 'Never below 0 or above 1']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 1: chance words and the scale from 0 to 1, empirical probability as the number of successes over the number of trials, a steadier estimate from more trials, and a probability is never below 0 or above 1.', 'Four ideas of Part 1.');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: 'Introduction to Probability: Part 1, likelihood and empirical probability',
  goals: ['Use the words impossible, unlikely, even chance, likely and certain, and place them on a scale from 0 to 1', 'Tell an experiment, a trial, an outcome and an event apart', 'Find an empirical probability from the results of an experiment or a survey', 'See that more trials give a steadier estimate'],
  slides: [
    sl('title', 'How likely is it?', { b: r`Will it rain on Sunday? Will the coin show a head? **Probability** is a number from $0$ to $1$ that tells **how likely** an event is.`, v: fScale, n: `Will it rain on Sunday? Will the next toss of a coin show a head? We often say that something is likely or unlikely. Probability turns these words into a number between zero and one. In this part we also learn to estimate that number from an experiment.` }),
    sl('concept', 'What you will be able to do', { ul: ['Use words for **chance** and put them on the scale', 'Tell an **experiment**, **trial**, **outcome** and **event** apart', 'Find an **empirical probability** from data', 'Explain why **more trials** give a better estimate'], v: goal1, n: `First we meet the words we use for chance, and the scale from zero to one. Then we learn the language of experiments. After that we estimate probability from real counts, such as coin tosses, bulbs that fail and rainy days, and see why many trials give a better estimate.` }),
    sl('concept', 'Words for chance', { b: 'Everyday words tell us **roughly** how likely an event is. Each word matches a **range of numbers**.', v: tLike, n: `Five words are enough for a first idea. If an event cannot happen, it is impossible. If it could happen but probably will not, it is unlikely. If it is as likely to happen as not, it has an even chance. If it will probably happen, it is likely, and if it must happen, it is certain.` }),
    sl('diagram', 'The probability scale', { b: r`The probability of an event is a number from $0$ to $1$. **Impossible** is $0$, **certain** is $1$, and an **even chance** is $\dfrac{1}{2}$. A probability can **never be less than $0$ or more than $1$**.`, v: fScale, n: `Put the words on a line from zero to one. Impossible sits at zero and certain sits at one. In the middle, at one half, is the even chance. Unlikely events lie between zero and one half, likely events between one half and one. No probability can be below zero or above one.` }),
    sl('example', 'Worked example 1: placing events on the scale', { b: r`One fair die is thrown once. Find the probability of each event and say it in words.`, ul: [r`**Count —** a die has $6$ equally likely faces`, r`**A $7$ —** no face, so $\dfrac{0}{6} = 0$, impossible; **an even number —** $3$ faces, so $\dfrac{3}{6} = \dfrac{1}{2}$`, r`**A number from $1$ to $6$ —** all $6$ faces, so $\dfrac{6}{6} = 1$, certain`], v: tPlace, n: `A die has six faces, all equally likely. A seven has no face, so its probability is zero and it is impossible. A six has one face out of six, which is unlikely. Even numbers have three faces, so the chance is one half. A number less than six is likely, and a number from one to six is certain.` }),
    sl('check', 'Quick check: a possible probability', { b: 'Four friends in Nagpur each quote the chance that their cricket club wins on Sunday. Which figure can be a probability?', v: fScaleEvents, chk: 'm01', n: `Remember the range of a probability.` }),
    sl('concept', 'Experiments, trials, outcomes and events', { b: r`We **repeat** an experiment and **record** what happens. Each repeat is a **trial** and gives one **outcome**. An **event** is the outcome, or the group of outcomes, that we want.`, v: tTerms, n: `Here are four words we shall use. An experiment is an activity whose result we observe, like tossing a coin. One performance of it is a trial, and its result is an outcome. An event is the outcome, or a group of outcomes, that we are interested in, such as getting a number greater than four.` }),
    sl('concept', 'Empirical probability', { b: r`When we cannot list equally likely outcomes, we **do the experiment** and count. $P(E) = \dfrac{\text{number of trials in which } E \text{ happens}}{\text{total number of trials}}$. This is the **empirical** or **experimental** probability.`, v: tCap, n: `Sometimes we cannot tell the chance by thinking, so we try it. A bottle cap was flipped fifty times in a playground. It landed top up thirty-one times. The empirical probability of top up is thirty-one over fifty. We divide the number of times the event happened by the total number of trials.` }),
    sl('example', 'Worked example 2: a spinner at a science fair', { b: r`Riya spins a five-colour spinner $40$ times. The arrow stops on green $11$ times. Find the probability of green, and of red or blue.`, ul: [r`**Green —** $\dfrac{11}{40}$`, r`**Red or blue —** $9 + 6 = 15$ spins, so $\dfrac{15}{40} = \dfrac{3}{8}$`, r`**Check —** the probabilities of all five colours add up to $1$`], v: tSpin, n: `Count the spins in each colour. Green came up eleven times out of forty, so its empirical probability is eleven over forty. Red and blue together came up fifteen times, so that probability is fifteen over forty, which is three eighths. As a check, the probabilities of all five colours add up to one.` }),
    sl('check', 'Quick check: the spinner', { b: 'In the spinner data, the arrow stopped on yellow eight times out of forty spins. What is the empirical probability of yellow?', v: fSpin, chk: 'm02', n: `Divide by the number of spins.` }),
    sl('diagram', 'More trials, a steadier estimate', { b: r`Here a coin is tossed $1000$ times by a computer program. The **relative frequency** of heads, $\dfrac{\text{heads so far}}{\text{tosses so far}}$, swings at first and then **settles near $\dfrac{1}{2}$**.`, v: fCoinRun, n: `The graph shows a coin tossed one thousand times by a computer program with a fixed starting number, so the result never changes. After ten tosses the relative frequency of heads is point six. It swings up and down, then settles close to one half. A short experiment can mislead us, a long one is steadier.` }),
    sl('concept', 'Reading the coin experiment', { b: 'The estimate is **nearest to one half** when the number of tosses is **largest**. It need **not be exactly** one half.', v: tCoin, n: `Look at the numbers behind the graph. After ten tosses the relative frequency is point six, which is far from one half. After five hundred it is about point five two four. After one thousand tosses it is point five zero one, very close to one half. More trials usually give a better estimate, but never an exact one.` }),
    sl('example', 'Worked example 3: bulbs tested in a lab', { b: r`A lab in Rajkot tests $400$ LED bulbs for $1000$ hours. $14$ bulbs fail. Find the probability that a bulb picked at random fails, and that it does not fail.`, ul: [r`**Fails —** $\dfrac{14}{400} = \dfrac{7}{200}$`, r`**Does not fail —** $400 - 14 = 386$ bulbs, so $\dfrac{386}{400} = \dfrac{193}{200}$`, r`**Check —** $\dfrac{7}{200} + \dfrac{193}{200} = 1$`], v: tBulb, n: `Fourteen bulbs out of four hundred failed, so the empirical probability of failing is fourteen over four hundred, which is seven over two hundred. The other three hundred eighty-six bulbs lasted, giving one hundred ninety-three over two hundred. The two probabilities add up to one, because every bulb either fails or does not.` }),
    sl('example', 'Worked example 4: rainy days', { b: r`In a Guwahati record of $4$ periods of $30$ days, it rained on $24$, $27$, $21$ and $18$ days. Find the probability that a day chosen from the record was rainy, and that it was dry.`, ul: [r`**Rainy days —** $24 + 27 + 21 + 18 = 90$ out of $4 \times 30 = 120$ days`, r`**Rainy —** $\dfrac{90}{120} = \dfrac{3}{4}$`, r`**Dry —** $120 - 90 = 30$ days, so $\dfrac{30}{120} = \dfrac{1}{4}$`], v: tRain, n: `Add the rainy days of the four periods to get ninety, out of one hundred twenty days in all. The probability of a rainy day is ninety over one hundred twenty, which is three quarters. There were thirty dry days, so the probability of a dry day is one quarter. This is an estimate from past records, not a promise for tomorrow.` }),
    sl('check', 'Quick check: rainy days', { b: 'In the rainfall record, rain fell on ninety of the one hundred twenty days. What is the probability that a day picked at random from the record was rainy?', v: fRain, chk: 'm03', n: `Rainy days over all days.` }),
    sl('summary', 'Summary', { ul: [r`A probability is a number from $0$ to $1$: $0$ is **impossible**, $1$ is **certain**, $\dfrac{1}{2}$ is an **even chance**`, r`**Empirical probability** $=$ number of trials in which the event happens $\div$ total number of trials`, 'A **long** experiment gives a steadier estimate than a short one, but it is never exact', r`The probabilities of all the outcomes add up to $1$`], v: sum1, n: `To sum up. Probability is a number from zero to one. Zero means impossible, one means certain, and one half is an even chance. The empirical probability is the number of successful trials divided by the total number of trials. The more trials we make, the steadier the estimate becomes, but it is never exact.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Empirical probability (2 marks):** write the fraction, favourable trials over all trials, and reduce it', '**Words for chance:** match the word to the number, and say why', '**Mistake:** giving a probability above $1$ or a negative number', '**Mistake:** dividing by the number of favourable trials instead of all the trials'], n: `For an empirical probability, write the number of favourable trials over the total number of trials, and reduce the fraction. When asked for a word for chance, match it with the number and give a reason. Two common slips are an answer above one or below zero, and dividing by the wrong total.` }),
  ],
});

// ================================================================ tables and checks, deck 2
const CARDS = upto(1, 20);
const cardEv = [['a multiple of $5$', (x) => x % 5 === 0], ['a prime number', isPrime], ['a number greater than $15$', (x) => x > 15], ['a perfect square', isSquare]];
const cardP = cardEv.map(([, f]) => pr(CARDS, f));
must(cardP.map((p) => p.join('/')).join() === '1/5,2/5,1/4,1/5', 'cards 1 to 20: 1/5, 2/5, 1/4, 1/5');
const lst = (f) => `$\\{${CARDS.filter(f).join(', ')}\\}$`;
const tEqual = table(['Experiment', 'Outcomes', 'Equally likely?'], [
  ['Toss a fair coin', 'Head, tail', 'Yes'],
  ['Throw a fair die', r`$1$, $2$, $3$, $4$, $5$, $6$`, 'Yes'],
  ['Spin an arrow on a wheel with $8$ equal sectors', 'The arrow stops on one of the sectors', 'Yes'],
  ['Spin an arrow on a wheel with sectors of different sizes', 'The arrow stops on one of the sectors', 'No: a bigger sector is more likely'],
  ['Flip a bottle cap', 'Top up, not top up', 'No: there is no reason for them to be equal'],
], 'Table of experiments. Tossing a fair coin, throwing a fair die and spinning an arrow on a wheel with 8 equal sectors have equally likely outcomes. Spinning on a wheel with sectors of different sizes does not, because a bigger sector is more likely. Flipping a bottle cap does not, because there is no reason for top up and not top up to be equal.', 'Equally likely outcomes come from fair coins, dice and equal sectors.');
const tFormula = table(['Event $E$', 'Favourable outcomes', 'Number', '$P(E)$'], [
  ['An even number', setOf((x) => x % 2 === 0), '$3$', TF(...pr(DIE, (x) => x % 2 === 0))],
  ['A number greater than $4$', setOf((x) => x > 4), '$2$', TF(...pr(DIE, (x) => x > 4))],
  ['A prime number', setOf(isPrime), '$3$', TF(...pr(DIE, isPrime))],
  ['A $7$', setOf((x) => x === 7), '$0$', '$0$'],
  ['A number from $1$ to $6$', setOf((x) => x >= 1), '$6$', '$1$'],
], 'Table of events of one throw of a fair die, each with its favourable outcomes, their number and the probability. An even number: 3 outcomes, one half. A number greater than 4: 2 outcomes, one third. A prime number: 3 outcomes, one half. A 7: none, 0. A number from 1 to 6: 6 outcomes, 1.', 'P(E) = number of favourable outcomes divided by the total number of equally likely outcomes, which is 6 here.');
must(pr(DIE, (x) => x > 4).join('/') === '1/3' && pr(DIE, isPrime).join('/') === '1/2', 'die: 1/3 and 1/2');
const tCards = table(['Event', 'Favourable cards', 'Number', 'Probability'], cardEv.map(([name, f], i) => [name, lst(f), `$${CARDS.filter(f).length}$`, TF(...cardP[i])]),
  'Table for twenty cards numbered 1 to 20, one drawn without looking. A multiple of 5: 5, 10, 15, 20, probability one fifth. A prime number: 2, 3, 5, 7, 11, 13, 17, 19, eight cards, two fifths. A number greater than 15: 16 to 20, five cards, one quarter. A perfect square: 1, 4, 9, 16, four cards, one fifth.', 'Always out of 20, because the 20 cards are equally likely.');
const bt = BEADS.vals.map((v) => frac(v, 30));
must(bt.map((p) => p.join('/')).join() === '1/5,3/10,1/6,1/3' && BEADS.vals.reduce((a, b) => a + b) === 30, 'beads: 1/5, 3/10, 1/6, 1/3');
must(6 + 9 + 5 + 10 === 30 && (6 / 30 + 9 / 30 + 5 / 30 + 10 / 30) === 1, 'bead probabilities add up to 1');
const tBeads = table(['Colour', 'Beads', 'Probability'], [...BEADS.cats.map((c, i) => [c, `$${BEADS.vals[i]}$`, TF(BEADS.vals[i], 30)]), ['Jar', '$30$', '$1$']],
  'Table of a jar of 30 beads at a toy stall. Red 6, probability one fifth; blue 9, three tenths; green 5, one sixth; yellow 10, one third. The four probabilities add up to 1.', 'The probabilities of all the colours add up to 1.');
const tNot = table(['Event $E$', '$P(E)$', r`$P(\text{not } E)$`, r`$P(E) + P(\text{not } E)$`], [
  ['A fair coin shows a head', TF(1, 2), TF(2 - 1, 2), '$1$'],
  ['A fair die shows a $6$', TF(1, 6), TF(5, 6), '$1$'],
  ['A red bead is drawn from the jar of $30$', TF(6, 30), TF(24, 30), '$1$'],
  ['A bead drawn from the jar is not green', TF(25, 30), TF(5, 30), '$1$'],
], 'Table: for each event E, the probability of E and of not E add up to 1. A head on a fair coin: one half and one half. A 6 on a die: one sixth and five sixths. A red bead from the jar of 30: one fifth and four fifths. A bead that is not green: five sixths and one sixth.', 'P(not E) = 1 minus P(E).');
must(fs(24, 30) === '4/5' && fs(25, 30) === '5/6' && fs(5, 30) === '1/6' && fs(6, 30) === '1/5', 'not E rows');
const WH = { green: 5, orange: 4, pink: 2, gold: 1 }, WT = 12;
must(sum(Object.values(WH)) === WT && fs(WT - WH.green, WT) === '7/12' && fs(WH.pink + WH.gold, WT) === '1/4' && fs(WT - WH.pink - WH.gold, WT) === '3/4', 'wheel');
const tWheel = table(['Event', 'Sectors', 'Probability'], [['The arrow stops on green', `$${WH.green}$`, TF(WH.green, WT)], ['The arrow does not stop on green', `$${WT - WH.green}$`, TF(WT - WH.green, WT)], ['The arrow stops on pink or gold', `$${WH.pink + WH.gold}$`, TF(WH.pink + WH.gold, WT)], ['The arrow does not stop on pink or gold', `$${WT - WH.pink - WH.gold}$`, TF(WT - WH.pink - WH.gold, WT)]],
  'Table for a wheel with 12 equal sectors: 5 green, 4 orange, 2 pink and 1 gold. Green: 5 sectors, five twelfths. Not green: 7 sectors, seven twelfths. Pink or gold: 3 sectors, one quarter. Not pink or gold: 9 sectors, three quarters.', 'Count the sectors, then use the rule for not E.');
const dd = (n, i) => rd(DIE_C[i][5] / n, 3);
must(dd(30, 0) === 0.1 && dd(120, 1) === 0.2 && dd(600, 2) === 0.165 && rd(EVEN[2] / 600, 3) === 0.47 && rd(EVEN[0] / 30, 3) === 0.467 && rd(EVEN[1] / 120, 3) === 0.475, 'die relative frequencies');
const tDie = table(['Throws', 'Sixes', 'Relative frequency of a six', 'Even numbers', 'Relative frequency of an even number'], [
  ...DIE_N.map((n, i) => [`$${n}$`, `$${SIX[i]}$`, dec(SIX[i], n), `$${EVEN[i]}$`, dec(EVEN[i], n)]),
  ['Theory', '', r`$\dfrac{1}{6} \approx 0.167$`, '', r`$\dfrac{1}{2} = 0.5$`],
], 'Table of a simulated die experiment. After 30 throws there are 3 sixes, relative frequency 0.1, and 14 even numbers, about 0.467. After 120 throws, 24 sixes, 0.2, and 57 even numbers, about 0.475. After 600 throws, 99 sixes, 0.165, and 282 even numbers, 0.47. The theoretical values are one sixth, about 0.167, and one half.', 'The experiment comes nearer to the theory as the throws increase.');
const goal2 = flow('LR', [['a', 'Equally likely outcomes'], ['b', 'P(E) = favourable / total'], ['c', 'P(not E) = 1 - P(E)'], ['d', 'Theory and experiment']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 2: equally likely outcomes, the formula for the probability of an event, the probability of not E, and a comparison of theory and experiment.', 'Part 2 road map.');
const sum2 = flow('LR', [['a', 'Equally likely outcomes'], ['b', 'P(E) = favourable outcomes / all outcomes'], ['c', 'P(not E) = 1 - P(E)'], ['d', 'Long experiments match the theory']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 2: equally likely outcomes, the probability of an event as favourable outcomes over all outcomes, the probability of not E as 1 minus P of E, and long experiments that match the theory.', 'Four ideas of Part 2.');

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: 'Introduction to Probability: Part 2, theoretical probability',
  goals: ['Say when outcomes are equally likely', 'Find the theoretical probability of simple events with a die, a coin, numbered cards and coloured beads', 'Use P(not E) = 1 - P(E)', 'Compare theoretical and empirical probability'],
  slides: [
    sl('title', 'Finding probability without an experiment', { b: r`A jar holds $6$ red, $9$ blue, $5$ green and $10$ yellow beads. If one is taken without looking, **which colour is most likely**, and by how much?`, v: fBeads, n: `A jar at a toy stall holds beads of four colours. You take one without looking. Which colour is the most likely? You do not need to take a thousand beads to find out. If every bead is equally likely to be taken, counting is enough. This is the idea of theoretical probability.` }),
    sl('concept', 'What you will be able to do', { ul: ['Recognise **equally likely** outcomes', r`Use $P(E) = \dfrac{\text{favourable outcomes}}{\text{all outcomes}}$`, r`Use $P(\text{not } E) = 1 - P(E)$`, 'Compare **theory** with an **experiment**'], v: goal2, n: `We start with the idea of equally likely outcomes. Then we find probabilities for dice, coins, numbered cards and coloured beads by counting. We learn the quick rule for the chance that something does not happen. At the end we compare what theory says with what an experiment gives.` }),
    sl('concept', 'Equally likely outcomes', { b: 'Outcomes are **equally likely** when none is favoured over another. A fair coin, a fair die and a wheel with equal sectors give equally likely outcomes.', v: tEqual, n: `Outcomes are equally likely when no outcome is favoured. A fair coin gives head or tail with the same chance. A fair die gives each face the same chance. A wheel with equal sectors gives each sector the same chance. If the sectors differ in size, or a bottle cap can land in unequal ways, the outcomes are not equally likely.` }),
    sl('concept', 'Theoretical probability', { b: r`If all outcomes are equally likely, $P(E) = \dfrac{\text{number of outcomes favourable to } E}{\text{total number of outcomes}}$. This is the **theoretical** probability.`, v: tFormula, n: `For equally likely outcomes, the theoretical probability of an event is the number of outcomes favourable to it, divided by the total number of outcomes. For a die the total is six. An even number has three favourable faces, so the probability is one half. A number greater than four has two faces, so it is one third.` }),
    sl('example', 'Worked example 1: numbered cards', { b: r`Twenty cards numbered $1$ to $20$ are shuffled and one is drawn without looking. Find the probability of a multiple of $5$ and of a prime number.`, ul: [r`**Total —** $20$ equally likely cards`, r`**Multiple of $5$ —** $5, 10, 15, 20$ is $4$ cards, so $\dfrac{4}{20} = \dfrac{1}{5}$`, r`**Prime —** $2, 3, 5, 7, 11, 13, 17, 19$ is $8$ cards, so $\dfrac{8}{20} = \dfrac{2}{5}$`], v: tCards, n: `There are twenty cards, all equally likely. Four of them, five, ten, fifteen and twenty, are multiples of five, so the probability is four over twenty, which is one fifth. Eight cards are prime, so that probability is eight over twenty, which is two fifths. Always reduce the fraction.` }),
    sl('check', 'Quick check: a die', { b: 'A fair die is thrown once. What is the probability that the number shown is a factor of six?', v: tFormula, chk: 'm04', n: `List the favourable faces first.` }),
    sl('diagram', 'A jar of beads', { b: r`Each bead has the **same chance** of being taken. The jar has $6 + 9 + 5 + 10 = 30$ beads, so the **total is $30$**.`, v: fBeads, n: `Here is the jar of beads as a bar graph. The red bar is six, the blue bar nine, the green bar five and the yellow bar ten. Together there are thirty beads, and each bead has the same chance of being taken. So the total number of outcomes is thirty.` }),
    sl('example', 'Worked example 2: beads in a jar', { b: r`One bead is taken from the jar of $30$ beads. Find the probability of each colour and add them.`, ul: [r`**Red —** $\dfrac{6}{30} = \dfrac{1}{5}$; **blue —** $\dfrac{9}{30} = \dfrac{3}{10}$`, r`**Green —** $\dfrac{5}{30} = \dfrac{1}{6}$; **yellow —** $\dfrac{10}{30} = \dfrac{1}{3}$`, r`**Sum —** $\dfrac{6 + 9 + 5 + 10}{30} = \dfrac{30}{30} = 1$`], v: tBeads, n: `Divide the number of beads of each colour by thirty. Red gives one fifth, blue gives three tenths, green gives one sixth and yellow gives one third. Yellow is the most likely colour. If we add the four numerators over thirty, we get thirty over thirty, which is one. The probabilities of all outcomes always add up to one.` }),
    sl('concept', 'The chance that E does not happen', { b: r`The event **not $E$** has all the outcomes that are **not** in $E$. So $P(E) + P(\text{not } E) = 1$, that is $P(\text{not } E) = 1 - P(E)$.`, v: tNot, n: `Every outcome is either in the event or not in it. So the probability of the event and the probability of not the event add up to one. This gives a quick rule. The probability of not E is one minus the probability of E. If a six has probability one sixth, then not a six has five sixths.` }),
    sl('example', 'Worked example 3: a wheel with equal sectors', { b: r`A wheel at a college fest has $12$ equal sectors: $5$ green, $4$ orange, $2$ pink and $1$ gold. Find $P(\text{not green})$ and $P(\text{pink or gold})$.`, ul: [r`**Green —** $P = \dfrac{5}{12}$, so $P(\text{not green}) = 1 - \dfrac{5}{12} = \dfrac{7}{12}$`, r`**Pink or gold —** $2 + 1 = 3$ sectors, so $\dfrac{3}{12} = \dfrac{1}{4}$`, r`**Check —** $4 + 2 + 1 = 7$ sectors are not green`], v: tWheel, n: `Five of the twelve sectors are green, so the probability of green is five twelfths. The probability of not green is one minus five twelfths, which is seven twelfths. We can check by counting the other sectors, four, two and one, which makes seven. Pink or gold covers three sectors, so the probability is three twelfths, which is one quarter.` }),
    sl('check', 'Quick check: not E', { b: 'The probability that a ticket drawn from a box wins a prize is two ninths. What is the probability that it does not win a prize?', v: tNot, chk: 'm05', n: `Use one minus the probability.` }),
    sl('diagram', 'Theory and experiment: a die', { b: r`A die was thrown $600$ times by a program. The **relative frequency** of each face is close to the **theoretical** value $\dfrac{1}{6} \approx 0.167$ (dashed line), but **not exactly** equal.`, v: fDieBars, n: `We threw a fair die six hundred times by program. The bars show the relative frequency of each face. Each bar is close to one sixth, shown by the dashed line, but none is exactly equal. Face two is a little low, and face one is a little high. That is normal for an experiment.` }),
    sl('concept', 'More throws, closer to the theory', { b: r`The relative frequency of a six **swings widely** for a few throws and then **settles near** $\dfrac{1}{6}$ as the number of throws **grows**.`, v: fDieRun, n: `Here we follow the relative frequency of a six as the throws increase. After thirty throws it is only point one, and after one hundred twenty it is point two, both far from one sixth. After six hundred throws it is point one six five, very near to one sixth. The empirical probability moves toward the theoretical one.` }),
    sl('example', 'Worked example 4: comparing theory and experiment', { b: r`Use the table of the $600$ throws. Compare the experiment with the theory for a six and for an even number.`, ul: [r`**A six —** experiment $\dfrac{99}{600} = \dfrac{33}{200} = 0.165$; theory $\dfrac{1}{6} \approx 0.167$`, r`**An even number —** experiment $\dfrac{282}{600} = \dfrac{47}{100} = 0.47$; theory $\dfrac{3}{6} = \dfrac{1}{2}$`, r`**Conclusion —** the differences are small, so the die looks fair`], v: tDie, n: `In six hundred throws there were ninety-nine sixes, so the experiment gives point one six five, while the theory gives one sixth, about point one six seven. There were two hundred eighty-two even numbers, so the experiment gives point four seven, against one half in theory. The differences are small, so there is no reason to say the die is unfair.` }),
    sl('check', 'Quick check: theory against experiment', { b: 'A fair coin is tossed one hundred times in a school in Madurai and shows fifty-three heads. What is the theoretical probability of a head?', v: tDie, chk: 'm06', n: `Do not use the experiment for the theory.` }),
    sl('summary', 'Summary', { ul: [r`For **equally likely** outcomes, $P(E) = \dfrac{\text{favourable outcomes}}{\text{all outcomes}}$`, r`$0 \le P(E) \le 1$; the probabilities of all outcomes add up to $1$`, r`$P(\text{not } E) = 1 - P(E)$`, 'Theory tells what to **expect**; an experiment gives what **happened**, and a long one comes close to the theory'], v: sum2, n: `To sum up. When outcomes are equally likely, the probability of an event is the number of favourable outcomes divided by the total number of outcomes. A probability lies between zero and one, and the probabilities of all outcomes add up to one. The probability of not E is one minus the probability of E. Long experiments come close to the theory.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Theoretical probability (2 marks):** list or count the favourable outcomes, write the total, divide, and reduce', '**Not $E$ (2 marks):** write $1 - P(E)$ and then the fraction', '**Mistake:** dividing by the number of unfavourable outcomes instead of the total', '**Mistake:** using the experiment to answer a question about theory'], n: `For a theoretical probability, list or count the favourable outcomes, write the total number of outcomes, divide, and reduce. For not E, write one minus the probability of E. Two common slips are dividing by the number of unfavourable outcomes, and using the result of an experiment when the question asks for the theory.` }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'cbse-9-mathematics-ch15', version: 1, title: 'Introduction to Probability: chapter notes', language: 'en',
  sections: [
    { heading: '1. Likelihood and the probability scale', body_md: r`We describe chance with words: **impossible**, **unlikely**, **even chance**, **likely** and **certain**. Probability turns the words into a number from $0$ to $1$: impossible is $0$, an even chance is $\dfrac{1}{2}$ and certain is $1$. A probability is never less than $0$ or more than $1$.`, key_terms: [{ term: 'Probability', definition_md: 'A number from 0 to 1 that tells how likely an event is.' }, { term: 'Impossible and certain', definition_md: 'An impossible event has probability 0; a certain event has probability 1.' }, { term: 'Even chance', definition_md: 'An event that is as likely to happen as not, probability one half.' }], formulas: [{ latex: r`0 \le P(E) \le 1`, label: 'Range of a probability' }], visual: fScale, visuals: [tLike, tPlace, fScaleEvents], topic_ids: [topic(1)] },
    { heading: '2. Experiments, trials, outcomes and events', body_md: r`An **experiment** is an activity whose result we observe. **One performance** is a **trial** and its result is an **outcome**. An **event** is an outcome, or a group of outcomes, that we are interested in. The probabilities of all the outcomes of an experiment add up to $1$.`, key_terms: [{ term: 'Trial', definition_md: 'One performance of an experiment.' }, { term: 'Outcome', definition_md: 'One possible result of a trial.' }, { term: 'Event', definition_md: 'An outcome or a group of outcomes that we are interested in.' }], formulas: [], visual: tTerms, visuals: [], topic_ids: [topic(1)] },
    { heading: '3. Empirical probability', body_md: r`The **empirical** (or **experimental**) probability is found from an experiment or a survey: $P(E) = \dfrac{\text{number of trials in which } E \text{ happens}}{\text{total number of trials}}$. It is an **estimate**: a long experiment gives a steadier value than a short one, but never an exact one.`, key_terms: [{ term: 'Empirical probability', definition_md: 'The number of trials in which the event happens divided by the total number of trials.' }, { term: 'Relative frequency', definition_md: 'The number of times an event happened so far divided by the number of trials so far.' }], formulas: [{ latex: r`P(E) = \dfrac{\text{trials in which } E \text{ happens}}{\text{total number of trials}}`, label: 'Empirical probability' }], visual: tCap, visuals: [tSpin, fSpin, tBulb, fRain, tRain], topic_ids: [topic(1)] },
    { heading: '4. More trials, a steadier estimate', body_md: r`In a coin experiment, the relative frequency of heads swings widely for a few tosses and **settles near $\dfrac{1}{2}$** after many. It does not have to equal $\dfrac{1}{2}$ exactly. A few trials can mislead, so do not call a coin unfair after a few tosses.`, key_terms: [], formulas: [], visual: fCoinRun, visuals: [tCoin], topic_ids: [topic(1)] },
    { heading: '5. Theoretical probability', body_md: r`When all outcomes are **equally likely** (a fair coin, a fair die, a wheel with equal sectors, identical cards or beads drawn without looking), $P(E) = \dfrac{\text{number of outcomes favourable to } E}{\text{total number of outcomes}}$. Count the favourable outcomes, count all the outcomes, divide, and reduce. A fraction is the natural form of the answer.`, key_terms: [{ term: 'Equally likely', definition_md: 'Outcomes where none is favoured over another.' }, { term: 'Theoretical probability', definition_md: 'Favourable outcomes divided by all equally likely outcomes.' }], formulas: [{ latex: r`P(E) = \dfrac{\text{favourable outcomes}}{\text{all equally likely outcomes}}`, label: 'Theoretical probability' }], visual: tEqual, visuals: [tFormula, tCards, fBeads, tBeads], topic_ids: [topic(2)] },
    { heading: '6. The probability of not E', body_md: r`The event **not $E$** has every outcome that is not in $E$, so $P(E) + P(\text{not } E) = 1$ and $P(\text{not } E) = 1 - P(E)$. If $P(E) = 0$ the event is impossible and if $P(E) = 1$ it is certain.`, key_terms: [{ term: 'Not E', definition_md: 'The event that E does not happen.' }], formulas: [{ latex: r`P(\text{not } E) = 1 - P(E)`, label: 'Probability of not E' }], visual: tNot, visuals: [tWheel], topic_ids: [topic(2)] },
    { heading: '7. Theory and experiment', body_md: r`Theory tells what to **expect** and an experiment shows what **happened**. In a long experiment the relative frequency comes close to the theoretical probability (for a fair die, a six is near $\dfrac{1}{6} \approx 0.167$), but it is rarely exactly equal. A small gap is normal and does not show that a coin or a die is unfair.`, key_terms: [], formulas: [], visual: fDieBars, visuals: [fDieRun, tDie], topic_ids: [topic(1), topic(2)] },
  ],
  exam_tips_md: r`**How marks are awarded**\n- *Empirical probability (2 marks):* favourable trials over all trials, reduced.\n- *Theoretical probability (2 marks):* favourable outcomes, total outcomes, the fraction.\n- *Not E (2 marks):* $1 - P(E)$ and the answer.\n\n**Common mistakes**\n1. Writing a probability above $1$ or below $0$.\n2. Dividing by the favourable or unfavourable outcomes instead of all the outcomes.\n3. Using the experiment where the theory is asked, and the reverse.\n4. Calling a coin or a die unfair after a few trials.\n5. Forgetting to reduce the fraction.`,
  status: 'draft', provenance: d1.provenance,
};

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-9-mathematics-ch15', version: 1, language: 'en',
  cards: [
    fcard('f01', 'What is probability?', 'A number from 0 to 1 that tells how likely an event is.', 'definition', 1),
    fcard('f02', 'What is the probability of an impossible event?', r`$0$.`, 'fact', 1),
    fcard('f03', 'What is the probability of a certain event?', r`$1$.`, 'fact', 1),
    fcard('f04', 'What probability means an even chance?', r`$\dfrac{1}{2}$.`, 'fact', 1),
    fcard('f05', 'Can a probability be more than 1 or less than 0?', 'No. Every probability lies from 0 to 1.', 'exam-tip', 1),
    fcard('f06', 'Which words go between impossible and certain on the scale?', 'Unlikely, even chance and likely, in that order.', 'concept', 1),
    fcard('f07', 'What is an experiment?', 'An activity whose result we observe, such as tossing a coin.', 'definition', 1),
    fcard('f08', 'What is a trial?', 'One performance of an experiment.', 'definition', 1),
    fcard('f09', 'What is an outcome?', 'One possible result of a trial.', 'definition', 1),
    fcard('f10', 'What is an event?', 'An outcome, or a group of outcomes, that we are interested in.', 'definition', 1),
    fcard('f11', 'Formula for empirical probability?', r`$P(E) = \dfrac{\text{trials in which } E \text{ happens}}{\text{total number of trials}}$.`, 'formula', 1),
    fcard('f12', 'Another name for empirical probability?', 'Experimental probability.', 'definition', 1),
    fcard('f13', 'What is relative frequency?', 'The number of times the event happened so far divided by the number of trials so far.', 'definition', 1),
    fcard('f14', 'What happens to the relative frequency of heads as the tosses increase?', r`It settles near $\dfrac{1}{2}$, but need not be exactly $\dfrac{1}{2}$.`, 'concept', 1),
    fcard('f15', 'Why do few trials mislead?', 'The relative frequency swings widely, so it can be far from the true value.', 'concept', 1),
    fcard('f16', 'The empirical probabilities of all the outcomes add up to?', r`$1$.`, 'fact', 1),
    fcard('f17', 'When are outcomes equally likely?', 'When no outcome is favoured over another, as for a fair coin, a fair die or a wheel with equal sectors.', 'definition', 2),
    fcard('f18', 'Formula for theoretical probability?', r`$P(E) = \dfrac{\text{favourable outcomes}}{\text{all equally likely outcomes}}$.`, 'formula', 2),
    fcard('f19', 'How many equally likely outcomes does a fair coin have?', 'Two: head and tail.', 'fact', 2),
    fcard('f20', 'How many equally likely outcomes does a fair die have?', 'Six: the numbers 1 to 6.', 'fact', 2),
    fcard('f21', 'Probability of an even number on a fair die?', r`$\dfrac{3}{6} = \dfrac{1}{2}$.`, 'fact', 2),
    fcard('f22', 'Probability of a 7 on a fair die?', r`$0$: it is impossible.`, 'fact', 2),
    fcard('f23', 'What is the event not E?', 'The event that E does not happen.', 'definition', 2),
    fcard('f24', 'Formula for P(not E)?', r`$P(\text{not } E) = 1 - P(E)$.`, 'formula', 2),
    fcard('f25', r`$P(E) + P(\text{not } E)$ equals?`, r`$1$.`, 'fact', 2),
    fcard('f26', 'A jar has 6 red beads out of 30. Probability of red?', r`$\dfrac{6}{30} = \dfrac{1}{5}$.`, 'concept', 2),
    fcard('f27', 'What should you do to a probability fraction at the end?', 'Reduce it to the lowest terms.', 'exam-tip', 2),
    fcard('f28', 'Does theory or experiment say what to expect?', 'Theory says what to expect; the experiment says what happened.', 'concept', 2),
    fcard('f29', 'In a long experiment, how does the empirical probability compare with the theoretical?', 'It comes close to it, but is rarely exactly equal.', 'concept', 2),
    fcard('f30', 'Does 53 heads in 100 tosses show an unfair coin?', 'No. The difference from 50 is small, which is normal for a fair coin.', 'concept', 1),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-9-mathematics-ch15', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 't01 likelihood words (impossible, unlikely, even chance, likely, certain) and the probability scale from 0 to 1, empirical probability from experiments and surveys, steadier estimates from more trials; t02 theoretical probability of simple events with equally likely outcomes (die, coin, numbered cards, coloured beads and sectors), P(not E) = 1 - P(E), comparing theory with experiment', self_checks: 'every probability is computed from counts or from the sample space and reduced; the coin and die experiments are simulated with a seeded generator and their counts asserted; every figure is drawn from computed values; every answer in the item banks is recomputed from the givens' } },
};
const tests = chapterTests('Introduction to Probability', {
  A: ['m07', 'm10', 'm15', 'ar1'],
  B: ['s202', 's205', 's301'],
  C: ['l01', 'l03'],
  D: ['c01'],
}, {
  A: ['m08', 'm09', 'm12', 'm13', 'm17', 'm18', 'm20', 'm22', 'ar2', 'ar3'],
  B: ['s201', 's206', ['s207', 's208'], 's303', ['s304', 's305']],
  C: ['l02', ['l04', 'l05']],
  D: ['c02', 'c03'],
});
build({ dir: DIR, release, testsSpec: tests });
void rd;
