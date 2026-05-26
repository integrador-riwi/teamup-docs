---
sidebar_position: 1
---

# Autenticación y autorización

## JWT

TeamUp usa **JWT (JSON Web Tokens)** para la gestión de sesiones.

### Flujo de login

```
1. POST /api/auth/login  { email, password }
2. El servidor devuelve { token, user }
3. El frontend guarda el token en localStorage
4. Todas las peticiones incluyen: Authorization: Bearer <token>
```

### Almacenamiento del token

```javascript
// Guardar
localStorage.setItem("token", data.token);

// Leer
const token = localStorage.getItem("token");

// Borrar
localStorage.removeItem("token");
```

### Rutas protegidas

Cada endpoint protegido usa el middleware `authenticate`:

```javascript
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

## OAuth de GitHub

TeamUp soporta OAuth de GitHub para conectar una cuenta con el perfil del usuario.

### Flujo

```
1. GET /api/auth/github/url       → devuelve la URL de OAuth
2. El usuario es redirigido a GitHub
3. GitHub redirige a /api/auth/github/callback
4. El backend intercambia el code por token
5. El perfil de GitHub se vincula al usuario de TeamUp
6. El frontend redirige con ?github=success&username=...
```

### Manejo en el frontend

```javascript
const url = await getGithubAuthUrl();
window.location.href = url;

const params = new URLSearchParams(window.location.search);
if (params.get("github") === "success") {
  // mostrar mensaje de éxito
}
```

## RBAC

### Roles

| Rol | Nivel | Descripción |
|------|-------|-------------|
| `ADMIN` | Máximo | Acceso completo |
| `STAFF` | Alto | Gestión de eventos |
| `TL_DEVELOPMENT` | Medio | Evalúa proyectos de desarrollo |
| `TL_SOFT_SKILLS` | Medio | Evalúa habilidades blandas |
| `TL_ENGLISH` | Medio | Evalúa inglés |
| `CODER` | Básico | Se une a equipos y envía proyectos |

### Middleware RBAC

```javascript
export const hasRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

export const isAdmin = hasRole("ADMIN");
export const canManage = hasRole("ADMIN", "STAFF");
```
