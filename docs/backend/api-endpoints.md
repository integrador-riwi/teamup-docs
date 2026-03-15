---
sidebar_position: 1
---

# API Endpoints

Base URL: `https://back-end-production-7f2c.up.railway.app/api`

All protected routes require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Auth `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login, returns JWT |
| POST | `/logout` | ❌ | Logout |
| POST | `/refresh` | ❌ | Refresh JWT token |
| GET | `/me` | ✅ | Get current user |
| PUT | `/password` | ✅ | Change password |
| PUT | `/profile` | ✅ | Update profile |
| GET | `/github` | ✅ | GitHub OAuth redirect |
| GET | `/github/url` | ✅ | Get GitHub OAuth URL |
| GET | `/github/callback` | ❌ | GitHub OAuth callback |
| GET | `/github/status` | ✅ | Check GitHub connection |
| GET | `/github/orgs` | ✅ | List GitHub organizations |
| DELETE | `/github` | ✅ | Disconnect GitHub |

---

## Events `/api/events`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/` | ✅ | ALL | List all events |
| GET | `/upcoming` | ✅ | ALL | Upcoming events |
| GET | `/active` | ✅ | ALL | Active events |
| GET | `/past` | ✅ | ALL | Past events |
| GET | `/stats` | ✅ | ADMIN | Event statistics |
| GET | `/:id` | ✅ | ALL | Get event by ID |
| GET | `/:id/metrics` | ✅ | ADMIN | Event metrics |
| GET | `/:id/rubrics` | ✅ | ALL | Event rubrics |
| POST | `/` | ✅ | ADMIN, STAFF | Create event |
| PUT | `/:id` | ✅ | ADMIN, STAFF | Update event |
| DELETE | `/:id` | ✅ | ADMIN | Delete event |

---

## Teams `/api/teams`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/` | ✅ | ALL | List all teams |
| GET | `/my-teams` | ✅ | ALL | Get my teams |
| GET | `/invitations` | ✅ | ALL | Get my invitations |
| GET | `/search` | ✅ | ALL | Semantic search projects |
| GET | `/:id` | ✅ | ALL | Get team by ID |
| GET | `/:id/members` | ✅ | ALL | Get team members |
| POST | `/` | ✅ | ALL | Create team |
| PUT | `/:id` | ✅ | ALL | Update team |
| DELETE | `/:id` | ✅ | ADMIN | Delete team |
| POST | `/:id/members` | ✅ | ALL | Add member to team |
| DELETE | `/:id/leave` | ✅ | ALL | Leave team |
| POST | `/:id/request-join` | ✅ | ALL | Request to join team |

---

## Projects `/api/projects`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/team/:id` | ✅ | Get project by team |
| GET | `/:id` | ✅ | Get project by ID |
| POST | `/` | ✅ | Create project |
| POST | `/team/:id/confirm` | ✅ | Confirm team project |
| PUT | `/:id` | ✅ | Update project |
| POST | `/:id/submit` | ✅ | Submit project for review |

---

## Users `/api/users`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/me` | ✅ | ALL | Get current user profile |
| GET | `/available` | ✅ | CODER, TL_*, ADMIN | Available users list |
| GET | `/stats` | ✅ | ADMIN | User statistics |
| GET | `/` | ✅ | ADMIN | List all users |
| GET | `/:id` | ✅ | ADMIN | Get user by ID |
| POST | `/` | ✅ | ADMIN | Create user |
| PUT | `/:id` | ✅ | ADMIN | Update user |
| PUT | `/:id/password` | ✅ | ADMIN | Update user password |
| PUT | `/:id/status` | ✅ | ADMIN | Toggle user active status |

---

## Rankings `/api/ranking`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ✅ | Get event ranking sorted by score |

---

## Finalists `/api/finalists`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/events/:eventId` | ✅ | ALL | Get finalists for event |
| POST | `/events/:eventId/calculate` | ✅ | ADMIN | Calculate winners (80% score + 20% votes) |
| POST | `/events/:eventId/auto-select` | ✅ | ADMIN | Auto-select finalists by score |
| POST | `/events/:eventId` | ✅ | ADMIN | Manually set finalists |

:::info Score Formula
The finalist calculation uses:
**Final Score = (Evaluator Score × 0.8) + (Normalized Votes × 0.2)**
:::

---

## QR Votes `/api/qr-votes`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | ✅ | Create QR voting session |
| GET | `/event/:id` | ✅ | Get QR sessions for event |
| GET | `/event/:eventId/results` | ✅ | Get vote results per project |
| PATCH | `/:id/toggle` | ✅ | Activate or deactivate QR |
| GET | `/vote/:eventId/projects` | ❌ | Get projects for public voting page |
| POST | `/vote` | ❌ | Register a public vote (anonymous) |

:::warning Public Endpoints
`/vote/:eventId/projects` and `/vote` do not require authentication — they are accessed from the public QR voting page by anonymous audience members.
:::

---

## Evaluations `/api/evaluations`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/rubrics/:eventId` | ✅ | Get rubrics for event |
| GET | `/project/:projectId/my` | ✅ | Get my evaluations for a project |
| POST | `/project/:projectId` | ✅ | Submit evaluations |
| POST | `/project/:projectId/calculate` | ✅ | Calculate project grades |

---

## Comments `/api/comments`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | ✅ | Create comment on a project |
| DELETE | `/:id` | ✅ | Delete comment |

---

## Uploads `/api/uploads`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signature` | ✅ | Get Cloudinary upload signature |
| POST | `/confirm` | ✅ | Confirm upload after Cloudinary |

---

## Emails `/api/emails`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/send` | ✅ | Send email to a specific user |
| POST | `/broadcast` | ✅ | Send email to multiple users |