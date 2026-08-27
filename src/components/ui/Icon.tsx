/* Icon for React islands. Same twenty semantic names and the same rules as Icon.astro — see that
   file for why icons are rare on this site. The two exist only because Astro components cannot be
   rendered inside a client island.

   The one place this is currently used is the intake form's error state, which is the case the
   design system names outright: "Where a real glyph is unavoidable (form affordances, a nav
   toggle, a document marker)". An error mark earns its place because it is doing something the
   adjacent text cannot — making a failed field findable at a glance, down a long form. */
import { GLYPHS, type IconName } from './icons';

interface Props {
  name: IconName;
  /** 20-24px per the brand; anything else needs a reason */
  size?: number;
  /** Accessible name. Omit when adjacent text already says it — the usual case. */
  label?: string;
  className?: string;
}

export function Icon({ name, size = 20, label, className }: Props) {
  return (
    <span
      className={className ? `icon ${className}` : 'icon'}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        fontFamily: 'var(--font-icon)',
        // The element's text IS the ligature name; 'liga' turns it into a mark.
        fontFeatureSettings: "'liga'",
        fontWeight: 500,
        fontSize: size,
        // 1.2 matches the face's own line box; at 1 the overflow guard shaves the glyph bottoms.
        lineHeight: 1.2,
        display: 'inline-block',
        flex: 'none',
        // Box to one em and clip — see the note in Icon.astro. The element's text is the ligature
        // name, so an absent font draws a word rather than nothing.
        // Width only: a fixed height trims 3px off the glyph, since a 24px face has a 27px line box.
        width: size,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        direction: 'ltr',
        /* Both of these are resets, not styling, and both are load-bearing. The mark is drawn by
           a ligature over the literal text "cancel", and a ligature does not form on text that has
           been case-transformed or letter-spaced. Inherit `text-transform: uppercase` from a mono
           label — which is most labels on this site — and the icon renders as the word CANCEL. */
        textTransform: 'none',
        letterSpacing: 'normal',
        WebkitFontSmoothing: 'antialiased',
        userSelect: 'none',
      }}
    >
      {GLYPHS[name]}
    </span>
  );
}
