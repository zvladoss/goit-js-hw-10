import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import icon from '../img/icon.svg';
const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('button');

let userSelectedDate = null;
let timerInterval = null;

const disableStartBtn = () => {
  startBtn.classList.add('btn-disabled');
  startBtn.disabled = true;
};

const enableStartBtn = () => {
  startBtn.classList.remove('btn-disabled');
  startBtn.disabled = false;
  btnStart.classList.add('start-btn');
};

disableStartBtn();

datePicker.addEventListener('input', () => disableStartBtn());

const showError = message =>
  iziToast.error({
    title: 'Error',
    titleColor: '#ffffff',
    message,
    iconUrl: icon,
    position: 'topRight',
    backgroundColor: '#EF4040',
    close: true,
    overlayClose: false,
    progressBarColor: '#B51B1B',
    theme: 'light',
    timeout: 5000,
  });

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    const now = new Date();
    if (selectedDate <= now) {
      showError('Please choose a date in the future');
    } else {
      userSelectedDate = selectedDate;
      enableStartBtn();
    }
  },
};
flatpickr(datePicker, options);

startBtn.addEventListener('click', () => {
  disableStartBtn();
  datePicker.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
});

const updateTimer = () => {
  const timeDiff = userSelectedDate - new Date();
  if (timeDiff <= 0) {
    clearInterval(timerInterval);
    datePicker.disabled = false;
    disableStartBtn();

    updateDisplay(0, 0, 0, 0);
    return;
  }
  updateDisplay(...Object.values(convertMs(timeDiff)));
};

const updateDisplay = (days, hours, minutes, seconds) => {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
};

const addLeadingZero = value => String(value).padStart(2, '0');

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// installed izitoast
// again
