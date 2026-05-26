---
sidebar_position: 1
---

# Visión general de la arquitectura

TeamUp sigue una **arquitectura cliente-servidor** con un backend API REST y un frontend SPA hecho en JavaScript vanilla.

## Diagrama de alto nivel

```
┌─────────────────────────────────────────────────┐
│                   CLIENTE (Vercel)              │
│                                                  │
│   SPA en JavaScript vanilla                       │
│   ├── Router (basado en hash)                    │
│   ├── Vistas (una clase por página)              │
│   ├── Componentes (Navbar, Header, Toast)        │
│   └── Servicios (api.js, socket.js, auth.js)     │
└──────────────┬──────────────────────────────────┘
               │  HTTPS REST + WebSocket
┌──────────────▼──────────────────────────────────┐
│                  SERVIDOR (Railway)              │
│                                                  │
│   Express.js API                                 │
│   ├── Rutas                                      │
│   ├── Controladores                              │
│   ├── Servicios                                   │
│   ├── Middleware (auth, rbac)                    │
│   └── Socket.IO                                   │
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

## Decisiones de diseño clave

### Base de datos doble
- **PostgreSQL** — datos relacionales (usuarios, equipos, eventos, evaluaciones)
- **MongoDB** — sesiones de votos y datos de votación QR (alta frecuencia de escritura)

### Enrutamiento SPA basado en hash
El frontend usa `window.location.hash` para enrutar (por ejemplo, `#/dashboard`). Esto evita la configuración de enrutamiento del lado del servidor en Vercel.

### Control de acceso basado en roles (RBAC)
Cada ruta de la API está protegida por middleware que valida el rol del usuario antes de permitir el acceso.

### Tiempo real con Socket.IO
Los conteos de votos se actualizan en tiempo real con Socket.IO. El backend emite eventos `vote:new` después de registrar cada voto.
