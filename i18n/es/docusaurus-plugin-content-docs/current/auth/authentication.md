---
sidebar_position: 1
---

# Authentication & Authorization

## JWT Authentication

TeamUp uses **JWT (JSON Web Tokens)** for session management.

### Login Flow
```
1. POST /api/auth/login  { email, password }
2. Server returns { token, user }
3. Frontend stores token in localStorage
4. All subsequent requests include: Authorization: Bearer <token>
```

### Token Storage
```javascript
// Store
localStorage.setItem("token", data.token);

// Read
const token = localStorage.getItem("token");

// Clear
localStorage.removeItem("token");
```

### Protected Routes

Every protected endpoint uses the `authenticate` middleware:
```javascript
// middleware/auth.js
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
```

---

## GitHub OAuth

TeamUp supports GitHub OAuth for connecting a GitHub account to a user profile.

### Flow
```
1. GET /api/auth/github/url       → returns GitHub OAuth URL
2. User redirected to GitHub
3. GitHub redirects to /api/auth/github/callback
4. Backend exchanges code for token
5. GitHub profile linked to TeamUp user
6. Frontend redirected with ?github=success&username=...
```

### Frontend handling
```javascript
// Get OAuth URL and redirect
const url = await getGithubAuthUrl();
window.location.href = url;

// After redirect back — check params
const params = new URLSearchParams(window.location.search);
if (params.get("github") === "success") {
  // show success message
}
```

---

## Role-Based Access Control (RBAC)

### Roles

| Role | Level | Description |
|------|-------|-------------|
| `ADMIN` | Highest | Full access |
| `STAFF` | High | Event management |
| `TL_DEVELOPMENT` | Medium | Evaluate dev projects |
| `TL_SOFT_SKILLS` | Medium | Evaluate soft skills |
| `TL_ENGLISH` | Medium | Evaluate English |
| `CODER` | Basic | Join teams, submit projects |

### RBAC Middleware
```javascript
// middleware/rbac.js
export const hasRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

export const isAdmin = hasRole("ADMIN");
export const canManage = hasRole("ADMIN", "STAFF");
```