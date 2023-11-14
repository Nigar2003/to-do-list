const addBtn = document.getElementById("addButton");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const todoList = [];

function addTask() {
  const taskText = input.value.trim();

  if (taskText !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeTask(listItem);
    });
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
    todoList.push({ text: taskText, element: listItem });
    input.value = "";
  }
  input.classList.toggle("d-none");
}

function removeTask(taskElement) {
    const taskIndex = todoList.findIndex(task => task.element === taskElement);

    if (taskIndex !== -1) {
        todoList.splice(taskIndex, 1);
    }

    taskElement.remove();
}


let sortAsc = true;
const existingTasks = todoList.filter(task => taskList.contains(task.element));

function sortTasks() {
  if (sortAsc) {
    todoList.sort((a, b) => a.text.localeCompare(b.text));
  } else {
    todoList.sort((a, b) => b.text.localeCompare(a.text));
  }

  sortAsc = !sortAsc;

  taskList.innerHTML = "";

  todoList.forEach((task) => {
    taskList.appendChild(task.element);
  });
}

document.getElementById("sortButton").addEventListener("click", sortTasks);

addBtn.addEventListener("click", addTask);

//Addition to the task itself- it will work in keyboard when pressing 'Enter'
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
  }
);
