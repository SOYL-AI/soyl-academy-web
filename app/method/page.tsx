import { InkLink } from '@/components/ink/Button';
import { ClosingCta } from '@/components/ink/ClosingCta';
import { FaqList } from '@/components/ink/FaqList';
import { PageIntro } from '@/components/ink/PageIntro';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { MethodWalk } from '@/components/method/MethodWalk';
import { StructuredData } from '@/components/seo/StructuredData';
import { methodFaqs } from '@/content/faqs';
import { finalCta, method } from '@/content/home';
import { pillars } from '@/content/method';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, methodTermSetNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/method' });

/**
 * The SOYL Method, in Ink and wash (docs/redesign-ink-and-wash.md §3.3). Job: earn belief.
 *
 *   intro    "Learning should be demonstrated."   (photo: a hand marking a notebook in red pencil)
 *   the walk the five verbs on one route, a checkpoint at each (components/method/MethodWalk)
 *   FAQ, then the closing action (Book a demo)
 *
 * The verbs' assignments (traditional and SOYL) and the structured data come from content/method.ts, so the
 * page, its JSON-LD and llms-full.txt still say the same thing.
 */
export default function MethodPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/method', mainEntityId: `${absoluteUrl('/method')}#method` }),
          breadcrumbNode('/method', topLevelCrumbs('/method')),
          methodTermSetNode(pillars),
          faqNode('/method', methodFaqs)
        )}
      />

      <PageIntro
        title="Learning should be demonstrated."
        lead="A finished answer no longer proves that thinking happened. The SOYL Method asks students to show it, in five verbs. Walk them below: each one ends at a checkpoint."
        actions={
          <InkLink href="#walk" size="lg" arrow>
            Walk the five verbs
          </InkLink>
        }
        photo={{ slug: 'hands-red-pencil', position: '58% 50%' }}
      />

      <Section id="walk" ground="paper-2" aria-labelledby="walk-title" className="scroll-mt-16">
        <h2 id="walk-title" className="ink-head max-w-[16ch]">
          {method.headline}
        </h2>
        <Stroke pigment="indigo" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
        <p className="ink-lead mt-6 max-w-[52ch]">{method.intro}</p>
        <MethodWalk />
      </Section>

      <FaqList faqs={methodFaqs} heading="Questions about the SOYL Method" />
      <ClosingCta headline={finalCta.headline} line={finalCta.line} />
    </>
  );
}
