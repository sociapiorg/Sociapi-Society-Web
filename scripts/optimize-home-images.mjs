import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";

// Large homepage photographs and artwork only. Original public assets remain the fallback.
const images = [
  { src: "/Image/ss team.jpg", widths: [480, 960, 1440] },
  { src: "/Image/Mehfil_AI.png", widths: [480, 960, 1080] },
  { src: "/Image/Agentum Pic/15.jfif", widths: [480, 940] },
  { src: "/Image/Agentum Pic/12.png", widths: [480, 960, 1440] },
  { src: "/Image/Agentum Pic/14.png", widths: [480, 960, 1440] },
  { src: "/Image/3.png", widths: [480, 960, 1080] },
  { src: "/Image/Agentum Pic/IMG_5921.png", widths: [480, 960, 1440] },
  { src: "/Our Partner/Community Partner/FarabiUAPLogoFull - Jawad Ahmad.png", widths: [320] },
];

const publicRoot = resolve("public");
const outputRoot = join(publicRoot, "optimized-images");
const manifestPath = resolve("src/data/responsive-images.json");
await mkdir(outputRoot, { recursive: true });
const manifest = {};

for (const image of images) {
  const sourcePath = resolve(publicRoot, `.${decodeURIComponent(image.src)}`);
  if (!sourcePath.startsWith(`${publicRoot}/`) && !sourcePath.startsWith(`${publicRoot}\\`)) {
    throw new Error(`Image path is outside public/: ${image.src}`);
  }
  const input = await readFile(sourcePath);
  const hash = createHash("sha256").update(input).digest("hex").slice(0, 10);
  const id = `${basename(image.src, extname(image.src)).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${hash}`;
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Could not read image dimensions: ${image.src}`);
  const oriented = [5, 6, 7, 8].includes(metadata.orientation);
  const width = oriented ? metadata.height : metadata.width;
  const height = oriented ? metadata.width : metadata.height;
  const widths = [...new Set(image.widths.filter((value) => value <= width))].sort((a, b) => a - b);
  const formats = { avif: [], webp: [] };

  for (const format of ["avif", "webp"]) {
    for (const targetWidth of widths) {
      const file = `${id}-${targetWidth}.${format}`;
      const output = join(outputRoot, file);
      let pipeline = sharp(input).rotate().resize({ width: targetWidth, withoutEnlargement: true });
      pipeline = format === "avif" ? pipeline.avif({ quality: 55, effort: 3 }) : pipeline.webp({ quality: 82, effort: 4 });
      await pipeline.toFile(output);
      formats[format].push({ width: targetWidth, src: `/optimized-images/${file}` });
    }
  }
  manifest[image.src] = { width, height, formats };
  console.log(`${image.src}: ${width}x${height}, ${widths.length} AVIF + ${widths.length} WebP`);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
