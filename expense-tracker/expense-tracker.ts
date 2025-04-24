import * as fs from "fs";
import * as path from "path";

interface Expense {
  id: number;
  date: string; // ISO date string
  description: string;
  amount: number;
  category?: string;
}

const DATA_FILE = path.resolve(process.cwd(), "expenses.json");

function loadExpenses(): Expense[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data) as Expense[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    console.error("Error reading data file:", err);
    process.exit(1);
  }
}

function saveExpenses(expenses: Expense[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
  } catch (err) {
    console.error("Error writing data file:", err);
    process.exit(1);
  }
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function printHelp() {
  console.log(`Usage: expense-tracker <command> [options]

Commands:
  add      Add a new expense
  update   Update an existing expense
  delete   Delete an expense
  list     List all expenses
  summary  Show summary (optional --month <1-12>)

Options (add/update):
  -d, --description <desc>    Description of the expense
  -a, --amount <amt>          Amount of the expense
  -c, --category <cat>        Category of the expense
  -i, --id <id>               ID of the expense (update/delete)
  -m, --month <month>         Month number (1-12) for summary
`);
}

const [, , cmd, ...args] = process.argv;
if (!cmd) {
  printHelp();
  process.exit(0);
}

const options: Record<string, string> = {};
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("--")) {
    const key = arg.slice(2);
    const val = args[i + 1];
    options[key] = val;
    i++;
  } else if (arg.startsWith("-")) {
    const key = arg.slice(1);
    const val = args[i + 1];
    options[key] = val;
    i++;
  }
}

switch (cmd) {
  case "add": {
    const desc = options.d || options.description;
    const amtStr = options.a || options.amount;
    if (!desc || !amtStr) {
      console.error("Both description and amount are required.");
      process.exit(1);
    }
    const amount = parseFloat(amtStr);
    if (isNaN(amount) || amount < 0) {
      console.error("Invalid amount. Must be a non-negative number.");
      process.exit(1);
    }
    const expenses = loadExpenses();
    const id = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
    const newExpense: Expense = {
      id,
      date: new Date().toISOString(),
      description: desc,
      amount,
      category: options.c || options.category,
    };
    expenses.push(newExpense);
    saveExpenses(expenses);
    console.log(`Expense added successfully (ID: ${id})`);
    break;
  }
  case "update": {
    const idStr = options.i || options.id;
    if (!idStr) {
      console.error("Expense ID is required for update.");
      process.exit(1);
    }
    const id = parseInt(idStr, 10);
    const expenses = loadExpenses();
    const idx = expenses.findIndex((e) => e.id === id);
    if (idx === -1) {
      console.error(`Expense with ID ${id} not found.`);
      process.exit(1);
    }
    const exp = expenses[idx];
    if (options.d || options.description)
      exp.description = options.d || options.description;
    if (options.a || options.amount) {
      const amount = parseFloat(options.a || options.amount!);
      if (isNaN(amount) || amount < 0) {
        console.error("Invalid amount. Must be a non-negative number.");
        process.exit(1);
      }
      exp.amount = amount;
    }
    if ("c" in options || "category" in options) {
      exp.category = options.c || options.category;
    }
    expenses[idx] = exp;
    saveExpenses(expenses);
    console.log(`Expense (ID: ${id}) updated successfully.`);
    break;
  }
  case "delete": {
    const idStr = options.i || options.id;
    if (!idStr) {
      console.error("Expense ID is required for delete.");
      process.exit(1);
    }
    const id = parseInt(idStr, 10);
    let expenses = loadExpenses();
    const before = expenses.length;
    expenses = expenses.filter((e) => e.id !== id);
    if (expenses.length === before) {
      console.error(`Expense with ID ${id} not found.`);
      process.exit(1);
    }
    saveExpenses(expenses);
    console.log("Expense deleted successfully");
    break;
  }
  case "list": {
    const expenses = loadExpenses();
    if (expenses.length === 0) {
      console.log("No expenses recorded.");
      break;
    }
    console.log(
      "ID | Date       | Description           | Amount      | Category"
    );
    console.log(
      "---|------------|-----------------------|-------------|---------"
    );
    expenses.forEach((e) => {
      const date = e.date.split("T")[0];
      const desc = e.description.padEnd(21);
      const amt = formatCurrency(e.amount).padEnd(11);
      const cat = e.category || "-";
      console.log(
        `${e.id.toString().padEnd(2)} | ${date} | ${desc} | ${amt} | ${cat}`
      );
    });
    break;
  }
  case "summary": {
    const expenses = loadExpenses();
    const monthStr = options.m || options.month;
    if (monthStr) {
      const m = parseInt(monthStr, 10);
      if (isNaN(m) || m < 1 || m > 12) {
        console.error("Invalid month. Provide a number between 1 and 12.");
        process.exit(1);
      }
      const now = new Date();
      const filtered = expenses.filter((e) => {
        const d = new Date(e.date);
        return d.getFullYear() === now.getFullYear() && d.getMonth() + 1 === m;
      });
      const total = filtered.reduce((sum, e) => sum + e.amount, 0);
      const monthName = new Date(now.getFullYear(), m - 1, 1).toLocaleString(
        "default",
        { month: "long" }
      );
      console.log(`Total expenses for ${monthName}: ${formatCurrency(total)}`);
    } else {
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      console.log(`Total expenses: ${formatCurrency(total)}`);
    }
    break;
  }
  default:
    console.error(`Unknown command: ${cmd}`);
    printHelp();
    process.exit(1);
}
