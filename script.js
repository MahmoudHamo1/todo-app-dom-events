const addBtn = document.getElementById("btn");
const input = document.getElementById("taskIn");
const list = document.getElementById("list");

function AddTask() {
  if (!input.value.trim()) return;
  const task = document.createElement("div");
  task.className = "task";
  const taskText = document.createElement("span");
  taskText.textContent = input.value;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  task.appendChild(checkbox);
  task.appendChild(taskText);
  task.appendChild(deleteBtn);
  list.appendChild(task);
  input.value = "";
}

list.addEventListener("change", (e) => {
  const task = e.target.closest(".task");
  task.classList.toggle("completed", e.target.checked);
});

list.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    const task = e.target.closest(".task");
    task.remove();
  }
});

addBtn.addEventListener("click", AddTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    AddTask();
  }
});
