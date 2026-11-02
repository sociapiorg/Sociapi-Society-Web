import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";

// Generate responsive event, gallery, team, and partner images. Original public assets remain fallbacks.
const images = [
  { src: "/Image/Event Image/Agentum Pic/0001.webp", widths: [480, 960, 1200] },
  { src: "/Image/Event Image/Agentum Pic/6.webp", widths: [480, 960, 1200] },
  { src: "/Image/Event Image/Agentum Pic/7.jpeg", widths: [480, 960, 1440] },
  { src: "/Image/Event Image/Agentum Pic/12.png", widths: [480, 960, 1440] },
  { src: "/Image/Event Image/Agentum Pic/14.png", widths: [480, 960, 1440] },
  { src: "/Image/Event Image/Agentum Pic/15.jfif", widths: [320, 640, 940] },
  { src: "/Image/Event Image/Agentum Pic/Agentum blog.png", widths: [480, 960] },
  { src: "/Image/Event Image/Agentum Pic/IMG_5921.png", widths: [480, 960, 1440] },
  { src: "/Image/Event Image/Agentum Pic/IMG_5956.png", widths: [480, 960, 1440] },
  { src: "/Image/Event Image/Agentum Pic/IMG_5998.png", widths: [480, 960, 1440] },
  { src: "/Image/Event Image/Agentum Pic/IMG_6010.png", widths: [480, 960, 1440] },
  { src: "/Image/Event Image/Agentum Pic/Khyzar Hayat.png", widths: [320, 640, 960] },
  { src: "/Image/Event Image/Agentum Pic/mustafa.png", widths: [320, 640, 960] },
  { src: "/Image/Event Image/Agentum Pic/uzair.png", widths: [320, 640, 960] },
  { src: "/Image/Event Image/Mehfil AI/Mehfil_AI.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/1.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/2.webp", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/3.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/4.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/5.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/6.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/7.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/8.png", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/9.webp", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/Mehfil AI/10.webp", widths: [480, 960, 1080] },
  { src: "/Image/Event Image/BOOTCAMP/summer-bootcamp-2026-hero.png", widths: [480, 960, 1365] },
  { src: "/Image/Event Image/AWS/aws-cloud-event-hero.png", widths: [480, 960, 1365] },
  { src: "/Image/Event Image/AWS/aws-cloud-webinar-promo.png", widths: [480, 960, 1440] },
  { src: "/Image/Team Pic/Zuhair.jpeg", widths: [320, 640] },
  { src: "/Image/Team Pic/Muhammad Mudassir.jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Asiya Islam.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Bilal Muhammad.jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Manahil Hashmat.jpeg", widths: [320, 640] },
  { src: "/Image/Team Pic/Muhammad Zulkifal (Event Manger).jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Aqsa sajid.jfif", widths: [320, 640] },
  { src: "/Image/Team Pic/HANIYA MUMTAZ.JPG", widths: [320, 640] },
  { src: "/Image/Team Pic/Danyal y.jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Umair Ahmad.png", widths: [320, 640] },
  { src: "/Image/Team Pic/irfan.jfif", widths: [320, 640] },
  { src: "/Image/Team Pic/hamid ali khan.jfif", widths: [320, 640] },
  { src: "/Image/Team Pic/Ukasha Umar.webp", widths: [320, 640] },
  { src: "/Image/Team Pic/Sajid_Wazir.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Umair Afridi.jfif", widths: [320, 640] },
  { src: "/Image/Team Pic/Iftikhar Ullah.jpeg", widths: [320, 640] },
  { src: "/Image/Team Pic/Rahat Marwat.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Hunsa Iqbal.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Faisal Khan.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Muhammad Saad.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Alina khan.JPG", widths: [320, 640] },
  { src: "/Image/Team Pic/maimoona.jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Noman Zeb.jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/zakir.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Jahanzaib Aftidi.jpeg", widths: [320, 640] },
  { src: "/Image/Team Pic/Mudassir Ali.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Navved.png", widths: [320, 640] },
  { src: "/Image/Team Pic/Tamkeen Israr (past).jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Atika Aqlim (past).jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/saad (past).jpeg", widths: [320, 640] },
  { src: "/Image/Team Pic/Muhammad Zakria (past).jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Hamad Khan (past).jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Maham Iqbal (past).png", widths: [320, 640] },
  { src: "/Image/Team Pic/Hamza Khan (past).jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Muhammad Abdullah (past).jpg", widths: [320, 640] },
  { src: "/Image/Team Pic/Riyan Ahmad (past).png", widths: [320, 640] },
  { src: "/Image/Team Pic/Areesh Tahir (past).png", widths: [320, 640] },
  { src: "/Image/Team Pic/Shandana Qadir (past).jfif", widths: [320, 640] },
  { src: "/Image/Shop Image/OVERSIZED.png", widths: [480, 866] },
  { src: "/Image/Shop Image/OVERSIZED Female.png", widths: [480, 862] },
  { src: "/Image/Shop Image/laptop back skin.png", widths: [480, 960, 1440] },
  { src: "/Our Partner/images.jpg", widths: [180] },
  { src: "/Our Partner/pathway.png", widths: [180] },
  { src: "/Our Partner/Community Partner/SoftwareSynergyClub - Muhammad Haris.jpg", widths: [320] },
  { src: "/Our Partner/Community Partner/IMG-20251229-WA0000 - TechLink Solutions LLC.jpg", widths: [320] },
  { src: "/Our Partner/Community Partner/FarabiUAPLogoFull - Jawad Ahmad.png", widths: [320] },
];

const publicRoot = resolve("public");
const outputRoot = join(publicRoot, "optimized-images");
const manifestPath = resolve("src/data/responsive-images.json");
await mkdir(outputRoot, { recursive: true });
const manifest = {};
const generatedFiles = new Set();

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
      generatedFiles.add(file);
      let pipeline = sharp(input).rotate().resize({ width: targetWidth, withoutEnlargement: true });
      pipeline = format === "avif" ? pipeline.avif({ quality: 55, effort: 3 }) : pipeline.webp({ quality: 82, effort: 4 });
      await pipeline.toFile(output);
      formats[format].push({ width: targetWidth, src: `/optimized-images/${file}` });
    }
  }
  manifest[image.src] = { width, height, formats };
  console.log(`${image.src}: ${width}x${height}, ${widths.length} AVIF + ${widths.length} WebP`);
}

for (const entry of await readdir(outputRoot, { withFileTypes: true })) {
  if (entry.isFile() && /\.(avif|webp)$/i.test(entry.name) && !generatedFiles.has(entry.name)) {
    await unlink(join(outputRoot, entry.name));
  }
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
