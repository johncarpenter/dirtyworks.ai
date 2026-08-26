# Button
Rectangular, high-contrast action with a specific label — use for every clickable commitment, never for status.

```jsx
<Button size="lg">SHOW US WHERE WORK GETS STUCK</Button>
<Button variant="secondary">SEE THE WORK BEHIND THE ANSWER</Button>
<Button variant="evidence" icon="description">READ THE TRUST MODEL</Button>
```

Variants: `primary` (signal orange + ink text — one per view), `evidence` (blueprint, for source/explanation destinations), `secondary` (outlined), `ghost`. Sizes sm/md/lg; all clear the 44px target. Labels are uppercase mono and name the action — never "Learn more" or "Get started". Radius is 0 and the hard shadow collapses 1px on press; do not add scale or glow.
