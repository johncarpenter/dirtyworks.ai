# SiteHeader
Compact site nav with a persistent version marker.

```jsx
<SiteHeader active={page} onNavigate={setPage} version="DOC 0.1 / 2026-08"
  items={[{ id: "work", label: "WORK" }, { id: "method", label: "METHOD" }, { id: "trust", label: "TRUST" }]}
  cta={{ label: "SHOW US WHERE WORK GETS STUCK" }} />
```

Five nav items maximum. The active item takes a 3px orange underline — not a filled pill.
