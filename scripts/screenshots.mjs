// Takes phone and desktop screenshots of the site so changes can be approved by looking,
// not by reading code. Used by .github/workflows/preview.yml; you can also run it locally:
//   npm run build && npx astro preview &   then   node scripts/screenshots.mjs out-dir [/extra/page ...]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.PREVIEW_URL ?? "http://localhost:4321";
const [outDir = "shots", ...extra] = process.argv.slice(2);
const pages = [...new Set(["/", "/eventos", ...extra])];
const sizes = [
  { name: "movil", width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
  { name: "escritorio", width: 1280, height: 800, isMobile: false, deviceScaleFactor: 1 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const size of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    isMobile: size.isMobile,
    deviceScaleFactor: size.deviceScaleFactor,
    timezoneId: "America/Hermosillo",
    locale: "es-MX",
  });
  const page = await ctx.newPage();
  for (const path of pages) {
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    const slug = path === "/" ? "inicio" : path.replace(/^\/|\/$/g, "").replace(/\//g, "_");
    const file = `${slug}-${size.name}.png`;
    await page.screenshot({ path: `${outDir}/${file}`, fullPage: true });
    results.push({ path, size: size.name, file, status: res?.status(), overflow });
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results));
