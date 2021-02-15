const todo = document.querySelector(".js-todo"),
    toDoInput = todo.querySelector("input"),
    list = document.querySelector(".js-toDoList");

const TODO_LS = "ToDo";
let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);
    const cleanToDo = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDo;
    saveToDo();
}

function saveToDo() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
    event.preventDefault();
    const val = toDoInput.value;
    paintToDo(val);
    toDoInput.value = "";
}

function paintToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const del = document.createElement("button");
    const newId = toDos.length + 1;
    span.innerText = text;
    del.innerText = "💦";
    del.addEventListener("click", deleteToDo);
    li.id = newId;
    li.appendChild(del);
    li.appendChild(span);
    list.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDo();
}

function loadToDo() {
    const loadingToDo = localStorage.getItem(TODO_LS);
    if (loadingToDo !== null) {
        const parsedToDo = JSON.parse(loadingToDo);
        parsedToDo.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDo();
    todo.addEventListener("submit", handleSubmit);
}

init();