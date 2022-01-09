// -- ELEMENTS -- //
const resetButton = document.querySelector("#reset-btn");
const backspaceButton = document.querySelector("#backspace-btn")
const percentButton = document.querySelector("#percent-btn");
const numpadBtns = document.querySelectorAll(".numpad-btn");
const numpadNumberBtns = document.querySelectorAll(".numpad-number");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalsButton = document.querySelector("#equals")
const numberDisplay = document.querySelector(".number-display");
const powerButton = document.querySelector(".power-btn");
const offScreen = document.querySelector(".off-screen");


// -- VARIABLES -- //
let displayValArr = [];
let actionHistory = [];
const numRegex = /[0-9]/g;

// values used in math operations
let chosenOperator = null;
let operandOne;
let operandTwo;

// string shown in calc display
let DisplayVal = [];




// function that iterates an event over a nodelist
const addEventListenerToList = (list, event, fn) => {
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener(event, fn);
    }
}

// toggle phone screen on/off
powerButton.addEventListener("click", () => {
    offScreen.classList.toggle("turned-off");
})

const calculatorFunctions = { 
    add: function(num1, num2) {
        return num1 + num2;
    },
    subtract: function(num1, num2) {
        return num1 - num2;
    },
    multiply: function(num1, num2) {
        return num1 * num2;
    },
    divide: function(num1, num2) {
        return num1 / num2;
    },
}

// returns calculation answer
const operate = (operator, num1, num2) => {
    return calculatorFunctions[operator](num1, num2);
}

const updateDisplay = () => {
    // if chosen pressed button is between 0-9 or decimal point
    if (displayValArr[displayValArr.length - 1].match(numRegex)
    || displayValArr[displayValArr.length - 1] === ".") {
        

        if (chosenOperator === null) {
            operandOne = displayValArr.join("");
            numberDisplay.textContent = operandOne;
            operandOne = Number(operandOne);
        } else {
            operandTwo = displayValArr.join("");
            numberDisplay.textContent = operandTwo;
            operandTwo = Number(operandTwo);
        }
    }
}

// divides number by 100
percentButton.addEventListener("click", e => {
    if (chosenOperator === null || operandTwo === null) {
        operandOne = Number(operandOne) / 100;
        operandOne = roundNum(operandOne);
        displayValArr = operandOne.toString().split("");
        numberDisplay.textContent = operandOne;
    } else {
        operandTwo = Number(operandTwo) / 100;
        operandTwo = roundNum(operandTwo);
        displayValArr = operandTwo.toString().split("");
        numberDisplay.textContent = operandTwo;
    }
})

// backspaces number
backspaceButton.addEventListener("click", e => {

    if (chosenOperator === null || operandTwo === null) {
        displayValArr = operandOne.toString().split("");
        displayValArr.pop()
        operandOne = displayValArr.join("")
        numberDisplay.textContent = operandOne;
    } else {
        displayValArr.pop()
        operandTwo = displayValArr.join("")
        numberDisplay.textContent = operandTwo;
    }
})

const answer = () => {
    let lastAction = actionHistory[actionHistory.length - 1];
    let secondToLastAction = actionHistory[actionHistory.length - 2];
    let answer;

    if (operandOne && operandTwo || operandOne === 0 || operandTwo === 0) {
        if (lastAction === "equals") {
            answer = operate(chosenOperator, Number(operandOne), Number(operandTwo));
            answer = roundNum(answer);
            operandOne = answer;
            numberDisplay.textContent = operandOne;
            operandTwo = null;
        } else {
            answer = operate(secondToLastAction, Number(operandOne), Number(operandTwo));
            operandOne = roundNum(answer);
            numberDisplay.textContent = operandOne;
        }
    }

    // if diving by 0
    if (answer === "Infinity") {
        numberDisplay.textContent = "Error";
    }
}

// shortens a number that exceeds calculator display
const roundNum = (num) => {
    let number = num.toString();
    let numberArr = number.split("");
    
    // if length of number is more than 8 chars
    if (number.length > 8) {
        // if number includes decimal point
        if (moreThanOneDecimalPoint(numberArr)) {
            const indexOfDecimal = numberArr.indexOf(".");

            if (indexOfDecimal > 6) { // converts to scientific notation
                number =  Number(number).toExponential(2);
            } else { // cuts off num after decimal point
                numberArr = numberArr.slice(0, 8);
                number = numberArr.join("");
            }
        } else { // converts to scientific notation
            number =  Number(number).toExponential(2);
        }
    }
    return number;
}

const highlightChosenOperator = e => {
    if (e.target.id === chosenOperator) {

        operatorBtns.forEach(button => {
            if (button.id === e.target.id) {
                button.classList.add("selected");
            }

            if (button.id !== e.target.id) {
                button.classList.remove("selected");
            }
        })
    }
}

const removeHighlightedChosenOperator = () => {
    operatorBtns.forEach(button => {
        button.classList.remove("selected");
    })
}

// runs when numpad buttons are pressed
addEventListenerToList(numpadNumberBtns, "click", e => {
    let selectedBtn = e.target.textContent;
    resetButton.textContent = "C";

    // executes if display is less than 8 chars and has no more than 1 decimal point 
    if (displayValArr.length < 8 
    && (!moreThanOneDecimalPoint(displayValArr) || selectedBtn != ".")) {
        displayValArr.push(selectedBtn);
    }
    updateDisplay();
    removeHighlightedChosenOperator();
})

// runs when operator buttons are pressed
addEventListenerToList(operatorBtns, "click", e => {
    displayValArr = [];
    if (operandOne) {
        chosenOperator = e.target.id;
        actionHistory.push(chosenOperator);
    }
    answer();
    highlightChosenOperator(e)
})

// runs when equals button is pressed
equalsButton.addEventListener("click", e => {
    actionHistory.push(e.target.id);
    answer();
    highlightChosenOperator(e)
})

// checks if number contains more than 1 decimal point
const moreThanOneDecimalPoint = (num) => {
    let count = 0;
    for (let i = 0; i <= num.length; i++) {
        if (num[i] === ".") {
            count++;
        }
    }
    return count >= 1 ? true : false;
}

// resets calculator
resetButton.addEventListener("click", e => {
    resetButton.textContent = "AC";
    actionHistory = [];
    displayValArr = [];
    chosenOperator = null;
    operandOne;
    operandTwo;
    numberDisplay.textContent = "0";
    removeHighlightedChosenOperator();
});