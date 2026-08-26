import { ActionError, defineAction } from 'astro:actions';
import { operatingGapSchema } from './schemas';
import { failsHoneypot, hashClientKey, tooFast, withinRateLimit } from './guards';
import { logSubmission, sendNotification, type SubmissionOutcome } from './notify';

/**
 * The site's only server logic.
 *
 * Every outcome maps to the error contract in contracts/actions.md, and the contract has one
 * load-bearing rule: success is returned ONLY after `send()` resolves. Any throw, rejection or
 * missing binding becomes a retryable delivery failure — a success message the code has not
 * earned is a defect, not a UX nicety.
 *
 * Bindings come from `context.locals.runtime.env` rather than a module-scope
 * `import { env } from 'cloudflare:workers'`. That import is what the adapter itself uses, but
 * Vite cannot resolve it under `astro dev`, which 500s every request with ActionsCantBeLoaded.
 * `locals.runtime.env` is populated by platformProxy in dev and by the Worker in production, and
 * it is safe here precisely because the actions route is on-demand — the caveat about it being
 * undefined applies to prerendered pages, which this is not.
 */
export const server = {
  logOperatingGap: defineAction({
    accept: 'json',
    input: operatingGapSchema,
    handler: async (submission, context) => {
      const startedAt = Date.now();
      const env = context.locals.runtime?.env ?? {};

      const finish = (outcome: SubmissionOutcome, extra?: { messageId?: string; errorCode?: string }) =>
        logSubmission({
          purpose: 'operating-gap-intake',
          outcome,
          durationMs: Date.now() - startedAt,
          ...extra,
        });

      // Guards, cheapest first. Both refusals are deliberately indistinguishable to the caller:
      // telling a script which screen caught it is free help.
      if (failsHoneypot(submission.decoy) || tooFast(submission.elapsedMs)) {
        finish('refused');
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'That submission could not be accepted. Please try again.',
        });
      }

      const clientKey = await hashClientKey(context.request.headers.get('CF-Connecting-IP'));

      if (!(await withinRateLimit(env.FORM_LIMITER, clientKey))) {
        finish('rate-limited');
        throw new ActionError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Too many submissions from this connection. Try again shortly.',
        });
      }

      if (!env.EMAIL) {
        finish('delivery-failed', { errorCode: 'E_BINDING_MISSING' });
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'The message could not be delivered.',
        });
      }

      try {
        const messageId = await sendNotification(env.EMAIL, submission);
        finish('accepted', { messageId });
        return { received: true } as const;
      } catch (error) {
        const errorCode =
          typeof error === 'object' && error !== null && 'code' in error
            ? String((error as { code: unknown }).code)
            : 'E_UNKNOWN';
        finish('delivery-failed', { errorCode });
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'The message could not be delivered.',
        });
      }
    },
  }),
};
