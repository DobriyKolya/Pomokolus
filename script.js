const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const tasksList = document.getElementById('tasks');
const pomodoroDurationInput = document.getElementById('pomodoro-duration');
const shortBreakDurationInput = document.getElementById('short-break-duration');
const longBreakDurationInput = document.getElementById('long-break-duration');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const statusDisplay = document.getElementById('status-display');

let time = parseInt(pomodoroDurationInput.value) * 60;
let pomodoroDuration = parseInt(pomodoroDurationInput.value) * 60;
let shortBreakDuration = parseInt(shortBreakDurationInput.value) * 60;
let longBreakDuration = parseInt(longBreakDurationInput.value) * 60;
let currentTask = null;
let timerInterval = null;


function updateTimeDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

}

function updateStatusDisplay(status) {
    statusDisplay.textContent = status;
}


function updateDurations() {
    pomodoroDuration = parseFloat(pomodoroDurationInput.value || '0') * 60;
    shortBreakDuration = parseFloat(shortBreakDurationInput.value || '0') * 60;
    longBreakDuration = parseFloat(longBreakDurationInput.value || '0') * 60;
}


function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.disabled = false;
}

function resetTimer() {
    currentTask = 0;

    clearInterval(timerInterval);
    timerInterval = null;

    time = pomodoroDuration;

    updateTimeDisplay();
    updateStatusDisplay("Work");
    startButton.removeAttribute('disabled');
}


function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);

    startButton.setAttribute('disabled', 'true');
}

function startBreakTimer(duration) {
    clearInterval(timerInterval);
    timerInterval = null;

    time = duration;

    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    updateTimeDisplay();

    if (time > 0) {
        time--;
    } else {
        clearInterval(timerInterval);
        timerInterval = null;

        startButton.setAttribute('disabled', 'true');

        if (currentTask % 7 === 0 && currentTask !== 0) {
            startBreakTimer(longBreakDuration);

            updateStatusDisplay("Long Break")

            currentTask = 0;
        } else if (currentTask % 2 === 1) {
            startBreakTimer(shortBreakDuration);

            updateStatusDisplay("Short Break")
            currentTask++;
        } else {
            startTimer(pomodoroDuration);
            updateStatusDisplay("Work")
            currentTask++;
        }

        updateTimeDisplay()
    }
}


function addTask(e) {
    e.preventDefault();
    const taskDescription = taskInput.value.trim();

    if (taskDescription !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskDescription;
        tasksList.appendChild(taskItem);

        taskInput.value = '';
    }
}

function removeTask(e) {
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
}


updateStatusDisplay('Work')

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

taskForm.addEventListener('submit', addTask);
tasksList.addEventListener('click', removeTask);

pomodoroDurationInput.addEventListener('change', updateDurations);
shortBreakDurationInput.addEventListener('change', updateDurations);
longBreakDurationInput.addEventListener('change', updateDurations);

pomodoroDurationInput.addEventListener('change', () => {
    resetTimer();
    updateTimeDisplay()
});
//переключение на работу, поправить куррентаски, двойной интервал убрать, добавить, что мы щас вообще делаем.
