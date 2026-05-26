# 01 — Introducción y Conceptos Clave

## 1. ¿Qué es TeamUp?

**TeamUp** es una plataforma web diseñada para RIWI que centraliza la gestión de eventos de programación competitivos y colaborativos. Permite a los administradores crear eventos con reglas específicas, a los coders conformar equipos y entregar proyectos, y a los Tech Leads evaluar el trabajo desde distintas dimensiones (técnica, habilidades blandas e inglés).

La plataforma está integrada directamente con **GitHub Organizations**, lo que automatiza la creación de repositorios y la gestión de colaboradores en el momento en que se forma un equipo.

---

## 2. Arquitectura General del Sistema

```
┌─────────────────────────────────────────────────────┐
│                      TeamUp                         │
│                                                     │
│   ┌──────────┐   ┌──────────┐   ┌──────────────┐   │
│   │  ADMIN   │   │  CODER   │   │  TECH LEADS  │   │
│   │          │   │          │   │  (TL_DEV /   │   │
│   │ Eventos  │   │ Equipos  │   │  TL_SOFT /   │   │
│   │ Rúbricas │   │ Entrega- │   │  TL_ENG)     │   │
│   │ Config.  │   │  bles    │   │  Evaluación  │   │
│   └────┬─────┘   └────┬─────┘   └──────┬───────┘   │
│        │              │                │            │
│        └──────────────┴────────────────┘            │
│                       │                             │
│              ┌─────────────────┐                    │
│              │  GitHub API     │                    │
│              │  Organizations  │                    │
│              └─────────────────┘                    │
└─────────────────────────────────────────────────────┘
```

---

## 3. Glosario de Roles

| Rol | Nombre Completo | Responsabilidades |
|-----|-----------------|-------------------|
| `ADMIN` | Administrador | Crea y gestiona eventos, configura rúbricas, administra la plataforma |
| `CODER` | Participante | Se inscribe en eventos, forma equipos, sube entregables |
| `TL_DEVELOPMENT` | Tech Lead de Desarrollo | Evalúa la calidad técnica y el código del proyecto |
| `TL_SOFT_SKILLS` | Tech Lead de Habilidades Blandas | Evalúa trabajo en equipo, comunicación y presentación |
| `TL_ENGLISH` | Tech Lead de Inglés | Evalúa el uso y calidad del inglés en documentación y presentaciones |

> **Nota:** Un mismo usuario solo puede tener un rol dentro de la plataforma. El rol asignado desde la pagina de registro es `CODER`.

---

## 4. Conceptos Clave

### Evento
Un evento es la unidad principal de la plataforma. Representa una competencia o hackathon con fechas definidas, reglas de equipo, una organización de GitHub asociada y, opcionalmente, una rúbrica de evaluación.

### Equipo
Grupo de coders que participan juntos en un evento. Cada equipo tiene:
- Un **Líder** (el coder que lo creó), responsable de aceptar o rechazar solicitudes de ingreso.
- Uno o más **Developers** (miembros del equipo).
- Un **repositorio de GitHub** creado automáticamente al momento de la creación del equipo en la plataforma.

### Rúbrica
Criterios de evaluación configurados por el admin para un evento específico. Puede crearse durante la configuración inicial del evento o editarse posteriormente.

### Entregables
Archivos o recursos que el equipo sube como parte de su avance o entrega final dentro de un evento (video comercial, link de la solución desplegada, imagen de vista previa y link del repositorio en github).

### Organización de GitHub
Cuenta organizacional de GitHub a la que se vinculan los repositorios de los equipos. El admin selecciona la organización al crear el evento, y esta debe estar previamente vinculada a su cuenta de GitHub en la plataforma.

---

## 5. Flujo de Acceso Compartido (Todos los Roles)

El punto de entrada a la plataforma es idéntico para todos los roles:

```
┌─────────────────────────────────────────────────┐
│              Pantalla de Login                  │
│                                                 │
│   📧 Correo electrónico: [________________]    │
│   🔒 Contraseña:         [________________]    │
│                                                 │
│              [ Iniciar Sesión ]                 │
└─────────────────────────────────────────────────┘
                      │
                      ▼
         ¿Credenciales válidas?
          /                \
        SÍ                  NO
         │                   │
         ▼                   ▼
  Redirige según       Mensaje de error
  rol del usuario      en pantalla
         │
         ├──→ ADMIN        → Panel de Eventos
         ├──→ CODER        → Página Principal de Eventos
         ├──→ TL_DEVELOPMENT → Panel de Evaluación
         ├──→ TL_SOFT_SKILLS → Panel de Evaluación
         └──→ TL_ENGLISH   → Panel de Evaluación
```

> **Ver también:** [Registro y Acceso](./access\ and\ register) para el proceso de creación de cuenta.

---

## 6. Integración con GitHub

TeamUp se integra con GitHub a nivel de dos capas:

| Capa | Quién la configura | Qué hace |
|------|-------------------|----------|
| **Organización** | Admin | Asocia una org. de GitHub al evento para alojar los repositorios |
| **Colaborador** | Sistema automático | Añade al coder como colaborador del repo cuando se une a un equipo |

Para que esta integración funcione correctamente:
1. El **admin** debe haber vinculado su cuenta de GitHub en su perfil antes de crear un evento.
2. El **coder** debe haber vinculado su cuenta de GitHub en su perfil antes de unirse a un equipo.

>Si un coder no ha vinculado su GitHub al momento de unirse a un equipo, no podrá ser agregado como colaborador al repositorio hasta que complete ese paso.

---

[← Volver al índice](./contents.md) | [Siguiente: Registro y Acceso →](./access\ and\ register)
