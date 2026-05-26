---
sidebar_position: 2
---

# Controllers

Each module in TeamUp follows the **MVC pattern** — routes call controllers, controllers call services.

## Structure
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

## Pattern

Every controller follows this structure:
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

## Response Format

All controllers return consistent JSON:
```javascript
// Success
{ success: true, data: { ... } }

// Error
{ error: "Error message" }
```