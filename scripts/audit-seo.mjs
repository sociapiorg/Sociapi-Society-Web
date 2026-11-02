import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { chapters, events } from "../src/data/site.ts";

const routes = [
  "/", "/about", "/chapters", "/events", "/opportunities", "/partner-with-us", "/team", "/gallery",
  "/reviews", "/faqs", "/services", "/shop", "/contact", "/chapter-application", "/privacy", "/terms",
  ...events.map(({ slug }) => `/events/${slug}`),
  ...chapters.map(({ slug }) => `/chapters/${slug}`),
];
const titles = new Set();
const descriptions = new Set();

for (const route of routes) {
  const file = route === "/" ? join("dist", "index.html") : join("dist", route.slice(1), "index.html");
  const html = await readFile(file, "utf8");
  const expected = `https://sociapis.vercel.app${route === "/" ? "" : route}`;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  const h1 = (html.match(/<h1[ >]/gi) || []).length;
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag);
  const checks = {
    title: !!title,
    description: !!description,
    canonical: html.includes(`rel="canonical" href="${expected}"`),
    robots: /<meta name="robots" content="index, follow/i.test(html),
    h1: h1 === 1,
    imagesHaveAlt: !/<img\b(?![^>]*\balt\s*=)[^>]*>/i.test(html),
    imageAttributes: imageTags.every((tag) =>
      /\bwidth="[1-9][0-9]*"/.test(tag)
      && /\bheight="[1-9][0-9]*"/.test(tag)
      && /\bloading="(?:lazy|eager)"/.test(tag)
      && /\bdecoding="async"/.test(tag)),
    content: /<main id="main">[\s\S]{300,}<\/main>/i.test(html),
  };
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  if (failed.length) throw Error(`${route}: failed ${failed.join(", ")} (H1 count: ${h1})`);
  titles.add(title);
  descriptions.add(description);
}

if (titles.size !== routes.length) throw Error("Duplicate page titles detected");
if (descriptions.size !== routes.length) throw Error("Duplicate meta descriptions detected");

const home = await readFile(join("dist", "index.html"), "utf8");
const homeDescriptions = [...home.matchAll(/<meta name="description" content="([^"]*)"/gi)];
const homeTitles = [...home.matchAll(/<title>/gi)];
const homeCanonicals = [...home.matchAll(/<link rel="canonical"/gi)];
if (homeDescriptions.length !== 1 || homeDescriptions[0][1].length < 140 || homeDescriptions[0][1].length > 160) {
  throw Error("Home description must appear once and be 140-160 characters");
}
if (homeTitles.length !== 1 || homeCanonicals.length !== 1) throw Error("Home must have one title and one canonical");
if (!home.includes("Sociapi Society connects students across Pakistan through technology chapters, practical AI workshops, events, projects, and leadership opportunities.")) {
  throw Error("Home description does not match the approved text");
}

const verify = await readFile(join("dist", "verify/index.html"), "utf8");
if (!/<meta name="robots" content="noindex, follow">/i.test(verify)) throw Error("Certificate form must be noindex");
const certificate = await readFile(join("dist", "verify/__certificate_id__/index.html"), "utf8");
if (!/<meta name="robots" content="noindex, follow">/i.test(certificate)) {
  throw Error("Certificate result is missing initial noindex");
}
if (!certificate.includes("Certificate ID") || !certificate.includes("Verify Certificate")) {
  throw Error("Certificate result route did not render the verification form");
}

const xml = await readFile(join("dist", "sitemap.xml"), "utf8");
const robots = await readFile(join("dist", "robots.txt"), "utf8");
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
const expectedUrls = routes.map((route) => `https://sociapis.vercel.app${route === "/" ? "/" : route}`);
if (!robots.includes("Sitemap: https://sociapis.vercel.app/sitemap.xml")) {
  throw Error("Robots.txt sitemap declaration is missing");
}
if (urls.length !== new Set(urls).size) throw Error("Sitemap contains duplicate URLs");
const missingUrls = expectedUrls.filter((url) => !urls.includes(url));
const extraUrls = urls.filter((url) => !expectedUrls.includes(url));
if (missingUrls.length || extraUrls.length) {
  throw Error(`Sitemap route mismatch. Missing: ${missingUrls.join(", ")}; extra: ${extraUrls.join(", ")}`);
}
if (urls.some((url) =>
  url.includes("__certificate_id__")
  || url.includes("/verify")
  || url.includes("/labs")
  || url === "https://sociapis.vercel.app/faq"
  || url.includes("/faq/")
  || url === "https://sociapis.vercel.app/partner"
  || url.includes("/partner/"))) {
  throw Error("Sitemap includes a private result or alias path");
}

const agent = await readFile(join("dist", "events/agentum-2026/index.html"), "utf8");
const mehfil = await readFile(join("dist", "events/mehfil-ai-2026/index.html"), "utf8");
const chapter = await readFile(join("dist", "chapters/uet-mardan/index.html"), "utf8");
const faq = await readFile(join("dist", "faqs/index.html"), "utf8");
for (const [event, name] of [[agent, "Agentum"], [mehfil, "Mehfil AI"]]) {
  if ((event.match(/"@type":"Event"/g) || []).length !== 1 || !event.includes('"@type":"BreadcrumbList"')) {
    throw Error(`${name}: expected one Event and a BreadcrumbList schema`);
  }
}
if (!chapter.includes('"@type":"BreadcrumbList"')) throw Error("UET Mardan: missing breadcrumb schema");
if (!faq.includes('"@type":"FAQPage"') || (faq.match(/"@type":"Question"/g) || []).length !== 9) {
  throw Error("FAQs: expected matching visible FAQPage schema");
}
if (!home.includes('"@type":"Organization"') || !home.includes('"@type":"WebSite"')) {
  throw Error("Home: missing Organization or WebSite schema");
}
if (!home.includes('"@type":"WebPage"')) throw Error("Home: missing WebPage schema");

const activityList = home.match(/<ul class="activity-grid">([\s\S]*?)<\/ul>/i)?.[1];
if (!activityList) throw Error("Home activities must render as a semantic list");
if ((activityList.match(/<li\b/g) || []).length !== 5) throw Error("Home must render five activity list items");
for (const activity of ["Campus chapters", "Events", "Workshops", "Projects", "Volunteer"]) {
  if (!activityList.includes(activity)) throw Error(`Home activity list is missing ${activity}`);
}
if (!home.includes('id="community"') || !home.includes("Find your way in")) {
  throw Error("Home must render its community activities section");
}
if (!home.includes('id="events"') || !home.includes("Events and activities")) {
  throw Error("Home must render its events section");
}
if (!home.includes("One big community.") || !home.includes("Nine campus homes.")) {
  throw Error("Home must render its campus network section");
}
if (!home.includes('aria-label="09"')) throw Error("Homepage counter value is not present in initial HTML");

const responsivePictures = [...home.matchAll(/<picture\b[\s\S]*?<\/picture>/gi)].map(([picture]) => picture);
if (responsivePictures.length === 0) throw Error("Homepage must render responsive picture elements");
for (const picture of responsivePictures) {
  const img = picture.match(/<img\b[^>]*>/i)?.[0] ?? "";
  if (!picture.includes('type="image/avif"')
    || !picture.includes('type="image/webp"')
    || !/srcset=/i.test(picture)
    || !/<img\b[^>]*\balt="[^"]*"/i.test(img)
    || !/[\s]width="[1-9][0-9]*"/i.test(img)
    || !/[\s]height="[1-9][0-9]*"/i.test(img)) {
    throw Error("Responsive picture is missing a modern format, srcset, alt text, or intrinsic dimensions");
  }
}

for (const [, json] of home.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
  JSON.parse(json);
}
