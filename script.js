let firstNumber;
let operator;
let lastNumber;
let resultValue = "";
let displayValue = "";

console.log("hello");

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

const getProblemFormat = (problem) => {
  let afterProblem, firstNumber, operator, lastNumber, result;
  let operators = ["+", "-", "×", "÷"];
  operators.forEach((item) => {
    if (!problem.includes(item)) return;
    let operatorIndex = problem.indexOf(item);
    firstNumber = problem.substring(0, operatorIndex);
    operator = problem[operatorIndex];
    lastNumber = problem.substring(operatorIndex + 1, problem.length);
    operators.forEach((item) => {
      if (!lastNumber.includes(item)) return;
      lastNumber = problem.substring(operatorIndex, problem.indexOf(item));
      afterProblem = result = operate(firstNumber, operator, lastNumber);
      getProblemFormat(lastNumber);
    });
  });
  return { firstNumber, operator, lastNumber };
};

const handleCalculations = () => {
  let { firstNumber, operator, lastNumber } = getProblemFormat(displayValue);
  if (lastNumber) console.log(firstNumber, lastNumber);
  resultValue = operate(+firstNumber, operator, +lastNumber);
  console.log({ resultValue });
  resultText.textContent = resultValue;
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
      handleCalculations();
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
      result = divide(num1, num2);
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
