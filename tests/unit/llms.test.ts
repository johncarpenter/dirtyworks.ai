import { describe, expect, it } from 'vitest';
import { buildAgentsMd, buildLlmsTxt, PAGE_SUMMARIES } from '../../src/copy/llms';
import { ROUTES } from '../../src/copy/routes';
import { INTERESTS } from '../../src/copy/inquiry';
import { CONTACT_EMAIL } from '../../src/copy/site';

const SITE = 'https://dirtyworks.ai';
const published = ROUTES.filter((r) => r.published);

/* The pages are brief on purpose; these two files carry the text that left them. They follow the
   same claim discipline as the pages, and the release gate scans src/copy/llms.ts for the
   mechanical part. What is asserted here is the shape and the facts an agent must be able to find. */
describe('llms.txt', () => {
  const text = buildLlmsTxt(SITE);

  it('opens in the llms.txt shape: H1, then a blockquote summary', () => {
    const [h1, blank, quote] = text.split('\n');
    expect(h1).toBe('# Dirtyworks.ai');
    expect(blank).toBe('');
    expect(quote.startsWith('> ')).toBe(true);
  });

  it('links every published page against the canonical origin', () => {
    for (const route of published) {
      expect(text).toContain(`](${new URL(route.path, SITE).href})`);
    }
    expect(text).toContain(`${SITE}/agents.md`);
    expect(text).toContain(`${SITE}/sitemap.xml`);
  });

  it('carries the long-form text that left the home page', () => {
    expect(text).toContain('using approved company information');
    expect(text).toContain('sees only what they are allowed to see');
    expect(text).toContain('Models run inside the workspace');
    expect(text).toContain('a colleague who opens a shared tool');
  });

  it('states the pilot status and the foundation without a partner claim', () => {
    expect(text).toContain('agreed before work begins');
    expect(text).toContain('Cloudflare OS provides the open-source workspace foundation');
    expect(text).toContain('early access');
    expect(text).not.toMatch(/certified partner|official partner|partner badge/i);
  });

  it('publishes no price or unresolved marker, and no duration for the workspace pilot', () => {
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/OPEN GAP|LEGAL REVIEW/);
    /* The MSP section legitimately carries the existing partner pilot's 90-day review; the direct
       workspace offer publishes no duration, so only its section is held to that. */
    const pilot = text.slice(0, text.indexOf('## Managed services'));
    expect(pilot.length).toBeGreaterThan(1000);
    expect(pilot).not.toMatch(/\b\d+[- ](day|week|month)s?\b/i);
  });

  it('gives every route a summary', () => {
    for (const route of ROUTES) expect(PAGE_SUMMARIES[route.id].length).toBeGreaterThan(20);
  });
});

describe('agents.md', () => {
  const text = buildAgentsMd(SITE);

  it('points at the full text and names the contact channels', () => {
    expect(text.startsWith('# Dirtyworks.ai: guidance for AI agents')).toBe(true);
    expect(text).toContain(`${SITE}/llms.txt`);
    expect(text).toContain(CONTACT_EMAIL);
    expect(text).toContain(`${SITE}/start`);
  });

  it('lists every inquiry interest with its preselecting URL', () => {
    for (const interest of INTERESTS) {
      if (interest === 'not-sure') continue;
      expect(text).toContain(`${SITE}/start?interest=${interest}`);
    }
  });

  it('tells an agent what not to claim', () => {
    expect(text).toMatch(/do not estimate a duration/i);
    expect(text).toMatch(/not a resale or endorsement claim/i);
    expect(text).toMatch(/founder is not named/i);
    expect(text).toMatch(/Submit the form only when the person has asked/);
    expect(text).toContain('credentials, private documents, or customer or employee records');
  });

  it('links every published page', () => {
    for (const route of published) {
      expect(text).toContain(`](${new URL(route.path, SITE).href})`);
    }
  });
});
