/* Site-level constants. The version marker is a folio device wired to the build identity, not a
   certification mark, and renders uppercase in both header and footer (research.md D-07 #5). */
export const SITE_VERSION = '0.3';

/** Build date, injected at build time so the footer cannot drift from reality. */
export const SITE_BUILD_DATE = new Date().toISOString().slice(0, 10);

export const CONTACT_EMAIL = 'hello@dirtyworks.ai';
export const BRAND_PROMISE = 'We do the work behind AI that works.';
export const LOCATION = 'Calgary, Alberta / Canada';

/* "Customer-owned by default" was retired here on purpose. It is true of a customer-direct
   product and not necessarily of a partner-provisioned workspace, and a global footer cannot
   carry a promise that depends on the delivery arrangement. Ownership is stated per route where
   the arrangement supports it. */
export const ACCOUNTABILITY_LINE = 'Clear responsibilities. Human accountability.';

/** Used by the inquiry form's no-JavaScript fallback and every retryable failure state. */
export const INTAKE_MAILTO_SUBJECT = 'Website inquiry';

/* One list, two sentences. /about offers the email address as a channel in its own right, so the
   note rendered there has to cover email as well as the form. */
const SENSITIVE_DATA_LIST = 'credentials, private documents, or customer or employee records';

export const SENSITIVE_DATA_NOTE = `Please do not include ${SENSITIVE_DATA_LIST} in the website form.`;

export const SENSITIVE_DATA_NOTE_EMAIL =
  `Please do not include ${SENSITIVE_DATA_LIST} by email or in the website form.`;
