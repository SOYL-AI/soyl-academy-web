import Image from 'next/image';
import Link from 'next/link';
import { APP_URL, type NavFeature, type NavGroup, type NavItem } from '@/lib/site';
import { images, type EditorialImage } from '@/content/images';
import { InkPath } from '@/components/brush/marks';
import { cn } from '@/lib/utils';

/**
 * Server-rendered pieces of the header's drop-down menus (ADR-034). They reach the client island (`StoryNav`) as
 * React nodes, so the nav config, the copy and the photo markup add no client JavaScript.
 */

function Arrow({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path d="M3 12.5 C 9 11.5, 14 12.8, 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.5 6.5 L 20.5 12 L 14.5 17.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** One page in a menu: a number, the title with a drawn underline on hover, and one line about it. */
function MenuRow({ item, n, compact }: { item: NavItem; n: number; compact?: boolean }) {
  return (
    <Link
      href={item.href}
      data-menu-item=""
      className={cn(
        'menu-row group/row grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 rounded-[10px] px-3 transition-colors duration-200 hover:bg-sheet-deep/70 focus-visible:bg-sheet-deep/70',
        compact ? 'py-2.5' : 'py-3'
      )}
    >
      <span aria-hidden="true" className="t-num font-serif text-[0.95rem] italic text-graphite">{String(n).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className={cn('relative inline-block font-serif leading-tight tracking-[-0.01em] text-ink', compact ? 'text-[1.25rem]' : 'text-[1.4rem]')}>
          {item.label}
          <InkPath mark="under" ink="vermilion" weight={4} className="absolute -bottom-1 left-0 h-2 w-full" />
        </span>
        <span className="mt-1 block text-[14px] leading-snug text-graphite">{item.description}</span>
      </span>
      <Arrow className="menu-arrow self-center text-ink" />
    </Link>
  );
}

/** The photo card: a taped print with a handwritten caption. */
export function FeatureCard({ feature, compact }: { feature: NavFeature; compact?: boolean }) {
  const image: EditorialImage = images[feature.image];
  return (
    <Link href={feature.href} data-feature-card="" className="menu-feature group/feat block">
      <span className={cn('menu-print relative block bg-white p-2 pb-3 shadow-[0_18px_40px_-22px_rgba(31,28,25,0.45)]', compact ? 'rotate-[-1deg]' : 'rotate-[-2deg]')}>
        <span aria-hidden="true" className="tape absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-3deg]" />
        <span className={cn('relative block overflow-hidden', compact ? 'aspect-[16/9]' : 'aspect-[4/3]')}>
          <Image
            src={image.src}
            alt=""
            fill
            sizes={compact ? '90vw' : '(min-width: 1024px) 26vw, 1px'}
            className="object-cover transition-transform duration-700 ease-out group-hover/feat:scale-[1.04]"
            style={image.focus ? { objectPosition: image.focus } : undefined}
          />
        </span>
        <span className="block px-1.5 pt-3">
          <span className="hand block text-[1.05rem] leading-none text-vermilion-ink">{feature.eyebrow}</span>
          <span className="mt-1.5 block font-serif text-[1.35rem] leading-[1.1] tracking-[-0.015em] text-ink">{feature.title}</span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
            {feature.cta}
            <Arrow className="transition-transform duration-300 group-hover/feat:translate-x-1" />
          </span>
        </span>
      </span>
    </Link>
  );
}

/** "Already a SOYL school?": the teacher app's sign-in, in the Missions group when the bar shows "Log in". */
function TeacherSignIn({ mobile }: { mobile?: boolean }) {
  return (
    <p className={cn('text-[14px] text-graphite', mobile ? 'mt-2 px-3' : 'mt-auto border-t border-ink/15 px-3 pt-4')}>
      Already a SOYL school?{' '}
      <a href={APP_URL} className="font-medium text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
        Sign in to the teacher app
      </a>
    </p>
  );
}

/** Desktop panel: the handwritten heading and the pages on the left, the photo card on the right. */
export function DesktopPanel({ group, teacherSignIn }: { group: NavGroup; teacherSignIn: boolean }) {
  const wide = group.items.length > 3;
  return (
    <div className="page grid grid-cols-12 gap-10 pb-10 pt-7">
      <div className="col-span-8 flex flex-col">
        <p className="hand menu-item px-3 text-[1.2rem] text-vermilion-ink">{group.heading}</p>
        <ul className={cn('mt-2 grid gap-x-6 gap-y-0.5', wide ? 'grid-cols-2' : 'grid-cols-1 max-w-[30rem]')}>
          {group.items.map((item, i) => (
            <li key={item.href} className="menu-item" style={{ '--i': i + 1 } as React.CSSProperties}>
              <MenuRow item={item} n={i + 1} />
            </li>
          ))}
        </ul>
        {teacherSignIn && <TeacherSignIn />}
      </div>
      <div className="menu-item col-span-4 pr-2 pt-2" style={{ '--i': 2 } as React.CSSProperties}>
        <FeatureCard feature={group.feature} />
      </div>
    </div>
  );
}

/** Mobile accordion body: the same pages, compact. */
export function SheetPanel({ group, teacherSignIn }: { group: NavGroup; teacherSignIn: boolean }) {
  return (
    <>
      <ul className="-mx-3 grid">
        {group.items.map((item, i) => (
          <li key={item.href}>
            <MenuRow item={item} n={i + 1} compact />
          </li>
        ))}
      </ul>
      {teacherSignIn && <TeacherSignIn mobile />}
    </>
  );
}
