let resultValue = "";
let displayValue = "";

const inputScreen = document.querySelector(".input-screen");
const displayText = document.createElement("div");
// const resultDiv = document.createElement("div");
const resultText = document.createElement("div");

// selecting the clear all button
const acButton = document.querySelector("#ac");
acButton.addEventListener("click", (e) => {
  displayValue = "";
  resultValue = "";
  displayText.textContent = displayValue;
  resultText.textContent = resultValue;
});

const handleCalculation = (equation) => {
  let operators = ["+", "-", "×", "÷"];
  let indexArr = [];
  for (let i = 0; i < equation.split("").length; i++) {
    for (let j = 0; j < operators.length; j++) {
      // Push all the operators' indexes present in the equation into an array
      if (equation[i] === operators[j]) {
        indexArr.push(i);
      }
    }
  }
  // Checking till all the operators are calculated
  for (let i = 0; i < indexArr.length; i++) {
    let operatorIndex = indexArr[i];
    let firstNum;
    if (i === 0) {
      firstNum = equation.substring(0, operatorIndex);
    } else {
      // firstNum must be the result of previous equation
      firstNum = resultValue;
    }
    let operator = equation[operatorIndex];
    let lastNum = equation.substring(operatorIndex + 1, indexArr[i + 1]);
    resultValue = operate(+firstNum, operator, +lastNum);
    console.log({ resultValue });
  }
  return resultValue;
};

const getResult = () => {
  resultText.textContent = handleCalculation(displayValue);
};

// Selecting all input buttons and adding display text
const allInputButtons = document.querySelectorAll(".buttons-container button");
console.log(allInputButtons);
allInputButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    let className = e.target?.className;
    let buttonId = e.target?.id;
    console.log({ className });
    if (buttonId === "=") {
      getResult();
    } else {
      displayValue += e?.target?.id;
    }

    displayText.textContent = displayValue;
  });
});

const add = function (num1, num2) {
  return num1 + num2;
};

const subtract = function (num1, num2) {
  return num1 - num2;
};

const multiply = function (num1, num2) {
  return num1 * num2;
};

const divide = function (num1, num2) {
  return num1 / num2;
};

const operate = function (num1, operator, num2) {
  let result;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "×":
      result = multiply(num1, num2);
      break;
    case "÷":
      if (num2 === 0) {
        result = "Can't perform this operation!";
      } else {
        result = divide(num1, num2);
      }
      break;
    default:
      break;
  }
  return result;
};

// adding the display text to the input screen
inputScreen.appendChild(displayText);
// inputScreen.appendChild(resultDiv);
inputScreen.appendChild(resultText);
