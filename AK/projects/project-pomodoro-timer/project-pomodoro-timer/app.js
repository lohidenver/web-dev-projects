console.log("App connected");

const taskElement = document.querySelector(".task-container");
const submitElement = document.querySelector(".submit-button");
const timeLeftDisplay = document.querySelector("#time-left");
const fillDisplay = document.querySelector(".fill");

const startCount = 15;

let timeLeft = startCount;
let timerID;
timeLeftDisplay.textContent = convertToMinutes(timeLeft);

let tasks = [{
        name: "Javascript",
        priority: 1,
    },
    {
        name: "React",
        priority: 4,
    },
    {
        name: "CSS",
        priority: 3,
    },
];

const orderedTasks = tasks.sort((a, b) => a.priority - b.priority);

function convertToMinutes(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft - minutes * 60;
    return minutes + ":" + (seconds < 10 ? "0" + seconds : "" + seconds);
}

function handleClick(button) {
    switch (button.textContent) {
        case "ACTIVE":
            button.textContent = "PAUSED";
            button.classList.add("paused-button");
            button.classList.remove("active-button");
            clearInterval(timerID);
            console.log(button);
            break;
        case "PAUSED":
            button.textContent = "ACTIVE";
            button.classList.add("active-button");
            button.classList.remove("paused-button");
            console.log(button);
            countDown(button);
            break;

        default:
            const allButtons = document.querySelectorAll(".controller-button");

            allButtons.forEach((button) => {
                button.textContent = "START";
                button.classList.remove("active-button");
                button.classList.remove("paused-button");
                console.log(button);
                clearInterval(timerID);
                timeLeft = startCount;
                timeLeftDisplay.textContent = convertToMinutes(timeLeft);
            });

            button.textContent = "ACTIVE";
            button.classList.add("active-button");

            countDown(button);
            break;
    }
}

function countDown(button) {
    timerID = setInterval(() => {
        //
        timeLeft--;
        timeLeftDisplay.textContent = convertToMinutes(timeLeft);
        fillDisplay.style.width = (timeLeft / startCount) * 100 + "%";

        if (timeLeft <= 10) {
            timeLeftDisplay.style.color = "red";
        }

        if (timeLeft <= 5) {
            const sound = document.createElement("audio");
            sound.src = "beep.mp3";
            sound.play();
        }

        if (timeLeft <= 0) {
            clearInterval(timerID);
            // console.log(button.id);
            delete orderedTasks[button.id];
            button.parentNode.remove();
            // console.log(tasks);
            timeLeft = startCount;
            timeLeftDisplay.textContent = convertToMinutes(timeLeft);
            fillDisplay.style.width = (timeLeft / startCount) * 100 + "%";
            timeLeftDisplay.style.color = "rgba(255, 255, 255, 0.8)";
        }
    }, 1000);
}

function renderTask() {
    orderedTasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        const taskDelete = document.createElement("img");
        const taskInfo = document.createElement("p");
        const taskButton = document.createElement("button");

        taskDiv.classList.add("task-block");
        taskDelete.classList.add("delete-icon");
        taskButton.classList.add("controller-button");

        taskDelete.src = "bin.png";
        taskInfo.textContent = task.name;

        taskDiv.append(taskDelete);
        taskDiv.append(taskInfo);
        taskDiv.append(taskButton);

        taskButton.textContent = "START";
        taskButton.setAttribute("id", index);

        taskDelete.addEventListener("click", deleteTask);
        taskButton.addEventListener("click", () => handleClick(taskButton));

        taskElement.append(taskDiv);
    });
}

function deleteTask(e) {
    e.target.parentNode.remove();
    delete orderedTasks[e.target.parentNode.lastChild.id];
}

function addTask() {
    const inputElement = document.querySelector("input");
    const value = inputElement.value;
    if (value) {
        taskElement.textContent = "";
        inputElement.value = "";
        tasks.push({
            name: value,
            priority: tasks.length,
        });
        renderTask();
    }
}

renderTask();
submitElement.addEventListener("click", addTask);