# WorkOrder
The method lifecycle as an annotated vertical work order. Use instead of four equal method cards.

```jsx
<WorkOrder steps={[
  { name: "REVIEW", duration: "7–10 DAYS", detail: "One question domain, real events, sources, owners, permissions, risk, baseline.",
    annotation: "A valid conclusion here is 'stop'.",
    marks: [{ label: "SOURCE", value: "≤3", status: "source" }] },
]} loopLabel="IMPROVEMENT RETURNS TO REVIEW" />
```

The last step renders acid-filled and the loop arrow returns to step 01. 3–5 steps.
