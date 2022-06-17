// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
   startBtn: document.querySelector('[data-start]'),
   stopBtn: document.querySelector('[data-stop]'),
   clearBtn: document.querySelector('[data-clear]'),
   days: document.querySelector('[data-days]'),
   hours: document.querySelector('[data-hours]'),
   minutes: document.querySelector('[data-minutes]'),
   seconds: document.querySelector('[data-seconds]'),
   timer: document.querySelector('.timer')
};
refs.startBtn.setAttribute("disabled", "disabled");


let startTime = 0;
let currentMs = 0;
let currentTime = 0;
let setIntervalTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     if (selectedDates[0] < Date.now()) {
        Notify.failure('Please choose a date in the future', {
            ID: 'MKA',
            timeout: 1923,
            width: '380px',
            position: 'center-top',
});
     }
     else {
        refs.startBtn.removeAttribute("disabled");
        startTime = selectedDates[0];
        
        
     }
  },
};
flatpickr('#datetime-picker', options);

const timer = {
   start() {
      setIntervalTimer = setInterval(() => {
         refs.startBtn.setAttribute("disabled", "disabled");
         currentTime = Date.now();
         currentMs = startTime - currentTime;
         renderTimer();
         refs.timer.style.color = 'red';
      }, 1000);
      return setIntervalTimer;
   },
};

refs.startBtn.addEventListener('click', timer.start);

function addLeadingZero(value) {
   return String(value).padStart(2, '0');
}

function renderTimer() {
   addLeadingZero(refs.days.textContent = addLeadingZero(convertMs(currentMs).days));
   addLeadingZero(refs.hours.textContent = addLeadingZero(convertMs(currentMs).hours));
   addLeadingZero(refs.minutes.textContent = addLeadingZero(convertMs(currentMs).minutes));
   addLeadingZero(refs.seconds.textContent = addLeadingZero(convertMs(currentMs).seconds));
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}




