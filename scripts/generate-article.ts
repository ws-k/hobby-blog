/**
 * AI 기사 생성 스크립트
 *
 * 사용법:
 *   npx ts-node scripts/generate-article.ts --category tech --subcategory smartphones --type news
 *
 * 환경 변수:
 *   OPENAI_API_KEY - OpenAI API 키 (필수)
 */

import fs from 'fs';
import path from 'path';

const CATEGORIES: Record<string, string[]> = {
  tech: ['smartphones', 'laptops-pc', 'ai-software'],
  gadgets: ['audio', 'cameras', 'drones', 'wearables'],
  gaming: ['console', 'pc-games', 'mobile-games', 'gaming-gear'],
  auto: ['new-cars', 'ev', 'bikes', 'accessories'],
  outdoor: ['camping', 'fishing', 'hiking', 'cycling'],
  sports: ['fitness', 'golf', 'running', 'martial-arts'],
  style: ['watches', 'fashion', 'grooming'],
  'food-drink': ['whiskey', 'coffee', 'beer-wine', 'bbq'],
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

function generateFrontmatter(options: {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  contentType: 'news' | 'review';
  description: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  readingTime: number;
}): string {
  const date = new Date().toISOString();
  return `---
title: "${options.title}"
slug: "${options.slug}"
date: "${date}"
category: "${options.category}"
subcategory: "${options.subcategory}"
contentType: "${options.contentType}"
description: "${options.description}"
thumbnail: ""
thumbnailAlt: ""
tags: [${options.tags.map((t) => `"${t}"`).join(', ')}]
source: "${options.source}"
sourceUrl: "${options.sourceUrl}"
imageCredit: ""
readingTime: ${options.readingTime}
featured: false
---`;
}

function saveArticle(
  category: string,
  slug: string,
  frontmatter: string,
  content: string
): string {
  const contentDir = path.join(process.cwd(), 'content', category);
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  const filePath = path.join(contentDir, `${slug}.md`);
  fs.writeFileSync(filePath, `${frontmatter}\n\n${content}`, 'utf-8');
  return filePath;
}

// Main
const args = process.argv.slice(2);
const categoryIndex = args.indexOf('--category');
const subcategoryIndex = args.indexOf('--subcategory');
const typeIndex = args.indexOf('--type');

if (categoryIndex === -1) {
  console.log('사용법: npx ts-node scripts/generate-article.ts --category <category> --subcategory <subcategory> --type <news|review>');
  console.log('\n카테고리 목록:');
  Object.entries(CATEGORIES).forEach(([cat, subs]) => {
    console.log(`  ${cat}: ${subs.join(', ')}`);
  });
  process.exit(1);
}

const category = args[categoryIndex + 1];
const subcategory = subcategoryIndex !== -1 ? args[subcategoryIndex + 1] : CATEGORIES[category]?.[0];
const contentType = (typeIndex !== -1 ? args[typeIndex + 1] : 'news') as 'news' | 'review';

if (!CATEGORIES[category]) {
  console.error(`오류: 알 수 없는 카테고리 "${category}"`);
  process.exit(1);
}

console.log(`\n기사 생성 설정:`);
console.log(`  카테고리: ${category}`);
console.log(`  서브카테고리: ${subcategory}`);
console.log(`  타입: ${contentType}`);
console.log(`\n이 스크립트는 AI API 연동 후 자동 기사를 생성합니다.`);
console.log(`현재는 템플릿만 생성됩니다.\n`);

const slug = `${subcategory}-article-${Date.now()}`;
const frontmatter = generateFrontmatter({
  title: `[제목을 입력하세요]`,
  slug,
  category,
  subcategory: subcategory || '',
  contentType,
  description: '[설명을 입력하세요]',
  tags: [category],
  source: '',
  sourceUrl: '',
  readingTime: 5,
});

const templateContent = `## 소개

여기에 기사 내용을 작성하세요.

## 주요 내용

본문 내용을 작성하세요.

## 결론

마무리 내용을 작성하세요.
`;

const filePath = saveArticle(category, slug, frontmatter, templateContent);
console.log(`기사 템플릿 생성 완료: ${filePath}`);
