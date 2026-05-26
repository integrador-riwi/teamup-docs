---
sidebar_position: 1
---

# Socket.IO en tiempo real

TeamUp usa **Socket.IO** para funcionalidades en tiempo real, principalmente actualizaciones de votos en vivo durante las sesiones QR.

## Conexión

La conexión se inicia automáticamente cuando el usuario está autenticado:

```javascript
import { io } from "socket.io-client";

export function initSocket() {
  const token = getToken();
  if (!token) return null;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
  });
}
```

:::warning
El socket requiere autenticación. Los usuarios anónimos (como la página pública de votación) no pueden conectarse por socket. El dashboard de admins usa **polling** como fallback cada 5 segundos.
:::

## Eventos

### Cliente → Servidor

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `join_project` | `projectId` | Se une a la sala del proyecto |
| `leave_project` | `projectId` | Sale de la sala del proyecto |

### Servidor → Cliente

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `vote:new` | `{ qr_vote_id, project_id, vote }` | Se registró un nuevo voto |
| `invitation:new` | `{ teamName, invitedByName, ... }` | Llega una invitación de equipo |
| `invitation:accepted` | `{ userName, teamName }` | Invitación aceptada |
| `invitation:rejected` | `{ userName, teamName }` | Invitación rechazada |
| `join_request:new` | `{ coderName, teamName }` | Nueva solicitud de ingreso |
| `join_request:accepted` | `{ teamName }` | Solicitud aceptada |
| `join_request:rejected` | `{ teamName }` | Solicitud rechazada |
| `comment:new` | `{ author_name }` | Nuevo comentario en un proyecto |
| `team:member_removed` | `{ teamName }` | Usuario removido del equipo |

## Suscripción a eventos

```javascript
import { on, off } from "../services/socket.js";

on("vote:new", async (data) => {
  await this.fetchVoteResults();
  this.renderResults();
});

destroy() {
  off("vote:new");
}
```

## Fallback con polling

Como la página pública de votación es anónima, también se consulta cada 5 segundos:

```javascript
startPolling() {
  this.pollingInterval = setInterval(async () => {
    await this.fetchVoteResults();
    this.renderResults();
  }, 5000);
}

stopPolling() {
  clearInterval(this.pollingInterval);
  this.pollingInterval = null;
}
```
