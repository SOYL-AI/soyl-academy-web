// Number words for TTS-safe narration (same helper as ISC 11 ch02).
import { dec } from '../../isc-11-physics-ch01/src/lib.mjs';
const R6 = (x) => Math.round(x * 1e6) / 1e6;



const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function below1000(n) {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts = [];
  if (h) parts.push(`${ONES[h]} hundred`);
  if (rest) {
    const ten = rest < 20 ? ONES[rest] : TENS[Math.floor(rest / 10)] + (rest % 10 ? ` ${ONES[rest % 10]}` : '');
    parts.push(h ? `and ${ten}` : ten);
  }
  return parts.join(' ');
}
/** Number in words: integers up to 999999, decimals read digit by digit ("nine point eight"), negatives "minus". */
export function W(x) {
  if (x < 0) return `minus ${W(-x)}`;
  const s = String(R6(x));
  const [ip, fp] = s.split('.');
  let n = Number(ip);
  let out;
  if (n === 0) out = 'zero';
  else {
    const th = Math.floor(n / 1000);
    const rest = n % 1000;
    out = [th ? `${below1000(th)} thousand` : '', rest ? (th && rest < 100 ? `and ${below1000(rest)}` : below1000(rest)) : ''].filter(Boolean).join(' ');
  }
  if (fp) out += ` point ${[...fp].map((d) => ONES[Number(d)]).join(' ')}`;
  return out;
}
/** Number in words after rounding to n significant figures. */
export const N = (x, n = 3) => W(Number(dec(x, n)));
