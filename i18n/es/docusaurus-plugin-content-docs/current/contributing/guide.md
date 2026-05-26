---
sidebar_position: 1
---

# Guía de contribución

## Flujo de Git

TeamUp usa un **feature branch workflow**:

```
main          ← producción
develop       ← rama de integración
feature/xxx   ← nueva funcionalidad
fix/xxx       ← correcciones
```

### Pasos

```bash
# 1. Crea una rama desde develop
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. Haz tus cambios
# 3. Haz commit con un mensaje claro
git commit -m "feat: add vote reset endpoint"

# 4. Sube la rama y abre un PR hacia develop
git push origin feature/my-feature
```

## Convención de commits

Sigue **Conventional Commits**:

| Prefijo | Descripción |
|---------|-------------|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección |
| `docs:` | Documentación |
| `style:` | Formato / CSS |
| `refactor:` | Refactorización |
| `chore:` | Mantenimiento |

## Estilo de código

### Frontend
- Sin framework — JavaScript vanilla
- Una vista = un archivo en `src/views/`
- Usa Bootstrap para el layout y CSS propio para componentes
- Todos los iconos vienen de `src/utils/icons.js`
- No uses estilos inline — usa clases CSS

### Backend
- Patrón MVC — rutas → controladores → servicios → modelos
- Todas las rutas deben tener middleware `authenticate`
- Usa `hasRole()` para validaciones de rol
- Devuelve JSON consistente: `{ success: true, data: {} }`

## Agregar una nueva vista

```
1. Crea src/views/MyView.js
2. Importa y registra en src/index.js
3. Agrega permiso de ruta en ROUTE_PERMISSIONS
4. Agrega breadcrumb en header-config.js
5. Agrega link de navegación en navbar-config.js (si aplica)
```

## Agregar un nuevo endpoint

```
1. Agrega la ruta en src/routes/my.routes.js
2. Agrega el método del controlador en src/controllers/my.controller.js
3. Agrega el método del servicio en src/services/my.service.js
4. Registra la ruta en src/index.js
5. Documenta en docs/backend/api-endpoints.md
```
