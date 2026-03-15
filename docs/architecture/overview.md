---
sidebar_position: 1
---

# Architecture Overview

TeamUp follows a **client-server architecture** with a REST API backend and a Vanilla JS SPA frontend.

## High Level Diagram
```
┌─────────────────────────────────────────────────┐
│                   CLIENT (Vercel)                │
│                                                  │
│   Vanilla JS SPA                                 │
│   ├── Router (hash-based)                        │
│   ├── Views (one class per page)                 │
│   ├── Components (Navbar, Header, Toast)         │
│   └── Services (api.js, socket.js, auth.js)      │
└──────────────┬──────────────────────────────────┘
               │  HTTPS REST + WebSocket
┌──────────────▼──────────────────────────────────┐
│                  SERVER (Railway)                │
│                                                  │
│   Express.js API                                 │
│   ├── Routes                                     │
│   ├── Controllers                                │
│   ├── Services                                   │
│   ├── Middleware (auth, rbac)                    │
│   └── Socket.IO                                  │
└──────┬───────────────────────┬───────────────────┘
       │                       │
┌──────▼──────┐       ┌────────▼────────┐
│ PostgreSQL  │       │    MongoDB      │
│             │       │                 │
│ users       │       │ votes           │
│ teams       │       │ qr_sessions     │
│ events      │       │                 │
│ evaluations │       │                 │
└─────────────┘       └─────────────────┘
```

## Key Design Decisions

### Dual Database
- **PostgreSQL** — relational data (users, teams, events, evaluations)
- **MongoDB** — vote sessions and QR voting data (flexible, high write volume)

### Hash-based SPA Routing
The frontend uses `window.location.hash` for routing (e.g. `#/dashboard`). This avoids server-side routing configuration on Vercel.

### Role-Based Access Control (RBAC)
Every API route is protected by middleware that checks the user's role before allowing access.

### Real-time with Socket.IO
Vote counts update in real time using Socket.IO. The backend emits `vote:new` events after each vote is registered.