import type { APIRoute } from 'astro';
import { buildAgentsMd } from '../copy/llms';

/* Guidance for an AI agent acting on a person's behalf: how to describe the offer accurately,
   what the site does not claim, and how to make contact. Prerendered like sitemap.xml. */
export const GET: APIRoute = ({ site }) =>
  new Response(buildAgentsMd(site?.href ?? 'https://dirtyworks.ai'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
