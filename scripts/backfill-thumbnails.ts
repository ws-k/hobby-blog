/**
 * thumbnail이 비어있는 기사에 OG 이미지를 채우는 백필 스크립트
 */

import fs from 'fs';
import path from 'path';

async function fetchOgImage(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html',
      },
    });
    clearTimeout(timeout);
    const html = await res.text();
    const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return match?.[1] ?? '';
  } catch {
    return '';
  }
}

async function main() {
  const contentDir = path.join(process.cwd(), 'content');
  const files: string[] = [];

  function scan(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) scan(path.join(dir, entry.name));
      else if (entry.name.endsWith('.md')) files.push(path.join(dir, entry.name));
    }
  }
  scan(contentDir);

  const empty = files.filter((f) => {
    const content = fs.readFileSync(f, 'utf-8');
    return /^thumbnail:\s*""$/m.test(content);
  });

  console.log(`\n🖼️  thumbnail 없는 기사: ${empty.length}개\n`);

  let updated = 0;
  for (const filePath of empty) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const urlMatch = content.match(/^sourceUrl:\s*"?([^"\n]+)"?/m);
    if (!urlMatch) continue;

    const sourceUrl = urlMatch[1].trim();
    const name = path.basename(filePath);
    process.stdout.write(`  ${name} ... `);

    const ogImage = await fetchOgImage(sourceUrl);
    if (ogImage) {
      const updated_content = content.replace(/^thumbnail:\s*""$/m, `thumbnail: "${ogImage}"`);
      fs.writeFileSync(filePath, updated_content, 'utf-8');
      console.log(`✓ ${ogImage.slice(0, 60)}...`);
      updated++;
    } else {
      console.log('✗ 이미지 없음');
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n✅ 완료: ${updated}/${empty.length}개 업데이트\n`);
}

main().catch((e) => {
  console.error('오류:', e);
  process.exit(1);
});
