// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(() => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    const filterButtons = {
        all: document.getElementById("filter-all"),
        active: document.getElementById("filter-active"),
        done: document.getElementById("filter-done")
    };

    let tasks = [];
    let currentFilter = "all";
    let nextId = 1;

    function updateCounter() {
        const remaining = tasks.filter(task => !task.completed).length;

        counter.textContent = `${remaining} item${remaining === 1 ? "" : "s"} remaining`;
    }

    function renderTasks() {
        list.innerHTML = "";

        const visibleTasks = tasks.filter(task => {
            if (currentFilter === "active") {
                return !task.completed;
            }

            if (currentFilter === "done") {
                return task.completed;
            }

            return true;
        });

        visibleTasks.forEach(task => {
            const li = document.createElement("li");
            li.dataset.id = task.id;
            li.classList.toggle("completed", task.completed);

            const span = document.createElement("span");
            span.textContent = task.text;

            span.style.textDecoration = task.completed ? "line-through" : "none";
            span.classList.toggle("completed", task.completed);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";
            deleteButton.dataset.action = "delete";
            deleteButton.className = "delete-btn";

            li.appendChild(span);
            li.appendChild(deleteButton);

            list.appendChild(li);
        });

        updateCounter();
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskText = input.value.trim();

        if (taskText === "") {
            errorMsg.textContent = "Please enter a task.";
            errorMsg.style.display ="block"
            return;
        }

        errorMsg.textContent = "";
        errorMsg.classList.add("hidden");
        errorMsg.style.display = "none"

        const newTask = {
            id: nextId,
            text: taskText,
            completed: false
        };

        nextId++;

        tasks.push(newTask);

        input.value = "";

        renderTasks();
    });

    list.addEventListener("click", function(event) {
        const li = event.target.closest("li");

        if (!li || !list.contains(li)) {
            return;
        }

        const taskId = Number(li.dataset.id);

        if (event.target.closest(".delete-btn")) {
            tasks = tasks.filter(task => task.id !== taskId);
        } else {
            const task = tasks.find(task => task.id === taskId);

            if (task) {
                task.completed = !task.completed;
            }
        }

        renderTasks();
    });

    Object.entries(filterButtons).forEach(function(entry) {
        const filterName = entry[0];
        const button = entry[1];

        button.addEventListener("click", function() {
            currentFilter = filterName;
            renderTasks();
        });
    });

    renderTasks();
})();