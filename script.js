setInterval(setClock, 1000);

let alarmTimeValue = 0;
const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const alarmTime = document.getElementById("alarm-time");
const setAlarm = document.getElementById("set-alram");
const alarmSetTime = document.getElementById("alarm-set-time");
const reset = document.getElementById("reset");
const audio = document.getElementById("audio");
audio.pause();

setAlarm.addEventListener("click", (e) => {
  audio.pause();
  alarmTimeValue = alarmTime.valueAsNumber;
  alarmSetTime.innerHTML = alarmTime.value;
});
reset.addEventListener("click", () => {
  audio.pause();
  alarmTime.value = null;
  alarmTimeValue = 0;
  alarmSetTime.innerHTML = "";
});

function setClock() {
  const currentDate = new Date();
  const alarmTimestamp = new Date(1678818600000 + alarmTimeValue);
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);

  const alarmHourMatch = alarmTimestamp.getHours() === currentDate.getHours();
  const alarmMinuteMatch =
    alarmTimestamp.getMinutes() === currentDate.getMinutes();
  if (alarmMinuteMatch && alarmHourMatch) {
    audio.play();
  }
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();
