import { useEffect, useRef, useState } from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeaderNavProps {
  items: NavItem[];
  activeId: string | null;
  action: { label: string; href: string | null };
  version: string;
}

/**
 * Upgrades the header. Every destination is rendered at all times — server-side too — so a visitor
 * without JavaScript still has working navigation. Hydration adds only the mobile disclosure:
 * open/close state, Escape to dismiss, and focus containment while open.
 */
export default function HeaderNav({ items, activeId, action, version }: HeaderNavProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const actionClass = action.href ? 'header-action' : 'header-action header-action--current';

  return (
    <>
      <nav className="header-nav" aria-label="Primary">
        <ul className="header-nav__list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className="header-nav__link"
                href={item.href}
                aria-current={item.id === activeId ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {action.href ? (
          <a className={actionClass} href={action.href}>
            {action.label}
          </a>
        ) : (
          <span className={actionClass} aria-current="page">
            {action.label}
          </span>
        )}

        <span className="header-version">{`Site / ${version}`}</span>

        <button
          ref={buttonRef}
          className="header-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="header-panel"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {/* Sibling of the nav rather than a child of it. The panel is a full-width row of the
          header line; inside the nav's flex row it would sit beside the menu button and push
          the document sideways at narrow widths. */}
      <nav
        className="header-panel"
        id="header-panel"
        aria-label="Menu"
        ref={panelRef}
        data-open={open ? 'true' : 'false'}
      >
        <ul className="header-panel__list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className="header-panel__link"
                href={item.href}
                aria-current={item.id === activeId ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {action.href ? (
          <a className="header-action" href={action.href}>
            {action.label}
          </a>
        ) : (
          <span className="header-action header-action--current">{action.label}</span>
        )}

        <span className="header-version">{`Site / ${version}`}</span>
      </nav>
    </>
  );
}
