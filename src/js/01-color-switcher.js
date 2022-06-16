const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
}

refs.stopBtn.setAttribute("disabled", "disabled");
let setIntervalColor = null;

refs.startBtn.addEventListener('click', changeColorBody);
refs.stopBtn.addEventListener('click', stopChangeColorBody);

function changeColorBody() {
  setIntervalColor = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  console.log('Starded Interval');
  refs.startBtn.setAttribute("disabled", "disabled");
  refs.stopBtn.removeAttribute("disabled");
  return setIntervalColor;
};

function stopChangeColorBody() {
  clearInterval(setIntervalColor);
  refs.body.style.backgroundColor = `unset`;
  console.log('Stoped Interval');
  refs.stopBtn.setAttribute("disabled", "disabled");
  refs.startBtn.removeAttribute("disabled");
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
