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

## Login

The entry point for all users. Supports email/password authentication.

<img
  src="/img/screenshots/login.png"
  alt="Login page"
  style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '100%'}}
/>

:::info
There is no public registration — user accounts are created by an ADMIN.
:::

---

## Events List

Admins see all events separated into **In Progress** and **Past** sections.

<img
  src="/img/screenshots/events-list-admin.png"
  alt="Events list"
  style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '100%'}}
/>


#### Each card shows
- Event type (Capstone, Hackathon, Workshop)
- Start and end dates
- GitHub organization if connected
- Details and Finalists buttons

---

## Events List

Coders and Team Leaders see open events.

<img
  src="/img/screenshots/events-list.png"
  alt="Events list"
  style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '100%'}}
/>


#### Each card shows
- Event type (Capstone, Hackathon, Workshop)
- Start and end dates
- GitHub organization if connected
- Team size restriction
- Join/Review this event  buttons

---

## TL Dashboard

Team Leaders see all teams for the selected event. Each card shows project progress and submission status.

<img
  src="/img/screenshots/tl-dashboard.png"
  alt="TL Dashboard"
  style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '100%'}}
/>

#### Card status indicators

| Color | Meaning |
|-------|---------|
| Green dot | All deliverables submitted |
| Light purple | Not submitted |
| Dark purple | Submitted for review |

:::tip
Click **Evaluate Team** on any submitted team to open the evaluation panel with rubrics.
:::

:::tip
Click **View Evaluation** on any team to review the already submitted evaluation.
:::

---

## Ranking Page

Shows all teams sorted by their evaluator score for the selected event.

<img
  src="/img/screenshots/ranking.png"
  alt="Ranking page"
  style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '100%'}}
/>


#### Features
- Top performers displayed in a row
- Each card shows the name, score and members of the Team
- Each card shows detailed evaluation information by placing the pointer over it
- Overall ranking section for the rest of the teams

---

## QR Voting Admin Panel

Admins use this page to manage the full voting session lifecycle.

<img
  src="/img/screenshots/qr-voting.png"
  alt="QR Voting admin panel"
  style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '100%'}}
/>

#### The page has four sections

1. **Instructions** — step by step guide for running a voting session
2. **QR Code** — generate, display and download the voting QR
3. **Ranking Panel** — select finalists and approve them
4. **Live Results** — real-time vote counts updated via Socket.IO

:::warning
The Generate QR button is locked until finalists are approved **and** an expiration date is set.
:::

:::danger
Clicking **Submit Votes & Calculate Winners** is irreversible. It calculates the final scores and closes the voting session permanently.
:::

---

## Public Voting Page

Audience members scan the QR code and land on this page to vote for their favorite project.

<div style={{display: 'flex', justifyContent: 'center'}}>
  <img
    src="/img/screenshots/public-voting.png"
    alt="Public voting page"
    style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '380px'}}
  />
</div>

:::tip Mobile First
This page is designed for mobile — audience members scan the QR with their phones.
:::

#### Key behaviors
- No authentication required
- One vote per IP address
- Once voted, all buttons are disabled
- Reference code shown after voting

---

## Finalists Podium

After votes are submitted the finalists page shows the final podium with combined scores.

<img
  src="/img/screenshots/finalists.png"
  alt="Finalists podium"
  style={{borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '100%'}}
/>

The final score formula is:
```
Final Score = (Evaluator Score × 0.8) + (Normalized Votes × 0.2)
```

| Position | Color | Icon |
|----------|-------|------|
| 1st | Gold | Trophy |
| 2nd | Silver/Mint | Medal |
| 3rd | Bronze/Lilac | Premium |

---


