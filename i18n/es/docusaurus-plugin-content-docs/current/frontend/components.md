---
sidebar_position: 3
---

# Componentes

## Navbar

El componente `Navbar` renderiza tanto la **barra lateral desktop** como la **barra superior mobile**.

```javascript
import Navbar from "../components/navbar/navbar.js";

const navbar = new Navbar(router);
app.innerHTML = `${navbar.render()} ...`;
navbar.attachEventHandlers();
```

### Métodos

| Método | Descripción |
|--------|-------------|
| `render()` | Devuelve el HTML de la barra |
| `attachEventHandlers()` | Conecta hamburguesa, links, logout y perfil |
| `setActiveRoute(route)` | Resalta la ruta activa |
| `closeSidebarMobile()` | Cierra la sidebar en mobile |

## Header / Breadcrumb

```javascript
import Header from "../components/header/header-config.js";

const header = new Header(router);
app.innerHTML = `${header.render()} ...`;
header.mountBreadcrumb();
```

Los links de breadcrumb se configuran en `header-config.js` por ruta.

## Toast

```javascript
import { toast } from "../components/Toast/index.js";

toast.success("Título", "Mensaje");
toast.error("Título", "Mensaje");
toast.info("Título", "Mensaje", { duration: 0, dropdown: { ... } });
toast.remove(toastId);
```

## Iconos

Todos los SVG están exportados desde `src/utils/icons.js`:

```javascript
import { icons } from "../utils/icons.js";

`<span class="icon-md">${icons.trophy()}</span>`
`<span class="icon-lg">${icons.calendar()}</span>`
```

### Iconos disponibles
`calendar`, `plus`, `globe`, `bulb`, `settings`, `trophy`, `edit`, `check`,
`upload`, `chat`, `qr`, `logout`, `save`, `ranking`, `add`, `users`,
`folder`, `code`, `vote`, `checked`, `danger`, `metrics`, `burger`

### Tamaños

```css
.icon-sm  /* 16px */
.icon-md  /* 20px */
.icon-lg  /* 24px */
.icon-xl  /* 32px */
```
