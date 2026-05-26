---
sidebar_position: 2
---

# IA y automatización

TeamUp integra dos sistemas con inteligencia artificial para mejorar la experiencia del desarrollador.

---

## Automatización del repositorio de GitHub — n8n

Cuando se crea o confirma un equipo, TeamUp crea automáticamente un repositorio de GitHub para ellos mediante un **workflow de n8n**.

### Cómo funciona

```
Equipo confirmado en TeamUp
        ↓
El backend dispara un webhook de n8n
        ↓
Se ejecuta el workflow de n8n:
  1. Crea el repositorio de GitHub bajo la organización del evento
  2. Invita a los miembros del equipo como colaboradores
  3. Actualiza la base de datos con la URL del repositorio
        ↓
El equipo ve la URL de su repositorio en la configuración del proyecto
```

### Qué se automatiza

- Creación del repositorio bajo la organización de GitHub del evento (`github_org`)
- Invitación de los miembros del equipo como colaboradores
- Guardado de la URL del repo en `team_projects.repo_url`
- Almacenamiento del token de invitación de GitHub para seguimiento

### Integración con n8n

n8n es una herramienta de automatización de workflows (similar a Zapier, pero autoalojada). El backend de TeamUp envía un webhook a n8n, que maneja todas las llamadas a la API de GitHub.

:::tip
Esto significa que los miembros del equipo nunca necesitan crear o configurar repositorios de GitHub manualmente: todo se procesa automáticamente cuando su equipo es confirmado.
:::

---

## Búsqueda semántica de proyectos — OpenAI

TeamUp usa **embeddings de OpenAI** para habilitar una búsqueda semántica de proyectos. En lugar de coincidencias por palabras clave, los usuarios pueden buscar por significado.

### Cómo funciona

```
Proyecto creado/actualizado
        ↓
El backend genera un embedding vía API de OpenAI
(convierte la descripción del proyecto en un vector)
        ↓
El vector se guarda en la columna `projects.embedding` (pgvector)
        ↓
El usuario busca "proyecto de machine learning"
        ↓
La consulta se convierte en embedding
        ↓
pgvector encuentra los embeddings más similares
        ↓
Se devuelven los resultados ordenados por similitud semántica
```

### Endpoint

```
GET /api/teams/search?q=your+search+query&limit=3&min_similarity=0.7
```

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `q` | string | requerido | Consulta de búsqueda |
| `limit` | integer | 3 | Máximo de resultados |
| `min_similarity` | float | 0.7 | Umbral mínimo de similitud (0-1) |
| `exclude_project` | integer | null | ID del proyecto a excluir |

### Ejemplo

```javascript
// Buscar proyectos similares
const results = await searchSimilarProjects(
  "web app para gestión de tareas",
  3,    // top 3 resultados
  0.7   // al menos 70% similar
);
```

### Casos de uso

- Evitar duplicación de proyectos
- Descubrir trabajos relacionados de otros equipos
- Análisis de similitud de proyectos para evaluadores

:::info Base de datos
La columna `projects.embedding` usa **pgvector**, una extensión de PostgreSQL para búsquedas de similitud vectorial. Esto permite búsquedas de vecinos más cercanos rápidas incluso con miles de embeddings.
:::
