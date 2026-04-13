/**
 * 자동 생성 기사에 섞인 외국어 문자(한자, 러시아어, 일본어 등)를 한국어로 정리
 */

import fs from 'fs';
import path from 'path';

// Known foreign → Korean word replacements (applied first, with context)
const WORD_REPLACEMENTS: [RegExp, string][] = [
  // Chinese
  [/汽车/g, '자동차'], [/一步/g, '한 걸음'], [/競爭/g, '경쟁'], [/激化/g, '심화'],
  [/産業/g, '산업'], [/産业/g, '산업'], [/韓[国國]/g, '한국'], [/韩国/g, '한국'],
  [/国内/g, '국내'], [/国际/g, '국제'], [/続航距離/g, '주행 거리'], [/续航距離/g, '주행 거리'],
  [/変化/g, '변화'], [/発展/g, '발전'], [/发展/g, '발전'], [/影响/g, '영향'],
  [/影響/g, '영향'], [/急速/g, '급속'], [/优秀/g, '뛰어난'], [/好的/g, '좋은'],
  [/品質/g, '품질'], [/耐久性/g, '내구성'], [/電子書籍/g, '전자책'], [/市場/g, '시장'],
  [/最新/g, '최신'], [/世界/g, '세계'], [/重要性/g, '중요성'], [/攻撃/g, '공격'],
  [/活用/g, '활용'], [/能力/g, '능력'], [/状態/g, '상태'], [/健康/g, '건강'],
  [/生活/g, '생활'], [/多樣/g, '다양'], [/樣/g, ''], [/历史/g, '역사'],
  [/保护/g, '보호'], [/道衣/g, '도복'], [/技术/g, '기술'], [/经济/g, '경제'],
  [/摄影/g, '사진'], [/窃奪/g, '절도'], [/創造性的/g, '창의적인'], [/愛好者/g, '애호가'],
  [/更加/g, '더욱'], [/显著/g, '눈에 띄게'], [/月面/g, '달 표면'], [/尚/g, ''],
  [/们/g, ''], [/实践/g, '실천'], [/过程/g, '과정'], [/预測/g, '예측'],
  [/自己的/g, '자신만의'], [/人的/g, '인적'], [/裏/g, '뒤'], [/応/g, '응'],
  [/避/g, ''], [/践/g, ''],
  // Japanese katakana/hiragana mixed into Korean words
  [/サイバーセキュリティ/g, '사이버 보안'], [/セキュリティ/g, '보안'],
  [/レビュー/g, '리뷰'], [/キャスト/g, '캐스트'], [/マン/g, '맨'],
  [/アップ/g, '업'], [/リ/g, ''], [/エル/g, ''],
  [/ックス/g, ''], [/スの/g, '스의 '], [/マリナーズの/g, '마리너스의 '],
  // Russian
  [/однако/gi, '그러나'], [/рынок/gi, '시장'], [/любите/gi, '좋아하는'],
  [/коллег[а-я]*/gi, '동료들'], [/музы[а-я]*/gi, '음악'],
  // Japanese hiragana
  [/まだ/g, '아직'],
  // Vietnamese
  [/trải nghiệm/g, '경험'], [/cải善/g, '개선'],
  // Hindi
  [/आकर/g, ''],
  // Arabic/Persian
  [/زندگی/g, '생활'], [/کس/g, ''],
  // Mixed
  [/전자車/g, '전기차'], [/車 업체/g, '차 업체'],
];

// Detect any remaining foreign chars (in body text → remove them cleanly)
const FOREIGN_PATTERN = /[\u4e00-\u9fff\u3040-\u30ff\u0100-\u024f\u0400-\u04ff\u0600-\u06ff\u0e00-\u0e7f\u1000-\u109f\u0900-\u097f\u0600-\u06ff]+/g;

function stripRemainingForeign(text: string): string {
  // Remove remaining foreign chars and clean up double spaces
  return text.replace(FOREIGN_PATTERN, '').replace(/  +/g, ' ').trim();
}

function processFile(filePath: string): boolean {
  const raw = fs.readFileSync(filePath, 'utf-8');
  let fixed = raw;

  // Apply word replacements first
  for (const [pattern, replacement] of WORD_REPLACEMENTS) {
    fixed = fixed.replace(pattern, replacement);
  }

  // Split into frontmatter and body
  const fmMatch = fixed.match(/^(---[\s\S]*?---\n)([\s\S]*)$/);
  if (!fmMatch) return false;

  let [, frontmatter, body] = fmMatch;

  // For frontmatter: only fix tags line (minimal touch)
  frontmatter = frontmatter.replace(FOREIGN_PATTERN, '').replace(/  +/g, ' ');

  // For body: strip any remaining foreign chars line by line
  const bodyLines = body.split('\n').map((line) => {
    if (/[\u4e00-\u9fff\u3040-\u30ff\u0100-\u024f\u0400-\u04ff\u0600-\u06ff\u0e00-\u0e7f\u1000-\u109f\u0900-\u097f]/.test(line)) {
      return stripRemainingForeign(line);
    }
    return line;
  });

  const result = frontmatter + bodyLines.join('\n');
  if (result !== raw) {
    fs.writeFileSync(filePath, result, 'utf-8');
    return true;
  }
  return false;
}

function scanDir(dir: string): { fixed: number; warned: number } {
  let fixed = 0;
  let warned = 0;
  if (!fs.existsSync(dir)) return { fixed, warned };

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const r = scanDir(fullPath);
      fixed += r.fixed;
      warned += r.warned;
    } else if (entry.name.endsWith('.md')) {
      const changed = processFile(fullPath);
      if (changed) {
        console.log(`  ✓ ${entry.name}`);
        fixed++;
      }
    }
  }
  return { fixed, warned };
}

const contentDir = path.join(process.cwd(), 'content');
console.log('\n🔧 외국어 문자 정리 중...\n');
const { fixed } = scanDir(contentDir);
console.log(`\n✅ 완료: ${fixed}개 파일 수정\n`);
