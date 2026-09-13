import { useEffect, useMemo, useRef, useState } from 'react';
import { actions, isInputError } from 'astro:actions';
import { Icon } from '../ui/Icon';
import {
  INTERESTS,
  INTEREST_LABELS,
  MESSAGE_HELP,
  MESSAGE_MAX_LENGTH,
  NEUTRAL_INTEREST,
  parseInterest,
  type Interest,
} from '../../copy/inquiry';

/**
 * The site's only stateful surface: the shared inquiry form.
 *
 * It replaced the incident-first intake. Nobody has to report a failure to express interest in a
 * pilot; the required fields are name, company, work email, an interest, and one free-text
 * answer. The interest can arrive preselected through `/start?interest=…` — parsed on the client
 * after mount, because the page is prerendered — and the visitor can always change it.
 *
 * The state machine is unchanged from data-model.md §3: editing, submitting, confirmed, refused,
 * rateLimited, deliveryFailed. `confirmed` is reachable only from a resolved send — every other
 * outcome keeps the visitor's values and offers a direct email alternative.
 */

type Status =
  | 'editing'
  | 'submitting'
  | 'confirmed'
  | 'refused'
  | 'rateLimited'
  | 'deliveryFailed';

interface FieldSpec {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
  type?: string;
  maxLength: number;
}

const IDENTITY_FIELDS: FieldSpec[] = [
  { name: 'name', label: 'Name', placeholder: 'First and last', required: true, maxLength: 80 },
  {
    name: 'company',
    label: 'Company',
    placeholder: 'Legal or operating name',
    required: true,
    maxLength: 120,
  },
  {
    name: 'email',
    label: 'Work email',
    placeholder: 'name@company.ca',
    required: true,
    type: 'email',
    maxLength: 254,
  },
];

const MESSAGE_FIELD: FieldSpec = {
  name: 'message',
  label: 'What would you like your team to do, build, or improve?',
  placeholder: 'The work, in plain terms.',
  required: true,
  multiline: true,
  maxLength: MESSAGE_MAX_LENGTH,
};

const OPTIONAL_FIELDS: FieldSpec[] = [
  { name: 'role', label: 'Role', placeholder: 'Your title', maxLength: 80 },
  { name: 'teamSize', label: 'Approximate team size', placeholder: 'People', maxLength: 80 },
  {
    name: 'aiProducts',
    label: 'Current systems or AI tools',
    placeholder: 'Names or job types',
    maxLength: 300,
  },
  {
    name: 'mspRelationship',
    label: 'Existing MSP relationship',
    placeholder: 'Provider, or none',
    maxLength: 160,
  },
];

const ALL_FIELDS = [...IDENTITY_FIELDS, MESSAGE_FIELD, ...OPTIONAL_FIELDS];

const MAILTO = 'mailto:hello@dirtyworks.ai?subject=Website%20inquiry';

export default function StartForm() {
  const [status, setStatus] = useState<Status>('editing');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [interest, setInterest] = useState<Interest>(NEUTRAL_INTEREST);
  const formRef = useRef<HTMLFormElement | null>(null);
  const mountedAt = useMemo(() => Date.now(), []);

  // The page is prerendered, so the query string is only readable here. Only the three
  // recognised values preselect anything; everything else stays on the neutral selection.
  useEffect(() => {
    setInterest(parseInterest(window.location.search));
  }, []);

  const busy = status === 'submitting';

  const focusFirstError = (errors: Record<string, string[]>) => {
    const firstName = ALL_FIELDS.find((field) => errors[field.name]?.length)?.name;
    if (!firstName) return;
    const element = formRef.current?.elements.namedItem(firstName);
    if (element instanceof HTMLElement) element.focus();
  };

  // React 19 deprecates both FormEvent and FormEventHandler. This types exactly what the handler
  // uses, which is also all it should depend on.
  const onSubmit = async (event: {
    preventDefault(): void;
    currentTarget: HTMLFormElement;
  }) => {
    event.preventDefault();
    if (busy) return;

    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();

    // Client-side required check first, so an obvious mistake never costs a round trip.
    const localErrors: Record<string, string[]> = {};
    for (const field of ALL_FIELDS) {
      if (field.required && value(field.name).length === 0) {
        localErrors[field.name] = [`${field.label} is required`];
      }
    }
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setStatus('editing');
      focusFirstError(localErrors);
      return;
    }

    setStatus('submitting');
    setFieldErrors({});

    const payload = {
      ...Object.fromEntries(ALL_FIELDS.map((field) => [field.name, value(field.name)])),
      interest,
      decoy: value('decoy'),
      elapsedMs: Date.now() - mountedAt,
    };

    const { error } = await actions.sendInquiry(payload as never);

    if (!error) {
      setStatus('confirmed');
      formRef.current?.reset();
      return;
    }

    if (isInputError(error)) {
      setFieldErrors(error.fields as Record<string, string[]>);
      setStatus('editing');
      focusFirstError(error.fields as Record<string, string[]>);
      return;
    }

    if (error.code === 'TOO_MANY_REQUESTS') {
      setStatus('rateLimited');
      return;
    }

    if (error.code === 'BAD_REQUEST') {
      setStatus('refused');
      return;
    }

    setStatus('deliveryFailed');
  };

  const renderField = (field: FieldSpec, help?: string) => {
    const errors = fieldErrors[field.name] ?? [];
    const invalid = errors.length > 0;
    const helpId = help ? `${field.name}-help` : null;
    const errorId = invalid ? `${field.name}-error` : null;
    const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <p className="field" key={field.name}>
        <label className="field__label" htmlFor={field.name}>
          {field.label}
          {field.required ? <span className="field__required"> *</span> : null}
        </label>
        {help ? (
          <span className="field__help" id={helpId ?? undefined}>
            {help}
          </span>
        ) : null}
        {field.multiline ? (
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            required={field.required}
          />
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type ?? 'text'}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            required={field.required}
          />
        )}
        {invalid ? (
          <span className="field__error" id={errorId ?? undefined}>
            {/* Decorative on purpose — no `label`. The mark makes a failed field findable while
                scanning a long form; the text beside it is what actually says what went wrong,
                and a screen reader should not hear "cancel" before hearing that. */}
            <Icon name="gap" size={16} />
            {errors[0]}
          </span>
        ) : null}
      </p>
    );
  };

  if (status === 'confirmed') {
    return (
      <div className="intake-confirm" role="status" aria-live="polite">
        <p className="intake-confirm__chip">Received</p>
        <h2 className="intake-confirm__heading">Your inquiry has been received.</h2>
        <p className="intake-confirm__body">
          Thanks — your inquiry has been received. Dirtyworks.ai will follow up using the email
          address you provided to discuss fit and possible next steps. Sending this form does not
          start a pilot, create a service relationship, or authorize access to company systems.
        </p>
        <button
          className="intake-confirm__again"
          type="button"
          onClick={() => {
            setInterest(NEUTRAL_INTEREST);
            setStatus('editing');
          }}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="intake" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="intake__head">
        <span className="intake__head-title">Inquiry / shared form</span>
        <span className="intake__head-note">
          Required fields marked <span className="field__required">*</span>
        </span>
      </div>

      <div className="intake__body">
        <div className="intake__pair">{IDENTITY_FIELDS.map((field) => renderField(field))}</div>

        <fieldset className="interest">
          <legend className="interest__legend">
            Interest<span className="field__required"> *</span>
          </legend>
          <div className="interest__options">
            {INTERESTS.map((option) => {
              const checked = interest === option;
              return (
                <label className="interest__option" key={option} data-checked={checked}>
                  <input
                    type="radio"
                    name="interest"
                    value={option}
                    checked={checked}
                    onChange={() => setInterest(option)}
                  />
                  <span>{INTEREST_LABELS[option]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {renderField(MESSAGE_FIELD, MESSAGE_HELP[interest])}

        <p className="intake__divider">Optional context</p>
        <div className="intake__optional">{OPTIONAL_FIELDS.map((field) => renderField(field))}</div>

        {/* Decoy. Hidden from sight and from assistive technology, unreachable by keyboard: a
            non-empty value means a script filled every input it could find. */}
        <div className="decoy" aria-hidden="true">
          <label htmlFor="decoy">Company website</label>
          <input id="decoy" name="decoy" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="consent">
          <p className="consent__caption">Before you send</p>
          <p className="consent__body">
            Please do not include credentials, private documents, or customer or employee records.
            By sending this inquiry, you agree that Dirtyworks.ai may use the information provided
            to respond to it.
          </p>
        </div>

        {status === 'refused' ? (
          <p className="intake__alert" role="alert">
            That submission could not be accepted. If this looks wrong, email{' '}
            <a href={MAILTO}>hello@dirtyworks.ai</a> and we will pick it up from there.
          </p>
        ) : null}

        {status === 'rateLimited' ? (
          <p className="intake__alert" role="alert">
            Too many submissions from this connection. Try again shortly, or email{' '}
            <a href={MAILTO}>hello@dirtyworks.ai</a>. Your answers are still here.
          </p>
        ) : null}

        {status === 'deliveryFailed' ? (
          <p className="intake__alert" role="alert">
            We could not deliver that message, so it has not reached us. Try again, or email{' '}
            <a href={MAILTO}>hello@dirtyworks.ai</a>. Your answers are still here.
          </p>
        ) : null}

        <div className="intake__actions">
          <button className="intake__submit" type="submit" disabled={busy}>
            {busy ? 'Sending…' : 'Send inquiry'}
          </button>
          {busy ? (
            <span className="intake__status" role="status">
              Sending your inquiry.
            </span>
          ) : null}
        </div>
      </div>
    </form>
  );
}
