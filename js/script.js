const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterSelect = document.getElementById("filterSelect");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let todos = [];

function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos;

    const filter = filterSelect.value;

    if (filter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === "pending") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `
            <tr>
                <td colspan="4" class="empty">No task found</td>
            </tr>
        `;
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.date}</td>
            <td class="${todo.completed ? 'status-completed' : 'status-pending'}">
                ${todo.completed ? 'Completed' : 'Pending'}
            </td>
            <td>
                <button class="action-btn complete-btn" onclick="toggleComplete(${index})">
                    ✓
                </button>
                <button class="action-btn delete-btn" onclick="deleteTodo(${index})">
                    ✕
                </button>
            </td>
        `;

        todoList.appendChild(row);
    });
}

function addTodo() {
    const task = taskInput.value.trim();
    const date = dateInput.value;

    // Validation
    if (task === "" || date === "") {
        alert("Task and Due Date must be filled.");
        return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
        alert("Due date cannot be in the past.");
        return;
    }

    todos.push({
        task,
        date,
        completed: false
    });

    taskInput.value = "";
    dateInput.value = "";

    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function deleteAll() {
    todos = [];
    renderTodos();
}

addBtn.addEventListener("click", addTodo);
filterSelect.addEventListener("change", renderTodos);
deleteAllBtn.addEventListener("click", deleteAll);

// Optional: allow Enter key
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

renderTodos();