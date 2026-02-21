
import fs from 'fs';
import { resolve } from 'path';

// Define the site URLs structure
type SiteURL = {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

// Define all the routes in your application
const routes: SiteURL[] = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/projects', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/internships', changefreq: 'weekly', priority: 0.9 },
  { url: '/careers', changefreq: 'weekly', priority: 0.9 },
  { url: '/login', changefreq: 'monthly', priority: 0.5 },
  { url: '/register', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.3 },
];

// Function to generate sitemap XML content
export const generateSitemapXml = (baseUrl: string): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach((route) => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${route.url}</loc>\n`;
    sitemap += `    <lastmod>${route.lastmod || currentDate}</lastmod>\n`;
    if (route.changefreq) {
      sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    }
    if (route.priority !== undefined) {
      sitemap += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    }
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
};

// Use this function during build process
export const writeSitemapFile = (baseUrl: string): void => {
  const sitemap = generateSitemapXml(baseUrl);
  const outputPath = resolve(__dirname, '../../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated at ${outputPath}`);
};
