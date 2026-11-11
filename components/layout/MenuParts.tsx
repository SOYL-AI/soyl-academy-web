import Link from 'next/link';
import { cn } from '@/lib/utils';
import { APP_URL, type NavFeature, type NavGroup, type NavItem } from '@/lib/site';
import { Dab, type Pigment } from '@/components/ink/Dab';
import { NavIcon } from './NavIcon';

/**
 * Server-rendered pieces of the header menus (ADR-025). They are passed to the client island SiteHeader as
 * React nodes, so none of this (nor the nav config or the icon set) ships as client JavaScript.
 */

/** A menu group whose feature card is resolved (the latest Journal post is filled in by Header.tsx). */
export type ResolvedNavGroup = Omit<NavGroup, 'feature'> & { feature: NavFeature };

/** Icon tiles cycle through three pigments (globals.css .tone-*, re-pointed to indigo, madder and turmeric). */
const TONES = ['tone-blue', 'tone-red', 'tone-yellow'] as const;

export function MenuItemLink({ item, index }: { item: NavItem; index: number }) {
  return (
    <Link
      href={item.href}
      data-menu-item=""
      className="group/item flex items-start gap-3.5 rounded-[var(--radius-sm)] p-3 transition-colors duration-150 hover:bg-paper-2 focus-visible:bg-paper-2 aria-[current=page]:bg-paper-2/70"
    >
      <span
        className={cn(
          TONES[index % TONES.length],
          'grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[var(--tone-soft)] text-[var(--tone-text)]'
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

/** Feature cards: indigo (the action), slate (night) or the paper band, each with one painted pool. */
const FEATURE_TONES: Record<NavFeature['tone'], { card: string; eyebrow: string; body: string; pool: Pigment }> = {
  cobalt: { card: 'on-dark bg-indigo text-paper', eyebrow: 'text-paper/85', body: 'text-paper/90', pool: 'turmeric' },
  ink: { card: 'on-dark bg-slate text-chalk', eyebrow: 'text-lamp', body: 'text-chalk-muted', pool: 'turmeric' },
  paper: { card: 'bg-paper-2 text-ink', eyebrow: 'text-muted', body: 'text-graphite', pool: 'indigo' },
};

/** The card on the right of a menu panel (and at the top of the mobile sheet for Learn). */
export function FeatureCard({ feature, compact }: { feature: NavFeature; compact?: boolean }) {
  const tone = FEATURE_TONES[feature.tone];
  return (
    <Link
      href={feature.href}
      data-feature-card=""
      className={cn(
        'group/feat relative isolate flex h-full flex-col overflow-hidden rounded-[var(--radius-md)]',
        compact ? 'p-5' : 'min-h-[236px] p-6',
        tone.card
      )}
    >
      {/* One painted pool, cut by the card edge (plan §2.1: pigment dabs). */}
      <Dab
        pigment={tone.pool}
        className={cn('absolute -right-9 -bottom-10 -z-10 h-36 w-36', feature.tone === 'paper' ? 'opacity-80' : 'opacity-90')}
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
        <NavIcon name="arrow" size={16} className="transition-transform duration-150 group-hover/feat:translate-x-1" />
      </span>
    </Link>
  );
}

/** "Already a SOYL school?" — the teacher app's sign-in, in the Programs group when the bar shows "Log in". */
function TeacherSignIn({ mobile }: { mobile?: boolean }) {
  return (
    <p className={mobile ? 'mt-3 text-[14px] text-muted' : 'mt-auto border-t border-rule-soft px-3 pt-4 text-[14px] text-muted'}>
      Already a SOYL school?{' '}
      <a href={APP_URL} className={mobile ? 'link' : 'hover-line font-medium text-ink'}>
        Sign in to the teacher app
      </a>
    </p>
  );
}

/** Desktop panel body: heading + two columns of items on the left, the featured card on the right. */
export function DesktopPanel({ group, teacherSignIn }: { group: ResolvedNavGroup; teacherSignIn: boolean }) {
  return (
    <div className="page grid grid-cols-12 gap-8 pb-9 pt-7">
      <div className="col-span-8 flex flex-col">
        <p className="t-eyebrow px-3 text-muted">{group.heading}</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
          {group.items.map((item, i) => (
            <li key={item.href}>
              <MenuItemLink item={item} index={i} />
            </li>
          ))}
        </ul>
        {teacherSignIn && <TeacherSignIn />}
      </div>
      <div className="col-span-4">
        <FeatureCard feature={group.feature} />
      </div>
    </div>
  );
}

/** Mobile accordion body: the same items and descriptions. */
export function SheetPanel({ group, teacherSignIn }: { group: ResolvedNavGroup; teacherSignIn: boolean }) {
  return (
    <>
      <ul className="-mx-3 grid gap-0.5">
        {group.items.map((item, i) => (
          <li key={item.href}>
            <MenuItemLink item={item} index={i} />
          </li>
        ))}
      </ul>
      {teacherSignIn && <TeacherSignIn mobile />}
    </>
  );
}
