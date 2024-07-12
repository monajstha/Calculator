let placeholder = "0";
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

// adding placeholder
displayText.textContent = placeholder;
resultText.textContent = placeholder;

// selecting the clear all button
const acButton = document.querySelector("#ac");
acButton.addEventListener("click", (e) => {
  displayValue = "";
  resultValue = "";
  currentNumber = "";
  displayText.style.fontSize = "18px";
  displayText.textContent = placeholder;
  resultText.textContent = placeholder;
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

const infixToPostfix = (infix) => {
  // defining operator's precedence
  let precedence = {
    "÷": 4,
    "×": 3,
    "+": 2,
    "-": 1,
  };

  let operators = ["÷", "×", "+", "-"];
  let stack = [];
  let output = [];

  let tokens = infix.split(" ");

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token);
    } else if (operators.includes(token)) {
      while (
        stack.length &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  });

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
};

const evaluatePostfix = (postfix) => {
  let stack = [];

  postfix.forEach((token) => {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      let num2 = stack.pop();
      let num1 = stack.pop();
      let result = operate(num1, token, num2);
      stack.push(result);
    }
  });

  return stack[0];
};

const handleCalculation = (problem) => {
  let postFix = infixToPostfix(problem);
  let result = evaluatePostfix(postFix);

  return result;
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
