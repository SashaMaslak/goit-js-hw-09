// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

refs = {
   startBtn: document.querySelector('[data-start]'),
   stopBtn: document.querySelector('[data-stop]'),
   clearBtn: document.querySelector('[data-clear]'),
   days: document.querySelector('[data-days]'),
   hours: document.querySelector('[data-hours]'),
   minutes: document.querySelector('[data-minutes]'),
   seconds: document.querySelector('[data-seconds]'),
};
refs.startBtn.setAttribute("disabled", "disabled");
refs.stopBtn.setAttribute("disabled", "disabled");


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
        alert("Please choose a date in the future");
     }
     else {
        refs.startBtn.removeAttribute("disabled");
        console.log(selectedDates[0]);
        startTime = selectedDates[0];
        
        
     }
  },
};
flatpickr('#datetime-picker', options);

const timer = {
   start() {
      setIntervalTimer = setInterval(() => {
         refs.startBtn.setAttribute("disabled", "disabled");
         refs.stopBtn.removeAttribute("disabled");
         currentTime = Date.now();
         currentMs = startTime - currentTime;
         refs.days.textContent = convertMs(currentMs).days;
         refs.hours.textContent = convertMs(currentMs).hours;
         refs.minutes.textContent = convertMs(currentMs).minutes;
         refs.seconds.textContent = convertMs(currentMs).seconds;
      }, 1000);
      return setIntervalTimer;
   },
   stop() {
         clearInterval(setIntervalTimer);
         refs.stopBtn.setAttribute("disabled", "disabled");
      refs.startBtn.removeAttribute("disabled");
      //при натисканні на стоп зробити, щоб таймер зупинився 
      
      setInterval(() => {
            // console.log(invertMs(convertMs(currentMs)));
            // console.log(convertMs(currentMs));

            
         const date = new Date(invertMs(convertMs(currentMs)));
         console.log(date);
         
            // console.log(date.getTime());
            // const date = new Date(
            //    2030,
            //    2,
            //    16,
            //    14,
            //    25,
            //    0,
            //    Number(refs.seconds.textContent)
            // );
            // console.log(date);

      }, 1000);




   },
   clear() {
         refs.stopBtn.setAttribute("disabled", "disabled");
         refs.startBtn.removeAttribute("disabled");
         refs.days.textContent = '00';
         refs.hours.textContent = '00';
         refs.minutes.textContent = '00';
         refs.seconds.textContent = '00';
   },
};

refs.startBtn.addEventListener('click', timer.start);
refs.stopBtn.addEventListener('click', timer.stop);
refs.clearBtn.addEventListener('click', timer.clear);


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

const convertedMs = convertMs();
console.log(convertedMs);

function invertMs({ days, hours, minutes, seconds }) {
   
   const result = (days * 86400000) + (hours * 360000) + (minutes * 60000) + (seconds * 1000);
   return result;
};




