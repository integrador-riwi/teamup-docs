# 04 — Rol Tech Lead (TL)

En TeamUp, los **Tech Leads (TL)** son los jurados o evaluadores de los proyectos entregados por los Coders. Existen tres sub-roles de TL, pero todos comparten el mismo flujo funcional en la plataforma, enfocándose en diferentes criterios según su especialidad:

1. **`TL_DEVELOPMENT`**: Evalúa la arquitectura, el código y la funcionalidad técnica.
2. **`TL_SOFT_SKILLS`**: Evalúa la presentación, el trabajo en equipo y la comunicación.
3. **`TL_ENGLISH`**: Evalúa el dominio del idioma inglés durante las sustentaciones.

## 1. Panel de Evaluación (TL Dashboard)

Al iniciar sesión, el Tech Lead es redirigido a su panel de evaluación, donde verá una lista de todos los equipos y proyectos asociados al evento activo.

- **Proyectos Entregados**: Solo pueden evaluar proyectos que ya han sido enviados por los equipos.
- **Estado de Calificación**: Pueden ver qué equipos ya han calificado y cuáles faltan por evaluar.

![TL Dashboard](./screenshots/tl_dashboard.png)

## 2. Proceso de Calificación por Rúbricas

La función principal del TL es evaluar el proyecto usando las rúbricas preconfiguradas por el Administrador.

- **Selección de Criterios**: Se despliega un formulario con los ítems de calificación específicos de su área (Desarrollo, Soft Skills o Inglés).
- **Asignación de Puntaje**: El TL asigna una nota o selecciona el nivel de cumplimiento del equipo en cada criterio.
- **Cálculo Automático**: El puntaje otorgado se envía al sistema central (Backend) para actualizar el `Ranking` en tiempo real.

![Evaluation](./screenshots/tl_evaluation.png)

## 3. Comentarios y Feedback

Junto con la calificación numérica, los Tech Leads pueden dejar **comentarios (`comments`)** específicos para cada equipo. 
- Este feedback ayuda a los Coders a entender sus fortalezas y áreas de mejora.
- Los comentarios se asocian directamente al proyecto evaluado.

![Comments](./screenshots/comments.png)

## 4. Actualizaciones en Tiempo Real

Gracias a la integración con WebSockets, los TLs pueden ver las actualizaciones de los estados de los proyectos de manera dinámica (por ejemplo, si un equipo acaba de enviar su repositorio o si otro TL ya terminó su evaluación).

---
[← Anterior: Rol Administrador](./admin.md) | [Siguiente: Rol Coder →](./coder.md)
