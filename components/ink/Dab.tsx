import { cn } from '@/lib/utils';
import s from './ink.module.css';

/** The subject pigments (plan §2.2): Mathematics indigo, Science and Physics madder, Chemistry turmeric,
 *  Biology leaf, Social Science henna, languages ink. */
export type Pigment = 'indigo' | 'madder' | 'turmeric' | 'leaf' | 'henna' | 'ink';

const PIGMENT: Record<Pigment, string> = {
  indigo: s.dabIndigo,
  madder: s.dabMadder,
  turmeric: s.dabTurmeric,
  leaf: s.dabLeaf,
  henna: s.dabHenna,
  ink: s.dabInk,
};

/**
 * A painted pigment pool: a list bullet, a subject's mark, a legend swatch. Sized in em, so it follows the text.
 * Decorative by default; pass `label` when the colour itself carries meaning (then it is announced).
 */
export function Dab({ pigment = 'indigo', label, className }: { pigment?: Pigment; label?: string; className?: string }) {
  const classes = cn(s.dab, PIGMENT[pigment], className);
  return label ? <span role="img" aria-label={label} className={classes} /> : <span aria-hidden="true" className={classes} />;
}
