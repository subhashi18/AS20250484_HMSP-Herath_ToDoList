
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const remaining = document.getElementById("remaining");
const emptyMessage = document.getElementById("emptyMessage");
const clearBtn = document.getElementById("clearBtn");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    displayTasks();
}

// Display Tasks
function displayTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            displayTasks();
        });

        const taskName = document.createElement("span");
        taskName.textContent = task.text;

        if (task.completed) {
            taskName.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(t => t.id !== task.id);
            displayTasks();
        });

        taskInfo.appendChild(checkbox);
        taskInfo.appendChild(taskName);

        taskItem.appendChild(taskInfo);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    });

    // Remaining Task Count
    const count = tasks.filter(task => !task.completed).length;
    remaining.textContent = count + " remaining";

    // Empty Message
    if (filteredTasks.length === 0) {
        emptyMessage.style.display = "block";

        if (tasks.length === 0) {
            emptyMessage.textContent =
                "No tasks yet. Add your first task!";
        } else {
            emptyMessage.textContent =
                "No tasks to show.";
        }
    } else {
        emptyMessage.style.display = "none";
    }
}

// Add Task Button
addBtn.addEventListener("click", addTask);

// Add Task Using Enter Key
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Filter Tasks
filterButtons.forEach(button => {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    });
});

// Clear Completed Tasks
clearBtn.addEventListener("click", function() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
});

// Initial Display
displayTasks();
