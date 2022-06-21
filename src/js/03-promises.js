import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelayInput: document.querySelector('[name="delay"]'),
  delayStepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resovle({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(e) {
  e.preventDefault();

  const firstDelay = refs.firstDelayInput.value;
  const delayStep = refs.delayStepInput.value;
  const amount = refs.amountInput.value;

  if (amount === 0) {
    Notiflix.Notify.failure(`❌ Amount must be > 1`, {
      width: '350px',
      height: '400px',
      position: 'right-top',
      clickToClose: true,
      distance: '20px',
      fontSize: '16px',
    });
    return;
  }

  let sumDelaySteps = parseInt(firstDelay) - parseInt(delayStep);

  for (let i = 0; i < amount; i++) {
    sumDelaySteps += parseInt(delayStep);
    createPromise(i + 1, sumDelaySteps)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
            {
            width: '350px',
            height: '400px',
            position: 'right-top',
            clickToClose: true,
            distance: '20px',
            fontSize: '16px',
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            width: '350px',
            height: '400px',
            position: 'right-top',
            clickToClose: true,
            distance: '20px',
            fontSize: '16px',
          }
        );
      }); 
  };
  refs.form.reset();
};
