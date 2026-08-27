import { useMemo, useRef, useState } from 'react';
import { actions, isInputError } from 'astro:actions';
import { Icon } from '../ui/Icon';

/**
 * The site's only stateful surface.
 *
 * The prototype held a single `submitted` boolean. That is not enough to be honest about failure,
 * so this implements the full machine from data-model.md §3: editing, invalid, submitting,
 * confirmed, refused, rateLimited, deliveryFailed. `confirmed` is reachable only from a resolved
 * send — every other outcome keeps the visitor's values and offers a direct email alternative.
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
  { name: 'role', label: 'Role', placeholder: 'Your title', required: true, maxLength: 80 },
  {
    name: 'email',
    label: 'Work email',
    placeholder: 'name@company.ca',
    required: true,
    type: 'email',
    maxLength: 254,
  },
];

const EVENT_FIELDS: FieldSpec[] = [
  {
    name: 'intent',
    label: 'What was somebody trying to do?',
    placeholder: 'The task, not the technology.',
    required: true,
    multiline: true,
    maxLength: 1000,
  },
  {
    name: 'event',
    label: 'What happened?',
    placeholder: 'The event, in plain terms.',
    required: true,
    multiline: true,
    maxLength: 1000,
  },
];

const OWNERSHIP_FIELDS: FieldSpec[] = [
  {
    name: 'system',
    label: 'Product or system involved',
    placeholder: 'Tool, account, or integration',
    required: true,
    maxLength: 160,
  },
  {
    name: 'owner',
    label: 'Who owns it today, if anyone?',
    placeholder: 'Person, team, or \u201cnobody\u201d',
    required: true,
    maxLength: 160,
  },
];

const OPTIONAL_FIELDS: FieldSpec[] = [
  { name: 'companySize', label: 'Approximate company size', placeholder: 'People', maxLength: 80 },
  {
    name: 'aiProducts',
    label: 'Current AI products or categories',
    placeholder: 'Names or job types',
    maxLength: 300,
  },
  {
    name: 'peopleUsing',
    label: 'People using them',
    placeholder: 'Approximate number',
    maxLength: 80,
  },
  {
    name: 'environment',
    label: 'Existing environment',
    placeholder: 'Microsoft, Google, AWS, Azure, other',
    maxLength: 160,
  },
  {
    name: 'mspRelationship',
    label: 'Existing MSP relationship',
    placeholder: 'Provider, or none',
    maxLength: 160,
  },
  {
    name: 'contactPreference',
    label: 'Preferred way and time to respond',
    placeholder: 'Email, phone, morning, afternoon',
    maxLength: 160,
  },
];

const NEEDS = [
  'product selection',
  'user administration',
  'training',
  'support',
  'integration',
  'governance',
  'monitoring',
  'cost control',
  'knowledge',
  'msp partnership',
] as const;

const NEED_LABELS: Record<(typeof NEEDS)[number], string> = {
  'product selection': 'Product selection',
  'user administration': 'User administration',
  training: 'Training',
  support: 'Support',
  integration: 'Integration',
  governance: 'Governance',
  monitoring: 'Monitoring',
  'cost control': 'Cost control',
  knowledge: 'Knowledge',
  'msp partnership': 'MSP partnership',
};

const ALL_FIELDS = [
  ...IDENTITY_FIELDS,
  ...EVENT_FIELDS,
  ...OWNERSHIP_FIELDS,
  ...OPTIONAL_FIELDS,
];

const MAILTO = 'mailto:hello@dirtyworks.ai?subject=Operating%20gap';

export default function StartForm() {
  const [status, setStatus] = useState<Status>('editing');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [needs, setNeeds] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const mountedAt = useMemo(() => Date.now(), []);

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
      needs,
      decoy: value('decoy'),
      elapsedMs: Date.now() - mountedAt,
    };

    const { error } = await actions.logOperatingGap(payload as never);

    if (!error) {
      setStatus('confirmed');
      setNeeds([]);
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

  const renderField = (field: FieldSpec) => {
    const errors = fieldErrors[field.name] ?? [];
    const invalid = errors.length > 0;
    const describedBy = invalid ? `${field.name}-error` : undefined;

    return (
      <p className="field" key={field.name}>
        <label className="field__label" htmlFor={field.name}>
          {field.label}
          {field.required ? <span className="field__required"> *</span> : null}
        </label>
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
          <span className="field__error" id={`${field.name}-error`}>
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
        <p className="intake-confirm__chip">Received / Logged</p>
        <h2 className="intake-confirm__heading">The gap is on the record.</h2>
        <p className="intake-confirm__body">
          We will review the event and respond using the contact details provided. Sending this
          form does not create a service relationship or authorize access to company systems.
        </p>
        <button className="intake-confirm__again" type="button" onClick={() => setStatus('editing')}>
          Log another gap
        </button>
      </div>
    );
  }

  return (
    <form className="intake" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="intake__head">
        <span className="intake__head-title">Operating gap / intake</span>
        <span className="intake__head-note">
          Required fields marked <span className="field__required">*</span>
        </span>
      </div>

      <div className="intake__body">
        <div className="intake__pair">{IDENTITY_FIELDS.map(renderField)}</div>
        {EVENT_FIELDS.map(renderField)}
        <div className="intake__pair">{OWNERSHIP_FIELDS.map(renderField)}</div>

        <p className="intake__divider">Optional context</p>
        <div className="intake__optional">{OPTIONAL_FIELDS.map(renderField)}</div>

        <fieldset className="needs">
          <legend className="needs__legend">What do you need?</legend>
          <div className="needs__options">
            {NEEDS.map((need) => {
              const checked = needs.includes(need);
              return (
                <label className="needs__option" key={need} data-checked={checked}>
                  <input
                    type="checkbox"
                    name="needs"
                    value={need}
                    checked={checked}
                    onChange={() =>
                      setNeeds((current) =>
                        current.includes(need)
                          ? current.filter((item) => item !== need)
                          : [...current, need],
                      )
                    }
                  />
                  <span>{NEED_LABELS[need]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Decoy. Hidden from sight and from assistive technology, unreachable by keyboard: a
            non-empty value means a script filled every input it could find. */}
        <div className="decoy" aria-hidden="true">
          <label htmlFor="decoy">Company website</label>
          <input id="decoy" name="decoy" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="consent">
          <p className="consent__caption">Do not send</p>
          <p className="consent__body">
            Do not include passwords, API keys, customer or employee records, private documents,
            health or financial information, or other sensitive data. By submitting, you agree that
            Dirtyworks.ai may use the information to respond to this inquiry under the website
            privacy notice.
          </p>
          <p className="consent__stamp">Legal review — consent wording pending</p>
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
            {busy ? 'Sending…' : 'Log the operating gap'}
          </button>
          {busy ? (
            <span className="intake__status" role="status">
              Sending your answers.
            </span>
          ) : null}
        </div>
      </div>
    </form>
  );
}
