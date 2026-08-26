# OwnerRow
One accountability line. Stack them under a mono header to make an ownership register.

```jsx
<OwnerRow index={1} item="Field service procedures" owner="B. NGUYEN" checked="2026-08-11" status="operated" statusLabel="CURRENT" />
<OwnerRow index={2} item="Rate schedule (2024)" checked="2024-03-02" status="gap" statusLabel="STALE" />
```

Omitting `owner` prints UNOWNED in signal orange — that is the point of the component, not an error state.
