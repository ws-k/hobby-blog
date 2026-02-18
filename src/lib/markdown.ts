import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const AD_PLACEHOLDER = '<div class="ad-in-article" data-ad-slot="in-article"></div>';

function insertAdsIntoHtml(html: string): string {
  // Insert ads before the 2nd and 4th <h2> tags
  const h2Regex = /<h2[\s>]/g;
  let match: RegExpExecArray | null;
  const insertPositions: number[] = [];
  let count = 0;

  while ((match = h2Regex.exec(html)) !== null) {
    count++;
    if (count === 2 || count === 4) {
      insertPositions.push(match.index);
    }
  }

  if (insertPositions.length === 0) return html;

  let result = '';
  let lastIndex = 0;
  for (const pos of insertPositions) {
    result += html.slice(lastIndex, pos) + AD_PLACEHOLDER;
    lastIndex = pos;
  }
  result += html.slice(lastIndex);
  return result;
}

export async function markdownToHtml(
  markdown: string,
  insertAds: boolean = true
): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  let html = result.toString();

  if (insertAds) {
    html = insertAdsIntoHtml(html);
  }

  return html;
}
