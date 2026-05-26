---
sidebar_position: 3
---

# Components

## Navbar

The `Navbar` component renders both the **desktop sidebar** and **mobile top bar**.
```javascript
import Navbar from "../components/navbar/navbar.js";

const navbar = new Navbar(router);
app.innerHTML = `${navbar.render()} ...`;
navbar.attachEventHandlers();
```

### Methods
| Method | Description |
|--------|-------------|
| `render()` | Returns HTML string |
| `attachEventHandlers()` | Wires up hamburger, nav links, logout, profile |
| `setActiveRoute(route)` | Highlights the active nav link |
| `closeSidebarMobile()` | Closes the mobile sidebar |

## Header / Breadcrumb
```javascript
import Header from "../components/header/header-config.js";

const header = new Header(router);
app.innerHTML = `${header.render()} ...`;
header.mountBreadcrumb();
```

Breadcrumb links are configured in `header-config.js` per route.

## Toast
```javascript
import { toast } from "../components/Toast/index.js";

toast.success("Title", "Message");
toast.error("Title", "Message");
toast.info("Title", "Message", { duration: 0, dropdown: { ... } });
toast.remove(toastId);
```

## Icons

All SVG icons are exported from `src/utils/icons.js`:
```javascript
import { icons } from "../utils/icons.js";

// Usage in template strings
`<span class="icon-md">${icons.trophy()}</span>`
`<span class="icon-lg">${icons.calendar()}</span>`
```

### Available icons
`calendar`, `plus`, `globe`, `bulb`, `settings`, `trophy`, `edit`, `check`,
`upload`, `chat`, `qr`, `logout`, `save`, `ranking`, `add`, `users`,
`folder`, `code`, `vote`, `checked`, `danger`, `metrics`, `burger`

### Icon sizes
```css
.icon-sm  /* 16px */
.icon-md  /* 20px */
.icon-lg  /* 24px */
.icon-xl  /* 32px */
```