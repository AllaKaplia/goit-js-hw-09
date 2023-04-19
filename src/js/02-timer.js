import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const inputTime = document.querySelector('#datetime-picker');
const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const TIME_INTERVAL = 1000;

inputTime.addEventListener('input', () => {});
startBtn.addEventListener('click', () => {
  countdownTimer.start();
})



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(inputTime, options);

const countdownTimer = {
  // isActive: false,
  start () {
    // if(isActive){
    //   return;
    // }
    
    const startTime = options.defaultDate;
    console.log(startTime);
    setInterval(() => {
      const currentTime = new Date();
      const currentDay = currentTime.getDate();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentSeconds = currentTime.getSeconds();
      

      const ms = startTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(ms);
      console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);

      dayEl.textContent = currentDay;
      hoursEl.textContent = currentHour;
      minutesEl.textContent = currentMinutes;
      secondsEl.textContent = currentSeconds;
    }, TIME_INTERVAL);
  }
}




// function flatpickr(options) {
//   let picker = flatpickr(document.getElementById("datetime-picker"), options);

//   startBtn.addEventListener('click', function() {
//     if (picker.selectedDates[0] > new Date()){
//       startCountdown(picker.selectedDates[0]);
//     } else {
//       window.alert('Please choose a date in the future.')
//     }
//   });  
// }


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