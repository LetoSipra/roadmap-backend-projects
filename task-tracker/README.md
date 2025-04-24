# Task Tracker CLI

A simple, file-based command-line task tracker built with TypeScript. Manage your tasks directly from the terminal with support for adding, updating, deleting, and marking tasks as in-progress or done.
Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Commands](#commands)
  - [Examples](#examples)
- [Data Storage](#data-storage)

## Features

- **Add tasks**: Create new to-do items with timestamps.
- **Update tasks**: Modify the description of existing tasks.
- **Delete tasks**: Remove tasks by ID.
- **Mark tasks**: Change status to `in-progress` or `done`.
- **List tasks**: View all tasks or filter by status.

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/LetoSipra/roadmap-backend-projects
   cd task-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Ensure **`tasks.json`** is in place**

   The CLI will automatically create a `tasks.json` file in the current working directory if it doesn't exist.

## Usage

Run the CLI script after compile it to JavaScript.

```bash
npx tsc task-cli
node task-cli.js <command> [options]
```

### Commands

| Command                 | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| `add "<description>"`   | Add a new task with the given description.                          |
| `update <id> "<desc>"`  | Update the description of the task with the given ID.               |
| `delete <id>`           | Delete the task with the given ID.                                  |
| `mark-in-progress <id>` | Mark the specified task as in-progress.                             |
| `mark-done <id>`        | Mark the specified task as done.                                    |
| `list [status]`         | List all tasks or filter by status (`todo`, `in-progress`, `done`). |

### Examples

```bash
# Add a new task
npx ts-node src/task-cli.ts add "Write project README"

# Update an existing task
npx ts-node src/task-cli.ts update 1 "Write detailed project README"

# Mark a task in progress
npx ts-node src/task-cli.ts mark-in-progress 1

# Mark a task as done
npx ts-node src/task-cli.ts mark-done 1

# Delete a task
npx ts-node src/task-cli.ts delete 1

# List all tasks
npx ts-node src/task-cli.ts list

# List only done tasks
npx ts-node src/task-cli.ts list done
```

## Data Storage

Tasks are stored in a JSON file named `tasks.json` in the directory where the CLI is executed. Each task record includes:

- `id`: Unique numerical identifier
- `description`: Task description text
- `status`: One of `todo`, `in-progress`, or `done`
- `createdAt`: ISO timestamp of creation
- `updatedAt`: ISO timestamp of last update
