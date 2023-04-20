import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const inputTime = document.querySelector('#datetime-picker');
const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const TIME_INTERVAL = 1000;
let intervalId = null;

flatpickr("#datetime-picker", {
  isActive: false, 
  intervalId: null, 
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  onClose(selectedDates) {
    inputTime.addEventListener('click', function() {
      if (selectedDates[0] > this.defaultDate){
        countdownTimer(selectedDates[0]);
      } else {
        window.alert('Please choose a date in the future.');
      }
    })
  }
},);

function countdownTimer(value) {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const startDate = value;
    const ms = startDate - currentTime;

    const { days, hours, minutes, seconds } = convertMs(ms);
    console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);

    dayEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    if (ms <= 0) {
      clearInterval(intervalId);
      window.alert('Time out!!!');
    }
  }, TIME_INTERVAL);
}

startBtn.addEventListener('click', () => {
  const selectedDate = inputTime.selectedDates[0];
  if (selectedDate > new Date()) {
    countdownTimer(selectedDate);
  } else {
    window.alert('Please choose a date in the future.');
  }
});

function pad(value) {
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
  return { days, hours, minutes, seconds };
}