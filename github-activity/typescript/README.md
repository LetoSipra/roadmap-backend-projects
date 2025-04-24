# GitHub Activity CLI

A simple command-line tool to fetch and display the recent public GitHub activity of any user.

---

## ⚙️ Features

- **Fetch**es the latest 30 public events from the GitHub Events API
- **Summarize**s common event types:
  - Pushes (commits)
  - Issues opened/closed
  - Issue comments
  - Pull requests opened/merged
  - Stars (watch events)
  - Forks
- **Graceful error handling** for:
  - Invalid usernames (404)
  - API rate-limits or other HTTP errors
  - Network failures

---

## 🛠️ Prerequisites

- **Node.js** v18 or later (for built-in `fetch`)
- **TypeScript**

---

## 📥 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/LetoSipra/roadmap-backend-projects
   cd github-activity/typescript
   npx tsc github-activity
   node github-activity username
   ```
