let resultValue = "";
let displayValue = "";
let errorValue = "";

const inputScreen = document.querySelector(".input-screen");
const displayText = document.createElement("div");
// const resultDiv = document.createElement("div");
const resultText = document.createElement("div");

// selecting the clear all button
const acButton = document.querySelector("#ac");
acButton.addEventListener("click", (e) => {
  displayValue = "";
  resultValue = "";
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
  }
  console.log({ erasedValue });
  displayText.textContent = displayValue;
};

// selecting the backspace button
const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", (e) => handleBackspace());

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
  displayText.style.fontSize = "14px";
  resultText.textContent = handleCalculation(displayValue);
};

// Selecting all input buttons and adding display text
const allInputButtons = document.querySelectorAll(".buttons-container button");
allInputButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    let className = e.target?.className;
    let buttonId = e.target?.id;
    console.log({ className });
    if (buttonId === "equal") {
      getResult();
    } else if (className === "operator") {
      displayValue += " " + e?.target?.id + " ";
    } else {
      displayValue += e?.target?.id;
    }

    displayText.textContent = displayValue;
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  console.log({ e });
  if (
    e?.code.includes("Numpad") ||
    e?.code.includes("Digit") ||
    e?.code.includes("Equal")
  ) {
    if (e?.key !== "=" && e?.key !== "Enter") {
      console.log("inside if", e?.key);
      let key = e?.key;
      if (key === "+" || key === "-" || key === "*" || key === "/") {
        key = key === "*" ? "×" : key === "/" ? "÷" : key;
        console.log({ key });
        displayValue += " " + key + " ";
      } else {
        displayValue += key;
      }
      console.log({ displayValue });
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
