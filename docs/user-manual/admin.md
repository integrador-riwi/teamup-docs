# 03 — Admin Role (ADMIN)

The **Administrator (`ADMIN`)** role has total control over the TeamUp platform. They are in charge of orchestrating the events, configuring the grading metrics, and monitoring the overall progress of the hackathon or programming event.

## 1. Event Management

The administrator is the only one capable of creating and managing the platform's main events.
- **Event creation**: Defines the name, description, start and end dates, and general rules.
- **Event status**: Can change the state of the event (e.g., Active, Finished, Under Evaluation).

![Event creation](./screenshots/admin_create_event.png)

## 2. Rubric and Evaluation Configuration

Before Tech Leads can grade, the Admin must configure how the event will be evaluated.
- Establishes the weights and criteria for the three main areas: **Development (DEV)**, **Soft Skills (SOFT SKILLS)**, and **English (ENGLISH)**.
- Defines what percentage of the total score will depend on public votes (QR-Votes).

![Rubric](./screenshots/admin_create_rubric.png)

Our platform offers two ways to create a rubric. It can be done directly from the platform using the rubric builder, which shows the weights, descriptions, and examples for each criterion per area (a rubric can have one or several areas, depending on the event's needs), or you can download the standard template we provide in an Excel file, modify the weights, descriptions, and examples for each criterion per area, and upload the file to the platform to create the rubric automatically.

![Rubric Options](./screenshots/admin_rubric_options.png)

## 3. Team and Participant Monitoring

The administrator has access to a global view of all `coders` and formed teams.
![Team Management](./screenshots/admin_team_management.png)

The admin also has a dashboard to monitor the overall progress of the event, including grades, top scores, submissions, etc. Within the dashboard, there is an option to finalize the event and publish the final results (which closes project submissions and starts enabling public voting).
![Admin Dashboard](./screenshots/admin_dashboard.png)

## 4. Live Voting (QR Votes) and Finalists

During the final stage of the event, the Admin controls public voting and ranking generation.
- **QR Generation**: Can generate or enable the QR code so the public can vote for their favorite project.

![Generate QR](./screenshots/admin_generate_qr.png)
- **Ranking Calculation**: The system automatically sums the Tech Leads' grades; the 5 projects with the highest scores become finalists and are made available for public voting.
![Finalists](./screenshots/admin_finalists.png)

- **Event Podium**: The Admin views the winners (Finalists) in real time and can conclude the event.

![Event Podium](./screenshots/event_podium.png)

---
[← Previous: Registration and Access](./access-and-register.md) | [Next: Tech Lead Role →](./tech-lead.md)
