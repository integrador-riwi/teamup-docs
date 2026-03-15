---
sidebar_position: 1
---

# Real-time with Socket.IO

TeamUp uses **Socket.IO** for real-time features, primarily live vote updates during QR voting sessions.

## Connection

The socket connects automatically when a user is authenticated:
```javascript
// services/socket.js
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
The socket requires authentication. Anonymous users (e.g. public voting page) cannot connect via socket. The admin voting dashboard uses **polling as a fallback** every 5 seconds.
:::

## Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `join_project` | `projectId` | Join a project room for live updates |
| `leave_project` | `projectId` | Leave a project room |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `vote:new` | `{ qr_vote_id, project_id, vote }` | New vote registered |
| `invitation:new` | `{ teamName, invitedByName, ... }` | Team invitation received |
| `invitation:accepted` | `{ userName, teamName }` | Invitation accepted |
| `invitation:rejected` | `{ userName, teamName }` | Invitation rejected |
| `join_request:new` | `{ coderName, teamName }` | Join request received |
| `join_request:accepted` | `{ teamName }` | Join request accepted |
| `join_request:rejected` | `{ teamName }` | Join request rejected |
| `comment:new` | `{ author_name }` | New comment on project |
| `team:member_removed` | `{ teamName }` | Removed from team |

## Subscribing to Events
```javascript
import { on, off } from "../services/socket.js";

// Subscribe
on("vote:new", async (data) => {
  await this.fetchVoteResults();
  this.renderResults();
});

// Unsubscribe (always do this in destroy())
destroy() {
  off("vote:new");
}
```

## Polling Fallback

Since the public voting page is anonymous, votes are also polled every 5 seconds:
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