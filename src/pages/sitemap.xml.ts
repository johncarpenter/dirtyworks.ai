import type { APIRoute } from 'astro';
import { buildSitemap } from '../copy/sitemap';

/* Prerendered with the rest of the site (output: 'static'); costs no Worker invocation. */
export const GET: APIRoute = ({ site }) =>
  new Response(buildSitemap(site?.href ?? 'https://dirtyworks.ai'), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
