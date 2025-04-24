# Expense Tracker CLI

A simple command-line Expense Tracker written in **TypeScript** using Node.js core modules. This tool helps you manage your daily expenses by letting you add, list, update, delete, and summarize your expenses. No external libraries used.

## Features

- Add new expenses
- Update existing expenses
- Delete expenses by ID
- List all recorded expenses
- View a total summary of all expenses
- View a summary by month (current year only)
- Categorize expenses

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/LetoSipra/roadmap-backend-projects
cd expense-tracker
```

### 2. Compile the TypeScript Code

```bash
tsc expense-tracker.ts
```

### 3. Run the CLI

```bash
node expense-tracker.js <command> [options]
```

> Expenses are stored in a `expenses.json` file in the project root.

## Commands

### Add Expense

```bash
node expense-tracker.js add -d "Lunch" -a 12.5 -c "Food"
```

### Update Expense

```bash
node expense-tracker.js update -i 1 -d "Lunch with drinks" -a 15.0
```

### Delete Expense

```bash
node expense-tracker.js delete -i 1
```

### List All Expenses

```bash
node expense-tracker.js list
```

### Show Summary

```bash
node expense-tracker.js summary
```

### Show Monthly Summary

```bash
node expense-tracker.js summary -m 4
```

## Options

| Option                | Description                     |
| --------------------- | ------------------------------- |
| `-d`, `--description` | Expense description             |
| `-a`, `--amount`      | Expense amount (must be >= 0)   |
| `-c`, `--category`    | Optional category               |
| `-i`, `--id`          | Expense ID (for update/delete)  |
| `-m`, `--month`       | Month number for summary (1-12) |
