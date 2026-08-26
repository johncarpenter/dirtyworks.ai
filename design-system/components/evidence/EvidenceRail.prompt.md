# EvidenceRail
Register of source fragments — use where the argument is "these facts exist, scattered".

```jsx
<EvidenceRail title="THE INVISIBLE ANSWER DESK" aligned={inView} items={[
  { text: "The current procedure is somewhere in SharePoint.", origin: "SHAREPOINT / OPS", status: "gap", statusLabel: "OPEN GAP" },
  { text: "New staff keep asking the same five people.", status: "human", statusLabel: "PERSON-DEPENDENT" },
]} />
```

Ships misaligned by default and aligns when `aligned` flips — drive that from an intersection observer, not a timer. 3–6 items; more reads as a list.
