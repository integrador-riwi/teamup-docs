---
sidebar_position: 1
---

# Contributing Guide

## Git Workflow

TeamUp uses a **feature branch workflow**:
```
main          ← production
develop       ← integration branch
feature/xxx   ← your feature
fix/xxx       ← bug fixes
```

### Steps
```bash
# 1. Create a branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. Make your changes
# 3. Commit with a clear message
git commit -m "feat: add vote reset endpoint"

# 4. Push and open a PR to develop
git push origin feature/my-feature
```

## Commit Convention

Follow **Conventional Commits**:

| Prefix | Description |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | CSS/formatting |
| `refactor:` | Code refactor |
| `chore:` | Maintenance |

## Code Style

### Frontend
- No framework — Vanilla JS classes
- One view = one file in `src/views/`
- Use Bootstrap for layout, custom CSS for components
- All icons from `src/utils/icons.js`
- No inline styles — use CSS classes

### Backend
- MVC pattern — routes → controllers → services → models
- All routes must have `authenticate` middleware
- Use `hasRole()` for role checks
- Return consistent JSON: `{ success: true, data: {} }`

## Adding a New View
```
1. Create src/views/MyView.js
2. Import and register in src/index.js
3. Add route permission in ROUTE_PERMISSIONS
4. Add breadcrumb in header-config.js
5. Add nav link in navbar-config.js (if needed)
```

## Adding a New API Endpoint
```
1. Add route in src/routes/my.routes.js
2. Add controller method in src/controllers/my.controller.js
3. Add service method in src/services/my.service.js
4. Register route in src/index.js
5. Document in docs/backend/api-endpoints.md
```