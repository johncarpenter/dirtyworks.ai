/* Runtime bindings declared in wrangler.jsonc.

   These deliberately do NOT reuse the global names from @cloudflare/workers-types: that package's
   `EmailAddress` requires `name`, which conflicts with the optional-name shape the Email Service
   builder actually accepts. Keeping our own named types in a module avoids a global collision and
   keeps src/actions/notify.ts structurally identical to what it is handed. */

export interface MailAddress {
  email: string;
  name?: string;
}

export interface MailMessage {
  from: MailAddress;
  to: string;
  replyTo: MailAddress;
  subject: string;
  text: string;
  html: string;
}

export interface SendEmailBinding {
  send(message: MailMessage): Promise<{ messageId: string }>;
}

export interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface WorkerEnv {
  EMAIL?: SendEmailBinding;
  FORM_LIMITER?: RateLimitBinding;
  ASSETS?: { fetch: typeof fetch };
}
