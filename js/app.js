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

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    // Update counter
    function updateCounter() {
        const items = list.querySelectorAll("li");
        const remaining = Array.from(items).filter(
            item => !item.classList.contains("completed")
        ).length;

        counter.textContent = `${remaining} item(s) left`;
    }

    // Show correct items
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

    // Add task
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const text = input.value.trim();

        if (text === "") {
            errorMsg.hidden = false;
            errorMsg.classList.remove("hidden");
            errorMsg.style.display = "block";
            return;
        }

        errorMsg.hidden = true;
        errorMsg.classList.add("hidden");
        errorMsg.style.display = "none";

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "item-text";
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);

        input.value = "";

        updateCounter();
        applyFilter();
    });

    // Event delegation on todo-list
    list.addEventListener("click", function(event) {

        // Delete item
        const deleteBtn = event.target.closest(".delete-btn");

        if (deleteBtn && list.contains(deleteBtn)) {
            deleteBtn.closest("li").remove();

            updateCounter();
            applyFilter();
            return;
        }

        // Toggle completed
        const itemText = event.target.closest(".item-text");

        if (itemText && list.contains(itemText)) {
            const li = itemText.closest("li");

            li.classList.toggle("completed");

            updateCounter();
            applyFilter();
        }
    });

    // Filter All
    filterAll.addEventListener("click", function() {
        currentFilter = "all";
        applyFilter();
    });

    // Filter Active
    filterActive.addEventListener("click", function() {
        currentFilter = "active";
        applyFilter();
    });

    // Filter Done
    filterDone.addEventListener("click", function() {
        currentFilter = "done";
        applyFilter();
    });

    // Initial counter
    updateCounter();

})();