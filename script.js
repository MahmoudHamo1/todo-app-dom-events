const addBtn = document.getElementById("btn");
const input = document.getElementById("taskIn");
const list = document.getElementById("list");

function AddTask() {
  if (!input.value.trim()) return;

  const id = generateUniqueId();
  const title = input.value;
  const task = { id, title, completed: false };

  createElement(task);

  saveToStorage(task);

  input.value = "";
}

function saveToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createElement(task);
  });
}

function deleteFromStorage(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function changeTaskCompleted(id, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) => {
    if (task.id === id) return { ...task, completed };
    else return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

list.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const task = e.target.closest(".task");
    const id = task.dataset.taskId;
    task.classList.toggle("completed", e.target.checked);
    changeTaskCompleted(id, e.target.checked);
  }
});

list.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    const task = e.target.closest(".task");
    const id = task.dataset.taskId;
    task.remove();
    deleteFromStorage(id);
  }
});

addBtn.addEventListener("click", AddTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    AddTask();
  }
});
function createElement(task) {
  const taskEl = document.createElement("div");
  taskEl.className = "task";
  taskEl.dataset.taskId = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  if (task.completed) taskEl.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  taskEl.append(checkbox, taskText, deleteBtn);
  list.appendChild(taskEl);
}

function generateUniqueId() {
  return Math.random().toString(36).substring(2);
}

window.addEventListener("DOMContentLoaded", loadFromStorage);
