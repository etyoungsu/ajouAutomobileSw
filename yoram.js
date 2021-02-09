const form = document.querySelector(".js-name"),
    input = form.querySelector("input"),
    greet = document.querySelector(".js-greeting");

const USER_LS = "userName",
    SHOWING = "showing";


function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function paintName(text) {
    form.classList.remove(SHOWING);
    greet.classList.add(SHOWING);
    greet.innerText = `${text} 반가워!`;
}

function handler(event) {
    event.preventDefault();
    const value = input.value;
    paintName(value);
    saveName(value);
}

function waitForName() {
    form.classList.add(SHOWING);
    form.addEventListener("submit", handler);
}


function loadName() {
    const userName = localStorage.getItem(USER_LS);
    if (userName === null) {
        waitForName();
    }
    else
        paintName(userName);
}

function init() {
    loadName();
}

init();