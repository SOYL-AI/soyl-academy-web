import * as React from 'react';

interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Renders JSON-LD. `<` is escaped to its unicode form so content such as
 * "</script>" in a string can never break out of the script tag (see the
 * Next.js JSON-LD guide).
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
