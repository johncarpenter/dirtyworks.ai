import type { APIRoute } from 'astro';
import { buildLlmsTxt } from '../copy/llms';

/* The site's full text for AI agents, in the llms.txt shape. Prerendered with the rest of the
   site (output: 'static'), so it costs no Worker invocation; the pages are brief and this file
   carries the argument behind them. See src/copy/llms.ts. */
export const GET: APIRoute = ({ site }) =>
  new Response(buildLlmsTxt(site?.href ?? 'https://dirtyworks.ai'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
