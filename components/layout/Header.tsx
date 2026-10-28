import { NAV_GROUPS, type NavFeature } from '@/lib/site';
import { formatArticleDate, journalArticles } from '@/content/journal';
import { SiteHeader } from './SiteHeader';
import type { ResolvedNavGroup } from './MenuParts';

/**
 * The marketing header (ADR-025). A server component: it resolves the About menu's featured card from the
 * Journal at build time, so no article data ships in the client bundle, then renders the client island
 * `SiteHeader`, which renders nothing on learning-platform pages (ADR-023, `platformChromeActive`).
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

export function Header() {
  const latest = latestJournalFeature();
  const groups: ResolvedNavGroup[] = NAV_GROUPS.map((group) => ({
    ...group,
    feature: group.feature === 'latest-journal' ? latest : group.feature,
  }));
  return <SiteHeader groups={groups} />;
}
