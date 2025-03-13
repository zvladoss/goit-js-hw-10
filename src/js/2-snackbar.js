import iziToast from 'izitoast';
import icon from '../img/icon.svg';
import okIcon from '../img/ok.svg';
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        titleColor: '#ffffff',
        iconUrl: okIcon,
        message: ` Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        icon: false,
        timeout: 5000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error!',
        titleColor: '#ffffff',
        backgroundColor: '#ef4040',
        progressBarColor: '#B51B1B',
        overlay: false,
        iconUrl: icon,
        message: ` Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 5000,
      });
    });
});
