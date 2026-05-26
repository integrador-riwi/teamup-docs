# 03 — Rol Administrador (ADMIN)

El rol de **Administrador (`ADMIN`)** tiene el control total sobre la plataforma TeamUp. Es el encargado de orquestar los eventos, configurar las métricas de calificación y monitorear el progreso general del hackathon o evento de programación.


## 1. Gestión de Eventos

El administrador es el único capaz de crear y gestionar los eventos principales de la plataforma.
- **Creación de eventos**: Define el nombre, la descripción, fecha de inicio y fin, y las reglas generales.
- **Estado del evento**: Puede cambiar el estado del evento (Ej. Activo, Finalizado, En Evaluación).

![Creacion de eventos](./screenshots/admin_create_event.png)

## 2. Configuración de Rúbricas y Evaluaciones

Antes de que los Tech Leads puedan calificar, el Admin debe configurar cómo se evaluará el evento.
- Establece los pesos y criterios para las tres áreas principales: **Desarrollo (DEV)**, **Habilidades Blandas (SOFT SKILLS)** e **Inglés (ENGLISH)**.
- Define qué porcentaje del puntaje total dependerá de los votos del público (QR-Votes).
![Rubrica](./screenshots/admin_create_rubric.png)

Nuestra plataforma cuenta con dos maneras de realizar la creacion de la rubrica. Se puede hacer directamente desde la plataforma con el rubric builder que va mostrando los pesos, descripciones y ejemplos de cada criterio por area(una rubrica puede tener un area o varias, segun la necesidad del evento), o se puede descargar la plantilla que tenemos estandarizada en un archivo excel, donde se modifican los pesos, descripciones y ejemplos de cada criterio por area y se sube el archivo a la plataforma para que se cree la rubrica automaticamente.

![Rubrica Opciones](./screenshots/admin_rubric_options.png)

## 3. Monitoreo de Equipos y Participantes

El administrador tiene acceso a una vista global de todos los `coders` y los equipos formados.
![Team Management](./screenshots/admin_team_management.png)

El admin tambien tiene un dashboard para monitorear el progreso general del evento, incluyendo calificaciones, mejor puntuacion, entregas, etc. Dentro del dashboard tiene la opcion de finalizar el evento y publicar los resultados finales(lo que cerraria la entrega de proyectos y comenzaria a habilitar la votacion publica)
![Admin Dashboard](./screenshots/admin_dashboard.png)

## 4. Live Voting (Votos QR) y Finalistas

Durante la etapa final del evento, el Admin controla la votación del público y la generación del ranking.
- **Generación de QR**: Puede generar o habilitar el código QR para que el público vote por su proyecto favorito.

![Generate QR](./screenshots/admin_generate_qr.png)
- **Cálculo del Ranking**: El sistema suma automáticamente las calificaciones de los Tech Leads, los 5 proyectos con mayor puntuacion pasarian a ser finalistas y son los que estarian disponibles en la votacion publica.
![Finalists](./screenshots/admin_finalists.png)

- **Podio de Finalistas**: El Admin visualiza en tiempo real a los ganadores (Finalistas) y puede dar por concluido el evento.

![Event Podium](./screenshots/event_podium.png)

---
[← Anterior: Registro y Acceso](./access-and-register.md) | [Siguiente: Rol Tech Lead →](./tech-lead.md)
