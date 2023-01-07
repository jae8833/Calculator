// Operations
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator,a,b) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (operator === "+") {
        return add(a,b);
    }
    if (operator === "-") {
        return subtract(a,b);
    }
    if (operator === "*") {
        return multiply(a,b);
    }
    if (operator === "/") {
        return divide(a,b);
    }
}


// Press Buttons to Display 
let htmlDisplayValue = document.querySelector('#display-value');
let displayValue = "0";
htmlDisplayValue.textContent = displayValue;

btnNodes = document.querySelectorAll('.btn');
btnNodes.forEach(btnNode => btnNode.addEventListener('click',(e) => display(e)))

let htmlDisplayCalculations = document.querySelector('#display-calculations');
let firstNum = "0";
let operatorChosen = "";
let displayCalculations = "";
let operatorChosenLast = false;

function display(e) {
    let btnPressed;
    if (e.type === 'keydown') {
        if (availableBtns.includes(e.key)) {
            if (e.key === 'Backspace') {
                btnPressed = 'delete';
            }
            else if (e.key === 'Enter') {
                btnPressed = '=';
            }
            else {
                btnPressed = e.key;
            }
        }
        else {
            return;
        }
    }
    else {
        btnPressed = e.target.getAttribute('id');
    }

    if (!isNaN(btnPressed)) {
        if (operatorChosenLast) {
            displayValue = "0";
        }

        if (displayValue === "0") {
            displayValue = btnPressed;
        }
        else {
            displayValue = displayValue += btnPressed;
        }

        operatorChosenLast = false;
    }
    else {
        if (btnPressed === ".") {
            if (operatorChosenLast) {
                displayValue = "0";
            }

            if (displayValue.includes('.')) {
                return;
            }

            displayValue += "."

            operatorChosenLast = false;
        }
        else if (btnPressed === "clear") {
            displayValue = "0";
            displayCalculations = "";
            operatorChosen = "";
            operatorChosenLast = false;
        }
        else if (btnPressed === "delete") {
            displayValue = displayValue.slice(0, displayValue.length-1);
            operatorChosenLast = false;
        }
        else {
            if (btnPressed !== "=") {
                if (operatorChosenLast) {
                    operatorChosen = btnPressed;
                    displayCalculations = firstNum + " " + operatorChosen;
                }
                else {
                    if (operatorChosen == "")
                    {
                        firstNum = displayValue;
                        operatorChosen = btnPressed;
                        displayCalculations = firstNum + " " + operatorChosen;
                    }
                    else {
                        displayValue = parseFloat(operate(operatorChosen, firstNum, displayValue).toFixed(3)).toString();
                        operatorChosen = btnPressed;
                        displayCalculations = displayValue + " " + operatorChosen;
                        firstNum = displayValue;
                    }
                }
            }
            else {
                if (operatorChosenLast || operatorChosen == "") {
                    return;
                }
                displayCalculations += " " + displayValue + " =";
                displayValue = parseFloat(operate(operatorChosen, firstNum, displayValue).toFixed(3)).toString();
                operatorChosen = "";
                firstNum = displayValue;
            }

            operatorChosenLast = true;
        }
    }

    htmlDisplayValue.textContent = displayValue;
    htmlDisplayCalculations.textContent = displayCalculations;
}


// Keyboard Support
window.addEventListener('keydown', (e) => display(e));
availableBtns = ['1','2','3','4','5','6','7','8','9','0','.','+','-','*','/','=','Backspace','Enter']


