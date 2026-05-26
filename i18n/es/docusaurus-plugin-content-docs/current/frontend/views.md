---
sidebar_position: 2
---

# Vistas

Cada página de TeamUp es una **clase JavaScript** con un método `render()` que establece `document.getElementById("app").innerHTML`.

## Lista de vistas

| Vista | Archivo | Roles |
|------|---------|-------|
| Login | `LoginView.js` | PUBLIC |
| Events | `EventsView.js` | ADMIN, STAFF |
| Event Details | `EventDetails.js` | ADMIN, STAFF |
| Dashboard | `DashboardView.js` | ADMIN, STAFF |
| Create Event | `createEvent.js` | ADMIN |
| Teams & Projects | `TeamsAndProjects.js` | ADMIN, STAFF, CODER |
| Team Detail | `TeamDetailView.js` | ADMIN |
| Coder Event Select | `CoderEventSelect.js` | CODER, TL_* |
| Coder Home | `coderHome.js` | CODER, TL_* |
| TL Dashboard | `TLDashboardView.js` | TL_*, ADMIN |
| Ranking | `Ranking.js` | ADMIN, STAFF |
| QR Voting | `EventVoting.js` | ADMIN |
| Finalists | `FinalistsView.js` | ADMIN, STAFF |
| Public Voting | `PublicVotingPage.js` | PUBLIC |
| Profile | `ProfileView.js` | ALL |

## Ciclo de vida de la vista

```javascript
export default class MyView {
  constructor(router) {
    this.router  = router;
    this.user    = getUser();
    this.navbar  = new Navbar(router);
    this.header  = new Header(router);
  }

  async render() {
    const app = document.getElementById("app");
    app.innerHTML = `${this.navbar.render()} ...`;

    this.navbar.attachEventHandlers();
    this.header.mountBreadcrumb();

    await this.fetchData();
    this.renderContent();
    this.attachEventHandlers();
  }

  destroy() {
    // limpieza — listeners de socket, handlers de idioma, etc.
  }
}
```

## Gestión del estado

No hay un gestor global de estado. El estado se conserva en:
- **Propiedades de instancia de clase** — estado a nivel de vista
- **localStorage** — ID/nombre del evento actual y token JWT
- **sessionStorage** — objeto del evento seleccionado

## Login

El punto de entrada para todos los usuarios. Soporta autenticación con correo y contraseña.

:::info
No existe un registro público; las cuentas las crea un ADMIN.
:::
