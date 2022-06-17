import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedData = selectedDates[0];
    if (selectedData < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '350px',
        height: '400px',
        position: 'right-top',
        clickToClose: true,
        distance: '20px',
        fontSize: '16px',
      });
      addDisabledAtr(refs.startBtn);
    } else {
      removeDisabledAtr(refs.startBtn);
    }
  },
};
flatpickr('#datetime-picker', options);

let selectedData = '';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

addDisabledAtr(refs.startBtn);

refs.startBtn.addEventListener('click', onClickStartTimer);

function onClickStartTimer() {
  setInterval(() => {
    const currentData = new Date();
    const timerData = selectedData - currentData;
    if (timerData <= 0) {
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
      return;
    }
    const formatedData = convertMs(timerData);
    console.log(formatedData);
    runTimer(formatedData);
  }, 1000);
}

function runTimer(data) {
  refs.days.textContent = addLeadingZero(data.days);
  refs.hours.textContent = addLeadingZero(data.hours);
  refs.minutes.textContent = addLeadingZero(data.minutes);
  refs.seconds.textContent = addLeadingZero(data.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

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

function addDisabledAtr(linkOnBtn) {
  linkOnBtn.setAttribute('disabled', 'disabled');
}

function removeDisabledAtr(linkOnBtn) {
  linkOnBtn.removeAttribute('disabled', 'disabled');
}