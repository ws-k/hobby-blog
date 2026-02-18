/**
 * 콘텐츠 유효성 검사 스크립트
 *
 * 사용법: npx ts-node scripts/validate-content.ts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

const REQUIRED_FIELDS = [
  'title',
  'slug',
  'date',
  'category',
  'subcategory',
  'contentType',
  'description',
  'tags',
  'readingTime',
];

const VALID_CATEGORIES = [
  'tech',
  'gadgets',
  'gaming',
  'auto',
  'outdoor',
  'sports',
  'style',
  'food-drink',
];

const VALID_CONTENT_TYPES = ['news', 'review'];

interface ValidationError {
  file: string;
  errors: string[];
}

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function validateFile(filePath: string): ValidationError | null {
  const errors: string[] = [];
  const relativePath = path.relative(process.cwd(), filePath);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!data[field]) {
        errors.push(`필수 필드 누락: ${field}`);
      }
    }

    // Validate category
    if (data.category && !VALID_CATEGORIES.includes(data.category)) {
      errors.push(`유효하지 않은 카테고리: ${data.category}`);
    }

    // Validate contentType
    if (data.contentType && !VALID_CONTENT_TYPES.includes(data.contentType)) {
      errors.push(`유효하지 않은 contentType: ${data.contentType}`);
    }

    // Validate date format
    if (data.date && isNaN(new Date(data.date).getTime())) {
      errors.push(`유효하지 않은 날짜 형식: ${data.date}`);
    }

    // Validate tags is array
    if (data.tags && !Array.isArray(data.tags)) {
      errors.push('tags는 배열이어야 합니다');
    }

    // Check minimum content length
    if (body.trim().length < 200) {
      errors.push(`본문이 너무 짧습니다 (${body.trim().length}자, 최소 200자)`);
    }

    // Check slug format
    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      errors.push(`slug 형식 오류 (영소문자, 숫자, 하이픈만 허용): ${data.slug}`);
    }
  } catch (e) {
    errors.push(`파일 파싱 오류: ${(e as Error).message}`);
  }

  return errors.length > 0 ? { file: relativePath, errors } : null;
}

// Main
const files = getMarkdownFiles(contentDir);
console.log(`\n콘텐츠 유효성 검사 시작...`);
console.log(`발견된 마크다운 파일: ${files.length}개\n`);

const validationErrors: ValidationError[] = [];
let validCount = 0;

for (const file of files) {
  const result = validateFile(file);
  if (result) {
    validationErrors.push(result);
  } else {
    validCount++;
  }
}

if (validationErrors.length > 0) {
  console.log(`❌ 오류 발견: ${validationErrors.length}개 파일\n`);
  for (const { file, errors } of validationErrors) {
    console.log(`  ${file}:`);
    errors.forEach((e) => console.log(`    - ${e}`));
    console.log();
  }
} else {
  console.log('✅ 모든 파일이 유효합니다!');
}

console.log(`\n결과: ${validCount}개 통과, ${validationErrors.length}개 오류`);
process.exit(validationErrors.length > 0 ? 1 : 0);
