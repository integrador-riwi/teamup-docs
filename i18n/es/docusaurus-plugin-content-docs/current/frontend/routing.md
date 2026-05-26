---
sidebar_position: 1
---

# Enrutamiento frontend

TeamUp usa un **router SPA basado en hash** sin framework.

## Cómo funciona

El router vive en `src/index.js` y mapea los hashes a clases de vista:

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

## Navegación

Para navegar de forma programática:

```javascript
this.router.navigate("dashboard");
this.router.navigate("details", { id: eventId, name: eventName });
```

## Guardas de ruta

- Las rutas `PUBLIC` son accesibles sin autenticación
- El resto requiere un JWT válido
- Si el rol no coincide, el usuario se redirige a su ruta principal
- `login` redirige al home si ya está autenticado

## Ruta principal por rol

| Rol | Ruta principal |
|------|----------------|
| `ADMIN` | `events` |
| `STAFF` | `dashboard` |
| `CODER` | `coderEventSelect` |
| `TL_*` | `coderEventSelect` |
