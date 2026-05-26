# 01 — Introduction and Key Concepts

## 1. What is TeamUp?

**TeamUp** is a web platform designed for RIWI that centralizes the management of competitive and collaborative programming events. It allows administrators to create events with specific rules, coders to form teams and submit projects, and Tech Leads to evaluate work across multiple dimensions (technical, soft skills, and English).

The platform is integrated directly with **GitHub Organizations**, which automates repository creation and collaborator management when a team is formed.

---

## 2. General System Architecture

```
┌─────────────────────────────────────────────────────┐
│                      TeamUp                         │
│                                                     │
│   ┌──────────┐   ┌──────────┐   ┌──────────────┐    │
│   │  ADMIN   │   │  CODER   │   │  TECH LEADS  │    │
│   │          │   │          │   │  (TL_DEV /   │    │
│   │ Events   │   │ Teams    │   │  TL_SOFT /   │    │
│   │ Rubrics  │   │ Deliver- │   │  TL_ENG)     │    │
│   │ Config.  │   │ ables    │   │  Evaluation  │    │
│   └────┬─────┘   └────┬─────┘   └──────┬───────┘    │
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

## 3. Role Glossary

| Role | Full Name | Responsibilities |
|------|-----------|-----------------|
| `ADMIN` | Administrator | Creates and manages events, configures rubrics, administers the platform |
| `CODER` | Participant | Registers for events, forms teams, uploads deliverables |
| `TL_DEVELOPMENT` | Development Tech Lead | Evaluates technical quality and code |
| `TL_SOFT_SKILLS` | Soft Skills Tech Lead | Evaluates teamwork, communication, and presentation |
| `TL_ENGLISH` | English Tech Lead | Evaluates English usage and communication quality |

> **Note:** A user can only have one role in the platform. The role assigned during registration is `CODER`.

---

## 4. Key Concepts

### Event
An event is the primary unit in the platform. It represents a competition or hackathon with defined dates, team rules, an associated GitHub organization, and optionally an evaluation rubric.

### Team
A group of coders who participate together in an event. Each team has:
- A **Leader** (the coder who created it), responsible for accepting or rejecting join requests.
- One or more **Developers** (team members).
- A **GitHub repository** automatically created when the team is created in TeamUp.

### Rubric
Evaluation criteria configured by the admin for a specific event. It can be created during the initial event setup or edited later.

### Deliverables
Files or resources that the team uploads as part of its progress or final submission for an event (commercial video, deployed solution link, preview image, and GitHub repository link).

### GitHub Organization
The GitHub organizational account where team repositories are hosted. The admin selects the organization when creating the event, and it must already be linked to their GitHub account in the platform.

---

## 5. Shared Access Flow (All Roles)

The entry point to the platform is the same for every role:
![Login Screen](./screenshots/login.png)

```
                      │
                      ▼
         Are the credentials valid?
          /                \
        Yes                No
         │                  │
         ▼                  ▼
  Redirect based on      Show error message
  user role              on screen
         │
         ├──→ ADMIN        → Events panel
         ├──→ CODER        → Event home page
         ├──→ TL_DEVELOPMENT → Evaluation panel
         ├──→ TL_SOFT_SKILLS → Evaluation panel
         └──→ TL_ENGLISH   → Evaluation panel
```

> **See also:** [Registration and Access](./access\ and\ register) for the account creation process.

---

## 6. GitHub Integration

TeamUp integrates with GitHub at two levels:

| Layer | Who configures it | What it does |
|------|-------------------|--------------|
| **Organization** | Admin | Associates a GitHub organization with the event to host repositories |
| **Collaborator** | Automatic system | Adds the coder as a collaborator when they join a team |

For this integration to work correctly:
1. The **admin** must have linked their GitHub account in their profile before creating an event.
2. The **coder** must have linked their GitHub account in their profile before joining a team.

> If a coder has not linked GitHub when joining a team, they will not be added as a collaborator until they complete that step.

---

[← Back to index](./contents.md) | [Next: Registration and Access →](./access\ and\ register)
