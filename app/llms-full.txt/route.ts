import { NextResponse } from 'next/server';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/seo/config';
import { pillars } from '@/content/method';
import { programs } from '@/content/programs';
import { articles } from '@/content/journal';
import { homeFaqs, methodFaqs, schoolsFaqs, studentsFaqs, whatWeTeachFaqs } from '@/content/faqs';

export async function GET() {
  const content = `# ${SITE_NAME} - Full Knowledge Base
> ${SITE_DESCRIPTION}

## The SOYL Method
An outcome-based framework designed to make student thinking visible. It replaces transactional submissions with five demonstrations of learning.

${pillars.map(p => `### ${p.num}. ${p.name}: ${p.tagline}
${p.content.join('\n\n')}

*Traditional:* ${p.traditional}
*SOYL:* ${p.soyl}
`).join('\n')}

## Programs
${programs.map(p => `### ${p.title}
${p.description}
Topics: ${p.topics.join(', ')}
`).join('\n')}

## Frequently Asked Questions

### General FAQ
${homeFaqs.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n')}

### The SOYL Method
${methodFaqs.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n')}

### For Schools
${schoolsFaqs.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n')}

### For Students
${studentsFaqs.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n')}

### What We Teach
${whatWeTeachFaqs.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n')}

## Journal Articles
${articles.map(a => `### ${a.title}
*By ${a.author} | ${a.category} | ${a.date}*

${a.content}
`).join('\n\n')}

## External Links
- [Website](${SITE_URL})
- [llms.txt](${SITE_URL}/llms.txt)
`;

  return new NextResponse(content.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
