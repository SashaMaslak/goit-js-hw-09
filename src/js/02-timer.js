import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
const refs = {
    datetimePicker: document.querySelector('#datetime-picker'),
    daysField: document.querySelector('span[data-days]'),
    hoursField: document.querySelector('span[data-hours]'),
    minutesField: document.querySelector('span[data-minutes]'),
    secondsField: document.querySelector('span[data-seconds]'),
};
const date = new Date();
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        const differenceDate = selectedDates[0].getTime() - date.getTime();
        if(differenceDate < 0){
            alert('Please choose a date in the future');
            return
            }         
        return console.log(addLeadingZero(convertMs(differenceDate)));;
    },
  };

let padDays;
let padHours;
let padMinutes;
let padSeconds;


function addLeadingZero(value){
    padDays = pad(value.days);
    padHours = pad(value.hours);
    padMinutes = pad(value.minutes);
    padSeconds = pad(value.seconds);
    setTimerTime ()
    };



 function pad(value) {
    return String(value).padStart(2, '0');
  }

function setTimerTime () {
refs.daysField.textContent = padHours; 
refs.hoursField.textContent = padMinutes; 
refs.minutesField.textContent = padSeconds; 
 
}


const calendar = flatpickr(refs.datetimePicker, options);

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

