import { describe, expect, it } from 'vitest';
import { buildSitemap, sitemapUrls } from '../../src/copy/sitemap';
import { ROUTES } from '../../src/copy/routes';

describe('sitemap', () => {
  it('lists every published route against the canonical origin', () => {
    const urls = sitemapUrls('https://dirtyworks.ai');
    expect(urls).toContain('https://dirtyworks.ai/');
    expect(urls).toContain('https://dirtyworks.ai/workspace');
    expect(urls).toHaveLength(ROUTES.filter((r) => r.published).length);
  });

  it('emits well-formed XML with one loc per route', () => {
    const xml = buildSitemap('https://dirtyworks.ai');
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml.match(/<loc>/g)?.length).toBe(ROUTES.filter((r) => r.published).length);
    expect(xml).toContain('<loc>https://dirtyworks.ai/workspace</loc>');
  });
});
