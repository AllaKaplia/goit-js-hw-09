
const formEl = document.querySelector('.form');
const buttonEl = document.querySelector('button');


let amount = document.querySelector('input[name=amount]').value;
let delay = document.querySelector('input[name=delay]').value;
let step = document.querySelector('input[name=step]').value;


let promptCounter = 0;

formEl.addEventListener('submit', onValueRecords);
buttonEl.addEventListener('click', onPromisesStart);

function onValueRecords(evt) {
  evt.preventDefault()
  
};

function onPromisesStart() {
  createPromise()
};

function createPromise(position, delay, amount) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setInterval(() => {
      if(promptCounter === amount) {
        return;
      }
      promptCounter += 1;

      if (shouldResolve) {
        finally(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay);
  })
}

createPromise().then((position, delay) => onPromisesSuccess).catch((position, delay) => onPromisesError);

function onPromisesSuccess() {
  console.log(result);
}

function onPromisesError() {
  console.log(error);
}

