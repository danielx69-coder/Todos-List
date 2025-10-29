// Select elements
const input = document.getElementById("add_tasks");
const submit = document.getElementById("submit_tasks");
const list = document.getElementById("tasks");

// Save todos in localStorage
function saveTodos() {
    const todos = [];
    document.querySelectorAll("#tasks li .todo-text").forEach(span => {
        todos.push(span.textContent.trim());
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
    list.innerHTML = "";
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    saved.forEach(text => {
        const li = createTodoElement(text);
        list.appendChild(li);
    });
}

// Create todo <li>
function createTodoElement(text) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="todo-text">${text}</span>
        <div class="icons">
            <span class="fa-solid fa-pen-to-square edit-btn"></span>
            <span class="fa-solid fa-trash delete-btn"></span>
        </div>
    `;

    // Delete button
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        saveTodos();
    });

    // Edit button
    li.querySelector(".edit-btn").addEventListener("click", () => {
        const textSpan = li.querySelector(".todo-text");
        const oldText = textSpan.textContent.trim();

        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = oldText;
        inputEdit.classList.add("edit-input");

        li.replaceChild(inputEdit, textSpan);
        inputEdit.focus();

        const saveEdit = () => {
            const newText = inputEdit.value.trim() || oldText;
            const newSpan = document.createElement("span");
            newSpan.classList.add("todo-text");
            newSpan.textContent = newText;
            li.replaceChild(newSpan, inputEdit);
            saveTodos();
        };

        inputEdit.addEventListener("blur", saveEdit);
        inputEdit.addEventListener("keydown", e => {
            if (e.key === "Enter") saveEdit();
        });
    });

    return li;
}

// Add new todo
submit.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;
    const li = createTodoElement(text);
    list.appendChild(li);
    input.value = "";
    saveTodos();
});

// Allow Enter key to add todo
input.addEventListener("keydown", e => {
    if (e.key === "Enter") submit.click();
});

// Load saved todos on page start
window.addEventListener("DOMContentLoaded", loadTodos);
