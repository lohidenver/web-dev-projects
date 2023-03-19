console.log("app.js connected");

const taskContainers = document.querySelectorAll(".task-container");
const tasks = document.querySelectorAll(".task");
const imgTask = document.querySelector(".image-container");

let taskDragged;

tasks.forEach((task) => {
    task.addEventListener("dragstart", dragstart);
});

taskContainers.forEach((taskContainer) => {
    taskContainer.addEventListener("drop", dragDrop);
    taskContainer.addEventListener("dragover", dragOver);
});

function dragstart(e) {
    console.log(e.target);
    taskDragged = e.target;
}

function dragDrop(e) {
    e.target.append(taskDragged);
}

function dragOver(e) {
    e.preventDefault();
}