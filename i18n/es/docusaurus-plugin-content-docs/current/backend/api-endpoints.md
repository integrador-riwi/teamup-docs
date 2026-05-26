---
sidebar_position: 1
---

# Endpoints de la API

Base URL: `https://back-end-production-7f2c.up.railway.app/api`

Todas las rutas protegidas requieren:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Auth `/api/auth`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Registra un nuevo usuario |
| POST | `/login` | ❌ | Inicia sesión y devuelve JWT |
| POST | `/logout` | ❌ | Cierra sesión |
| POST | `/refresh` | ❌ | Refresca el JWT |
| GET | `/me` | ✅ | Obtiene el usuario actual |
| PUT | `/password` | ✅ | Cambia la contraseña |
| PUT | `/profile` | ✅ | Actualiza el perfil |
| GET | `/github` | ✅ | Redirección OAuth de GitHub |
| GET | `/github/url` | ✅ | Obtiene la URL de OAuth |
| GET | `/github/callback` | ❌ | Callback de GitHub |
| GET | `/github/status` | ✅ | Verifica la conexión a GitHub |
| GET | `/github/orgs` | ✅ | Lista organizaciones de GitHub |
| DELETE | `/github` | ✅ | Desvincula GitHub |

## Events `/api/events`

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|------|-------------|
| GET | `/` | ✅ | ALL | Lista todos los eventos |
| GET | `/upcoming` | ✅ | ALL | Eventos próximos |
| GET | `/active` | ✅ | ALL | Eventos activos |
| GET | `/past` | ✅ | ALL | Eventos pasados |
| GET | `/stats` | ✅ | ADMIN | Estadísticas del evento |
| GET | `/:id` | ✅ | ALL | Obtiene un evento por ID |
| GET | `/:id/metrics` | ✅ | ADMIN | Métricas del evento |
| GET | `/:id/rubrics` | ✅ | ALL | Rúbricas del evento |
| POST | `/` | ✅ | ADMIN, STAFF | Crea un evento |
| PUT | `/:id` | ✅ | ADMIN, STAFF | Actualiza un evento |
| DELETE | `/:id` | ✅ | ADMIN | Elimina un evento |

## Teams `/api/teams`

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|------|-------------|
| GET | `/` | ✅ | ALL | Lista equipos |
| GET | `/my-teams` | ✅ | ALL | Obtiene mis equipos |
| GET | `/invitations` | ✅ | ALL | Obtiene mis invitaciones |
| GET | `/search` | ✅ | ALL | Búsqueda semántica de proyectos |
| GET | `/:id` | ✅ | ALL | Obtiene un equipo por ID |
| GET | `/:id/members` | ✅ | ALL | Lista miembros del equipo |
| POST | `/` | ✅ | ALL | Crea un equipo |
| PUT | `/:id` | ✅ | ALL | Actualiza un equipo |
| DELETE | `/:id` | ✅ | ADMIN | Elimina un equipo |
| POST | `/:id/members` | ✅ | ALL | Agrega miembro al equipo |
| DELETE | `/:id/leave` | ✅ | ALL | Abandona el equipo |
| POST | `/:id/request-join` | ✅ | ALL | Solicita unirte al equipo |

## Projects `/api/projects`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/team/:id` | ✅ | Obtiene el proyecto del equipo |
| GET | `/:id` | ✅ | Obtiene un proyecto por ID |
| POST | `/` | ✅ | Crea un proyecto |
| POST | `/team/:id/confirm` | ✅ | Confirma el proyecto del equipo |
| PUT | `/:id` | ✅ | Actualiza el proyecto |
| POST | `/:id/submit` | ✅ | Envía el proyecto para revisión |

## Users `/api/users`

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|------|-------------|
| GET | `/me` | ✅ | ALL | Obtiene el perfil actual |
| GET | `/available` | ✅ | CODER, TL_*, ADMIN | Lista usuarios disponibles |
| GET | `/stats` | ✅ | ADMIN | Estadísticas de usuarios |
| GET | `/` | ✅ | ADMIN | Lista todos los usuarios |
| GET | `/:id` | ✅ | ADMIN | Obtiene usuario por ID |
| POST | `/` | ✅ | ADMIN | Crea usuario |
| PUT | `/:id` | ✅ | ADMIN | Actualiza usuario |
| PUT | `/:id/password` | ✅ | ADMIN | Cambia contraseña de usuario |
| PUT | `/:id/status` | ✅ | ADMIN | Activa o desactiva usuario |

## Rankings `/api/ranking`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/` | ✅ | Obtiene el ranking del evento ordenado por puntaje |

## Finalists `/api/finalists`

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|------|-------------|
| GET | `/events/:eventId` | ✅ | ALL | Obtiene los finalistas del evento |
| POST | `/events/:eventId/calculate` | ✅ | ADMIN | Calcula ganadores |
| POST | `/events/:eventId/auto-select` | ✅ | ADMIN | Selección automática de finalistas |
| POST | `/events/:eventId` | ✅ | ADMIN | Define finalistas manualmente |

:::info Fórmula de puntaje
El cálculo final usa:
**Puntaje final = (Puntaje del evaluador × 0.8) + (Votos normalizados × 0.2)**
:::

## QR Votes `/api/qr-votes`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/` | ✅ | Crea una sesión de votación QR |
| GET | `/event/:id` | ✅ | Obtiene sesiones QR del evento |
| GET | `/event/:eventId/results` | ✅ | Obtiene resultados por proyecto |
| PATCH | `/:id/toggle` | ✅ | Activa o desactiva QR |
| GET | `/vote/:eventId/projects` | ❌ | Obtiene proyectos para votación pública |
| POST | `/vote` | ❌ | Registra un voto público anónimo |

:::warning Endpoints públicos
`/vote/:eventId/projects` y `/vote` no requieren autenticación y son usados por la página pública de votación.
:::

## Evaluations `/api/evaluations`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/rubrics/:eventId` | ✅ | Obtiene rúbricas del evento |
| GET | `/project/:projectId/my` | ✅ | Obtiene mis evaluaciones |
| POST | `/project/:projectId` | ✅ | Envía evaluaciones |
| POST | `/project/:projectId/calculate` | ✅ | Calcula grados del proyecto |

## Comments `/api/comments`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/` | ✅ | Crea un comentario en un proyecto |
| DELETE | `/:id` | ✅ | Elimina un comentario |

## Uploads `/api/uploads`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/signature` | ✅ | Obtiene la firma de Cloudinary |
| POST | `/confirm` | ✅ | Confirma la subida tras Cloudinary |

## Emails `/api/emails`

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/send` | ✅ | Envía un correo a un usuario |
| POST | `/broadcast` | ✅ | Envía un correo a varios usuarios |
