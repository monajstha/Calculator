let firstNumber;
let operator;
let lastNumber;
let displayValue = "";

console.log("hello");

const inputScreen = document.querySelector(".input-screen");
const displayText = document.createElement("p");

// Selecting all input buttons and adding display text
const allInputButtons = document.querySelectorAll(".buttons-container button");
console.log(allInputButtons);
allInputButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    displayValue += e.target.id;
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
};

// adding the display text to the input screen
inputScreen.appendChild(displayText);
