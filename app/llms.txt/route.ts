import { NextResponse } from 'next/server';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/seo/config';
import { PAGES } from '@/lib/seo/pages';

export async function GET() {
  const sortedPages = Object.values(PAGES).sort((a, b) => b.priority - a.priority);

  const content = `# ${SITE_NAME}
> ${SITE_DESCRIPTION}

## About
SOYL Academy helps teachers create outcome-based learning experiences that ask students to think, apply, create, explain and defend — not simply submit.

## Pages
${sortedPages.map((page) => `- [${page.label}](${SITE_URL}${page.path}): ${page.description}`).join('\n')}

## Full Documentation
For the complete, concatenated knowledge base including our methodology and journal articles, see [llms-full.txt](${SITE_URL}/llms-full.txt).
`;

  return new NextResponse(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
