const refs = {
  form: document.querySelector('.form'),
  firstDelayInput: document.querySelector('[name="delay"]'),
  delayStepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};
// console.log(refs.amountInput.value);
// console.log(refs.delayStepInput.value);

// refs.form.addEventListener('submit', createPromise);

function createPromise(position, delay) {
   return new Promise((resovle, reject) => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
         resovle({position, delay});
      } else {
         reject({position, delay});
      };
   });
};


let sum = 0;
for (let i = 0; i < refs.amountInput.value; i++) {
      createPromise(i, refs.firstDelayInput.value)
         .then(({ position, delay }) => {
         sum = (i * refs.delayStepInput.value) + parseInt(delay);
         console.log(`✅ Fulfilled promise ${position} in ${sum}ms`);
      })
         .catch(({ position, delay }) => {
         sum = (i * refs.delayStepInput.value) + parseInt(delay);
         console.log(`❌ Rejected promise ${position} in ${sum}ms`);
      });
   }
