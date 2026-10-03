import { StructuredData } from '@/components/seo/StructuredData';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';
import { ORGANIZATION_ID } from '@/lib/seo/config';

// The contact page is a client component (it hosts the form), so it cannot
// export metadata itself. This segment layout carries it instead.
export const metadata = createMetadata({ path: '/contact' });

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/contact', mainEntityId: ORGANIZATION_ID }),
          breadcrumbNode('/contact', topLevelCrumbs('/contact'))
        )}
      />
      {children}
    </>
  );
}