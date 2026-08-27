# Icon
Line icon from the Dirtyworks.ai set. Names are **semantic** — what the mark means in this brand — not vendor filenames.

```jsx
<Icon name="work-order" size={20} />
<Icon name="gap" color="var(--signal-orange)" label="Open gap" />
<Icon name="owner" size={22} base="../assets/icons/" />
```

The 20 names: `verified` `work-order` `register` `diagnostic` `controlled` `sla-clock` `gap` `annotate` `owner` `measured` `verified-date` `handoff` `process` `improvement` `quality-control` `monitoring` `decision` `operations` `requirements` `calendar`.

Two modes. `ICON_MODE = 'glyph'` (current) renders a Material Symbols Sharp fallback so nothing breaks while `assets/icons/*.svg` is empty; `'svg'` renders the real IconScout line set, masked so `color` still applies. Flip the constant in `Icon.jsx` once the files land.

Use sparingly: this identity carries meaning in labels and marks, not icon rows. Never fill, never rounded, never emoji. One icon per row of meaning — if a label already says "OWNER", the icon is redundant.
