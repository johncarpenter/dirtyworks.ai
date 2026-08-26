# ControlRegister
Public-facing table of controls for the TRUST surface. Leads with mechanism and holder, so it can't read as marketing.

```jsx
<ControlRegister caption="CONTROL REGISTER" rows={[
  { control: "Least privilege", mechanism: "Permission groups mirrored from the source system; tested per release.", holder: "DIRTYWORKS.AI", state: "TESTED", status: "permission" },
]} note="This register describes controls, not a guarantee of perfect answers or complete security." />
```

Always carry the `note` — the trust voice states limitations before credentials.
