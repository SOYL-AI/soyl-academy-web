import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavFeature, NavGroup, NavItem } from '@/lib/site';
import { NavIcon } from './NavIcon';

/** A menu group whose feature card is resolved (the latest Journal post is filled in on the server). */
export type ResolvedNavGroup = Omit<NavGroup, 'feature'> & { feature: NavFeature };

/** Icon tiles cycle through the three brand tones (globals.css .tone-*). */
const TONES = ['tone-blue', 'tone-red', 'tone-yellow'] as const;

export function MenuItemLink({
  item,
  index,
  current,
  onNavigate,
}: {
  item: NavItem;
  index: number;
  current: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={current ? 'page' : undefined}
      data-menu-item=""
      className="group/item flex items-start gap-3.5 rounded-[14px] p-3 transition-colors duration-200 hover:bg-paper/70 focus-visible:bg-paper/70 aria-[current=page]:bg-paper/50"
    >
      <span
        className={cn(
          TONES[index % TONES.length],
          'grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-[var(--tone-soft)] text-[var(--tone-text)] transition-transform duration-300 group-hover/item:-translate-y-0.5'
        )}
      >
        <NavIcon name={item.icon} size={20} />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="flex items-center gap-1.5 text-[15px] font-semibold leading-tight text-ink">
          {item.label}
          <NavIcon
            name="arrow"
            size={14}
            className="-translate-x-1 opacity-0 transition-[opacity,translate] duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
          />
        </span>
        <span className="mt-1 block text-[14px] leading-snug text-muted">{item.description}</span>
      </span>
    </Link>
  );
}

const FEATURE_TONES: Record<NavFeature['tone'], { card: string; eyebrow: string; body: string }> = {
  cobalt: { card: 'on-dark bg-cobalt text-white', eyebrow: 'text-white/85', body: 'text-white/90' },
  ink: { card: 'on-dark bg-ink text-white', eyebrow: 'text-highlighter', body: 'text-white/80' },
  paper: { card: 'bg-paper text-ink', eyebrow: 'text-muted', body: 'text-muted' },
};

/** The card on the right of a menu panel (and at the top of the mobile sheet for Learn). */
export function FeatureCard({
  feature,
  onNavigate,
  compact,
}: {
  feature: NavFeature;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const tone = FEATURE_TONES[feature.tone];
  return (
    <Link
      href={feature.href}
      onClick={onNavigate}
      data-feature-card=""
      className={cn(
        'group/feat relative isolate flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)]',
        compact ? 'p-5' : 'min-h-[236px] p-6',
        tone.card
      )}
    >
      <span aria-hidden="true" className="tri-stripe absolute inset-x-0 top-0 h-[5px]" />
      {/* Brand shapes: a highlighter disc and a red quarter, cut by the card edge. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -right-10 -bottom-12 -z-10 h-32 w-32 rounded-full transition-transform duration-500 group-hover/feat:scale-110',
          feature.tone === 'paper' ? 'bg-highlighter/70' : 'bg-white/10'
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'absolute right-[4.5rem] -bottom-6 -z-10 h-12 w-12 rounded-tl-full',
          feature.tone === 'paper' ? 'bg-red-pen/80' : 'bg-highlighter/90'
        )}
      />
      <span className={cn('t-eyebrow', tone.eyebrow)}>{feature.eyebrow}</span>
      <span
        className={cn(
          'mt-3 block font-serif tracking-[-0.015em]',
          compact ? 'text-[1.5rem]' : 'max-w-[18ch] text-[1.75rem]',
          // After the size: tailwind-merge drops a line-height placed before a text-* size.
          'leading-[1.1]'
        )}
      >
        {feature.title}
      </span>
      <span className={cn('mt-2.5 block max-w-[36ch] text-[15px] leading-snug', tone.body)}>{feature.description}</span>
      <span className={cn('inline-flex items-center gap-2 text-[15px] font-semibold', compact ? 'mt-4' : 'mt-auto pt-6')}>
        {feature.cta}
        <NavIcon name="arrow" size={16} className="transition-transform duration-300 group-hover/feat:translate-x-1" />
      </span>
    </Link>
  );
}
