---
sidebar_position: 3
---

# Data Models

TeamUp uses **PostgreSQL** as its primary database with 20+ tables.

## Entity Relationship Overview
```
users ──< team_coders >── teams ──< projects
  │                          │
  │                       events
  │                          │
  └── evaluations            └── rubrics ──< grades
  └── profiles               └── qr_votes ──< public_votes
  └── notifications          └── finalists
  └── refresh_tokens
```

---

## Core Tables

### `users`
| Column | Type | Description |
|--------|------|-------------|
| `id_user` | integer | Primary key |
| `name` | varchar | Full name |
| `email` | varchar | Unique email |
| `role` | enum | ADMIN, STAFF, TL_DEVELOPMENT, TL_SOFT_SKILLS, TL_ENGLISH, CODER |
| `clan` | varchar | Cohort clan assignment |
| `is_active` | boolean | Account status |
| `encrypted_password` | text | Hashed password |
| `github_id` | varchar | GitHub OAuth ID |
| `github_username` | varchar | GitHub username |
| `github_avatar_url` | text | GitHub profile picture |
| `document_number` | varchar | National ID (unique) |
| `document_type` | varchar | ID type |

### `events`
| Column | Type | Description |
|--------|------|-------------|
| `id_event` | integer | Primary key |
| `title` | varchar | Event title |
| `description` | text | Event description |
| `event_type` | varchar | CAPSTONE, HACKATHON, WORKSHOP |
| `event_status` | varchar | Current status |
| `cohort` | varchar | Target cohort |
| `event_start_date` | timestamp | Start date |
| `final_delivery_date` | timestamp | Submission deadline |
| `max_team_size` | integer | Max members per team (default 5) |
| `github_org` | varchar | GitHub organization name |
| `target_clans` | array | Clans allowed to participate |
| `created_by` | integer | FK → users.id_user |

### `teams`
| Column | Type | Description |
|--------|------|-------------|
| `id_team` | integer | Primary key |
| `name` | varchar | Team name |
| `id_event` | integer | FK → events.id_event |
| `created_at` | timestamp | Creation date |

### `team_coders`
| Column | Type | Description |
|--------|------|-------------|
| `id_team` | integer | FK → teams.id_team |
| `id_user` | integer | FK → users.id_user |
| `team_role` | enum | Member role within team |

### `projects`
| Column | Type | Description |
|--------|------|-------------|
| `id_project` | integer | Primary key |
| `name` | varchar | Project name |
| `description` | text | Project description |
| `team_id` | integer | FK → teams.id_team |
| `id_event` | integer | FK → events.id_event |
| `repo_url` | varchar | GitHub repo URL |
| `video_url` | varchar | Demo video URL |
| `preview_photo_url` | varchar | Project thumbnail |
| `deploy_url` | varchar | Live deployment URL |
| `submitted_at` | timestamp | Submission timestamp (null = not submitted) |
| `project_final_grade` | double | Calculated final grade |

---

## Evaluation Tables

### `rubrics`
| Column | Type | Description |
|--------|------|-------------|
| `id_rubric` | integer | Primary key |
| `id_event` | integer | FK → events.id_event |
| `area` | enum | TL_DEVELOPMENT, TL_SOFT_SKILLS, TL_ENGLISH |
| `name` | varchar | Rubric criterion name |
| `weight` | double | Weight in final score (0-1) |
| `active` | boolean | Whether rubric is active |

### `grades`
| Column | Type | Description |
|--------|------|-------------|
| `id_grade` | integer | Primary key |
| `id_rubric` | integer | FK → rubrics.id_rubric |
| `score` | double | Numeric score |
| `name` | varchar | Grade label |
| `description` | text | Grade description |

### `evaluations`
| Column | Type | Description |
|--------|------|-------------|
| `id_evaluation` | integer | Primary key |
| `project_id` | integer | FK → projects.id_project |
| `event_id` | integer | FK → events.id_event |
| `evaluator_user_id` | integer | FK → users.id_user (TL) |
| `evaluated_user_id` | integer | FK → users.id_user (Coder) |
| `area` | enum | Evaluation area |
| `id_grade` | integer | FK → grades.id_grade |
| `feedback` | text | Optional feedback text |

### `individual_area_results`
Stores calculated scores per user per evaluation area.

### `individual_project_results`
Stores final calculated project scores per user.

---

## Voting Tables

### `qr_votes`
| Column | Type | Description |
|--------|------|-------------|
| `id` | integer | Primary key |
| `id_event` | integer | FK → events.id_event |
| `qr_code_url` | varchar | QR image URL |
| `expires_at` | timestamp | When voting closes |
| `active` | boolean | Whether voting is open |
| `top_n` | integer | Number of finalists (default 3) |
| `created_by` | integer | FK → users.id_user |

### `public_votes`
| Column | Type | Description |
|--------|------|-------------|
| `id_vote` | integer | Primary key |
| `qr_vote_id` | integer | FK → qr_votes.id |
| `project_id` | integer | FK → projects.id_project |
| `voter_ip` | varchar | Voter IP (prevents duplicate votes) |
| `voted_at` | timestamp | Vote timestamp |

### `finalists`
| Column | Type | Description |
|--------|------|-------------|
| `id_finalist` | integer | Primary key |
| `id_project` | integer | FK → projects.id_project |
| `event_id` | integer | FK → events.id_event |
| `second_grade` | double | Evaluator score (80%) |
| `votes_result` | double | Normalized vote score (20%) |
| `final_grade` | double | Combined final score |
| `votes_count` | integer | Total votes received |

---

## Team Management Tables

### `team_invitations`
Tracks invitations sent to coders to join a team. Status: `PENDING`, `ACCEPTED`, `REJECTED`.

### `team_join_requests`
Tracks requests from coders to join a team. Status: `PENDING`, `ACCEPTED`, `REJECTED`.

### `deliverables`
Stores project deliverable URLs (presentation, repo, video, preview photo).

---

## Auth Tables

### `profiles`
Extended user profile with GitHub URL, description and clan.

### `refresh_tokens`
Stores JWT refresh tokens with expiry, revocation tracking and IP/user-agent logging.

### `notifications`
In-app notifications with JSON data payload and read status.

```