// Generates dist/client/sitemap.xml from the prerendered output so every
// prerendered route (home, tools, blog posts, etc.) is always included.
// Runs after `vite build`; replaces the hand-maintained sitemap that was
// silently dropping newly added blog articles.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE = "https://sizzy.co";
const CLIENT_DIR = join(process.cwd(), "dist", "client");

function findIndexHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...findIndexHtml(full));
    } else if (entry === "index.html") {
      out.push(full);
    }
  }
  return out;
}

function routeFromFile(file) {
  const rel = relative(CLIENT_DIR, file).split(sep).slice(0, -1).join("/");
  return rel ? `/${rel}` : "/";
}

function priorityFor(route) {
  if (route === "/") return "1.0";
  if (route === "/tools") return "0.9";
  if (route.startsWith("/tools/")) return "0.8";
  if (route === "/blog") return "0.7";
  if (route.startsWith("/blog/")) return "0.7";
  return "0.6";
}

function changefreqFor(route) {
  if (route === "/" || route === "/tools" || route === "/blog") return "weekly";
  return "monthly";
}

const today = new Date().toISOString().slice(0, 10);
const routes = [...new Set(findIndexHtml(CLIENT_DIR).map(routeFromFile))]
  .filter((r) => !r.startsWith("/assets"))
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const body = routes
  .map((route) => {
    const loc = route === "/" ? `${SITE}/` : `${SITE}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreqFor(route)}</changefreq>\n    <priority>${priorityFor(route)}</priority>\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(join(CLIENT_DIR, "sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${routes.length} URLs`);
