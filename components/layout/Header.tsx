import Link from 'next/link';
import { APP_URL, NAV_GROUPS, PLATFORM_ENABLED, PLATFORM_LOGIN_HREF, PRIMARY_CTA } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { NavGate } from './NavGate';
import { DesktopPanel, SheetPanel } from './NavParts';

/**
 * The marketing header (ADR-034, after ADR-025): drop-down menus drawn on paper. A server component: it renders
 * every panel, the mobile sheet's contents and the action links here and hands them to the client island
 * (`NavGate` → `StoryNav`) as React nodes, so the menus add almost no client JavaScript. Nothing renders on
 * learning-platform pages (ADR-023, `platformChromeActive`).
 */

/** Flag on: "Log in" to the platform (the teacher app's sign-in moves into the Missions panel). Flag off: as before. */
function SignIn({ className }: { className: string }) {
  return PLATFORM_ENABLED ? (
    <Link href={PLATFORM_LOGIN_HREF} className={className}>
      Log in
    </Link>
  ) : (
    <a href={APP_URL} className={className}>
      Sign in
    </a>
  );
}

export function Header() {
  const teacherSignIn = (id: string) => PLATFORM_ENABLED && id === 'missions';

  return (
    <NavGate
      groups={NAV_GROUPS.map((g) => ({ id: g.id, label: g.label, hrefs: g.items.map((i) => i.href) }))}
      logo={<Logo size={30} className="shrink-0 whitespace-nowrap" />}
      actions={
        <>
          <SignIn className="nav-link hidden px-2 py-2 text-[15px] font-medium text-ink hover:text-ultramarine xl:inline-flex" />
          <Link
            href={PRIMARY_CTA.href}
            className="press btn-brush hidden h-10 items-center bg-ink px-4 text-[14px] font-semibold text-sheet hover:bg-ultramarine min-[400px]:inline-flex md:h-11 md:px-5 md:text-[15px]"
          >
            {PRIMARY_CTA.label}
          </Link>
        </>
      }
      panels={Object.fromEntries(NAV_GROUPS.map((g) => [g.id, <DesktopPanel key={g.id} group={g} teacherSignIn={teacherSignIn(g.id)} />]))}
      sheetPanels={Object.fromEntries(NAV_GROUPS.map((g) => [g.id, <SheetPanel key={g.id} group={g} teacherSignIn={teacherSignIn(g.id)} />]))}
      sheetFooter={
        <>
          <SignIn className="press btn-brush inline-flex h-12 flex-1 items-center justify-center border-2 border-ink px-4 font-semibold text-ink" />
          <Link href={PRIMARY_CTA.href} className="press btn-brush inline-flex h-12 flex-[1.4] items-center justify-center bg-ink px-4 font-semibold text-sheet">
            {PRIMARY_CTA.label}
          </Link>
        </>
      }
    />
  );
}
