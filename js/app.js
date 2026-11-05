// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
// ITCS333 A3 - To-Do App

(() => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    // Filter buttons
    const filterButtons = {
        all: document.getElementById("filter-all"),
        active: document.getElementById("filter-active"),
        done: document.getElementById("filter-done")
    };

    let currentFilter = "all";

    // Update remaining tasks counter
    function updateCounter() {
        const remaining = list.querySelectorAll(
            "li:not(.completed)"
        ).length;

        counter.textContent = `${remaining} item(s) left`;
    }

    // Apply selected filter
    function applyFilter() {
        const items = list.querySelectorAll("li");

        items.forEach(item => {
            const completed = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.style.display = "";
            } else if (currentFilter === "active") {
                item.style.display = completed ? "none" : "";
            } else if (currentFilter === "done") {
                item.style.display = completed ? "" : "none";
            }
        });
    }

    // Add a new task
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskText = input.value.trim();

        if (taskText === "") {
            errorMsg.hidden = false;
            return;
        }

        errorMsg.hidden = true;

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = taskText;
        span.className = "todo-text";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";

        li.appendChild(span);
        li.appendChild(deleteButton);

        list.appendChild(li);

        input.value = "";

        updateCounter();
        applyFilter();
    });

    // Event delegation: one click listener on the list
    list.addEventListener("click", function(event) {

        // Delete task
        if (event.target.closest(".delete-btn")) {
            const item = event.target.closest("li");
            if (item) {
                item.remove();
            }

            updateCounter();
            return;
        }

        // Toggle completed status
        const taskText = event.target.closest(".todo-text");

        if (taskText && list.contains(taskText)) {
            const item = taskText.closest("li");

            if (item) {
                item.classList.toggle("completed");
            }

            updateCounter();
            applyFilter();
        }
    });

    // Filter button events
    Object.keys(filterButtons).forEach(filter => {

        filterButtons[filter].addEventListener("click", function() {
            currentFilter = filter;

            Object.values(filterButtons).forEach(button => {
                button.classList.remove("filter-active");
            });

            this.classList.add("filter-active");

            applyFilter();
        });
    });

    // Initial counter
    updateCounter();

})();