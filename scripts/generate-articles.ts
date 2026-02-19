/**
 * AI 기사 자동 생성 스크립트
 *
 * RSS 피드에서 최신 뉴스를 수집하고, Google Gemini API로 한국어 기사를 생성합니다.
 *
 * 사용법:
 *   npx tsx scripts/generate-articles.ts --count 10
 *
 * 환경 변수:
 *   GEMINI_API_KEY - Google Gemini API 키 (필수)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

const parser = new Parser({ timeout: 10000 });

// ── RSS 피드 소스 ──────────────────────────────────────
interface FeedSource {
  url: string;
  category: string;
  subcategory: string;
  contentType: 'news' | 'review';
}

const FEEDS: FeedSource[] = [
  // ── Tech ──
  { url: 'https://www.theverge.com/rss/index.xml', category: 'tech', subcategory: 'smartphones', contentType: 'news' },
  { url: 'https://techcrunch.com/feed/', category: 'tech', subcategory: 'ai-software', contentType: 'news' },
  { url: 'https://arstechnica.com/feed/', category: 'tech', subcategory: 'laptops-pc', contentType: 'news' },
  { url: 'https://9to5mac.com/feed/', category: 'tech', subcategory: 'smartphones', contentType: 'news' },
  { url: 'https://9to5google.com/feed/', category: 'tech', subcategory: 'smartphones', contentType: 'news' },
  { url: 'https://wccftech.com/feed/', category: 'tech', subcategory: 'laptops-pc', contentType: 'news' },
  // ── Gadgets ──
  { url: 'https://www.engadget.com/rss.xml', category: 'gadgets', subcategory: 'wearables', contentType: 'news' },
  { url: 'https://www.digitaltrends.com/feed/', category: 'gadgets', subcategory: 'audio', contentType: 'news' },
  { url: 'https://www.dpreview.com/feeds/news.xml', category: 'gadgets', subcategory: 'cameras', contentType: 'news' },
  { url: 'https://dronedj.com/feed/', category: 'gadgets', subcategory: 'drones', contentType: 'news' },
  // ── Gaming ──
  { url: 'https://kotaku.com/rss', category: 'gaming', subcategory: 'console', contentType: 'news' },
  { url: 'https://www.ign.com/articles?format=rss', category: 'gaming', subcategory: 'pc-games', contentType: 'news' },
  { url: 'https://www.gamespot.com/feeds/mashup/', category: 'gaming', subcategory: 'console', contentType: 'news' },
  { url: 'https://www.pcgamer.com/rss/', category: 'gaming', subcategory: 'pc-games', contentType: 'news' },
  // ── Auto ──
  { url: 'https://www.autoblog.com/rss.xml', category: 'auto', subcategory: 'new-cars', contentType: 'news' },
  { url: 'https://electrek.co/feed/', category: 'auto', subcategory: 'ev', contentType: 'news' },
  { url: 'https://www.motortrend.com/feed/', category: 'auto', subcategory: 'new-cars', contentType: 'news' },
  // ── Outdoor ──
  { url: 'https://www.outsideonline.com/feed/', category: 'outdoor', subcategory: 'hiking', contentType: 'news' },
  { url: 'https://www.bikemag.com/feed/', category: 'outdoor', subcategory: 'cycling', contentType: 'news' },
  // ── Sports ──
  { url: 'https://www.golfdigest.com/feed/rss', category: 'sports', subcategory: 'golf', contentType: 'news' },
  { url: 'https://www.runnersworld.com/feed/', category: 'sports', subcategory: 'running', contentType: 'news' },
  // ── Style ──
  { url: 'https://www.gq.com/feed/rss', category: 'style', subcategory: 'fashion', contentType: 'news' },
  { url: 'https://www.hodinkee.com/feed', category: 'style', subcategory: 'watches', contentType: 'news' },
  // ── Food & Drink ──
  { url: 'https://www.bonappetit.com/feed/rss', category: 'food-drink', subcategory: 'bbq', contentType: 'news' },
  { url: 'https://vinepair.com/feed/', category: 'food-drink', subcategory: 'whiskey', contentType: 'news' },
  // ── Crowdfunding / Innovation ──
  { url: 'https://www.kickstarter.com/backing-and-hacking.atom', category: 'gadgets', subcategory: 'wearables', contentType: 'news' },
  { url: 'https://www.indiegogo.com/explore/technology.atom', category: 'gadgets', subcategory: 'drones', contentType: 'news' },
];

// ── 카테고리 매핑 ─────────────────────────────────────
const CATEGORY_NAMES: Record<string, string> = {
  tech: '테크',
  gadgets: '가제트',
  gaming: '게이밍',
  auto: '자동차',
  outdoor: '아웃도어',
  sports: '스포츠',
  style: '스타일',
  'food-drink': '푸드&드링크',
};

const SUBCATEGORY_NAMES: Record<string, string> = {
  smartphones: '스마트폰',
  'laptops-pc': '노트북/PC',
  'ai-software': 'AI/소프트웨어',
  audio: '오디오',
  cameras: '카메라',
  drones: '드론',
  wearables: '웨어러블',
  console: '콘솔',
  'pc-games': 'PC게임',
  'mobile-games': '모바일게임',
  'gaming-gear': '게이밍기어',
  'new-cars': '신차',
  ev: '전기차',
  bikes: '바이크',
  accessories: '자동차용품',
  camping: '캠핑',
  fishing: '낚시',
  hiking: '등산',
  cycling: '자전거',
  fitness: '헬스/피트니스',
  golf: '골프',
  running: '러닝',
  'martial-arts': '격투기',
  watches: '시계',
  fashion: '패션',
  grooming: '그루밍',
  whiskey: '위스키',
  coffee: '커피',
  'beer-wine': '맥주/와인',
  bbq: '바베큐',
};

// ── 유틸리티 ──────────────────────────────────────────
function getExistingSlugs(): Set<string> {
  const contentDir = path.join(process.cwd(), 'content');
  const slugs = new Set<string>();

  function scan(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) scan(path.join(dir, entry.name));
      else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(path.join(dir, entry.name), 'utf-8');
        const match = content.match(/^slug:\s*"?([^"\n]+)"?/m);
        if (match) slugs.add(match[1]);
      }
    }
  }

  scan(contentDir);
  return slugs;
}

function saveArticle(category: string, slug: string, content: string): string {
  const dir = path.join(process.cwd(), 'content', category);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${slug}.md`);
  fs.writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

// ── RSS 피드 수집 ─────────────────────────────────────
interface FeedItem {
  title: string;
  link: string;
  source: string;
  category: string;
  subcategory: string;
  contentType: 'news' | 'review';
}

async function fetchFeeds(maxPerFeed = 5): Promise<FeedItem[]> {
  const items: FeedItem[] = [];

  for (const feed of FEEDS) {
    try {
      const result = await parser.parseURL(feed.url);
      const sourceName = result.title || new URL(feed.url).hostname;

      for (const item of result.items.slice(0, maxPerFeed)) {
        if (item.title && item.link) {
          items.push({
            title: item.title,
            link: item.link,
            source: sourceName,
            category: feed.category,
            subcategory: feed.subcategory,
            contentType: feed.contentType,
          });
        }
      }
      console.log(`  ✓ ${sourceName}: ${Math.min(result.items.length, maxPerFeed)}개`);
    } catch {
      console.log(`  ✗ ${feed.url}: 피드 수집 실패`);
    }
  }

  return items;
}

// ── Gemini API로 기사 생성 ────────────────────────────
async function generateArticle(
  model: ReturnType<InstanceType<typeof GoogleGenerativeAI>['getGenerativeModel']>,
  feedItem: FeedItem,
  existingSlugs: Set<string>
): Promise<{ slug: string; content: string } | null> {
  const categoryName = CATEGORY_NAMES[feedItem.category] || feedItem.category;
  const subcategoryName = SUBCATEGORY_NAMES[feedItem.subcategory] || feedItem.subcategory;

  const prompt = `당신은 한국의 남성 취미/라이프스타일 매거진 "guynote"의 전문 기자입니다.
다음 영어 뉴스를 바탕으로 한국어 기사를 작성하세요.

원문 제목: ${feedItem.title}
원문 링크: ${feedItem.link}
출처: ${feedItem.source}
카테고리: ${categoryName} > ${subcategoryName}
기사 유형: ${feedItem.contentType === 'news' ? '뉴스' : '리뷰'}

다음 형식으로 정확하게 출력하세요 (마크다운 코드블록 없이):

---
title: "한국어 제목 (검색 유입을 위한 핵심 키워드 포함, 50자 이내)"
slug: "영문-슬러그-하이픈-연결"
date: "${new Date().toISOString()}"
category: "${feedItem.category}"
subcategory: "${feedItem.subcategory}"
contentType: "${feedItem.contentType}"
description: "기사 설명 (검색 결과에 노출되는 메타 설명, 핵심 정보 요약, 120자 이내)"
thumbnail: ""
thumbnailAlt: ""
tags: ["태그1", "태그2", "태그3", "태그4", "태그5"]
source: "${feedItem.source}"
sourceUrl: "${feedItem.link}"
imageCredit: ""
readingTime: 4
featured: false
---

## 소제목1 (핵심 키워드 포함)

본문 내용 (2-3 문단)

## 소제목2

본문 내용 (2-3 문단)

## 소제목3

본문 내용 (1-2 문단)

## 마무리

마무리 내용 (1 문단)

작성 규칙:
1. 전체 본문 1000자 이상 (긴 콘텐츠가 SEO에 유리)
2. 한국 독자 관점에서 작성 (한국 출시 가격, 국내 시장 상황 언급)
3. 단순 번역이 아닌 분석과 의견 추가
4. slug는 영문 소문자와 하이픈만 사용, SEO 키워드 포함
5. 자연스러운 한국어 문체 사용 (존댓말 사용하지 않고 '~다' 체)
6. H2 소제목 3-4개 사용, 각 소제목에 검색 키워드 포함
7. tags는 5개, 한국어 검색에 자주 사용되는 키워드로 작성

정확성 규칙 (매우 중요):
- 확인되지 않은 정보는 "루머에 따르면", "유출 자료에 의하면" 등으로 표기
- 가격은 원문에 근거가 있을 때만 기재, 없으면 "가격 미정" 표기
- 출시일이 불확실하면 "정확한 출시일은 미정" 표기
- 스펙과 수치는 원문 기반으로만 작성, 추측하지 않기
- 한국 미출시 제품은 "국내 출시 여부는 미확인" 표기`;

  // 429 에러 시 최대 3회 재시도 (지수 백오프)
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (!text.includes('---')) return null;

      // 마크다운 코드블록 제거 (Gemini가 가끔 ```로 감싸는 경우)
      const cleaned = text.replace(/^```(?:markdown|yaml)?\n?/gm, '').replace(/^```$/gm, '').trim();

      // slug 추출
      const slugMatch = cleaned.match(/^slug:\s*"?([^"\n]+)"?/m);
      if (!slugMatch) return null;
      const slug = slugMatch[1].trim();

      // 중복 체크
      if (existingSlugs.has(slug)) {
        console.log(`    중복 slug 건너뜀: ${slug}`);
        return null;
      }

      return { slug, content: cleaned };
    } catch (e) {
      const msg = (e as Error).message;
      if (msg.includes('429') && attempt < 2) {
        const wait = (attempt + 1) * 15;
        console.log(`    ⏳ Rate limit, ${wait}초 후 재시도 (${attempt + 1}/3)...`);
        await new Promise((r) => setTimeout(r, wait * 1000));
        continue;
      }
      console.error(`    Gemini API 오류: ${msg}`);
      return null;
    }
  }
  return null;
}

// ── 메인 ──────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const countIndex = args.indexOf('--count');
  const count = countIndex !== -1 ? parseInt(args[countIndex + 1]) || 10 : 10;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('오류: GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const existingSlugs = getExistingSlugs();

  console.log(`\n📰 guynote 기사 자동 생성 (Gemini)`);
  console.log(`  생성 목표: ${count}개`);
  console.log(`  기존 기사: ${existingSlugs.size}개\n`);

  // RSS 피드 수집 (피드당 최대 10개)
  console.log('📡 RSS 피드 수집 중...');
  const feedItems = await fetchFeeds(10);
  console.log(`  총 ${feedItems.length}개 뉴스 수집\n`);

  if (feedItems.length === 0) {
    console.log('수집된 뉴스가 없습니다.');
    process.exit(0);
  }

  // 셔플 후 count개만 선택
  const shuffled = feedItems.sort(() => Math.random() - 0.5).slice(0, count);

  // 기사 생성
  console.log('✍️  기사 생성 중...');
  let generated = 0;

  for (const item of shuffled) {
    console.log(`  [${generated + 1}/${count}] ${item.title.slice(0, 50)}...`);
    const result = await generateArticle(model, item, existingSlugs);

    if (result) {
      const filePath = saveArticle(item.category, result.slug, result.content);
      existingSlugs.add(result.slug);
      generated++;
      console.log(`    ✓ 저장: ${filePath}`);
    } else {
      console.log(`    ✗ 생성 실패`);
    }

    // Gemini free tier: 15 RPM → 6초 간격으로 안전하게
    await new Promise((r) => setTimeout(r, 6000));
  }

  console.log(`\n✅ 완료: ${generated}개 기사 생성\n`);
  process.exit(0);
}

main().catch((e) => {
  console.error('오류:', e);
  process.exit(1);
});
