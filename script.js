let resultValue = "";
let displayValue = "";
let errorValue = "";
let operators = ["÷", "×", "+", "-"];
// Variable to check single decimal on the current number
let currentNumber = "";

const inputScreen = document.querySelector(".input-screen");
const displayText = document.createElement("div");
// const resultDiv = document.createElement("div");
const resultText = document.createElement("div");

// selecting the clear all button
const acButton = document.querySelector("#ac");
acButton.addEventListener("click", (e) => {
  displayValue = "";
  resultValue = "";
  currentNumber = "";
  displayText.style.fontSize = "18px";
  displayText.textContent = displayValue;
  resultText.textContent = resultValue;
});

const handleBackspace = () => {
  let erasedValue = displayValue.split("").splice(displayValue.length - 1, 1);
  if (erasedValue[0] === " ") {
    displayValue = displayValue.slice(0, displayValue.length - 2);
  } else {
    displayValue = displayValue.slice(0, displayValue.length - 1);
    currentNumber = currentNumber.slice(0, currentNumber.length - 1);
  }
  displayText.textContent = displayValue;
};

// selecting the backspace button
const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", (e) => handleBackspace());

const handleCalculation = (problem) => {
  let equation = problem;
  let eqArr = equation.split("");
  let indexArr = [];

  for (let i = 0; i < operators.length; i++) {
    // Return result when result value is negative
    if (equation[0] === operators[i]) return resultValue;
    for (let j = 0; j < eqArr.length; j++) {
      if (operators[i] === equation[j]) {
        indexArr.push(j);
      }
    }
  }

  // When there are no operators left, return result value
  if (!indexArr.length) return resultValue;

  let sortedIndexArr = [...indexArr].sort((a, b) => a - b);
  let startIndex, operatorIndex, endIndex;
  operatorIndex = sortedIndexArr.indexOf(indexArr[0]);

  startIndex = operatorIndex === 0 ? 0 : sortedIndexArr[operatorIndex - 1] + 1;
  endIndex =
    operatorIndex === sortedIndexArr.length - 1
      ? equation.length
      : sortedIndexArr[operatorIndex + 1];

  // Taking the first equation
  let shortEquation = equation.substring(startIndex, endIndex);
  let shortEquationOperatorIndex;
  for (let i = 0; i < operators.length; i++) {
    if (shortEquation.includes(operators[i])) {
      shortEquationOperatorIndex = shortEquation.indexOf(operators[i]);
      break;
    }
  }
  let firstNum = shortEquation.substring(0, shortEquationOperatorIndex);
  let operator = shortEquation[shortEquationOperatorIndex];
  let lastNum = shortEquation.substring(
    shortEquationOperatorIndex + 1,
    shortEquation.length
  );
  resultValue = operate(+firstNum, operator, +lastNum);
  let deleteCount = endIndex - startIndex;

  // Replace the first equation with the result value
  let newEquationArr = equation.split("");
  newEquationArr.splice(startIndex, deleteCount, resultValue);
  let newEquation = newEquationArr.join("");
  handleCalculation(newEquation);

  return resultValue;
};

const getResult = () => {
  displayText.style.fontSize = "14px";
  resultText.textContent = handleCalculation(displayValue);
};

// Selecting all input buttons and adding display text
const allInputButtons = document.querySelectorAll(".buttons-container button");
allInputButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    let className = e.target?.className;
    let buttonId = e.target?.id;
    if (buttonId === "equal") {
      getResult();
    } else if (className === "operator") {
      displayValue += " " + e?.target?.id + " ";
      currentNumber = "";
    } else {
      if (e?.target?.id === "." && currentNumber?.includes(".")) return;
      currentNumber += e?.target?.id;
      displayValue += e?.target?.id;
    }

    displayText.textContent = displayValue;
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (
    e?.code.includes("Numpad") ||
    e?.code.includes("Digit") ||
    e?.code.includes("Equal")
  ) {
    if (e?.key !== "=" && e?.key !== "Enter") {
      let key = e?.key;
      if (key === "+" || key === "-" || key === "*" || key === "/") {
        key = key === "*" ? "×" : key === "/" ? "÷" : key;
        displayValue += " " + key + " ";
      } else {
        displayValue += key;
      }
      displayText.textContent = displayValue;
    } else {
      getResult();
    }
  } else if (e?.code.includes("Backspace")) {
    handleBackspace();
  } else {
    return;
  }
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
        result = "ERROR!";
      } else {
        result = divide(num1, num2);
      }
      break;
    default:
      break;
  }
  return result;
};

displayText.style.fontSize = "18px";
resultText.style.fontSize = "28px";
// adding the display text to the input screen
inputScreen.appendChild(displayText);
// inputScreen.appendChild(resultDiv);
inputScreen.appendChild(resultText);
