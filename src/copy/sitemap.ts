/* The sitemap is derived from the route table like everything else that lists routes, so a new
   published route — /workspace, in this refresh — appears without a second list to forget.
   Served by src/pages/sitemap.xml.ts and referenced from public/robots.txt. */
import { ROUTES } from './routes';

const escapeXml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const sitemapUrls = (site: string): string[] =>
  ROUTES.filter((route) => route.published).map((route) => new URL(route.path, site).href);

export const buildSitemap = (site: string): string =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapUrls(site).map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
