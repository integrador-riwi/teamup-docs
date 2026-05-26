---
sidebar_position: 1
---

# Frontend Routing

TeamUp uses a **hash-based SPA router** — no framework, pure Vanilla JS.

## How it works

The router lives in `src/index.js` and maps hash values to view classes:
```javascript
const ROUTE_PERMISSIONS = {
  login:            "PUBLIC",
  dashboard:        ["ADMIN", "STAFF"],
  events:           ["ADMIN", "STAFF"],
  "events/create":  ["ADMIN"],
  details:          ["ADMIN", "STAFF"],
  projects:         ["ADMIN", "STAFF", "CODER"],
  ranking:          ["ADMIN", "STAFF"],
  qr:               ["ADMIN"],
  coderEventSelect: ["CODER", "TL_DEVELOPMENT", "TL_SOFT_SKILLS", "TL_ENGLISH"],
  coderHome:        ["CODER", "TL_DEVELOPMENT", "TL_SOFT_SKILLS", "TL_ENGLISH"],
  tlDashboard:      ["TL_DEVELOPMENT", "TL_SOFT_SKILLS", "TL_ENGLISH", "ADMIN"],
  profile:          ["ADMIN", "STAFF", "CODER", "TL_DEVELOPMENT", "TL_SOFT_SKILLS", "TL_ENGLISH"],
  finalists:        ["ADMIN", "STAFF"],
  vote:             "PUBLIC",
};
```

## Navigation

To navigate programmatically:
```javascript
this.router.navigate("dashboard");
this.router.navigate("details", { id: eventId, name: eventName });
```

## Route Guards

- **PUBLIC** routes are accessible without authentication
- All other routes require a valid JWT token
- If the role doesn't match, the user is redirected to their home route
- `login` redirects to home if already authenticated

## Home route by role

| Role | Home Route |
|------|-----------|
| `ADMIN` | `events` |
| `STAFF` | `dashboard` |
| `CODER` | `coderEventSelect` |
| `TL_*` | `coderEventSelect` |