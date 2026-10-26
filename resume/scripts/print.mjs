import { chromium } from "playwright";
import { pathToFileURL } from "node:url";

const htmlPath = process.argv[2] ?? "resume.html";
const pdfPath = process.argv[3] ?? "resume.pdf";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.addStyleTag({ path: new URL("../theme-overrides.css", import.meta.url).pathname });
await page.pdf({
  path: pdfPath,
  format: "Letter",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();

console.log(`wrote ${pdfPath}`);
