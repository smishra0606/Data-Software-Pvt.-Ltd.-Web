import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Setup __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define routes
const routes = [
  { url: "/", priority: 1.0 },
  { url: "/about", priority: 1.0 },
  { url: "/services", priority: 1.0 },
  { url: "/projects", priority: 1.0 },
  { url: "/contact", priority: 1.0 },
  { url: "/internships", priority: 1.0 },
  { url: "/careers", priority: 1.0 },
  { url: "/login", priority: 0.5 },
  { url: "/register", priority: 0.5 },
  { url: "/privacy-policy", priority: 0.3 },
  { url: "/terms-and-conditions", priority: 0.3 },
];

// Generate sitemap XML
const generateSitemapXml = (baseUrl) => {
  const currentDate = new Date().toISOString().split("T")[0];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach((route) => {
    sitemap += "  <url>\n";
    sitemap += `    <loc>${baseUrl}${route.url}</loc>\n`;
    sitemap += `    <lastmod>${route.lastmod || currentDate}</lastmod>\n`;
    if (route.changefreq) {
      sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    }
    if (route.priority !== undefined) {
      sitemap += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    }
    sitemap += "  </url>\n";
  });

  sitemap += "</urlset>";
  return sitemap;
};

// Get base URL
const baseUrl = process.env.SITE_URL || "https://www.datasoftwareltd.com";

// Generate and write sitemap
const sitemap = generateSitemapXml(baseUrl);
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Sitemap generated at ${outputPath}`);
