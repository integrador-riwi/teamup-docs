---
sidebar_position: 2
---

# Controladores

Cada módulo de TeamUp sigue el patrón **MVC**: rutas → controladores → servicios.

## Estructura

```
src/modules/
├── auth/
│   └── auth.controller.js
├── events/
│   └── events.controller.js
├── teams/
│   └── teams.controller.js
├── projects/
│   └── projects.controller.js
├── users/
│   └── users.controller.js
├── ranking/
│   └── ranking.controller.js
├── finalists/
│   └── finalists.controller.js
├── evaluations/
│   └── evaluations.controller.js
├── comments/
│   └── comments.controller.js
├── QR-Votes/
│   └── votes.controller.js
└── upload/
    └── upload.controller.js
```

## Patrón

Cada controlador sigue esta estructura:

```javascript
export const myController = {
  async get(req, res) {
    try {
      const data = await myService.get(req.params.id);
      res.json({ success: true, data });
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
};
```

## Formato de respuesta

Todos los controladores devuelven JSON consistente:

```javascript
// Éxito
{ success: true, data: { ... } }

// Error
{ error: "Error message" }
```
