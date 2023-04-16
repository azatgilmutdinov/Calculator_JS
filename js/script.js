'use strict' 

const calculator = document.querySelector('.calculator');
let history = [];
let tempNumber = '';
let operationType = '';

calculator.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('calculator__col')) {
    const data = target.dataset.type;
    operation(data);
    // console.log(tempNumber);

    renderTotal(tempNumber);

    renderHistory(history);

  }

})


function operation(data) {
  if (data >= 0) { //проверяем, что "число"
    operationType = 'number';
    tempNumber = tempNumber === '0' ?  data : tempNumber + data;
  } else if (data ==='float') {
    operationType = 'number';
    if (!/\./.test(tempNumber)) { //проверяем рег.выражением наличие/отсут точки
      if (tempNumber) {
        tempNumber += '.';
      } else {
        tempNumber ='0.'
      }
    }
  } else if (data ==='delete' && operationType === 'number') { //учиываем что не была нажата вид операции
    tempNumber = tempNumber.substring(0, tempNumber.length-1);
    tempNumber = tempNumber ? tempNumber : '0';
  } else if (['+', '-', '/', '*'].includes(data) && tempNumber) {
    operationType = data;
    history.push(tempNumber, operationType);
    tempNumber = ''
  } else if (data === '=') {
    history.push(tempNumber);
    tempNumber = calculate(history);
    history = [];
  } else if (data === 'clear') {
    history = [];
    tempNumber = '0';
  }
}


function renderTotal(value) {
  const totalBlock = calculator.querySelector('.calculator__total')
  totalBlock.innerHTML = value;
}

function renderHistory(historyArr) {
  const historyBlock = calculator.querySelector('.calculator__history')
  let htmlElements = '';

  historyArr.forEach(item => {
    if (item >= 0) {
      htmlElements += `&nbsp;<span>${item}</span>`
    } else if (['+', '-', '/', '*'].includes(item)) {
      htmlElements += `&nbsp;<strong>${item}</strong>`
    }
  })


  

  historyBlock.innerHTML = htmlElements
}

function calculate(historyArr) {
  let total = 0;
  historyArr.forEach((item, index) => {
    item = parseFloat(item);
    if (index === 0) {
      total = item;
    } else if (index - 2 >= 0) {
      const prevItem = historyArr[index - 1];
      if (item >= 0) {
        if (prevItem === '+') {
          total += item;
        } else if (prevItem === '-') {
          total -= item;
        } else if (prevItem === '*') {
          total *= item;
        } else if (prevItem === '/') {
          total /= item;
        }
      }
    }
    
  })
  return total;

}