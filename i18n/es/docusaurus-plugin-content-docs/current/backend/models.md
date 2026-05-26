---
sidebar_position: 3
---

# Modelos de datos

TeamUp usa **PostgreSQL** como base de datos principal, con más de 20 tablas.

## Resumen del modelo relacional

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

## Tablas principales

### `users`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_user` | integer | Clave primaria |
| `name` | varchar | Nombre completo |
| `email` | varchar | Correo único |
| `role` | enum | ADMIN, STAFF, TL_DEVELOPMENT, TL_SOFT_SKILLS, TL_ENGLISH, CODER |
| `clan` | varchar | Clan asignado |
| `is_active` | boolean | Estado de la cuenta |
| `encrypted_password` | text | Contraseña hasheada |
| `github_id` | varchar | ID de GitHub OAuth |
| `github_username` | varchar | Usuario de GitHub |
| `github_avatar_url` | text | Avatar de GitHub |
| `document_number` | varchar | Documento de identidad |
| `document_type` | varchar | Tipo de documento |

### `events`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_event` | integer | Clave primaria |
| `title` | varchar | Título del evento |
| `description` | text | Descripción |
| `event_type` | varchar | CAPSTONE, HACKATHON, WORKSHOP |
| `event_status` | varchar | Estado actual |
| `cohort` | varchar | Cohorte objetivo |
| `event_start_date` | timestamp | Fecha de inicio |
| `final_delivery_date` | timestamp | Fecha límite de entrega |
| `max_team_size` | integer | Máximo de miembros por equipo |
| `github_org` | varchar | Organización de GitHub |
| `target_clans` | array | Clanes permitidos |
| `created_by` | integer | FK → users.id_user |

### `teams`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_team` | integer | Clave primaria |
| `name` | varchar | Nombre del equipo |
| `id_event` | integer | FK → events.id_event |
| `created_at` | timestamp | Fecha de creación |

### `team_coders`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_team` | integer | FK → teams.id_team |
| `id_user` | integer | FK → users.id_user |
| `team_role` | enum | Rol dentro del equipo |

### `projects`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_project` | integer | Clave primaria |
| `name` | varchar | Nombre del proyecto |
| `description` | text | Descripción |
| `team_id` | integer | FK → teams.id_team |
| `id_event` | integer | FK → events.id_event |
| `repo_url` | varchar | URL del repositorio |
| `video_url` | varchar | URL del video |
| `preview_photo_url` | varchar | URL de la imagen previa |
| `deploy_url` | varchar | URL de despliegue |
| `submitted_at` | timestamp | Fecha de entrega |
| `project_final_grade` | double | Calificación final |

## Tablas de evaluación

### `rubrics`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_rubric` | integer | Clave primaria |
| `id_event` | integer | FK → events.id_event |
| `area` | enum | TL_DEVELOPMENT, TL_SOFT_SKILLS, TL_ENGLISH |
| `name` | varchar | Nombre del criterio |
| `weight` | double | Peso en la nota (0-1) |
| `active` | boolean | Si la rúbrica está activa |

### `grades`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_grade` | integer | Clave primaria |
| `id_rubric` | integer | FK → rubrics.id_rubric |
| `score` | double | Puntaje numérico |
| `name` | varchar | Etiqueta de la calificación |
| `description` | text | Descripción |

### `evaluations`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_evaluation` | integer | Clave primaria |
| `project_id` | integer | FK → projects.id_project |
| `event_id` | integer | FK → events.id_event |
| `evaluator_user_id` | integer | FK → users.id_user |
| `evaluated_user_id` | integer | FK → users.id_user |
| `area` | enum | Área de evaluación |
| `id_grade` | integer | FK → grades.id_grade |
| `feedback` | text | Comentario opcional |

### `individual_area_results`
Guarda puntuaciones calculadas por usuario y área.

### `individual_project_results`
Guarda las puntuaciones finales por proyecto y usuario.

## Tablas de votación

### `qr_votes`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id` | integer | Clave primaria |
| `id_event` | integer | FK → events.id_event |
| `qr_code_url` | varchar | URL del QR |
| `expires_at` | timestamp | Cierre de la votación |
| `active` | boolean | Si la votación está activa |
| `top_n` | integer | Número de finalistas |
| `created_by` | integer | FK → users.id_user |

### `public_votes`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_vote` | integer | Clave primaria |
| `qr_vote_id` | integer | FK → qr_votes.id |
| `project_id` | integer | FK → projects.id_project |
| `voter_ip` | varchar | IP del votante |
| `voted_at` | timestamp | Fecha del voto |

### `finalists`

| Columna | Tipo | Descripción |
|--------|------|-------------|
| `id_finalist` | integer | Clave primaria |
| `id_project` | integer | FK → projects.id_project |
| `event_id` | integer | FK → events.id_event |
| `second_grade` | double | Puntaje del evaluador |
| `votes_result` | double | Puntaje de votos normalizado |
| `final_grade` | double | Puntaje final |
| `votes_count` | integer | Votos recibidos |

## Tablas de gestión de equipos

### `team_invitations`
Registra invitaciones enviadas a coders para unirse a un equipo. Estados: `PENDING`, `ACCEPTED`, `REJECTED`.

### `team_join_requests`
Registra solicitudes de ingreso a un equipo. Estados: `PENDING`, `ACCEPTED`, `REJECTED`.

### `deliverables`
Guarda URLs de entregables del proyecto.

## Tablas de autenticación

### `profiles`
Perfil extendido del usuario con URL de GitHub, descripción y clan.

### `refresh_tokens`
Almacena refresh tokens con expiración, revocación e información de IP/user-agent.

### `notifications`
Notificaciones internas con payload JSON y estado leído.
