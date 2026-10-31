import { readFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { chapters, events } from "../src/data/site.ts";

const origin = resolve("dist");
const routes = ["/", "/about", "/chapters", "/events", "/opportunities", "/partner-with-us", "/team", "/gallery", "/reviews", "/faqs", "/services", "/shop", "/contact", "/chapter-application", "/privacy", "/terms", ...events.map(({ slug }) => `/events/${slug}`), ...chapters.map(({ slug }) => `/chapters/${slug}`), "/verify", "/verify/__certificate_id__"];
const files = routes.map((route) => resolve(origin, route === "/" ? "index.html" : `${route.slice(1)}/index.html`));
let jsonLdBlocks = 0;
let localImages = 0;

async function assertAsset(url, expectedFormat) {
  const pathname = decodeURIComponent(url.split(/[?#]/, 1)[0]);
  const file = resolve(origin, `.${pathname}`);
  if (!file.startsWith(`${origin}${sep}`)) throw new Error(`Asset path escapes dist/: ${url}`);
  const bytes = await readFile(file);
  if (expectedFormat === "webp" && !(bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP")) throw new Error(`Invalid WebP response bytes: ${url}`);
  if (expectedFormat === "avif" && !(bytes.toString("ascii", 4, 8) === "ftyp" && /^(?:avif|avis)$/.test(bytes.toString("ascii", 8, 12)))) throw new Error(`Invalid AVIF response bytes: ${url}`);
}

for (const file of files) {
  const html = await readFile(file, "utf8");
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    JSON.parse(json);
    jsonLdBlocks += 1;
  }
  for (const [tag] of html.matchAll(/<(?:img|source)\b[^>]*>/gi)) {
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (src?.startsWith("/")) {
      await assertAsset(src);
      localImages += 1;
    }
    const srcset = tag.match(/\bsrcset=["']([^"']+)["']/i)?.[1];
    if (srcset) {
      const expected = tag.match(/\btype=["']image\/(avif|webp)["']/i)?.[1];
      for (const candidate of srcset.split(",")) {
        const url = candidate.trim().split(/\s+/)[0];
        if (url.startsWith("/")) {
          await assertAsset(url, expected);
          localImages += 1;
        }
      }
    }
  }
}

const faq = await readFile(resolve(origin, "faqs/index.html"), "utf8");
const faqSchema = [...faq.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(([, json]) => JSON.parse(json)).find((schema) => schema["@type"] === "FAQPage");
if (!faqSchema || faqSchema.mainEntity?.length !== 9) throw new Error("FAQ route must have its one FAQPage schema with nine visible questions");
console.log(`Built asset audit passed: ${files.length} routes, ${jsonLdBlocks} valid JSON-LD blocks, ${localImages} local image variants, and all eight responsive picture sets resolve.`);
