import Link from 'next/link';
import { APP_URL, NAV_GROUPS, PLATFORM_ENABLED, PLATFORM_LOGIN_HREF, PRIMARY_CTA, type NavFeature } from '@/lib/site';
import { formatArticleDate, journalArticles } from '@/content/journal';
import { Logo } from '@/components/ui/Logo';
import { buttonClasses } from '@/components/ui/Button';
import { SiteHeader } from './SiteHeader';
import { DesktopPanel, FeatureCard, SheetPanel, type ResolvedNavGroup } from './MenuParts';

/**
 * The marketing header (ADR-025). A server component: it renders the logo, every menu panel, the mobile
 * sheet's contents and the action links here, and hands them to the client island `SiteHeader` as React
 * nodes, so the menus add almost no client JavaScript (the island is loaded on every route). `SiteHeader`
 * renders nothing on learning-platform pages (ADR-023, `platformChromeActive`).
 */
function latestJournalFeature(): NavFeature {
  const latest = [...journalArticles].sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!latest) {
    return {
      eyebrow: 'The SOYL Journal',
      title: 'Ideas about learning and AI',
      description: 'Essays on learning, technology and the school that’s coming next.',
      href: '/journal',
      cta: 'Read the Journal',
      tone: 'paper',
    };
  }
  return {
    eyebrow: `From the Journal · ${formatArticleDate(latest.date)}`,
    title: latest.title,
    description: latest.excerpt,
    href: `/journal/${latest.slug}`,
    cta: 'Read the essay',
    tone: 'paper',
  };
}

/** Flag on: "Log in" to the platform (the teacher app's sign-in moves into the Programs panel). Flag off: as before. */
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
  const latest = latestJournalFeature();
  const groups: ResolvedNavGroup[] = NAV_GROUPS.map((group) => ({
    ...group,
    feature: group.feature === 'latest-journal' ? latest : group.feature,
  }));
  const teacherSignIn = (g: ResolvedNavGroup) => PLATFORM_ENABLED && g.id === 'programs';
  const learn = groups.find((g) => g.id === 'learn');

  return (
    <SiteHeader
      groups={groups.map((g) => ({ id: g.id, label: g.label, hrefs: g.items.map((i) => i.href) }))}
      logo={<Logo size={30} className="shrink-0 whitespace-nowrap" />}
      actions={
        <>
          <SignIn className="hover-line hidden py-1 text-[15px] font-medium text-ink sm:inline" />
          <Link
            href={PRIMARY_CTA.href}
            className={buttonClasses('primary', 'md', 'hidden h-9 px-3.5 text-[14px] min-[375px]:inline-flex md:h-11 md:px-5 md:text-[15px]')}
          >
            {PRIMARY_CTA.label}
          </Link>
        </>
      }
      panels={Object.fromEntries(groups.map((g) => [g.id, <DesktopPanel key={g.id} group={g} teacherSignIn={teacherSignIn(g)} />]))}
      sheetPanels={Object.fromEntries(groups.map((g) => [g.id, <SheetPanel key={g.id} group={g} teacherSignIn={teacherSignIn(g)} />]))}
      sheetTop={learn ? <FeatureCard feature={learn.feature} compact /> : undefined}
      sheetFooter={
        <>
          <SignIn className={buttonClasses('secondary', 'lg', 'flex-1 px-4')} />
          <Link href={PRIMARY_CTA.href} className={buttonClasses('primary', 'lg', 'flex-[1.4] px-4')}>
            {PRIMARY_CTA.label}
          </Link>
        </>
      }
    />
  );
}
