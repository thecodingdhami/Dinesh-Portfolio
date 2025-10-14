const startBtn = document.getElementById('startBtn');
const timeDisplay = document.getElementById('time');
const minutesInput = document.getElementById('minutes');

let countdown;

startBtn.addEventListener('click', () => {
    clearInterval(countdown);
    timeDisplay.style.color = "black"; // reset color
    let time = parseInt(minutesInput.value) * 60;

    if (isNaN(time) || time <= 0) {
        timeDisplay.textContent = "Enter a valid number!";
        return;
    }

    countdown = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (time > 0) {
            timeDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        } else {
            clearInterval(countdown);
            timeDisplay.textContent = "Time's Up!";
            timeDisplay.style.color = "red";
        }

        time--;
    }, 1000);
});
