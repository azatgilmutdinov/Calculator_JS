'use strict' 

const calculator = document.querySelector('.calculator');

calculator.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('calculator__col')) {
    console.log(target.dataset.type)
  }
})