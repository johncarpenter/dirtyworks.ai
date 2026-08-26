/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

/* Bindings are reached through `context.locals.runtime.env` in the on-demand actions route.
   See src/actions/index.ts for why not `cloudflare:workers`. */

declare namespace App {
  interface Locals {
    runtime?: {
      env: import('./types/bindings').WorkerEnv;
      cf?: unknown;
      ctx?: { waitUntil(promise: Promise<unknown>): void };
    };
  }
}
