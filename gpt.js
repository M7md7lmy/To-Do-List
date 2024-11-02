const container = document.querySelector(".container");
const form = document.querySelector("form");
const input = document.querySelector(".input");

let currentTaskElement = null; // To keep track of the currently selected task for updating

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    addTaskToDOM(task.text, task.finished);
  });
}

// Function to add task to the DOM
function addTaskToDOM(taskText, finished = false) {
  const content = `
    <div class="task">
      <span class="icon-star icon"></span>
      <p class="task-text ${finished ? 'finish' : ''}">${taskText}</p>
      <div>
        <span class="icon-trash-o icon"></span>
        <span class="icon-angry2 icon"></span>
      </div>
    </div>
  `;
  container.innerHTML += content;
}

// Add task on form submit
form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  const taskText = input.value.trim();

  if (currentTaskElement) {
    // Update existing task
    const taskParagraph = currentTaskElement.querySelector('.task-text');
    taskParagraph.textContent = taskText;
    // Reset the currentTaskElement
    currentTaskElement = null;
  } else {
    // Add new task
    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText);
  }

  // Clear input field
  input.value = "";
  updateLocalStorage(); // Update local storage after adding/updating
});

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, finished: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update local storage when a task is modified
function updateLocalStorage() {
  const tasks = Array.from(container.querySelectorAll('.task')).map(task => {
    const taskText = task.querySelector('.task-text').textContent;
    const finished = task.querySelector('.task-text').classList.contains('finish');
    return { text: taskText, finished };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event delegation for task actions
container.addEventListener("click", (eo) => {
  const taskTextElement = eo.target.closest('.task-text');

  if (taskTextElement) {
    // When the task text is clicked, populate the input for editing
    input.value = taskTextElement.textContent; // Set input value to the task text
    currentTaskElement = taskTextElement.parentElement.parentElement; // Keep reference to the task element
  } else {
    switch (eo.target.className) {
      case "icon-trash-o icon":
        eo.target.parentElement.parentElement.remove();
        updateLocalStorage(); // Update local storage after deletion
        break;
      case "icon-angry2 icon":
        eo.target.classList.replace("icon-angry2", "icon-heart");
        eo.target.parentElement.parentElement
          .getElementsByClassName("task-text")[0]
          .classList.add("finish");
        updateLocalStorage(); // Update local storage after modification
        break;
      case "icon-heart icon":
        eo.target.parentElement.parentElement
          .getElementsByClassName("task-text")[0]
          .classList.remove("finish");
        eo.target.classList.replace("icon-heart", "icon-angry2");
        updateLocalStorage(); // Update local storage after modification
        break;
      case "icon-star icon":
        eo.target.classList.add("orange");
        container.prepend(eo.target.parentElement);
        updateLocalStorage(); // Update local storage after modification
        break;
      case "icon-star icon orange":
        eo.target.classList.remove("orange");
        container.append(eo.target.parentElement);
        updateLocalStorage(); // Update local storage after modification
        break;
    }
  }
});
