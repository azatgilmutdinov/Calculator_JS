'use strict' 

const calculator = document.querySelector('.calculator');
const history = [];

calculator.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('calculator__col')) {

    history.push(target.dataset.type)

  }
  console.log(history);
})