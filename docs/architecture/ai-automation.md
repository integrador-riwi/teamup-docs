---
sidebar_position: 2
---

# AI & Automation

TeamUp integrates two AI-powered systems to enhance the developer experience.

---

## GitHub Repository Automation — n8n

When a team is created or confirmed, TeamUp automatically creates a GitHub repository for them using an **n8n workflow**.

### How it works
```
Team confirmed in TeamUp
        ↓
Backend triggers n8n webhook
        ↓
n8n workflow runs:
  1. Creates GitHub repo under the event's organization
  2. Invites team members as collaborators
  3. Updates the database with the repo URL
        ↓
Team sees their repo URL in the project settings
```

### What gets automated

- Repository created under the event's GitHub organization (`github_org`)
- Team members invited as collaborators
- Repo URL saved to `team_projects.repo_url` in the database
- GitHub invite token stored for tracking

### n8n Integration

n8n is a workflow automation tool (similar to Zapier but self-hosted). The TeamUp backend sends a webhook to n8n which handles all GitHub API calls.

:::tip
This means team members never need to manually create or configure GitHub repos — it's all handled automatically when their team is confirmed.
:::

---

## Semantic Project Search — OpenAI

TeamUp uses **OpenAI embeddings** to power semantic project search. Instead of simple keyword matching, users can search by meaning.

### How it works
```
Project created/updated
        ↓
Backend generates embedding via OpenAI API
(converts project description to a vector)
        ↓
Vector stored in projects.embedding column (pgvector)
        ↓
User searches "machine learning project"
        ↓
Search query converted to embedding
        ↓
pgvector finds most similar project embeddings
        ↓
Results returned sorted by semantic similarity
```

### Endpoint
```
GET /api/teams/search?q=your+search+query&limit=3&min_similarity=0.7
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | required | Search query |
| `limit` | integer | 3 | Max results to return |
| `min_similarity` | float | 0.7 | Minimum similarity threshold (0-1) |
| `exclude_project` | integer | null | Project ID to exclude from results |

### Example
```javascript
// Search for similar projects
const results = await searchSimilarProjects(
  "web app for task management",
  3,    // top 3 results
  0.7   // at least 70% similar
);
```

### Use cases

- Finding similar projects to avoid duplication
- Discovering related work from other teams
- Project similarity analysis for evaluators

:::info Database
The `projects.embedding` column uses **pgvector** — a PostgreSQL extension for vector similarity search. This enables fast nearest-neighbor searches across thousands of project embeddings.
:::