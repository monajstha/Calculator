let firstNumber;
let operator;
let lastNumber;
let displayValue = "";

console.log("hello");

const inputScreen = document.querySelector(".input-screen");
const displayText = document.createElement("p");

// selecting the clear all button
const acButton = document.querySelector("#ac");
acButton.addEventListener("click", (e) => {
  displayValue = "";
  displayText.textContent = displayValue;
});

const handleCalculations = () => {
  let operators = ["+", "-", "*", "/"];
  operators.forEach((item) => {
    if (!displayValue.includes(item)) return;
    let operatorIndex = displayValue.indexOf(item);
    let firstNumber = displayValue.substring(0, operatorIndex);
    let operator = displayValue[operatorIndex];
    let lastNumber = displayValue.substring(
      operatorIndex + 1,
      displayValue.length
    );
    console.log(firstNumber, lastNumber);
    let result = operate(+firstNumber, operator, +lastNumber);
    console.log({ result });
  });
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
    }
    if (className === "operator" && buttonId !== "=") {
      displayValue += e.target.id;
    } else {
      displayValue += e.target.id;
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
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      break;
  }
  return result;
};

// adding the display text to the input screen
inputScreen.appendChild(displayText);
