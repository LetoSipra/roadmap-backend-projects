import * as fs from "fs";
import * as path from "path";

interface Task {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

const tasksFilePath = path.join(process.cwd(), "tasks.json");

function readTasks(): Task[] {
  if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading tasks file:", error);
    return [];
  }
}

function writeTasks(tasks: Task[]) {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error writing tasks file:", error);
  }
}

function getTimestamp(): string {
  return new Date().toISOString();
}

function addTask(description: string) {
  const tasks = readTasks();
  const newId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  const newTask: Task = {
    id: newId,
    description,
    status: "todo",
    createdAt: getTimestamp(),
    updatedAt: getTimestamp(),
  };
  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`Task added successfully (ID: ${newId})`);
}

function updateTask(id: number, description: string) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }
  task.description = description;
  task.updatedAt = getTimestamp();
  writeTasks(tasks);
  console.log(`Task with ID ${id} updated successfully.`);
}

function deleteTask(id: number) {
  let tasks = readTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  if (tasks.length === initialLength) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }
  writeTasks(tasks);
  console.log(`Task with ID ${id} deleted successfully.`);
}

function markTask(id: number, status: "in-progress" | "done") {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }
  task.status = status;
  task.updatedAt = getTimestamp();
  writeTasks(tasks);
  console.log(`Task with ID ${id} marked as ${status}.`);
}

function listTasks(filterStatus?: string) {
  const tasks = readTasks();
  let filteredTasks = tasks;
  if (filterStatus) {
    if (!["todo", "in-progress", "done"].includes(filterStatus)) {
      console.error(
        `Invalid status filter: ${filterStatus}. Valid statuses: todo, in-progress, done.`
      );
      return;
    }
    filteredTasks = tasks.filter((task) => task.status === filterStatus);
  }
  if (filteredTasks.length === 0) {
    console.log("No tasks found.");
    return;
  }
  console.log("Tasks:");
  filteredTasks.forEach((task) => {
    console.log(`ID: ${task.id}`);
    console.log(`Description: ${task.description}`);
    console.log(`Status: ${task.status}`);
    console.log(`Created At: ${task.createdAt}`);
    console.log(`Updated At: ${task.updatedAt}`);
    console.log("---------------------");
  });
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    if (args.length < 2) {
      console.error('Usage: task-cli add "Task description"');
      process.exit(1);
    }
    addTask(args.slice(1).join(" "));
    break;
  case "update":
    if (args.length < 3) {
      console.error('Usage: task-cli update <id> "New task description"');
      process.exit(1);
    }
    const updateId = parseInt(args[1], 10);
    if (isNaN(updateId)) {
      console.error("Please provide a valid task ID.");
      process.exit(1);
    }
    updateTask(updateId, args.slice(2).join(" "));
    break;
  case "delete":
    if (args.length < 2) {
      console.error("Usage: task-cli delete <id>");
      process.exit(1);
    }
    const deleteId = parseInt(args[1], 10);
    if (isNaN(deleteId)) {
      console.error("Please provide a valid task ID.");
      process.exit(1);
    }
    deleteTask(deleteId);
    break;
  case "mark-in-progress":
    if (args.length < 2) {
      console.error("Usage: task-cli mark-in-progress <id>");
      process.exit(1);
    }
    const inProgressId = parseInt(args[1], 10);
    if (isNaN(inProgressId)) {
      console.error("Please provide a valid task ID.");
      process.exit(1);
    }
    markTask(inProgressId, "in-progress");
    break;
  case "mark-done":
    if (args.length < 2) {
      console.error("Usage: task-cli mark-done <id>");
      process.exit(1);
    }
    const doneId = parseInt(args[1], 10);
    if (isNaN(doneId)) {
      console.error("Please provide a valid task ID.");
      process.exit(1);
    }
    markTask(doneId, "done");
    break;
  case "list":
    if (args.length === 2) {
      listTasks(args[1]);
    } else {
      listTasks();
    }
    break;
  default:
    console.error(
      "Unknown command. Available commands: add, update, delete, mark-in-progress, mark-done, list"
    );
    process.exit(1);
}
