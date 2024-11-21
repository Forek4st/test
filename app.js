const taskManager = JSON.parse(localStorage.getItem("taskManager")) || [];
let idCounter = 0;

class Task {
  constructor(
    taskDescription = "",
    isActive = false,
    time = new Date().toLocaleString("es-MX")
  ) {
    this.id = idCounter++;
    this.taskDescription = taskDescription.toUpperCase();
    this.isActive = isActive;
    this.time = time;
  }
}

const saveTasksToLocalStorage = () => {
  localStorage.setItem("taskManager", JSON.stringify(taskManager));
};

const createTask = (taskDescription, isActive) => {
  const task = new Task(taskDescription, isActive);
  taskManager.push(task);
  saveTasksToLocalStorage();
  renderTasks();
};

const deleteTask = (id) => {
  const index = taskManager.findIndex((task) => task.id === id);
  if (index !== -1) {
    taskManager.splice(index, 1);
    console.log(`Tarea ${id} ha sido borrada`);
    saveTasksToLocalStorage();
  } else {
    console.log(`No se encontró la tarea con ID ${id}`);
  }

  if (taskManager.length === 0) {
    console.log("No hay tareas activas");
  }
  renderTasks();
};

const renderTasks = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  taskManager.forEach((task) => {
    const li = document.createElement("li");

    const taskContent = document.createElement("div");
    taskContent.classList.add("taskContent");
    const taskDescription = document.createElement("span");
    taskDescription.textContent = task.taskDescription;
    const taskTime = document.createElement("small");
    taskTime.textContent = ` ${task.time}`;

    taskContent.appendChild(taskDescription);
    taskContent.appendChild(taskTime);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1024 1024">
        <path fill="black" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"/>
      </svg>
    `;
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
      renderTasks();
    });

    li.append(taskContent, deleteButton);
    taskList.appendChild(li);
  });
};

const handleTaskCreation = () => {
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskDescription = taskDescriptionInput.value;
  if (taskDescription === "") {
    alert("No puedes dejar tareas vacías");
    return;
  }
  createTask(taskDescription, true);
  taskDescriptionInput.value = "";
  renderTasks();
};

document
  .getElementById("addTaskButton")
  .addEventListener("click", handleTaskCreation);

document
  .getElementById("taskDescription")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleTaskCreation();
    }
  });

// Render tasks on page load
renderTasks();
