import { StructuredData } from '@/components/seo/StructuredData';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';
import { ORGANIZATION_ID } from '@/lib/seo/config';

// The segment layout carries the contact page's metadata and structured data (it did when the page was a client
// component; the form now lives in components/forms/ContactForm.tsx).
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
