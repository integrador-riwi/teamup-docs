# Manual de Usuario — TeamUp

> **TeamUp** es una plataforma de gestión de eventos de programación diseñada para RIWI, que permite crear equipos, gestionar repositorios de GitHub automáticamente, evaluar entregables y hacer seguimiento del progreso de los participantes.

---

## Contenido del Manual

| # | Documento | Descripción |
|---|-----------|-------------|
| 1 | [Introducción y Conceptos Clave](./introduction.md) | Visión general del sistema, glosario de roles y flujos compartidos |
| 2 | [Registro y Acceso](./access\ and\ register) | Creación de cuenta, vinculación de GitHub e inicio de sesión |
| 3 | Resumen general | Flujo completo del participante y navegación del manual |
| 4 | Resumen de administración | Gestión de eventos, configuración de rúbricas y administración general |
| 5 | Resumen de Tech Lead | Flujos de TL_DEVELOPMENT, TL_SOFT_SKILLS y TL_ENGLISH |

## Roles del Sistema

```
TeamUp
├── ADMIN              → Gestiona eventos y configuración global
├── CODER              → Participa en eventos, crea/une equipos
├── TL_DEVELOPMENT     → Evalúa aspectos técnicos de los proyectos
├── TL_SOFT_SKILLS     → Evalúa habilidades blandas del equipo
└── TL_ENGLISH         → Evalúa competencias en inglés
```

## Acceso Rápido por Flujo

- **¿Primera vez en la plataforma?** → [Registro y Acceso](./access\ and\ register)
- **¿Quiero unirme a un evento?** → [Leer la introducción](./introduction.md)
- **¿Quiero crear un equipo?** → [Leer la introducción](./introduction.md)
- **¿Quiero crear un evento?** → [Leer la introducción](./introduction.md)
- **¿Soy TL y quiero evaluar?** → [Leer la introducción](./introduction.md)

## Notas de la Versión

| Campo | Detalle |
|-------|---------|
| Versión | 1.0.0 — Draft |
| Estado | En construcción — Flujos TL pendientes de documentar |
| Plataforma | Aplicación Web SPA (Single Page Application) |
| Integración | GitHub Organizations API |
