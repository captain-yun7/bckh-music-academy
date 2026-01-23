import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 80;
const SIZE_THRESHOLD = 500 * 1024; // 500KB 이상만 최적화

async function getAllImages(dir: string): Promise<string[]> {
  const images: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await getAllImages(fullPath)));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }

  return images;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function optimizeImage(imagePath: string): Promise<void> {
  const stat = fs.statSync(imagePath);

  if (stat.size < SIZE_THRESHOLD) {
    return;
  }

  const ext = path.extname(imagePath).toLowerCase();
  const relativePath = path.relative(PUBLIC_DIR, imagePath);

  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    let pipeline = image;

    // 크기가 너무 크면 리사이즈
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, undefined, { withoutEnlargement: true });
    }
    if (metadata.height && metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(undefined, MAX_HEIGHT, { withoutEnlargement: true });
    }

    // 포맷별 최적화
    let buffer: Buffer;
    if (ext === '.png') {
      buffer = await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer();
    } else if (ext === '.webp') {
      buffer = await pipeline.webp({ quality: QUALITY }).toBuffer();
    } else {
      buffer = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
    }

    const savings = stat.size - buffer.length;
    const savingsPercent = ((savings / stat.size) * 100).toFixed(1);

    if (savings > 0) {
      // 백업 생성
      const backupPath = imagePath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(imagePath, backupPath);
      }

      fs.writeFileSync(imagePath, buffer);
      console.log(
        `✓ ${relativePath}: ${formatSize(stat.size)} → ${formatSize(buffer.length)} (-${savingsPercent}%)`
      );
    } else {
      console.log(`- ${relativePath}: 이미 최적화됨`);
    }
  } catch (error) {
    console.error(`✗ ${relativePath}: 최적화 실패 -`, error);
  }
}

async function main() {
  console.log('🖼️  이미지 최적화 시작...\n');
  console.log(`설정: 최대 ${MAX_WIDTH}x${MAX_HEIGHT}, 품질 ${QUALITY}%, ${formatSize(SIZE_THRESHOLD)} 이상만 처리\n`);

  const images = await getAllImages(PUBLIC_DIR);
  const largeImages = images.filter((img) => fs.statSync(img).size >= SIZE_THRESHOLD);

  console.log(`총 ${images.length}개 이미지 중 ${largeImages.length}개 최적화 대상\n`);

  for (const imagePath of largeImages) {
    await optimizeImage(imagePath);
  }

  console.log('\n✅ 완료! 원본은 .backup 파일로 보관됨');
  console.log('백업 삭제: find public -name "*.backup" -delete');
}

main().catch(console.error);
