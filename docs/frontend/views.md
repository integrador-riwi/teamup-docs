---
sidebar_position: 2
---

# Views

Each page in TeamUp is a **JavaScript class** with a `render()` method that sets `document.getElementById("app").innerHTML`.

## View List

| View | File | Roles |
|------|------|-------|
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

## View Lifecycle
```javascript
// Typical view class structure
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
    // cleanup — e.g. remove socket listeners, lang change handlers
  }
}
```

## State Management

There is no global state manager. State is kept in:
- **Class instance properties** — view-level state
- **localStorage** — current event id/name, JWT token
- **sessionStorage** — selected event object