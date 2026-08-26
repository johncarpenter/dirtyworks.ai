/* Site-level constants. The version marker is a folio device wired to the build identity, not a
   certification mark, and renders uppercase in both header and footer (research.md D-07 #5). */
export const SITE_VERSION = '0.2';

/** Build date, injected at build time so the footer cannot drift from reality. */
export const SITE_BUILD_DATE = new Date().toISOString().slice(0, 10);

export const CONTACT_EMAIL = 'hello@dirtyworks.ai';
export const BRAND_PROMISE = 'We do the work behind AI that works.';
export const LOCATION = 'Calgary, Alberta / Canada';
export const ACCOUNTABILITY_LINE =
  'Customer-owned by default. Human accountability stays human.';

/** Used by the intake form's no-JavaScript fallback and every retryable failure state. */
export const INTAKE_MAILTO_SUBJECT = 'Operating gap';

export const SENSITIVE_DATA_NOTE =
  'Do not send customer records, credentials, private documents, employee information, or other ' +
  'sensitive data through the website form.';
